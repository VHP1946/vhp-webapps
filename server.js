const wserver=require('vhp-webserver');
const path = require('path');

let config = {
    port:4000,
    resources:{
        react:true,
        view:true,
        root:path.join(__dirname,'resources')
    }
}
let server = new wserver(config);
server.connected.then(startup=>console.log(startup)).catch(err=>console.log(err));