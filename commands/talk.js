const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('talk')
        .setDescription('talk with ai')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Text send to AI')
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
        await interaction.editReply(result.data);

    },
};