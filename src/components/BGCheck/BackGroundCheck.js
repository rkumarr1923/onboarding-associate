import React from 'react';
import FormDatePickerField from '../core/FormDatePickerField';
import { useState, useEffect } from "react";

const BackgroundCheck = ({ }) => {  

const sendEmail = () => {
  window.open("mailto:sanaru53@in.ibm.com?subject=SendMail&body=Description");
  //mailtoHref = "mailto:sanaru53@in.ibm.com?subject=SendMail&body=Description";
  //window.open('https://outlook.office.com/mail?subject=SUBJECT&body=BODY&to=sanaru53@in.ibm.com')
};


    return (

      
        <div>

    
  
          <header style={{textAlign: "center" ,color: 'red',fontWeight: 'bold'}}> Background Check</header>
          <body style={{textAlign: "center"}}> 
          <text>
          <l1 >As a part of IBM process we need to initiate BGC, hence please send me your duly filled <br/></l1>
          </text >
          </body>
          <body style={{textAlign: "center"}}> 
          <text>
              <l1>(need to capture appropriate details with the below details),  signed and scanned ODC form <br/> </l1> 
        </text >
        </body>
        <body style={{textAlign: "center"}}>
          <text>
       <l1 style={{ color: 'red',fontWeight: 'bold' }}>(due to covid situation you can share excel ODC from directly via mail and only if you have printer at home you can share signed and scanned copy) </l1><br/>
        </text>
        </body>

        <body style={{textAlign: "center"}}>
          <text>  
            This is MANDATORY as this is the part of the client requirement for background verification check. <br/>
           </text>
           </body> 
            <body style={{textAlign: "center"}}>
          <text> 
            <l1 style={{textAlign: "center"}}>    Please revert with the details by   
            <div className='d-flex-center'>
              <FormDatePickerField
                md="2"
                label="Date"
                text-align="center"
              />
            </div>
             eod.<br/>
            <button
              type="button"
              className="btn btn-danger"
              onClick={sendEmail}
            >
              Send email
            </button>
            </l1>
            </text>
            </body>
            <body style={{textAlign: "center"}}>
            <text>
            <l1 style={{ color: 'red',fontWeight: 'bold' }}> Please Note: While sharing your details, please share only to me and dont keep any one in CC as your information is confidential.</l1><br/>
            
            </text>
            </body>
           

            <body style={{textAlign: "center"}}>
            <text>
            <span style={{fontWeight: 'bold'}}> Practitioner greater than or equal 7 years with IBM </span><br/>
             I.ODC Application Form<br/>
            II.Passport Copy<br/>
           III.Pan Card Copy<br/>
            IV.Last 7 Year Address Details.<br/>
            </text>
            </body>
            <body style={{textAlign: "center"}}>
            <text>
            <span style={{fontWeight: 'bold'}}> Practitioner less than 7 years with IBM </span><br/>
 
            I.ODC Application Form - excel sheet can be shared due to covid-19<br/>
            II.Passport Copy - front and back<br/>
            III.Pan Card Copy<br/>
            IV.Last 7 Years Address details<br/>
            V.Last 7 Years Employment Details with Proof.<br/> 
            </text>
            </body>  
            <body style={{textAlign: "center"}}>
            <text>          
            Do get in touch with Santosh Armugum in case you need any clarification.<br/>
   </text>
   </body>
</div>
    )
}

export default BackgroundCheck;