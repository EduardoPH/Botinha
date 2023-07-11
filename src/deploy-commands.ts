import { REST, Routes } from "discord.js"
import fs from 'fs';
import path from 'path';
import { CustomCommand } from "./custom";

const { TOKEN, GUILD_ID, CLIENT_ID } = process.env
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

const commands = [];


const rest = new REST({ version: "10" }).setToken(TOKEN);

export async function deployCommands() {
  try {

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command: CustomCommand = require(filePath);
      commands.push(command.data.toJSON())
    }

    console.log(`Reseteando ${commands.length} comandos...`)
    const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

    console.log("Comandos registrados com sucesso")
  } catch (error) {
    console.error(error)
  }
}