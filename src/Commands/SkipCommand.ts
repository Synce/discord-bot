import * as Discord from 'discord.js'
import { Dictionary, IServer } from '../interfaces';
import Pandora from '../Pandora';
import Command from './Command';

export default class JoinChannelCommand extends Command {

    constructor() {
        super("skip", false)
    }

    help(): string {
        return "skipuje piosenki"
    }
    async runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void> {


        let guild = this.isItGuildChannel(channel)
        if (!guild) {
            channel.send("This bot currently supports only voice channels on servers/guilds")
            return
        }


        let server = servers[guild.id]
        if (server && server.dispatcher) {
            server.dispatcher.end("skip")
            await channel.send(`Song skipped!`)

        } else {
            channel.send("Nothing is currently playing")

        }




    }
}


