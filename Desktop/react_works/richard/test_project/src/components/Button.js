import React from 'react';
import '../components_styling/button.css';

const Button = ({title, color, textColor, clickHandler, downloadHandler, showGraph}) => {
    
    const buttonProps = {
        backgroundColor: color,
        color: textColor
    };
    
    return (
        <>
           <button className="button" style={buttonProps} onClick={!showGraph ? clickHandler : downloadHandler}>{title}</button> 
        </>
    );
}

export default Button;































