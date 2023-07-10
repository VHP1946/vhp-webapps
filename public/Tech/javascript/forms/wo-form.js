
import {VHCform} from 'https://www.vhpportal.com/repo/tools/vhc-forms.js';

const dom={  // was wodom
  cont: 'wo-cont',
  fields: {
      id: 'wo-info-id',
      custcode: 'wo-info-custcode',
      customername: 'wo-info-name',
      contactphone: 'wo-info-phone',
      contactemail: 'wo-info-email',

      street: 'wo-info-street',
      unit: 'wo-info-unit',
      cityzip: 'wo-info-city',
      state: 'wo-info-state',

      salesrep: 'wo-info-salesrep',
      takenby:'wo-info-takenby',
      dept: 'wo-info-dept',
      cat:'wo-info-cat',
      jobref:'wo-info-jobref',
      conref:'wo-info-conref',
      ref:'wo-info-ref',

      status:'wo-info-status',

      pricebook: 'wo-info-pricebook',
      pricelevel: 'wo-info-pricelevel',

      descr:'wo-info-descr'
  },
  label:{
      id: 'wo-label-id',
      custcode: 'wo-label-custcode',
      customername: 'wo-label-name',
      contactphone: 'wo-label-phone',
      contactemail: 'wo-label-email',

      street: 'wo-label-street',
      unit: 'wo-label-unit',
      cityzip: 'wo-label-city',
      state: 'wo-label-state',

      salesrep: 'wo-label-salesrep',
      takenby:'wo-label-takenby',
      dept: 'wo-label-dept',
      cat:'wo-label-cat',
      jobref:'wo-label-jobref',
      conref:'wo-label-conref',
      ref:'wo-label-ref',

      status:'wo-label-status',

      pricebook: 'wo-label-pricebook',
      pricelevel: 'wo-label-pricelevel',

      descr:'wo-label-descr'
  }
}
const content=`
<div id="${dom.cont}" class="wo-info-cont">
    <div class="${dom.fields.id}"></div>
    <div class="${dom.fields.custcode}"></div>

    <div class="wo-contact-cont">
      <div class="${dom.fields.customername}"></div>
      <div class="${dom.fields.contactphone}"></div>
      <input class="${dom.fields.contactemail}" placeholder="Enter customer email"></input>
      <div class="${dom.fields.street}"></div>
      <div class="${dom.fields.unit}"></div>
      <div class="${dom.fields.cityzip}"></div>
      <div class="${dom.fields.state}"></div>
    </div>
    <div class="wo-reference-cont">
      <div class="${dom.label.salesrep}">Sales Rep:</div><div class="${dom.fields.salesrep}"></div>
      <div class="${dom.label.takenby}">Taken By:</div><div class="${dom.fields.takenby}"></div>
      <div class="${dom.label.dept}">Depart:</div><div class="${dom.fields.dept}"></div>
      <div class="${dom.label.cat}">Category:</div><div class="${dom.fields.cat}"></div>
      <div class="${dom.label.ref}">Reference:</div><div class="${dom.fields.ref}"></div>
      <div class="${dom.label.status}">Status:</div><div class="${dom.fields.status}"></div>
      <div class="${dom.label.jobref}">Job Ref.:</div><div class="${dom.fields.jobref}"></div>
      <div class="${dom.label.conref}">Contract:</div><div class="${dom.fields.conref}"></div>
    </div>
    <div class="wo-pricing-cont">
      <div class="${dom.label.pricebook}">Price Book:</div><div class="${dom.fields.pricebook}"></div>
      <div class="${dom.label.pricelevel}">Price Level:</div>
      <select class="${dom.fields.pricelevel}"/>
        <option value='STA'>STA</option>
        <option value='CLA'>CLA</option>
        <option value='PRE'>PRE</option>
        <option value='ULT'>ULT</option>
      <select>
    </div>
    <textarea class="${dom.fields.descr}"></textarea>
</div>

<datalist id='price-levels'>
  <option value='STA'>
  <option value='CLA'>
  <option value='PRE'>
  <option value='ULT'>

</datalist>
`;

export let woform = {
  dom:dom,
  content:content
}
