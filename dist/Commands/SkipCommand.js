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
class JoinChannelCommand extends Command_1.default {
    constructor() {
        super("skip", false);
    }
    help() {
        return "skipuje piosenki";
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let guild = this.isItGuildChannel(channel);
            if (!guild) {
                channel.send("This bot currently supports only voice channels on servers/guilds");
                return;
            }
            let server = servers[guild.id];
            if (server && server.dispatcher) {
                server.dispatcher.end("skip");
                yield channel.send(`Song skipped!`);
            }
            else {
                channel.send("Nothing is currently playing");
            }
        });
    }
}
exports.default = JoinChannelCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2tpcENvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tbWFuZHMvU2tpcENvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLHVDQUFnQztBQUVoQyxNQUFxQixrQkFBbUIsU0FBUSxpQkFBTztJQUVuRDtRQUNJLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDeEIsQ0FBQztJQUVELElBQUk7UUFDQSxPQUFPLGtCQUFrQixDQUFBO0lBQzdCLENBQUM7SUFDSyxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXlFLEVBQUUsR0FBWSxFQUFFLE9BQTRCLEVBQUUsSUFBa0IsRUFBRSxTQUEyQjs7WUFHbk0sSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFBO1lBQzFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxtRUFBbUUsQ0FBQyxDQUFBO2dCQUNqRixPQUFNO2FBQ1Q7WUFHRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQzlCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEVBQUU7Z0JBQzdCLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUM3QixNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUE7YUFFdEM7aUJBQU07Z0JBQ0gsT0FBTyxDQUFDLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO2FBRS9DO1FBS0wsQ0FBQztLQUFBO0NBQ0o7QUFqQ0QscUNBaUNDIn0=