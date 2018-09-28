All credits to:  
Joel Martin <github@martintribe.org> (http://github.com/kanaka)  
...and [websockify npm package authors](https://www.npmjs.com/package/websockify)  
...and [noVNC](https://github.com/novnc/noVNC)

Serves noVNC/lite with express while proxying ws://... to VNC-server


usage: 

    node . [source_addr:]source_port [target_addr:]target_port [--webRoot web_dir] [--cert cert.pem [--key key.pem]]