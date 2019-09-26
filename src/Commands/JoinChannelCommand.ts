import * as Discord from 'discord.js'
import { IBotCommand, Dictionary, IServer } from '../interfaces';
import Pandora from '../Pandora';
import { sayNowInVoice } from '../modules'
import Command from './Command';

export default class JoinChannelCommand extends Command {

    constructor() {
        super("join", false)
    }

    help(): string {
        return "Joinuje kanał głosowy elo"
    }

    async runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void> {
        return new Promise(() => {
            let guild = this.isItGuildChannel(channel)
            if (!guild) {
                channel.send("This bot currently supports only voice channels on servers/guilds")
                return
            }

            if (servers[guild.id]) {
                channel.send("Im already connected!")
                return
            } else {
                if (msgObject) {
                    if (!msgObject.member.voiceChannel || msgObject.member.voiceChannel.guild.id != msgObject.guild.id) {
                        msgObject.channel.send("You need to be in voice channel first")
                        return
                    }
                    msgObject.member.voiceChannel.join()
                        .then(connection => {
                            sayNowInVoice("Hello I'm Pandora. How can i serve you?", connection)
                            servers[msgObject.guild.id] = { connection, queue: [], isListening: false, dispatcher: null, channel: channel }
                        }).catch(console.error);
                } else {
                    channel.send("Internal error")
                }
            }
        }
        )
    }
}


