function test() {

}

let dom={
    info: {
        street: 'street',
        cityzip: 'cityzip',
        descr: 'wo_desc',
        in_cool_wbentering: 'wbentering',
        in_cool_wbleaving: 'wbleaving',
        in_cool_dbentering: 'dbentering',
        in_cool_dbleaving: 'dbleaving',
        in_cool_tempdrop: 'tempdrop',
        ou_cool_suctemp: 'suctemp',
		ou_cool_sucpress: 'sucpress',
        ou_cool_headtemp: 'headtemp',
		ou_cool_headpress: 'headpress',
        ou_cool_dboutdoor: 'dboutdoor',
        ou_cool_targetsh: 'targetsh',
        ou_cool_actualsh: 'actualsh',
        ou_cool_refrigopsh: 'refrigopsh',
        ou_cool_targetsc: 'targetsc',
        ou_cool_actualsc: 'actualsc',
        ou_cool_refrigopsc: 'refrigopsc',
        ou_cool_ratedamps: 'ratedamps',
        ou_cool_actualamps: 'actualamps',
        ou_cool_operationalamps:'operationalamps',
        ou_cool_condfan: 'condfan',
        ou_cool_condcoil: 'condcoil',
        ou_cool_elecout: 'elecout',
        ou_cool_ratedcapacitor:'ratedcapacitor',
        ou_cool_actualcapacitor:'actualcapacitor',
        ou_cool_capop: 'capop',
        ou_cool_contop: 'contop',
        in_heat_hriserated: 'hriserated',
        in_heat_hriseactual: 'hriseactual',
        in_heat_hpriserated: 'hpriserated',
        in_heat_hpriseactual: 'hpriseactual',
        in_heat_outdoorcoil: 'outdoorcoil',
        in_heat_gpin: 'gpin',
        in_heat_gpouthigh: 'gpouthigh',
        in_heat_gpoutlow: 'gpoutlow',
        in_heat_flmsensor: 'flmsensor',
        in_heat_pilotasmbly:'pilotasmbly',
        in_heat_ignitionop: 'ignitionop',
        in_heat_combustop: 'combustop',
        in_heat_fluesafety: 'fluesafety',
        in_heat_heatex: 'heatex',
        in_heat_inducerops: 'inducerops',
        in_heat_testO2: 'testO2',
        in_heat_testCO: 'testCO',
        in_heat_testeffic: 'testeffic',
        in_heat_testCO2: 'testCO2',
        in_heat_stacktemp: 'stacktemp',
        in_heat_elecin: 'elecin',
        in_heat_elecheatop: 'elecheatop',
        in_info_indes: 'indes',
        in_info_heatage: 'heatage',
        in_info_heatratedcap: 'heatratedcap',
        in_info_heatactualcap: 'heatactualcap',
        in_info_heatlosteffic: 'heatlosteffic',
        in_info_incondition: 'incondition',
        in_airf_returnstatic: 'returnstatic',
        in_airf_staticpressure:'staticpressure',
        
        in_airf_blowerrated: 'blowerrated',
        in_airf_bloweractual: 'bloweractual',
        in_airf_bloweroperation: 'bloweroperation',

        in_airf_ratedcfm: 'ratedcfm',
        in_airf_actualcfm: 'actualcfm',
        in_airf_scoredcfm: 'scoredcfm',
        in_airf_filtercond: 'filtercond',
        in_airf_filtertype: 'filtertype',
        in_airf_evapcond: 'evapcond',
        in_airf_motortype:'motortype',
        in_cool_drainclear: 'cooldrainclear',
        in_heat_drainclear: 'heatdrainclear',
        in_heat_hplockout: 'hplockout',
        in_heat_statprog: 'statprog',
        in_acce_humdop: 'humdop',
        in_acce_eacop: 'eacop',
        in_acce_ervop: 'ervop',
        in_acce_uvop: 'uvop',
        in_acce_coop: 'coop',
        ou_info_outdes: 'outdes',
        ou_info_coolage: 'coolage',
        ou_info_coolratedcap: 'coolratedcap',
        ou_info_coolactualcap: 'coolactualcap',
        ou_info_lostcapacity:'lostcapacity',
        ou_info_coollosteffic: 'coollosteffic',
        ou_info_outcondition: 'outcondition',
        ou_airf_supplystatic: 'supplystatic'
    },
    valids: {}
}

let temptext = 'CLASSIC AC MAINTENANCE 2 SYSTEM SPRING ANNUAL RENEWALundefinedTUNED UP ACS PER CLASSIC REWARDS. CLEAN AND CHECKED COILSDRAINS CONTACTORS CAPACITORS MOTORS WHEELS WIRINGDISCONNECTS CHARGE TDREPLACED FILTERS.BLEW OUT DRAINLINESSHUT HUMIDIFIERS OFF FOR WINTERADDED 4#S R.22 SMALLER CARRIER FROM 2005.  NO LEAK SEARCHPERFORMEDCAPACITOR 30.5.  ACTUAL 30.5VIP CUSTOMERCLASSIC. 540.00R22. 285.00FILTER 16X25X4 27.0020X25X4. 29.00TOTAL. 881.00.    *****PLEASE BILL THRU OFFICE. ******GATE CODE. #5566'

let tempdata = {
        street: 'street',
        cityzip: 'cityzip',
        wo_desc: 'wo_desc',
        densityalt: 'densityalt',
        wbentering: 'wbentering',
        wbleaving: 'wbleaving',
        dbentering: 'dbentering',
        dbleaving: 'dbleaving',
        tempdrop: 'tempdrop',
        sucpress: 'sucpress',
        headpress: 'headpress',
		suctemp: 'suctemp',
        headtemp: 'headtemp',
        liqpress: 'liqpress',
        dboutdoor: 'dboutdoor',
        targetsh: 'targetsh',
        actualsh: 'actualsh',
        refrigopsh: 'refrigopsh',
        targetsc: 'targetsc',
        actualsc: 'actualsc',
        refrigopsc: 'refrigopsc',
        ratedamps: 'ratedamps',
        actualamps: 'actualamps',
        operationalamps:'operationalamps',
        condfan: 'condfan',
        condcoil: 'condcoil',
        elecout: 'elecout',
        hriserated: 'hriserated',
        hriseactual: 'hriseactual',
        hpriserated: 'hpriserated',
        hpriseactual: 'hpriseactual',
        outdoorcoil: 'outdoorcoil',
        gpin: 'gpin',
        gpouthigh: 'gpouthigh',
        gpoutlow: 'gpoutlow',
        flmsensor: 'flmsensor',
        pilotasmbly:'pilotasmbly',
        ignitionop: 'ignitionop',
        combustop: 'combustop',
        fluesafety: 'fluesafety',
        heatex: 'heatex',
        inducerops: 'inducerops',
        testO2: 'testO2',
        testCO: 'testCO',
        testeffic: 'testeffic',
        testCO2: 'testCO2',
        stacktemp: 'stacktemp',
        elecin: 'elecin',
        blowerrated: 'blowerrated',
        bloweractual: 'bloweractual',
        bloweropertation:'bloweroperation',
        indes: 'indes',
        heatage: 'heatage',
        motortype:'motortype',
        heatratedcap: 'heatratedcap',
        heatactualcap: 'heatactualcap',
        heatlosteffic: 'heatlosteffic',
        incondition: 'incondition',
        returnstatic: 'returnstatic',
        staticpressure:'staticpressure',
        ratedcfm: 'ratedcfm',
        actualcfm: 'actualcfm',
        scoredcfm: 'scoredcfm',
        buildpress: 'buildpress',
        partcount: 'partcount',
        filtercond: 'filtercond',
        filtertype:'filtertype',
        evapcond: 'evapcond',
        cooldrainclear: 'cooldrainclear',
        heatdrainclear: 'heatdrainclear',
        hplockout: 'hplockout',
        statprog: 'statprog',
        humdop: 'humdop',
        eacop: 'eacop',
        ervop: 'ervop',
        uvop: 'uvop',
        coop: 'coop',
        outdes: 'outdes',
        coolage: 'coolage',
        coolratedcap: 'coolratedcap',
        coolactualcap: 'coolactualcap',
        lostcapacity:'lostcapacity',
        coollosteffic: 'coollosteffic',
        outcondition: 'outcondition',
        supplystatic: 'supplystatic',
        elecheatop: 'elecheatop',
        actualcapacitor:'actualcapacitor',
        ratedcapacitor:'ratedcapacitor',
        capop: 'capop',
        contop: 'contop'
}



export class SummaryCheckList{
    constructor(data = null, name="Your System"){
        if (data == null) {
            data = tempdata
        }
        this.innertext = data,
        this.name = name
        this.dom = dom,
        this.content =`
        <img id='header-logo'src="https://www.vhpportal.com/repo/assets/images/Header_clean.png"/>
        <div class="summary-header">
            <div><span class="${dom.info.street}">1234 Street Dr</span> , <span class=${dom.info.cityzip}>Fenton, MO 63026</span></div>
        </div>
        <div class="summary-body">
            <div class="summary-section-info">
                <div class="section-header-sys">System Info</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Area Served:</div>
						<div class="${dom.info.in_info_indes}">${this.innertext.indes}</div>
						<div class="${dom.info.in_info_indes + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heating System Age:</div>
						<div class="${dom.info.in_info_heatage}">${this.innertext.heatage}</div>
						<div class="${dom.info.in_info_heatage + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heating: Rated Capacity:</div>
						<div class="${dom.info.in_info_heatratedcap}">${this.innertext.heatratedcap}</div>
						<div class="${dom.info.in_info_heatratedcap + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heating: Actual Capacity:</div>
						<div class="${dom.info.in_info_heatactualcap}">${this.innertext.heatactualcap}</div>
						<div class="${dom.info.in_info_heatactualcap + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heating: Lost Efficiency %:</div>
						<div class="${dom.info.in_info_heatlosteffic}">${this.innertext.heatlosteffic}</div>
						<div class="${dom.info.in_info_heatlosteffic + '-score'}"></div>
                    </div>
                </div>
                <div class="part-header">Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Cooling System Age:</div>
						<div class="${dom.info.ou_info_coolage}">${this.innertext.coolage}</div>
						<div class="${dom.info.ou_info_coolage + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Cooling: Rated Capacity:</div>
						<div class="${dom.info.ou_info_coolratedcap}">${this.innertext.coolratedcap}</div>
						<div class="${dom.info.ou_info_coolratedcap + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Cooling: Actual Capacity:</div>
						<div class="${dom.info.ou_info_coolactualcap}">${this.innertext.coolactualcap}</div>
						<div class="${dom.info.ou_info_coolactualcap + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Cooling: Lost Capacity:</div>
						<div class="${dom.info.ou_info_lostcapacity}">${this.innertext.ou_info_lostcapacity}</div>
						<div class="${dom.info.ou_info_lostcapacity + '-score'}"></div>
                    </div>
                    
                    <div class="checklist-item">
                        <div>Lost Efficiency:</div>
						<div class="${dom.info.ou_info_coollosteffic}">${this.innertext.coollosteffic}</div>
						<div class="${dom.info.ou_info_coollosteffic + '-score'}"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section-airflow">
                <div class="section-header-air">Airflow</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Supply Air Static:</div>
						<div class="${dom.info.ou_airf_supplystatic}">${this.innertext.supplystatic}</div>
						<div class="${dom.info.ou_airf_supplystatic + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Return Air Static:</div>
						<div class="${dom.info.in_airf_returnstatic}">${this.innertext.returnstatic}</div>
						<div class="${dom.info.in_airf_returnstatic + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>System Static Pressure:</div>
						<div class="${dom.info.in_airf_staticpressure}">${this.innertext.staticpressure}</div>
						<div class="${dom.info.in_airf_staticpressure + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Rated CFM:</div>
						<div class="${dom.info.in_airf_ratedcfm}">${this.innertext.ratedcfm}</div>
						<div class="${dom.info.in_airf_ratedcfm + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual CFM:</div>
						<div class="${dom.info.in_airf_actualcfm}">${this.innertext.actualcfm}</div>
						<div class="${dom.info.in_airf_actualcfm + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Scored CFM:</div>
						<div class="${dom.info.in_airf_scoredcfm}">${this.innertext.scoredcfm}</div>
						<div class="${dom.info.in_airf_scoredcfm + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Blower Amp Rated:</div>
						<div class="${dom.info.in_airf_blowerrated}">${this.innertext.blowerrated}</div>
						<div class="${dom.info.in_airf_blowerrated + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Blower Amp Actual:</div>
						<div class="${dom.info.in_airf_bloweractual}">${this.innertext.bloweractual}</div>
						<div class="${dom.info.in_airf_bloweractual + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Blower Amps Operation:</div>
						<div class="${dom.info.in_airf_bloweroperation}">${this.innertext.bloweroperation}</div>
						<div class="${dom.info.in_airf_bloweroperation + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Filter Condition:</div>
						<div class="${dom.info.in_airf_filtercond}">${this.innertext.filtercond}</div>
						<div class="${dom.info.in_airf_filtercond + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Filter Type:</div>
						<div class="${dom.info.in_airf_filtertype}">${this.innertext.filtertype}</div>
						<div class="${dom.info.in_airf_filtertype + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Evaporator Coil Condition:</div>
						<div class="${dom.info.in_airf_evapcond}">${this.innertext.evapcond}</div>
						<div class="${dom.info.in_airf_evapcond + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Motor Type:</div>
						<div class="${dom.info.in_airf_motortype}">${this.innertext.motortype}</div>
						<div class="${dom.info.in_airf_motortype + '-score'}"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section-cooling">
                <div class="section-header-cool">Cooling</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Wet Bulb - Entering:</div>
						<div class="${dom.info.in_cool_wbentering}">${this.innertext.wbentering}</div>
						<div class="${dom.info.in_cool_wbentering + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Wet Bulb - Leaving:</div>
						<div class="${dom.info.in_cool_wbleaving}">${this.innertext.wbleaving}</div>
						<div class="${dom.info.in_cool_wbleaving + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Dry Bulb - Entering:</div>
						<div class="${dom.info.in_cool_dbentering}">${this.innertext.dbentering}</div>
						<div class="${dom.info.in_cool_dbentering + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Dry Bulb - Leaving:</div>
						<div class="${dom.info.in_cool_dbleaving}">${this.innertext.dbleaving}</div>
						<div class="${dom.info.in_cool_dbleaving + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Temperature Drop:</div>
						<div class="${dom.info.in_cool_tempdrop}">${this.innertext.tempdrop}</div>
						<div class="${dom.info.in_cool_tempdrop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Drain Clear & Secure:</div>
						<div class="${dom.info.in_cool_drainclear}">${this.innertext.cooldrainclear}</div>
						<div class="${dom.info.in_cool_drainclear + '-score'}"></div>
                    </div>
                </div>
                <div class="part-header">Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Suction Line Temperature:</div>
						<div class="${dom.info.ou_cool_suctemp}">${this.innertext.suctemp}</div>
						<div class="${dom.info.ou_cool_suctemp + '-score'}"></div>
                    </div>
					<div class="checklist-item">
                        <div>Suction Pressure:</div>
						<div class="${dom.info.ou_cool_sucpress}">${this.innertext.sucpress}</div>
						<div class="${dom.info.ou_cool_sucpress + '-score'}">5/10</div>
                    </div>
                    <div class="checklist-item">
                        <div>Liquid Line Temperature:</div>
						<div class="${dom.info.ou_cool_headtemp}">${this.innertext.headtemp}</div>
						<div class="${dom.info.ou_cool_headtemp + '-score'}">10/10</div>
                    </div>
					<div class="checklist-item">
						<div>Head Pressure:</div>
						<div class="${dom.info.ou_cool_headpress}">${this.innertext.headpress}</div>
						<div class="${dom.info.ou_cool_headpress + '-score'}">2/10</div>
					</div>
                    <div class="checklist-item">
                        <div>Target Superheat:</div>
						<div class="${dom.info.ou_cool_targetsh}">${this.innertext.targetsh}</div>
						<div class="${dom.info.ou_cool_targetsh + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Superheat:</div>
						<div class="${dom.info.ou_cool_actualsh}">${this.innertext.actualsh}</div>
						<div class="${dom.info.ou_cool_actualsh + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Refrigerant Operation (SH):</div>
						<div class="${dom.info.ou_cool_refrigopsh}">${this.innertext.refrigopsh}</div>
						<div class="${dom.info.ou_cool_refrigopsh + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Target Subcooling:</div>
						<div class="${dom.info.ou_cool_targetsc}">${this.innertext.targetsc}</div>
						<div class="${dom.info.ou_cool_targetsc + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Subcooling:</div>
						<div class="${dom.info.ou_cool_actualsc}">${this.innertext.actualsc}</div>
						<div class="${dom.info.ou_cool_actualsc + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Refrigerant Operation (SC):</div>
						<div class="${dom.info.ou_cool_refrigopsc}">${this.innertext.refrigopsc}</div>
						<div class="${dom.info.ou_cool_refrigopsc + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Compressor Amps Rated:</div>
						<div class="${dom.info.ou_cool_ratedamps}">${this.innertext.ratedamps}</div>
						<div class="${dom.info.ou_cool_ratedamps + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Compressor Amps Actual:</div>
						<div class="${dom.info.ou_cool_actualamps}">${this.innertext.actualamps}</div>
						<div class="${dom.info.ou_cool_actualamps + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Compressor Operational Score:</div>
						<div class="${dom.info.ou_cool_operationalamps}">${this.innertext.operationalamps}</div>
						<div class="${dom.info.ou_cool_operationalamps + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Condenser Fan Operation:</div>
						<div class="${dom.info.ou_cool_condfan}">${this.innertext.condfan}</div>
						<div class="${dom.info.ou_cool_condfan + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Condenser Coil Condition:</div>
						<div class="${dom.info.ou_cool_condcoil}">${this.innertext.condcoil}</div>
						<div class="${dom.info.ou_cool_condcoil + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Electrical Connections Secured:</div>
						<div class="${dom.info.ou_cool_elecout}">${this.innertext.elecout}</div>
						<div class="${dom.info.ou_cool_elecout + '-score'}"></div>
                    </div>

                    <div class="checklist-item">
                        <div>Rated Capacitor:</div>
						<div class="${dom.info.ou_cool_ratedcapacitor}">${this.innertext.ratedcapacitor}</div>
						<div class="${dom.info.ou_cool_ratedcapacitor + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Actual Capacitor:</div>
						<div class="${dom.info.ou_cool_actualcapacitor}">${this.innertext.actualcapacitor}</div>
						<div class="${dom.info.ou_cool_actualcapacitor + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Capacitor Operation:</div>
						<div class="${dom.info.ou_cool_capop}">${this.innertext.capop}</div>
						<div class="${dom.info.ou_cool_capop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Contactor Operation:</div>
						<div class="${dom.info.ou_cool_contop}">${this.innertext.contop}</div>
						<div class="${dom.info.ou_cool_contop + '-score'}"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section-heating">
                <div class="section-header-heat">Heating</div>
                <div class="part-header">Indoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Heat Rise - Rated:</div>
						<div class="${dom.info.in_heat_hriserated}">${this.innertext.hriserated}</div>
						<div class="${dom.info.in_heat_hriserated + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Rise - Actual:</div>
						<div class="${dom.info.in_heat_hriseactual}">${this.innertext.hriseactual}</div>
						<div class="${dom.info.in_heat_hriseactual + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Supply:</div>
						<div class="${dom.info.in_heat_gpin}">${this.innertext.gpin}</div>
						<div class="${dom.info.in_heat_gpin + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Manifold (Hi):</div>
						<div class="${dom.info.in_heat_gpouthigh}">${this.innertext.gpouthigh}</div>
						<div class="${dom.info.in_heat_gpouthigh + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Gas Pressure - Manifold (Low):</div>
						<div class="${dom.info.in_heat_gpoutlow}">${this.innertext.gpoutlow}</div>
						<div class="${dom.info.in_heat_gpoutlow + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Ignition Operation:</div>
						<div class="${dom.info.in_heat_ignitionop}">${this.innertext.ignitionop}</div>
						<div class="${dom.info.in_heat_gpoutlow + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Operation:</div>
						<div class="${dom.info.in_heat_combustop}">${this.innertext.combustop}</div>
						<div class="${dom.info.in_heat_combustop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Flue Safety:</div>
						<div class="${dom.info.in_heat_fluesafety}">${this.innertext.fluesafety}</div>
						<div class="${dom.info.in_heat_fluesafety + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Inducer Motor Operations:</div>
						<div class="${dom.info.in_heat_inducerops}">${this.innertext.inducerops}</div>
						<div class="${dom.info.in_heat_inducerops + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test O2 %:</div>
						<div class="${dom.info.in_heat_testO2}">${this.innertext.testO2}</div>
						<div class="${dom.info.in_heat_testO2 + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test PPM:</div>
						<div class="${dom.info.in_heat_testCO}">${this.innertext.testCO}</div>
						<div class="${dom.info.in_heat_testCO + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test Efficiency %:</div>
						<div class="${dom.info.in_heat_testeffic}">${this.innertext.testeffic}</div>
						<div class="${dom.info.in_heat_testeffic + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test CO2 PPM:</div>
						<div class="${dom.info.in_heat_testCO2}">${this.innertext.testCO2}</div>
						<div class="${dom.info.in_heat_testCO2 + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Combustion Test Stack Temp:</div>
						<div class="${dom.info.in_heat_stacktemp}">${this.innertext.stacktemp}</div>
						<div class="${dom.info.in_heat_stacktemp + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Exchanger:</div>
						<div class="${dom.info.in_heat_heatex}">${this.innertext.heatex}</div>
						<div class="${dom.info.in_heat_heatex + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Electrical Connections Secured:</div>
						<div class="${dom.info.in_heat_elecin}">${this.innertext.elecin}</div>
						<div class="${dom.info.in_heat_elecin + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Drain Clear & Secure:</div>
						<div class="${dom.info.in_heat_drainclear}">${this.innertext.heatdrainclear}</div>
						<div class="${dom.info.in_heat_drainclear + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Electric Heat Operation:</div>
						<div class="${dom.info.in_heat_elecheatop}">${this.innertext.elecheatop}</div>
						<div class="${dom.info.in_heat_elecheatop + '-score'}"></div>
                    </div>
                    <div class="checklist-item" id = "flame-sensor-curr">
                        <div>Flame Sensor Current:</div>
						<div class="${dom.info.in_heat_flmsensor}">${this.innertext.flmsensor}</div>
						<div class="${dom.info.in_heat_flmsensor + '-score'}"></div>
                    </div>
                    <div class="checklist-item" id = "check-pilot-asmbly">
                        <div>Checked Pilot Assembly:</div>
                        <div class="${dom.info.in_heat_pilotasmbly}">${this.innertext.pilotasmbly}</div>
						<div class="${dom.info.in_heat_pilotasmbly + '-score'}"></div>
                    </div>
                </div>
                <div class="part-header">Outdoor</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Heat Pump Lockout Temperature:</div>
						<div class="${dom.info.in_heat_hplockout}">${this.innertext.hplockout}</div>
						<div class="${dom.info.in_heat_hplockout + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Pump Heat Rise - Rated:</div>
						<div class="${dom.info.in_heat_hpriserated}">${this.innertext.hpriserated}</div>
						<div class="${dom.info.in_heat_hpriserated + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Pump Heat Rise - Actual:</div>
						<div class="${dom.info.in_heat_hpriseactual}">${this.innertext.hpriseactual}</div>
						<div class="${dom.info.in_heat_hpriseactual + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Heat Pump Outdoor Coil:</div>
						<div class="${dom.info.in_heat_outdoorcoil}">${this.innertext.outdoorcoil}</div>
						<div class="${dom.info.in_heat_outdoorcoil + '-score'}"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section-access">
                <div class="section-header-access">Accessories</div>
                <div class="section-cont">
                    <div class="checklist-item">
                        <div>Humidifier Operations:</div>
						<div class="${dom.info.in_acce_humdop}">${this.innertext.humdop}</div>
						<div class="${dom.info.in_acce_humdop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Whole Home Air Cleaner:</div>
						<div class="${dom.info.in_acce_eacop}">${this.innertext.eacop}</div>
						<div class="${dom.info.in_acce_eacop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Energy Recovery Ventilator:</div>
						<div class="${dom.info.in_acce_ervop}">${this.innertext.ervop}</div>
						<div class="${dom.info.in_acce_ervop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Anti Microbial Lamp System:</div>
						<div class="${dom.info.in_acce_uvop}">${this.innertext.uvop}</div>
						<div class="${dom.info.in_acce_uvop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>CO Sensor:</div>
						<div class="${dom.info.in_acce_coop}">${this.innertext.coop}</div>
						<div class="${dom.info.in_acce_coop + '-score'}"></div>
                    </div>
                    <div class="checklist-item">
                        <div>Thermostat Programmed:</div>
						<div class="${dom.info.in_heat_statprog}">${this.innertext.statprog}</div>
						<div class="${dom.info.in_heat_statprog + '-score'}"></div>
                    </div>
                </div>
            </div>
            <div class="summary-section-descr">
                <div class="section-header-descr">Tech Observations</div>
                <div class="${dom.info.descr}"></div>
            </div>
        </div>
        <div class="footer-header">${this.name} Health Report</div>

        

		<div class="checklist-summary-cont"></div>
    `
    }


}
export var summarychecks ={
    dom:dom,
    content:tempdata
}
