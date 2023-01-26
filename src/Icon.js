const Icon = (props) => {
    
    
    return (
        <div>
            {/* tested with the value 51 because it was the current weathercode when debugging */}
            { props.code === 51
              ? listOfIcons[3]
              : listOfIcons[7] }
        </div>
    );
}

export default Icon;