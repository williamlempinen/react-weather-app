import { setAVGToday, setAVGTomorrow, setAVGDayAfterTomorrow, findIndex } from "./Functions";

const ThreeDayView = (props) => {
    return (
        <div className="three-days">
          <h2 className="three-date">{ props.todaydate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGToday(props.tempData)) }℃</p>
          <p className="three-icon">{ props.listOfIcons[findIndex(props.weatherKey1)] }</p>
          <p className="description-three">{ props.listOfDescriptions[findIndex(props.weatherKey1)] }</p>

          <h2 className="three-date">{ props.tomorrowdate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGTomorrow(props.tempData)) }℃</p>
          <p className="three-icon">{ props.listOfIcons[findIndex(props.weatherKey2)] }</p>
          <p className="description-three">{ props.listOfDescriptions[findIndex(props.weatherKey2)] }</p>

          <h2 className="three-date">{ props.dayAfterTomorrowdate }</h2>
          <p className="avg-temp">Average temperature { Math.round(setAVGDayAfterTomorrow(props.tempData)) }℃</p>
          <p className="three-icon">{ props.listOfIcons[findIndex(props.weatherKey3)] }</p>
          <p className="description-three">{ props.listOfDescriptions[findIndex(props.weatherKey3)] }</p>
        </div>

    );
}

export default ThreeDayView;