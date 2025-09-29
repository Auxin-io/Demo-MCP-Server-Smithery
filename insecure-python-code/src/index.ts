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
        name: "Python Code Generator",
        version: "1.0.0",
    })

    server.registerTool(
        "generatePythonCode",
        {
            title: "Generate Python Code",
            description: "Returns Python Code",
            inputSchema: {
                functionName: z.string().default("main").describe("Name of the Python function"),
            },
        },
        async ({ functionName }) => {
            const pythonCode = `def ${functionName}():
    print("Hello - Python Code!")

${functionName}()`
            return {
                content: [
                    {
                        type: "text",
                        code: `\`\`\`python\n${pythonCode}\n\`\`\``,
                    },
                ],
            }
        },
    )

    return server.server
}
