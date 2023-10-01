import {SENDrequestapi} from 'https://www.vhpportal.com/repo/apis/vapi/vapicore.js';

import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import * as titlebar from 'https://www.vhpportal.com/repo/modules/vg-titlebar.js';
import { SELECTview } from 'https://www.vhpportal.com/repo/modules/vg-floatviews.js';
import { AppDock } from 'https://www.vhpportal.com/repo/modules/appdock.js';
import {STARTloadscreen} from 'https://www.vhpportal.com/repo/tools/vhc-loadscreen.js';

/*  Tech Dash
  TODO:
  - manage list
  - better oraganize dash into modules that reflect the app dock
  - rotate quick actions depending on module
  - provide editable tech information
  - sleep function that shows date and time on gray screen. Save ticket and clear
    memory. Restart on mouse move.
  - move "home"
*/


var qactions = {
};
var mactions = {
};
var login = titlebar.SETUPtitlebar({
  RROOT:'https://www.vhpportal.com/repo/',
  qacts:qactions,
  macts:mactions,
  login:true,
  logieve:(creds)=>{ //on login
  },
  logoeve:()=>{// on logout
    DropNote('tr','Logging Out','green');window.location.replace('/')
  },
  home:(ele)=>{
      $(document.getElementById('vhc-app-dock')).show();
      $(document.getElementById('vg-wo-dash')).hide();
  }
});
//returns login Form
if(login.storecreds.user!=''){
  //console.log('LOGIN');
  //console.log(login.storecreds);
}

// Work Order List Setup ////////////////////////////////////////////////////////

// App Dock Setup ///////////////////////////////////////////////////////////////
var dockapps={
    ['COLLECTIONMAPS']:(ele)=>{
      SENDrequestapi({
        collect:'ALL',
        method:'COLLECTIONMAPS'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
    ['ADDCOLLECTION']:(ele)=>{
      SENDrequestapi({
        collect:'new',
        method:'ADDCOLLECTION'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
    ['ADDSTORE']:(ele)=>{
      SENDrequestapi({
        collect:'new',
        store:'newstore',
        method:'ADDSTORE'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
    ['REMOVESTORE']:(ele)=>{
      SENDrequestapi({
        collect:'new',
        store:'newstore',
        method:'REMOVESTORE'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
    ['ADDDATABASE']:(ele)=>{
      SENDrequestapi({
        collect:'new',
        store:'newstore',
        db:'newdb',
        method:'ADDDATABASE'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
    ['REMOVEDATABASE']:(ele)=>{
      SENDrequestapi({
        collect:'new',
        store:'newstore',
        db:'newdb',
        method:'REMOVEDATABASE'
      },'STORE',{
        user:'VOGCH',
        pswrd:'vogel123',
        request:'ADMIN'
      })
    },
}
var appdock = new AppDock(document.createElement('div'),dockapps);
document.body.appendChild(appdock.cont);
////////////////////////////////////////////////////////////////////////////////
