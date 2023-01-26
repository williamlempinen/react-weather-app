const Icon = (props) => {
    const listOfIcons = [
        <i className="fa-solid fa-sun"></i>, //*0, clear sky
        <i className="fa-solid fa-cloud-sun"></i>, //*1-3, mainly clear
        <i className="fa-solid fa-cloud"></i>, //*45-48, cloudy
        <i className="fa-solid fa-cloud-rain"></i>, //*51-67, rain
        <i className="fa-solid fa-snowflake"></i>, //* 71-77, snow
        <i className="fa-solid fa-cloud-showers-water"></i>, //* 80-86, rain showers
        <i className="fa-solid fa-cloud-bolt"></i>, //*95-99, thunderstorm
        <i className="fa-solid fa-bug"></i> //*bug
    ];
    
    return (
        <div>
            { props.code === 51 && listOfIcons[3] }
        </div>
    );
}

export default Icon;