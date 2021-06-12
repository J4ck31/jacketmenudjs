const ytdl = require('ytdl-core-discord');
const Discord = require("modify_lib_djs");
const request = require('request');
const { menu } = require('./menu.js');

function req(option){
return  new Promise((resolve, reject) => {
request(option, async function (err, res, body) {
if (err) return reject(err);
resolve({
headers: res.headers,
status: res.statusCode,
body
});
});
});
}

let Client = function(token){
let client = new Discord.Client();
client.login(token).catch(err => {
for (i = 0; i < clients.length; i++) {
if (token == clients[i][1]) {
clients.splice(i, 1);
if(clientsReady == clients.length) menu();
}
}
});

let CurrentVoiceChannelID = false;
let moduleMs = false;

client.on("ready", () => {
++clientsReady;
console.log(clientsReady + " / " + clients.length);
if(clientsReady == clients.length) menu();
});
let connections;
this.getClient = () => {return client};

this.joinVoiceChannel = function(chnid) {
CurrentVoiceChannelID = chnid;
try {
let channel = client.channels.cache.get(chnid);
channel.join().then(connected => {
connections = connected;
});
console.log(`Client  ${client.user.username} - Successfully join.`);
} catch (err) {
connections = false;
CurrentVoiceChannelID = false;
console.log(`Client  ${client.user.username} - Couldn't join. - ${err}`);
}
}

this.joinServer = async function(key) {
let joinserverlink = await req({
url: `https://discordapp.com/api/v7/invites/${key}?token=${token}`,
method: "POST",
json: true
});	
if(joinserverlink.status == 200){
console.log(`Client  ${client.user.username} - Successfully join.`);
} else {
console.log(`Client  ${client.user.username} - Couldn't join.`);
}
}
let dispatcher;
this.audioplay = async function (url_yt) {
if(moduleMs == true && CurrentVoiceChannelID){   
const stream = await ytdl(url_yt);
let channel = client.channels.cache.get(CurrentVoiceChannelID);
dispatcher = connections.play(stream, { type: 'opus' });

console.log(`Client  ${client.user.username} - playing music.`)
}
if(moduleMs == false){ console.log(`Client  ${client.user.username} - Module music disabled`);}
}
this.random_guild = function (guild_id) {
try {
let guild_info = client.guilds.cache.get(guild_id).channels.cache.filter(c => c.type === "voice" && c.members.size > 1);
let channels_id = Array.from(guild_info.keys());

if(guild_info) {
let voice_rand = channels_id[Math.floor(Math.random() * channels_id.length)];
CurrentVoiceChannelID = voice_rand;
let channel = client.channels.cache.get(voice_rand);
channel.join().then(connected => {
connections = connected;
});

}
} catch(e) {
CurrentVoiceChannelID = false;
connections = false;
}
}
this.audiostop =  function () {

if(dispatcher) dispatcher.end();

}
this.status_set =  function (status_text) {
if(!status_text){
console.log("You didn't set the status")
return
}
client.user.setActivity(status_text,{type: 'WATCHING'});

}

this.setVolume = function(volume) {
if(moduleMs == true){
if(dispatcher) dispatcher.setVolumeLogarithmic(volume);
console.log(`Client  ${client.user.username} - Volume is set - ${volume}`)
}
if(moduleMs == false){ console.log(`Client  ${client.user.username} - Music module disabled`);}
}
this.music_turn = function() {
if(moduleMs == false){ moduleMs = true; console.log(`Client  ${client.user.username} - Music module enabled`); return}
if(moduleMs == true){ moduleMs = false; console.log(`Client  ${client.user.username} - Music module disabled`); return}
}
this.leaveFromServer = function(){
client.guilds.forEach(async g => {
try{
await g.leave()
console.log(`${client.user.tag} - Exited from ${g.name}`)
}catch(e){
console.log(`${client.user.tag} - Can't get out of ${g.name} (${e.name})`)
}       
})
}
this.clientLeave = function(guildID){
let guild = client.guilds.get(guildID);
if(!guild) return console.log(`${client.user.tag} - has left`);

guild.leave().then(g => {
console.log(`${client.user.tag} - `);
}).catch(e => {
console.log(`${client.user.tag} - couldn't leave`)
});
}
}

module.exports.Client = Client;