const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { timeout } = require("async");
const foldersPath = 'BigBotBalls/silly';
const commandFolders = fs.readdirSync(foldersPath).filter(item => fs.statSync(path.join(foldersPath, item)).isDirectory());


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require('./config.json');
var prefix = 't.';

//var handler = require("@tomdev/discord.js-command-handler");
//var cmdhandler = new handler(client, "commands", prefix);
//client.commands = new Collection();
 // Make sure this is the correct path to your commands directory


for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);

    if (!fs.existsSync(commandsPath) || !fs.statSync(commandsPath).isDirectory()) {
        console.error(`${commandsPath} is not a directory or does not exist.`);
        continue; // Skip to the next iteration if it's not a directory
    }

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        try {
            const command = require(filePath);
            // Process the command object here
        } catch (error) {
            console.error(`Failed to load command at ${filePath}:`, error);
        }
    }
}


// sets bot status and logs in the console that it is ready
client.once('ready', () => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
    console.log('')
    client.user.setActivity("With your feelings || !");
    
});

client.on('message', message => {
    if (message.mentions.has(client.user)) {
        message.channel.send("Prefix is: `!`");
    }
});


client.on('messageDelete', message => {
    const channel1 = message.guild.channels.cache.find(ch => ['logs'].includes(ch.name));
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

