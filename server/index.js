import fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = fastify();
const prisma = new PrismaClient();

app.register(sensible);

app.register(cookie, { secret: process.env.COOKIE_SECRET });
app.register(cors, {
	// origin: process.env.CLIENT_URL,
	origin: process.env.CLIENT_URL_LIVE_UPDATE_IOS,
	origin: process.env.CLIENT_URL_LIVE_UPDATE_ANDROID,
	origin: process.env.CLIENT_URL_TEST,
	// origin: 'http://10.0.2.2:19000',
	// origin: 'http://192.168.1.51:19000',
	origin: 'http://localhost:19000',
	credentials: true,
});

app.addHook('onRequest', (req, res, done) => {
	// TODO: Will need to do some fetch and store with cookies to fetch from database
	// if (req.cookies.userId !== CURRENT_USER_ID) {
	// 	req.cookies.userId = CURRENT_USER_ID;
	// 	res.clearCookie('userId');
	// 	res.setCookie('userId', CURRENT_USER_ID);
	// }
	done();
});

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

// Will need to test again with commitToDb removed
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
	return await prisma.appointment.findMany({
		where: {
			appointment_status: {
				contains: 'pending',
			},
		},
	});
});

app.listen({ port: process.env.PORT, host: process.env.HOST }, (error) => {
	// if (error) {
	// 	app.log.error(error.message);
	// 	app.log.error(error.name);
	// 	process.exit(1);
	// }
});
