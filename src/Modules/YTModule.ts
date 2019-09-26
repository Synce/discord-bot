
import { songRequestUrl, songDetails, IExactSearch, ytSearchVideoResult } from "../interfaces";
import *  as Discord from 'discord.js'
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const ytDurationFormat = require('youtube-duration-format');
import * as YTDL from "ytdl-core"
import { stringContainsSubstrings } from "../modules";
const ytSearch = require('yt-search')



export default class YTModule implements IExactSearch {



    getPlaylistYT = async (playlistId: string): Promise<string[]> => {

        try {

            let videos: ytPlaylistItemApiResult[] = [];
            let videosIDs: string[] = [];

            let nextPage = async (data: ytPlaylistApiResult) => {
                if (data.nextPageToken) {
                    await this.createPlaylistYTRequest(playlistId, data.nextPageToken).then(nextPage)
                }
                videos.push(...data.items)

            }
            await this.createPlaylistYTRequest(playlistId, "").then(nextPage)

            for (let video of videos) {
                videosIDs.push(video.contentDetails.videoId)
            }

            return videosIDs

        }
        catch{
            throw Error("Invalid playlist link")
        }
    }

    // async exactSearch(title: string, artists: string[]): Promise<songRequestUrl | null> {
    //     try {
    //         title = title.toLocaleLowerCase();


    //         let result = await this.searchForVideo(title + " " + artists.join(" ") + " lyrics", 1)

    //         if (stringContainsSubstrings(result[0].snippet.title.toLocaleLowerCase(), [title, "lyrics"])) {
    //             return { url: result[0].id.videoId, type: "youtube" }
    //         }
    //         else {
    //             let result = await this.searchForVideo(title + " " + artists.join(" "), 1)
    //             if (result[0].snippet.title.toLocaleLowerCase().includes(title)) {
    //                 return { url: result[0].id.videoId, type: "youtube" }
    //             }
    //         }
    //         return null

    //     } catch{
    //         return null
    //     }

    // }
    async exactSearch(title: string, artists: string[]): Promise<songRequestUrl | null> {
        try {
            title = title.toLocaleLowerCase();


            let result = await this.searchForVideoWithLib(title + " " + artists.join(" ") + " lyrics", 1)

            if (stringContainsSubstrings(result[0].snippet.title.toLocaleLowerCase(), [title, "lyrics"])) {
                return { url: result[0].id.videoId, type: "youtube" }
            }
            else {
                let result = await this.searchForVideoWithLib(title + " " + artists.join(" "), 1)
                if (result[0].snippet.title.toLocaleLowerCase().includes(title)) {
                    return { url: result[0].id.videoId, type: "youtube" }
                }
            }
            return null

        } catch{
            return null
        }

    }

    playYT(connection: Discord.VoiceConnection, url: string): Discord.StreamDispatcher {
        return connection.playStream(YTDL("https://www.youtube.com/watch?v=" + url, { filter: 'audioonly' }), { bitrate: 192000 /* 192kbps */ })
    }


    async searchForVideoWithLib(searchString: string, maxResults: number): Promise<ytSearchItem[]> {
        return new Promise<ytSearchItem[]>((resolve, reject) => {



            let arr: ytSearchItem[] = [];
            ytSearch(searchString, function (err: any, r: any) {
                try {
                    if (err) throw err


                    if (r.videos.length == 0)
                        throw Error("No Videos")

                    let allVideos = r.videos as ytSearchVideoResult[]

                    for (let i = 0; i < maxResults && i < allVideos.length; i++) {
                        let video = allVideos[i]

                        arr.push({ id: { videoId: video.videoId }, snippet: { title: video.title } })

                    }
                    resolve(arr);
                }
                catch (e) {


                    reject(Error("Invalid link"))

                }
            })

        })
    }

    async searchForVideo(searchString: string, maxResults: number): Promise<ytSearchItem[]> {



        try {
            let result = await youtube.search.list({
                key: "apikey",
                part: 'snippet',
                q: searchString,
                maxResults: maxResults,
                safeSearch: "none"
            });

            return result.data.items as ytSearchItem[];
        }
        catch (e) {

            throw Error("Invalid link")

        }





    }

    async createPlaylistYTRequest(playlistId: string, pageToken: string): Promise<ytPlaylistApiResult> {




        try {
            let result = await youtube.playlistItems.list({
                key: "apikey",
                part: 'contentDetails',
                pageToken: pageToken,
                playlistId: playlistId,
                maxResults: 50,
            });
            return result.data as ytPlaylistApiResult;
        }
        catch{
            throw Error("Invalid link")
        }





    }


    private async  getApiDetailsOfTheVideo(videoID: string): Promise<ytVideoItem> {
        try {
            let result = await youtube.videos.list({
                key: "apikey",
                part: 'contentDetails,snippet',
                id: videoID,
                maxResults: 1,
            })

            return result.data.items[0]
        }
        catch{
            throw Error("Invalid link")
        }
    }
    private async  getDetailsOfTheVideoWithLib(videoID: string): Promise<ytVideoItem> {

        return new Promise<ytVideoItem>((resolve) => {
            try {

                return ytSearch(videoID, function (err: any, r: any) {
                    if (err) throw err


                    if (r.videos.length == 0)
                        throw Error("No Videos")

                    let video = r.videos[0] as ytSearchVideoResult;
                    let item = {
                        id: videoID,
                        snippet: {
                            title: video.title
                        },
                        contentDetails: {
                            duration: video.duration.timestamp,
                        }
                    }
                    resolve(item);
                })

            }
            catch{
                throw Error("Invalid link")
            }
        })
    }

    getSongRequestUrlsFromPlaylist = async (playlistId: string): Promise<songRequestUrl[]> => {


        let songRequestUrls: songRequestUrl[] = []

        let videosIDs = await this.getPlaylistYT(playlistId);


        for (let id of videosIDs) {
            songRequestUrls.push({ url: id, type: "youtube" })

        }
        return songRequestUrls



    }
    getDetailsAboutVideo = async (videoId: string): Promise<songDetails> => {
        try {
            let details = await this.getApiDetailsOfTheVideo(videoId);
            return {
                url: "https://www.youtube.com/watch?v=" + details.id,
                name: details.snippet.title,
                thumbnailUrl: `https://img.youtube.com/vi/${details.id}/0.jpg`,
                duration: ytDurationFormat(details.contentDetails.duration),
                type: "youtube"
            }
        }
        catch{
            throw Error("Couldn't get a song")
        }



    }

    getDetailsAboutVideoWithLib = async (videoId: string): Promise<songDetails> => {
        try {
            let details = await this.getDetailsOfTheVideoWithLib(videoId);
            return {
                url: "https://www.youtube.com/watch?v=" + details.id,
                name: details.snippet.title,
                thumbnailUrl: `https://img.youtube.com/vi/${details.id}/0.jpg`,
                duration: details.contentDetails.duration,
                type: "youtube"
            }
        }
        catch{
            throw Error("Couldn't get a song")
        }



    }
}







interface ytPlaylistApiResult {

    nextPageToken: string | undefined;
    prevPageToken: string | undefined;
    pageInfo: {
        totalResults: number,
        resultsPerPage: number
    },
    items: ytPlaylistItemApiResult[]



}
interface ytPlaylistItemApiResult {

    id: string
    contentDetails: {
        videoId: string
        videoPublishedAt: string
    }

}


interface ytVideoItem {
    id: string
    snippet: {
        title: string
    }
    contentDetails: {
        duration: string,
    }
}

interface ytSearchItem {
    id: {
        videoId: string
    }
    snippet: {
        title: string
    }

}