// Variable Declarations, to be edited if new features are added
const  {Client, Intents} = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS_MESSAGES]});
// prefix config
const config = require('./config.json');
const prefix = config.prefix

client.commands = new Map();

// Function to execute commands from files
const loadCommands = (dir) => {
    const commandFiles = fs.readdirSync(path.join(__dirname, dir)).filter
}