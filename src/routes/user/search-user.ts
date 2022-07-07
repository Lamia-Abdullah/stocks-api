import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { User } from '@prisma/client';
import { ObjectId } from 'bson';
import Fuse from 'fuse.js';
const  User = Type.Object({
	// user_id: Type.String({ format: 'uuid' }), 
	user_name: Type.String(),
	email :Type.String(),
	password :Type.String(),
	role :Type.String(),
});
const UserParams = Type.Object({
	user_id : Type.String(),
  });
type UserParams = Static<typeof UserParams>;
const GetUsersQuery = Type.Object({
	user_name: Type.Optional(Type.String()),
});
type GetUsersQuery = Static<typeof GetUsersQuery>;
export default async function (server: FastifyInstance) {
server.route({
	method: 'GET',
	url: '/Users',
	schema: {
		summary: 'Gets all Users or search by name',
		tags: ['Users'],
		querystring: GetUsersQuery,
		response: {
			'2xx': Type.Array(User),
		},
	},
	handler: async (request, reply) => {
		const query = request.query as GetUsersQuery;
		const User = await prismaClient.user.findMany();
		if (!query.user_name) return User;
		const fuse = new Fuse(User, {
			includeScore: true,
			isCaseSensitive: false,
			includeMatches: true,
			findAllMatches: true,
			threshold: 1,
			keys: ['name'],
		});
		console.log(JSON.stringify(fuse.search(query.user_name)));
		const result: User[] = fuse.search(query.user_name).map((r) => r.item);
		return result;
	},
});
}