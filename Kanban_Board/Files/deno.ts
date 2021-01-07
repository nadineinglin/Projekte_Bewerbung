import { Application, send } from "https://deno.land/x/oak/mod.ts";
import cardRouter from "./Deno/routes.ts";

const app = new Application();
const port: number = 8000;

app.use(cardRouter.routes());
app.use(cardRouter.allowedMethods());

app.use(async context => {
  await send(context,
    context.request.url.pathname,
    {
      root: `${Deno.cwd()}/frontend`,
      index: "index.html"
})});

app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  console.log(`Listening on: ${port}`);
});

await app.listen({ port });