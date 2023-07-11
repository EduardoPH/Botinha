import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { DisTube, SearchResult, Song } from 'distube';

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("responde com Pong!!");

async function execute(interaction: CommandInteraction) {
  await interaction.reply(`Pong!!`);
}

export { data , execute}


