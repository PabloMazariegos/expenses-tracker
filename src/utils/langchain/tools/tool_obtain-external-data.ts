import { tool } from "@langchain/core/tools";

export const obtainName = tool(
    async ({}) => {
        return "Juan manuel";
    },
    {
        name: "obtainName",
        description: "Obtain the name of the user"
    });