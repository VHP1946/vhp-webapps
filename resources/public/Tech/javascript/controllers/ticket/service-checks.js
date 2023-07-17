import {VHCform} from 'https://www.vhpportal.com/repo/tools/vhc-forms.js';
import { DropNote } from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import {ViewGroup} from 'https://www.vhpportal.com/repo/layouts/view-controller.js';

import { coolingchecks } from '/Tech/javascript/controllers/collateral/checklists/cooling-checklist.js';
import { heatingchecks } from '/Tech/javascript/controllers/collateral/checklists/heating-checklist.js';
import { systemchecks } from '/Tech/javascript/controllers/collateral/checklists/system-checklist.js';
import { summarychecks } from '/Tech/javascript/controllers/collateral/checklists/summary-checklist.js';
import { Calculations } from '/Tech/javascript/checklists/checklist-calculations.js';
import { checklistss } from '/Tech/javascript/checklists/checklist-data.js';

var toggledom = {
	cont: 'checklist-cont',
	info: 'checklist-info',
	cool: 'checklist-cooling',
	heat: 'checklist-heating',
	airflow: 'checklist-airflow',
	access: 'checklist-access',
	indoor: 'checklist-indoor',
	outdoor: 'checklist-outdoor'
}

/*Closes an individual container, using show and hide bools to selectively show or hide.*/
var Clicktoclose=(cont, hide=false, show=false)=>{
	let section_cont = cont.getElementsByClassName('section-cont')[0];
	//Hide the section container
	if (hide && !show) {
		$(cont.getElementsByClassName('section-cont')[0]).hide();
	} else if (show) {
		$(cont.getElementsByClassName('section-cont')[0]).show();
	} else {
		$(cont.getElementsByClassName('section-cont')[0]).toggle();
	}

	//Adjust border-radius of section header
	if (section_cont.style.display == "none") {
		cont.getElementsByClassName('section-header')[0].style.borderBottomLeftRadius = "10px";
		cont.getElementsByClassName('section-header')[0].style.borderBottomRightRadius = "10px";
	} else {
		cont.getElementsByClassName('section-header')[0].style.borderBottomLeftRadius = "0px";
		cont.getElementsByClassName('section-header')[0].style.borderBottomRightRadius = "0px";
	}
}

/*Hides all checklist-cards in a section.*/
var HideAll = (cont, showall) => {
	let section_conts = cont.getElementsByClassName('checklist-card');
	for (let i = 0; i < section_conts.length; i++) {
		Clicktoclose(section_conts[i], true, showall);
	}
}

// First two characters = in / ou / ai / ac
// Next four characters = cool / heat / info

var checklists = {
	doms:{
		system:systemchecks.dom,
		cooling:coolingchecks.dom,
		heating:heatingchecks.dom
	},
	contents:{
		system:systemchecks.content,
		cooling:coolingchecks.content,
		heating:heatingchecks.content
	},
	titles:{
		system:"System Checklist",
		cooling:"Cooling Checklist",
		heating:"Heating Checklist"
	}
}

export class ServiceChecks {
	constructor(checks={}){
		let cont = document.createElement('div');
		cont.id='check-cont';
		this.view = new ViewGroup({
			cont:cont,
			type:'mlt',
			swtchEve:(cont,view,button)=>{
				cont.getElementsByClassName('currsi')[0].innerText = view.title;
				$(cont.getElementsByClassName('currsi')[0]).click();
			},
			qactions:{
				'div':{
					children:{
						'.currsi.div':{
							attributes:{
							class:'flat-action-button'
							},
							children:{},
							value:'-  -'
						},
						'.si-menu-buttons.div':{
							attributes:{},
							children:{
							'.si-delete.div':{
								attributes:{
									class:'icon-action-button'
								},
									children:{
									'.delete-button.img':{
										attributes:{
										src:'https://www.vhpportal.com/repo/assets/icons/trash.png'
										}
									}
								}
							},
							'.si-add.div':{
								attributes:{
									class:'icon-action-button'
								},
								children:{
									'.add-button.img':{
										attributes:{
											src:'https://www.vhpportal.com/repo/assets/icons/add.png'
										}
									}
								}
							},
							'.si-add-inputs.div':{
									attributes:{},
									children:{
										'.si-add-input.input':{
											attributes:{},
											children:{}
										},
										'.si-add-button.div':{
											attributes:{
												class:'icon-action-button'
											},
											children:{
												'.add-button.img':{
													attributes:{
													src:'https://www.vhpportal.com/repo/assets/icons/add.png'
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		});

		this.currsi=this.view.cont.getElementsByClassName('currsi')[0];
		this.currtab=this.currsi.innerText

		this.view.port.addEventListener('click',(ele)=>{this.TOGGLEitemlist(true);});

		this.currsi.addEventListener('change',(ele)=>{
			console.log(this.currsi.innerText, "Inner Text")
		});

		this.info = [];
		this.forms = [];
		/**
		 * Initialize first group - creates default group if no checklists are given to constructor. 
		 */
		if(checks===undefined||Object.keys(checks).length===0 ){
			this.info.push(["System 1", this.ADDgroup('System 1')]);
		} else {
			//Loop through each system
			for (let i = 0; i < checks.length; i++) {
			//On some tickets, checks = [null]
				if (checks[i] == null) {
					this.info.push(["System "+(i+1), this.ADDgroup('System '+(i+1))]);
				} else {
					this.info.push([checks[i].name, this.ADDgroup(checks[i].name,checks[i].checks,checks[i].included,checks[i].score, checks[i].scored)]);
				}
			}
		}

		this.currsi.innerText = this.info[this.info.length - 1][0]; //Set tab title to last system
		this.TOGGLEitemlist();
		$(this.view.buttons.children[0]).click();
		
		/**
		 * Menu quick action to open input box
		 */
		this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{
			this.TOGGLEaddinput();
		});
		
		/**
		 * On clicking the + button, add a new system and toggle to it
		 */
		this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
			let name = this.view.cont.getElementsByClassName('si-add-input')[0];
			if (name.value != '') {
				let retval = this.ADDgroup(name.value);
				if (retval == false) {
					DropNote('tr',`${name.value} Already Added`,'yellow');
				} else {
					DropNote('tr',`Adding ${name.value}`);
					this.info.push([name.value, retval]);
				}
				this.currsi.innerText = name.value;
				name.value = '';
				this.TOGGLEaddinput();
			}
		});

		this.CREATEcltoggle()

		this.currsi.addEventListener('click',(ele)=>{
			if (this.currsi.innerText != this.currtab) {
				console.log("Tab has changed from ", this.currtab, " to ", this.currsi.innerText)
				this.currtab = this.currsi.innerText
				for (let i = 0; i < this.forms.length; i++) {
					if (this.forms[i].name == this.currtab) {
						if (this.forms[i].scored == true) {
							this.enhancedToggle.checked = true
							this.HIDEall()
							this.SHOWenhanced()
						} else {
							this.enhancedToggle.checked = false
							this.SHOWall()
						}
						//@todo add hide all/show cl
					}
				}
			}
			this.TOGGLEitemlist();
		});

		//Loop through this.forms to determine whether to check the box
		/*for (let i = 0; i < this.forms.length; i++){
			if (this.forms[i].scored == true) {
				this.enhancedToggle.checked = true
				break;
			}
		}*/

		this.TOGGLEitemlist() //Use this to prevent the menu fom showing by default
	}

	/**
	 * Grab anything with a tag 'enhanced-cl-item' and show it
	 */
	SHOWenhanced() {
		let checklistItems = document.getElementsByClassName('enhanced-cl-item')
		for (let i = 0; i < checklistItems.length; i++) {
			checklistItems[i].style.display = 'grid'
		}
	}

	/**
	 * Hide the enhanced checklist items
	 */
	HIDEenhanced() {
		let checklistItems = document.getElementsByClassName('enhanced-cl-item')
		for (let i = 0; i < checklistItems.length; i++) {
			checklistItems[i].style.display = 'none'
		}
	}

	/**
	 * Grab anything with a tag 'checklist-item' and show it
	 */
	SHOWall() {
		let checklistItems = document.getElementsByClassName('checklist-item')
		for (let i = 0; i < checklistItems.length; i++) {
			checklistItems[i].style.display = 'grid'
		}
	}

	/**
	 * Grab anything with a tag 'checklist-item' and show it
	 */
	HIDEall() {
		let checklistItems = document.getElementsByClassName('checklist-item')
		for (let i = 0; i < checklistItems.length; i++) {
			checklistItems[i].style.display = 'none'
		}
	}

	/**
	 * Creates the toggle for the enhanced checklist
	 */
	CREATEcltoggle() {
		//Create and append the enhanced toggle and label to the container
		let container = document.getElementsByClassName('check-cont')
		this.enhancedToggle = document.createElement('input')
		this.enhancedToggle.type = 'checkbox'
		this.enhancedToggle.className = 'enhanced-toggle-button'
		this.enhancedLabel = document.createElement('div')
		this.enhancedLabel.innerText = "Perform Enhanced Cooling Visit"
		this.enhancedLabel.className = 'action-button-test-button'
		this.enhancedToggle.addEventListener('click', ()=>{
			console.log(this.currtab)
			console.log(this.currsi.innerText)
			if (this.enhancedToggle.checked == true) {
				this.HIDEall()
				this.SHOWenhanced()
				for (let i = 0; i < this.forms.length; i++){
					if (this.forms[i].name == this.currsi.innerText) {
						this.forms[i].scored = true
						break;
					}
				}
			} else {
				this.SHOWall()
				for (let i = 0; i < this.forms.length; i++){
					//console.log("Setting ", this.forms[i], "to NULL")
					if (this.forms[i].name == this.currsi.innerText) {
						this.forms[i].scored = false
						break;
					}
					//console.log("SET ", this.forms[i], "to NULL")
				}
			}
		})
		if (this.forms[0].scored == true) {
			this.enhancedToggle.checked = true
		} else {
			this.enhancedToggle.checked = false
		}
		this.view.cont.append(this.enhancedToggle)
		this.view.cont.append(this.enhancedLabel)
	}

	/**
	 * Organizes the summary by pulling data from the form and setting window.summary
	 */
	ORGANIZEsummary(){
		let total_summary = []
		//Loop through each system to create the summary objects
		for (let i = 0; i < this.info.length; i++) {
			//Set up the total summary object
			total_summary.push({});
			total_summary[i].name = this.info[i][0];
			let sumchecks = summarychecks;
			total_summary[i].summary = {
				dom: sumchecks.dom,
				content: {},
				name: this.info[i][0]
			}

			//Loop through each input item
			for (let input in total_summary[i].summary.dom.info) {
			//Find appropriate input item
				let key = total_summary[i].summary.dom.info[input];
				let docvalue = this.info[i][1].cont.getElementsByClassName(key)[0];

				if (docvalue) {
					//Ignore blank text for now
					if (docvalue.value != "" && docvalue.value != key) {
						//Update the current value in total_summary[i] based on input type
						if (docvalue.tagName == 'SELECT') {
							total_summary[i].summary.content[key] = docvalue[docvalue.selectedIndex].value;
						} else if (docvalue.value == "on") {
							if (docvalue.checked == true) {
								total_summary[i].summary.content[key] = "Yes";
							} else {
								total_summary[i].summary.content[key] = "No";
							}
						} else {
							total_summary[i].summary.content[key] = docvalue.value;
						}
					} else {
						total_summary[i].summary.content[key] = " "
					}
				}
			}
		}

		window.summary = total_summary
		//console.log("SUMMARY::::::", total_summary)
	}

	/**
	 * Creates a new checklist group.
	 * @param {String} name | the name of the system
	 * @param {Object} group | the {cooling, system, heating} data for the object
	 * @param {Object} included | the included data for the enhanced checklist
	 * @returns the system view or false if the system already exists
	 */
	ADDgroup(name,group={system:null,cooling:null,heating:null},included,oldScore = {}, scored=false){
		let cview = new ViewGroup({
			cont:document.createElement('div'),
			type:'mtr',
			qactions:{['.item-header.div']:{value:"Text to push buttons over"}}
		});
		cview.cont.classList.add('checklists-menu');
		if(this.view.ADDview(name,cview.cont,false)){
			//console.log('System not already added.')
			if (this.forms == undefined) {
				this.forms = [];
			}

			//Push dictionary with desired structure to this.forms
			this.forms.push({
				name: name,
				checks: {},
				included:{},
				scored:scored,
				score:oldScore
			})
			if (included) {
				this.forms[this.forms.length - 1].included = included
			} else {
				for (let key in checklistss) {
					this.forms[this.forms.length - 1].included[key] = JSON.parse(JSON.stringify(checklistss[key]))
				}
			}
			
			for (let c in group) {
				this.forms[this.forms.length - 1].checks[c] = (new VHCform({
					cont:document.createElement('div'),
					dom:checklists.doms[c],
					content:checklists.contents[c]
				}));

				//Load existing data when not creating a new system
				if (group[c] != null) {
					this.forms[this.forms.length - 1].checks[c].data = group[c];
				}
				//I don't know if this is necessary but it was in the checklist form
				this.forms[this.forms.length - 1].checks[c].include = true;
				this.forms[this.forms.length - 1].checks[c].valids = checklists.doms[c].valids || {}; //describe any input validation rules
				let nview = cview.ADDview(checklists.titles[c],this.forms[this.forms.length - 1].checks[c].cont);
				this.forms[this.forms.length - 1].checks[c].form=group[c];
			}

			/*CALCULATION Checklist Items*/
			let ratedcfm_input = this.forms[this.forms.length-1].checks.system.fields.in_airf_ratedcfm;
			let cfm_input = this.forms[this.forms.length-1].checks.system.fields.in_airf_actualcfm;
			let scoredcfm = this.forms[this.forms.length-1].checks.system.fields.in_airf_scoredcfm;
			let coolactcap = this.forms[this.forms.length-1].checks.system.fields.ou_info_coolactualcap; //MUST BE OUTSIDE or inputs won't set properly
			let heatactcap = this.forms[this.forms.length-1].checks.system.fields.in_info_heatactualcap;
			let drybulbe = this.forms[this.forms.length-1].checks.cooling.fields.in_cool_dbentering;
			let wetbulbe = this.forms[this.forms.length-1].checks.cooling.fields.in_cool_wbentering;
			let drybulbl = this.forms[this.forms.length-1].checks.cooling.fields.in_cool_dbleaving;
			let wetbulbl = this.forms[this.forms.length-1].checks.cooling.fields.in_cool_wbleaving;
			let tempdrop = this.forms[this.forms.length-1].checks.cooling.fields.in_cool_tempdrop;
			let ratedcap = this.forms[this.forms.length-1].checks.system.fields.ou_info_coolratedcap;
			let lostcap = this.forms[this.forms.length-1].checks.system.fields.ou_info_lostcapacity;

			let supplystatic = this.forms[this.forms.length-1].checks.system.fields.ou_airf_supplystatic
			let returnstatic = this.forms[this.forms.length-1].checks.system.fields.in_airf_returnstatic
			let staticpressure = this.forms[this.forms.length-1].checks.system.fields.in_airf_staticpressure

			let blowerrated = this.forms[this.forms.length-1].checks.system.fields.in_airf_blowerrated
			let bloweractual = this.forms[this.forms.length-1].checks.system.fields.in_airf_bloweractual
			let blowerops = this.forms[this.forms.length-1].checks.system.fields.in_airf_bloweroperation

			let compressorrated = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_ratedamps
			let compressoractual = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualamps
			let compressorops = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_operationalamps

			let coolratedcap = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_ratedcapacitor
			let coolactualcap = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualcapacitor
			let coolcapop = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_capop;

			let targetsh = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_targetsh
			let actualsh =this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualsh
			let regrigopsh = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_refrigopsh

			let targetsc = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_targetsc
			let actualsc =this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualsc
			let regrigopsc = this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_refrigopsc

			let ambtemp = this.forms[this.forms.length-1].checks.system.fields.ou_info_temp;
			let calcs = {
				RatedCFM:this.forms[this.forms.length-1].checks.system.fields.in_airf_ratedcfm,
				ActualCFM:this.forms[this.forms.length-1].checks.system.fields.in_airf_actualcfm,
				ScoredCFM:this.forms[this.forms.length-1].checks.system.fields.in_airf_scoredcfm,
				CoolingActualCapacity:this.forms[this.forms.length-1].checks.system.fields.ou_info_coolactualcap,
				CoolingRatedCapacity:this.forms[this.forms.length-1].checks.system.fields.ou_info_coolratedcap,
				HeatingActualCapacity:this.forms[this.forms.length-1].checks.system.fields.in_info_heatactualcap,
				DryBulbEntering:this.forms[this.forms.length-1].checks.cooling.fields.in_cool_dbentering,
				DryBulbLeaving:this.forms[this.forms.length-1].checks.cooling.fields.in_cool_dbleaving,
				WetBulbEntering:this.forms[this.forms.length-1].checks.cooling.fields.in_cool_wbentering,
				WetBulbLeaving:this.forms[this.forms.length-1].checks.cooling.fields.in_cool_wbleaving,
				TemperatureDrop:this.forms[this.forms.length-1].checks.cooling.fields.in_cool_tempdrop,
				LostCapacity:this.forms[this.forms.length-1].checks.system.fields.ou_info_lostcapacity,
				SupplyStatic:this.forms[this.forms.length-1].checks.system.fields.ou_airf_supplystatic,
				ReturnStatic:this.forms[this.forms.length-1].checks.system.fields.in_airf_returnstatic,
				StaticPressure:this.forms[this.forms.length-1].checks.system.fields.in_airf_staticpressure,
				BlowerRated:this.forms[this.forms.length-1].checks.system.fields.in_airf_blowerrated,
				BlowerActual:this.forms[this.forms.length-1].checks.system.fields.in_airf_bloweractual,
				BlowerOperation:this.forms[this.forms.length-1].checks.system.fields.in_airf_bloweroperation,
				RatedCompressor:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_ratedamps,
				ActualCompressor:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualamps,
				CompressorOperation:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_operationalamps,
				RatedCapacitor:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_ratedcapacitor,
				ActualCapacitor:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualcapacitor,
				CapacitorOperation:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_capop,
				TargetSuperheat:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_targetsh,
				ActualSuperheat:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualsh,
				SuperheatRefrigerantOperation:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_refrigopsh,
				TargetSubcool:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_targetsc,
				ActualSubcool:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_actualsc,
				SubcoolRefrigerantOperation:this.forms[this.forms.length-1].checks.cooling.fields.ou_cool_refrigopsc,
				AmbientTemperature:this.forms[this.forms.length-1].checks.system.fields.ou_info_temp
			}
			let args = [
				ratedcfm_input,
				cfm_input,
				drybulbe,
				drybulbl,
				wetbulbe,
				wetbulbl,
				ambtemp,
				ratedcap,
				returnstatic,
				supplystatic,
				blowerrated,
				bloweractual,
				compressorrated,
				compressoractual,
				/*coolratedcap,
				coolactualcap,*/
				targetsh,
				actualsh,
				targetsc,
				actualsc,

				scoredcfm,
				heatactcap, 
				coolactcap, 
				tempdrop, 
				lostcap,
				staticpressure,
				blowerops,
				compressorops,
				/*coolcapop*/
				regrigopsh,
				regrigopsc
			]

			/**
			 * Event listeners for every checklist item that has a calculation
			 */
			calcs.DryBulbEntering.addEventListener('change', (ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.DryBulbLeaving.addEventListener('change', (ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.WetBulbEntering.addEventListener('change', (ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.WetBulbLeaving.addEventListener('change', (ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.ActualCFM.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.RatedCFM.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.AmbientTemperature.addEventListener('change',(ele)=>{
				/*if (ambtemp.value < 80) {
					//Set the value then set the innerHTML
					ambtemp.value = 'Below Testable Temperature';
					ambtemp.innerHTML = "Value = " + "'" + ambtemp.value + "'";
				} else {
					this.RUNcalculations(...args);
				}
				this.CHECKformfill(args)*/
				this.RUNcalculations(calcs)
			})
			calcs.CoolingRatedCapacity.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.ReturnStatic.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.SupplyStatic.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.BlowerRated.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.BlowerActual.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.RatedCompressor.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.ActualCompressor.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.CoolingActualCapacity.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			/*coolratedcap.addEventListener('change',(ele)=>{
				this.RUNcalculations(...args)
				this.CHECKformfill(args)
			})
			coolactualcap.addEventListener('change',(ele)=>{
				this.RUNcalculations(...args)
				this.CHECKformfill(args)
			})*/
			calcs.TargetSuperheat.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.ActualSuperheat.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.TargetSubcool.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})
			calcs.ActualSubcool.addEventListener('change',(ele)=>{
				this.RUNcalculations(calcs)
			})

			let checklistcards = cview.cont.getElementsByClassName('checklist-card');
			for (let i = 0; i<checklistcards.length; i++) {
				let header = checklistcards[i].firstElementChild;
				header.addEventListener('click', (eve)=>{
					Clicktoclose(checklistcards[i]);
				})
			}

			/*Hide all functionality for main section headers */
			let checklistsections = cview.cont.getElementsByClassName('checklist-section');
			for (let i = 0; i<checklistsections.length; i++) {
				let mainheader = checklistsections[i].firstElementChild;
					mainheader.addEventListener('click', (eve)=>{
					if (mainheader.id == "shown") {
						HideAll(checklistsections[i], true);
						mainheader.id = "hidden"
					} else {
						HideAll(checklistsections[i], false);
						mainheader.id = "shown";
					}
				})
				mainheader.click() //Initially click to close all headers on startup
			}
			//Tag the items
			this.TAGitems("enhanced-cl-item", checklistss.enhanced.included)
			return cview;
		} else {
			return false
		}
	}
	//REMOVEgroup(){}

	VALIDATEcalculations(calcs) {
		let retval = {
			CoolingBTU:false,
			ScoreCFM:false,
			HeatingBTU:false,
			TempDrop:false,
			LostCapacity:false,
			SystemStatPressure:false,
			BlowerOperation:false,
			CompressorOperation:false,
			RefrigOperationSH:false,
			RefrigOperationSC:false,
		}
		if (calcs.ActualCFM.value !== "" 
		&& calcs.DryBulbEntering.value !== "" 
		&& calcs.DryBulbLeaving.value !== "" 
		&& calcs.WetBulbEntering !== "" 
		&& calcs.WetBulbLeaving !== "" 
		&& calcs.AmbientTemperature.value !== "") {
			if (calcs.AmbientTemperature.value < 80) {
				DropNote('tr',`Below Testable Temperature of 80°`,'green',true);
			} else {
				retval.CoolingBTU = true
			}
		}
		if(calcs.RatedCFM.value !== "" && calcs.ActualCFM.value !== ""){
			retval.ScoreCFM = true
		}
		if (calcs.DryBulbEntering.value !== "" 
		&& calcs.DryBulbLeaving.value !== "" 
		&& calcs.ActualCFM.value !== "" 
		&& calcs.WetBulbEntering !== "") {
			retval.HeatingBTU = true
		}
		if (calcs.DryBulbEntering.value !== "" && calcs.DryBulbLeaving.value !== "") {
			retval.TempDrop = true
		}
		if (calcs.CoolingRatedCapacity.value !== "" && calcs.CoolingActualCapacity.value !== "") {
			retval.LostCapacity = true
		}
		if (calcs.ReturnStatic.value !== "" && calcs.SupplyStatic.value !== "") {
			retval.SystemStatPressure = true
		}
		if (calcs.BlowerActual.value !== "" && calcs.BlowerRated.value !== "") {
			retval.BlowerOperation = true
		}
		if (calcs.RatedCompressor.value !== "" && calcs.ActualCompressor.value !== "") {
			retval.CompressorOperation = true
		}
		if (calcs.ActualSuperheat.value !== "" && calcs.TargetSuperheat.value !== "") {
			retval.RefrigOperationSH = true
		}
		if (calcs.ActualSubcool.value !== "" && calcs.TargetSubcool.value !== "") {
			retval.RefrigOperationSC = true
		}
		return retval
	}

	RUNcalculations(calcs) {
		let validations = this.VALIDATEcalculations(calcs)
		let cool_retval = {value:null}
		if (validations.CoolingBTU == true) {
			cool_retval = Calculations.CoolingBTU(
				Number(calcs.ActualCFM.value), 
				Number(calcs.DryBulbEntering.value), 
				Number(calcs.DryBulbLeaving.value), 
				Number(calcs.WetBulbEntering.value), 
				Number(calcs.WetBulbLeaving.value), 
				Number(calcs.AmbientTemperature.value)
			);
			//console.log(cool_retval)
			if (cool_retval.err != null) {
				DropNote('tr',`${cool_retval.err}`,'red',false);
			}
		}

		let scoredcfm_retval = {value:null};
		if (validations.ScoreCFM == true) {
			scoredcfm_retval = Calculations.ScoreCFM(
				calcs.RatedCFM.value,
				Number(calcs.ActualCFM.value)
			);
			//console.log('SCORED CFM',scoredcfm_retval)
			if(scoredcfm_retval.err != null){
				DropNote('tr',`${scoredcfm_retval.err}`)
			}
		}
		if(validations.ScoreCFM && scoredcfm_retval.value !== ''){calcs.ScoredCFM.innerText = scoredcfm_retval.value;}

		//Check for a temperature
		let heat_retval = {value:null}
		if (validations.HeatingBTU == true) {
			heat_retval = Calculations.HeatingBTU(
				Number(calcs.ActualCFM.value), 
				Number(calcs.DryBulbEntering.value), 
				Number(calcs.DryBulbLeaving.value),
				Number(calcs.WetBulbEntering.value)
			);
			//console.log(heat_retval)
			if (heat_retval.err != null) {
				DropNote('tr',`${heat_retval.err}`,'red',false);
			}
		}
		let tempdrop_retval = {value:null}
		if (validations.TempDrop == true) {
			tempdrop_retval = Calculations.TempDrop(
				Number(calcs.DryBulbEntering.value),
				Number(calcs.DryBulbLeaving.value)
			);
			console.log(tempdrop_retval, "TEMP DROP")
			if (tempdrop_retval.err != null) {
				DropNote('tr',`${tempdrop_retval.err}`,'red',false);
			}
		}

		if (validations.CoolingBTU && cool_retval.value != "NaN") {calcs.CoolingActualCapacity.innerText = cool_retval.value}; //put here so that lost capacity can use the value
		
		let lostcapacity_retval = {value:null}
		if (validations.LostCapacity == true && calcs.CoolingActualCapacity.innerText != "") { //I don't like this
			lostcapacity_retval = Calculations.LostCapacity(
				Number(calcs.CoolingRatedCapacity.value), 
				Number(calcs.CoolingActualCapacity.innerText)
			)
			//console.log(lostcapacity_retval)
			if (lostcapacity_retval.err != null) {
				DropNote('tr',`${lostcapacity_retval.err}`,'red',false);
			}
		}
		let systemstaticpressure_retval = {value:null}
		if (validations.SystemStatPressure == true) {
			systemstaticpressure_retval = Calculations.SystemStatPressure(
				Number(calcs.ReturnStatic.value), 
				Number(calcs.SupplyStatic.value)
			)
			//console.log(systemstaticpressure_retval)
			if (systemstaticpressure_retval.err != null) {
				DropNote('tr',`${systemstaticpressure_retval.err}`,'red',false);
			}
		}
		let blowerops_retval = {value:null}
		if (validations.BlowerOperation == true) {
			blowerops_retval = Calculations.BlowerOperation(
				Number(calcs.BlowerRated.value), 
				Number(calcs.BlowerActual.value)
			)
			//console.log(blowerops_retval)
			if (blowerops_retval.err != null) {
				DropNote('tr',`${blowerops_retval.err}`,'red',false);
			}
		}
		let compressorops_retval = {value:null}
		if (validations.CompressorOperation == true) {
			compressorops_retval = Calculations.CompressorOperation(
				Number(calcs.RatedCompressor.value), 
				Number(calcs.ActualCompressor.value)
			)
			if (compressorops_retval.err != null) {
				DropNote('tr',`${compressorops_retval.err}`,'red',false);
			}
		}
		//console.log(compressorops_retval, "COMPRESSOR OPS")
		let coolcapop_retval = {value:null}
		/*if (coolratedcap_val != "" && coolactualcap_val != "") {
			coolcapop_retval = Calculations.CapacitorOperation(coolratedcap_val, coolactualcap_val)
			if (coolcapop_retval.err != null) {
				DropNote('tr',`${coolcapop_retval.err}`,'red',false);
			}
		}*/

		let refrigopsh_retval = {value:null}
		//console.log(targetsh_val, actualsh_val, "SUPERHEATING VALUES")
		if (validations.RefrigOperationSH == true) {
			refrigopsh_retval = Calculations.RefrigOperation(
				Number(calcs.TargetSuperheat.value), 
				Number(calcs.ActualSuperheat.value)
			)
			if (refrigopsh_retval.err != null) {
				DropNote('tr',`${refrigopsh_retval.err}`,'red',false);
			}
		}

		let refrigopsc_retval = {value:null}
		//console.log(targetsc_val.value, actualsc_val.value, "SUBCOOLING VALUES")
		if (validations.RefrigOperationSC) {
			refrigopsc_retval = Calculations.RefrigOperation(
				Number(calcs.TargetSubcool.value), 
				Number(calcs.ActualSubcool.value)
			)
			//console.log(refrigopsc_retval)
			if (refrigopsc_retval.err != null) {
				DropNote('tr',`${refrigopsc_retval.err}`,'red',false);
			}
		}

		//Assign BTU values
		if (heat_retval.value != "NaN") {calcs.HeatingActualCapacity.innerText = heat_retval.value};
		if (tempdrop_retval.value != "NaN") {calcs.TemperatureDrop.innerText = tempdrop_retval.value};
		if (lostcapacity_retval.value != "NaN") {calcs.LostCapacity.innerText = lostcapacity_retval.value}
		if (systemstaticpressure_retval.value != "NaN") {calcs.StaticPressure.innerText = systemstaticpressure_retval.value}
		if (blowerops_retval.value != "NaN") {calcs.BlowerOperation.innerText = blowerops_retval.value}
		if (compressorops_retval.value != "NaN") {calcs.CompressorOperation.innerText = compressorops_retval.value}
		//if (coolcapop && coolcapop_retval.value != "NaN") {coolcapop.innerText = coolcapop_retval.value}
		if (refrigopsh_retval.value != "NaN") {calcs.SuperheatRefrigerantOperation.innerText = refrigopsh_retval.value}
		if (refrigopsc_retval.value != "NaN") {calcs.SubcoolRefrigerantOperation.innerText = refrigopsc_retval.value}

		this.CHECKformfill(calcs)
	}

	//Take a shot for every argument
	/**
	 * Runs through every calculation and modifies the inputs.
	 */
	RUNcalculationsOLD(
		ratedcfm_val,
		cfm_val, 
		drybulbe_val, 
		drybulbl_val, 
		wetbulbe_val, 
		wetbulbl_val, 
		ambtemp_val, 
		ratedcap_val,
		returnstatic_val,
		supplystatic_val,
		blowerrated_val,
		bloweractual_val,
		compressorrated_val,
		compressoractual_val,
		/*coolratedcap_val,
		coolactualcap_val,*/
		targetsh_val,
		actualsh_val,
		targetsc_val,
		actualsc_val,

		scoredcfm,
		heatactcap, 
		coolactcap, 
		tempdrop,
		lostcap,
		staticpressure,
		blowerops,
		compressorops,
		/*coolcapop*/
		refrigopsh,
		refrigopsc
	){
		console.log(targetsh_val)
		//We have to assign the variables to match their values
		ratedcfm_val = ratedcfm_val.value;
		cfm_val = Number(cfm_val.value)
		drybulbe_val = Number(drybulbe_val.value)
		drybulbl_val = Number(drybulbl_val.value)
		wetbulbe_val = Number(wetbulbe_val.value) 
		wetbulbl_val = Number(wetbulbl_val.value)
		ambtemp_val = Number(ambtemp_val.value)
		ratedcap_val = Number(ratedcap_val.value)
		/*coolratedcap_val = Number(coolratedcap_val.value)
		coolactualcap_val = Number(coolactualcap_val.value)*/
		//targetsh_val = Number(targetsh_val.value)
		//actualsh_val = Number(actualsh_val.value)
		//targetsc_val = Number(targetsc_val.value)
		//actualsc_val = Number(actualsc_val.value)
		console.log(targetsh_val)
		//Calculate BTU values
		let cool_retval = {value:null}
		if (cfm_val != "" && drybulbe_val != "" && drybulbl_val != "" && wetbulbe_val != "" && wetbulbl_val != "" && (ambtemp_val != "" && !isNaN(ambtemp_val))) {
			cool_retval = Calculations.CoolingBTU(cfm_val, drybulbe_val, drybulbl_val, wetbulbe_val, wetbulbl_val, ambtemp_val);
			//console.log(cool_retval)
			if (cool_retval.err != null) {
				DropNote('tr',`${cool_retval.err}`,'red',false);
			}
		}

		let scoredcfm_retval = {value:null};
		if(cfm_val != "" && ratedcfm_val != ""){
			scoredcfm_retval = Calculations.ScoreCFM(ratedcfm_val,cfm_val);
			//console.log('SCORED CFM',scoredcfm_retval)
			if(scoredcfm_retval.err != null){
				DropNote('tr',`${scoredcfm_retval.err}`)
			}
		}
		if(scoredcfm && scoredcfm_retval.value != ''){scoredcfm.innerText = scoredcfm_retval.value;}

		//Check for a temperature
		let heat_retval = {value:null}
		if (drybulbe_val != "" && drybulbl_val != "" && cfm_val != "" && wetbulbe_val != "") {
			heat_retval = Calculations.HeatingBTU(cfm_val, drybulbe_val, drybulbl_val,wetbulbe_val);
			//console.log(heat_retval)
			if (heat_retval.err != null) {
				DropNote('tr',`${heat_retval.err}`,'red',false);
			}
		}
		let tempdrop_retval = {value:null}
		if (drybulbe_val != "" && drybulbl_val != "") {
			tempdrop_retval = Calculations.TempDrop(drybulbe_val, drybulbl_val);
			//console.log(tempdrop_retval)
			if (tempdrop_retval.err != null) {
				DropNote('tr',`${tempdrop_retval.err}`,'red',false);
			}
		}

		if (coolactcap && cool_retval.value != "NaN") {coolactcap.innerText = cool_retval.value}; //put here so that lost capacity can use the value
		
		let lostcapacity_retval = {value:null}
		if (ratedcap_val != "" && coolactcap.innerText != "") {
			lostcapacity_retval = Calculations.LostCapacity(ratedcap_val, Number(coolactcap.innerText))
			//console.log(lostcapacity_retval)
			if (lostcapacity_retval.err != null) {
				DropNote('tr',`${lostcapacity_retval.err}`,'red',false);
			}
		}
		let systemstaticpressure_retval = {value:null}
		if (returnstatic_val.value !== "" && supplystatic_val.value !== "") {
			returnstatic_val = Number(returnstatic_val.value)
			supplystatic_val = Number(supplystatic_val.value)
			systemstaticpressure_retval = Calculations.SystemStatPressure(returnstatic_val, supplystatic_val)
			//console.log(systemstaticpressure_retval)
			if (systemstaticpressure_retval.err != null) {
				DropNote('tr',`${systemstaticpressure_retval.err}`,'red',false);
			}
		}
		let blowerops_retval = {value:null}
		if (bloweractual_val.value !== "" && blowerrated_val.value !== "") {
			blowerrated_val = Number(blowerrated_val.value)
			bloweractual_val = Number(bloweractual_val.value)
			blowerops_retval = Calculations.BlowerOperation(blowerrated_val, bloweractual_val)
			//console.log(blowerops_retval)
			if (blowerops_retval.err != null) {
				DropNote('tr',`${blowerops_retval.err}`,'red',false);
			}
		}
		let compressorops_retval = {value:null}
		if (compressorrated_val.value !== "" && compressoractual_val.value !== "") {
			compressorrated_val = Number(compressorrated_val.value)
			compressoractual_val = Number(compressoractual_val.value)
			compressorops_retval = Calculations.CompressorOperation(compressorrated_val, compressoractual_val)
			if (compressorops_retval.err != null) {
				DropNote('tr',`${compressorops_retval.err}`,'red',false);
			}
		}
		//console.log(compressorops_retval, "COMPRESSOR OPS")
		let coolcapop_retval = {value:null}
		/*if (coolratedcap_val != "" && coolactualcap_val != "") {
			coolcapop_retval = Calculations.CapacitorOperation(coolratedcap_val, coolactualcap_val)
			if (coolcapop_retval.err != null) {
				DropNote('tr',`${coolcapop_retval.err}`,'red',false);
			}
		}*/

		let refrigopsh_retval = {value:null}
		//console.log(targetsh_val, actualsh_val, "SUPERHEATING VALUES")
		if (targetsh_val.value !== "" && actualsh_val.value !== "") {
			targetsh_val = Number(targetsh_val.value)
			actualsh_val = Number(actualsh_val.value)
			refrigopsh_retval = Calculations.RefrigOperation(targetsh_val, actualsh_val)
			if (refrigopsh_retval.err != null) {
				DropNote('tr',`${refrigopsh_retval.err}`,'red',false);
			}
		}

		let refrigopsc_retval = {value:null}
		//console.log(targetsc_val.value, actualsc_val.value, "SUBCOOLING VALUES")
		if (targetsc_val.value !== "" && actualsc_val.value !== "") {
			targetsc_val = Number(targetsc_val.value)
			actualsc_val = Number(actualsc_val.value)
			refrigopsc_retval = Calculations.RefrigOperation(targetsc_val, actualsc_val)
			//console.log(refrigopsc_retval)
			if (refrigopsc_retval.err != null) {
				DropNote('tr',`${refrigopsc_retval.err}`,'red',false);
			}
		}

		//Assign BTU values
		if (heatactcap && heat_retval.value != "NaN") {heatactcap.innerText = heat_retval.value};
		if (tempdrop && tempdrop_retval.value != "NaN") {tempdrop.innerText = tempdrop_retval.value};
		if (lostcap && lostcapacity_retval.value != "NaN") {lostcap.innerText = lostcapacity_retval.value}
		if (staticpressure && systemstaticpressure_retval.value != "NaN") {staticpressure.innerText = systemstaticpressure_retval.value}
		if (blowerops && blowerops_retval.value != "NaN") {blowerops.innerText = blowerops_retval.value}
		if (compressorops && compressorops_retval.value != "NaN") {compressorops.innerText = compressorops_retval.value}
		//if (coolcapop && coolcapop_retval.value != "NaN") {coolcapop.innerText = coolcapop_retval.value}
		if (refrigopsh && refrigopsh_retval.value != "NaN") {refrigopsh.innerText = refrigopsh_retval.value}
		if (refrigopsc && refrigopsc_retval.value != "NaN") {refrigopsc.innerText = refrigopsc_retval.value}
	}

	/**
	 * Toggles the system menu list
	 * @param {Boolean} hide | to hide, defaults false
	 */
	TOGGLEitemlist(hide=false){
		let box = this.view.buttons;
		let exbuttons = this.view.cont.getElementsByClassName('si-menu-buttons')[0];
		if (box.style.left=='-300px'&&!hide) {
			box.style.left='-1px';
			exbuttons.style.left='-1px';
		} else {
			box.style.left='-300px';
			exbuttons.style.left='-300px';
		}
	}

	/**
	 * Loops through args and gives them a form-item-empty class if their value is empty
	 * @param {Array} args | array of HTML inputs
	 */
	CHECKformfill(calcs) {
		for (let key in calcs) {
			if (calcs[key].value == "") {
				calcs[key].classList.add("form-item-empty")
			} else {
				calcs[key].classList.remove("form-item-empty")
			}
		}
	}

	/*
		Change visibity of input box
	*/
	TOGGLEaddinput(){
		let box = this.view.cont.getElementsByClassName('si-add-inputs')[0];
		if (box.style.left == '80px') {
			box.style.left = '-200px';
			box.style.zIndex = "-1";
		} else {
			box.style.left = '80px';
			box.style.zIndex = "2";
		}
	}

	/**
	 * Loops through all checklist-items and tags with the provided cl title.
	 * @param {String} cltitle | class you wish to tag the items with
	 */
	TAGitems(cltitle, data) {
		//Loop through fields in enhanced and show only enhanced
		for (let i = 0; i < data.length; i++) {
			let title = data[i]
			for (let j = 0; j < this.forms.length; j++) {
				for (let key in this.forms[j].checks) { 
					if (this.forms[j].checks[key].fields[title] != undefined) {
						this.forms[j].checks[key].fields[title].parentNode.classList.add(cltitle)
					}
				}
			}
		}
	}
}
