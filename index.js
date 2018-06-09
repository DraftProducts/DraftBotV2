const Event = require('events');
const Discord = require('discord.js');

const config = require('./config.json');

const CommandManager = require('./src/command');
const playCmd = require('./src/commands/musique/play');
const skipCmd = require('./src/commands/musique/skip');
const musiqueCmd = require('./src/commands/musique/musique');
const pauseCmd = require('./src/commands/musique/pause');
const resumeCmd = require('./src/commands/musique/resume');
const stopCmd = require('./src/commands/musique/stop');
const volumeCmd = require('./src/commands/musique/volume');
const purgeCmd = require('./src/commands/musique/purge');
const queueCmd = require('./src/commands/musique/queue');
const joinCmd = require('./src/commands/musique/join');
const leaveCmd = require('./src/commands/musique/leave');
const embeds = require('./src/embeds');
const musics = new Map();

const CM = CommandManager.init();
CM.addCommand('play', playCmd);
CM.addCommand('skip', skipCmd);
CM.addCommand('musique', musiqueCmd);
CM.addCommand('volume', playCmd);
CM.addCommand('pause', pauseCmd);
CM.addCommand('resume', resumeCmd);
CM.addCommand('queue', queueCmd);
CM.addCommand('purge', purgeCmd);
CM.addCommand('stop', stopCmd);
CM.addCommand('join', joinCmd);
CM.addCommand('leave', leaveCmd);

const RM = new Event();

const DraftBot = new Discord.Client();

DraftBot.on('ready', () => {
	console.log('DraftBot connecté !');
	DraftBot.user.setActivity('Lire ses lignes', {
		type: 'PLAYING',
	});
});
DraftBot.on('message', (message) => {
	CM.messageHandler(message);
	RM.emit(message.channel.name, message);
});

DraftBot.on('messageUpdate', (message) => {
	CM.messageHandler(message);
	RM.emit(message.channel.name, message);
});

DraftBot.login(config.token);

process.on('SIGINT', () => {
	DraftBot.destroy();
});
module.exports.getMusics = () => musics;

function getMusics() {
    return musics;
}
