
import * as japi from './vapi-jmart.js';
import {aserviceticket} from 'https://www.vhpportal.com/repo/ds/tickets/vogel-serviceticket.js';
import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';

/* TODO:
   - add customer info
*/
var STARTticket=(wonum)=>{
  return new Promise((resolve,reject)=>{
    //console.log("Starting ticket")
    japi.GETwo(wonum).then(
        wo=>{
            //console.log("WO retrieved")
            if(wo){
                let ticket = aserviceticket();
                ticket.wo = wo;
                let havesc = false;
                let havesi = false;
                //console.log("BEFORE CONTRACT")
                japi.GETscontract(ticket.wo.custcode).then(
                    contract=>{
                      ticket.contract = contract?contract:{};
                      havesc=true;
                      //console.log("RETREIVED CONTRACT ITEMS")
                      //DropNote('tr','Service Contracts have loaded')
                      if(havesi){return resolve(ticket);}
                    }
                )
                //console.log("BEFORE SERVICE ITEMS")
                japi.GETserviceitems(ticket.wo.custcode).then(
                    result=>{
                        ticket.sitems = result;
                        havesi=true;
                        //console.log("RETREIVED SERVICE ITEMS")
                        if(havesc){return resolve(ticket);}
                    }
                )
            }else{console.log('WO request fail');return resolve(null);}
        }
    )
  });
}

var SYNCticket=(wonum)=>{
  return new Promise((resolve,reject)=>{
    let ticket = {};
    japi.GETwo(wonum).then(
        wo=>{
            if(!wo){console.log('WO request fail');}
            ticket.wo=wo;
            return resolve(ticket);
        }
    )
  });
}

var SYNCdatalist=()=>{
  let book=false;
  DropNote('tr','Starting Data Sync','green');
  japi.GETflbook().then(
    book=>{
      //console.log('BOOK',book);
      localStorage.setItem('flbook',JSON.stringify(book.body.table));
    }
  )
  //...other lists
}

export{
  STARTticket,
  SYNCticket,
  SYNCdatalist
}
