const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { API } = require('../../config.json');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('init')
        .setDescription('init ai')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Text send to AI')
            .setRequired(true)),

    async execute(interaction)
    {
        await interaction.deferReply();
        const textToAi = interaction.options.getString('text');
        console.log(API + 'init');
        console.log('xxx');
        const result = await axios.post(API + 'init', {
            text:textToAi,
        });

        console.log(result);
        await wait(2000);
        console.log(result.data);
        await interaction.editReply('User: ' + textToAi + '\n\n' + result.data);

    },
};