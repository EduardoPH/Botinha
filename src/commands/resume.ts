import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { CustomClient } from "../custom";
import { DisTube, SearchResult, Song } from 'distube';


const data = new SlashCommandBuilder()
  .setName("resume")
  .setDescription("Retorna a musica que está tocando no momento");

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

  try {
    await client.distube.resume(memberVoiceChannel)
    await interaction.reply("Voltando a tocar a musica")
    
  } catch (error) {
    console.log(error)
    await interaction.reply("Nao foi possivel pausar")
  }


}

export { data , execute}


