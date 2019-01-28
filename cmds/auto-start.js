const Discord = require('discord.js');
const fs = require('fs');
const settings = require('./../settings.json');
const owner = settings.owner;

module.exports.run = async (bot, message, args) => {

    let voice = "519312759368974336";
    let codes = "539179182383693838";
    let general = "539289016823185409";

    console.log("Activating auto command");

    let raw = fs.readFileSync('./roles.json');
    let allowedRoles = JSON.parse(raw);

    let validation = function(serverRoles, userRoles){
        let val = false;
        serverRoles.forEach((role) => {
            userRoles.forEach((usr) => {
                if (role == usr){
                    val = true;
                }
            });
        });
        return val;
    }

    let intro = new Discord.RichEmbed()
        .setTitle("Scrim will start every xx:00 and xx:30")
        .setColor("#00cc00");

    bot.guilds.get(message.guild.id).channels.get(general).send({embed: intro}).catch((err) => {
        console.log(err);
    });

    let autoScrims = setInterval(() => {
        let time = new Date();
        let min = time.getMinutes();
        let embed = new Discord.RichEmbed()
            .setColor("#00cc00");

        if (min === 55 || min === 25){
            embed.setTitle("Next scrim starts in 5 minutes!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 57 || min === 27){
            embed.setTitle("Next scrim starts in 3 minutes!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 59 || min === 29){
            embed.setTitle("Next scrim starts in 1 minute!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                console.log(err);
            });
        }else if (min === 00 || min === 30){
            embed.setTitle("NEXT SCRIM STARTING NOW, make sure you are in the Snipe Countdown channel!");

            bot.guilds.get(message.guild.id).channels.get(general).send({embed: embed}).catch((err) => {
                console.log(err);
            });

            bot.guilds.get(message.guild.id).channels.get(codes).send("!count").catch((err) => {
                console.log(err);
            });

            bot.guilds.get(message.guild.id).channels.get(codes).send("!start").catch((err) => {
                console.log(err);
            });
        }

        const filter = m => !m.author.bot;
        const collect = bot.guilds.get(message.guild.id).channels.get(general)
            .createMessageCollector(filter, {time: 60000});

        collect.on('collect', m => {
            if (m.content === "!auto-stop"){
                if(validation(allowedRoles.roles, m.member.roles.array()) || m.member.id === owner){
                    clearInterval(autoScrims);
                    collect.stop();
                    bot.guilds.get(message.guild.id).channel.get(general).send("Auto scrims stopped!").catch((err) => {
                        console.log(err);
                    });
                }
            }
        });

         
    }, 60000)

}



module.exports.help = {
    name: "auto-start"
}