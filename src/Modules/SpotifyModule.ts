import { IExactSearch, songRequestUrl } from "../interfaces";

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "apikey",
    secret: "apikey"
});





export default class SpotifyModule {


    getPlaylistInfoFromSpotifyApi = async (modules: IExactSearch[], playlistID: string): Promise<songRequestUrl[]> => {

        try {
            let response = await spotify.request(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`)

            let results = response.items as spotifyPlaylistApiResult[]
            let songs = []
            for (let result of results) {
                let artistsNames = [];
                for (let artist of result.track.artists) {
                    artistsNames.push(artist.name)
                }
                let song = await this.serachForTrackUsingModules(modules, result.track.name.split("(")[0], artistsNames)

                if (song)
                    songs.push(song)

            }
            if (songs.length == 0) {
                throw Error("Couldnt get any of the songs")
            }

            return songs
        }
        catch{
            throw Error("Invalid Spotify Link")
        }
    }

    async serachForTrackUsingModules(modules: IExactSearch[], title: string, artists: string[]): Promise<songRequestUrl | null> {
        let result;

        for (let module of modules) {
            result = await module.exactSearch(title, artists)

            if (result)
                return result

        }
        return null

    }


}


interface spotifyPlaylistApiResult {

    track: {
        name: string

        artists: spotifyApiArtists[]
    }


}

interface spotifyApiArtists {

    name: string

}