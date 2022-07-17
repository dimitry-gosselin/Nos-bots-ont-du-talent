const Command = require('./command')
const giphy = require('giphy-api')(process.env.GIPHY_API_KEY);

module.exports = class Cat extends Command{


    static match(message){
        return message.content.toLowerCase().startsWith('!gif');
    }

    static action(message){
        this.messageRecieved(message);
    }

    static async messageRecieved(message){

        let keywords = message.content.replace('!gif', '').trim()
        if(typeof(keywords) == 'undefined'){
            return message.channel.send({ content : 'Il faut au moins 1 mot clé.' });
        }
        giphy.translate(keywords, function (err, res) {
            if(typeof(res) != 'undefined' && typeof(res.data) != 'undefined' && typeof(res.data.images) != 'undefined' && typeof(res.data.images.downsized) != 'undefined' && typeof(res.data.images.downsized.url) != 'undefined'){
                var image = res.data.images.downsized.url;
                message.channel.send({files: [image] });
            }else{
                console.log('rien trouvé')
                console.log(res)
            }
        });
    }
}