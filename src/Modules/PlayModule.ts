import * as nodeUrl from "url"
import * as querystring from "querystring"
import { IServer, songRequest, songDetailsWithUser, songRequestUrl } from "../interfaces"
import EmbedsFactory from "../EmbedsFactory";
import YTModule from "./YTModule";
import *  as Discord from 'discord.js'
import SpotifyModule from "./SpotifyModule";

export default class PlayModule {
    private ytmodule: YTModule;
    private spotifyModule: SpotifyModule;

    constructor(ytmodule: YTModule, spotifyModule: SpotifyModule) {

        this.ytmodule = ytmodule;
        this.spotifyModule = spotifyModule


    }


    recognizeUrl = async (url: string): Promise<songRequestUrl[]> => {



        let ytRegex = "^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+"
        let spotifyRegex = "https?:\/\/open.spotify.com\/playlist\/[a-zA-Z0-9]+"

        //is yt link 
        if (url.match(ytRegex)) {
            let youtube = nodeUrl.parse(url);
            let query = querystring.parse(youtube.query as string);

            if (query.list) {
                try {
                    return await this.ytmodule.getSongRequestUrlsFromPlaylist(query.list as string)
                }
                catch{
                    throw Error("Invalid playlist link")
                }
            }

            else if (query.v) {
                try {
                    await this.ytmodule.getDetailsAboutVideo(query.v as string)
                    return [{ type: "youtube", url: query.v as string }]


                } catch{
                    throw Error("Invalid video link")
                }

            }

            else {
                throw Error("Invalid YT link")
            }
        }
        else if (url.match(spotifyRegex)) {
            let spotify = nodeUrl.parse(url);
            if (spotify.pathname) {
                return await this.spotifyModule.getPlaylistInfoFromSpotifyApi([this.ytmodule], spotify.pathname.split("/")[2]);

            }

            else { throw Error("Bot supports links from Youtube and Spotify Playlists") }




        } else if (nodeUrl.parse(url).hostname) {

            throw Error("Bot supports links from Youtube and Spotify Playlists")
        } else {
            try {
                let result = await this.ytmodule.searchForVideoWithLib(url, 1)
                return [{ type: "youtube", url: result[0].id.videoId }]


            } catch{
                throw Error("Couldnt search it YT")
            }

        }



    }


    handleUrlAndAddToQueue = async (url: string, user: Discord.User, server: IServer, onPosition: number) => {
        try {
            let songs = await this.recognizeUrl(url)
            let requests = this.createRequests(songs, user)

            server.queue.splice(onPosition, 0, ...requests)


            if (requests.length > 1) {
                server.channel.send("Added " + requests.length)

            } else {
                this.sendMessageQueue(requests[0], server.channel, onPosition + 1);
            }

        }
        catch (e) {
            server.channel.send(e.message)
        }



    }

    createRequests(songRequestUrls: songRequestUrl[], user: Discord.User): songRequest[] {
        let songRequests: songRequest[] = []

        for (let songRequestUrl of songRequestUrls) {
            songRequests.push({
                requested: user,
                ...songRequestUrl
            })
        }
        return songRequests;

    }





    handleDispatcher(server: IServer) {

        if (!server.dispatcher && server.queue[0]) {
            server.dispatcher = this.ytmodule.playYT(server.connection, server.queue[0].url)
            server.dispatcher.once("end", (reason) => {
                server.queue.shift();
                server.dispatcher = null;
                if (reason && reason != "stop")
                    setTimeout(() => {
                        this.handleDispatcher(server);
                    }, 1000);

            })
            this.sendMessagePlaying(server.queue[0], server.channel)
        }
    }

    sendMessagePlaying = async (songRequest: songRequest, channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel) => {
        if (songRequest.type == "youtube") {
            let details = await this.ytmodule.getDetailsAboutVideoWithLib(songRequest.url) as songDetailsWithUser;
            details.user = songRequest.requested;
            channel.send(EmbedsFactory.getPlaying(details));
        }
    }
    sendMessageQueue = async (songRequest: songRequest, channel: Discord.TextChannel | Discord.DMChannel | Discord.GroupDMChannel, position: number) => {
        if (songRequest.type == "youtube") {
            let details = await this.ytmodule.getDetailsAboutVideoWithLib(songRequest.url);

            channel.send(EmbedsFactory.getAddedToQueueMsg(details.name, details.url, position));
        }
    }






} 