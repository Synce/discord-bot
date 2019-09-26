"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const configFile = require("./config.json");
const modules_1 = require("./modules");
const YTModule_js_1 = require("./Modules/YTModule.js");
const PlayModule_js_1 = require("./Modules/PlayModule.js");
const SpotifyModule_js_1 = require("./Modules/SpotifyModule.js");
class Pandora {
    constructor(configFile) {
        this.client = new Discord.Client();
        this.commands = [];
        this.voiceCommands = [];
        this.servers = {};
        this.voiceRequests = {};
        this.handleSpeaking = (user, speaking) => __awaiter(this, void 0, void 0, function* () {
            let connection = user.client.voiceConnections.first();
            let server = this.servers[connection.channel.guild.id];
            let streamOutputFile = yield modules_1.recordAudio(connection, user, speaking);
            let result = yield modules_1.recognizeAudio(streamOutputFile);
            let words = result[1].split(" ");
            try {
                if (words[0].toLowerCase() == "pandora") {
                    let command = words[1].toLocaleLowerCase();
                    words.splice(0, 2);
                    for (const commandClass of this.voiceCommands) {
                        if (commandClass.isThisCommand(command)) {
                            if (commandClass.needArguemnt && words.length == 0) {
                                this.voiceRequests[result[0]] = commandClass;
                                setTimeout(() => {
                                    if (this.voiceRequests[result[0]])
                                        delete this.voiceRequests[result[0]];
                                }, 5000);
                            }
                            else {
                                commandClass.runCommand(words, server.channel, this, this.servers, yield this.client.fetchUser(result[0]));
                            }
                        }
                    }
                }
                else if (this.voiceRequests[result[0]] && words[0].toLowerCase() != "error") {
                    this.voiceRequests[result[0]].runCommand(words, server.channel, this, this.servers, yield this.client.fetchUser(result[0]));
                    delete this.voiceRequests[result[0]];
                }
            }
            catch (_a) { }
        });
        this.configFile = configFile;
        this.playModule = new PlayModule_js_1.default(new YTModule_js_1.default(), new SpotifyModule_js_1.default());
    }
    startup() {
        this.loadCommands(`${__dirname}/Commands`);
        this.client.once('ready', () => {
            console.log('Ready!');
        });
        this.client.login(configFile.token);
        this.client.on('message', message => {
            this.handleCommand(message);
        });
        this.client.on("voiceStateUpdate", (oldMember, newMember) => {
            if (oldMember.id == this.client.user.id && this.servers[oldMember.guild.id] && oldMember.voiceChannelID != newMember.voiceChannelID) {
                let server = this.servers[oldMember.guild.id];
                server.connection.disconnect();
                if (server.dispatcher)
                    server.dispatcher.end("stop");
                server.channel.send("Left Channel");
                delete this.servers[oldMember.guild.id];
            }
        });
    }
    loadCommands(commandsPath) {
        let commandArray = this.configFile.commands;
        for (const commandName of commandArray) {
            const commandClass = require(`${commandsPath}/${commandName}`).default;
            const command = new commandClass();
            this.commands.push(command);
        }
        let voiceCommandArray = this.configFile.voiceCommands;
        for (const commandName of commandArray) {
            const commandClass = require(`${commandsPath}/${commandName}`).default;
            const command = new commandClass();
            this.voiceCommands.push(command);
        }
    }
    handleCommand(msg) {
        if (!msg.content.startsWith(configFile.prefix) || msg.author.bot)
            return;
        let args = msg.content.slice(configFile.prefix.length).split(' ');
        let command = args.shift();
        command = command.toLowerCase();
        for (const commandClass of this.commands) {
            if (commandClass.isThisCommand(command)) {
                commandClass.runCommand(args, msg.channel, this, this.servers, msg.author, msg);
            }
        }
    }
    addServerToHandleVoiceCommands(server) {
        server.isListening = true;
        server.connection.on("speaking", this.handleSpeaking);
    }
    removeServerToHandleVoiceCommands(server) {
        server.isListening = false;
        server.connection.removeListener("speaking", this.handleSpeaking);
    }
}
exports.default = Pandora;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZG9yYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9QYW5kb3JhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0M7QUFDdEMsNENBQTRDO0FBRTVDLHVDQUF1RDtBQUN2RCx1REFBNkM7QUFDN0MsMkRBQWlEO0FBQ2pELGlFQUF1RDtBQU92RCxNQUFxQixPQUFPO0lBVXhCLFlBQVksVUFBc0I7UUFUM0IsV0FBTSxHQUFtQixJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QyxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUM3QixrQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDbEMsWUFBTyxHQUF3QixFQUFFLENBQUE7UUFDakMsa0JBQWEsR0FBNEIsRUFBRSxDQUFBO1FBMEVsRCxtQkFBYyxHQUFHLENBQU8sSUFBa0IsRUFBRSxRQUFpQixFQUFFLEVBQUU7WUFFN0QsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUVyRCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRXRELElBQUksZ0JBQWdCLEdBQUcsTUFBTSxxQkFBVyxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUE7WUFDcEUsSUFBSSxNQUFNLEdBQUcsTUFBTSx3QkFBYyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFFcEQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNoQyxJQUFJO2dCQUNBLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxJQUFJLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxD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