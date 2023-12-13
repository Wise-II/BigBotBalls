// Variable Declarations, to be edited if new features are added
const  {Client, Intents} = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILDS_MESSAGES]});
const config = require('./config.json');
