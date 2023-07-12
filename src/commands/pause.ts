import { SlashCommandBuilder, CommandInteraction } from "discord.js";
import { CustomClient } from "../custom";
import { DisTube, SearchResult, Song } from 'distube';


const data = new SlashCommandBuilder()
  .setName("pause")
  .setDescription("Pausa a musica que está tocando no momento");

async function execute(interaction: CommandInteraction, client: CustomClient) {
  const userId = interaction.member.user.id;
  const voiceState = interaction.guild.voiceStates.cache.get(userId);
  const memberVoiceChannel = voiceState?.channel;

  return await interaction.reply("Esse comando ainda não está disponível. Por favor, use o comando play caso queria trocar de musica ou desconecte o bot caso querira para-lo.");
  if (!memberVoiceChannel) {
    return interaction.reply("Você precisa estar conectado a um canal de voz para usar este comando.");
  }

  const distube = new DisTube(client, { searchSongs: 1 });

  if (interaction.replied || interaction.deferred) {
    return;
  }



}

export { data , execute}


