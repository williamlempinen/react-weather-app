//* functions to find the average temperature for three-day display
function setAVGToday(list) {
    let listt = list.slice(0, 24);
    let sum = 0; 
    for (let i = 0; i < listt.length; i++) {
      sum += listt[i];
    }
    return sum/listt.length;
  }
  function setAVGTomorrow(list) {
    let listS = list.slice(24,48);
    let sum = 0; 
    for (let i = 0; i < listS.length; i++) {
      sum += listS[i];
    }
    return sum/listS.length;
  }
  function setAVGDayAfterTomorrow(list) {
    let lista = list.slice(48,72);
    let sum = 0; 
    for (let i = 0; i < lista.length; i++) {
      sum += lista[i];
    }
    return sum/lista.length;
  }

//*function to find correct icon and description
let listIndex;
function findIndex(key) {
  if ( key === 0 ) {
    listIndex = 0;
  } else if ( key <= 5 && key > 0 ) {
    listIndex = 1;
  } else if ( key >= 45 && key <= 48 ) {
    listIndex = 2;
  } else if ( key >= 51 && key <= 67 ) {
    listIndex = 3;
  } else if ( key >= 71 && key <= 77 ) {
    listIndex = 4;
  } else if ( key >= 80 && key <= 86 ) {
    listIndex = 5;
  } else if ( key >= 95 && key <= 99 ) {
    listIndex = 6;
  }
  return listIndex;
}

export { setAVGToday, setAVGTomorrow, setAVGDayAfterTomorrow, findIndex }; 