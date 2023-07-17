import { CollateralForm } from "/Tech/javascript/forms/collateral-form.js";
import { SummaryCheckList } from "/Tech/javascript/controllers/collateral/checklists/summary-checklist.js";
import { basicinvoice } from "/Tech/javascript/controllers/collateral/invoices/basic-invoice.js";
import { DropNote } from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import { EmailForm } from "/Tech/javascript/controllers/collateral/emailtemplate.js";
import {STARTloadscreen} from 'https://www.vhpportal.com/repo/tools/vhc-loadscreen.js';
import { checklistss, setupChecklist} from '/Tech/javascript/checklists/checklist-data.js';
import { GETcss } from '/Tech/javascript/tools/getcss.js';
import { ServiceSystemSummary } from '/Tech/javascript/controllers/ticket/service-system-summary.js';
import {SENDrequestapi} from 'https://www.vhpportal.com/repo/apis/vapi/vapicore.js';
import { gradedescr } from "/Tech/javascript/checklists/checklist-descr.js";
//setup emailing vars

/**
 * @todo | toggle checklist items hiding based on enhanced checklist toggle
 * @todo | if enhanced, recreate the system score chart
 * @bug | sometimes, checklist items don't hide
 */

var emailcontent = {
    invoice:'',
    wosum:'',
    checks:[]
}
var escapeHtml = (s) =>{
  	return $("<div/>").text(s.replace(/(\r\n|\n|\r)/gm, "")).html();
};
//generate presentation printout

var ticket = window.opener.data;
var summary = window.opener.summary;
var repairtable = window.opener.repairtable;
const contractopts = window.opener.contractopt;
repairtable.id = "wo-present-system-summary"


console.log("Ticket from collateral::::", ticket)

var summary = window.opener.summary;
ticket.wo.location = ticket.wo.street;
ticket.wo.jstreet = ticket.wo.street;
ticket.wo.jcity = ticket.wo.cityzip;
ticket.wo.invdate = new Date().toLocaleDateString();
var price = 0;
if (ticket.wo.pricelevel == "STA") {
    price = window.opener.regprice
} else {
    price = window.opener.memberprice
}
let name ="Customer"
if (ticket.wo.customername) {
    name = ticket.wo.customername.split(", ")
}
let emailform = undefined;
if (name.constructor == Array) {
    emailform = new EmailForm(name[1] + " " + name[0])
} else {
    emailform = new EmailForm(ticket.wo.customername)
}
//ACTION events ////////////
/**
 * Event listener to download PDF of summary
 */
document.getElementById('print-collateral').addEventListener('click',(ele)=>{
	window.print();
	ticket.track.downloaded = true;
});

/**
 * Event listener to send email of PDF
 */
document.getElementById('email-collateral').addEventListener('dblclick',(ele)=>{
	alert('Sending email to ' + document.getElementById('email-input').value);
	ticket.track.emailed = true;
	//get and validate email from screen
	//get array of all conent on collateral page
	STARTloadscreen(document.getElementsByClassName('vhc-email-load-screen')[0],()=>{
		/*return new Promise((resolve,reject)=>{
			let css=GETcss();
			let emailattach = [];
			for(let e in emailcontent){//to reorganize the email content into an array
				if('checks'===e){emailcontent[e].forEach(i=>emailattach.push(i))}
				else{emailattach.push(emailcontent[e])}
			}
			SENDrequestapi({
				to:'christianv@vogelheating.com',//document.getElementById('email-value').value,
				subject:'Home Comfort Report - WO #' + ticket.wo.id,
				body:emailform.GETcontent(),
				attach:[{html:emailattach,css:css,filename:'Service Summary'}]
			},'MAIL',{request:'MAIL'},'https://18.191.223.80:5000/api/').then(answr=>{
				if (answr.msg == "Mail sent") {
					DropNote('tr', 'Mail sent!', 'green')
					DropNote('tr', 'Remind customer to check spam', 'green')
					return(resolve(true))
				} else {
					DropNote('tr', answr.msg, 'red', false)
					return(resolve(true))
				}
			})
		}).then(answr=>{
			console.log(answr);
			return(true)
		})*/
		return new Promise((resolve,reject)=>{
			console.log("start load screen")
			SENDrequestapi({
				to:document.getElementById('email-input').value,
				subject:'Home Comfort Report - WO #' + ticket.wo.id,
				html:emailform.GETcontent(),
				attach:emailcontent
			},
			'MAIL',{}).then(
				answer=>{
					if (answer.msg == "Mail sent") {
						DropNote('tr', 'Mail sent!', 'green')
						DropNote('tr', 'Remind customer to check spam', 'green')
						return(resolve(true))
					} else {
						DropNote('tr', answer.msg, 'red', false)
						return(resolve(true))
					}
				}
			);
		}).then(answr=>{
			console.log(answr);
			return(true)
		})
	});
});

/**
 * Event listener to open checklist popup
 */
document.getElementById('complete-ticket').addEventListener('dblclick',(ele)=>{
    document.getElementById('tickcompcont').style.display = "grid"
    //Set checkboxes based on track
    if (ticket.track.emailed == true) {document.getElementById('email-check').checked = true}
    if (ticket.track.downloaded == true) {document.getElementById('download-check').checked = true}
    if (ticket.track.paymentmethod == "creditcard") {document.getElementById('paymentmethod-select').selectedIndex = 1}
});

/**
 * Event listeners for changing value of complete checklist checks
 */
document.getElementById('email-check').addEventListener('click', (eve)=>{
    ticket.track.email = document.getElementById('email-check').checked
})
document.getElementById('download-check').addEventListener('click', (eve)=>{
    ticket.track.download = document.getElementById('download-check').checked
})
let PaymentMethodSelect = document.getElementById('paymentmethod-select')
PaymentMethodSelect.addEventListener('click', (eve)=>{
    ticket.track.paymentmethod = PaymentMethodSelect.options[PaymentMethodSelect.selectedIndex].value
})

/**
 * Event listener to close checklist container for going back to ticket
 */
document.getElementsByClassName('container-close')[0].addEventListener('click', (eve)=>{
    document.getElementById('tickcompcont').style.display = "none"
})

/**
 * Event listener for refresh WO description button.
 */
document.getElementById("refresh-descr").addEventListener('click', (eve)=>{
	window.opener.REFRESHdescr().then(answer=>{
		if (answer) {
			document.getElementById("jonas-descr").innerText = answer
		}
	});
})

/**
 * Event listener for the final close ticket button
 */
document.getElementById('final-complete-ticket').addEventListener('dblclick', (eve)=>{
    let AllChecked = true;
    inputs = document.getElementById('tickcompcont').getElementsByTagName('INPUT');
    for (let i = 0; i < inputs.length; i++){
        if (inputs[i].type == "checkbox") {
            if (inputs[i].checked == false) {
                AllChecked = false;
                let text = inputs[i].parentElement.firstElementChild.innerText
                DropNote('tr','Verify '+text,'yellow');
                break;
            }
        }
    }
    if (PaymentMethodSelect.options[PaymentMethodSelect.selectedIndex].value == ""){
        AllChecked = false;
        DropNote('tr','Enter Payment Method','yellow');
    }
    if (AllChecked) {
        //Save and set mobile to true
        window.opener.ticket.mobile = false;
        window.opener.SAVEticket().then(
			answer=>{
				if(answer){
					alert("Ticket saved and closed!")
					window.opener.askToClose = false;
					window.opener.close();
					window.opener.opener.refreshDash(answer);
					window.close();
				}else{
					alert('Ticket could not save, Try again')
				}
			}
        );
        //window.opener.opener.removerow(ticket.wo.id) //Does not work, currently removes all items from row
    }
})

/**
 * Event listener to open payment URL
 */
document.getElementById('payment-card').addEventListener('click',(ele)=>{
    window.open("https://www.swipesimple.com/links/lnk_0c729904");
    ticket.track.paymentmethod = "creditcard"
});
//FILL EMAIL INPUT
if (ticket.wo.contactemail != "" || ticket.wo.contactemail != undefined) {
    document.getElementById('email-input').value = ticket.wo.contactemail;
}

////////////////////////////

/**
 * CREATE INVOICE FORM
 * Creates the invoice form
 */
var invoice = new CollateralForm(document.createElement('div'),basicinvoice);

document.body.appendChild(invoice.cont);
for(let i in invoice.dom.info){
    if (invoice.dom.info[i][0]) {
        if(ticket.wo[i]){
            document.getElementsByClassName(invoice.dom.info[i])[0].innerHTML = i=='tech'?ticket[i]:ticket.wo[i];
        }else{
            if (invoice.dom.info[i] == "invoice-info-total") {
                document.getElementsByClassName(invoice.dom.info[i])[0].innerText = ticket.total;
            } else if (invoice.dom.info[i] == "invoice-info-terms") {
                document.getElementsByClassName(invoice.dom.info[i])[0].innerText = 'COD';
            } else {
                document.getElementsByClassName(invoice.dom.info[i])[0].innerText = '';
            }
        }
    }

}

/**
 * Create the table of repairs using ticket.repais
 */
let sitems = window.opener.sitems;
let RepairBox = document.getElementsByClassName(invoice.dom.repairs.repairtable)[0];
for (let i = 0; i < sitems.length; i++) {
    if (ticket.repairs[i].length > 0) {
        //Make the system label
        let SystemDiv = document.createElement('div');
        let SystemLabel = document.createElement('div');
        //SystemLabel.innerText = sitems[i].tagid;
        SystemLabel.className = "System-Label"
        SystemDiv.appendChild(SystemLabel);

        //Create row for each repair item
        for (let j = 0; j < ticket.repairs[i].length; j++) {
            let Repair = ticket.repairs[i][j];
            if (Repair.appr != "NO") {
                SystemLabel.innerText = sitems[i].tagid;
                //Create row
                let Row = document.createElement('div')
                Row.className = "invoice-repair-row";

                //Create description
                let Description = document.createElement('div');
                Description.innerText = Repair.descr;
                Row.appendChild(Description);

                //Create QTY
                let Quantity = document.createElement('div')
                Quantity.innerText = Repair.qty;
                Row.appendChild(Quantity);

                let Price = document.createElement('div')
                Price.innerText = Repair.price;
                Price.id = "PriceLabel"
                Row.appendChild(Price);

                let Approval = document.createElement('div')
                Approval.innerText = Repair.appr;
                Row.appendChild(Approval);

                SystemDiv.appendChild(Row);
            }
        }
        //Add the system to the Repair Box
        RepairBox.appendChild(SystemDiv)

    }
}

if (window.opener.signature) {
    document.getElementById('sig-insert').appendChild(window.opener.signature)
}
emailcontent.invoice = invoice.cont.outerHTML;

/**
 * CREATE REWARD SUMMARY FORM
 * Loop through the form and convert all the inputs to divs
 */

var summaryform = document.body.appendChild(window.opener.presentation);

summaryform.appendChild(document.createElement('div'));
summaryform.lastChild.className='pagebreak';


if (window.opener.signature) {
    document.getElementsByClassName('wo-present-signature')[0].prepend(window.opener.signature.cloneNode(true))
}
//Convert inputs to div
let SelectDiv = document.getElementsByClassName('select')[0]
SelectDiv.innerHTML = "";
if (ticket.total == window.opener.memberprice) {
    SelectDiv.innerText = ticket.contract.pricelevel
} else {
    SelectDiv.innerText = "NO PLAN SELECTED"
}
var inputs = document.getElementsByClassName('present-contract-opts')[0].getElementsByTagName('input');
for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i]
    var parentNode = input.parentNode;
    let newElem = document.createElement('div')
    if (input.type == "checkbox") {
        if (input.checked) {
            newElem.innerText = "YES"
        } else {
            newElem.innerText = "NO"
        }
    } else {
        if (ticket.total == window.opener.memberprice) {
            newElem.innerText = input.value;
        } else {
            newElem.innerText = 0;
        }
    }
    parentNode.insertBefore(newElem, parentNode.childNodes[2])
}
SelectDiv.className = "present-contract-name"

emailcontent.wosum = document.getElementsByClassName('present-full-cont')[0].parentElement.outerHTML;

/**
 * CREATE CHECKLIST FORM
 * Create the basic checklist collateral, and if the checklist is scored, the scored checklist collateral
 */
for (let i = 0; i < summary.length; i++){
	/*Set undefined items to be blank.*/
	for (let key in summary[i].summary.content) {
		if (summary[i].summary.content[key] == undefined || summary[i].summary.content[key] == "undefined") {
			summary[i].summary.content[key] = ""
		}
	}
    var checksum = new CollateralForm(document.createElement('div'),new SummaryCheckList(summary[i].summary.content, summary[i].name));
    document.body.appendChild(checksum.cont);
    document.getElementsByClassName(checksum.dom.info.street)[i].innerText = ticket.wo.street;
    document.getElementsByClassName(checksum.dom.info.cityzip)[i].innerText = ticket.wo.cityzip;
    emailcontent.checks.push(checksum.cont.outerHTML);
	
	//Check that scored is true and both the score object and the grade inside the score object are not undefined
	//This is to hide systems which have nothing filled out. Shouldn't ever happen in a real scenario, but just in case.
	if (ticket.checks[i].scored == true) {
		let summarycont = document.getElementsByClassName('checklist-summary-cont')[i]
		if (summarycont) {
			var checksumscore = new ServiceSystemSummary(summarycont, ticket)
			checksumscore.curIndex = i
			let cont = checksumscore.GETsystempage(ticket.checks[i])
			console.log(checksumscore.score,i, "SCORE BEFORE APPEND")
			//If the score is undefined, don't append
			if (checksumscore.score.grade != undefined) {
				summarycont.append(cont)
				checksumscore.DRAWgaugechart(ticket.checks[i].name)
				let barcont = document.getElementById("score-summary-chart-"+ticket.checks[i].name)
				let string = JSON.parse(JSON.stringify(ticket.checks[i].score.grade)).replace(/\s/g, "")
				barcont.classList.add(string)
				barcont.innerHTML = gradedescr[ticket.checks[i].score.grade]
			}
		}
		emailcontent.checks.push(summarycont.outerHTML);
	}
}

//Change default name of printed document
document.title = String(ticket.wo.id)+'-'+ticket.wo.custcode;

//Flame sensor/pilot assembly logic
if (document.getElementsByClassName("pilotasmbly")[0].innerText == "No") {
    document.getElementById("flame-sensor-curr")
    $("#flame-sensor-curr").show()
    $("#check-pilot-asmbly").hide()
} else {
    $("#flame-sensor-curr").hide()
    $("#check-pilot-asmbly").show()
}

//Loop through and 
/*let data = setupChecklist()
let list = checklistss.enhanced.included;
		//Loop through fields in enhanced and show only enhanced
console.log("SCORE:",window.opener.score)
console.log("DATA",data)
console.log("LIST", list)
//Array-ify the scoe object?
let score = []
for (let key in window.opener.score) {
	score.push(window.opener.score[key])
}
for (let i = 0; i < list.length; i++) {
	let obj = data[list[i]]
	if (obj) {
		let docs = document.getElementsByClassName(obj.id)
		let scores = document.getElementsByClassName(obj.id+'-score')
		for (let j = 0; j < docs.length; j++) {
			if (docs[j]) {
				docs[j].parentNode.style.display = 'grid'
			}
			if (scores[j] && score[j].checks[obj.title] != undefined) {
				scores[j].innerText = score[j].checks[obj.title]
			}
		}
		
	}
	
}*/