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

app.get('/SignInPage/:email/:password', async (req, res) => {
	return await commitToDb(
		prisma.user.findFirst({
			where: {
				email: req.params.email,
				password: req.params.password,
			},
			select: {
				access_level: true,
			},
		})
	);
});

app.post('/SignUpPage/create', async (req, res) => {
	return await commitToDb(
		prisma.user.create({
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
			},
		})
	);
});

// Return error to user or take data
async function commitToDb(promise) {
	const [error, data] = await app.to(promise);
	if (error) return app.httpErrors.internalServerError(error.message);
	return data;
}

app.listen({ port: 3001, host: '192.168.1.51', backlog: 511 }, (error) => {
	// if (error) {
	// 	app.log.error(error.message);
	// 	app.log.error(error.name);
	// 	process.exit(1);
	// }
});
