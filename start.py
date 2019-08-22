import os
import signal
import sys
from pathlib import Path
from multiprocessing import Process


def signal_handler(sig, frame):
    print('Closing servers...')
    # p.terminate()
    sys.exit(0)


def runNPM():
    frontendfolder = Path("moodify-ui/app")
    full_command = "npm start --prefix " + str(frontendfolder)
    #print(full_command)
    os.system(full_command)


if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    p = Process(target=runNPM, args=())
    p.start()

    serverfolder = Path("server/main")
    set_flask_app = "set FLASK_APP=" + str(serverfolder)
   # print(set_flask_app)
    os.system(set_flask_app)

    run_server = "python " + str(serverfolder)+ ".py"
    #print(run_server)
    os.system(run_server)
    p.join()
