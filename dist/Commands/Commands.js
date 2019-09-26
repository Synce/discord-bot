"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(command) {
        this.command = command;
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
    runCommand(args, msgObject, bot, servers) {
        throw new Error("Method not implemented.");
    }
}
exports.default = Command;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tbWFuZHMvQ29tbWFuZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFJQSxNQUE4QixPQUFPO0lBR2pDLFlBQVksT0FBZTtRQUN2QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUMzQixDQUFDO0lBR0QsSUFBSTtRQUNBLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0QsYUFBYSxDQUFDLE9BQWU7UUFDekIsSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87WUFDdkIsT0FBTyxJQUFJLENBQUE7O1lBQ1YsT0FBTyxLQUFLLENBQUE7SUFDckIsQ0FBQztJQUNELFVBQVUsQ0FBQyxJQUFjLEVBQUUsU0FBMEIsRUFBRSxHQUFZLEVBQUUsT0FBNEI7UUFDN0YsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQy9DLENBQUM7Q0FJSjtBQXRCRCwwQkFzQkMifQ==