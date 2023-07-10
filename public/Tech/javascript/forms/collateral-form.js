import { VHCform } from "https://www.vhpportal.com/repo/tools/vhc-forms.js";



export class CollateralForm extends VHCform{
  constructor(cont,info){
    super({
      cont:cont,
      content:info.content,
      dom:info.dom
    });
    //loop through info.dom.info
  }
}
