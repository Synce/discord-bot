import speech_recognition as sr
from pydub import AudioSegment
import sys
import os

r = sr.Recognizer()
name = sys.argv[1]
memberID = sys.argv[2]
path = "F:\\Projekty\\discord bot\\data\\"
sound = AudioSegment.from_raw(path + name + ".pcm", sample_width=2, frame_rate=48000, channels=2)
sound = sound.set_channels(1)
f = sr.AudioData(sound.raw_data, 48000, 2)
print(memberID)
try:
    print(r.recognize_google(f, language="en-USA"))
except:
    print("error")
finally:
    os.remove(path + name + ".pcm")
