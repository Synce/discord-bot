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
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const ytDurationFormat = require('youtube-duration-format');
const YTDL = require("ytdl-core");
const modules_1 = require("../modules");
const ytSearch = require('yt-search');
class YTModule {
    constructor() {
        this.getPlaylistYT = (playlistId) => __awaiter(this, void 0, void 0, function* () {
            try {
                let videos = [];
                let videosIDs = [];
                let nextPage = (data) => __awaiter(this, void 0, void 0, function* () {
                    if (data.nextPageToken) {
                        yield this.createPlaylistYTRequest(playlistId, data.nextPageToken).then(nextPage);
                    }
                    videos.push(...data.items);
                });
                yield this.createPlaylistYTRequest(playlistId, "").then(nextPage);
                for (let video of videos) {
                    videosIDs.push(video.contentDetails.videoId);
                }
                return videosIDs;
            }
            catch (_a) {
                throw Error("Invalid playlist link");
            }
        });
        this.getSongRequestUrlsFromPlaylist = (playlistId) => __awaiter(this, void 0, void 0, function* () {
            let songRequestUrls = [];
            let videosIDs = yield this.getPlaylistYT(playlistId);
            for (let id of videosIDs) {
                songRequestUrls.push({ url: id, type: "youtube" });
            }
            return songRequestUrls;
        });
        this.getDetailsAboutVideo = (videoId) => __awaiter(this, void 0, void 0, function* () {
            try {
                let details = yield this.getApiDetailsOfTheVideo(videoId);
                return {
                    url: "https://www.youtube.com/watch?v=" + details.id,
                    name: details.snippet.title,
                    thumbnailUrl: `https://img.youtube.com/vi/${details.id}/0.jpg`,
                    duration: ytDurationFormat(details.contentDetails.duration),
                    type: "youtube"
                };
            }
            catch (_b) {
                throw Error("Couldn't get a song");
            }
        });
        this.getDetailsAboutVideoWithLib = (videoId) => __awaiter(this, void 0, void 0, function* () {
            try {
                let details = yield this.getDetailsOfTheVideoWithLib(videoId);
                return {
                    url: "https://www.youtube.com/watch?v=" + details.id,
                    name: details.snippet.title,
                    thumbnailUrl: `https://img.youtube.com/vi/${details.id}/0.jpg`,
                    duration: details.contentDetails.duration,
                    type: "youtube"
                };
            }
            catch (_c) {
                throw Error("Couldn't get a song");
            }
        });
    }
    exactSearch(title, artists) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                title = title.toLocaleLowerCase();
                let result = yield this.searchForVideoWithLib(title + " " + artists.join(" ") + " lyrics", 1);
                if (modules_1.stringContainsSubstrings(result[0].snippet.title.toLocaleLowerCase(), [title, "lyrics"])) {
                    return { url: result[0].id.videoId, type: "youtube" };
                }
                else {
                    let result = yield this.searchForVideoWithLib(title + " " + artists.join(" "), 1);
                    if (result[0].snippet.title.toLocaleLowerCase().includes(title)) {
                        return { url: result[0].id.videoId, type: "youtube" };
                    }
                }
                return null;
            }
            catch (_a) {
                return null;
            }
        });
    }
    playYT(connection, url) {
        return connection.playStream(YTDL("https://www.youtube.com/watch?v=" + url, { filter: 'audioonly' }), { bitrate: 192000 });
    }
    searchForVideoWithLib(searchString, maxResults) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let arr = [];
                ytSearch(searchString, function (err, r) {
                    try {
                        if (err)
                            throw err;
                        if (r.videos.length == 0)
                            throw Error("No Videos");
                        let allVideos = r.videos;
                        for (let i = 0; i < maxResults && i < allVideos.length; i++) {
                            let video = allVideos[i];
                            arr.push({ id: { videoId: video.videoId }, snippet: { title: video.title } });
                        }
                        resolve(arr);
                    }
                    catch (e) {
                        reject(Error("Invalid link"));
                    }
                });
            });
        });
    }
    searchForVideo(searchString, maxResults) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield youtube.search.list({
                    key: "AIzaSyBe68xfEbwcFdvojN0gL9APkemlWSPdEFc",
                    part: 'snippet',
                    q: searchString,
                    maxResults: maxResults,
                    safeSearch: "none"
                });
                return result.data.items;
            }
            catch (e) {
                throw Error("Invalid link");
            }
        });
    }
    createPlaylistYTRequest(playlistId, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield youtube.playlistItems.list({
                    key: "AIzaSyBe68xfEbwcFdvojN0gL9APkemlWSPdEFc",
                    part: 'contentDetails',
                    pageToken: pageToken,
                    playlistId: playlistId,
                    maxResults: 50,
                });
                return result.data;
            }
            catch (_a) {
                throw Error("Invalid link");
            }
        });
    }
    getApiDetailsOfTheVideo(videoID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield youtube.videos.list({
                    key: "AIzaSyBe68xfEbwcFdvojN0gL9APkemlWSPdEFc",
                    part: 'contentDetails,snippet',
                    id: videoID,
                    maxResults: 1,
                });
                return result.data.items[0];
            }
            catch (_a) {
                throw Error("Invalid link");
            }
        });
    }
    getDetailsOfTheVideoWithLib(videoID) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                try {
                    return ytSearch(videoID, function (err, r) {
                        if (err)
                            throw err;
                        if (r.videos.length == 0)
                            throw Error("No Videos");
                        let video = r.videos[0];
                        let item = {
                            id: videoID,
                            snippet: {
                                title: video.title
                            },
                            contentDetails: {
                                duration: video.duration.timestamp,
                            }
                        };
                        resolve(item);
                    });
                }
                catch (_a) {
                    throw Error("Invalid link");
                }
            });
        });
    }
}
exports.default = YTModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWVRNb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvTW9kdWxlcy9ZVE1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JDLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7QUFDNUQsa0NBQWlDO0FBQ2pDLHdDQUFzRDtBQUN0RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7QUFJckMsTUFBcUIsUUFBUTtJQUE3QjtRQUlJLGtCQUFhLEdBQUcsQ0FBTyxVQUFrQixFQUFxQixFQUFFO1lBRTVELElBQUk7Z0JBRUEsSUFBSSxNQUFNLEdBQThCLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxTQUFTLEdBQWEsRUFBRSxDQUFDO2dCQUU3QixJQUFJLFFBQVEsR0FBRyxDQUFPLElBQXlCLEVBQUUsRUFBRTtvQkFDL0MsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO3dCQUNwQixNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtxQkFDcEY7b0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFFOUIsQ0FBQyxDQUFBLENBQUE7Z0JBQ0QsTUFBTSxJQUFJLENBQUMsdUJBQXVCLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtnQkFFakUsS0FBSyxJQUFJLEtBQUssSUFBSSxNQUFNLEVBQUU7b0JBQ3RCLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FB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