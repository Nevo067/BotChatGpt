const { SlashCommandBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('bonjour')
        .setDescription('Présente le bot'),

    async execute(interaction)
    {
        await interaction.reply('Bonjour je suis le chatbot de Atom ');
    },

};