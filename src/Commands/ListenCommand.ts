import * as Discord from 'discord.js'
import { IBotCommand, Dictionary, IServer } from '../interfaces';
import { sayNowInVoice } from '../modules'
import Pandora from '../Pandora';
import Command from './Command';




export default class ListenCommand extends Command {



    constructor() {
        super("listen", true)
    }

    help(): string {
        return "Słucham teraz komend głosowych"
    }

    async runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void> {
        return new Promise(() => {

            let guild = this.isItGuildChannel(channel)
            if (!guild) {
                channel.send("This bot currently supports only voice channels on servers/guilds")
                return
            }

            if (servers[guild.id]) {

                let server = servers[guild.id];

                if (args[0] && args[0].toLocaleLowerCase() == "start") {
                    if (server.isListening) {
                        channel.send("I'm already listening")
                        return
                    }
                    bot.addServerToHandleVoiceCommands(server)
                    if (server.queue.length == 0)
                        sayNowInVoice('Now im listening... ', server.connection)
                    else
                        channel.send("I wont interrupt music, but  I started listening")

                }
                else if (args[0] && args[0].toLocaleLowerCase() == "stop") {
                    if (!server.isListening) {
                        channel.send("I wasn't even listening")
                        return
                    }
                    bot.removeServerToHandleVoiceCommands(server)
                    if (server.queue.length == 0)
                        sayNowInVoice('Now i wont listen your commands... ', server.connection)
                    else
                        channel.send("I wont interrupt music, but  I stopped listening")

                } else {
                    channel.send("U need to pass argument `stop` or `start` ")
                }

            } else {
                channel.send("I need to join Voice channel first! Type !join")
            }



        })
    }
}




