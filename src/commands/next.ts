import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { CustomClient } from "../custom";
import { DisTube, SearchResult, Song } from 'distube';


const data = new SlashCommandBuilder()
  .setName("next")
  .setDescription("Pula para a próxima musica");

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
    await client.distube.skip(memberVoiceChannel)
    if(!await client.distube.getQueue(memberVoiceChannel).playing)
      await client.distube.resume(memberVoiceChannel)

    await interaction.reply("Musica pulada")
    
  } catch (error) {
    console.log(error)
    await interaction.reply("Nao foi possivel pular")
  }


}

export { data , execute}


