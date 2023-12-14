const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { timeout } = require("async");


const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const config = require('./config.json');
var prefix = '!';

var handler = require("@tomdev/discord.js-command-handler");
var cmdhandler = new handler(client, "/commands", prefix);
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = Path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath,file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}

 }


// sets bot status and logs in the console that it is ready
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

