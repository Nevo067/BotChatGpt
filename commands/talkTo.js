const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const wait = require('node:timers/promises').setTimeout;
const { API } = require('../config.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('discuter')
        .setDescription('Faire une discussion avec l\'IA avec un suivi')
        .addStringOption(option => option
            .setName('text')
            .setDescription('Envoyer du texte à l\'IA')
            .setRequired(true)),

    async execute(interaction)
    {

        await interaction.deferReply();
        const textToAi = interaction.options.getString('text');
        console.log(API + '/talkto');
        const result = await axios.post(API + 'talkto', {
            text:textToAi,

        });
        console.log(result.data);
        await wait(2000);
        await interaction.editReply('User: ' + textToAi + '\n\n' + result.data);

    },
};