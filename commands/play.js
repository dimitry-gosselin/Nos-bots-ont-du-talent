const Command = require('./command')
const DiscordVoice = require('@discordjs/voice');
const ytdl = require('ytdl-core');

module.exports = class Cat extends Command{


    static match(message){
        return message.content.startsWith('!play');
    }

    static action(message){
        let args = message.content.split(' ')
        const url = args[1];

        if(!url) return message.channel.send({ content : 'No url provided' });

        const pattern = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/;

        if(!pattern.test(url)){
        return message.channel.send({ content : 'Erreur: lien non-valid' });
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