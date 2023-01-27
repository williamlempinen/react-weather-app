import { findIndex } from "./Functions";

const OneDayView = (props) => {
    return (
        <div>
          <h5>{ props.todaydate }</h5>
          <div className="one-day">
            <div>
              <p className="icon-one">{ props.listOfIcons[findIndex(props.weatherKey1)] }</p>
              <p className="description-one">{ props.listOfDescriptions[findIndex(props.weatherKey1)] }</p>
            </div>
            <p className="temperature">{ Math.round(props.tempData[props.hour]) }℃</p>
            </div>
        </div>
    );
}

export default OneDayView;