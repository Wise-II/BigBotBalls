// Variable Declarations, to be edited if new features are added
const  {Client, Intents, Message} = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS_MESSAGES]});
// prefix config
const config = require('./config.json');
const prefix = config.prefix

client.commands = new Map();

// Function to execute commands from files
const loadCommands = (dir) => {
    const commandFiles = fs.readdirSync(path.join(__dirname, dir)).filter(file => fileURLToPath.endsWith('js'));
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, dir, file));
        client.commands.set(command.name, command);
    }
};

//loads the command handler function and defines the subdirectory as well as logging it in the console
loadCommands('commands');
console.log('Commands Loaded');

//logs the console indicating successfull login
client.once('ready',() =>{
    console.log('logged in successfully as ${client.user.tag}!');
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)|| message.author.bot)return;

    const args = message.content.slice(prefix)
})

