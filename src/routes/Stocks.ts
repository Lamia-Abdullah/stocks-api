import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertStocksController } from '../controllers/upsert-Stocks';
import { server } from '../server';

const Contact = Type.Object({
	id: Type.String({ format: 'uuid' }),
	Stocks_name: Type.String(),
	
});
type Stock = Static<typeof Stock>;

const GetStocksQuery = Type.Object({
	Stocks_name: Type.Optional(Type.String()),
});
type GetContactsQuery = Static<typeof GetStocksQuery>;

export let Stocks: upsertStocksController[] = [
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa6', Stocks_name: 'Apple' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa5', Stocks_name: 'Facebook'},
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa2', Stocks_name: 'amazon' },
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa1', Stocks_name: 'Twitter'},
	{ id: '3fa85f64-5717-4562-b3fc-2c963f66afa3', Stocks_name: 'Spotifiy' },
];

export default async function (server: FastifyInstance) {
	server.route({
		method: 'PUT',
		url: '/Stocks',
		schema: {
			summary: 'Creates new Stocks + all properties are required',
			tags: ['Stocks'],
			body: Contact,
		},
		handler: async (request, reply) => {
			const newContact: any = request.body;
			return upsertContactController(Stocks, newContact);
		},
	});

	server.route({
		method: 'PATCH',
		url: '/Stocks/:id',
		schema: {
			summary: 'Update a Stocks by id + you dont need to pass all properties',
			tags: ['Contacts'],
			body: Type.Partial(Contact),
			params: Type.Object({
			id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const newContact: any = request.body;
			return upsertStocksController(Stocks, newContact);
		},
	});

	server.route({
		method: 'DELETE',
		url: '/Stocks/:id',
		schema: {
			summary: 'Deletes a Stocks',
			tags: ['Stocks'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			Stocks = Stocks.filter((c) => c.id !== id);

			return Stocks;
		},
	});

	server.route({
		method: 'GET',
		url: '/contacts/:id',
		schema: {
			summary: 'Returns one Stocks or null',
			tags: ['Stocks'],
			params: Type.Object({
				id: Type.String({ format: 'uuid' }),
			}),
			response: {
				'2xx': Type.Union([Stocks, Type.Null()]),
			},
		},
		handler: async (request, reply) => {
			const id = (request.params as any).id as string;

			return Stocks.find((c) => c.id === id) ?? null;
		},
	});

	server.route({
		method: 'GET',
		url: '/Stocks',
		schema: {
			summary: 'Gets all Stocks',
			tags: ['Stocks'],
			querystring: GetStocksQuery,
			response: {
				'2xx': Type.Array(Contact),
			},
		},
		handler: async (request, reply) => {
			const query = request.query as GetContactsQuery;
			if (query.Stocks_name) {
				return Stocks.filter((c) => c.Stocks_name.includes(query.Stocks_name ?? ''));
			} else {
				return Stocks;
			}
		},
	});
}

server.route({
	method: 'DELETE',
	url: '/Stocks/:id',
	schema: {
		summary: 'Deletes a Stocks',
		tags: ['Stocks'],
		params: Type.Object({
			id: Type.String({ format: 'uuid' }),
		}),
	},
	handler: async (request, reply) => {
		const id = (request.params as any).id as string;

		Stocks = Stocks.filter((c) => c.id !== id);

		return Stocks;
	},
});