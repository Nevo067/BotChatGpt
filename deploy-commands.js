const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const commands = [];

// Read command Files and folders
const commandsPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandsPath);

// Find all the command files in the commands directory
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`${commandsPath}/${folder}`).filter(file => file.endsWith('.js'));
	console.log(`******\nDossier de commandes "${folder}" chargé\n`);

	// Push the SlashCommandBuilder data of each command for deployment
	for (const file of commandFiles) {
		const command = require(`${commandsPath}/${folder}/${file}`);
		commands.push(command.data.toJSON());
		console.log(`Donné de "${file}" envoyées`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			// Send to one server
			// Routes.applicationGuildCommands(clientId, guildId),
			// Send on all servers
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();