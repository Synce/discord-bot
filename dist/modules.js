"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const googleTTS = require('google-tts-api');
const ytSearch = require('yt-search');
const fs = require("fs");
const python_shell_1 = require("python-shell");
function sayNowInVoice(text, connection, callback = () => { }, lang = "en", speed = 1) {
    googleTTS(text, lang, speed)
        .then(function (url) {
        if (!connection.dispatcher)
            connection.playArbitraryInput(url);
        callback();
    });
}
exports.sayNowInVoice = sayNowInVoice;
function recordAudio(connection, user, speaking) {
    return new Promise(function (resolve) {
        if (speaking) {
            const receiver = connection.createReceiver();
            const audioStream = receiver.createPCMStream(user);
            const streamOutputFile = generateOutputFile(user);
            audioStream.pipe(streamOutputFile.file);
            streamOutputFile.file.on('close', () => {
                resolve(streamOutputFile);
            });
        }
    });
}
exports.recordAudio = recordAudio;
function recognizeAudio(streamOutputFile) {
    let options = {
        pythonOptions: ['-u'],
        args: [streamOutputFile.name, streamOutputFile.userID]
    };
    return new Promise(function (resolve) {
        python_shell_1.PythonShell.run('F:/Projekty/Moje zabawy z pythonem/discord bot/speech.py', options, function (err, results) {
            if (err)
                throw err;
            resolve(results);
        });
    });
}
exports.recognizeAudio = recognizeAudio;
function findYTURL(search) {
    return new Promise(function (resolve) {
        ytSearch(search, function (err, r) {
            if (err)
                throw err;
            resolve(r.videos);
        });
    });
}
exports.findYTURL = findYTURL;
function generateOutputFile(member) {
    const name = `${member.id} -${Date.now()}`;
    const path = `${__dirname}/../data/${name}.pcm`;
    return new StreamOutputFile(fs.createWriteStream(path), name, member.id);
}
exports.generateOutputFile = generateOutputFile;
function stringContainsSubstrings(text, array) {
    for (let str of array) {
        if (!text.includes(str))
            return false;
    }
    return true;
}
exports.stringContainsSubstrings = stringContainsSubstrings;
class StreamOutputFile {
    constructor(file, name, userID) {
        this.file = file;
        this.name = name;
        this.userID = userID;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tb2R1bGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUMsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBRXJDLHlCQUF5QjtBQUN6QiwrQ0FBMkM7QUFNM0MsU0FBZ0IsYUFBYSxDQUFDLElBQVksRUFBRSxVQUFtQyxFQUFFLFdBQXFCLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxPQUFlLElBQUksRUFBRSxRQUFnQixDQUFDO0lBQ25KLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQztTQUN2QixJQUFJLENBQUMsVUFBVSxHQUFRO1FBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVTtZQUN0QixVQUFVLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDdkMsUUFBUSxFQUFFLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQTtBQUNWLENBQUM7QUFQRCxzQ0FPQztBQUdELFNBQWdCLFdBQVcsQ0FBQyxVQUFtQyxFQUFFLElBQWtCLEVBQUUsUUFBaUI7SUFFbEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU87UUFDaEMsSUFBSSxRQUFRLEVBQUU7WUFDVixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDN0MsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxNQUFNLGdCQUFnQixHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWxELFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO2dCQUNuQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQTtTQUVMO0lBQ0wsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDO0FBaEJELGtDQWdCQztBQUdELFNBQWdCLGNBQWMsQ0FBQyxnQkFBa0M7SUFDN0QsSUFBSSxPQUFPLEdBQUc7UUFDVixhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUM7UUFDckIsSUFBSSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztLQUN6RCxDQUFDO0lBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU87UUFDaEMsMEJBQVcsQ0FBQyxHQUFHLENBQUMsMERBQTBELEVBQUUsT0FBTyxFQUFFLFVBQVUsR0FBUSxFQUFFLE9BQVk7WUFDakgsSUFBSSxHQUFHO2dCQUFFLE1BQU0sR0FBRyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxPQUFtQixDQUFDLENBQUE7UUFHaEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFiRCx3Q0FhQztBQUdELFNBQWdCLFNBQVMsQ0FBQyxNQUFjO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsVUFBVSxHQUFRLEVBQUUsQ0FBTTtZQUN2QyxJQUFJLEdBQUc7Z0JBQUUsTUFBTSxHQUFHLENBQUE7WUFFbEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUErQixDQUFDLENBQUE7UUFFOUMsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFURCw4QkFTQztBQUtELFNBQWdCLGtCQUFrQixDQUFDLE1BQW9CO0lBQ25ELE1BQU0sSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUMzQyxNQUFNLElBQUksR0FBRyxHQUFHLFNBQVMsWUFBWSxJQUFJLE1BQU0sQ0FBQztJQUNoRCxPQUFPLElBQUksZ0JBQWdCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDN0UsQ0FBQztBQUpELGdEQUlDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsSUFBWSxFQUFFLEtBQWU7SUFFbEUsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUU7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQ25CLE9BQU8sS0FBSyxDQUFBO0tBQ25CO0lBQ0QsT0FBTyxJQUFJLENBQUE7QUFFZixDQUFDO0FBUkQsNERBUUM7QUFPRCxNQUFNLGdCQUFnQjtJQUlsQixZQUFZLElBQW9CLEVBQUUsSUFBWSxFQUFFLE1BQWM7UUFDMUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDeEIsQ0FBQztDQUVKIn0=