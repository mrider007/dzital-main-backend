import React from "react";
// import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
// import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
// import "@syncfusion/ej2-base/styles/material.css";
// import "@syncfusion/ej2-inputs/styles/material.css";
// import "@syncfusion/ej2-buttons/styles/material.css";
// import "@syncfusion/ej2-layouts/styles/material.css";


  const ChannelForm = (props) => {
  const { setInCall, setChannelName } = props;
  
  return (
      <div className="e-card wrapper">
  	<div className="wrapper-inner">
    	 <h1 className="heading">Join a Meeting</h1>
    	 <form className="join">
      	  <input
        	 type="text"
        	 placeholder="Enter Channel Name"
        	 floatLabelType="Auto"
        	 onChange={(e) => setChannelName(e.target.value)}
        	//  cssClass="e-outline"
      	  />
      	  <button
        	 type="submit"
        	//  cssClass="e-info"
        	//  style={{ fontSize: "18px", padding: "10px 20px" }}
        	 onClick={(e) => { e.preventDefault();
          	   setInCall(true);
        	  }}
      	   >
        	Join
      	   </button>
    	 </form>
       </div>
     </div>
  );
};
export default ChannelForm;