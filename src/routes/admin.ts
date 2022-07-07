import { Static, Type } from '@sinclair/typebox';
import { upsertadminController } from '../controllers/admin-stock';
import {Admin} from '@prisma/client';
import fastifySensible from'@fastify/sensible'
import Fuse from 'fuse.js';
import { FastifyInstance } from 'fastify';


//schema
const  Admin = Type.Object({
	// user_id: Type.String({ format: 'uuid' }), 
	name : Type.String(),
	stock_id : Type.String(),
	user_id :Type.String(),
});
type admin = Static<typeof Admin>;
const AdminParams = Type.Object({
	user_id : Type.String(),
  });
  type AdminParams = Static<typeof AdminParams>;
const GetAdminQuery = Type.Object({
	user_name: Type.Optional(Type.String()),
});
type GetAdminQuery = Static<typeof GetAdminQuery>;


export default async function (server: FastifyInstance) {
/// Get all user or search by name
// server.route({
// 	method: 'GET',
// 	url: '/Admin',
// 	schema: {
// 		summary: 'Gets all Users',
// 		tags: ['admin'],
// 		querystring: GetAdminQuery,
// 		response: {
// 			'2xx': Type.Array(Admin),
// 		},
// 	},
// 	handler: async (request, reply) => {
// 		const query = request.query as GetAdminQuery;

// 		const Admin = await AdminParams.admin.findMany();
// 		if (!query.user_name) return Admin;
// 		const fuse = new Fuse(Admin, {
// 			includeScore: true,
// 			isCaseSensitive: false,
// 			includeMatches: true,
// 			findAllMatches: true,
// 			threshold: 1,
// 			keys: ['name'],
// 		});
// 		console.log(JSON.stringify(fuse.search(query.user_name)));
// 		const result: Admin[] = fuse.search(query.user_name).map((r) => r.item);
// 		return result;
// // 	},
// });
}