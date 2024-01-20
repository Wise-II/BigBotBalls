const { Client, Collection, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const path = require('node:path');
const fs = require('node:fs');
const config = require('./config.json');
const auth = require('./auth.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

const prefix = '!';

var handler = require("@tomdev/discord.js-command-handler");
var cmdhandler = new handler(client, "/commands", prefix);
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

client.once('ready', () => {
    console.log(`Logged in successfully as ${client.user.tag}!`);
    client.user.setActivity("With your feelings || !");
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.on('messageDelete', message => {
    if (!message.guild) return;
    const channel1 = message.guild.channels.cache.find(ch => ch.name === 'logs');
    if (!channel1) return;

    const messageDelete = new EmbedBuilder()
        .setTitle('Message Delete')
        .addFields([
            { name: 'In Channel', value: message.channel.toString() },
            { name: 'User', value: message.author.toString() },
            { name: 'Content in message', value: `\`\`\`asciidoc\n[${message.content}]\`\`\`` }
        ])
        .setFooter({ text: 'Timmy BETA -> Logging, Deleted Messages' })
        .setTimestamp()
        .setColor('#8B0000')
        .setThumbnail(message.author.displayAvatarURL({ dynamic: false }));

    channel1.send({ embeds: [messageDelete] });
});

client.login(auth.token);
