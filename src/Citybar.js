import React from "react";

const Citybar = (props) => {
    
    return (
        <div>
            <h2>Select city</h2>
            <button onClick={ props.setCity } value={ "tampere" }>Tampere</button>
            <button onClick={ props.setCity } value={ "helsinki" }>Helsinki</button>
            <button onClick={ props.setCity } value={ "turku" }>Turku</button>
        </div>

    );
}


export default Citybar;