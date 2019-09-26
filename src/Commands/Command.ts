import { IBotCommand, Dictionary, IServer } from "../interfaces";
import * as Discord from "discord.js"
import Pandora from "../Pandora"

export default abstract class Command implements IBotCommand {
    private command: string;
    public readonly needArguemnt: boolean;

    constructor(command: string, needArguemnts: boolean) {
        this.command = command;
        this.needArguemnt = needArguemnts;
    }


    help(): string {
        throw new Error("Method not implemented.");
    }
    isThisCommand(command: string): boolean {
        if (command == this.command)
            return true
        else return false
    }
    runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject: Discord.Message): Promise<void> {
        throw new Error("Method not implemented.");
    }

    isItGuildChannel(channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel): Discord.Guild | null {
        if (channel instanceof Discord.TextChannel) {
            return channel.guild

        }
        return null;

    }



}