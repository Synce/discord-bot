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
const nodeUrl = require("url");
const querystring = require("querystring");
const EmbedsFactory_1 = require("../EmbedsFactory");
class PlayModule {
    constructor(ytmodule, spotifyModule) {
        this.recognizeUrl = (url) => __awaiter(this, void 0, void 0, function* () {
            let ytRegex = "^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+";
            let spotifyRegex = "https?:\/\/open.spotify.com\/playlist\/[a-zA-Z0-9]+";
            if (url.match(ytRegex)) {
                let youtube = nodeUrl.parse(url);
                let query = querystring.parse(youtube.query);
                if (query.list) {
                    try {
                        return yield this.ytmodule.getSongRequestUrlsFromPlaylist(query.list);
                    }
                    catch (_a) {
                        throw Error("Invalid playlist link");
                    }
                }
                else if (query.v) {
                    try {
                        yield this.ytmodule.getDetailsAboutVideo(query.v);
                        return [{ type: "youtube", url: query.v }];
                    }
                    catch (_b) {
                        throw Error("Invalid video link");
                    }
                }
                else {
                    throw Error("Invalid YT link");
                }
            }
            else if (url.match(spotifyRegex)) {
                let spotify = nodeUrl.parse(url);
                if (spotify.pathname) {
                    return yield this.spotifyModule.getPlaylistInfoFromSpotifyApi([this.ytmodule], spotify.pathname.split("/")[2]);
                }
                else {
                    throw Error("Bot supports links from Youtube and Spotify Playlists");
                }
            }
            else if (nodeUrl.parse(url).hostname) {
                throw Error("Bot supports links from Youtube and Spotify Playlists");
            }
            else {
                try {
                    let result = yield this.ytmodule.searchForVideoWithLib(url, 1);
                    return [{ type: "youtube", url: result[0].id.videoId }];
                }
                catch (_c) {
                    throw Error("Couldnt search it YT");
                }
            }
        });
        this.handleUrlAndAddToQueue = (url, user, server, onPosition) => __awaiter(this, void 0, void 0, function* () {
            try {
                let songs = yield this.recognizeUrl(url);
                let requests = this.createRequests(songs, user);
                server.queue.splice(onPosition, 0, ...requests);
                if (requests.length > 1) {
                    server.channel.send("Added " + requests.length);
                }
                else {
                    this.sendMessageQueue(requests[0], server.channel, onPosition + 1);
                }
            }
            catch (e) {
                server.channel.send(e.message);
            }
        });
        this.sendMessagePlaying = (songRequest, channel) => __awaiter(this, void 0, void 0, function* () {
            if (songRequest.type == "youtube") {
                let details = yield this.ytmodule.getDetailsAboutVideoWithLib(songRequest.url);
                details.user = songRequest.requested;
                channel.send(EmbedsFactory_1.default.getPlaying(details));
            }
        });
        this.sendMessageQueue = (songRequest, channel, position) => __awaiter(this, void 0, void 0, function* () {
            if (songRequest.type == "youtube") {
                let details = yield this.ytmodule.getDetailsAboutVideoWithLib(songRequest.url);
                channel.send(EmbedsFactory_1.default.getAddedToQueueMsg(details.name, details.url, position));
            }
        });
        this.ytmodule = ytmodule;
        this.spotifyModule = spotifyModule;
    }
    createRequests(songRequestUrls, user) {
        let songRequests = [];
        for (let songRequestUrl of songRequestUrls) {
            songRequests.push(Object.assign({ requested: user }, songRequestUrl));
        }
        return songRequests;
    }
    handleDispatcher(server) {
        if (!server.dispatcher && server.queue[0]) {
            server.dispatcher = this.ytmodule.playYT(server.connection, server.queue[0].url);
            server.dispatcher.once("end", (reason) => {
                server.queue.shift();
                server.dispatcher = null;
                if (reason && reason != "stop")
                    setTimeout(() => {
                        this.handleDispatcher(server);
                    }, 1000);
            });
            this.sendMessagePlaying(server.queue[0], server.channel);
        }
    }
}
exports.default = PlayModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxheU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2R1bGVzL1BsYXlNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtCQUE4QjtBQUM5QiwyQ0FBMEM7QUFFMUMsb0RBQTZDO0FBSzdDLE1BQXFCLFVBQVU7SUFJM0IsWUFBWSxRQUFrQixFQUFFLGFBQTRCO1FBUzVELGlCQUFZLEdBQUcsQ0FBTyxHQUFXLEVBQTZCLEVBQUU7WUFJNUQsSUFBSSxPQUFPLEdBQUcsdURBQXVELENBQUE7WUFDckUsSUFBSSxZQUFZLEdBQUcscURBQXFELENBQUE7WUFHeEUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNwQixJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQyxJQUFJLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFlLENBQUMsQ0FBQztnQkFFdkQsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUNaLElBQUk7d0JBQ0EsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsOEJBQThCLENBQUMsS0FBSyxDQUFDLElBQWMsQ0FBQyxDQUFBO3FCQUNsRjtvQkFDRCxXQUFLO3dCQUNELE1BQU0sS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUE7cUJBQ3ZDO2lCQUNKO3FCQUVJLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDZCxJQUFJO3dCQUNBLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBVyxDQUFDLENBQUE7d0JBQzNELE9BQU8sQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFXLEVBQUUsQ0FBQyxDQUFBO3FCQUd2RDtvQkFBQyxXQUFLO3dCQUNILE1BQU0sS0FBSyxD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