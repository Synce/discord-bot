import * as Discord from 'discord.js'
import Pandora from './Pandora';


export interface IBotCommand {
    readonly needArguemnt: boolean;
    help(): string;
    isThisCommand(command: string): boolean;
    runCommand(args: string[], channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, bot: Pandora, servers: Dictionary<IServer>, user: Discord.User, msgObject?: Discord.Message): Promise<void>;

}





export interface Dictionary<T> {
    [Key: string]: T;
}

export interface IServer {
    connection: Discord.VoiceConnection;
    dispatcher: Discord.StreamDispatcher | null;
    queue: songRequest[];
    isListening: boolean;
    channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel
}

export interface songRequest extends songRequestUrl {
    requested: Discord.User;
}



export interface songRequestUrl {
    url: string;
    type: string;
}
export interface IExactSearch {

    exactSearch(title: string, artists: string[]): Promise<songRequestUrl | null>

}

export interface songDetailsWithUser extends songDetails {
    user: Discord.User;

}

export interface songDetails {

    name: string;
    url: string;
    thumbnailUrl: string;
    type: string
    duration: string;

}

export interface ConfigFile {
    token: string;
    prefix: string;
    commands: string[];
    voiceCommands: string[];
}

export interface ytSearchVideoResult {

    title: string,
    url: string,
    videoId: string,
    seconds: number,
    timestamp: string,
    duration: {
        toString(): string,
        seconds: number,
        timestamp: string
    },
    ago: string,
    views: number,

    author: {
        name: string,
        id: string,
        url: string,
        userId: string,
        userName: string,
        userUrl: string,
        channelId: string,
        channelName: string,
        channelUrl: string
    }

}