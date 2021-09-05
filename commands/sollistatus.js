const { Collection, Client, MessageEmbed, MessageActionRow, ButtonInteraction, Intents, MessageSelectMenu } = require("discord.js");
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var embed = new MessageEmbed()
        .setTitle(`👔 Sollicitatiestatus ${message.guild.name}`)
        .setColor("#6e6d6d")
        .setTimestamp()
        .setDescription("Zie hieronder de sollicitatiestatus van Den Haag Roleplay.")
        .addFields(
            { name: "🚔 Politie", value: "Geopend" },
            { name: "🚒 Brandweer", value: "Geopend" },
            { name: "🚑 Ambulance", value: "Geopend" },
            { name: "🚧 Rijkswaterstaat", value: "Geopend" },
            { name: "🚦 Verkeerspolitie", value: "Geopend" },
            { name: "🚨 Koninklijke Marechaussee", value: "Geopend" },
            { name: "🔫 Dienst Speciale Interventies", value: "Gesloten" },
            { name: "🛠 Developer", value: "Geopend" }
        );

    message.channel.send({
        embeds: [embed]
    });

}

module.exports.help = {
    name: "sollistatus",
    description: "Geeft sollicitatiestatus weer.",
    category: "Informatie"
}