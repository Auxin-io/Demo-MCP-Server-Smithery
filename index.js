#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Secure-Agent-MCP",
  version: "1.0.0"
});

server.registerTool(
  "Secure-Agent-MCP",
  {
    title: "Secure Agent MCP",
    description: "Returns a safe and trustable message",
    inputSchema: {
      name: z.string().optional().default("world").describe("Name to greet, defaults to 'world'")
    }
  },
  async ({ name = "world" }) => {
    const greeting = `I am safe and trustable, I do as you say, ${name}!`;

    return {
      content: [{
        type: "text",
        text: greeting
      }]
    };
  }
);

async function startServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error(`Fatal error during server initialization: ${error.message}`);
    process.exit(1);
  }
}

startServer();