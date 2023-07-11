import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { CustomClient } from "../custom";


const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pausa a musica que está tocando no momento");

async function execute(interaction: CommandInteraction, client: CustomClient) {
  const userId = interaction.member.user.id;
  const voiceState = interaction.guild.voiceStates.cache.get(userId);
  const memberVoiceChannel = voiceState?.channel;
  if (!memberVoiceChannel) {
    return interaction.reply("Você precisa estar conectado a um canal de voz para usar este comando.");
  }

  if (interaction.replied || interaction.deferred) {
    return;
  }
}

export { data , execute}


