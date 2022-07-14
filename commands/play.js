const Command = require('./command')
const DiscordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');
const fs = require("fs");

module.exports = class Cat extends Command{


    static match(message){
        return message.content.startsWith('!play');
    }

    static action(message){
        let args = message.content.split(' ')
        let url = args[1];

        if(!url) return message.channel.send({ content : 'No url provided' });

        const pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

        if(!pattern.test(url) && isNaN(parseInt(url))){
            return message.channel.send({ content : 'Erreur: lien non-valid' });
        }

        if(!isNaN(parseInt(url))){
            let choice = parseInt(url);
            console.log(choice)
            if(choice < 1 || choice > 5){
                return message.channel.send({ content : 'Dose frére!' });
            }

            let videos = JSON.parse(fs.readFileSync("./data/video.json", "utf8"));

            url = videos[choice-1].link;
        }

        const stream = ytdl(url, { filter: 'audioonly' });

        const channel = message.member.voice.channel;

        
        if(channel == null){
            return message.channel.send({ content : 'Il faut au moins 1 clébard dans le canal vocal!' });
        }

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
}