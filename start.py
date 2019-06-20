import os
import signal
import sys
from multiprocessing import Process

def signal_handler(sig, frame):
    print('Closing servers...')
    # p.terminate()
    sys.exit(0)

def runNPM():
    os.system("npm start --prefix moodify-ui\\app")


if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    p = Process(target=runNPM, args=())
    p.start()
    os.system("set FLASK_APP=server\main")
    os.system("python server\main.py")
    p.join()
    


