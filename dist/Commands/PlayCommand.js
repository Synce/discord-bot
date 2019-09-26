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
const Command_1 = require("./Command");
class PlayCommand extends Command_1.default {
    constructor() {
        super("play", true);
    }
    help() {
        return "playuje piosenki";
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let guild = this.isItGuildChannel(channel);
            if (!guild) {
                channel.send("This bot currently supports only voice channels on servers/guilds");
                return;
            }
            let search = args.join(" ");
            if (!search) {
                channel.send("U need to pass search-phrase or link");
                return;
            }
            let server;
            if (!servers[guild.id])
                if (msgObject) {
                    if (!msgObject.member.voiceChannel || msgObject.member.voiceChannel.guild.id != msgObject.guild.id) {
                        msgObject.channel.send("You need to be in voice channel first");
                        return;
                    }
                    let connection = yield msgObject.member.voiceChannel.join();
                    servers[msgObject.guild.id] = { connection, queue: [], isListening: false, dispatcher: null, channel: msgObject.channel };
                }
                else {
                    channel.send("Internal error");
                    return;
                }
            server = servers[guild.id];
            yield bot.playModule.handleUrlAndAddToQueue(search, user, server, server.queue.length);
            bot.playModule.handleDispatcher(server);
        });
    }
}
exports.default = PlayCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tbWFuZHMvUGxheUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHVDQUFnQztBQUVoQyxNQUFxQixXQUFZLFNBQVEsaUJBQU87SUFHNUM7UUFDSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxrQkFBa0IsQ0FBQTtJQUM3QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF5RSxFQUFFLEdBQVksRUFBRSxPQUE0QixFQUFFLElBQWtCLEVBQUUsU0FBMkI7O1lBR25NLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMxQyxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLE9BQU8sQ0FBQyxJQUFJLENBQUMsbUVBQW1FLENBQUMsQ0FBQTtnQkFDakYsT0FBTTthQUNUO1lBRUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsc0NBQXNDLENBQUMsQ0FBQTtnQkFDcEQsT0FBTzthQUNWO1lBRUQsSUFBSSxNQUFlLENBQUM7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNsQixJQUFJLFNBQVMsRUFBRTtvQkFFWCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTt3QkFDaEcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUNBQXVDLENBQUMsQ0FBQTt3QkFDL0QsT0FBTTtxQkFDVDtvQkFDRCxJQUFJLFVBQVUsR0FBRyxNQUFNLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFBO29CQUMzRCxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxDQUFBO2lCQUU1SDtxQkFBTTtvQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7b0JBQzlCLE9BQU07aUJBRVQ7WUFFTCxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUUxQixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUV0RixHQUFHLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBSzVDLENBQUM7S0FBQTtDQUNKO0FBckRELDhCQXFEQyJ9