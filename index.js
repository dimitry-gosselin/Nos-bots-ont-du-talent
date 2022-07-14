const { Client, Intents } = require('discord.js');
const DiscordVoice = require('@discordjs/voice');
const querystring = require('querystring');
const r2          = require('r2');
const Discord = require('discord.js')
const bot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ] })
const ytdl = require('ytdl-core');
const dotenv = require('dotenv').config();

//Define constant env
const cat_api_key = process.env.CAT_API_KEY;
const discord_bot_token = process.env.DISCORD_BOT_TOKEN;



bot.on('ready', function () {
  console.log("Je suis connecté !")
})

bot.on('message', message => {
  if (message.content.startsWith('!play')) {
    let args = message.content.split(' ')
    const url = args[1];

    if(!url) return message.channel.send({ content : 'No url provided' });

    const pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

    if(!pattern.test(url)){
      return message.channel.send({ content : 'Erreur: lien non-valid' });
    }

    const stream = ytdl(url, { filter: 'audioonly' });

    const channel = message.member.voice.channel;

    const player = DiscordVoice.createAudioPlayer();
    const resource = DiscordVoice.createAudioResource(stream);

    const connection = DiscordVoice.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    connection.subscribe(player);
    player.play(resource, { inlineVolume: true });

    player.on(DiscordVoice.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });
  }
  
  if (message.content.toLowerCase().startsWith('cats') || message.content.toLowerCase().startsWith('cat')) {
    messageRecieved(message);
  }
})

bot.login(discord_bot_token)



async function messageRecieved(message){
  try{
    var images = await loadImage(message.author.username, message);
    var image = images[0];
    
    message.channel.send({files: [image.url] });
  }catch(error){
    console.log(error)
  }
}


async function loadImage(sub_id, message){

  let args = message.content.split(' ')
  const format = args[1];

  let mimeTypes = 'jpg,png,gif';
  console.log(format)
  console.log(typeof(format) )
  if(typeof(format) != 'undefined' && format.toLowerCase() == 'gif'){
    mimeTypes = 'gif';
  }

  var headers = {
      'X-API-KEY': cat_api_key,
  }
  var query_params = {
    'has_breeds': false,
    'mime_types': mimeTypes,
    'size': 'full',
    'sub_id': sub_id,
    'limit' : 1
  }
  
  let queryString = querystring.stringify(query_params);
  try {
    let _url = `https://api.thecatapi.com/v1/images/search?${queryString}`;
    var response = await r2.get(_url , {headers} ).json
  } catch (e) {
      console.log(e)
  }
  return response;

}