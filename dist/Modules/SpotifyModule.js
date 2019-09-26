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
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "723613189afa457d9a08106970464d56",
    secret: "6fd23a68e1834f2495e37968fc96d68f"
});
class SpotifyModule {
    constructor() {
        this.getPlaylistInfoFromSpotifyApi = (modules, playlistID) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield spotify.request(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`);
                let results = response.items;
                let songs = [];
                for (let result of results) {
                    let artistsNames = [];
                    for (let artist of result.track.artists) {
                        artistsNames.push(artist.name);
                    }
                    let song = yield this.serachForTrackUsingModules(modules, result.track.name.split("(")[0], artistsNames);
                    if (song)
                        songs.push(song);
                }
                if (songs.length == 0) {
                    throw Error("Couldnt get any of the songs");
                }
                return songs;
            }
            catch (_a) {
                throw Error("Invalid Spotify Link");
            }
        });
    }
    serachForTrackUsingModules(modules, title, artists) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            for (let module of modules) {
                result = yield module.exactSearch(title, artists);
                if (result)
                    return result;
            }
            return null;
        });
    }
}
exports.default = SpotifyModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BvdGlmeU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Nb2R1bGVzL1Nwb3RpZnlNb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBRTFDLElBQUksT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDO0lBQ3RCLEVBQUUsRUFBRSxrQ0FBa0M7SUFDdEMsTUFBTSxFQUFFLGtDQUFrQztDQUM3QyxDQUFDLENBQUM7QUFNSCxNQUFxQixhQUFhO0lBQWxDO1FBR0ksa0NBQTZCLEdBQUcsQ0FBTyxPQUF1QixFQUFFLFVBQWtCLEVBQTZCLEVBQUU7WUFFN0csSUFBSTtnQkFDQSxJQUFJLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsd0NBQXdDLFVBQVUsU0FBUyxDQUFDLENBQUE7Z0JBRWpHLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxLQUFtQyxDQUFBO2dCQUMxRCxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUE7Z0JBQ2QsS0FBSyxJQUFJLE1BQU0sSUFBSSxPQUFPLEVBQUU7b0JBQ3hCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztvQkFDdEIsS0FBSyxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTt3QkFDckMsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7cUJBQ2pDO29CQUNELElBQUksSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLDBCQUEwQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUE7b0JBRXhHLElBQUksSUFBSTt3QkFDSixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUV2QjtnQkFDRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO29CQUNuQixNQUFNLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO2lCQUM5QztnQkFFRCxPQUFPLEtBQUssQ0FBQTthQUNmO1lBQ0QsV0FBSztnQkFDRCxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO2FBQ3RDO1FBQ0wsQ0FBQyxDQUFBLENBQUE7SUFpQkwsQ0FBQztJQWZTLDBCQUEwQixDQUFDLE9BQXVCLEVBQUUsS0FBYSxFQUFFLE9BQWlCOztZQUN0RixJQUFJLE1BQU0sQ0FBQztZQUVYLEtBQUssSUFBSSxNQUFNLElBQUksT0FBTyxFQUFFO2dCQUN4QixNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtnQkFFakQsSUFBSSxNQUFNO29CQUNOLE9BQU8sTUFBTSxDQUFBO2FBRXBCO1lBQ0QsT0FBTyxJQUFJLENBQUE7UUFFZixDQUFDO0tBQUE7Q0FHSjtBQS9DRCxnQ0ErQ0MifQ==