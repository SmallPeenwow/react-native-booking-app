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
	origin: 'exp://192.168.1.51:19000',
	// origin: 'http://10.0.2.2:19000',
	// origin: 'http://192.168.1.51:19000',
	// origin: 'http://localhost:19000',
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
	// Was using findFirstOrThrow and maybe check into it more with return response but was having Unhandled Promise Rejection with Object return type
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

// Return error to user or take data
// TODO: This shit fucks up magically and will remove and run over my other stuff after completing update
async function commitToDb(promise) {
	const [error, data] = await app.to(promise);
	// Will be used for just basic server side issues when interacting with database
	//if (error) return 'error';

	//TODO: check for 'No user found' then return
	//TODO-CHECK if the error must be a link back in some way with nested-comments
	console.log(error.message);
	if (error.message === 'No user found') {
		return 'No user found'; // Work around but maybe fix
	}
	//if (error) return app.httpErrors.internalServerError(error.message);
	return data;
}

app.listen({ port: 3001, host: '192.168.1.51' }, (error) => {
	// if (error) {
	// 	app.log.error(error.message);
	// 	app.log.error(error.name);
	// 	process.exit(1);
	// }
});
