const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonjour')
        .setDescription('introduce the bot'),

    async execute(interaction)
    {
        await interaction.reply('Bonjour je suis le chatbot de Atom ');
    },

};