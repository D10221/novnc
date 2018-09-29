All credits to:  
Joel Martin <github@martintribe.org> (http://github.com/kanaka)  
...and [websockify npm package authors](https://www.npmjs.com/package/websockify)  
...and [noVNC](https://github.com/novnc/noVNC)

Serves noVNC/lite with express while proxying ws://... to VNC-server

usage:

1.  Vnc server must be running

        # sudo apt install tightvncserver
        # vncserver :1

2.  Install and run this thing...

        # git clone https://github.com/D10221/novnc
        # yarn install
        # cd novnc && node . localhost:6080 localhost:5901

3.  Open in Browser

        # firefox http://localhost:6080

Help:

        Usage: 
          novnc <[<SOURCE_ADDR>:]<SOURCE_PORT>> <[<TARGET_ADDR>:]<TARGET_PORT>>

        Alt:
          SOURCE=localhost:6080 TARGET=localhost:5901 node .

        Options:
          --webRoot </path/to/static/dir> 
          --cert </path/to/cert.pem> 'cert || cert && key'
          --key </path/to/key.pem>

1st and 2nd Args, positional , required "[host]:port"  
--webRoot is optional defaults to `/public`  
--cert can be pem/key combined, making --key optional

Enable "debug" namespace:

        DEBUG=@d10221* node .

