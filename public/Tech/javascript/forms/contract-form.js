import {VHCform} from 'https://www.vhpportal.com/repo/tools/vhc-forms.js';

const dom = {// was cntrctform
    cont: 'contract-cont',
    fields:{
      id: 'contract-id',
      origid: 'contract-origid',
      renewid: 'contract-renewid',
      datefrom: 'contract-datefrom',
      dateto: 'contract-dateto',
      datesign: 'contract-datesign',
      datestart: 'contract-datestart',
      type: 'contract-type',
      status: 'contract-status',
      billings: 'contract-billings',
      visits: 'contract-visits',
      value: 'contract-value'
    }
  }

const content=`
  <div id=${dom.cont} class='ft-form'>
      <div class="contract-opt">
          <div>Contract ID</div><input class=${dom.fields.id} placeholder="id">
      </div>
      <div class="contract-opt">
          <div>Original ID</div><input class=${dom.fields.origid} placeholder="origid">
      </div>
      <div class="contract-opt">
          <div>Renewal ID</div><input class=${dom.fields.renewid} placeholder="renewid">
      </div>
      <div class="contract-opt">
          <div>Date From</div><input class=${dom.fields.datefrom} placeholder="datefrom">
      </div>
      <div class="contract-opt">
          <div>Date To</div><input class=${dom.fields.dateto} placeholder="dateto">
      </div>
      <div class="contract-opt">
          <div>Date Signed</div><input class=${dom.fields.datesign} placeholder="datesign">
      </div>
      <div class="contract-opt">
          <div>Member Since</div><input class=${dom.fields.datestart} placeholder="datestart">
      </div>

      <div class="contract-opt">
          <div>Contact Type</div><input class=${dom.fields.type} placeholder="type">
      </div>
      <div class="contract-opt">
          <div>Contract Status</div><input class=${dom.fields.status} placeholder="status">
      </div>
      <div class="contract-opt">
          <div>Num of Billings</div><input class=${dom.fields.billings} placeholder="billings">
      </div>
      <div class="contract-opt">
          <div>Num of Visits</div><input class=${dom.fields.visits} placeholder="visits">
      </div>
      <div class="contract-opt">
          <div>Contract Value</div><input class=${dom.fields.value} placeholder="value">
      </div>
  </div>
  `

export let conform = {
  dom:dom,
  content:content
}
