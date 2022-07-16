const Command = require('./command')

module.exports = class TestAnt extends Command{

	static parse(message){
        
		var urlImg = "http://www2.coucoucircus.org/audios/images-varietes/carlos-bigbisous.jpg";
		
		var lowerMsg = message.toLowerCase();
		
		if (lowerMsg.indexOf("toto")) {
			message.channel.send({ content:"toto!" });
			return true;
		}
		else if (lowerMsg.indexOf("tata")) {
			message.channel.send({ files:[urlImg], content:"tata!" });
			return true;
		}

        return false;
    }
}
