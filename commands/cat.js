const Command = require('./command')
const querystring = require('querystring');
const r2          = require('r2');
const dotenv = require('dotenv').config();

const cat_api_key = process.env.CAT_API_KEY;

module.exports = class Cat extends Command{


    static match(message){
        return message.content.toLowerCase().startsWith('cats') || message.content.toLowerCase().startsWith('cat');
    }

    static action(message){
        this.messageRecieved(message);
    }

    static async messageRecieved(message){

        let args = message.content.split(' ')
        const format = args[1];
        if(typeof(format) != 'undefined' && format.toLowerCase() == 'help'){
            return message.channel.send({ content : '**Miaouh!**\n\n**cat**: Affiche un potit chat.\n**cat help**: Affiche l\'aide pour les débiles.\n**cat gif**: Affiche un GIF de potit chat.' });
        }

        try{
            var images = await this.loadImage(message.author.username, message);
            var image = images[0];
            
            message.channel.send({files: [image.url] });
        }catch(error){
            console.log(error)
        }
    }

    static async loadImage(sub_id, message){

        let args = message.content.split(' ')
        const format = args[1];
    
        let mimeTypes = 'jpg,png,gif';
        
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
}