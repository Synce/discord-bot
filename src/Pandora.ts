import *  as Discord from 'discord.js'
import * as configFile from './config.json';
import { IBotCommand, IServer, Dictionary, ConfigFile } from './interfaces.js';
import { recordAudio, recognizeAudio } from './modules'
import YTModule from './Modules/YTModule.js';
import PlayModule from './Modules/PlayModule.js';
import SpotifyModule from './Modules/SpotifyModule.js';






export default class Pandora {
    public client: Discord.Client = new Discord.Client();
    public commands: IBotCommand[] = [];
    public voiceCommands: IBotCommand[] = [];
    public servers: Dictionary<IServer> = {}
    public voiceRequests: Dictionary<IBotCommand> = {}
    public playModule: PlayModule;

    private configFile: ConfigFile

    constructor(configFile: ConfigFile) {
        this.configFile = configFile;
        this.playModule = new PlayModule(new YTModule(), new SpotifyModule());

    }

    startup() {

        this.loadCommands(`${__dirname}/Commands`)

        this.client.once('ready', () => {
            console.log('Ready!');
        });

        this.client.login(configFile.token);

        this.client.on('message', message => {
            this.handleCommand(message);

        });
        this.client.on("voiceStateUpdate", (oldMember: Discord.GuildMember, newMember: Discord.GuildMember) => {

            if (oldMember.id == this.client.user.id && this.servers[oldMember.guild.id] && oldMember.voiceChannelID != newMember.voiceChannelID) {
                let server = this.servers[oldMember.guild.id]
                server.connection.disconnect();
                if (server.dispatcher)
                    server.dispatcher.end("stop")
                server.channel.send("Left Channel")
                delete this.servers[oldMember.guild.id]
            }
        })

    }




    loadCommands(commandsPath: string) {

        let commandArray: string[] = this.configFile.commands;
        for (const commandName of commandArray) {
            const commandClass = require(`${commandsPath}/${commandName}`).default;
            const command = new commandClass() as IBotCommand;
            this.commands.push(command)
        }
        let voiceCommandArray: string[] = this.configFile.voiceCommands;
        for (const commandName of commandArray) {
            const commandClass = require(`${commandsPath}/${commandName}`).default;
            const command = new commandClass() as IBotCommand;
            this.voiceCommands.push(command)
        }

    }
    handleCommand(msg: Discord.Message) {

        if (!msg.content.startsWith(configFile.prefix) || msg.author.bot) return;

        let args = msg.content.slice(configFile.prefix.length).split(' ');

        let command = args.shift() as string;
        command = command.toLowerCase();

        for (const commandClass of this.commands) {
            if (commandClass.isThisCommand(command)) {
                commandClass.runCommand(args, msg.channel, this, this.servers, msg.author, msg);
            }

        }
    }
    handleSpeaking = async (user: Discord.User, speaking: boolean) => {

        let connection = user.client.voiceConnections.first()

        let server = this.servers[connection.channel.guild.id]

        let streamOutputFile = await recordAudio(connection, user, speaking)
        let result = await recognizeAudio(streamOutputFile);

        let words = result[1].split(" ")
        try {
            if (words[0].toLowerCase() == "pandora") {
                let command = words[1].toLocaleLowerCase();
                words.splice(0, 2)
                for (const commandClass of this.voiceCommands) {
                    if (commandClass.isThisCommand(command)) {
                        if (commandClass.needArguemnt && words.length == 0) {
                            this.voiceRequests[result[0]] = commandClass;

                            setTimeout(() => {
                                if (this.voiceRequests[result[0]])
                                    delete this.voiceRequests[result[0]]
                            }, 5000)

                        } else {

                            commandClass.runCommand(words, server.channel, this, this.servers, await this.client.fetchUser(result[0]));
                        }
                    }

                }

            } else if (this.voiceRequests[result[0]] && words[0].toLowerCase() != "error") {

                this.voiceRequests[result[0]].runCommand(words, server.channel, this, this.servers, await this.client.fetchUser(result[0]));
                delete this.voiceRequests[result[0]]
            }
        }
        catch{ }




    }




    addServerToHandleVoiceCommands(server: IServer) {
        server.isListening = true;
        server.connection.on("speaking", this.handleSpeaking)

    }
    removeServerToHandleVoiceCommands(server: IServer) {
        server.isListening = false;
        server.connection.removeListener("speaking", this.handleSpeaking)

    }



}
