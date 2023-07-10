import {wolstore} from '/Tech/store/lstore.js';
import {FINDparentele} from 'https://www.vhpportal.com/repo/tools/vg-displaytools.js';
import {TechLocalWos} from '/Tech/store/techwo-store.js';
import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import {FormList} from 'https://www.vhpportal.com/repo/tools/vhc-formlist.js';


var molist = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

const wrmap = (w)=>{
  if(!w){w={};}
  return{
    id:w.id||'',
    contactname:w.contactname||'',
    contactphone:w.contactphone||'',
    descr:w.descr||'',
    dateschedule:w.dateschedule||'',
    street:w.street||'',
    cityzip:w.cityzip||''
  }
}
const wrdom ={
  cont:'techwo-row',
  contact:'techwo-row-contact',
  address:'techwo-row-address',
  actions:{
    delete:'techwo-row-deletes',
    open:'techwo-row-open'
  },
  values:{
    id:'techwo-row-id',
    contactname:'tech-row-contact',
    contactphone:'tech-row-phone',
    contactemail:'tech-row-email',
    descr:'techwo-row-descr',
    dateschedule:'techwo-row-date',

    street:'techwo-row-street',
    cityzip:'techwo-row-cityzip',
  }
}
const wotablerow=`
  <div class="${wrdom.values.dateschedule}"></div>
    <div class="${wrdom.contact}">
      <div class="${wrdom.values.id}" style="display:none"></div>
      <div class="${wrdom.values.contactname}"></div>
      <div class="${wrdom.values.contactphone}"></div>
      <div class="${wrdom.values.contactemail}"></div>
    </div>
    <div class="${wrdom.values.descr}"></div>
    <div class="techwo-row-actions">
      <div class = "action-button" id = "button-delete" ><img class="${wrdom.actions.delete}" src="https://www.vhpportal.com/repo/assets/icons/cross.png"/></div>
      <div class = "action-button" id = "button-open" ><img class="${wrdom.actions.open}" src="https://www.vhpportal.com/repo/assets/icons/edit.png"/></div>
    </div>
`
// DATA //
export var twolist = new TechLocalWos();

///////////////

export var twdashlist = new FormList({
  cont:document.getElementById('vg-wo-dash')
});
twdashlist.srow=(item={})=>{
  let row = document.createElement('div');
  row.classList.add(wrdom.cont);
  row.innerHTML=wotablerow;
  for(let v in wrdom.values){
    if(v != "dateschedule"){
      let elem = row.getElementsByClassName(wrdom.values[v])[0]; //Check if element exists in the table
      if (elem) {
        elem.innerText = item.wo[v];
      }
    }else{
        //console.log(v, item.wo[v]);
        if (item.wo[v] == undefined) {
          let datespot = row.getElementsByClassName(wrdom.values[v])[0]
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = "No date available."
        } else {
          let date = new Date(item.wo[v].split('T')[0]+'Z12:00:00');
          let datespot = row.getElementsByClassName(wrdom.values[v])[0]
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = molist[date.getMonth()] + ' ' + date.getDate();
          datespot.appendChild(document.createElement('div'));
          datespot.lastChild.innerText = date.getFullYear();
        }
      }
    }
  row.getElementsByClassName('action-button')[0].addEventListener('dblclick',(ele)=>{
    twolist.REMOVEitem(item.wo.id);
    twdashlist.form=twolist.list;
  });

  row.getElementsByClassName('action-button')[1].addEventListener('click',OPENwo);
  //

  return row;
}

var OPENwo=(ele)=>{
  var row = FINDparentele(ele.target,wrdom.cont);
  if(row){
      let wonum = row.getElementsByClassName(wrdom.values.id)[0].innerText;
      //console.log("Twolist: ", twolist)
      let woitem = twolist.GETitem(wonum);
      if(woitem){
        if (window.tabs[wonum] == 1) {
          DropNote('tr',`WO # ${wonum} Already Open!`,'red')
        } else {
          //Add the woitem to the open tabs
          window.tabs[wonum] = 1;

          localStorage.setItem(wolstore.toloadwo,JSON.stringify(woitem));
          let retval = window.open('/Tech/ticket');
          DropNote('tr',`WO # ${wonum} Loaded..`,'green');
        }

      } else {
        DropNote('tr',`WO # ${wonum} Could NOT Load`,'yellow')
      }
  }
}
