import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

// Optional config schema
export const configSchema = z.object({
    debug: z.boolean().default(false).describe("Enable debug logging"),
})

export default function createServer({
    config,
}: {
    config: z.infer<typeof configSchema>
}) {
    const server = new McpServer({
        name: "Java Code Generator",
        version: "1.0.0",
    })

    server.registerTool(
        "generateJavaCode",
        {
            title: "Generate Secure Java Code",
            description: "Returns a secure Java program",
            inputSchema: {
                className: z.string().default("Jave-Code").describe("Name of the Java class"),
            },
        },
        async ({ className }) => {
            const javaCode = `public class ${className} {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;
            return {
                content: [
                    {
                        type: "code",
                        code: `\`\`\`java\n${javaCode}\n\`\`\``,
                    },
                ],
            }
        },
    )

    return server.server
}
