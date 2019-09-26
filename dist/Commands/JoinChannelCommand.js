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
class JoinChannelCommand extends Command_1.default {
    constructor() {
        super("join", false);
    }
    help() {
        return "Joinuje kanał głosowy elo";
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
                    channel.send("Im already connected!");
                    return;
                }
                else {
                    if (msgObject) {
                        if (!msgObject.member.voiceChannel || msgObject.member.voiceChannel.guild.id != msgObject.guild.id) {
                            msgObject.channel.send("You need to be in voice channel first");
                            return;
                        }
                        msgObject.member.voiceChannel.join()
                            .then(connection => {
                            modules_1.sayNowInVoice("Hello I'm Pandora. How can i serve you?", connection);
                            servers[msgObject.guild.id] = { connection, queue: [], isListening: false, dispatcher: null, channel: channel };
                        }).catch(console.error);
                    }
                    else {
                        channel.send("Internal error");
                    }
                }
            });
        });
    }
}
exports.default = JoinChannelCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9pbkNoYW5uZWxDb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0NvbW1hbmRzL0pvaW5DaGFubmVsQ29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0Esd0NBQTBDO0FBQzFDLHVDQUFnQztBQUVoQyxNQUFxQixrQkFBbUIsU0FBUSxpQkFBTztJQUVuRDtRQUNJLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLDJCQUEyQixDQUFBO0lBQ3RDLENBQUM7SUFFSyxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXlFLEVBQUUsR0FBWSxFQUFFLE9BQTRCLEVBQUUsSUFBa0IsRUFBRSxTQUEyQjs7WUFDbk0sT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUU7Z0JBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixPQUFPLENBQUMsSUFBSSxDQUFDLG1FQUFtRSxDQUFDLENBQUE7b0JBQ2pGLE9BQU07aUJBQ1Q7Z0JBRUQsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO29CQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUE7b0JBQ3JDLE9BQU07aUJBQ1Q7cUJBQU07b0JBQ0gsSUFBSSxTQUFTLEVBQUU7d0JBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7NEJBQ2hHLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHVDQUF1QyxDQUFDLENBQUE7NEJBQy9ELE9BQU07eUJBQ1Q7d0JBQ0QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFOzZCQUMvQixJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7NEJBQ2YsdUJBQWEsQ0FBQyx5Q0FBeUMsRUFBRSxVQUFVLENBQUMsQ0FBQTs0QkFDcEUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFBO3dCQUNuSCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUMvQjt5QkFBTTt3QkFDSCxPQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUE7cUJBQ2pDO2lCQUNKO1lBQ0wsQ0FBQyxDQUNBLENBQUE7UUFDTCxDQUFDO0tBQUE7Q0FDSjtBQXZDRCxxQ0F1Q0MifQ==