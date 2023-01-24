const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			interaction.reply({ content: `La commande "${interaction.commandName}" n'existe pas` });
			console.error(`Aucune commande nommée: "${interaction.commandName}" n'a été trouvée.`);
			return;
		}

		try {
			await command.execute(interaction, client);
			console.log(`La commande ${interaction.commandName} a fonctionné avec succès`);
		} catch (error) {
			console.error(`Une erreur a eu lieu avec la commande: "${interaction.commandName}"`);
			console.error(error);
		}
	},
};