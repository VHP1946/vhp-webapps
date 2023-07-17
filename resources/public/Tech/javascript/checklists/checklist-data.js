//service checks


let  checklistss = {
    enhanced:{
        name:'enhanced',
        title:'Enhanced Clean and Check',
        desc:'',
        included:[
            'in_info_indes',
            'ou_info_coolage',

            'ou_info_coolratedcap',
            'ou_info_coolactualcap',
            'ou_info_lostcapacity',

            'in_cool_wbentering',
            'in_cool_wbleaving',
            'in_cool_dbentering',
            'in_cool_dbleaving',
            'in_cool_tempdrop',
            'ou_info_temp',

            'ou_cool_suctemp',
            'ou_cool_sucpress',

            'in_cool_drainclear',

            'ou_cool_headtemp',
            'ou_cool_headpress',

            'ou_cool_targetsh',
            'ou_cool_actualsh',
            'ou_cool_refrigopsh',
            
            'ou_cool_targetsc',
            'ou_cool_actualsc',
            'ou_cool_refrigopsc',

            'ou_cool_ratedamps',
            'ou_cool_actualamps',
            'ou_cool_operationalamps',
            
            'ou_cool_condfan',


            'ou_cool_condcoil',
            'ou_cool_elecout',

            'ou_cool_ratedcapacitor',
            'ou_cool_actualcapacitor',
            'ou_cool_capop',

            'ou_cool_contop',
            
            'in_airf_blowerrated',
            'in_airf_bloweractual',
            'in_airf_bloweroperation',
            
            'in_airf_motortype',

            'in_airf_ratedcfm',
            'in_airf_actualcfm',
            'in_airf_scoredcfm',

            'ou_airf_supplystatic',
            'in_airf_returnstatic',
            'in_airf_staticpressure',

            'in_airf_filtercond',
            'in_airf_filtertype'
        ],
        scored:true
    }
}

/* Checklist Fields
    {
        id:String,
        title:String,
        desc:String,
        input:{
            inputType,
            type,
            options
        }
        class:String (or id)
        group:String
        subgroup:String
        category:String
        scoreing:{
            cat:String - Category to include score in
            total:Number - Max score
            type:String - decides how to read points
            points:[] - describe how to score
        }
        required:Boolean
        calc:{
            id:String
            depends:String
        }
    }

    field.scoring.type:
    - even -> points:[{value,match},...] - Array will act as a scale with the item in array[0] awarding 0 points.
      The item in the last position will be awarded all the points.
    - uneven -> points:[{value,match},...] - Array can be in any order as points are awarded based on the matched value.
    - extra -> used to notify the program that this item is not scored but extra to support other fields

    field.input.inputType:
    - DropDown -> options:[{text:'',value:''}]
    - Checkbox -> options:null
    - TextInput
    - TextArea -> options:null
    - SearchBar -> options:{
        FilterFunction:()=>{}
        searchKey:String
        filterType:(refer to field.input.types for list)
    }

    field.input.types:
    - Text -> options:'String fromat'
    - Number ->options:{min:1,max:10}
    - Date ->options:{min:1,max:10}
*/
let fields={
    //System Info
    in_info_indes: {
        id:'indes',
        title:'System Designation',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Text',
            options:''
        },
        class:'in_info_indes',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:[''],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_info_heatage:{
        id:'heatage',
        title:'Heating System Age',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_info_heatage',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:['reliability'],
            total:10,
            type:'even-range',
            points:[{match:{min:12,max:100}},{match:{min:6,max:11}},{match:{min:0,max:5}}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_info_heatratedcap:{
        id:'heatratedcap',
        title:'Heating: Rated Capacity',
        desc:'Heat Rated Capacity',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_info_heatratedcap',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_info_heatactualcap:{
        id:'heatactualcap',
        title:'Heating: Actual Capacity',
        desc:'Heat Actual Capacity',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_info_heatactualcap',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_info_heatlosteffic:{
        id:'heatlosteffic',
        title:'Heating: Lost Efficiency %',
        desc:'Heat Loss Efficiency',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_info_heatlosteffic',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:['efficiency','comfort'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_info_incondition:{
        id:'incondition',
        title:'System Condition',
        desc:'Indoor Condition',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Excellent',value:'Excellent'},
                {text:'Good',value:'Good'},
                {text:'Average',value:'Average'},
                {text:'Considered Replacement',value:'Considered Replacement'},
                {text:'Replacement Recommended',value:'Replacement Recommended'}
            ]
        },
        class:'in_info_incondition',
        group:'system',
        subgroup:'indoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_airf_returnstatic:{
        id:'returnstatic',
        title:'Return Air Static',
        desc:'Return Static Pressure',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_airf_returnstatic',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency','reliability'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_staticpressure:{
        id:'staticpressure',
        title:'System Static Pressure',
        desc:'System Static Pressure',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_airf_staticpressure',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency','reliability'],
            total:10,
            type:'uneven-range',
            points:[{match:{min:.75,max:100},value:0},{match:{min:.65,max:.74999},value:5},{match:{min:.40,max:.649},value:10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_ratedcfm:{
        id:'ratedcfm',
        title:'Rated CFM',
        desc:'Rated CFM',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'525 - 600 (1.5 Ton)',value:'525 - 600 (1.5 Ton)'},
                {text:'700 - 800 (2 Ton)',value:'700 - 800 (2 Ton)'},
                {text:'875 - 1000 (2.5 Ton)',value:'875 - 1000 (2.5 Ton)'},
                {text:'1050 - 1200 (3 Ton)',value:'1050 - 1200 (3 Ton)'},
                {text:'1225 - 1400 (3.5 Ton)',value:'1225 - 1400 (3.5 Ton)'},
                {text:'1400 - 1600 ( 4 Ton)',value:'1400 - 1600 ( 4 Ton)'},
                {text:'1750 - 2000 (5 Ton)',value:'1750 - 2000 (5 Ton)'}

            ]
        },
        class:'in_airf_ratedcfm',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_actualcfm:{
        id:'actualcfm',
        title:'Actual CFM',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Text',
            options:''
        },
        class:'in_airf_actualcfm',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_scoredcfm:{
        id:'scoredcfm',
        title:'Scored CFM',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Text',
            options:''
        },
        class:'in_airf_scoredcfm',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency'],
            total:10,
            type:'uneven',
            points:[{match:'In Range',value:10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_filtercond:{
        id:'filtercond',
        title:'Filter Condition',
        desc:'Filter Condition',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Replaced',value:'Replaced'},
                {text:'Needs Replacement',value:'Needs Replacement'}
            ]
        },
        class:'in_airf_filtercond',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['reliability','comfort'],
            total:2,
            type:'uneven',
            points:[{match:'Clean',value:2},{match:'Replaced',value:2}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_filtertype:{
        id:'filtertype',
        title:'Filter Type',
        desc:'Filter Type',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'1in',value:'1in'},
                {text:'Media',value:'Media'}
            ]
        },
        class:'in_airf_filtertype',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['reliability','comfort'],
            total:4,
            type:'even',
            points:[{match:'1in'},{match:'Media'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_motortype:{
        id:'motortype',
        title:'Motor Type',
        desc:'Motor Type',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'PSC',value:'PSC'},
                {text:'ECM',value:'ECM'},
                {text:'Variable Speed',value:'Variable Speed'}
            ]
        },
        class:'in_airf_motortype',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency','reliability'],
            total:5,
            type:'uneven',
            points:[{match:'PSC',value:0},{match:'ECM',value:5},{match:'Variable Speed',value:5}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_airf_evapcond:{
        id:'evapcond',
        title:'Evaporator Coil Condition',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Needs',value:'Needs'},
                {text:'Leak Detected',value:'Leak Detected'},
                {text:'Damaged',value:'Damaged'}
            ]
        },
        class:'in_airf_evapcond',
        group:'system',
        subgroup:'indoor',
        category:'airflow',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_airf_blowerrated:{
        id:'blowerrated',
        title:'Blower Amp Rated',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_airf_blowerrated',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_airf_bloweractual:{
        id:'bloweractual',
        title:'Blower Amp Actual',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_airf_bloweractual',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_airf_bloweroperation:{
        id:'bloweroperation',
        title:'Blower Motor Operation',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'String',
            options:''
        },
        class:'in_airf_bloweroperation',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency','reliability'],
            total:5,
            type:'even',
            points:[{match:'Worn & Doubtful'},{match:'Pass'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_drainclear:{
        id:'drainclear',
        title:'Drain Clear & Secure',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Needs Cleaning',value:'Needs Cleaning'},
                {text:'Damaged',value:'Damaged'}
            ]
        },
        class:'in_cool_drainclear',
        group:'system',
        subgroup:'indoor',
        category:'cooling',
        scoring:{
            cat:['reliability'],
            total:5,
            type:'even',
            points:[{match:''},{match:'Clean'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_drainclear:{
        id:'drainclear',
        title:'Drain Clear & Secure',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Needs',value:'Needs'},
                {text:'Damage',value:'Damage'}
            ]
        },
        class:'in_heat_drainclear',
        group:'system',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['reliability'],
            total:5,
            type:'even',
            points:[{match:''},{match:'Clean'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_statprog:{
        id:'statprog',
        title:'Thermostat Programmed',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Yes',value:'Yes'},
                {text:'Recommended',value:'Recommended'},
                {text:'No',value:'No'}
            ]
        },
        class:'in_heat_statprog',
        group:'system',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_acce_humdop:{
        id:'heatage',
        title:'Humidifier Operations',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Homeowner Abandoned',value:'Homeowner Abandoned'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_acce_humdop',
        group:'system',
        subgroup:'indoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_acce_eacop:{
        id:'eacop',
        title:'Whole Home Air Cleaner',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_acce_eacop',
        group:'system',
        subgroup:'indoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_acce_ervop:{
        id:'ervop',
        title:'Energy Recovery Ventilator',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_acce_ervop',
        group:'system',
        subgroup:'indoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_acce_uvop:{
        id:'uvop',
        title:'Anti Microbial Lamp System',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_acce_uvop',
        group:'system',
        subgroup:'indoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_acce_coop:{
        id:'coop',
        title:'CO Sensor',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_acce_coop',
        group:'system',
        subgroup:'indoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    ou_info_outdes:{
        id:'outdes',
        title:'System Designation',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Text',
            options:''
        },
        class:'ou_info_outdes',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_coolage:{
        id:'coolage',
        title:'Cooling System Age',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_coolage',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['reliability'],
            total:10,
            type:'even-range',
            points:[{match:{min:12,max:100}},{match:{min:6,max:11}},{match:{min:0,max:5}}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_coolratedcap:{
        id:'coolratedcap',
        title:'Cooling: Rated Capacity',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_coolratedcap',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_coolactualcap:{
        id:'coolactualcap',
        title:'Cooling: Actual Capacity',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_coolactualcap',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_lostcapacity:{
        id:'lostcapacity',
        title:'Cooling: Lost Capacity',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_lostcapacity',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency','comfort'],
            total:20,
            type:'even-range',
            points:[{match:{min:16,max:100}},{match:{min:7,max:15}},{match:{min:0,max:6.999}}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    
    ou_info_coollosteffic:{
        id:'coollosteffic',
        title:'Lost Efficiency',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_coollosteffic',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:0},{match:10},{match:20}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_outcondition:{
        id:'outcondition',
        title:'System Condition',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Chooose One',value:''},
                {text:'Excellent',value:'Excellent'},
                {text:'Good',value:'Good'},
                {text:'Average',value:'Average'},
                {text:'Consider Replacement',value:'Consider Replacement'},
                {text:'Replacement Recommended',value:'Replacement Recommended'}
            ]
        },
        class:'ou_info_outcondition',
        group:'system',
        subgroup:'outdoor',
        category:'info',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_info_temp:{
        id:'temp',
        title:'Ambient Temperature',
        desc:'Ambient Temperature',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:'',
        },
        class:'ou_info_temp',
        group:'info',
        subgroup:'outdoor',
        category:'system',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    ou_airf_supplystatic:{
        id:'supplystatic',
        title:'Supply Air Static',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_airf_supplystatic',
        group:'system',
        subgroup:'outdoor',
        category:'airflow',
        scoring:{
            cat:['efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_acce_econ:{
        id:'econ',
        title:'NOT INCLUDED',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_acce_econ',
        group:'system',
        subgroup:'outdoor',
        category:'accessory',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    //Cooling Checklist
    in_cool_densityalt:{
        id:'densityalt',
        title:'Density Altitude',
        desc:'The outside density altitude',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_densityalt',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_wbentering:{
        id:'wbentering',
        title:'Wet Bulb - Entering',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_wbentering',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_wbleaving:{
        id:'wbleaving',
        title:'Wet Bulb - Leaving',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_wbentering',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_dbentering:{
        id:'dbentering',
        title:'Dry Bulb - Entering',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_dbentering',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_dbleaving:{
        id:'dbleaving',
        title:'Dry Bulb - Leaving',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_dbleaving',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_cool_tempdrop:{
        id:'tempdrop',
        title:'Temperature Drop',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_cool_tempdrop',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:5,
            type:'even-range',
            points:[{match:{min:0,max:0}},{match:{min:15.99,max:24.99}}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_suctemp:{
        id:'suctemp',
        title:'Suction Line Temperature',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_suctemp',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_sucpress:{
        id:'sucpress',
        title:'Suction Pressure',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_sucpress',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_headtemp:{
        id:'headtemp',
        title:'Liquid Line Temperature',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_headtemp',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_headpress:{
        id:'headpress',
        title:'Head Pressure',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_headpress',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_dboutdoor:{
        id:'dboutdoor',
        title:'Dry Bulb Temperature',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_dboutdoor',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_targetsh:{
        id:'targetsh',
        title:'Target Superheat',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_targetsh',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_actualsh:{
        id:'actualsh',
        title:'Actual Superheat',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_actualsh',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_refrigopsh:{
        id:'refrigopsh',
        title:'Refrigerant Operation (SH)',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_refrigopsh',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:10,
            type:'uneven-range',
            points:[{match:{min:7.001,max:100},value:0},{match:{min:5.001,max:7},value:5},{match:{min:0,max:5},value:10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    ou_cool_targetsc:{
        id:'targetsc',
        title:'Target Subcooling',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_targetsc',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_actualsc:{
        id:'actualsc',
        title:'Actual Subcooling',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_actualsc',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_refrigopsc:{
        id:'refrigopsc',
        title:'Refrigerant Operation (SC)',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_refrigopsc',
        group:'cooling',
        subgroup:'indoor',
        category:'cool',
        scoring:{
            cat:['comfort'],
            total:10,
            type:'uneven-range',
            points:[{match:{min:5.001,max:100},value:0},{match:{min:3.001,max:5},value:5},{match:{min:0,max:3},value:10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    ou_cool_ratedamps:{
        id:'ratedamps',
        title:'Compressor Amps Rated',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_ratedamps',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability','efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_actualamps:{
        id:'actualamps',
        title:'Compressor Amps Actual',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'ou_cool_actualamps',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability','efficiency'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_operationalamps:{
        id:'operationalamps',
        title:'Compressor Operational Score',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'String',
            options:''
        },
        class:'ou_cool_operationalamps',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability','efficiency'],
            total:10,
            type:'even',
            points:[{match:'Worn & Doubtful'},{match:'Pass'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_condfan:{
        id:'condfan',
        title:'Condenser Fan',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'ou_cool_condfan',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['efficiency'],
            total:10,
            type:'uneven',
            points:[{match:'Operational',value: 10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_condcoil:{
        id:'condcoil',
        title:'Condenser Coil Condition',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Needs Cleaning',value:'Needs Cleaning'},
                {text:'Leak Detected',value:'Leak Detected'},
                {text:'Damage',value:'Damage'}
            ]
        },
        class:'ou_cool_condcoil',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:15,
            type:'even',
            points:[{match:''},{match:'Leak Detected'},{match:'Needs Cleaning'},{match:'Clean'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_elecout:{
        id:'elecout',
        title:'Electrical Connections Secured',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Yes',value:'Yes'},
                {text:'Repairs Needed',value:'Repairs Needed'}
            ]
        },
        class:'ou_cool_elecout',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:5,
            type:'even',
            points:[{match:''},{match:'Yes'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_ratedcapacitor:{
        id:'ratedcapacitor',
        title:'Rated Capacitor',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Pass',value:'Pass'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'}
            ]
        },
        class:'ou_cool_ratedcapacitor',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_actualcapacitor:{
        id:'actualcapacitor',
        title:'Actual Capacitor',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Pass',value:'Pass'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'}
            ]
        },
        class:'ou_cool_actualcapacitor',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:0,
            type:'extra',
            points:[]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_capop:{
        id:'capop',
        title:'Capacitor Operation',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Pass',value:'Pass'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'}
            ]
        },
        class:'ou_cool_capop',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:10,
            type:'uneven',
            points:[{match:'Pass',value:10}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    ou_cool_contop:{
        id:'contop',
        title:'Contactor Operation',
        desc:'The outside density altitude',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Pass',value:'Pass'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'}
            ]
        },
        class:'ou_cool_contop',
        group:'cooling',
        subgroup:'outdoor',
        category:'cool',
        scoring:{
            cat:['reliability'],
            total:10,
            type:'even',
            points:[{match:'Failed'},{match:'Worn & Doubtful'},{match:'Pass'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },


    //Heating Checklist
    in_heat_hriserated:{
        id:'hriserated',
        title:'Heat Rise - Rated',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_hriserated',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_hriseactual:{
        id:'hriseactual',
        title:'Heat Rise - Actual',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_hriseactual',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_hpriserated:{
        id:'hpriserated',
        title:'Heat Pump Heat Rise - Rated',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_hpriserated',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_hpriseactual:{
        id:'hpriseactual',
        title:'Heat Pump Heat Rise - Actual',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_hpriseactual',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_outdoorcoil:{
        id:'outdoorcoil',
        title:'Heat Pump Outdoor',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Clean',value:'Clean'},
                {text:'Needs Cleaning',value:'Needs Cleaning'},
                {text:'Leak Detected',value:'Leak Detected'},
                {text:'Damaged',value:'Damaged'}
            ]
        },
        class:'in_heat_outdoorcoild',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_gpin:{
        id:'gpin',
        title:'Gas Pressure - Supply',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_gpin',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_gpouthigh:{
        id:'gpouthigh',
        title:'Gas Pressure - Manifold (Hi)',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_gpouthigh',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_gpoutlow:{
        id:'gpoutlow',
        title:'Gas Pressure - Manifold (Low)',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_gpoutlow',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    //has an associated checkbox (assembly check)
    in_heat_flmsensor:{
        id:'flmsensor',
        title:'Flame Sensor Current (Checked Pilot Assembly)',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_flmsensor',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_pilotasmbly:{
        id:'pilotasmbly',
        title:'',
        desc:'',
        input:{
            inputType:'CheckBox',
            type:'',
            options:''
        },
        class:'in_heat_pilotasmbly',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_ignitionop:{
        id:'ignitionop',
        title:'Ignition Operation',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_heat_ignitionop',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_combustop:{
        id:'combustop',
        title:'Combustion Operation',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_heat_combustop',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_fluesafety:{
        id:'fluesafety',
        title:'Flue Safety',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_heat_fluesafety',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_heatex:{
        id:'heatex',
        title:'Heat Exchanger',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Pass',value:'Pass'},
                {text:'Repairs Needed',value:'Repairs Needed'}
            ]
        },
        class:'in_heat_heatex',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_inducerops:{
        id:'inducerops',
        title:'Inducer Motor Operations',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'Failed - Furnace Tagged',value:'Failed - Furnace Tagged'},
                {text:'Recommended',value:'Recommended'}
            ]
        },
        class:'in_heat_inducerops',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_testO2:{
        id:'testO2',
        title:'Combustion Test O2 %',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_testO2',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_testCO:{
        id:'testCO',
        title:'Combustion Test PPM',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_testCO',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_testeffic:{
        id:'testeffic',
        title:'Combustion Test Efficiency %',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_testeffic',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_testCO2:{
        id:'testCO2',
        title:'Combustion Test CO2 PPM',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_testCO2',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_stacktemp:{
        id:'stacktemp',
        title:'Combustion Test Stack Temp',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_stacktemp',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_elecin:{
        id:'elecin',
        title:'Electrical Connections Secured',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Yes',value:'Yes'},
                {text:'Repairs Needed',value:'Repairs Needed'}
            ]
        },
        class:'in_heat_elecin',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },
    in_heat_elecheatop:{
        id:'elecheatop',
        title:'Electric Heat Operation',
        desc:'',
        input:{
            inputType:'DropDown',
            type:null,
            options:[
                {text:'Choose One',value:''},
                {text:'Operational',value:'Operational'},
                {text:'Worn & Doubtful',value:'Worn & Doubtful'},
                {text:'Failed',value:'Failed'},
                {text:'N/A',value:'N/A'}
            ]
        },
        class:'in_heat_elecheatop',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    },

    in_heat_hplockout:{
        id:'hplockout',
        title:'Heat Pump Lockout Temperature',
        desc:'',
        input:{
            inputType:'TextInput',
            type:'Number',
            options:''
        },
        class:'in_heat_hplockout',
        group:'heating',
        subgroup:'indoor',
        category:'heat',
        scoring:{
            cat:['efficiency'],
            total:20,
            type:'even',
            points:[{match:'t'},{match:'s'},{match:'r'}]
        },
        required:true,
        calc:{
            id:'',
            depends:true
        }
    }
}

//Will move fields into the database. then can use checklist.fields
// to request only the needed fields from the database

/**
 * Pass a checklist "template" and the function will search and return
 * a field object with the included items
 * 
 * If no checklist template is passed the function will return all of
 * the fields.
 * 
 * @param {*} checklist - the desired checklist to setup
 * @param {*} fields - DO NOT Need
 */
function setupChecklist(checklist=null,options=fields){
    let fields={};
    if(checklist){
        for(let x=0,l=checklist.included.length;x<l;x++){
            if(options[checklist.included[x]]){//check in options
                fields[checklist.included[x]]=options[checklist.included[x]];
            }
        }
        return fields;
    }else{return options;}
}

export{
    checklistss,
    fields,
    setupChecklist
}