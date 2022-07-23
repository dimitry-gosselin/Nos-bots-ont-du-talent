const Command = require('./command');
const https = require('https');

const CMD = "au pied";

module.exports = class AuPied extends Command{

	static parse(message){
		
		const lowerMsg = message.content.trim().toLowerCase().valueOf();
		
		if (lowerMsg.startsWith(CMD)) {
			auPiedLeToutou(message);
			return true;	
		}

        return false;
    }
}

const OPTIONS = {
	hostname: "clebard-bot.herokuapp.com",
	port: 443,
	method: 'GET',
};
function auPiedLeToutou(message) {
	const req = https.request(OPTIONS, res => {
		res.on('data', d => {
			message.channel.send({ content:d.toString() });
		});
	})
	req.on('error', error => {
	  console.error(error);
	});
	req.end();
}




