import * as Discord from 'discord.js'
import { songRequest, songDetailsWithUser } from './interfaces';


export default abstract class EmbedsFactory {

    public static getAddedToQueueMsg(songTitle: string, songID: string, position: number): Discord.RichEmbed {


        return new Discord.RichEmbed()
            .setColor('#00db54')
            .setTitle(songTitle)
            .setURL(`https://www.youtube.com/watch?v=${songID}`)
            .setAuthor('Added to queue')
            .setThumbnail(`https://img.youtube.com/vi/${songID}/0.jpg`)
            .setFooter(`Position #${position}`);

    }
    public static getPlaying(song: songDetailsWithUser): Discord.RichEmbed {


        return new Discord.RichEmbed()
            .setColor('#f04337')
            .setTitle(song.name)
            .setURL(song.url)
            .setAuthor('Now playing')
            .setThumbnail(song.thumbnailUrl)
            .setDescription('```\n Duration: ' + song.duration + '```  Requested by ' + song.user.toString());

    }



}


