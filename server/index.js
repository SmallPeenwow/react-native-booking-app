import fastify from 'fastify';
import sensible from '@fastify/sensible';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import dotenv from 'dotenv';

dotenv.config();

//TODO: delete node_modules and install

const app = fastify();
app.register(sensible);

app.register(cookie, { secret: process.env.COOKIE_SECRET });
app.register(cors, {
	// origin: process.env.CLIENT_URL,
	credentials: true,
});

app.get('/', function (req, res) {
	// res.send(supabase);
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

app.get('/login', (req, res) => {
	console.log('work');
	console.log(req);
	console.log(res);
});

app.listen({ port: 3001 });
