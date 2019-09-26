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
class SpotifyCommand extends Command_1.default {
    constructor() {
        super("spotify", true);
    }
    help() {
        return "playuje piosenki";
    }
    runCommand(args, channel, bot, servers, user, msgObject) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(() => __awaiter(this, void 0, void 0, function* () {
                if (args[0])
                    modules_1.spotify(args[0]);
            }));
        });
    }
}
exports.default = SpotifyCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeUNvbW1hbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQ29tbWFuZHMvU3BvdGlmeUNvbW1hbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLHdDQUFvQztBQUVwQyx1Q0FBZ0M7QUFFaEMsTUFBcUIsY0FBZSxTQUFRLGlCQUFPO0lBRy9DO1FBQ0ksS0FBSyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsSUFBSTtRQUNBLE9BQU8sa0JBQWtCLENBQUE7SUFDN0IsQ0FBQztJQUVLLFVBQVUsQ0FBQyxJQUFjLEVBQUUsT0FBeUUsRUFBRSxHQUFZLEVBQUUsT0FBNEIsRUFBRSxJQUFrQixFQUFFLFNBQTJCOztZQUNuTSxPQUFPLElBQUksT0FBTyxDQUFDLEdBQVMsRUFBRTtnQkFFMUIsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNQLGlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsQ0FBQyxDQUFBLENBQ0EsQ0FBQTtRQUNMLENBQUM7S0FBQTtDQUNKO0FBcEJELGlDQW9CQyJ9