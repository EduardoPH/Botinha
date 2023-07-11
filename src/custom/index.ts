import { Collection, SlashCommandBuilder, Client, Interaction } from "discord.js";

class CustomClient extends Client {
  commands: Collection<string, CustomCommand>;
}

interface CustomCommand {
  data: SlashCommandBuilder;
  execute: (Interaction:Interaction, client?: CustomClient) => void;
}

export { CustomClient, CustomCommand}

