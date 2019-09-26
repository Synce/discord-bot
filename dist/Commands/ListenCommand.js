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
const modules_1 = require("../modules");
const Command_1 = require("./Command");
class ListenCommand extends Command_1.default {
    constructor() {
        super("listen", true);
    }
    help() {
        return "Słucham teraz komend głosowych";
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => {
                let guild = this.isItGuildChannel(channel);
                if (!guild) {
                    channel.send("This bot currently supports only voice channels on servers/guilds");
                    return;
                }
                if (servers[guild.id]) {
                    let server = servers[guild.id];
                    if (args[0] && args[0].toLocaleLowerCase() == "start") {
                        if (server.isListening) {
                            channel.send("I'm already listening");
                            return;
                        }
                        bot.addServerToHandleVoiceCommands(server);
                        if (server.queue.length == 0)
                            modules_1.sayNowInVoice('Now im listening... ', server.connection);
                        else
                            channel.send("I wont interrupt music, but  I started listening");
                    }
                    else if (args[0] && args[0].toLocaleLowerCase() == "stop") {
                        if (!server.isListening) {
                            channel.send("I wasn't even listening");
                            return;
                        }
                        bot.removeServerToHandleVoiceCommands(server);
                        if (server.queue.length == 0)
                            modules_1.sayNowInVoice('Now i wont listen your commands... ', server.connection);
                        else
                            channel.send("I wont interrupt music, but  I stopped listening");
                    }
                    else {
                        channel.send("U need to pass argument `stop` or `start` ");
                    }
                }
                else {
                    channel.send("I need to join Voice channel first! Type !join");
                }
            });
        });
    }
}
exports.default = ListenCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdGVuQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21tYW5kcy9MaXN0ZW5Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSx3Q0FBMEM7QUFFMUMsdUNBQWdDO0FBS2hDLE1BQXFCLGFBQWMsU0FBUSxpQkFBTztJQUk5QztRQUNJLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLGdDQUFnQyxDQUFBO0lBQzNDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXlFLEVBQUUsR0FBWSxFQUFFLE9BQTRCLEVBQUUsSUFBa0IsRUFBRSxTQUEyQjs7WUFDbk0sT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBRXBCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPLENBQUMsSUFBSSxDQUFDLG1FQUFtRSxDQUFDLENBQUE7b0JBQ2pGLE9BQU07aUJBQ1Q7Z0JBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUVuQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUUvQixJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxPQUFPLEVBQUU7d0JBQ25ELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTs0QkFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFBOzRCQUNyQyxPQUFNO3lCQUNUO3dCQUNELEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxNQUFNLENBQUMsQ0FBQTt3QkFDMUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDOzRCQUN4Qix1QkFBYSxDQUFDLHNCQUFzQixFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7NEJBRXhELE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQTtxQkFFdkU7eUJBQ0ksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLElBQUksTUFBTSxFQUFFO3dCQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRTs0QkFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBOzRCQUN2QyxPQUFNO3lCQUNUO3dCQUNELEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTt3QkFDN0MsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDOzRCQUN4Qix1QkFBYSxDQUFDLHFDQUFxQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTs7NEJBRXZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0RBQWtELENBQUMsQ0FBQTtxQkFFdkU7eUJBQU07d0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO3FCQUM3RDtpQkFFSjtxQkFBTTtvQkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGdEQUFnRCxDQUFDLENBQUE7aUJBQ2pFO1lBSUwsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDO0tBQUE7Q0FDSjtBQTVERCxnQ0E0REMifQ==