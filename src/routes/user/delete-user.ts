import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { prismaClient } from '../../prisma';
import { User } from '@prisma/client';
import { ObjectId } from 'bson';
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
export default async function (server: FastifyInstance) {
	server.route({
		method: 'DELETE',
		url: '/Users/:user_id',
		schema: {
			summary: 'Deletes a User',
			tags: ['Users'],
			params: UserParams,
		},
		handler: async (request, reply) => {
			const {user_id } = request.params as UserParams;
			if (!ObjectId.isValid(user_id)) {
				reply.badRequest('user_id should be an ObjectId!');
				return;
			}
			return prismaClient.user.delete({
				where: { user_id },
			});
		},
	});
}