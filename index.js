const { Client, Intents } = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ] });

const Play = require('./commands/play')
const Cat = require('./commands/cat')
const Gif = require('./commands/gif')
const Search = require('./commands/search')
const TestAnt = require("./commands/test")
const AuPied = require("./commands/aupied")
const discord_bot_token = process.env.DISCORD_BOT_TOKEN;

bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.on('message', message => {
  let commandUsed = AuPied.parse(message) || Cat.parse(message) || Search.parse(message) || Gif.parse(message) || TestAnt.parse(message) || Play.parse(message);
})

bot.login(discord_bot_token)


