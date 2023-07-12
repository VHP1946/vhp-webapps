const dom = {
    cont: 'heating-rewards',
    fields: {
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
        in_heat_elecheatop:'elecheatop',
        in_heat_hplockout: 'hplockout'
    },
    valids: {}
}

const content = `
      <div class="checklist-cont" class="heating-rewards">
          <div class="outer-section-cont">
              <div class="checklist-section" id = "in-heat">
                  <div class="main-section-header">Indoor</div>
                  <div class="section-cont">
                      <div class="checklist-card" id="in-heat-heating">
                          <div class="section-header">Heating</div>
                          <div class="section-cont">
                              <div class="checklist-item">
                                  <div>Heat Rise - Rated</div><input class="${dom.fields.in_heat_hriserated}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Rise - Actual</div><input class="${dom.fields.in_heat_hriseactual}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Supply</div><input class="${dom.fields.in_heat_gpin}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Manifold (Hi)</div><input class="${dom.fields.in_heat_gpouthigh}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Gas Pressure - Manifold (Low)</div><input class="${dom.fields.in_heat_gpoutlow}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Flame Sensor Current (Checked Pilot Assembly)</div>
                                  <div class="checklist-item multi-item">
                                    <label class="checkbox-container">
                                        <input class="${dom.fields.in_heat_pilotasmbly}" type="checkbox">
                                        <span class="checkmark"></span>
                                    </label>
                                    <input class="${dom.fields.in_heat_flmsensor}" type="number">
                                  </div>
                              </div>
                              <div class="checklist-item">
                                  <div>Ignition Operation</div>
                                  <select class="${dom.fields.in_heat_ignitionop}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Operation</div>
                                  <select class="${dom.fields.in_heat_combustop}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Flue Safety</div>
                                  <select class="${dom.fields.in_heat_fluesafety}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Inducer Motor Operations</div>
                                  <select class="${dom.fields.in_heat_inducerops}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="Failed - Furnace Tagged">Failed - Furnace Tagged</option>
                                    <option value="Recommended">Recommended</option>
                                  </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test O2 %</div><input class="${dom.fields.in_heat_testO2}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test PPM</div><input class="${dom.fields.in_heat_testCO}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test Efficiency %</div><input class="${dom.fields.in_heat_testeffic}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test CO2 PPM</div><input class="${dom.fields.in_heat_testCO2}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Combustion Test Stack Temp</div><input class="${dom.fields.in_heat_stacktemp}" type="number">
                              </div>
                              <div class="checklist-item">
                                  <div>Heat Exchanger</div>
                                  <select class="${dom.fields.in_heat_heatex}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Pass">Pass</option>
                                    <option value="Failed - Tagged">Failed - Tagged</option>
                                </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Electrical Connections Secured</div>
                                  <select class="${dom.fields.in_heat_elecin}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Yes">Yes</option>
                                    <option value="Repairs Needed">Repairs Needed</option>
                                  </select>
                              </div>
                              <div class="checklist-item">
                                  <div>Electric Heat Operation</div>
                                  <select class="${dom.fields.in_heat_elecheatop}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Operational">Operational</option>
                                    <option value="Worn & Doubtful">Worn & Doubtful</option>
                                    <option value="Failed">Failed</option>
                                    <option value="N/A">N/A</option>
                                </select>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="checklist-section" id = "ou-heat">
                  <div class="main-section-header">Outdoor</div>
                  <div class="section-cont">
                      <div class="checklist-card" id="ou-heat-heatpumps">
                          <div class="section-header">Heat Pumps</div>
                          <div class="section-cont">
                            <div class="checklist-item">
                                <div>Heat Pump Heat Rise - Rated</div><input class="${dom.fields.in_heat_hpriserated}" type="number">
                            </div>
                            <div class="checklist-item">
                                <div>Heat Pump Heat Rise - Actual</div><input class="${dom.fields.in_heat_hpriseactual}" type="number">
                            </div>
                            <div class="checklist-item">
                                <div>Heat Pump Outdoor Coil</div>
                                <select class="${dom.fields.in_heat_outdoorcoil}">
                                    <option value="" selected>Choose One</option>
                                    <option value="Clean">Clean</option>
                                    <option value="Needs Cleaning">Needs Cleaning</option>
                                    <option value="Leak Detected">Leak Detected</option>
                                    <option value="Damaged">Damaged</option>
                                </select>
                            </div>
                            <div class="checklist-item">
                                  <div>Heat Pump Lockout Temperature</div><input class="${dom.fields.in_heat_hplockout}" type="number">
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    <datalist id='cond-condition'>
        <option value="" disabled selected>Choose One</option>
        <option value='Clean'>
        <option value='Needs Cleaning'>
        <option value='Leak Detected'>
        <option value='Damaged'>
    </datalist>
    <datalist id='wear-tear'>
        <option value="" disabled selected>Choose One</option>
        <option value='Operational'>
        <option value='Worn & Doubtful'>
        <option value='Failed'>
        <option value='Failed - Furnace Tagged'>
        <option value='Recommended'>
    </datalist>
    <datalist id='needs-repairs'>
        <option value="" disabled selected>Choose One</option>
        <option value='Yes'>
        <option value='Repairs Needed'>
    </datalist>
  `
export var heatingchecks ={
    dom:dom,
    content:content
}