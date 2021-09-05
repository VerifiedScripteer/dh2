const { Collection, Client, MessageEmbed, MessageActionRow, ButtonInteraction, Intents, MessageSelectMenu } = require("discord.js");
const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var embed = new MessageEmbed()
        .setDescription(`Hallo ${message.author.tag}!`)
        .setColor("RANDOM");

    message.channel.send({
        embeds:[embed]
    });

}

module.exports.help = {
    name: "hallo",
    description: "De bot zegt hallo terug.",
    category: "Algemeen"
}