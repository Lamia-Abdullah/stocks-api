import fastfy from "fastify";
const server = fastfy();

server.get("/name",async function() {
  return{status:"Hi"};
});
async function main() {
  try {
    await server.listen({ port: 3000 });
    console.log(`Server ready at http://localhost:3000`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
main()