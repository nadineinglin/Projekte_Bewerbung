import { Card, Column } from "./interface.ts";
import { v4 } from "https://deno.land/std@0.77.0/uuid/mod.ts";

export var cards: Card[] = [];
export var columns: Column[] = [
    {
        id: 1,
        title: "ToDo"
    }, {
        id: 2,
        title: "Doing"
    }, {
        id: 3,
        title: "Done"
    }
];

export default {

    getAllCards: ({ response }: { response: any }) => {
        response.status = 200;
        response.body = {
            success: true,
            dataCards: cards,
            dataColumns: columns
        }
    },
    createCard: async ({ request, response }: { request: any, response: any },) => {
        const body = await request.body();
        if (!request.hasBody) {
            response.status = 400;
            response.body = {
                success: false,
                message: "No data provided",
            };
            return;
        }

        const values = await body.value;

        let newCard: Card = {
            id: v4.generate(),
            tab: values.tab,
            title: values.title,
            description: values.description,
        };

        cards.push(newCard);

        response.body = {
            success: true,
            data: newCard,
        };
    },
    deleteCardById: ({ params, response }: { params: { id: string }; response: any }) => {
        cards = cards.filter(card => card.id !== params.id);
        response.status = 200;
        response.body = {
            success: true,
        };
    },
    updateCardById: async (
        { params, request, response }: {
            params: { id: string },
            request: any,
            response: any,
        }
    ) => {
        const card: Card | undefined = cards.find(c => c.id === params.id);
        if (!card) {
            response.body = {
                success: false,
                message: "Card not found",
            };
            return;
        }

        const body = await request.body();
        let values = await body.value;

        let updatedCard: Card = {
            id: values._Id,
            tab: values._Tab,
            title: values._Title,
            description: values._Description,
        };

        cards.map(c => {
            if (c.id === params.id) {
                c.tab = updatedCard.tab;
            }
        });

        response.status = 200;
        response.body = {
            success: true,
        };
    },
};