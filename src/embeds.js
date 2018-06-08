const Discord = require('discord.js');

module.exports = {
	songEmbed: (song) =>
		new Discord.RichEmbed()
			.addField(
				':notes: En cours',
				`[${song.title}]` +
					`(${song.url}) ajouté par **${song.author}**`
			)
			.setThumbnail(`${song.thumbnail}`)
			.setTimestamp(new Date())
			.setFooter(
				'DraftMan | Développeur FrontEnd & Graphiste',
				'https://www.draftman.fr/images/avatar.jpg'
			),
};
