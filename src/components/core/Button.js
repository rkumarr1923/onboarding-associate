import "./../styles/button.css";
import React from "react";

const Button = ({label = 'label'}) => {
    return (
      <button className="primary-button"> 
        <p className="button-text">{label}</p>
      </button>
    );
}

export default Button

