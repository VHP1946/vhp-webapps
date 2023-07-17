import { CheckListScoring } from '/Tech/javascript/checklists/checklist-scoring.js';
import * as checkdata from '/Tech/javascript/checklists/checklist-data.js';

//Use mousePos for the floating description box
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
	mousePos = { x: event.clientX, y: event.clientY };
});

import { catdescr, grade_data, GetScoreColors } from '/Tech/javascript/checklists/checklist-descr.js';

import * as GaugeChart from 'https://unpkg.com/gauge-chart@next/dist/bundle.mjs'

export class ServiceSystemSummary {
  	constructor(cont,data,checklist=checkdata.checklistss.enhanced){
    	this.cont = cont;
    	this.data = data; //ticket data
		this.curIndex = 0;
		this.charts = []

		checklist.fields = checkdata.setupChecklist(checklist);//add fields to checklist
		this.grading = new CheckListScoring(checklist);
		this.walkthroughComplete = false;
		this.infoActive = false;
  	}

	/**
	 * Loops through each system and updates its score object
	 * @param {Object} data | the checklist object being updated
	 */
	UPDATEscores(data) {
		console.log("Updating scores")
		console.log(data)
		for (let i = 0; i < data.length; i++) {
			data[i].score = this.GETsystemscore({
				...data[i].checks.system,
				...data[i].checks.cooling,
				...data[i].checks.heating
			}).score
		}
	}

	/**
	 * Creates and draws the system summary
	 * @param {Object} data | the ticket data
	 */
	SETsummary(data) {
		console.log("CURRENT INDEX",this.curIndex)
		this.data = data
		this.curIndex = 0;
		this.baseIndex = 0;
		for (let i = 0; i < this.data.checks.length; i++) {
			if (this.data.checks[i].scored == true) {
				if (this.data.checks[this.curIndex]) {
					this.baseIndex = this.curIndex;
					this.cont.innerHTML = '';
					this.cont.append(this.GETsystempage(this.data.checks[this.curIndex]))
					this.DRAWgaugechart(this.data.checks[this.curIndex].name)
				}
				break
			} else {
				this.curIndex = this.curIndex + 1;
			}
		}
	}

	/**
	 * Clear the inner contents of the container.
	 */
	CLEARsystem() {
		this.cont.innerHTML = ''
	}

	/**
	 * Assigns the index with the provided number
	 * @param {Number} index | the index you are assigning
	 */
	SETindex = (index) => {
		this.curIndex = index
	}

	/**
	 * Get the index
	 * @returns this.index
	 */
	GETindex = () => {
		return this.curIndex
	}

	/**
	 * Switches to the next page
	 */
	PREVpage = () => {
		if (this.data.checks.length > 1 && this.curIndex != 0) {
			this.CLEARsystem()
			this.curIndex = this.curIndex - 1;
			let grade = this.GETsystemscore({
				...this.data.checks[this.curIndex].checks.system,
				...this.data.checks[this.curIndex].checks.cooling,
				...this.data.checks[this.curIndex].checks.heating
			});
			this.data.checks[this.curIndex].score = grade.score
			//UNCOMMENT TO HIDE BLANK SYSTEMS
			if (this.data.checks[this.curIndex].scored == false) {
				this.PREVpage()
			} else {
				this.cont.append(this.GETsystempage(this.data.checks[this.curIndex]))
				this.DRAWgaugechart(this.data.checks[this.curIndex].name)
			}
		}
	}

	/**
	 * Switches to the next page or toggles the presentation
	 */
	NEXTpage = () => {
		this.CLEARsystem()
		if (this.curIndex == this.data.checks.length - 1) {
			let box = document.getElementsByClassName('present-full-cont')[0];
			this.walkthroughComplete = true;
			box.style.left = "0px";
		} else {
			//Get the grade
			this.curIndex = this.curIndex + 1;
			let grade = this.GETsystemscore({
				...this.data.checks[this.curIndex].checks.system,
				...this.data.checks[this.curIndex].checks.cooling,
				...this.data.checks[this.curIndex].checks.heating
			});
			this.data.checks[this.curIndex].score = grade.score
			//UNCOMMENT TO HIDE BLANK SYSTEMS
			if (this.data.checks[this.curIndex].scored == false) {
				this.NEXTpage()
			} else {
				this.cont.append(this.GETsystempage(this.data.checks[this.curIndex]))
				this.DRAWgaugechart(this.data.checks[this.curIndex].name)
			}
		}
	}

	/**
	 * Takes in a system object and calculates its system score
	 * @returns | an object containing a summary of the system score
	 */
	GETsystemscore = (results) => {
		return this.grading.createScore(results);
	}

	/**
	 * Creates a system page for the provided system which contains a score summary and system summary
	 * @param {Object} sys | the system we are creating a summary page for
	 */
	GETsystempage = (sys) => {
		if (sys) {
			//Create the outer container
			let container = document.createElement('div')
			//Create the "[System Name] Health Report" header
			let headercont = document.createElement('div')
			headercont.className = 'header-cont'
			let header = document.createElement('div')
			header.className = 'summary-title-header'
			header.innerHTML = sys.name + " Score Summary"
			if (this.curIndex != 0 && (this.curIndex != this.baseIndex)) {
				let prevButton = document.createElement('div')
				prevButton.className = 'header-button'
				prevButton.innerText = "Previous"
				prevButton.addEventListener('click', () => {
					this.PREVpage()
				})
				headercont.append(prevButton)
				header.id = "system-score-header"
			} else {
				let emptyDiv = document.createElement('div')
				emptyDiv.id = "header-empty-div"
				emptyDiv.className = "header-button"
				headercont.append(emptyDiv)
			}
			
			headercont.append(header)
			let nextButton = document.createElement('div')
			nextButton.className = 'header-button'
			nextButton.innerText = "Next"

			nextButton.addEventListener('click', () => {
				this.NEXTpage()
			})

			headercont.append(nextButton)
			container.append(headercont)
			//Create inner container
			let innerCont = document.createElement('div')
			innerCont.className = 'check-full-cont'

			container.append(innerCont)

			//Create the system score summary
			//Grab the score
			//flatten all checks for now
			let grade = this.GETsystemscore({
				...sys.checks.system,
				...sys.checks.cooling,
				...sys.checks.heating
			});

			this.score = grade.score
			this.data.checks[this.curIndex].score = grade.score
			console.log("Score is set", this.data, this.data.checks[this.curIndex].score)
	
			innerCont.append(this.GENERATEscoresummary(sys.name,grade.score))
			//Create the system summary
			innerCont.append(this.GENERATEsystemsummary(sys.name,grade))

			//Create the info container
			let infoContainer = document.createElement('div')
			infoContainer.className = 'float-container'
			infoContainer.id = "score-info-card-cont"
			let infoCard = document.createElement('div')
			infoCard.id = 'score-cat-info'
			let info_menubar = document.createElement('div')
			info_menubar.className = 'menubar'
			let info_title = document.createElement('div')
			info_title.className = "menubar-title"
			info_title.innerText = 'Category Title'
			info_title.id = 'score-cat-infoheader-title'
			info_menubar.append(info_title)
			let info_close = document.createElement('div')
			info_close.innerText = 'X'
			info_close.className = "menubar-close"
			info_menubar.append(info_close)
			info_close.addEventListener('click', ()=>{
				$(infoContainer).hide()
			})
			info_menubar.id = "score-cat-infoheader"
			infoCard.append(info_menubar)
			let info_content = document.createElement('div')
			info_content.className = 'content'
			info_content.id = "score-cat-info-content"
			info_content.innerHTML = "No information available."
			infoCard.append(info_content)
			infoContainer.append(infoCard)
			container.append(infoContainer)
			$(infoContainer).hide()
			

			return container
		}
		return false
	}

	/**
	 * Generate the score summary object for the designated system
	 * @param {String} sysname | the name of the system a score summary is being generated for
	 * @param {Object} score | the score object of the specified system
	 */
	GENERATEscoresummary = (sysname,score) => {
		let card = document.createElement('div');
		card.className = 'graph-card score-card'
		card.id = "score-card-"+sysname
		let menubar = document.createElement('div')
		menubar.className = 'menubar'
		menubar.innerHTML = "System Score"
		card.append(menubar)
		let content = document.createElement('div')
		content.className = 'content'
		card.append(content)

		let gaugeCont = document.createElement('div')
		gaugeCont.id = 'gauge-chart-cont' + sysname
		content.append(gaugeCont)

		//Create the system score title text
		let scoreTextCont = document.createElement('div')
		scoreTextCont.className = "score-summary-text"
		let scoreText = document.createElement('div')
		scoreText.className = "score-text"
		scoreText.innerHTML = "Your system scored a "

		let textContainer = document.createElement('div')
		textContainer.className = "gauge-chart-text"

		let scoreOutOf = document.createElement('div')
		scoreOutOf.className = "score-out-of"
		scoreOutOf.innerHTML = ` out of ${score.total}.`
		scoreTextCont.innerHTML = scoreText.innerHTML + `<span class = "score-actual ${score.grade}">${score.final}</span>` + scoreOutOf.innerHTML
		textContainer.append(scoreTextCont)

		let gradeText = document.createElement('div')
		gradeText.className = 'score-grade-text'
		gradeText.innerHTML = `System Grade: <span id ='score-grade-text-grade' class = '${score.grade}'>${score.grade}</span>`
		textContainer.append(gradeText)

		gaugeCont.append(textContainer)

		let graphCont = document.createElement("div")
		graphCont.className = "gauge-chart-graphs"
		graphCont.id = "gauge-chart-graphs"+ sysname
		gaugeCont.append(graphCont)

		let scoreSumCont = document.createElement('div')
		scoreSumCont.className = "score-summary-chart"
		scoreSumCont.id = "score-summary-chart-" + sysname
		content.append(scoreSumCont)

		//Add text description
		let descr = document.createElement('div')
		descr.className = "system-score-descr"

		scoreSumCont.append(this.DRAWstaticbarchart())

		/*let image = document.createElement('img')
		image.src = "/assets/images/chartlegendflipped.png"
		image.className = "chart-legend"
		graphCont.append(image)*/

		let legendcont = document.createElement("div")
		legendcont.className = "chart-legend"
		for (let key in grade_data) {
			let category = document.createElement('div')
			category.className = "chart-legend-item"
			let color = document.createElement('div')
			color.className = "chart-legend-color"
			color.style.backgroundColor = grade_data[key].color
			category.append(color)
			let title = document.createElement('div')
			title.className = "chart-legend-title"
			title.innerText = grade_data[key].title
			category.append(title)
			legendcont.append(category)
		}

		graphCont.append(legendcont)

		return card
	}

	/**
	 * Toggle the visibility of the category information card pop-up.
	 */
	TOGGLEinfocard() {
		if (this.infoActive == false) {
			let box = document.getElementById('score-cat-info')
			if (box) {
				box.style.display = 'absolute'
				this.infoActive = true
			}
		} else {
			let box = document.getElementById('score-cat-info')
			if (box) {
				box.style.display = 'none'
				this.infoActive = false
			}
		}
	}

	/**
	 * Creates the headers for each checklist group
	 * @param {String} title | the category name
	 * @param {Number} score | the score of the category in percent
	 * @param {String} className | the className given to the header
	 * @returns 
	 */
	GENERATEsystemheader(title, score, className) {
		let header = document.createElement('div')
		header.className = 'checklist-group-header'

		let colors = GetScoreColors(this.score)
		let outlines = GetScoreColors(this.score, true)

		let headerTitle = document.createElement('div')
		headerTitle.innerHTML = title
		headerTitle.className = 'checklist-group-header-title ' + className
		headerTitle.style.backgroundColor = colors[title.toLowerCase()]
		headerTitle.style.border = "1px solid " + outlines[title.toLowerCase()]
		header.append(headerTitle)
		let headerScore = document.createElement('div')
		if (isNaN(score)) {
			headerScore.innerHTML = "100%"
		} else {
			headerScore.innerHTML = score  + "%"
		}
		headerScore.style.backgroundColor = colors[title.toLowerCase()]
		headerScore.style.border = "1px solid " + outlines[title.toLowerCase()]
		headerScore.className = 'checklist-group-header-score ' + className
		header.append(headerScore)

		return header
	}

	/**
	 * Generate the system score summary by creating the container and generating a series of checklist summaries.
	 * @param {Object} sys | the system being summarized
	 * @param {Object} grade | the grade object for the provided system
	 */
	GENERATEsystemsummary = (sysname,grade) => {
		let card = document.createElement('div');
		card.className = 'graph-card collateral-card'
		card.id = "collateral-card-"+sysname
		let menubar = document.createElement('div')
		menubar.className = 'menubar'
		menubar.innerHTML = "System Summary"
		card.append(menubar)
		let content = document.createElement('div')
		content.className = 'content'
		card.append(content)
		
		for (let i in grade.list) { //for (loop through cl groups)
			//if (grade.score[i].grade != undefined) {
				let checklistGroup = document.createElement('div');
				checklistGroup.className = 'checklist-group'

				checklistGroup.append(this.GENERATEsystemheader(i, grade.score[i].graph))
				checklistGroup.append(this.GENERATEchecklistsummary(grade.list[i], sysname))

				content.append(checklistGroup)
			//}
			
		}
		//Do the scoring stuff here

		return card
		
	}

	/**
	 * Takes a checklist (heating>indoor, cooling>outdoor) and returns an HTML dom object which contains a summary
	 * of the scored items.
	 * @param {Object} cl | the current checklist
	 * @param {String} sysname | the name of thhe system the checklist is being created for
	 */
	GENERATEchecklistsummary = (cl, sysname) => {
		let cont = document.createElement('div')
		cont.className = 'checklist-category'
		let menubar = document.createElement('div')
		menubar.className = 'checklist-category-header'
		menubar.innerText = 'category'
		//cont.append(menubar)
		let content = document.createElement('div')
		content.className = 'checklist-category-items'
		for (let key in cl) {
			let checklistItem = document.createElement('div')
			checklistItem.className = 'summary-checklist-item ' + cl[key].grade
			checklistItem.append(document.createElement('div'));
			checklistItem.lastChild.innerText = cl[key].title;
			checklistItem.lastChild.className = 'summary-checklist-item-title'
			checklistItem.append(document.createElement('div'));
			checklistItem.lastChild.innerText = cl[key].value;
			checklistItem.lastChild.className = 'summary-checklist-item-value'
			checklistItem.append(document.createElement('div'));
			checklistItem.lastChild.innerText = cl[key].score;
			checklistItem.lastChild.className = 'summary-checklist-item-score'
			if (cl[key].grade != "" && cl[key].grade != undefined) {
				let string = JSON.parse(JSON.stringify(cl[key].grade)).replaceAll(' ', '')
				checklistItem.lastChild.classList.add(string+"-score")
			}
			//set grade

			content.append(checklistItem)
			
		}	
		cont.append(content)
		return cont;
	}

	/**
	 * ClickFunction of the bar chart bars.
	 * @param {String} title | the title of the category
	 */
	HANDLEselect = (title) => {
		let box = document.getElementById('score-info-card-cont')
		if (box.style.display == 'none') {
			/*dragElement(document.getElementById("score-cat-info"), "score-cat-infoheader");
			if (mousePos) {
				box.style.left = (mousePos.x + 10) + "px"
				box.style.top = (mousePos.y - 60) + "px"
			}*/
			$(box).show()
			this.CUSTOMIZEinfobox(title)
		} else {
			$(box).hide()
		}
	}

	/**
	 * Generate the gauge chart.
	 * @param {String} sysname | the name of the system.
	 */
	DRAWgaugechart = (sysname) => {
		let score = Math.floor(this.score.final / this.score.total * 100)
		let element = document.getElementById("gauge-chart-graphs"+ sysname)


		// Properties of the gauge
		let gaugeOptions = {
			hasNeedle: true,
			needleColor: 'gray',
			needleUpdateSpeed: 1000,
			arcColors: ['#de3b04', '#ff8800', '#ffd200','#edfe00','#00c602'],
			arcDelimiters: [35,49,65,85],
			rangeLabel: ['0', '100'],
			centralLabel: score + '%',
		}

		// Drawing and updating the chart
		GaugeChart.gaugeChart(element, 225, gaugeOptions).updateNeedle(score)
	}

	/**
	 * Generate a bar chart.
	 * @returns the generated bar chart
	 */
	DRAWstaticbarchart = () => {
		let cont = document.createElement('div')
		cont.className = "bar-chart-container"
		let colors = GetScoreColors(this.score)
		let data = [
			{
				label:"Comfort",
				percentage:this.score.comfort.graph,
				color:colors.comfort,
				id:"comfort"+this.curIndex,
				labelType:"in"
			},
			{
				label:"Efficiency",
				percentage:this.score.efficiency.graph,
				color:colors.efficiency,
				id:"efficiency"+this.curIndex,
				labelType:"in"
			},
			{
				label:"Reliability",
				percentage:this.score.reliability.graph,
				color:colors.reliability,
				id:"reliability"+this.curIndex,
				labelType:"in"
			}
		]

		for (let i = 0; i < data.length; i++) {
			//UNCOMMENT TO HIDE BLANK SYSTEMS
			//if (!isNaN(data[i].percentage)) {
				cont.append(this.DRAWbar(data[i]))
			//}
		}

		return cont
	}

	/**
	 * Draw a bar for the bar chart.
	 * @param {Object} data | a bar chart data object
	 * @returns the generated bar for the bar chart
	 */
	DRAWbar(data) {
		let barCont = document.createElement('div')
		barCont.id = data.id + "-cont"
		barCont.className = "bar-chart-bar-cont"
		let bar = document.createElement('div')
		bar.id = data.id
		bar.className = "bar-chart-bar"
		bar.style.backgroundColor = data.color
		bar.setAttribute('background-color',data.color)
		let score = document.createElement('div')
		score.className = 'bar-chart-bar-score'
		score.innerHTML = data.percentage + "%"
		barCont.append(score)

		let label = document.createElement('div')
		if (data.labelType == "in") {
			bar.append(label)
		} else {
			barCont.append(label)
		}
		label.innerHTML = data.label
		label.className = "bar-chart-bar-label"
		barCont.append(bar)
		let width = data.percentage +"%"
		bar.style.width = width

		bar.addEventListener('click',()=>{
			this.HANDLEselect(data.label)
		})

		let tickCont = document.createElement('div')
		tickCont.className = 'bar-chart-tick-cont'

		for (let i = 0; i < 4;i++) {
			let tick = document.createElement('div')
			tick.className = 'tick'
			tick.id = i
			tickCont.append(tick)
		}

		barCont.append(tickCont)

		return barCont
	}

	/**
	 * Customize the floating category information box.
	 * @param {String} id | the category title
	 */
	CUSTOMIZEinfobox = (id) => {
		let title = document.getElementById("score-cat-infoheader-title")
		let descr = document.getElementById('score-cat-info-content')
		title.innerText = catdescr[id].title
		descr.innerHTML = `<div id = "score-cat-info-gradedesc">The ${id} of your system has been graded as: <span>${this.score[id.toLowerCase()].grade}</span></div>` + catdescr[id].descr[this.score[id.toLowerCase()].grade]
	}
}