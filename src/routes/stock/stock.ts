import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { upsertstockController } from '../../controllers/upsert-stock';
import {Stock} from '@prisma/client';
import { prismaClient} from '../../prisma';
import Fuse from 'fuse.js';
import { addAuthorization } from '../../hooks/auth';

const Stock = Type.Object({
	name: Type.String(),
  open :Type.String(),
    height: Type.String(),
    low: Type.String(),
    volume:Type.String(),
});
type Stocks = Static<typeof Stock>;
const StockParams = Type.Object({
  stock_id : Type.String(),
});
type StockParams = Static<typeof StockParams>;
const GetStocksQuery = Type.Object({
	text: Type.Optional(Type.String()),
});
type GetStocksQuery = Static<typeof GetStocksQuery>;
export default async function (server: FastifyInstance) {
     addAuthorization(server);	
    server.route({
        method: "POST",
        url: "/stocs",
        schema: {
          summary: "Creates new stock",
          tags: ["stocks"],
          body: Stock,
        },
        handler: async (request, reply) => {
          const Stock = request.body as Stock;
          await prismaClient.stock.create({ data: Stock });
          return prismaClient.stock.findMany();
        }});
       /// Get all stocks or search by name
        server.route({
          method: 'GET',
          url: '/stocks',
          schema: {
            summary: 'Gets all stocks search by name',
            tags: ['stocks'],
            querystring: GetStocksQuery,
            response: {
              '2xx': Type.Array(Stock),
            },
          },
          handler: async (request, reply) => {
            const query = request.query as GetStocksQuery;
            const Stock = await prismaClient.stock.findMany();
            if (!query.text) return Stock;
            const fuse = new Fuse(Stock, {
              includeScore: true,
              isCaseSensitive: false,
              includeMatches: true,
              findAllMatches: true,
              threshold: 1,
              keys: ['name',' height','low'],
            });
            console.log(JSON.stringify(fuse.search(query.text)));
            const result: Stock[] = fuse.search(query.text).map((r) => r.item);
            return result;
          },
        });
      };
