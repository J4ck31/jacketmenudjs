const prompts = require('prompts');

async function menu() {
const mainaction = await prompts([
{
type: 'select',
name: 'text',
message: 'Choose an action',
choices: [
{ title: 'Music off/on', value: 'ModuleMusic' },
{ title: 'Join VoiceChannel', value: 'voicechanneljoiner' },
{ title: 'Join random voice channels', value: 'randomjoinchannels' },
{ title: 'Play Audio', value: 'setyttrack' },
{ title: 'Volume audio', value: 'musicvol' },
{ title: 'Stop audio', value: 'musicdisable' },
{ title: 'Join server', value: 'joinservers' },
{ title: 'Set status', value: 'setStatus' },
{ title: 'Leave server', value: 'leaveserver' }
],
}
]);
switch (mainaction.text) {
case "ModuleMusic":
for ( client of clients) {
client[0].music_turn();
}
menu();
break;
case "voicechanneljoiner": 
var action = await prompts([
{
type: 'text',
name: 'voicechannelid',
message: `Please write voice id.`
}
]);
for ( client of clients) {
await client[0].joinVoiceChannel(action.voicechannelid);
}
menu();

break;	
case "setyttrack":
var action = await prompts([
{
type: 'text',
name: 'url',
message: `Please write youtube url.`
}
]);        
for ( client of clients) {
client[0].audioplay(action.url);
}
menu();
break;
case "musicvol":
var action = await prompts([
{
type: 'text',
name: 'volume',
message: `Please write volume.`
}
]);
for ( client of clients) {
client[0].setVolume(action.volume);
};
menu();
break;	
case "randomjoinchannels":
var action = await prompts([
{
type: 'text',
name: 'guildID',
message: `Please write guild.`
}
]);
for ( client of clients) {
client[0].random_guild(action.guildID);
};
menu();
break;
case "musicdisable":
for ( client of clients) {
client[0].audiostop();
};
menu();
break;		   
case "joinservers":
var action = await prompts([
{
type: 'text',
name: 'inviteCode',
message: `Please write invite code.`
}
]);
clients.forEach((client, i)=>{
setTimeout(function(){
client[0].joinServer(action.inviteCode);
}, i * 150);
});
menu();
break;		   
case "setStatus":
var action = await prompts([
{
type: 'text',
name: 'text',
message: `Please write status text .`
}
]);
for ( client of clients) {
client[0].status_set(action.text);
}
menu();
break;
case "leaveserver":
const guild_id = await prompts([
{
type: 'text',
name: 'guild_id',
message: `Please write guild id.`
}
]);
for ( client of clients) {
client[0].clientLeave(guild_id.guild_id.toString());
};
menu();
break;		
}
}

module.exports.menu = menu;