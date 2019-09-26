"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
class EmbedsFactory {
    static getAddedToQueueMsg(songTitle, songID, position) {
        return new Discord.RichEmbed()
            .setColor('#00db54')
            .setTitle(songTitle)
            .setURL(`https://www.youtube.com/watch?v=${songID}`)
            .setAuthor('Added to queue')
            .setThumbnail(`https://img.youtube.com/vi/${songID}/0.jpg`)
            .setFooter(`Position #${position}`);
    }
}
exports.default = EmbedsFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2VtYmVkcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxQztBQUdyQyxNQUE4QixhQUFhO0lBRWhDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxTQUFpQixFQUFFLE1BQWMsRUFBRSxRQUFnQjtRQUdoRixPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTthQUN6QixRQUFRLENBQUMsU0FBUyxDQUFDO2FBQ25CLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsTUFBTSxDQUFDLG1DQUFtQyxNQUFNLEVBQUUsQ0FBQzthQUNuRCxTQUFTLENBQUMsZ0JBQWdCLENBQUM7YUFDM0IsWUFBWSxDQUFDLDhCQUE4QixNQUFNLFFBQVEsQ0FBQzthQUMxRCxTQUFTLENBQUMsYUFBYSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRTVDLENBQUM7Q0FLSjtBQWxCRCxnQ0FrQkMifQ==