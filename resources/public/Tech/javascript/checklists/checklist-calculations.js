//import * as psychLib from 'https://www.vhpportal.com/repo/libraries/psychrolib/psychrolib.js';
import { Psychrometrics } from "/Tech/javascript/checklists/psychrolib.js";

const psychLib = new Psychrometrics();


const BTUcorrection = {
    105:1.05,
    104:1.045,
    103:1.04,
    102:1.035,
    101:1.03,
    100:1.025,
    99:1.02,
    98:1.015,
    97:1.01,
    96:1.005,
    95:1,
    94:.994,
    93:.988,
    92:.982,
    91:.976,
    90:.97,
    89:.964,
    88:.958,
    87:.952,
    86:.946,
    85:.94,
    84:.936,
    83:.932,
    82:.928,
    81:.924,
    80:.92
}



/* Calculations
    This file holds functions for accessing various calculations
*/

//  Enthalpy
//GetDryAirEnthalpy <- (DryBulb)
//GetMoistAirEnthalpy <- (DryBulb, HumRatios)

// HumRatio
//GetHumRatioFromTWetBulb <- (DryBulb, WetBulb, Pressure)

// Volumes
//GetMoistAirVolume

// Pressure
// GetStandardAtmPressure


psychLib.SetUnitSystem(psychLib.IP);

let stdElevation = 550;
let stdPressure = psychLib.GetStandardAtmPressure(stdElevation);


//adjustment value to help get BTU
var BTUAdjustmentVal = (airDen)=>{return 60*airDen}


/** Calculate the Cooling BTUs
 * 
 *  TEST numbers
 *  - CFM = 1120
 *  - temperature = 90
 *  - dbulbE = 70
 *  - dbulbL = 50
 *  - wbulbE = 58
 *  - wbulbL = 48
 * 
 * @param {Number} CFM -> Acutal CFM
 * @param {Number} dbulbE 
 * @param {Number} dbulbL 
 * @param {Number} wbulbE 
 * @param {Number} wbulbL 
 * @param {Number} temperature -> default 90
 * @param {Number} pressure -> default stdPressure
 * @returns 
 */
function CalculateCoolingBTU(CFM,dbulbE,dbulbL,wbulbE,wbulbL,temperature = 90,pressure=stdPressure) {
    let calc={
        value:null,
        err:null
    }
    try{
        let humRatioE = psychLib.GetHumRatioFromRelHum(dbulbE,psychLib.GetRelHumFromTWetBulb(dbulbE,wbulbE,pressure),pressure)
        let humRatioL = psychLib.GetHumRatioFromRelHum(dbulbL,psychLib.GetRelHumFromTWetBulb(dbulbL,wbulbL,pressure),pressure)
        var EnthalpyE = psychLib.GetMoistAirEnthalpy(dbulbE,humRatioE)//humRatioE);//56 .008 rounded
        var EnthalpyL = psychLib.GetMoistAirEnthalpy(dbulbL,humRatioL)//humRatioL);//48 .0069 rounded
        calc.value=Math.round((CFM * Math.abs(EnthalpyE - EnthalpyL) * BTUAdjustmentVal(psychLib.GetMoistAirDensity(dbulbE,humRatioL,pressure))) * (BTUcorrection[Math.round(temperature)]));
    }catch(err){calc.err=err;}
    return calc; 
}

/*

    Temperature = difference between Drybulb entering - Drybulb leaving
    CFM

    TEST numbers
    - CFM - 1000
    - DryE - 70
    - DryL - 120
*/


/** Calculates the Heating BTUs
 * Calculates the BTU of an indoor heating system. Can be given a temperature or calculate using library.
 * 
 * @param {Number} CFM 
 * @param {Number} dbulbE 
 * @param {Number} dbulbL 
 * @param {Number} wbulbE 
 * @param {Number} pressure 
 * @returns 
 */
function CalculateHeatingBTU(CFM, dbulbE, dbulbL, wbulbE, pressure=stdPressure) {
    let calc={
        value:null,
        err:null
    }
    try{
        let humRatioE = psychLib.GetHumRatioFromRelHum(dbulbE,psychLib.GetRelHumFromTWetBulb(dbulbE,wbulbE,pressure),pressure)
        calc.value=Math.round(CFM * Math.abs(dbulbE-dbulbL) * (BTUAdjustmentVal(psychLib.GetMoistAirDensity(dbulbE,humRatioE,pressure))*.24))
    }catch(err){calc.err=err}
    return calc;
}

/**
 * 
 * @param {Number} be Dry/Wet Bulb Entering
 * @param {Number} bl Dry/Wet Bulb Leaving
 * @returns 
 */
function TempDrop(be,bl){
    let calc={
        value:null,
        err:null
    }
    try{calc.value = Math.abs(be-bl)}
    catch(err){calc.err=err;}
    return calc;
}

/**
 * 
 * @param {String} ratedCFM 
 * @param {Number} actualCFM 
 */
function ScoreCFM(ratedCFM,actualCFM){
    let calc = {
        value:null,
        err:null
    }
    try{
        let ranges = ratedCFM.replace(/\s/g,'').split('(')[0].split('-');
        if(actualCFM >= Number(ranges[0]) && actualCFM <= Number(ranges[1])){calc.value = 'In Range'}
        else{calc.value = 'Out of Range'}
    }catch(err){calc.err = err;}
    return calc;
}

/** Loss Capacity
 *  
 *  The percent of lost capacity using rated
 *  and acutal capacity.
 * 
 * @param {Number} ratedCap -> Rated Capacity
 * @param {Number} actualCap -> Actual Capcity
 * @returns lost Capacity as a %
 */
function LostCapacity(ratedCap,actualCap){
    let calc={
        value:null,
        err:null
    }
    try{calc.value=+Math.abs(((1 - actualCap/ratedCap) * 100)).toFixed(3);}
    catch(err){calc.err=err;}
    return calc;
}

/**
 * 
 * @param {Number} ratedCap 
 * @param {Number} actualCap 
 * @returns {}
 */
function CapacitorOperation(ratedCap,actualCap){
    let calc = {
        value:'Pass',
        err:null
    }
    try{

    }catch(err){calc.err=err;}
    return calc;
}

/** Compressor Operation Score
 * 
 *  Takes rated and actual compressor amps to
 *  figure the percent loss.
 * 
 *  A good operation is within 20% either way,
 *  may want to do the absolute value of the
 *  final percent difference.
 * 
 * @todo this is a similar comparision to Blower Amps,
 *       should it output words instead of (-/+)%
 * 
 * 
 * @param {Number} ratedCAmps -> Rated Compressor Amps
 * @param {Number} actualCAmps -> Actual Compressor Amps
 * @returns difference as a (- || +) %
 */
function CompressorOperation(ratedCAmps,actualCAmps){
    let calc={
        value:null,
        err:null
    }
    try{
        if(actualCAmps<=0){calc.value='Failed';}
        else if( actualCAmps > 0 && actualCAmps <= ratedCAmps){calc.value = 'Pass';}
        else if(actualCAmps <= (ratedCAmps*1.25)){calc.value = 'Worn & Doubtful';}
        else{calc.value='Failed';}//make sure this makes sense
    }catch(err){calc.err=err;}
    return calc;
}

/** Refrigerant Operation
 * 
 * This is possibly a calculation for
 * both Super Heat AND Sub Cooling.
 * If that is not the case it can be
 * copied and specified for each
 * 
 * @param {Number} targetS -> ou_cool_targetsh || ou_cool_targetsh
 * @param {Number} actualS -> ou_cool_actualsh || ou_cool_actualsc
 * @returns 
 */
function RefrigOperation(targetS,actualS){
	console.log(targetS, actualS)
    let calc={
        value:null,
        err:null
    }
    try{
		calc.value = Math.abs(targetS - actualS).toFixed(2)
		console.log(calc)
    }catch(err){calc.err=err;}
    return calc
}

/** Cond Fan Operation
 * 
 * This was added on a mistake. It can stay here
 * for a bit longer. If not used it can be deleted
 * or repurposed 
 * 
 * @param {Number} ratedFAmps 
 * @param {Number} actualFAmps 
 */
function FanOperation(ratedFAmps, actualFAmps){
    let calc={
        value:null,
        err:null
    }
    try{
        if(actualFAmps<=0){calc.value='Failed';}
        else if( actualFAmps >0 && actualFAmps <= ratedFAmps){calc.value = 'Pass';}
        else if(actualFAmps <= (ratedFAmps*1.25)){calc.value = 'Worn & Doubtful';}
        else{calc.value='Failed';}//make sure this makes sense
    }catch(err){calc.err=err;}
	return calc
}

function ContactorOperation(){

}

/** Blower Operation
 * 
 * @param {Number} ratedBAmps -> Rated Blower Amps
 * @param {Number} actualBAmps -> Actual Blower Amps
 * @returns 'Pass' OR 'Worn & Doubtful'
 */
function BlowerOperation(ratedBAmps,actualBAmps){
    let calc={
        value:null,
        err:null
    }
    try{
        if(actualBAmps===0){calc.value='Failed';}
        else if(actualBAmps < (ratedBAmps*1.2) && actualBAmps > (ratedBAmps*.25)){calc.value = 'Pass';}
        else{calc.value = 'Worn & Doubtful';}
    }catch(err){calc.err=err;}
    return calc;
}


/** System Static Pressure
 *  
 *  Sum of both Return Pressure and Supply Pressure
 * 	MPH: Added rounding to 2 decimal points
 * @param {Number} returnPress -> Return Pressure
 * @param {Number} supplyPress -> Supply Pressure
 * @return
 */
function SystemStatPressure(returnPress,supplyPress){
    let calc={
        value:null,
        err:null
    }
    try{calc.value = (returnPress+supplyPress).toFixed(2);}
    catch(err){calc.err=err;}
    return calc;
}

/**
 * 
 * @param {Number} Fahrenheit 
 * @returns Equivelent Celsius
 */
function ConvertToCelsius(Fahrenheit) {
    return ((Fahrenheit - 32) * .5556)
}
/**
 * 
 * @param {Number} Celsius 
 * @returns Equivelent Fahrenheit
 */
function ConvertToFahrenheit(Celsius) {
    return ((Celsius * 1.8) + 32)
}


export var Calculations = {
    LostCapacity:LostCapacity,
    ScoreCFM:ScoreCFM,
    RefrigOperation:RefrigOperation,
    CapacitorOperation:CapacitorOperation,
    BlowerOperation:BlowerOperation,
    CompressorOperation:CompressorOperation,
    FanOperation:FanOperation,
    SystemStatPressure:SystemStatPressure,
    TempDrop:TempDrop,
    CoolingBTU: CalculateCoolingBTU,
    HeatingBTU: CalculateHeatingBTU
}