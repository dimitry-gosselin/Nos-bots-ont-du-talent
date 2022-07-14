const Command = require('./command')
const querystring = require('querystring');
const r2          = require('r2');
const dotenv = require('dotenv').config();

const cat_api_key = process.env.CAT_API_KEY;

module.exports = class Command{


    static parse(message){
        if(this.match(message)){
            this.action(message);
            return true;
        }

        return false;
    }

    static match(message){
        return false;
    }

    static action(message){
    }
}