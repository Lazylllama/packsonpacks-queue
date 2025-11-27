import axios from "axios";
import { env } from "@/env";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const queueRouter = createTRPCRouter({
    getLatest: publicProcedure.query(() => {
        const res = axios
            .get(`${env.QUICKBUTIK_BASE_URL}/orders`, {
                headers: {
                    Authorization: `Basic ${btoa(`${env.QUICKBUTIK_API_KEY}:${env.QUICKBUTIK_API_KEY}`)}`,
                },
            })
            .then((response) => {
                const filteredOrders: {
                    order_id: string;
                    date_created: string;
                }[] = [];

                for (const order of response.data) {
                    if (order.status === "1") {
                        filteredOrders.push({
                            order_id: order.order_id,
                            date_created: order.date_created,
                        });
                    }
                }
                return filteredOrders;
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
                return [];
            });

        return res;
    }),
});
