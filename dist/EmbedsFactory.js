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
    static getPlaying(song) {
        return new Discord.RichEmbed()
            .setColor('#f04337')
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor('Now playing')
            .setThumbnail(song.thumbnailUrl)
            .setDescription('```\n Duration: ' + song.duration + '```  Requested by ' + song.user.toString());
    }
}
exports.default = EmbedsFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW1iZWRzRmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9FbWJlZHNGYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXFDO0FBSXJDLE1BQThCLGFBQWE7SUFFaEMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLFNBQWlCLEVBQUUsTUFBYyxFQUFFLFFBQWdCO1FBR2hGLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFFO2FBQ3pCLFFBQVEsQ0FBQyxTQUFTLENBQUM7YUFDbkIsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixNQUFNLENBQUMsbUNBQW1DLE1BQU0sRUFBRSxDQUFDO2FBQ25ELFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQzthQUMzQixZQUFZLENBQUMsOEJBQThCLE1BQU0sUUFBUSxDQUFDO2FBQzFELFNBQVMsQ0FBQyxhQUFhLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFNUMsQ0FBQztJQUNNLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBeUI7UUFHOUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUU7YUFDekIsUUFBUSxDQUFDLFNBQVMsQ0FBQzthQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzthQUNoQixTQUFTLENBQUMsYUFBYSxDQUFDO2FBQ3hCLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQy9CLGNBQWMsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLG9CQUFvQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUUxRyxDQUFDO0NBSUo7QUE3QkQsZ0NBNkJDIn0=