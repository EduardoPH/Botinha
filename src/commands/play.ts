import { SlashCommandBuilder, CommandInteraction, EmbedBuilder } from "discord.js";
import { DisTube, SearchResult, Song } from 'distube';
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

  const distube = new DisTube(client, { searchSongs: 1 });

  const songs: SearchResult[] = await distube.search(query.toString());


  await interaction.reply(`Você está conctado em ${memberVoiceChannel.name} e pedinho a musica ${songs[0].name}`)


  try {

    await distube.play(memberVoiceChannel, songs[0])
  } catch (error) {
    console.error(error);
    await interaction.reply('Ocorreu um erro ao reproduzir a música.');
  }
}


export { data , execute}


