import { Static, Type } from '@sinclair/typebox';
import { FastifyInstance } from 'fastify';
import { ObjectId } from 'bson';
import { prismaClient} from '../../prisma';
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
export default async function (server: FastifyInstance) {
     server.route({
        method: 'DELETE',
        url: '/stocks/:stock_id',
        schema: {
          summary: 'Deletes a stock',
          tags: ['stocks'],
          params: StockParams,
        },
        handler: async (request, reply) => {
          const {   stock_id   } = request.params as StockParams;
          if (!ObjectId.isValid(  stock_id )) {
            reply.badRequest('  stock_id should be an ObjectId!');
            return;
          }
          return prismaClient.stock.delete({
            where: {   stock_id  },
          });
        },
      }); 
    }