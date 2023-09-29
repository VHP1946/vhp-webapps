import { wolstore } from '/Tech/store/lstore.js';
import * as titlebar from 'https://www.vhpportal.com/repo/modules/vg-titlebar.js';
import { DropNote } from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';

import { SYNCticket } from '/Tech/javascript/tools/vapi-FTrequest.js';
import { ServiceTicket } from '/Tech/javascript/controllers/ticket/service-ticket.js';
import { ServicePresentation } from '/Tech/javascript/controllers/ticket/service-presentation.js';

import {STARTloadscreen} from 'https://www.vhpportal.com/repo/tools/vhc-loadscreen.js'//http://3.15.144.193/repo/tools/vhc-loadscreen.js';

import { SENDrequestapi } from '../tools/vapicore.js';
import { ServiceSystemSummary } from '/Tech/javascript/controllers/ticket/service-system-summary.js';

let publicfolder = '/Tech/bin/css'; //not sure we need
// Load Data //

let fbstore = window.opener.datamart.fbstore;//fbstore holds connections to indexdb and an instance of ObjList

//console.log('FLATRATE BOOK >',fbstore.list.list);

// LOAD Ticket //
let currticket = JSON.parse(localStorage.getItem(wolstore.toloadwo));
//console.log('Currticket',currticket);
if(currticket){
  	localStorage.setItem(wolstore.toloadwo,null);//clear temp storage
  	localStorage.setItem(wolstore.lastwo,JSON.stringify(currticket));//save as last open
  	DropNote('tr','WO found','green');
} else {
	DropNote('tr','WO not found','red');
}
window.addEventListener('beforeunload',(ele)=>{ //here for page refresh
  	localStorage.setItem(wolstore.toloadwo,JSON.stringify(currticket));
});

window.TicketSaved = false;
window.SAVEticket = (final=false)=>{
	return new Promise((resolve,reject)=>{

		currticket = ticket.ticket;

			//console.log(currticket);
			DropNote('tr','Ticket is Saving...','green');

			if (final) {
				//save final to server
			}
			console.log("SAVING TICKET")
			STARTloadscreen(document.getElementsByClassName('vhc-save-load-screen')[0],()=>{
				return new Promise((resolve,reject)=>{
					window.opener.techwos.UPDATEstore(currticket).then(answr=>{
					if(answr) {
						DropNote('tr','Ticket WAS Saved','green');
						window.askToClose = false;
						window.TicketSaved = true;
						return resolve(true);
					} else {
						DropNote('tr','Ticket was NOTSaved','yellow');
						return resolve(false)
					}
				});
			});
		}).then(answr=>{
			console.log(answr);
			return(resolve(answr))
		})
	});
}

window.SAVEticketsilently = (final = false) => {
	if(final){}//save final to server
	currticket = ticket.ticket;
	window.opener.techwos.UPDATEstore(currticket).then(answr=>{
		return new Promise((resolve,reject)=>{
			window.opener.techwos.UPDATEstore(currticket).then(answr=>{
				if(answr) {
					//DropNote('tr','Ticket WAS Saved','green');
					window.askToClose = false;
					window.TicketSaved = true;
					return resolve(true);
				} else {
					DropNote('tr','Ticket was NOTSaved','yellow');
					return resolve(false)
				}
			}).then(answr=>{
				//console.log(answr);
				return(resolve(answr))
			})
		});
	})
}

window.REFRESHdescr = () => {
	console.log("refreshing descr")
	return new Promise((resolve,reject) => {
	  	currticket = ticket.ticket;
		console.log(currticket)
  
	  	//console.log(currticket);
	  	DropNote('tr','Refreshing description...','green');

		SENDrequestapi({
			table:'custom',
			option:'download',
			template:'WO_DescriptionOfWork_tbl',
			where:[{OP:'=',WorkOrderNumber:currticket.wo.id}]
		},'STORE',{request:'jmart'}).then( //bring in descriptions
		  	answr=>{
				console.log('JAPI->recieved description of work', answr);
				if(answr.body.success){
					currticket.wo.descr='';
					let descr=''
					for(let x=0,l=answr.body.table.length;x<l;x++){
						currticket.wo.descr+=answr.body.table[x].WorkDescription +'\n';
						descr+=answr.body.table[x].WorkDescription +'\n';
					}
					return resolve(descr)
				}
			return resolve(false)
		});
	});
}

// Setup ticket view groups ////////////////////////////////////////////////////
let ticket = new ServiceTicket(currticket,fbstore.list);
let cont = document.getElementsByClassName('system-summary-cont')[0]
let summary = new ServiceSystemSummary(cont, currticket)
let presentation = new ServicePresentation(document.createElement('div'),currticket,fbstore.list.TRIMlist({book:'RES'}), summary);

//Add the enhanced/custom checklists here
console.log("Ticket After Initi::",ticket)

//Event listener for bottom tab buttons to hide repair table
ticket.view.buttons.children[0].addEventListener('click', (eve)=>{
  	TOGGLErepairtable(true)
})
ticket.view.buttons.children[2].addEventListener('click', (eve)=>{
  	TOGGLErepairtable(true)
})

document.title = "WO: " + ticket.ticket.wo.id; //Set window title to WO id

//From the saints at stackoverflow
//Checks if the form has been modified at all and confirms if the user wishes to save.
window.askToClose = true;
window.onbeforeunload = function (e) {
    if(!window.askToClose) return null
    e = e || window.event;
    //old browsers
    if (e) {e.returnValue = 'Sure?';}
    //safari, chrome(chrome ignores text)
    return 'Sure?';
};

window.onunload = function (e) {
	if (window.opener.tabs[ticket.ticket.wo.id] == 1) {
		window.opener.tabs[ticket.ticket.wo.id] = 0
	}
}

// final summary
// Setup Page //

screen.orientation.addEventListener("change", function(e) {
    // Do something on change
	summary.SETsummary(ticket.ticket)
});


// Titlebar Setup ///////////////////////////////////////////////////////////
// @todo modify the way 
var qactions = {
	present:{
		id:'presentation-open',
		src:'https://www.vhpportal.com/repo/assets/icons/document-signed.png',
		title:'Presentation',
		onclick:(ele)=>{  // Presentation show/hide
			let score_box = document.getElementsByClassName('system-summary-cont')[0];
			let present_box = document.getElementsByClassName('present-full-cont')[0];
			let tickcont = document.getElementById('ticket-build-container');
			let checkbox = document.getElementsByClassName('enhanced-toggle-button')[0]
			summary.SETsummary(ticket.ticket)
			window.SAVEticketsilently()
			if(score_box.style.left == "0px" || present_box.style.left == "0px"){
				ticket.ticket = presentation.data;
				ticket.ticket.track.presented = true;
				score_box.style.left = "-5000px";
				present_box.style.left = '-5000px'
				if (presentation.SignatureShown) {
					presentation.SHOWsignature()
				}
			} else {
				presentation.SETpresent(ticket.ticket);  //pass to ticket
				ticket.port.checks.ORGANIZEsummary();
				if (summary.walkthroughComplete == true) {
					summary.UPDATEscores(ticket.ticket.checks)
					present_box.style.left = "0px"
				} else {
					console.log("CHECKS", ticket.ticket.checks)
					let scored = false;
					for (let i = 0; i < ticket.ticket.checks.length; i++) {
						if (ticket.ticket.checks[i].scored == true) {
							scored = true;
							break;
						}
					}
					if (scored) {
						score_box.style.left = "0px";
					} else {
						present_box.style.left = "0px"
					}
				}
			}
		}
	}
};
var mactions = {
  	save:{
    	id:'wo-save-button',
    	src:'https://www.vhpportal.com/repo/assets/icons/disk.png',
    	title:'Save WO',
    	ondblclick:(ele)=>{
      		window.SAVEticket();
    	}
  	},
  	refresh:{
    	id:'wo-refresh-button',
    	src:'https://www.vhpportal.com/repo/assets/icons/refresh.png',
    	title:'Refresh WO',
    	onclick:(ele)=>{   // Refresh info
			DropNote('tr','Ticket is Refreshing','green');
			SYNCticket(currticket.wo.id).then(
				sync=>{
					if(sync.wo){
						currticket.wo=sync.wo;
						ticket.ticket={wo:currticket.wo};
						DropNote('tr','Ticket is updated','green');
					} else {
						DropNote('tr','Ticket was NOT updated','yellow');
					}
				}
			);
		}
  	}
};

titlebar.SETUPtitlebar({
	RROOT:'https://www.vhpportal.com/repo/',
	qacts:qactions,
	macts:mactions,
	login:false,
	home:()=>{window.opener.gohome(window);}
}); //login disabled

document.getElementById(titlebar.tbdom.utils.buttons.home).addEventListener('click', (ele)=>{   // Home Button
  	DropNote('tr','Going home','yellow');
});
$(document.getElementById(titlebar.tbdom.page.settings)).hide();   //hide the settings section of title bar
$(document.getElementById(titlebar.tbdom.page.user)).hide();       //hide the user section of the title bar
////////////////////////////////////////////////////

/*Event listener which resets and closes repair table pop-up.*/
document.getElementsByClassName('min-page-hide-button')[0].addEventListener('click', (ele)=>{
  	TOGGLErepairtable()
});
/*Event listener to minimize repair list pop-up.*/
document.getElementsByClassName('min-page-minimize-button')[0].addEventListener('click', (ele)=>{
	let style = window.getComputedStyle(document.getElementById('loginout-block'));

	//SHOW
	if (style.display == 'none') {
		$(document.getElementById('loginout-block')).show();
		document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
		document.getElementsByClassName('frbook-list')[0].style.display = "";
		document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
	} else {
		//HIDE
		$(document.getElementById('loginout-block')).hide();
		document.getElementsByClassName('min-page-cont')[0].id = "min-page-hide"
		document.getElementsByClassName('frbook-list')[0].style.display = "none";
		document.getElementsByClassName('min-page-minimize-button')[0].innerText = "+";
	}
});

//Go to Support ticket
document.getElementById("titlebar-button-help").addEventListener('click',()=>{
	/*console.log("help!")
	window.open('/Support/Request')*/
	let box = document.getElementById("help-box-cont")
	if (box) {
		let style = window.getComputedStyle(document.getElementById('help-box-cont'));
		if (style.display == "none") {
			box.style.display = "grid"
		} else {
			box.style.display = "none"
		}
	}
})
document.getElementById("help-box-close").addEventListener('click',()=>{
	/*console.log("help!")
	window.open('/Support/Request')*/
	let box = document.getElementById("help-box-cont")
	if (box) {
		document.getElementById('help-box-cont').style.display = "none"
	}
})
document.getElementById("open-support-form").addEventListener('click',()=>{
	console.log("help!")
	window.open('/Support/Request')
})

var TOGGLErepairtable = (hide=undefined) => {
	document.getElementsByClassName('min-page-minimize-button')[0].innerText = "-";
	document.getElementsByClassName('frbook-list')[0].style.display = "";
	if (hide != undefined && hide == true) {
		$(document.getElementsByClassName('min-page-cont')[0]).hide();
	} else {
		$(document.getElementsByClassName('min-page-cont')[0]).toggle();
	}
	document.getElementsByClassName('min-page-cont')[0].id = "min-page-show"
	$(document.getElementById('loginout-block')).hide();
}
