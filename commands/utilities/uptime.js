const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('uptime')
        .setDescription('Indique la durée de temps depuis le dernier démarrage du bot'),

    async execute(interaction, client) {
        const uptime = convertMS(client.uptime);
        const uptimeText = `${uptime.d} jours ${uptime.h} heures ${uptime.m} minutes ${uptime.s} secondes`;

        const embed = new EmbedBuilder()
        .setTitle(`__Temps passé depuis le dernier démarrage de ${client.user.username}__`)
        .setColor('#C6A969')
        .setTimestamp()
        .setFooter({ text: 'uptime', iconURL: client.user.displayAvatarURL() })
        .addFields(
            { name : 'Durée', value: uptimeText },
        );

        interaction.reply({ embeds: [embed] });

        function convertMS(ms) {
            let d, h, m, s;
            s = Math.floor(ms / 1000);
            m = Math.floor(s / 60);
            s = s % 60;
            h = Math.floor(m / 60);
            m = m % 60;
            d = Math.floor(h / 24);
            h = h % 24;
            return {
                d: d,
                 h: h,
                 m: m,
                 s: s,
            };
        }
    },
};