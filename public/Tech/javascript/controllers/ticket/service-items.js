/* Service Item Module
    Responsible for:
    - Adding service items to view
    - linking all service item's info to one
    - linking service item repairs to one fo
*/
import * as gendis from 'https://www.vhpportal.com/repo/modules/vg-tables.js';
import { DropNote } from 'https://www.vhpportal.com/repo/modules/vg-dropnote.js';
import {FINDparentele} from 'https://www.vhpportal.com/repo/tools/vg-displaytools.js';

import {ViewGroup} from 'https://www.vhpportal.com/repo/layouts/view-controller.js';
import {VHCform} from 'https://www.vhpportal.com/repo/tools/vhc-forms.js';

import {siform} from '/Tech/javascript/forms/serviceitem-form.js';
import {SIrepairform} from '/Tech/javascript/forms/servicerepairs-form.js';



//repairs table

export class TicketServiceItems{
  	// Inserts Add and Delete buttons into Items Menu
  	constructor(items,repairs,pricebook){
		//console.log('Service Items',items)
		let cont = document.createElement('div');
		cont.id='si-cont';

		this.view = new ViewGroup({
			cont:cont,
			type:'mlt',
			swtchEve:(cont,view,button)=>{
				cont.getElementsByClassName('currsi')[0].innerText = view.title;
				this.SETcurrtab(view.title);
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
		this.currtab=0;

		//attach price book, want to move
		this.pricebook = pricebook; // FlatRateTable passed from parent

		this.info = [];
		this.repairs = [];

		//No repairs, so default repairs
		if(repairs[0]==undefined||repairs.length===0){
			repairs=[];
		}

		for (let i=0;i<items.length;i++) {//Loop ticket.serviceitems
			if(repairs[i]==undefined){
				repairs.push([]);
			}
			this.ADDserviceitem(items[i], repairs[i], i);
		}

		/*Loop through each repair in saved ticket and add to the appropriate service item.*/
		if (repairs.length > 0) {
			for (let i = 0; i < this.repairs.length; i++) {
				if (repairs[i].length > 0) {
					for (let j = 0; j < repairs[i].length; j++) {
						this.repairs[i].ADDitem(repairs[i][j]);
					}
				}
			}
		}

		this.view.port.addEventListener('click',(ele)=>{this.TOGGLEitemlist(true);});
		this.view.menu.classList.add("service-items-left")
		this.currsi.addEventListener('click',(ele)=>{this.TOGGLEitemlist();});
		$(this.view.buttons.children[0]).click();
		this.SETcurrtab(this.currsi.innerText);//shouldnt need

		//Loop through buttons, set the class list for buttons with repairs
		let kids = this.view.buttons.children
		for (let i = 0; i < kids.length; i ++) {
			if (repairs[i].length > 0) {
				kids[i].classList.add("si-has-repairs")
			}
		}
		
		//Add event listeners for custom/other repairs
		let add_buttons = this.view.cont.getElementsByClassName('si-repair-add');
		for (let i = 0; i < add_buttons.length; i++) {
			this.view.cont.getElementsByClassName('si-repair-add')[i].addEventListener('click',(ele)=>{
				if (this.repairs[this.currtab].form.length > 0) {
					this.view.buttons.children[this.currtab].classList.add("si-has-repairs")
				}
			})
		}
    

		//console.log('First run',this.currtab,this.currsi.innerText);
		this.view.cont.getElementsByClassName('si-delete')[0].addEventListener('click',(ele)=>{DropNote('tr','Service Items Cannot Delete','yellow',false);});
		this.view.cont.getElementsByClassName('si-add')[0].addEventListener('click',(ele)=>{this.TOGGLEaddinput();});
		this.view.cont.getElementsByClassName('si-add-button')[0].addEventListener('click',(ele)=>{
			let name = this.view.cont.getElementsByClassName('si-add-input')[0];
			if (name.value != '') {
				let retval = this.ADDserviceitem({tagid: name.value});
				if (retval) {
					DropNote('tr',`Adding ${name.value}`);
					this.currsi.innerText=name.value;
					this.SETcurrtab(this.currsi.innerText);
					name.value = '';
					this.TOGGLEaddinput();
				} else {
					DropNote('tr',`${name.value} Already Added`,'yellow');
				}
			}
    	});

		//setup flatrate add event
		pricebook.cont.addEventListener('click',(ele)=>{
			let row  = FINDparentele(ele.target,'wo-item-row');
			this.repairs[this.currtab].ADDitem(gendis.GETrowTOobject(row));
			this.view.buttons.children[this.currtab].classList.add("si-has-repairs")
		});
	}

	/*
		Adds a new repair item to the service items
		Returns true if the item doesn't exist, null otherwise
	*/
	ADDserviceitem(item, repairs=[]) {
		//console.log("Item: ", item)
		let sitemview = new ViewGroup({
			type:'mtr',
			qactions:{['.item-header.div']:{value:item.descr}}
		});

		let index = this.info.length;

		//add/init service info form
		this.info.push(new VHCform({
			dom:siform.dom,
			content:siform.content,
			data:JSON.parse(JSON.stringify(item))
		}));
		sitemview.ADDview('Info',this.info[index].cont);
		//console.log(this.repairs)
		//add/init service repairs
		this.repairs.push(new SIrepairform(document.createElement('div'),this.pricebook));
		sitemview.ADDview('Repairs',this.repairs[index].cont);

		this.repairs[index].form=repairs[index];

		let added = this.view.ADDview(item.tagid,sitemview.cont); //add service item to group
		if (added) {
			$(sitemview.buttons.children[0]).click();
		}

		/*Event listener for updating description.*/
		let descr_input = this.info[index].fields.descr;
		descr_input.addEventListener('change',(ele)=>{
			let new_input = descr_input.value;

			//Refresh the title
			//Check for item header, if not, use last child of item headers parent element (fix for new items)
			let headertext = document.getElementsByClassName("item-header")[index]
			if (headertext) {
				headertext.innerText = new_input;
			} else {
				document.getElementsByClassName("viewcontrol-quick-actions")[index].lastChild.innerText = new_input;
			}

			//Call global save function
			window.SAVEticket();
		});

		/*Event listener for updating tag number.*/
		let tag_input = this.info[index].fields.tagid;
		tag_input.addEventListener('change',(ele)=>{
			//Call global save function
			window.SAVEticket();
			let new_input = tag_input.value;
			//Refresh the currsi and menu button
			this.currsi.innerText = new_input;

			//Must update button and view for currsi to refresh
			let button = this.view.FINDbutton(item.tagid);
			if (button) {
				button.title = new_input;
				button.innerText = new_input;
			}

			let view = this.view.FINDview(item.tagid);
			if (view) {
				view.title = new_input;
			}
			item.tagid = new_input;
		});

		return added;
	}
	//remove item

  	//get currtab as index
	SETcurrtab(tagid){
		for(let x=0;x<this.info.length;x++){
			if(this.info[x].form.tagid===tagid){
				this.currtab=x;
				break;
			}
		}
	}

	TOGGLEitemlist(hide=false){
		let box = this.view.buttons;
		let exbuttons = this.view.cont.getElementsByClassName('si-menu-buttons')[0];
		if(box.style.left=='-300px'&&!hide){
			box.style.left='-1px';
			exbuttons.style.left='-1px';
		} else {
		 box.style.left='-300px';
		 exbuttons.style.left='-300px';
		}
	}
	TOGGLEaddinput(){
		let box = this.view.cont.getElementsByClassName('si-add-inputs')[0];
		if(box.style.left == '80px'){
			box.style.left = '-200px';
		} else {
			box.style.left = '80px';
		}
	}
}
