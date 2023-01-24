const {SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, SelectMenuOptionBuilder, StringSelectMenuBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roles')
        .setDescription('Affiche un panneau de rôles à choisir')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
        async execute(interaction) {
            const { customId, values, guild, channel } = interaction;

            try {
                const panelEmbed = new EmbedBuilder()
                    .setDescription('Choississez un rôle ci-dessous')
                    .setColor('DarkNavy');

                    // interaction.reply({ content: '```\n' + guild.roles.cache.sort((a, b) => b.position - a.position).map(role=>role.id) + '\n```',
                    // ephemeral: true });
                    const options = guild.roles.cache.sort((a, b) => b.position - a.position).map(role => {

                        return {
                            label: role.name,
                            value: role.id,
                            description: "lorem ipsum",
                            emoji: undefined,
                        };
                    });

                    const menuComponents = [
                        new ActionRowBuilder().addComponents(
                            new StringSelectMenuBuilder()
                                .setCustomId('reaction-role')
                                .setMaxValues(options.length)
                                .addOptions(options),
                        ),
                    ];

                    channel.send({ embeds: [panelEmbed], components: menuComponents });
                    channel.send('Ce n\'est pas encore fonctionnel');

                    return interaction.reply({ content: 'Envoie du panel avec succès', ephemeral: true });
            } catch (error) {
                console.log('error: ' + error);
            }
        },
};