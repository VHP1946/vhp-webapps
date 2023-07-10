export class EmailForm {
    constructor(name){
        this.name = name
    }

    GETcontent() {
      return `<body id = "email-body">
      <style>
        body, table, td, a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          -webkit-text-size-adjust: 100% !important;
          -ms-text-size-adjust: 100% !important;
          -webkit-font-smoothing: antialiased !important;
          font-family: Arial, Helvetica, sans-serif;
        }
        table, td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        table {
          
          mso-table-lspace: 0px !important;
          mso-table-rspace: 0px !important;
        }
        td {
          
          mso-line-height-rule: exactly;
          font-family: Arial, Helvetica, sans-serif;
        }
      </style>
      <table cellpadding="0" cellspacing="0">
        <tr><td><h3>Dear <span id="client-name" className = "client-name-title">${this.name}</span>,</h3>
        </td></tr>
        <tr><td><table cellpadding="0" cellspacing="0" width="100%">
        <tr><td>
          <p>Thank you for allowing our company a chance to service the AIR your Family experiences where you live, breathe, sleep and spend time together!</p>
          <p>Our technician prepared this invoice, summary of recommendations, and system diagnostic report for your records.</p>
          <p>Please feel free to reach out to us if you have any questions by calling 314-351-2533 opt. 2</p>
          <p>Thank you again for choosing our company.   We trust that we’ve delivered the best possible comfort for you and your home.  Please consider sharing your experience with us by leaving a <a href="http://search.google.com/local/writereview?placeid=ChIJNWbEZtzU3ocRUMVCWy7ldq4">review.</a></p>
          <a href="https://www.vogelheating.com/">Vogel Heating & Cooling</a>
        </td></tr>
        </table></td></tr>
        <tr><td>
          
        </td></tr>
      </table>
	<div style="font-size:20px; margin-top:40px; padding-bottom:20px;">Sincerely,</div>
          <div style="font-weight: bolder;font-style: italic; font-size:30px; padding-top:0px; margin-block-end: 0px;">
            John Vogel
          </div>
      </body>`
    }
}