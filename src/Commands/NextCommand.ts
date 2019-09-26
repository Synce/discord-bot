import * as Discord from 'discord.js'
import { IBotCommand, Dictionary, IServer } from '../interfaces';
import Pandora from '../Pandora';
import { findYTURL } from '../modules'
import EmbedsFactory from '../EmbedsFactory'
import Command from './Command';

export default class NextCommand extends Command {


    constructor() {
        super("next", true)
    }

    help(): string {
        return "playuje piosenki"
    }

    async runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void> {
        return new Promise(async () => {

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

            let index = server.queue.length ? 1 : 0;
            await bot.playModule.handleUrlAndAddToQueue(search, user, server, index)

            bot.playModule.handleDispatcher(server);


        }
        )
    }
}


