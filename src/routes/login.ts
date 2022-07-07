import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../prisma';


const Login = Type.Object({
	email: Type.String({ format: 'email' }),
	password: Type.String(),
});
type Login = Static<typeof Login>;
export default async function (server: FastifyInstance) {
	server.route({
		method: 'POST',
		url: '/login',
		schema: {
			summary: 'Login a user and returns a token',
			body: Login,
		},
		handler: async (request, reply) => {
			const { email, password } = request.body as Login;

			const User = await prismaClient.user.findFirst({
				where: {
					email: email,
				
				},
			});
			if (!User) {
				const result = await prismaClient.user.create({
					data: {
						email: email,
						password: password,
						user_name : '',
						
					},
				});
				const token = server.jwt.sign({
					id: result.user_id,
					email: result.email,
					user_name : result.user_name,
					role: 'admin',
				});
				return {
					id: result.user_id,
					token,
					type: 'SignUp',
				};
			} else {
				if (User.password !== password) {
					reply.unauthorized();
					return;
				}
				const token = server.jwt.sign({
					id: User.user_id,
					email: User.email,
					user_name : User.user_name ,
					role: 'admin',
				});
				return {
					id: User.user_id,
					token,
					type: 'SignIn',
				};
			}
		},
	});
}
