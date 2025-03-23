import { Mastra } from "@mastra/core/mastra";
import { createLogger } from "@mastra/core/logger";
import { cursorRulesAgent } from "./agents";

export const mastra = new Mastra({
  agents: { cursorRulesAgent },
  logger: createLogger({
    name: "Github Cursor Rules Agent",
    level: "info",
  }),
});
