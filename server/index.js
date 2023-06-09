import fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import dotenv from 'dotenv';
import moment from 'moment';
import { PrismaClient } from '@prisma/client';
import fastifySocketIO from 'fastify-socket.io';

dotenv.config();

const app = fastify();
const prisma = new PrismaClient();

app.register(sensible);

app.register(cookie, { secret: process.env.COOKIE_SECRET });
app.register(cors, {
	origin: [
		process.env.CLIENT_URL_LIVE_UPDATE_IOS,
		process.env.CLIENT_URL_LIVE_UPDATE_ANDROID,
		process.env.CLIENT_URL_TEST,
		'http://localhost:19000',
	],
	credentials: true,
	preflight: true,
});

app.register(fastifySocketIO).after(() => {
	app.io.on('connection', (socket) => {
		console.log('User Connected');

		socket.on('booking-action', (statusResponse, date) => {
			socket.broadcast.emit('user-booking-response-status', {
				statusResponse,
				date,
			});
			socket.broadcast.emit('user-frontPage-available-response', {
				statusResponse,
				date,
			});
		});

		socket.on('disconnect', () => {
			console.log('User Disconnected');
		});
	});
});

// FUTURE UPDATE: create remove for when admin logs in so database removes unwanted rows

app.post('/SignInPage/login', async (req, res) => {
	return await prisma.user.findFirst({
		where: {
			email: req.body.email,
			password: req.body.password,
		},
		select: {
			access_level: true,
			id: true,
		},
	});
});

app.post('/SignUpPage/create', async (req, res) => {
	return await prisma.user.create({
		data: {
			name: req.body.name,
			surname: req.body.surname,
			age: req.body.dateOfBirth,
			email: req.body.email,
			password: req.body.password,
			cell_number: req.body.cellNumber,
		},
		select: {
			access_level: true,
			id: true,
		},
	});
});

app.post('/EditProfile/fetchUserDetails', async (req, res) => {
	return await prisma.user.findUnique({
		where: {
			id: req.body.id,
		},
		select: {
			email: true,
			cell_number: true,
		},
	});
});

app.post('/EditProfile/updateUserDetails/:id', async (req, res) => {
	return await prisma.user.update({
		where: { id: parseInt(req.params.id) },
		data: { email: req.body.email, cell_number: req.body.cellNumber },
	});
});

app.get('/AdminPages/frontPage', async (req, res) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return await prisma.appointment.findMany({
		where: {
			appointment_status: {
				contains: 'pending',
			},
			date: {
				gte: today,
			},
		},
		orderBy: [
			{
				date: 'asc',
			},
		],
		select: {
			appointment_id: true,
			date: true,
			location_type: true,
			address: true,
			user: {
				select: {
					name: true,
					surname: true,
					age: true,
					cell_number: true,
				},
			},
		},
	});
});

app.post('/AdminPages/frontPage/bookingResponse', async (req, res) => {
	await prisma.appointment.update({
		where: {
			appointment_id: req.body.appointmentId,
		},
		data: {
			appointment_status: req.body.response,
		},
	});

	return 'Process was completed successfully';
});

app.get('/AdminPages/acceptedBookings/', async (req, res) => {
	// FUTURE UPDATE: Will also be able to set how many days ahead to look
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const maxDays = new Date(today);
	maxDays.setDate(today.getDate() + 7);

	const appointmentArray = await prisma.appointment.findMany({
		where: {
			appointment_status: 'accept',
			date: {
				lte: maxDays,
				gte: today,
			},
		},
		orderBy: {
			date: 'asc',
		},
		select: {
			date: true,
			location_type: true,
			address: true,
			user: {
				select: {
					name: true,
					surname: true,
					age: true,
					cell_number: true,
				},
			},
		},
	});

	let indexFound = -1;
	let appointmentItem = '';

	const findPending = async () => {
		const dateCompare = moment(new Date()).add(2, 'hours');

		for (let i = 0; i < appointmentArray.length; i++) {
			if (
				appointmentArray[i].date.getHours() === dateCompare.hour() &&
				appointmentArray[i].date.getDate() === dateCompare.date() &&
				appointmentArray[i].date.getMonth() === dateCompare.month() &&
				appointmentArray[i].date.getFullYear() == dateCompare.year()
			) {
				indexFound = i;
				appointmentItem = appointmentArray[i];
				return;
			}
		}
	};

	await findPending();

	if (indexFound !== -1) {
		appointmentArray.splice(indexFound, 1);
		appointmentArray.unshift(appointmentItem);
	}

	return appointmentArray;
});

app.post('/UserPages/userBookingTimes/', async (req, res) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	if (req.body.appointmentStatus === 'All') {
		return await prisma.appointment.findMany({
			where: {
				user_id: req.body.userId,
				date: {
					gte: today,
				},
			},
			select: {
				date: true,
				location_type: true,
				appointment_status: true,
			},
		});
	}

	return await prisma.appointment.findMany({
		where: {
			user_id: req.body.userId,
			date: {
				gte: today,
			},
			appointment_status: {
				equals: req.body.appointmentStatus,
			},
		},
		orderBy: [
			{
				date: 'asc',
			},
		],
		select: {
			date: true,
			location_type: true,
			appointment_status: true,
		},
	});
});

app.post('/UserPages/userFrontPage/', async (req, res) => {
	const checkExistingBooking = await prisma.appointment.findFirst({
		where: {
			date: req.body.date,
			appointment_status: {
				not: 'decline',
			},
		},
	});

	if (checkExistingBooking) {
		return 'Already Booked';
	}

	await prisma.appointment.create({
		data: {
			date: req.body.date,
			address: req.body.address,
			location_type: req.body.locationType,
			user_id: req.body.userId,
		},
	});

	return 'Successful';
});

app.get('/UserPages/userFrontPage/fetchBookings', async (req, res) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return await prisma.appointment.findMany({
		where: {
			date: {
				gte: today,
			},
			appointment_status: {
				not: 'decline',
			},
		},
		select: {
			date: true,
		},
	});
});

app.listen({ port: process.env.PORT, host: process.env.HOST }, (error) => {});
