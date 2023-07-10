/* Lists
  - flat rate book (vapi)
  - tech list (vapi)
  - wo categories (jmart)
  - contract pricing
*/

import {fbstore} from '/Tech/store/flbook-store.js';

var managelist={
  fbstore:fbstore
}

var checkisdone=(checks={})=>{
  let done=true;
  for(let c in checks){
    if(!checks[c]){done=false;break;}
  }
  return done;
}

/* INITIAL managelist
  Currently the stores begin their setup in their seperate files, so this function
  monitors the success / fail of those initializations. The result of the
  function is the managelist from this file. It can be used to share managelist
  contents with other files.
*/
export var INITmanagelist=()=>{
  return new Promise((resolve,reject)=>{
    let finish = {}
    for(let ml in managelist){
      finish[ml]=false;
      managelist[ml].ISready().then(
        ready=>{
          finish[ml]=true;
          if(checkisdone(finish)){return resolve(managelist);}
        }
      )
    }
  });
}

/* REFRESH manage list
  Will take a store and update it from its source. The store does not have to
  do anything when REFRESHstore() is called, but it should have a hollow function
  created to work smoothly. If no store is passed, all of the managelist stores
  will be refreshed from their sources.
*/
export var REFRESHmanagelist=(store=null)=>{
  return new Promise((resolve,reject)=>{
    if(store){}
    else{
      let finish = {};
      for(let ml in managelist){
        finish[ml]=false;
        managelist[ml].REFRESHstore().then(
          ready=>{
            //console.log(ready)
            finish[ml]=true;
            if(checkisdone(finish)){return resolve(managelist);}
          }
        )
      }
    }
  });
}
