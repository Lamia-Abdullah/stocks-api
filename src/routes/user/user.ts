import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertuserController } from '../../controllers/upsert-user';
import { prismaClient } from '../../prisma';
import { User } from '@prisma/client';
import _ from 'lodash';
import { addAuthorization } from '../../hooks/auth';

const  User = Type.Object({
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
	addAuthorization(server);	
	//Creates new user
	server.route({
        method: "POST",
        url: "/Users",
        schema: {
          summary: "Creates new user",
          tags: ["Users"],
          body: User,
        },
        handler: async (request, reply) => {
          const User = request.body as User;
          await prismaClient.user.create({ data: User });
          return prismaClient.user.findMany();
        },
    })

}
