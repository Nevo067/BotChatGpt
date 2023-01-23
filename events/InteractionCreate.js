const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`Aucune commande nommée: "${interaction.commandName}" n'a été trouvée.`);
			return;
		}

		try {
			await command.execute(interaction);
			console.log(`La commande ${interaction.commandName} a fonctionné avec succès`);
		} catch (error) {
			console.error(`Une erreur a eu lieu avec la commande: "${interaction.commandName}"`);
			console.error(error);
		}
	},
};