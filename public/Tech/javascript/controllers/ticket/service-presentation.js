import { DrawingPad } from '/Tech/javascript/tools/drawing-pad.js';
import {DropNote} from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import {ServicePricing} from '/Tech/javascript/controllers/ticket/service-pricing.js';
import {ContractWSform} from '/Tech/javascript/forms/contract-ws-form.js';


//aservicepresentation(){}
export class ServicePresentation{
  	constructor(cont,data,pricebook, checksum){
		this.cont = cont;
		this.cont.innerHTML=this.contents;
		this.data = data; //ticket data
		this.pricebook = new ServicePricing(pricebook); //ticket book
		this.conform = new ContractWSform();
		this.final = {tech:this.data.tech} //Final compact ticket object to be passed to collateral
		this.SignatureShown = false;
		this.AHRrate = 1.05//1.42 //This gets 119>169 with the rounding
		this.checksum = checksum

		this.cont.getElementsByClassName(this.dom.head)[0].appendChild(this.conform.cont);

		//console.log("PRESENTATION DATA", this.data)

		//Event listener for change of contract form
		this.conform.cont.addEventListener('change',(ele)=>{
			//console.log('update pricing on presentation');

			let price = this.conform.GETformprice(1);

			//Update price in paymeny form
			document.getElementById('wo-present-contract-monthly').innerText = price;
			//Update price object in final
			this.final.monthlymem = price;

			//Hide the signature and reset the box
			if (this.SignatureShown) {
				this.SHOWsignature();
			}

			//Update membership label
			let oldLevel = document.getElementsByClassName('memlevel-label')[0].innerText;
			let newLevel = this.conform.pricelevel;
			if (oldLevel != newLevel) {
				document.getElementsByClassName('memlevel-label')[0].innerText = this.conform.pricelevel;
				this.contract = this.conform.pricelevel.slice(0, 3)
				this.UPDATEsitems(this.data)
			}
		});

		this.contract = this.data.wo.pricelevel;
		this.SETpresent(this.data);
		document.getElementsByClassName('memlevel-label')[0].innerText = this.contract

		//Set contract form to currently existign data in ticket
		let testcontr = {
			"monthlyplan": true,
			"pricelevel": "PREMIUM",
			"sys": "7485",
			"comp": "3052",
			"stdfltr": "5",
			"spcfltr": "5",
			"humpad": "4",
			"timesave": "4"
		}
		if (this.data.conform != undefined) {
			this.conform.SETcontract(this.data.conform)
		}

		//Check AHR price box if set to After Hours
		if (this.pricebook.pl == "AHR") {
			document.getElementById('pl-check').checked = true;
		}

		/*Setup + listeners for approve buttons.*/
		document.getElementsByClassName(this.dom.sig)[0].style.left = '-5000px'; //For first run
		document.getElementById(this.dom.buttons.appreg).addEventListener('click',(eve)=>{
			this.SHOWsignature(false);
			//update this.data.repairs with regular (STA | AHR) prices
			this.UPDATEticketrepairs(this.pricebook.pl)
			this.final.total = Number(document.getElementById("wo-present-regprice-today").innerText);
			this.final.savings = 0;
		});
		document.getElementById(this.dom.buttons.appmem).addEventListener('click',(eve)=>{
			this.SHOWsignature(true);
			//update this.data.repairs with regular (CLA | PRE | ULT) prices
			this.UPDATEticketrepairs(this.contract);
			//Update final object price and savings
			this.final.total = Number(document.getElementById("wo-present-memprice-today").innerText);
			this.final.savings = Number(document.getElementById("wo-present-savings-today").innerText);
		});

		document.getElementById(this.dom.buttons.scoring).addEventListener('click', ()=>{
			if (this.checksum) {
				this.checksum.SETindex(0)
				this.checksum.SETsummary(this.data)
				let box = document.getElementsByClassName('system-summary-cont')[0];
				let box2 = document.getElementsByClassName('present-full-cont')[0];

				box.style.left = "0px";
				box2.style.left = '-5000px'
			}
		})

		//Event listener for change of PL
		document.getElementById('pl-check').addEventListener('change', (eve)=>{
			if (eve.target.checked == true) {
				this.pricebook.pl = "AHR";
			} else {
				this.pricebook.pl = "STA";
			}
			this.UPDATEsitems(this.data)
			if (this.SignatureShown) {
				this.SHOWsignature();
			}
		})

		//Event listener for show/hide of PL popup
		document.getElementById('price-select').addEventListener('click', (eve)=>{
		let plcont = document.getElementById('pl-popup');
			if (plcont.style.display == "grid") {
				plcont.style.display = "none"
			} else {
				plcont.style.display = "grid"
			}
		})

		//setup signature pad
		this.sigpad = new DrawingPad(document.getElementsByClassName('signature-pad')[0]);
		document.getElementsByClassName('sig-clear')[0].addEventListener('click', (ele)=>{
			this.sigpad.clearPad();
		});
		/*Open collateral on signature save.*/
		document.getElementsByClassName('sig-save')[0].addEventListener('click', (ele)=>{
			window.signature = this.sigpad.getPainting();

			if(this.sigpad.signed){
				//Set and store final object on window.
				this.final.wo = this.data.wo;
				this.final.repairs = this.data.repairs;
				this.final.contract = this.conform.GETcontract();
				this.final.track = this.data.track;
				this.final.checks = this.data.checks;
				window.data = this.final;
				window.sitems = this.data.sitems;
				window.ticket = this.data;
				window.memberprice = document.getElementById("wo-present-memprice-today").innerText;
				window.regprice = document.getElementById("wo-present-regprice-today").innerText;
				window.presentation = this.cont.cloneNode(true);
				window.open("/Tech/collateral");
			} else {
				DropNote('tr','Please Sign','yellow')
			}
		});
	}

	dom = {
		cont: 'present-full-cont',
		checkcont:'check-full-cont',
		pathscont:'path-full-cont',
		head: 'present-header-cont',
		info:{
			customername:'present-info-contactname',
			street:'present-info-street',
			cityzip:'present-info-cityzip',
			contactphone:'present-info-contactphone',
			custcode:'present-info-custcode',
			id:'present-info-id'   // wonum
		},

		//contract: cntrctform, //from vg-membership.js

		body: 'present-bottom-cont',

		memlevel:'wo-present-membership',
		systems: 'wo-present-systems',
		system: {   //Most of this is generated by JS
			cont: 'wo-present-system',
			id: 'wo-present-system-id',
			repairs: 'wo-present-system-repairs',
			specials:{
				diagnostic:'wo-present-repair-diagnostic'
			},
			repair: {
				unapproved:'wo-present-repair-unapproved',
				unapproved_return:'wo-present-repair-unapproved-return',
				cont: 'wo-present-repair',
				num: 'present-repair-num',
				desc: 'present-repair-desc',
				invst: 'present-repair-price',
				savings: 'present-repair-savings',
				appr: 'present-repair-appr'
			}
		},
		invest: {
			discsavings:'wo-present-discount-savings',
			savings: 'wo-present-savings-today',
			regprice: 'wo-present-regprice-today',
			memprice: 'wo-present-memprice-today',
			conmonth: 'wo-present-contract-monthly'
		},
		buttons:{
			open:'button-open-presentation',
			appreg: 'present-approval-regular',
			appmem: 'present-approval-membership',
			scoring: 'present-open-scoring'
		},
		sig: 'wo-present-signature'
 	}

  	contents=`
		<div class="${this.dom.cont}">
			<div class = "system-summary-cont"></div>
			<div class = "${this.dom.pathscont}">
				<div class = "header-cont">
					<div class = "header-button" id = '${this.dom.buttons.scoring}'>Scoring</div>
					<div class="presentation-title-header">2 PATHS TO COMFORT</div>
				</div>
				<div class="${this.dom.head}">
					<div class="wo-contact-cont">
						<img src="https://www.vhpportal.com/repo/assets/images/Header_clean_transparent.png" id="header-logo" alt="VOGEL">
						<div class="${this.dom.info.customername}">Client Name</div>
						<div class="${this.dom.info.custcode}">CUSTCODE</div>
						<div class="${this.dom.info.street}">1234 Street Dr</div>
						<div class="${this.dom.info.id}">wonum</div>
						<div class="${this.dom.info.cityzip}">Fenton, MO 63026</div>
						<div class="${this.dom.info.contactphone}">Phone Number</div>
					</div>
				</div>
				<div class="${this.dom.body}">
					<div id="wo-present-repair-cont">
						<div class="${this.dom.system.repair.cont}">
							<div class="ignore">Pricing</div>
							<div class="ignore">Premium</div>
							<div class = "memlevel-label" id="${this.dom.memlevel}"></div>
							<a href="https://www.vogelhvac.co/" target="_blank" id="membership-link">Sign Up for Your Membership!</a>
						</div>
						<div class = "mini-popup" id = "pl-popup">
							<div>After Hours</div>
							<input type = "checkbox" id = "pl-check"></input>
						</div>
						<div class="wo-present-headers">
							<div>Services & Repairs</div>
							<div id = "price-select">Regular</div>
							<div id = "member-label">Member</div>
							<div>Savings</div>
							<div>Approval</div>
						</div>


						<div id="wo-present-repair-diagnostic" class="${this.dom.system.repair.cont}" style="display:none">

							<div class="${this.dom.system.repair.desc}">Diagnostic</div>
							<div class="${this.dom.system.repair.invst}"></div>
							<div></div>
							<div class="${this.dom.system.repair.savings}"></div>
							<div>YES</div>
						</div>

						<div id="wo-present-systems">
					</div>
					<div class="${this.dom.system.repair.cont}">
						<div>Due Today</div>
						<div id="${this.dom.invest.regprice}"></div>
						<div id="${this.dom.invest.memprice}" class = "member-price"></div>
					</div>
					<div class="${this.dom.system.repair.cont}">
						<div>Savings Today</div>
						<div id = "${this.dom.invest.discsavings}">0</div>
						<div id="${this.dom.invest.savings}" class = "member-savings"></div>
					</div>
					<div class="${this.dom.system.repair.cont}">
						<div>Monthly Membership</div>
						<div class="ignore"></div>
						<div id="${this.dom.invest.conmonth}" class = "member-month">0</div>
					</div>
					<div class="button-row">
						<label></label>
						<div id="${this.dom.buttons.appreg}">Approve</div>
						<div id="${this.dom.buttons.appmem}">Approve</div>
					</div>
					<div class="${this.dom.sig}">
						<canvas class="signature-pad"></canvas>
						<div class="signature-buttons">
						<div class="flat-action-button sig-clear">Clear</div>
						<div class="flat-action-button sig-save">Proceed</div>
						</div>
					</div>
				</div>
			</div>
		</div>
  	`

	/**
	 * Updates the current presentation with newly passed in data
	 * Calls this.UPDATEsitems()
	 * @param {object} wodata | new wodata passed from the ticket
	 */
	SETpresent = (wodata) => {
		console.log('To Present > ',wodata);
		//Use to maintain the state of the pricelevel on the presentation
		let oldpricelevel = this.contract;
		this.data = wodata;
		//Update WO info
		for(let i in this.dom.info){
			this.cont.getElementsByClassName(this.dom.info[i])[0].innerText = this.data.wo[i];
		}

		//Update price level, checking for AHR and STA/STD
		//Check if document is loaded for first run of presentation generation
		if (this.data.wo.pricelevel == "STA" || this.data.wo.pricelevel == "AHR" || this.data.wo.pricelevel == "STD") {
			if (oldpricelevel == "ULT" || oldpricelevel == "CLA") {
				this.contract = oldpricelevel
			} else {
				this.contract = "PRE"
			}
		} else {
			this.contract = this.data.wo.pricelevel
		}
		this.conform.pricelevel = this.conform.GETmemhead(this.contract);
		this.conform.UPDATEselect();
		//Update repair items and save the repairs and contract options HTML to the window for the collateral
		this.UPDATEsitems();
		window.repairtable = document.getElementById('wo-present-systems').cloneNode(true);
		window.contractopt = document.getElementsByClassName('present-contract-opts')[0];
	}

	/**
	 * Toggles the signature box and changes the text of one of the approval buttons.
	 * @param {boolean} IsMember | bool used to determine which approval button to modify
	 */
	SHOWsignature=(IsMember)=>{
		let box = document.getElementsByClassName(this.dom.sig)[0];
		this.sigpad.clearPad();
		if(box.style.left == "0px"){
			this.SignatureShown = false;
			box.style.left = "-5000px";
			document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--BCE-green)";
			document.getElementById(this.dom.buttons.appreg).innerText = "Approve"
			document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--BCE-green)";
			document.getElementById(this.dom.buttons.appmem).innerText = "Approve"
		} else {
			this.SignatureShown = true;
			box.style.left = "0px";
			if (IsMember) {
				document.getElementById(this.dom.buttons.appreg).style.backgroundColor = "var(--vogel-red)";
				document.getElementById(this.dom.buttons.appreg).innerText = "Decline"
			} else {
				document.getElementById(this.dom.buttons.appmem).style.backgroundColor = "var(--vogel-red)";
				document.getElementById(this.dom.buttons.appmem).innerText = "Decline"
			}
		}
	}

	/**
	 * Update the service items list and call this.UPDATEtotalprice()
	 */
	UPDATEsitems = () => {
		//console.log("WODATA:::::::::", wodata)
		if (this.data.sitems != null) {
			document.body.appendChild(this.cont);  // Creates presentation
			//document.getElementsByClassName(this.dom.head)[0].appendChild(document.createElement('div')).innerHTML = cfcontent; // Appends Contract Form within presentation

			let slist = document.getElementById(this.dom.systems);

			let rprice=0; //item reg price
			let mprice=0; //item member price

			let discsavings=0; //discount savings

			slist.innerHTML = '';

			for (let x = 0; x < this.data.sitems.length; x++) {  // Sets each system
				if(this.data.repairs[x]!=undefined && this.data.repairs[x].length!==0){//only display if repairs
					//Add system label div
					let sysgroup = document.createElement('div');
					sysgroup.id = "system-label-group";

					let s = slist.appendChild(document.createElement('div'));
					s.classList.add(this.dom.system.cont);
					sysgroup.appendChild(document.createElement('div')).innerText = this.data.sitems[x].tagid; //This creates the actual label
					sysgroup.lastChild.className = "system-label"

					//Add blank column div
					let membgdiv = sysgroup.appendChild(document.createElement('div'));
					membgdiv.id = "member-blank-column";

					s.appendChild(sysgroup)

					//Add repair list
					let rlist = s.appendChild(document.createElement('div'));
					rlist.classList.add(this.dom.system.repairs);

					for (let y = 0; y < this.data.repairs[x].length; y++) {  // Sets each repair for given system
						let repairPrices = this.GETrepairprice(this.data.repairs[x][y])
						
						rprice = repairPrices.rprice
						mprice = repairPrices.mprice

						let r = rlist.appendChild(document.createElement('div'));

						r.classList.add(this.dom.system.repair.cont);
						r.appendChild(document.createElement('div')).innerText = this.data.repairs[x][y].descr + " (" + this.data.repairs[x][y].qty + ")";

						r.appendChild(document.createElement('div')).innerText =  rprice;

						r.appendChild(document.createElement('div')).innerText = mprice;
						r.lastChild.id = "member-item-label";
						r.appendChild(document.createElement('div')).innerText = (Math.abs(rprice - mprice));

						if(this.data.repairs[x][y].appr == "NO"){
							r.classList.add(this.dom.system.repair.unapproved);
						} else if (this.data.repairs[x][y].appr == "RETURN FOR") {
							r.classList.add(this.dom.system.repair.unapproved_return);
						}

						//Add to disc savings
						if (mprice < 0 && rprice < 0 && this.data.repairs[x][y].appr != "NO") {
							discsavings = discsavings + mprice
							r.lastChild.innerText = -mprice
						}

						//Approval div
						let apprdiv = document.createElement('div');
						r.appendChild(apprdiv).innerText = this.data.repairs[x][y].appr;
						apprdiv.className = "apprvdiv"
						apprdiv.classList.add(apprdiv.innerText.replace(/\s/g, ''))

						this.UPDATEtotalprice()
						/**
						 * Event listener for approving repairs on repair table
						 * Allows toggling between YES/NO/RETURN FOR
						 * */
						apprdiv.addEventListener('click', (eve)=>{
							if (this.data.repairs[x][y].appr == "YES") {
								this.data.repairs[x][y].appr = "RETURN FOR"
								r.classList.add(this.dom.system.repair.unapproved_return);
							} else if (this.data.repairs[x][y].appr == "RETURN FOR") {
								this.data.repairs[x][y].appr = "NO"
								r.classList.remove(this.dom.system.repair.unapproved_return);
								r.classList.add(this.dom.system.repair.unapproved);
							} else {
								this.data.repairs[x][y].appr = "YES"
								r.classList.remove(this.dom.system.repair.unapproved);
							}

							apprdiv.innerText = this.data.repairs[x][y].appr;
							apprdiv.className = "apprvdiv"
							apprdiv.classList.add(apprdiv.innerText.replace(/\s/g, ''))

							//Update total price
							this.UPDATEtotalprice()

							//Hide the signature and reset the box
							if (this.SignatureShown) {
								this.SHOWsignature();
							}
						})
					}
				}
			}
		}
	}

	/**
	 * Takes in a repair object and returns its calculated price, accounting for price level and after hours.
	 * @param {Object} repair | a single repair
	 * @returns | an object containing the regular price and member price
	 */
	GETrepairprice = (repair) => {
		//Set base prices for each item
		let rprice = (repair.task!='OTH'?this.pricebook.GETbookprice(repair.task):Number(repair.price));
		let mprice = 0;

		//Get the price of the member item
		if(repair.task!='OTH'){
		if(repair.task=='DIAG'){ //special case for diagnostic fee
			mprice = this.pricebook.GETbookprice(repair.task);
			rprice = mprice["STA"]
			mprice = mprice[this.data.wo.pricelevel]
		} else {
			mprice = this.pricebook.GETbookprice(repair.task,this.contract);
		}
		} else {
		mprice = Number(repair.price) * repair.qty;
		}

		if (this.pricebook.pl == "AHR" && repair.task != "DIAG" && repair.task !="OTH") {
			if ((rprice/repair.qty) != mprice) {
				mprice = Math.ceil(mprice * this.AHRrate)
			}
		}

		//Catch any repairs which have a blank price in the price book
		if (mprice == '') {mprice=0}
		if (rprice == '') {rprice=0}

		return {
			mprice:mprice * repair.qty, 
			rprice:rprice * repair.qty
		}
	}

	/**
	 * Calculates the total price based on the prices of each repair, and updates the total price text in the presentation.
	 */
	UPDATEtotalprice = () => {

		let trprice=0; //total reg price
		let tmprice=0; //total member price
		let savings=0; //total savings
		let discsavings=0; //discount savings

		//Loop through each repair, calculating the price and updating the price variable
		for (let x = 0; x < this.data.repairs.length; x++) {
			for (let y = 0; y < this.data.repairs[x].length; y++) {
				let repairPrices = this.GETrepairprice(this.data.repairs[x][y])

				//Calculate any discounts applied by the tech
				if (repairPrices.mprice < 0 && repairPrices.rprice < 0 && this.data.repairs[x][y].appr != "NO") {
					discsavings = discsavings + repairPrices.mprice
				}

				//Calculate totals
				if (this.data.repairs[x][y].appr != "NO") {
					tmprice = tmprice + repairPrices.mprice
					savings = savings + (repairPrices.rprice - repairPrices.mprice)
					trprice = trprice + repairPrices.rprice
				}
			}
		}

		if (trprice < 0) {trprice = 0}
		if (tmprice < 0) {tmprice = 0}

		document.getElementById(this.dom.invest.regprice).innerText = (trprice);
		document.getElementById(this.dom.invest.memprice).innerText = (tmprice);
		document.getElementById(this.dom.invest.savings).innerText = (Math.abs(savings + (-discsavings)));
		document.getElementById(this.dom.invest.discsavings).innerText = (Math.abs(discsavings))
	}

	/**
	 * Loops through each repair item and updates its price from the price book, using the given repair level
	 * Saves to the ticket object
	 * @param {String} pl | "STA", "AHR", "CLA", "PRE", or "ULT"
	 * @param {String} appr | An optional updated approval setting to reflect approval changes back to ticket.
	 * @todo | Swap this function to use our GETrepairprice function
	 */
  	UPDATEticketrepairs = (pl=null, appr=null) => {
    	for (let i = 0; i < this.data.repairs.length; i++) {
			let item = this.data.repairs[i];
			for (let j = 0; j < item.length; j++) {
				let repair = item[j]
				if (pl != null) {
					if (pl == "AHR" || pl == "STA") {
						repair.price = this.GETrepairprice(repair).rprice
					} else {
						repair.price = this.GETrepairprice(repair).mprice
					}
					repair.pl = pl;
				}
				if (appr != null) {
					repair.appr = appr;
				}
			}
    	}
  	}

	SwapToSummary(summary) {
		if (summary) {
			summary.curIndex = 0;
		}
	}
}
