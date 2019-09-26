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
const { google } = require('googleapis');
const youtube = google.youtube('v3');
const ytDurationFormat = require('youtube-duration-format');
class playModule {
    constructor() {
        this.getPlaylistYT = (playlistId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
                resolve(videosIDs);
            }));
        });
        this.addYTPlaylistToQueue = (playlistId) => __awaiter(this, void 0, void 0, function* () {
            let videosIDs = yield this.getPlaylistYT(playlistId);
            console.log(videosIDs);
            for (let id of videosIDs) {
                console.log(yield this.getDetailsToPLayYT(id));
            }
        });
        this.getDetailsToPLayYT = (videoId) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let details = yield this.getDetailsOfTheVideo(videoId);
                if (!details) {
                    reject();
                }
                resolve({
                    url: "https://www.youtube.com" + details.id,
                    name: details.snippet.title,
                    thumbnailUrl: `https://img.youtube.com/vi/${details.id}/0.jpg`,
                    duration: ytDurationFormat(details.contentDetails.duration),
                    type: 0
                });
            }));
        });
    }
    recognizeUrl(url) {
        let ytRegex = "^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+";
        let spotifyRegex = "https?:\/\/open.spotify.com\/playlist\/[a-zA-Z0-9]+";
        if (url.match(ytRegex)) {
            let youtube = nodeUrl.parse(url);
            let query = querystring.parse(youtube.query);
            if (query.list) {
                this.addYTPlaylistToQueue(query.list);
            }
            else if (query.v) { }
            else {
            }
        }
        else if (url.match(ytRegex)) {
        }
    }
    createPlaylistYTRequest(playlistId, pageToken) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                youtube.playlistItems.list({
                    key: "AIzaSyBe68xfEbwcFdvojN0gL9APkemlWSPdEFc",
                    part: 'contentDetails',
                    pageToken: pageToken,
                    playlistId: playlistId,
                    maxResults: 50,
                }, (err, results) => {
                    if (err)
                        reject(err);
                    let data = results.data;
                    resolve(data);
                });
            });
        });
    }
    getDetailsOfTheVideo(videoID) {
        return new Promise((resolve, reject) => {
            youtube.videos.list({
                key: "AIzaSyBe68xfEbwcFdvojN0gL9APkemlWSPdEFc",
                part: 'contentDetails,snippet',
                id: videoID,
                maxResults: 1,
            }, (err, results) => {
                if (err)
                    reject(err);
                resolve(results.data.items[0]);
            });
        });
    }
}
exports.default = playModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxheU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wbGF5TW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBOEI7QUFDOUIsMkNBQTBDO0FBRzFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBSzVELE1BQXFCLFVBQVU7SUFBL0I7UUFnQ0ksa0JBQWEsR0FBRyxDQUFPLFVBQWtCLEVBQXFCLEVBQUU7WUFFNUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFO2dCQUVqQyxJQUFJLE1BQU0sR0FBOEIsRUFBRSxDQUFDO2dCQUMzQyxJQUFJLFNBQVMsR0FBYSxFQUFFLENBQUM7Z0JBRTdCLElBQUksUUFBUSxHQUFHLENBQU8sSUFBeUIsRUFBRSxFQUFFO29CQUMvQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7d0JBQ3BCLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO3FCQUNwRjtvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO2dCQUU5QixDQUFDLENBQUEsQ0FBQTtnQkFDRCxNQUFNLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO2dCQUVqRSxLQUFLLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtvQkFDdEIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFD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