const googleTTS = require('google-tts-api');
const ytSearch = require('yt-search')
import * as Discord from 'discord.js'
import * as fs from "fs";
import { PythonShell } from 'python-shell';
import { ytSearchVideoResult } from './interfaces';




export function sayNowInVoice(text: string, connection: Discord.VoiceConnection, callback: Function = () => { }, lang: string = "en", speed: number = 1) {
    googleTTS(text, lang, speed)
        .then(function (url: any) {
            if (!connection.dispatcher)
                connection.playArbitraryInput(url);
            callback();
        })
}


export function recordAudio(connection: Discord.VoiceConnection, user: Discord.User, speaking: boolean): Promise<StreamOutputFile> {

    return new Promise(function (resolve) {
        if (speaking) {
            const receiver = connection.createReceiver();
            const audioStream = receiver.createPCMStream(user);
            const streamOutputFile = generateOutputFile(user);

            audioStream.pipe(streamOutputFile.file);

            streamOutputFile.file.on('close', () => {
                resolve(streamOutputFile);
            })

        }
    })
}


export function recognizeAudio(streamOutputFile: StreamOutputFile): Promise<string[]> {
    let options = {
        pythonOptions: ['-u'], // get print results in real-time
        args: [streamOutputFile.name, streamOutputFile.userID]
    };
    return new Promise(function (resolve) {
        PythonShell.run('./python/speech.py', options, function (err: any, results: any) {
            if (err) throw err;
            resolve(results as string[])


        });
    })
}


export function findYTURL(search: string): Promise<ytSearchVideoResult[]> {
    return new Promise(function (resolve) {
        ytSearch(search, function (err: any, r: any) {
            if (err) throw err

            resolve(r.videos as ytSearchVideoResult[])

        })
    })
}




export function generateOutputFile(member: Discord.User): StreamOutputFile {
    const name = `${member.id} -${Date.now()}`;
    const path = `${__dirname}/../data/${name}.pcm`;
    return new StreamOutputFile(fs.createWriteStream(path), name, member.id);
}

export function stringContainsSubstrings(text: string, array: string[]): boolean {

    for (let str of array) {
        if (!text.includes(str))
            return false
    }
    return true

}






class StreamOutputFile {
    public file: fs.WriteStream;
    public name: string;
    public userID: string;
    constructor(file: fs.WriteStream, name: string, userID: string) {
        this.file = file;
        this.name = name
        this.userID = userID
    }

}
