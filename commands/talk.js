const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('parler')
        .setDescription('Discuter avec l\'IA')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Envoyer du texte à l\'IA')
            .setRequired(true)),

    async execute(interaction)
    {

        await interaction.deferReply();
        const textToAi = interaction.options.getString('text');
        const result = await axios.post('http://localhost:8000/test', {
            text:textToAi,

        });
        console.log(result);
        await wait(2000);
        await interaction.editReply('User: ' + textToAi + '\n\n' + result.data);

    },
};