
import * as gendis from 'https://www.vhpportal.com/repo/modules/vg-tables.js';
import {FINDparentele} from 'https://www.vhpportal.com/repo/tools/vg-displaytools.js';
import {ObjList} from 'https://www.vhpportal.com/repo/tools/vg-lists.js';

export class FlatRateTable{
  	constructor(list,cont){
		this.master = new ObjList(list); //holds 1 book with all levels
		this.cont=cont;
		this.fltrs={}; //holds any on going filters
		this.miscreps={//Misc Repairs
			'CLNCHK-AC':{
				'title':'Condensor C&C',
				'descr':'Condensor Clean and Check',
				'STA':149,
				'AHR':149,
				'CLA':0,
				'PRE':0,
				'ULT':0
			},
			'CLNCHK-FURN':{
				'title':'Furnace C&C',
				'descr':'Furnace Clean and Check',
				'STA':149,
				'AHR':149,
				'CLA':0,
				'PRE':0,
				'ULT':0
			},
			'DIAG':{
				'title':'Diagnostic',
				'descr':'Diagnostic',
				'STA':119,
				'AHR':149,
				'CLA':119,
				'PRE':59.5,
				'ULT':0
			}
		}

		this.SETfilters();
	}

  	SETfilters(){
		document.getElementsByClassName('min-page-menu')[0].appendChild(gendis.SETrowFROMobject({task:'',descr:''},true));
		let filterrow = document.getElementsByClassName('min-page-menu')[0].lastChild;
		filterrow.classList.add('wo-filter-row');
		filterrow.children[0].setAttribute('placeholder','Task ID');
		filterrow.children[1].setAttribute('placeholder','Description');
		filterrow.addEventListener('change',(ele)=>{
			let row = FINDparentele(ele.target,'wo-filter-row');
			this.GETfilters(gendis.GETrowTOobject(row,true));
		});

		this.GETfilters();
  	}
	GETfilters(flts){
		for(let f in flts){
			if(flts[f]!=''){this.fltrs[f]=flts[f];}
			else if(flts[f]=='' && this.fltrs[f]){this.fltrs[f]=undefined;}
		}
		this.SETrepairlist();
	}
	SETrepairlist(){
		gendis.BUILDtruetable(this.master.TRIMlist(this.fltrs,true),this.cont,false,'wo-item-row');
	}

	CREATEmiscinputs(repadd=()=>{}){
		let miscs = document.createElement('div');
		miscs.classList.add('misc-buttons');
		for(let x in this.miscreps){
			let but = document.createElement('div');
			but.classList.add('text-action-button');
			but.innerText = this.miscreps[x].title;
			but.addEventListener('click',(ele)=>{
				repadd.ADDitem(this.GETmiscrepairs(x));
			});
			miscs.appendChild(but);
		}
		return miscs;
	}
	GETmiscrepairs(name){
		let repair={};
		if(this.fltrs.pl){
			repair.task = name;
			repair.descr = this.miscreps[name].descr;
			repair.pl=this.fltrs.pl;
			repair.book=this.fltrs.book;
			repair.price = this.miscreps[name][this.fltrs.pl];
		}
		return repair;
	}
}
