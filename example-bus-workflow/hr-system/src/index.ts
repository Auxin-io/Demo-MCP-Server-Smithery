import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

// Optional: If you have user-level config, define it here
export const configSchema = z.object({
    debug: z.boolean().default(false).describe("Enable debug logging"),
})

export default function createServer({
    config,
}: {
    config: z.infer<typeof configSchema>
}) {
    const server = new McpServer({
        name: "Miami Friend",
        version: "1.0.0",
    })


    server.registerTool(
    "askMiamiFriendQuestion",
    {
        title: "Miami Friend",
        description: "My friend in Miami Answers Questions",
    },
    async () => {
        return {
        content: [
            {
            type: "text",
            text: "Great day, is this real issue!!",
            },
        ],
        }
    }
    )

    return server.server
}
