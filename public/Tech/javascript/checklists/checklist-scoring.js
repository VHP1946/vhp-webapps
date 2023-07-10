/** Score Structure
 *
 *   TODO:
 *   - constructor
 *   - createScore - creation
 *   - checkScore - validation, returns a true=if values are valid OR {false,report}=if values are bad
 */
export class CheckListScoring{
    /** 
    *   Pass the desired checklist with a .fields created and filled
    *   with the field scoring and rules
    */
    constructor(checklist=null){
        this.checklist = checklist;
        this.canscore=false;
        this.fields={};
        try{
            this.canscore=this.checklist.scored;
            if(this.checklist||this.checklist.fields){
                this.fields=this.checklist.fields;
                this.canscore=this.checklist.scored
            }
            else{this.canscore=false;}
        }catch{}

    }

    /**
     * Takes in checklist results and checks for errors in values
     * based on the provided checklist rules.
     * 
     * Can pass all checklist results, the function will only
     * check the values it needs.
     * 
     * @param {*} results - checklist object created by ticket
     */
    checkScore(results){
        let report = {
            pass:true,
            fixes:[]
        }

        if(this.canscore){
            for(let f in this.fields){
                if(results[f]==undefined){//check if included
                    report.fixes.pass=false;
                    report.fixes.push({
                        item:this.fields[f],
                        msg:'item is not present'
                    });
                }else if(results[f]===''){
                    report.fixes.pass=false;
                    report.fixes.push({
                        item:this.fields[f],
                        msg:'item is blank'
                    });
                }
            }
        }else{report.pass=false;report.fixes.push({item:null,msg:'scoring not turned on for checklist'})}
        return report;
    }

    /**
     * Takes in checklist results and creates a score based
     * on the provided checklist rules.
     * 
     * Can pass all checklist fields, the function will only
     * check the values it needs.
     * 
     * @param {*} results - checklist object created by ticket
     * @returns {
    *       title:'',
    *       score:{
    *           total:0,
    *           score:0,
    *           final:0,
    *           grade:0,
    *           efficiency: {total:0,score:0},
    *           comfort: {total:0,score:0},
    *           reliability: {total:0,score:0}
    *       },
    *       list:{
    *           efficiency:[{title:'',value:'',score:'',grade:''}],
    *           comfort:[],
    *           reliability:[]
    *       }
    *   }
     */
    createScore(results){
        let report = {
            title:this.checklist.title,
            score:{
                total:0,
                final:0,
                grade:'',
                efficiency:{total:0,score:0,graph:0},
                comfort:{total:0,score:0,graph:0},
                reliability:{total:0,score:0,graph:0}
            },
            list:{
                efficiency:[],
                comfort:[],
                reliability:[]
            }
        }
        if(this.checkScore(results).pass){
            for(let f in this.fields){
                let field = this.fields[f];
                if(field.scoring.cat.length>=1 && report.score[field.scoring.cat[0]]){
                    if(results[f]){//here to exclude 
                        report.score.total+=field.scoring.total||0; //add to grand total
                        let tscore = this.getScore(results[f],field.scoring);
                        report.score.final+=tscore; //add to total

                        report.list[field.scoring.cat[0]].push({
                            title:field.title,
                            value:results[f],
                            score:field.scoring.total>0?`${tscore}/${field.scoring.total}`:'',
                            grade:this.getGrade(tscore,field.scoring.total)
                        });//only add to first category list
                        
                        for(let x=0,l=field.scoring.cat.length;x<l;x++){
                            if(report.score[field.scoring.cat[x]]){
                                report.score[field.scoring.cat[x]].total+=field.scoring.total||0; //add to category total
                                report.score[field.scoring.cat[x]].score+=tscore; //add to category score
                            }
                        }
                    }else{
                        report.list[field.scoring.cat[0]].push({
                            title:field.title,
                            value:results[f],
                            score:``,
                            grade:''
                        });//only add to first category list
                    }
                    //exclude 'extras' ?
                }else{
					//console.log('No Scoring Cat',field);
				}
            }
            report.score.grade = this.getGrade(report.score.final,report.score.total);
            for(let g in report.list){
                report.score[g].graph=Math.round(report.score[g].score/report.score[g].total*100);
                report.score[g].grade = this.getGrade(report.score[g].score,report.score[g].total)
            }
        }else{return false;}//could pass the problems with scoring to  screen
        return report;
    }



    getScore(answr,scoring){
        let score = 0;
        switch(scoring.type){
            case 'even':{return this.scoreEven(answr,scoring);}
            case 'uneven':{return this.scoreUneven(answr,scoring);}
            case 'even-range':{return this.scoreEvenRange(answr,scoring);}
            case 'uneven-range':{return this.scoreUnevenRange(answr,scoring);}
        }
        return score;
    }
    getGrade(points,total){
        let score = Math.round(points/total*100);
        if(score===NaN){return 'Cannot Grade'}
        if(score>=85){return'Excellent';}//Green
        if(score<85 && score>=65){return 'Good'}//Light Green
        if(score<65 && score>=50){return 'Average'}//Yellow Orange
        if(score<50 && score>=35){return 'Consider Replacement'}//Orange
        if(score<35){return 'Replacement Recommended'}//Red 
    }


    scoreEven(answr,scoring){
        for(let x=0,l=scoring.points.length;x<l;x++){
            if(answr===scoring.points[x].match){
                if(x===0){return 0;}
                if(x===(scoring.points.length-1)){return scoring.total;}
                else{return Math.round(scoring.total/(x+1));}
            }
        }
        return 0;
    }
    scoreUneven(answr,scoring){
        for(let x=0,l=scoring.points.length;x<l;x++){
            if(answr===scoring.points[x].match){
                return scoring.points[x].value;
            }
        }
        return 0;
    }
    //inclusive
    scoreEvenRange(answr,scoring){
        for(let x=0,l=scoring.points.length;x<l;x++){
            if(scoring.points[x].match.min<=answr && answr<=scoring.points[x].match.max){
                if(x===0){return 0;}
                if(x===(scoring.points.length-1)){return scoring.total;}
                else{return Math.round(scoring.total/(x+1));}
            }
        }
        return 0
    }
    scoreUnevenRange(answr,scoring){
        for(let x=0,l=scoring.points.length;x<l;x++){
            if(scoring.points[x].match.min<=answr && answr<=scoring.points[x].match.max){
                if(x===0){return 0;}
                if(x===(scoring.points.length-1)){return scoring.total;}
                else{return scoring.points[x].value;}
            }
        }
        return 0

    }
}
/*
const data = require('./checklist-data');

let checklist = JSON.parse(JSON.stringify(data.checklists.enhanced));
checklist.fields=data.setupChecklist(checklist);

let t = new CheckListScoring(checklist);

let res = {
    in_info_indes:'t',
    in_info_heatage:'s'
}
console.log(t.createScore(res));
*/