import * as Discord from 'discord.js'
import { IBotCommand, Dictionary, IServer } from '../interfaces';
import Pandora from '../Pandora';
import { findYTURL } from '../modules'
import EmbedsFactory from '../EmbedsFactory'
import Command from './Command';

export default class PlayCommand extends Command {


    constructor() {
        super("play", true)
    }

    help(): string {
        return "playuje piosenki"
    }

    async runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void> {


        let guild = this.isItGuildChannel(channel)
        if (!guild) {
            channel.send("This bot currently supports only voice channels on servers/guilds")
            return
        }

        let search = args.join(" ")
        if (!search) {
            channel.send("U need to pass search-phrase or link")
            return;
        }

        let server: IServer;
        if (!servers[guild.id])
            if (msgObject) {

                if (!msgObject.member.voiceChannel || msgObject.member.voiceChannel.guild.id != msgObject.guild.id) {
                    msgObject.channel.send("You need to be in voice channel first")
                    return
                }
                let connection = await msgObject.member.voiceChannel.join()
                servers[msgObject.guild.id] = { connection, queue: [], isListening: false, dispatcher: null, channel: msgObject.channel }

            } else {
                channel.send("Internal error")
                return

            }

        server = servers[guild.id]

        await bot.playModule.handleUrlAndAddToQueue(search, user, server, server.queue.length)

        bot.playModule.handleDispatcher(server);




    }
}


