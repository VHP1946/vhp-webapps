// service item information

const dom={
  cont: 'si-form',
  fields: {
    id: 'si-id',//
    tagid: 'si-tagnum',//
    area: 'si-area', //
    beltsize: 'si-beltsize',//
    controls: 'si-controls',
    descr: 'si-descr',//

    elec: 'si-elec',
    filt1: 'si-filt1',//
    filt1q: 'si-filt1q',//
    filt2: 'si-filt2',//
    filt2q: 'si-filt2q',//
    location: 'si-location',//
    manf: 'si-manf',//
    model: 'si-model',//
    refri: 'si-refri',//
    serial: 'si-serial',//
    status: 'si-status',
    type: 'si-type',
    warr1: 'si-warr1',//
    warr2: 'si-warr2',//
    warr3: 'si-warr3',//
    expry1: 'si-expry1',//
    expry2: 'si-expry2',//
    expry3: 'si-expry3'//
  }
}
const content=`
  <div id=${dom.cont} class='ft-form'>
    <div class="si-basics">
      <div class="si-item">
        <div>Item ID</div><input class=${dom.fields.id} placeholder="id">
      </div>
      <div class="si-item">
        <div>Tag Num</div><input class=${dom.fields.tagid} placeholder="tagnum">
      </div>
      <div class="si-item">
        <div>Description</div><input class=${dom.fields.descr} placeholder="descr">
      </div>
      <div class="si-item">
        <div>Model Num</div><input class=${dom.fields.model} placeholder="model">
      </div>
      <div class="si-item">
        <div>Serial Num</div><input class=${dom.fields.serial} placeholder="serial">
      </div>
      <div class="si-item">
        <div>Brand</div><input class=${dom.fields.manf} placeholder="manf">
      </div>
      <div class="si-item">
        <div>Location</div><input class=${dom.fields.location} placeholder="location">
      </div>
      <div class="si-item">
        <div>Area Served</div><input class=${dom.fields.area} placeholder="area">
      </div>
      <div class="si-item">
        <div>Controls</div><input class=${dom.fields.controls} placeholder="controls">
      </div>
      <div class="si-item">
        <div>Electrical</div><input class=${dom.fields.elec} placeholder="elec">
      </div>
      <div class="si-item">
        <div>Status</div><input class=${dom.fields.status} placeholder="status">
      </div>
      <div class="si-item">
        <div>Type</div><input class=${dom.fields.type} placeholder="type">
      </div>
    </div>
    <div class="si-materials">
      <div class="si-item">
        <div>Filter Type 1</div><input class=${dom.fields.filt1} placeholder="filt1">
      </div>
      <div class="si-item">
        <div>Filter Qty 1</div><input class=${dom.fields.filt1q} placeholder="filt1q">
      </div>
      <div class="si-item">
        <div>Filter Type 2</div><input class=${dom.fields.filt2} placeholder="filt2">
      </div>
      <div class="si-item">
        <div>Filter Qty 2</div><input class=${dom.fields.filt2q} placeholder="filt2q">
      </div>
      <div class="si-item">
        <div>Belt Size</div><input class=${dom.fields.beltsize} placeholder="beltsize">
      </div>
      <div class="si-item">
        <div>Refrigerant</div><input class=${dom.fields.refri} placeholder="refri">
      </div>
    </div>
    <div class="si-warranties">
      <div class="si-item">
        <div>Parts Warranty</div><input class=${dom.fields.warr1} placeholder="warr1">
      </div>
      <div class="si-item">
        <div>Labor Warranty</div><input class=${dom.fields.warr2} placeholder="warr2">
      </div>
      <div class="si-item">
        <div>Addl Warranty</div><input class=${dom.fields.warr3} placeholder="warr3">
      </div>
      <div class="si-item">
        <div>Parts Expires</div><input class=${dom.fields.expry1} placeholder="expry1">
      </div>
      <div class="si-item">
        <div>Labor Expires</div><input class=${dom.fields.expry2} placeholder="expry2">
      </div>
      <div class="si-item">
        <div>Addl Expires</div><input class=${dom.fields.expry3} placeholder="expry3">
      </div>
    </div>
  </div>
`

export let siform = {
  dom:dom,
  content:content
}
