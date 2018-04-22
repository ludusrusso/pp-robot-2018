#!/usr/bin/env python
import thread
import app
import ID_service_server

def main():
    thread.start_new_thread(app.main, () )
    #tapp = threading.Thread(target=app.main)
    #tapp.start()
    ID_service_server.add_new_robot_server()

if __name__ == '__main__':
    main()
