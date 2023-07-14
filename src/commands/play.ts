import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import { SearchResult, Song } from 'distube';
import { CustomClient } from "../custom";

const data = new SlashCommandBuilder()
  .setName("play")
  .setDescription("Reproduz uma musica no canal conectado.")
  .addStringOption(option =>
    option.setName("query")
        .setDescription("Provide the name or url for the song.")
        .setRequired(true)
);


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
  const query = interaction.options.get('query').value;


  const songs: SearchResult[] = await client.distube.search(query.toString());



  await interaction.reply(`Você está conctado em ${memberVoiceChannel.name} e pedinho a musica ${songs[0].name}`)

  try {
    const song: Song = new Song(songs[0]);
  
    const queue = client.distube.getQueue(memberVoiceChannel);
  
    if (!queue) {
      await client.distube.queues.create(memberVoiceChannel, song);
    } else {
      await client.distube.getQueue(memberVoiceChannel).addToQueue(song);
      await interaction.editReply(`O som ${song.name} foi adicionado a fila de ${await client.distube.getQueue(memberVoiceChannel).songs.length} musicas`)
    }
  
  } catch (error) {
    console.error(error);
    await interaction.editReply('Ocorreu um erro ao reproduzir a música.');
  }
}


export { data , execute}


