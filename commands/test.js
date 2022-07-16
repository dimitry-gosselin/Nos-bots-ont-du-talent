const Command = require('./command')

module.exports = class TestAnt extends Command{

	static parse(message){
        
		var urlImg = "http://www2.coucoucircus.org/audios/images-varietes/carlos-bigbisous.jpg";
		
		var answer1 = "titi!";
		var answer2 = "tutu!";
		
		var lowerMsg = message.content.trim().toLowerCase().valueOf();
		
		if (lowerMsg == answer1 || lowerMsg == answer2) {
			// protecting against self loop
			return false;	
		}
		else if (lowerMsg.indexOf("toto") != -1) {
			message.channel.send({ content:answer1 });
			return true;
		}
		else if (lowerMsg.indexOf("tata") != -1) {
			message.channel.send({ files:[urlImg], content:answer2 });
			return true;
		}

        return false;
    }
}
