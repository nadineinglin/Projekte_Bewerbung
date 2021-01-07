import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
import CardController from "./controllers.ts";

router
    .get("/cards", CardController.getAllCards)
    .post("/cards", CardController.createCard)
    .delete("/cards/:id", CardController.deleteCardById)
    .put("/cards/:id", CardController.updateCardById);

export default router;