const { Client, Events, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require('./config.json');
const prefix = "!";

var handler = require("@tomdev/discord.js-command-handler");
var cmdhandler = new handler(client, "/BigBotBalls/commands", prefix);

client.commands = new Map();

client.once('ready', () => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
    client.user.setActivity("With your feelings || !");
    
});

client.on('message', message => {
    if (message.mentions.has(client.user)) {
        message.channel.send("Prefix is: `!`");
    }
});


client.on('messageDelete', message => {
    const channel1 = message.guild.channels.cache.find(ch => ['modlog', 'mod-log', 'logs'].includes(ch.name));
    if (!channel1) return;
    const user = message.author;
    console.log(`${message.id} was deleted!`);
    const messageDelete = new Discord.MessageEmbed()
        .setTitle('Message Delete')
        .addField('in channel', message.channel)
        .addField('User', `${message.author}`)
        .addField('Content in message', "`" + "``asciidoc\n" + `[${message.content}]` + "\n`" + "``")
        .setFooter('Timmy BETA -> Logging, Deleted Messages')
        .setTimestamp()
        .setColor('#8B0000')
        .setThumbnail(user.displayAvatarURL({ dynamic: false }));
    channel1.send(messageDelete);

    if (!message.partial) {
        console.log(`It had content: "${message.content}"`);
    }
});

client.config = require('./auth.json')
client.login(client.config.token)

// ...

