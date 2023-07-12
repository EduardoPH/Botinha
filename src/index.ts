import { Collection, GatewayIntentBits, Events, SlashCommandBuilder, CommandInteraction, Interaction, REST, Channel, VoiceState } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { CustomClient, CustomCommand } from './custom';
import { deployCommands } from './deploy-commands';

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath);

const { TOKEN }= process.env

const client = new CustomClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildIntegrations] });

deployCommands()

client.commands = new Collection();

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command:CustomCommand = require(filePath);
	if(command.data && command.execute) {
		client.commands.set(command.data.name, command)
	}
}

client.once(Events.ClientReady , c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

 
client.login(TOKEN);

client.on(Events.InteractionCreate, async (interaction:Interaction) => {
	if(!interaction.isChatInputCommand()) return;
	
	console.log("Interaçõa de chat")

	


	try {
		const command = client.commands.get(interaction.commandName)
		if(!command) {
			return
		}
		await command.execute(interaction, client)
	} catch(error) {
		console.error(error);
		await interaction.reply("Comando não encontrado.")
		return;
	}

})
client.on(Events.VoiceStateUpdate, (oldState, newState) => {
  const guild = newState.guild;
  const voiceStates = guild.voiceStates.cache;

  console.log('Estado dos canais atualizados');
  voiceStates.set(newState.member.id, newState);
});
