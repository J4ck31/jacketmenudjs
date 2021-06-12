const fs=require("fs");

const { Client } = require('./src/manager.js');
const { menu } = require('./src/menu.js');
global.clientsReady = 0;
global.clients = [];
(async()=> {
if (!fs.existsSync('tokens.txt')) return console.log('Не вижу txt файла "tokens.txt", создайте его рядом и поместите туда токены :(');
let data = fs.readFileSync('tokens.txt');  
const tokens = data.toString().replace(/\r/g, '').replace(/,/g,'').split('\n');
for ( token of tokens) {
clients.push([new Client(token),token]);
}
})();
