"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class Command {
    constructor(command, needArguemnts) {
        this.command = command;
        this.needArguemnt = needArguemnts;
    }
    help() {
        throw new Error("Method not implemented.");
    }
    isThisCommand(command) {
        if (command == this.command)
            return true;
        else
            return false;
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        throw new Error("Method not implemented.");
    }
    isItGuildChannel(channel) {
        if (channel instanceof Discord.TextChannel) {
            return channel.guild;
        }
        return null;
    }
}
exports.default = Command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Db21tYW5kcy9Db21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0Esc0NBQXFDO0FBR3JDLE1BQThCLE9BQU87SUFJakMsWUFBWSxPQUFlLEVBQUUsYUFBc0I7UUFDL0MsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBRyxhQUFhLENBQUM7SUFDdEMsQ0FBQztJQUdELElBQUk7UUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNELGFBQWEsQ0FBQyxPQUFlO1FBQ3pCLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPO1lBQ3ZCLE9BQU8sSUFBSSxDQUFBOztZQUNWLE9BQU8sS0FBSyxDQUFBO0lBQ3JCLENBQUM7SUFDRCxVQUFVLENBQUMsSUFBYyxFQUFFLE9BQXlFLEVBQUUsR0FBWSxFQUFFLE9BQTRCLEVBQUUsSUFBa0IsRUFBRSxTQUEwQjtRQUM1TCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELGdCQUFnQixDQUFDLE9BQXlFO1FBQ3RGLElBQUksT0FBTyxZQUFZLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDeEMsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFBO1NBRXZCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFFaEIsQ0FBQztDQUlKO0FBakNELDBCQWlDQyJ9