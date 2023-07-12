let dom = {
    info:{
        customername: 'presentation-info-client',
        street: 'presentation-info-street',
        cityzip: 'presentation-info-city',
        jstreet: 'presentation-info-lstreet',
        jcity: 'presentation-info-lcity',
        description: 'presentation-info-desc',
        monthlyplan: 'presentation-monthly-plan',
        addsystems: 'presentation-add-systems',
        addcomponents: 'presentation-add-components',
        standardfilters: 'presentation-standard-filters',
        humservice: 'presentation-hum-service',
        specfilters: 'presentation-spec-filters',
        timedisc: 'presentation-time-disc'
    },
    repairs:{
        repairtable:"repair-table"
    }
}
let data = {
    monthlyplan:'NO',
    addsystems:0,
    addcomponents:0,
    standardfilters:0,
    humservice:0,
    specfilters:0,
    timedisc:0,
};
let content = `
    <div class="summary-header">
        <div id="title-header">Presentation Summary</div>
    </div> 
    <div class="invoice-top">
        <div class="invoice-section-client">
            <div class="invoice-sectionhead">SOLD TO:</div>
            <div>
                <div class="${dom.info.customername}">Client Name</div>
                <div class="${dom.info.street}">1234 Street Dr</div>
                <div class="${dom.info.cityzip}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-location">
            <div class="invoice-sectionhead">JOB LOCATION:</div>
            <div>
                <div class="${dom.info.jstreet}">1234 Street Dr</div>
                <div class="${dom.info.jcity}">Anyplace, MO 60000</div>
            </div>
        </div>
        <div class="invoice-section-info" id = "summary-objects">
                <label class="invoice-sectionlabel">Monthly Plan:</label><div class="${dom.info.monthlyplan}">${data.monthlyplan}</div>
                <label class="invoice-sectionlabel">Additional Systems:</label><div class="${dom.info.addsystems}">${data.addsystems}</div>
                <label class="invoice-sectionlabel">Additional Components:</label><div class="${dom.info.addcomponents}">${data.addcomponents}</div>
                <label class="invoice-sectionlabel">Standard Filters:</label><div class="${dom.info.standardfilters}">${data.standardfilters}</div>
                <label class="invoice-sectionlabel">Humidifier Service/Pad:</label><div class="${dom.info.humservice}">${data.humservice}</div>
                <label class="invoice-sectionlabel">Specialty Filters:</label><div class="${dom.info.specfilters}">${data.specfilters}</div>
                <label class="invoice-sectionlabel">Time Saver Discount:</label><div class="${dom.info.timedisc}">${data.timedisc}</div>
        </div>
    </div>
    <div class="invoice-body">
        <div class="invoice-descbox">
            <div class="invoice-sectionhead">Repairs Applied</div>
            <div class="wo-present-headers">
                <div>Services & Repairs</div>
                <div id = "price-select">Regular</div>
                <div id = "member-label">Member</div>
                <div>Savings</div>
                <div>Approval</div>
            </div>
            <div class = "${dom.repairs.repairtable}" id = "repairs-table"></div>
        </div>
    </div>
    <img id='header-logo'src="../bin/repo/assets/images/Header_clean.png"/>
    <div class="pagebreak"> </div>
`

export var basicsummary ={
    dom:dom,
    content:content,
    data: data
}