const discord = require("discord.js");
const { Collection, Client, MessageEmbed, MessageActionRow, ButtonInteraction, Intents, MessageSelectMenu } = require("discord.js");
const botConfig = require("./botconfig.json");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) {
        console.log(" [COMMAND HNDLR] Ik kon geen files vinden.");
        return;
    }

    jsfiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen.`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.login(process.env.toke);

client.once("ready", () => {

    console.log(client.user.username, "is online");
    client.user.setActivity("!help", { type: "PLAYING" });

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.get("882380279438778369");

    if (!role) return;

    member.roles.add(role)

});

client.on("messageCreate", message => {

    if (message.channel.type === "DM") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    const args = message.content.slice(prefix.length).split(/ +/);

    if (message.author.bot) return;

    if (!message.content.startsWith(prefix)) return;

    var commands = client.commands.get(command.slice(prefix.length));

    var commandList = [];
    var prefix = botConfig.prefix;

    if (command === `${prefix}help`) {

        client.commands.forEach(command => {

            var constructor = {
                name: command.help.name,
                description: command.help.description,
                category: command.help.category
            }

            commandList.push(constructor);

        });

        var response = "**Bot commands**\n\n";
        var general = "**__Algemeen__**\n";
        var info = "\n**__Informatie__**\n";
        var sbooster = "\n**__Server Booster__**\n"
        var games = "\n**__Games__**\n";
        var mod = "\n**__Moderatie__**\n";
        var admin = "\n**__Administratie__**\n";
        var verificatie = "\n**__Verificatie__**\n";

        for (let i = 0; i < commandList.length; i++) {
            const command = commandList[i];

            if (command["category"] == "Algemeen") {

                general += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Verificatie") {

                verificatie += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Informatie") {

                info += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Server Booster") {

                sbooster += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Games") {

                games += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Moderatie") {

                mod += `${prefix}${command["name"]} - ${command["description"]}\n`;

            } else if (command["category"] == "Administratie") {

                admin += `${prefix}${command["name"]} - ${command["description"]}\n`;

            }

        }

        response += general;
        response += info;
        response += sbooster;
        response += games;
        response += mod;
        response += admin;


        message.author.send(response).then(() => {
            message.channel.send("Je commands staan in je privé berichten.");
        }).catch(() => {
            message.channel.send("Je privé berichten staan uit dus je hebt niets ontvangen.");
        });
    }

    if (commands) commands.run(client, message, args);

    if (command === `${prefix}vc`) {

        const args = message.content.slice(prefix.length).split(/ +/);

        if (!args[1]) return message.channel.send("Ongeldige argumenten opgegeven. Gebruik het commando als volgt: !vc unlock/lock/create/delete.");

    }



});