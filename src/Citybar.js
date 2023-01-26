const Citybar = (props) => {
    return (
        <div>
            <h2>Select city</h2>
            <div className="buttons">
                <button onClick={ props.setCity } value={ "tampere" }>Tampere</button>
                <button onClick={ props.setCity } value={ "helsinki" }>Helsinki</button>
                <button onClick={ props.setCity } value={ "turku" }>Turku</button>
                <button onClick={ props.setContent } value={ props.multiple }>
                    {props.multiple
                    ? "1 day"
                    : "3 days"}
                </button>
            </div>
        </div>
    );
}

export default Citybar;