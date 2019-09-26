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
class NextCommand extends Command_1.default {
    constructor() {
        super("next", true);
    }
    help() {
        return "playuje piosenki";
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => __awaiter(this, void 0, void 0, function* () {
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
                let index = server.queue.length ? 1 : 0;
                yield bot.playModule.handleUrlAndAddToQueue(search, user, server, index);
                bot.playModule.handleDispatcher(server);
            }));
        });
    }
}
exports.default = NextCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV4dENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tbWFuZHMvTmV4dENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLHVDQUFnQztBQUVoQyxNQUFxQixXQUFZLFNBQVEsaUJBQU87SUFHNUM7UUFDSSxLQUFLLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3ZCLENBQUM7SUFFRCxJQUFJO1FBQ0EsT0FBTyxrQkFBa0IsQ0FBQTtJQUM3QixDQUFDO0lBRUssVUFBVSxDQUFDLElBQWMsRUFBRSxPQUF5RSxFQUFFLEdBQVksRUFBRSxPQUE0QixFQUFFLElBQWtCLEVBQUUsU0FBMkI7O1lBQ25NLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBUyxFQUFFO2dCQUUxQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsQ0FBQyxDQUFBO29CQUNqRixPQUFNO2lCQUNUO2dCQUVELElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQzNCLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFBO29CQUNwRCxPQUFPO2lCQUNWO2dCQUVELElBQUksTUFBZSxDQUFDO2dCQUVwQixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7b0JBQ2xCLElBQUksU0FBUyxFQUFFO3dCQUVYLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFOzRCQUNoRyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBOzRCQUMvRCxPQUFNO3lCQUNUO3dCQUNELElBQUksVUFBVSxHQUFHLE1BQU0sU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUE7d0JBQzNELE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUE7cUJBRTVIO3lCQUFNO3dCQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTt3QkFDOUIsT0FBTTtxQkFFVDtnQkFFTCxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFFMUIsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7Z0JBRXhFLEdBQUcsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7WUFHNUMsQ0FBQyxDQUFBLENBQ0EsQ0FBQTtRQUNMLENBQUM7S0FBQTtDQUNKO0FBdkRELDhCQXVEQyJ9