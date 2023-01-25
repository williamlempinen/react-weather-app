const Citybar = (props) => {
    return (
        <div>
            <h2>Select city</h2>
            <div className="buttons">
                <button onClick={ props.setCity } value={ "tampere" }>Tampere</button>
                <button onClick={ props.setCity } value={ "helsinki" }>Helsinki</button>
                <button onClick={ props.setCity } value={ "turku" }>Turku</button>
                <button onClick={ props.setContent }>Show weather for the next three days</button>
            </div>
        </div>
    );
}

export default Citybar;