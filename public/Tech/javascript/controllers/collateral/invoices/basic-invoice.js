let dom = {
    info:{
        customername: 'invoice-info-client',
        street: 'invoice-info-street',
        cityzip: 'invoice-info-city',
        jstreet: 'invoice-info-lstreet',
        jcity: 'invoice-info-lcity',
        invnum: 'invoice-info-invnum',
        invdate: 'invoice-info-invdate',
        terms: 'invoice-info-terms',
        custcode: 'invoice-info-custcode',
        id: 'invoice-info-wonum',
        location: 'invoice-info-location',
        total: 'invoice-info-total',
        descr: 'invoice-info-description',
        tech: 'invoice-info-tech'
    },
    repairs:{
        repairtable:'invoice-repair-table'
    }
}
let content = `
    <img id='header-logo'src="https://www.vhpportal.com/repo/assets/images/Header_clean.png"/>
    <div class="invoice-top">
        <div class="invoice-section-client">
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
        <div class="invoice-section-info">
            <label class="invoice-sectionlabel">Invoice Number:</label><div class="${dom.info.invnum}">Test</div>
            <label class="invoice-sectionlabel">Invoice Date:</label><div class="${dom.info.invdate}">Test</div>
            <label class="invoice-sectionlabel">Terms:</label><div class="${dom.info.terms}">COD</div>
            <label class="invoice-sectionlabel">Customer Code:</label><div class="${dom.info.custcode}">Test</div>
            <label class="invoice-sectionlabel">Work Order #:</label><div class="${dom.info.id}">Test</div>
            <label class="invoice-sectionlabel">Location:</label><div class="${dom.info.location}"></div>
            <label class="invoice-sectionlabel">Tech:</label><div class="${dom.info.tech}"></div>
        </div>
    </div>
    <div class="invoice-middle" id = "description-cont">
        <div class="invoice-sectionhead">Service Notes:</div>
        <div class="invoice-desccont">
            <div class="${dom.info.descr}" id = "jonas-descr">This does not need to be here</div>
            <div class="descr-hardcode">Reviewed Two Comfort Paths with homeowner for todays service.  Homeowner selected best path for them and this can be reviewed below.  </div>
        </div>
    </div>
    <div class="invoice-body">
        <div class="invoice-descbox">
            <div class="wo-present-headers">
                <div>Services & Repairs</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Approval</div>
            </div>
            <div class = "${dom.repairs.repairtable}"></div>
        </div>
        <div class="invoice-totals">
            <div class = "signature-box" id = "sig-insert">

            </div>
            <div class = "invoice-totals-box">
                <div>

                </div>
                <div>
                    <label class="invoice-sectionlabel">Total Invoice</label>
                    <div class="${dom.info.total}">420.00</div>
                </div>
            </div>
        </div>
        <div class="footer-header">Invoice Summary</div>
    </div>


    <div class="pagebreak"></div>
`

export var basicinvoice ={
    dom:dom,
    content:content
}
