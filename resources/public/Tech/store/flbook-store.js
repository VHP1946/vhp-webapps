var fbdb;
var ftable = JSON.parse(localStorage.getItem('flbook'));

import {SENDrequestapi} from '../javascript/tools/vapicore.js';
import {IDBinterface} from 'https://www.vhpportal.com/repo/storage/IDBinterface.js';

/*
SENDrequestapi({
  collect:"jonas",
  store:'SERVICE',
  db:'flbook',
  method:'insert',
  options:{docs:ftable}
}).then(answr=>{});
*/
var fbdbsetup =(db)=>{
  let ostore = db.createObjectStore('books',{
    autoIncrement:true
  });
  SENDrequestapi({
    collect:"jonas",
    store:'SERVICE',
    db:'flbook',
    method:'query',
    options:{query:{}}
  },'OLDSTORE',{request:'mart'}).then(
    answr=>{
      //console.log(answr);
      if(answr.success){
        let list = answr.body.result;
        //console.log('>>>>>>',list);
        let trans=db.transaction('books','readwrite').objectStore('books');
        for(let x=0;x<list.length;x++){trans.add(list[x]);}
      }
    }
  );
}
export var fbstore = new IDBinterface('jonas-flatratebook','books',fbdbsetup);

fbstore.REFRESHstore=function(){
  return new Promise((resolve,reject)=>{
    //console.log('refreshing')
    SENDrequestapi({
      collect:"jonas",
      store:'SERVICE',
      db:'flbook',
      method:'query',
      options:{query:{}}
    },'OLDSTORE',{request:'mart'}).then(
      list=>{
        //console.log('LIST',list);
        if(list.success){
          //console.log(list);
          this.list.list = list.body.result;
          this.FLUSHstore().then(
            fdone=>{return resolve(fdone);}
          )
        }
        else{return resolve(false)}
      }
    );
  });
}
