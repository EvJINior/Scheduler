
function searchStorage(getObject, fragmentYear, fragmentMonth, fragmentDay) {
    if ( !getObject?.[fragmentYear]?.[fragmentMonth]?.[fragmentDay] ) {
      return {}
    }
    
    return getObject[fragmentYear][fragmentMonth][fragmentDay]
  }
  
function conversionDate (valueDate) {  
    let conversion = new Date(valueDate[0], valueDate[1], valueDate[2])      
    return conversion
  } 
  
  function checkNull (array) {
    let countNull = 0
    for ( let n = 0; n < array.length; n++) {
      if ( array[n] != null ) {
        countNull++
      }
    }
    return countNull  
  }