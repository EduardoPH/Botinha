import { Collection, SlashCommandBuilder, Client, Interaction } from "discord.js";
import { DisTube } from "distube";

class CustomClient extends Client {
  commands: Collection<string, CustomCommand>;
  distube: DisTube
}

interface CustomCommand {
  data: SlashCommandBuilder;
  execute: (Interaction:Interaction, client?: CustomClient) => void;
}

export { CustomClient, CustomCommand}

