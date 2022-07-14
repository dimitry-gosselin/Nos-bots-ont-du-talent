const Command = require('./command')
const fs = require("fs");
var search = require('youtube-search');


module.exports = class Cat extends Command{


    static match(message){
        return message.content.startsWith('!search');
    }

    static action(message){
        let args = message.content.split(' ')
        const keyword = args[1];

        
        if(!keyword) return message.channel.send({ content : 'Il faut rechercher au moins un mot.' });

        var opts = {
            maxResults: 5,
            key: 'AIzaSyAuI0zRCEi0MkZ59VZjkCE0adZsI4YJCro',
            type: 'video'
        };
        
        search(keyword, opts, function(err, videos) {
            if(err) return console.log(err);
        
            var messageDisplay = '';
            var i = 1;
            for(var key in videos){
                console.log(video);
                var video = videos[key];
                messageDisplay += i+'. '+video.title+'\n'
                i++;
            }
            message.channel.send({ content : messageDisplay });

          
            fs.writeFile("./data/video.json", JSON.stringify(videos), (err) => {
                if (err) console.error(err)
            });
        });
    }
}