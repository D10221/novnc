All credits to:  
Joel Martin <github@martintribe.org> (http://github.com/kanaka)  
...and [websockify npm package authors](https://www.npmjs.com/package/websockify)  
...and [noVNC](https://github.com/novnc/noVNC)

Serves noVNC/lite with express while proxying ws://... to VNC-server


usage: 

1. Vnc server must be running

        # sudo apt install tightvncserver
        # vncserver :1
    
2. Install and run this thing...

        # git clone https://github.com/D10221/novnc
        # yarn install
        # cd novnc && node . localhost:6080 localhost:5901 

3. Open in Browser

        # firefox http://localhost:6080

