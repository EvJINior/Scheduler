
let storageDate = {}

const closeItem = '<svg viewBox="0 0 24 24" > <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path> </svg>'

function checkLongNotes ( arrDate, numb ) {
  const getElem = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    arrDate[0],
    arrDate[1],
    arrDate[2]
  )  
  for ( let i = numb; i < getElem.length; i++) {
    if ( getElem[i] != null) {
      if ( conversionDate ( arrDate ) > conversionDate ( getElem[i].startRange ) ) {
        if ( conversionDate ( arrDate ) <= conversionDate ( getElem[i].endRange ) ) {
          return  true
        }              
      } 
    }               
  }
  return false
}

function copyElemFromStorage ( nextDay, numb) {
  const getElemNextDay = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    nextDay[0],
    nextDay[1],
    nextDay[2]
  )  

  if ( getElemNextDay[numb] == null) {
    return null
  }
    
  let copyElemForMove = {
    title: getElemNextDay[numb].title,
    text: getElemNextDay[numb].text,
    color: getElemNextDay[numb].color,
    startRange: getElemNextDay[numb].startRange,
    endRange: getElemNextDay[numb].endRange,
    countSubsequence: getElemNextDay[numb].countSubsequence
  } 

  return copyElemForMove  
}

function ckeckElemBeforeDel ( temporaryStorage, startOrEndRange ) {
  const getTitlesRangeDay = searchStorage (
    JSON.parse(localStorage.getItem("storageDate")),
    startOrEndRange[0],
    startOrEndRange[1],
    startOrEndRange[2]        
  )

  for (let i = temporaryStorage.indexTitle + 1; i < getTitlesRangeDay.length; i++) {

    if ( getTitlesRangeDay[i] != null && temporaryStorage.startRangeDateDisplay.toString() == startOrEndRange.toString() &&
      conversionDate ( getTitlesRangeDay[i].startRange ) < conversionDate ( temporaryStorage.startRangeDateDisplay ) ) {           
      return false
    }          

    if ( getTitlesRangeDay[i] != null && temporaryStorage.endRangeDateDisplay.toString() == startOrEndRange.toString() &&
      conversionDate ( getTitlesRangeDay[i].endRange ) > conversionDate ( temporaryStorage.endRangeDateDisplay ) ) {            
      return false
    }  
  }

  return true
}

function elemForDel ( temporaryStorage, startOrEndRange ) { // Проверяет элементы Start и End значений на то иденчичны ли они дню
  const getTitlesRangeDay = searchStorage (                       // удаляемого элемента, если true && true, то ...splice(i,1)
    JSON.parse(localStorage.getItem("storageDate")),
    startOrEndRange[0],
    startOrEndRange[1],
    startOrEndRange[2]        
  )

  for (let i = temporaryStorage.indexTitle + 1; i < getTitlesRangeDay.length; i++) {

    if ( getTitlesRangeDay[i] != null && temporaryStorage.startRangeDateDisplay.toString() == startOrEndRange.toString() &&
      getTitlesRangeDay[i].startRange.toString() == temporaryStorage.startRangeDateDisplay.toString() ) {           
      return true
    }          

    if ( getTitlesRangeDay[i] != null && temporaryStorage.endRangeDateDisplay.toString() == startOrEndRange.toString() &&
      getTitlesRangeDay[i].endRange.toString() == temporaryStorage.endRangeDateDisplay.toString() ) {            
      return true
    }  
  }

  return false
}

function comparesPositionTitleWithPreviousDay (today, separatedDate, index, key) {
  let conversSeparDate = new Date(separatedDate[0], separatedDate[1], +separatedDate[2] - 1)
  let previousSeparDay = [conversSeparDate.getFullYear().toString(), conversSeparDate.getMonth().toString(), addZero (conversSeparDate.getDate().toString())]

  const getPreviousSeparDay = searchStorage (
    JSON.parse(localStorage.getItem("storageDate")),
    previousSeparDay[0],
    previousSeparDay[1],
    previousSeparDay[2]
  )

  if ( key === 'complianceCheck' && today[index] != null ) {
    for ( let i = index; i < getPreviousSeparDay.length; i++ ) {
      if ( getPreviousSeparDay[i].countSubsequence === today[index].countSubsequence && 
        getPreviousSeparDay[i].startRange.toString() === today[index].startRange.toString() &&
        getPreviousSeparDay[i].endRange.toString() === today[index].endRange.toString()) { 
          if ( i != index ) {
            return true
          }
      }
      continue
    }
  return false  
  }

  // conversionDate ( today[i].startRange ) < conversionDate ( separatedDate ) 
  for ( let i = index + 1; i < getPreviousSeparDay.length; i++) {
    if ( getPreviousSeparDay[i] != null && conversionDate ( getPreviousSeparDay[i].endRange ) > conversSeparDate ) {
      for ( let j = index; j < today.length; j++ ) {    
        if ( today[j] != null && getPreviousSeparDay[i].countSubsequence === today[j].countSubsequence && 
          getPreviousSeparDay[i].startRange.toString() === today[j].startRange.toString() &&
          getPreviousSeparDay[i].endRange.toString() === today[j].endRange.toString()) {
            if ( i != j ) {
              return false
            }
          } 
          continue             
        }

  return true            
    }
  }  
}

function checksWhetherDeletePositionNumberDeletedNoteFollowingDays ( elemTemporaryStorage, numberCount ) {
  const checkBiggestEndrange = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    elemTemporaryStorage[0],
    elemTemporaryStorage[1],
    elemTemporaryStorage[2]
  )  

  const biggestEndrange = conversionDate ( elemTemporaryStorage ) 

  let getNextDay = elemTemporaryStorage  
  
  for ( let i = numberCount + 1; i < checkBiggestEndrange.length; i++) {

    if ( checkBiggestEndrange[i] != null) {

      // if (  ) {}

      if ( biggestEndrange < conversionDate ( checkBiggestEndrange[i].endRange ) ) {           

        let differenceBetweenDatesInDays = 
        ( conversionDate ( checkBiggestEndrange[i].endRange ) - biggestEndrange ) /
        ( 1000 * 60 * 60 * 24 )

        for ( let j = 0; j < differenceBetweenDatesInDays; j++ ) {
          getNextDay = changeDate (getNextDay, true)

          const getNumberCount = searchStorage(
            JSON.parse(localStorage.getItem("storageDate")),
            getNextDay[0],
            getNextDay[1],
            getNextDay[2]
          ) 

          if (getNumberCount[numberCount] != null) {
            return false
          }
        }

        return checksWhetherDeletePositionNumberDeletedNoteFollowingDays ( checkBiggestEndrange[i].endRange, numberCount )
      }           
    }      
  }   

  return true
}

// function chooseElemForReplacement ( temporaryStorage, startOrEndRange ) {
//   const getTitlesRangeDay = searchStorage (
//     JSON.parse(localStorage.getItem("storageDate")),
//     startOrEndRange[0],
//     startOrEndRange[1],
//     startOrEndRange[2]
//   )

//   for (let i = temporaryStorage.indexTitle + 1; i < getTitlesRangeDay.length; i++) {

//     if ( getTitlesRangeDay[i] != null && temporaryStorage.startRangeDateDisplay.toString() == startOrEndRange.toString() &&
//       conversionDate ( getTitlesRangeDay[i].startRange ) < conversionDate ( temporaryStorage.startRangeDateDisplay ) ) {           
//       return false
//     }          

//     if ( getTitlesRangeDay[i] != null && temporaryStorage.endRangeDateDisplay.toString() == startOrEndRange.toString() &&
//       conversionDate ( getTitlesRangeDay[i].endRange ) > conversionDate ( temporaryStorage.endRangeDateDisplay ) ) {            
//       return false
//     }  
//   }

//   return true
// }

// ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.startRangeDateDisplay )
// ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.endRangeDateDisplay )

function getNumbTitle ( temporaryStorage ) {
  // Обработать удобнее эту функцию и назвать правильно!!!
  // !!! 
  const getDasdfgghh = searchStorage (
    JSON.parse(localStorage.getItem("storageDate")),
    temporaryStorage.startRangeDateDisplay[0],
    temporaryStorage.startRangeDateDisplay[1],
    temporaryStorage.startRangeDateDisplay[2]
  )

  for ( let i = 0; i < getDasdfgghh.length; i++) {          
    if ( getDasdfgghh[i] != null && getDasdfgghh[i].countSubsequence === temporaryStorage.countSubsequence && 
      getDasdfgghh[i].startRange.toString() === temporaryStorage.startRangeDateDisplay.toString() &&
      getDasdfgghh[i].endRange.toString() === temporaryStorage.endRangeDateDisplay.toString() ) {
        return i
    }
  }
}

function getLas ( elemTemporaryStorage, elemUnaltered, numberCount ) {
  const checkBiggestEndrange = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    elemTemporaryStorage[0],
    elemTemporaryStorage[1],
    elemTemporaryStorage[2]
  )  
  
  // const unalteredDate = elemUnaltered 
  
  let biggestEndrange = conversionDate ( elemTemporaryStorage )
 
  for ( let i = numberCount; i < checkBiggestEndrange.length; i++) {

    if ( checkBiggestEndrange[i] != null) {

      if ( biggestEndrange < conversionDate ( checkBiggestEndrange[i].endRange ) ) {

        if ( elemUnaltered.toString() != elemTemporaryStorage.toString() && checkBiggestEndrange[numberCount] != null ) {
          console.log("false1 =-=")  
          console.log(checkBiggestEndrange)     
          return false
        }
        
        return getLas ( checkBiggestEndrange[i].endRange, elemUnaltered, numberCount )
      }
    }
  }

  if ( elemUnaltered.toString() != elemTemporaryStorage.toString() && checkBiggestEndrange[numberCount] == null ) {
    console.log("true =-=")
    // console.log(elemTemporaryStorage)
    return true
  }

    // biggestEndrange = ( biggestEndrange - conversionDate ( unalteredDate ) ) / (1000 * 60 * 60 * 24)  
        
    console.log("false2 =-=")
    console.log(checkBiggestEndrange)
    return false
}


// function deleteINStorageDate( dataYYMMdd, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
//   positionOriginalElemForDelete, temporaryStorage, key, index = 0) {

//   if (storageDate[dataYYMMdd[index]] === undefined || storageDate[dataYYMMdd[2]] != null) {
//       if (index === 2) {

//       }
//   }

//   saveINStorageDate( dataYYMMdd, storageDate[dataYYMMdd[index]], differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
//   positionOriginalElemForDelete, temporaryStorage, key, index + 1)
            
//     return storageDate
// }









function saveINStorageDate( dataYYMMdd, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete, temporaryStorage, key, index = 0) {

    if (storageDate[dataYYMMdd[index]] === undefined || storageDate[dataYYMMdd[2]] != null) {
        if (index === 2) {
          
          if ( key == "del" ) {

            if ( temporaryStorage.endRangeDateDisplay.toString() === temporaryStorage.startRangeDateDisplay.toString() ) { 
              
              if ( ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.startRangeDateDisplay ) && 
              ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.endRangeDateDisplay ) ) {
                storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 1 )
                return storageDate 
              }
              
              storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 1, null )
              return storageDate              
            }

            // let additionalDays = getLastDayNote ( temporaryStorage.endRangeDateDisplay, temporaryStorage.endRangeDateDisplay, getNumbTitle ( temporaryStorage ) ) || 0
            // 3 аргумент подумать как это сделать 
          // ????????????? доработать        
          
            if ( ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.startRangeDateDisplay ) && 
            ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.endRangeDateDisplay ) ) {              
                                      // for ( let i = 0; i <= differenceBetweenDates + additionalDays; i++) {!!!???
              // for ( let i = 0; i <= differenceBetweenDates; i++) {
                storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 1 )
                // dataYYMMdd = changeDate ( dataYYMMdd, true )                         
              // }
              console.log("ckeckElemBeforeDel")
              console.log(dataYYMMdd)   
              return storageDate
            }

            // if ( checksWhetherDeletePositionNumberDeletedNoteFollowingDays ( temporaryStorage.endRangeDateDisplay, countOccupiedPosition ) ) {
            if ( checksWhetherDeletePositionNumberDeletedNoteFollowingDays ( temporaryStorage.endRangeDateDisplay, countOccupiedPosition ) 
            && ckeckElemBeforeDel ( temporaryStorage, temporaryStorage.startRangeDateDisplay )) {
              // for ( let i = 0; i <= differenceBetweenDates + additionalDays; i++) {
                storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 1 )
                // dataYYMMdd = changeDate ( dataYYMMdd, true )                         
              // }
              console.log("checksWhetherDeletePositionNumberDeletedNoteFollowingDays")
              console.log(dataYYMMdd)   
              return storageDate
            }

            // for ( let i = 0; i <= differenceBetweenDates; i++) {
              storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 1, null )
              // dataYYMMdd = changeDate ( dataYYMMdd, true )                         
            // }
            console.log("end")
            console.log(dataYYMMdd)   
            return storageDate

          }
          
            for ( let i = 0; i <= differenceBetweenDates; i++) {
          
              if ( storageDate[dataYYMMdd[index]] == null ) {

                return storageDate
              }
              
              const getDateAboutDay = searchStorage(
                JSON.parse(localStorage.getItem("storageDate")),
                dataYYMMdd[0],
                dataYYMMdd[1],
                dataYYMMdd[2]
              )      

              comparesPositionTitleWithPreviousDay (getDateAboutDay, dataYYMMdd, positionOriginalElemForDelete) ? 
              storageDate[dataYYMMdd[index]][countOccupiedPosition] = copeDateForMoving :               
              storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 0, copeDateForMoving )

              // storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 0, copeDateForMoving )
              // if ( comparesPositionTitleWithPreviousDay (today, separatedDate, index) ) {
              storageDate[dataYYMMdd[index]][positionOriginalElemForDelete] = null 
              // }
              dataYYMMdd = changeDate ( dataYYMMdd, true )
            }

          return storageDate
        }
    }

  saveINStorageDate( dataYYMMdd, storageDate[dataYYMMdd[index]], differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete, temporaryStorage, key, index + 1)
  
  return storageDate
}

function separationObj(dataYYMMdd, key, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete, temporaryStorage ) {
    storageDate = JSON.parse(localStorage.getItem("storageDate")) || {} 
    
    if ( key == true ) {

      const separationObj = saveINStorageDate ( dataYYMMdd, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
        positionOriginalElemForDelete )
        
        localStorage.setItem("storageDate", JSON.stringify(separationObj))

        let numbDay = dataYYMMdd
        for ( let j = 0; j < differenceBetweenDates; j++) {
          if ( dataYYMMdd[1] != numbDay[1]) {
            differenceBetweenDates = differenceBetweenDates - j
            saveINStorageDate ( numbDay, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
            positionOriginalElemForDelete )
            break
          }
          numbDay = changeDate (numbDay, true)
        }

        localStorage.setItem("storageDate", JSON.stringify(separationObj))
   
        return 
    }

    if ( key == "del") {
      const separationObj = saveINStorageDate ( dataYYMMdd, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
        positionOriginalElemForDelete, temporaryStorage, key )

        localStorage.setItem("storageDate", JSON.stringify(separationObj))
/////////////////////////
        // let numbDay = dataYYMMdd
        // for ( let j = 0; j < differenceBetweenDates; j++) {
        //   if ( dataYYMMdd[1] != numbDay[1]) {
        //     differenceBetweenDates = differenceBetweenDates - j
        //     saveINStorageDate ( numbDay, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
        //     positionOriginalElemForDelete, temporaryStorage, key )
        //     break
        //   }
        //   numbDay = changeDate (numbDay, true)
        // }

        // localStorage.setItem("storageDate", JSON.stringify(separationObj))
//////////////////////////
      return
      //   localStorage.setItem("storageDate", JSON.stringify(separationObj))
    }
    
  const separationObj = handlerStorage (
    dataYYMMdd.date,  
    storageDate,
    dataYYMMdd.title,
    dataYYMMdd.text,
    dataYYMMdd.indexTitle,
    dataYYMMdd.indexTitleDel,
    dataYYMMdd.color,
    dataYYMMdd.startRangeDateDisplay,
    dataYYMMdd.endRangeDateDisplay,
    dataYYMMdd.countSubsequence,
    dataYYMMdd.countNull
  )

  localStorage.setItem("storageDate", JSON.stringify(separationObj))
}

function handlerStorage(separatedDate, storageDate, separatedObjTitle, separatedObjText, indexTitle, indexTitleDel,
   color, startRange, endRange, countSubsequence, countNull, index = 0) {   
    
  if (storageDate[separatedDate[index]] === undefined || storageDate[separatedDate[2]] != null) {
    if (index === 2) {      

      let baseObj = {
        title: separatedObjTitle,
        text: separatedObjText,
        color: color,
        startRange: startRange,
        endRange: endRange,
        countSubsequence: countSubsequence
      } 



////////////////////

      // if (indexTitleDel == true) {    
                   
      //   if ( startRange.toString() !== endRange.toString() ) {

      //     const getDateAboutDay = searchStorage(
      //       JSON.parse(localStorage.getItem("storageDate")),
      //       separatedDate[0],
      //       separatedDate[1],
      //       separatedDate[2]
      //     )     
  
      //     for ( let i = 0; i < getDateAboutDay.length; i++) {          
      //       if ( getDateAboutDay[i] != null && getDateAboutDay[i].countSubsequence === baseObj.countSubsequence && 
      //           getDateAboutDay[i].startRange.toString() === baseObj.startRange.toString() &&
      //           getDateAboutDay[i].endRange.toString() === baseObj.endRange.toString() ) {
      //             console.log("indexTitleDel")
      //             // storageDate[separatedDate[index]].splice(i, 1)       
      //             return storageDate
      //       }
      //     }
      //   }

      //   // storageDate[separatedDate[index]].splice(i, 1) 

      //   return storageDate
      // } 

/////////////////////

      if (indexTitle != null) {     
        // if ( startRange.toString() !== endRange.toString() ) { 

        // }
        
        // console.log(baseObj)
        // console.log("indexTitle")
        storageDate[separatedDate[index]][indexTitle] = baseObj      
        console.log("indexTitle")                    
        return storageDate
      }

///////////////////

      if ( startRange.toString() !== endRange.toString() ) { 
        
        if (storageDate[separatedDate[index]] == null) {
          storageDate[separatedDate[index]] = []             
        }

        // function notLessZero (elem) {
        //   return elem = ( elem < 0 ) ? 0 : elem
        // }

        const getDateAboutDay = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          separatedDate[0],
          separatedDate[1],
          separatedDate[2]
        )

        let setPosition = 0

        const checkPrevious = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          baseObj.startRange[0],
          baseObj.startRange[1],
          baseObj.startRange[2]
        )     
////////////////////////


          // for ( let i = index; i < checkPrevious.length; i++) {
          //   if ( today[i] != null && conversionDate ( today[i].startRange ) < conversionDate ( separatedDate ) ) {
          //     console.log("today[i]")
          //     console.log(today[i])
          //     return false
          //   }
          // }
          // return true
        
////////////////////////
        for ( let i = 0; i < checkPrevious.length; i++) {          
          if ( checkPrevious[i] != null && checkPrevious[i].countSubsequence === baseObj.countSubsequence && 
              checkPrevious[i].startRange.toString() === baseObj.startRange.toString() &&
              checkPrevious[i].endRange.toString() === baseObj.endRange.toString() ) {

            for ( let k = 0; k < checkPrevious.length; k++) {
              if ( checkPrevious[k] != null && checkPrevious[k].countSubsequence == baseObj.countSubsequence ) {
                setPosition = k
              }
            }             

            if ( getDateAboutDay.length == 0 || getDateAboutDay.length === undefined) {
              storageDate[separatedDate[index]][setPosition] = baseObj   
              return storageDate 
            }

            if ( countNull != 0 ) {
              if ( storageDate[separatedDate[index]][setPosition] == null && comparesPositionTitleWithPreviousDay (getDateAboutDay, separatedDate, setPosition) ) {
                storageDate[separatedDate[index]][setPosition] = null
                return storageDate
              }
              storageDate[separatedDate[index]].splice( setPosition, 0, null )   
              return storageDate
            }            
////////////////////////
            if ( storageDate[separatedDate[index]][setPosition] == null &&  comparesPositionTitleWithPreviousDay (getDateAboutDay, separatedDate, setPosition) ) {    // ?????? проверить эффективность !!!
            // if ( storageDate[separatedDate[index]][setPosition] == null ) {    // ?????? проверить эффективность !!!
              storageDate[separatedDate[index]][setPosition] = baseObj
              return storageDate
            }
/////////////////////////       
            // for ( let j = setPosition; j < getDateAboutDay.length; j++) {
            //   if ()
            // }

            // добавить функцию которая проверяет setPosition элемента в прошлом дне и сравнивает
            // с нынешним днем и его setPosition и если они разные, то true
            
            if ( getDateAboutDay[setPosition + 1] !== undefined ) {
              storageDate[separatedDate[index]].splice( setPosition, 0, baseObj ) 
              return storageDate 
            }
/////////////////////////// может надо добавть!!! Если будут возникать проблемы с сохранение исп. и доработай функции 
            // if ( comparesPositionTitleWithPreviousDay (getDateAboutDay, separatedDate, setPosition, 'complianceCheck') ) {
            //     storageDate[separatedDate[index]].splice( setPosition, 0, baseObj ) 
            //     return storageDate 
            // }
///////////////////////////
            if ( getDateAboutDay[setPosition] != null ) {
              storageDate[separatedDate[index]].splice( setPosition, 0, baseObj ) 
              return storageDate 
            }


            // console.log (" changeDate (separatedDate, true)" )
            // console.log ( changeDate (separatedDate, true) )
            
            // let drep = changeDate (separatedDate, true)
            // const ge = searchStorage(
            //   JSON.parse(localStorage.getItem("storageDate")),
            //   drep[0],
            //   drep[1],
            //   drep[2]
            // )
            
            // console.log ( ge.setPosition )

            // if ( ge.setPosition != null ) { 
            //   storageDate[separatedDate[index]].splice( setPosition, 0, baseObj ) 
            //   return storageDate 
            //  }

            storageDate[separatedDate[index]][setPosition] = baseObj           
            return storageDate                  
          }
        }

      for ( let j = 0; j < getDateAboutDay.length + 1; j++) {

          if ( getDateAboutDay[j] == null ) {
            
              setPosition = j

              storageDate[separatedDate[index]][setPosition] = baseObj
              return storageDate
      
          }      

          if ( conversionDate ( baseObj.startRange ) < conversionDate ( getDateAboutDay[j].startRange ) ) {
            setPosition = j
            storageDate[separatedDate[index]].splice( setPosition, 0, baseObj )
            return storageDate 
          } 

          if ( baseObj.startRange.toString() == getDateAboutDay[j].startRange.toString() ) {
            
            if ( conversionDate ( baseObj.endRange ) >= conversionDate ( getDateAboutDay[j].endRange ) ) {
              if ( checkLongNotes ( baseObj.startRange, j ) ) {
                continue
              }
              setPosition = j
              storageDate[separatedDate[index]].splice( setPosition, 0, baseObj )
              return storageDate 
            }
            continue
          }
          
          continue
        
        }                 

          storageDate[separatedDate[index]].splice( setPosition, 0, baseObj )
  
        return storageDate   
      }          
      
//////////////////             

      if (storageDate[separatedDate[index]] === undefined ) {     
        storageDate[separatedDate[index]] = [baseObj]                    
         
        return storageDate        
      }     
//////////////////// Переделать сохранение элемента на один день
      const getToday = searchStorage(
        JSON.parse(localStorage.getItem("storageDate")),
        baseObj.startRange[0],
        baseObj.startRange[1],
        baseObj.startRange[2]
      )  
      for ( let g = 0; g < getToday.length; g++ ) {
        if ( getToday[g] == null ) {
          storageDate[separatedDate[index]][g] = baseObj
          return storageDate
        }
      }
           
      storageDate[separatedDate[index]].push(baseObj)
      
      return storageDate
    }

    storageDate[separatedDate[index]] = {}
  }
  
  storageDate[separatedDate[index]] = handlerStorage(
    separatedDate,
    storageDate[separatedDate[index]],
    separatedObjTitle,
    separatedObjText,   
    indexTitle,
    indexTitleDel,
    color,
    startRange,
    endRange,
    countSubsequence,
    countNull,   
    index + 1
  )  

  return storageDate
}

function searchStorage ( getObject, fragmentYear, fragmentMonth, fragmentDay ) {
  // if ( getObject && getObject[fragmentYear] &&)
  if (getObject == null) {
    return {}
  }
  if (getObject[fragmentYear] == null) {
    return {}
  }
  if (getObject[fragmentYear][fragmentMonth] == null) {
    return {}
  }
  if (getObject[fragmentYear][fragmentMonth][fragmentDay] == null) {
    return {}
  }
  return getObject[fragmentYear][fragmentMonth][fragmentDay]
}

function modalTaskList(cellTable, splitELem, dayInfo) {

  let modalWindowList = document.createElement("div")
  modalWindowList.setAttribute("class", "modalWindowList")
  document.body.appendChild(modalWindowList)

  let modalContentList = document.createElement("div")
  modalContentList.setAttribute("class", "modalContentList")
  modalWindowList.appendChild(modalContentList)

  let modalHeaderList = document.createElement("div")
  modalHeaderList.setAttribute("class", "modalHeaderList")
  modalContentList.appendChild(modalHeaderList)

  let headerTitleList = document.createElement("div")
  headerTitleList.setAttribute("class", "headerTitleList")
  headerTitleList.innerHTML =
    splitELem[2] + "  " + months[splitELem[1]] + "  " + splitELem[0]
  modalHeaderList.appendChild(headerTitleList)

  let buttonCloseList = document.createElement("div")
  buttonCloseList.setAttribute("class", "buttonCloseList")
  buttonCloseList.innerHTML = closeItem
  // buttonCloseList.setAttribute("src", "icons/cross2.png")
  modalHeaderList.appendChild(buttonCloseList)

  buttonCloseList.onclick = function () { 
    modalWindowList.remove()
  }

  let modalBodyList = document.createElement("div")
  modalBodyList.setAttribute("class", "modalBodyList")
  modalContentList.appendChild(modalBodyList)

  for (let i = 0; i < dayInfo.length; i++) {
    let bodyTitleEntry = document.createElement("div")
    bodyTitleEntry.setAttribute("class", "bodyTitleEntry")
    bodyTitleEntry.setAttribute("type", "button")    

    // bodyTitleEntry.innerHTML = ( dayInfo[i] == null ) ? 
    // continue : dayInfo[i].title.substring(0, 46)

    if ( dayInfo[i] == null ) {
      continue
    } 
   
    let differenceBetweenDatesInDays = ( (conversionDate (dayInfo[i].endRange) -
    conversionDate (dayInfo[i].startRange)) / (1000 * 60 * 60 * 24) ) + 1

    let dayNumbThisTitle = ( ( conversionDate ( splitELem ) -
    conversionDate ( dayInfo[i].startRange) ) / (1000 * 60 * 60 * 24) ) + 1

    bodyTitleEntry.innerHTML = ( dayInfo[i].startRange.toString() != dayInfo[i].endRange.toString() ) ? 
    dayInfo[i].title.substring(0, 32) + " (" + "Day " + dayNumbThisTitle + " of " + differenceBetweenDatesInDays + ")" :
    dayInfo[i].title.substring(0, 46) 

    bodyTitleEntry.style.outlineColor = dayInfo[i].color       
    bodyTitleEntry.style.backgroundColor = dayInfo[i].color

    if ( bodyTitleEntry.style.backgroundColor == "" ) {      
      bodyTitleEntry.style.color = "rgb(255, 255, 255)"
    }

    modalBodyList.appendChild(bodyTitleEntry)   

    bodyTitleEntry.onclick = function () {
      modalWindowList.remove()
      modalWindow(cellTable, dayInfo[i], splitELem, i)          
    }
  }  

  modalWindowList.onclick = function (event) {
    if ( event.target == modalWindowList ) {
      modalWindowList.remove()
    }
  }
  
  let buttonAddNote = document.createElement("div")
  buttonAddNote.setAttribute("class", "buttonAddNote")
  buttonAddNote.innerHTML = "+"
  buttonAddNote.setAttribute("type", "button")
  modalContentList.appendChild(buttonAddNote)

  buttonAddNote.onclick = function () {
    modalWindowList.remove()     
    modalWindow(cellTable, "null", splitELem)    
  } 
}

function removeTitle(elem) {
  let delElem = elem.querySelectorAll('.titleCell')
  for (let i = 0; i < delElem.length; i++) {    
    delElem[i].remove()
  }           
}

function circleChooseColor( buttonChooseColor, modalContent, modalHeader ) {
  let listColors = ['rgb(210, 215, 216)', '#62b4d2', '#8a7cda', '#64b4a4', '#cca767']
  for (let i = 0; i < listColors.length; i++) {
    let circleOuter = document.createElement("div")       
    circleOuter.setAttribute("type", "button")
    circleOuter.setAttribute("class", "circleOuter")
    circleOuter.style.border = '4px solid ' + listColors[i]
    buttonChooseColor.appendChild(circleOuter)     

    circleOuter.onclick = function () {         
      for ( let k = 0; k < buttonChooseColor.querySelectorAll('.circleOuter').length; k++) {
        let checkNestedElem = buttonChooseColor.querySelectorAll('.circleOuter')[k]        
        if (checkNestedElem.contains(checkNestedElem.querySelector('.circleInner')) == true) {           
          checkNestedElem.querySelector('.circleInner').remove()
        }
      }

      if (circleOuter.contains(circleOuter.querySelector('.circleInner')) == false) {          
        let circleInner = document.createElement("div")
        circleInner.setAttribute("class", "circleInner")      
        circleInner.style.backgroundColor = listColors[i]           
        circleOuter.appendChild(circleInner)                
      }      
      modalContent.style.borderColor = listColors[i]                         
      modalHeader.style.backgroundColor = listColors[i]              
      // buttonChooseColor.style.borderColor = listColors[i]              
      // buttonDelete.style.borderColor = listColors[i]              
      // buttonSave.style.borderColor = listColors[i]                
      // for (let j = 0; j < elemsAll.length; j++) {
      //   elemsAll[j].style.borderColor = listColors[i]
      // }
      // elemsAll.style.borderColor = listColors[i]              
    }    
  }      
}  

function addColorBorder (elem, splitELem, indexTitle, key) {
  const dayInfo = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    splitELem[0],
    splitELem[1],
    splitELem[2]
  )

  if(dayInfo[indexTitle] != null && "border" == key) {
    elem.style.borderColor = dayInfo[indexTitle].color    
  }

  if(dayInfo[indexTitle] != null && "bgc" == key) {
    elem.style.backgroundColor = dayInfo[indexTitle].color
    
    }
}

function checkTemporaryStorageTitle (elemHeader) {
  if (elemHeader.value == " Fill in the field !") {     
    return elemHeader.value = ""
  }
  return elemHeader.value
}




function checkDate (elem, getElemRangeDate, i, key) {    
    
  const elemsFromDispleyDate = elem.querySelectorAll(".userSelectsDate")

  getElemRangeDate = (key) ? getElemRangeDate += 1 : getElemRangeDate -= 1

  if ( i == 3 ) {   
    let elemDate = new Date (elemsFromDispleyDate[5].value, elemsFromDispleyDate[4].value, getElemRangeDate)     
    
    elemsFromDispleyDate[3].value = addZero (elemDate.getDate())
    elemsFromDispleyDate[3].innerHTML = addZero (elemDate.getDate())
    
    elemsFromDispleyDate[4].value = elemDate.getMonth()
    elemsFromDispleyDate[4].innerHTML = addZero (elemDate.getMonth() + 1)

    elemsFromDispleyDate[5].value = elemDate.getFullYear()
    elemsFromDispleyDate[5].innerHTML = elemDate.getFullYear()

    return elemsFromDispleyDate[3].value
  }

  if ( i == 4 ) {        

    let elemDate = new Date (elemsFromDispleyDate[5].value, getElemRangeDate)
    
    if ( elemsFromDispleyDate[3].value > new Date (elemsFromDispleyDate[5].value, getElemRangeDate + 1, 0).getDate()) {
      elemsFromDispleyDate[3].value = addZero (+new Date (elemsFromDispleyDate[5].value, getElemRangeDate + 1, 0).getDate()) 
      elemsFromDispleyDate[3].innerHTML = addZero (+new Date (elemsFromDispleyDate[5].value, getElemRangeDate + 1, 0).getDate())  
    }     
    
    elemsFromDispleyDate[4].value = elemDate.getMonth()
    elemsFromDispleyDate[4].innerHTML = addZero (elemDate.getMonth() + 1) 

    elemsFromDispleyDate[5].value = elemDate.getFullYear()
    elemsFromDispleyDate[5].innerHTML = elemDate.getFullYear()

    return elemsFromDispleyDate[4].value 
  }

  if ( i == 5 ) {  
       
    if ( elemsFromDispleyDate[3].value > new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate()) {
      elemsFromDispleyDate[3].value = addZero (+new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate())
      elemsFromDispleyDate[3].innerHTML = addZero (+new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate())  
    } 
    
    elemsFromDispleyDate[5].value = getElemRangeDate
    elemsFromDispleyDate[5].innerHTML = getElemRangeDate

    return getElemRangeDate
  }       
}

function displayDate (elemRangeDate, splitELem, elemCell, indexTitleForColor, key) {  
  
  const arrowUpItem = '<svg viewBox="0 0 24 24" width="20px" height="20px"><path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>'
  const arrowDownItem = '<svg viewBox="0 0 24 24" width="20px" height="20px"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg>'
  
  for (let i = 0; i < 9; i++) {
    let userSelectsDate = document.createElement("div")
    userSelectsDate.setAttribute("class", "userSelectsDate")
    userSelectsDate.setAttribute("type", "button")    
    elemRangeDate.appendChild(userSelectsDate)   

    let getElemChooseUser = elemRangeDate.querySelectorAll(".userSelectsDate")

    if ( i > 2 && i < 6 ) {           
      
        userSelectsDate.value = ( key ) ? 
        ( elemCell == null ) ? userSelectsDate.value = splitELem [ 5 - i ] : userSelectsDate.value = elemCell.startRange [ 5 - i ] :              
        ( elemCell == null ) ? userSelectsDate.value = splitELem [ 5 - i ] : userSelectsDate.value = elemCell.endRange [ 5 - i ]
      
        userSelectsDate.innerHTML = userSelectsDate.value          
      
      if ( i === 4 ) {
          userSelectsDate.innerHTML = addZero (+userSelectsDate.value + 1)                 
      }       

      if ( i === 5 ) {   
          elemRangeDate.value = getElemChooseUser[i].value + "." + getElemChooseUser[i-1].value + "." + getElemChooseUser[i-2].value               
      }
    }        

    

    if ( i < 3 ) {    

      userSelectsDate.setAttribute("class", "userSelectsDate userArrow")

      userSelectsDate.innerHTML = arrowUpItem

      getElemChooseUser[i].onclick = function () {  
        
        let  getElemRangeDate = elemRangeDate.querySelectorAll(".userSelectsDate")

        getElemRangeDate[i + 3].value = checkDate (elemRangeDate, +getElemRangeDate[i + 3].value, i + 3, true)              

        elemRangeDate.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value

          }
        } 
      
      
      if ( i > 5 ) {

      userSelectsDate.setAttribute("class", "userSelectsDate userArrow")
        
      userSelectsDate.innerHTML = arrowDownItem

      getElemChooseUser[i].onclick = function () {     

        let  getElemRangeDate = elemRangeDate.querySelectorAll(".userSelectsDate")
        
        getElemRangeDate[i - 3].value = checkDate (elemRangeDate, +getElemRangeDate[i - 3].value, i - 3, false)              

        elemRangeDate.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value          
        }
      }             
    }          
  }  

  function comparesPositionTitleWithNextDay (today, separatedDate, index) {
  let conversSeparDate = new Date(separatedDate[0], separatedDate[1], +separatedDate[2] + 1)
  let nextSeparDay = 
  [conversSeparDate.getFullYear().toString(), conversSeparDate.getMonth().toString(), addZero (conversSeparDate.getDate().toString())]

  const getNextSeparDay = searchStorage (
    JSON.parse(localStorage.getItem("storageDate")),
    nextSeparDay[0],
    nextSeparDay[1],
    nextSeparDay[2]
  )

  const todaySeparDay = searchStorage (
    JSON.parse(localStorage.getItem("storageDate")),
    today[0],
    today[1],
    today[2]
  )

console.log("today[index]")
console.log(todaySeparDay[index])

  if (today[index] != null ) {
    for ( let i = index; i < getNextSeparDay.length; i++ ) {
      if ( getNextSeparDay[i] != null &&
        getNextSeparDay[i].countSubsequence === todaySeparDay[index].countSubsequence && 
        getNextSeparDay[i].startRange.toString() === todaySeparDay[index].startRange.toString() &&
        getNextSeparDay[i].endRange.toString() === todaySeparDay[index].endRange.toString()) { 

            return true          
      }
      continue
    }
  return false  
  }
 
}

  function getLastDayNote ( elemTemporaryStorage, elemUnaltered, numberCount, numbTitle, key ) {

    const checkBiggestEndrange = searchStorage(
      JSON.parse(localStorage.getItem("storageDate")),
      elemTemporaryStorage[0],
      elemTemporaryStorage[1],
      elemTemporaryStorage[2]
    )  
  
    const unalteredDate = elemUnaltered 
    
    let biggestEndrange = conversionDate ( elemTemporaryStorage )
   
    for ( let i = numberCount; i < checkBiggestEndrange.length; i++) {

      if ( checkBiggestEndrange[i] != null) {

        if ( biggestEndrange < conversionDate ( checkBiggestEndrange[i].endRange ) ) {     

          return getLastDayNote ( checkBiggestEndrange[i].endRange, elemUnaltered, numberCount, numbTitle, key)

        }
      }
    }

      biggestEndrange = ( biggestEndrange - conversionDate ( unalteredDate ) ) / (1000 * 60 * 60 * 24)   

      let limiterWeek = conversionDate ( unalteredDate ).getDay()

      if ( key == "save" ) {
        if ( limiterWeek == 7 ) {
          return biggestEndrange = 0
        }

        if ( biggestEndrange + limiterWeek < 7 ) {
          return biggestEndrange 
        }
        
        if ( biggestEndrange + limiterWeek > 7 ) {
          for ( let j = 0; j < 7; j++ ) {
            if ( j == limiterWeek ) {
              biggestEndrange = 7 - j
              console.log( biggestEndrange )
              return biggestEndrange
            }
          }
          return biggestEndrange
        }
      }
      
      if ( comparesPositionTitleWithNextDay (elemUnaltered, elemUnaltered, numbTitle) ) {                
        return biggestEndrange = 0
      }
      
      limiterWeek = 7 - limiterWeek   

      let nextDay = changeDate (elemUnaltered, true)

      for ( let k = 0; k < limiterWeek; k++ ) {               
      
      let allTitlesNextDay = searchStorage(
        JSON.parse(localStorage.getItem("storageDate")),
        nextDay[0],
        nextDay[1],
        nextDay[2]
      )      
      
        if ( allTitlesNextDay[numbTitle] == null ) {
          for ( let g = numbTitle + 1; g < allTitlesNextDay.length; g++ ) {
            if ( allTitlesNextDay[g] != null ) {
              if (allTitlesNextDay[g].startRange.toString() == allTitlesNextDay[g].endRange.toString() ||
              allTitlesNextDay[g].endRange.toString() == nextDay.toString() ) {
                continue
              }
              return biggestEndrange = 0
            }
          }       
          nextDay = changeDate (nextDay, true) 
          continue    
        }
        return biggestEndrange = k
      }
  }

  function checkPositionNextDay (date, position, retEndRange) {
    const getDay = searchStorage(
      JSON.parse(localStorage.getItem("storageDate")),
      date[0],
      date[1],
      date[2]
    )

    if ( conversionDate ( date ) > conversionDate ( retEndRange ) ) {  
      return true
    }

    if ( getDay[position] == null ) {                     
      return checkPositionNextDay (changeDate (date, true), position, retEndRange)                 
    }          

    return false
  } 

  function changeDate (valueDate, key) { 
        
    let conversion = new Date(valueDate[0], valueDate[1], valueDate[2])

    if ( key != null ) {
      conversion = new Date(valueDate[0], valueDate[1], +valueDate[2] + 1)
    }      

    let version = [conversion.getFullYear().toString(), conversion.getMonth().toString(), addZero (conversion.getDate().toString())]
    return version
  }   

  function getDayCellTable (valueElem) {   
    let split = valueElem[0] + '.' + valueElem[1] + '.' + valueElem[2]    
    let tty = document.querySelectorAll(".cellTable") 
    
    for (let i = 0; i <= tty.length; i++) {
      if (split === tty[i].value) {            
        return tty[i]
      }
    }
  }

  function checkChooseCellsDate ( firstDate, differenceBetweenDatesInDays, freeNumb, arrayCount,  index = 0 ) {              
 
    if ( index > differenceBetweenDatesInDays ) {        
      return freeNumb 
    }

    arrayCount = arrayCount  
    let arrNotes = [] 
    
    let quantityNotes = searchStorage (
      JSON.parse(localStorage.getItem("storageDate")),
      firstDate[0],
      firstDate[1],
      firstDate[2]
    )         
      
    for (let i = 0; i < quantityNotes.length; i++) {
      if ( quantityNotes[i] != null ) {
      arrNotes.push(quantityNotes[i].countSubsequence)    
      }      
    }                  

    for ( let j = 0; j < arrayCount.length; j++) {
      for ( let i = 0; i < arrNotes.length; i++) {     
        if ( arrayCount[j] == arrNotes[i] ) {     
          arrNotes.splice(i, 1)                   
        } 
      }
    }

    arrayCount = arrayCount.concat(arrNotes)
      
    if ( index === differenceBetweenDatesInDays ) {  
      freeNumb = 0        
      for ( let j = 0; j < arrayCount.length; j++ ) {              
        if ( freeNumb == arrayCount[j] ) {                
          freeNumb ++
          j = -1                
        }
        
        else if ( j == arrayCount.length ) {
          freeNumb
        }                    
      }            
    }
                  
    return checkChooseCellsDate ( changeDate ( firstDate, true ), differenceBetweenDatesInDays, freeNumb, arrayCount, index + 1 )                                            
  }
  
function modalWindow(elem, titlecell, splitELem, indexTitle) { 
         
  let modalWindow = document.createElement("div")
  modalWindow.setAttribute("class", "modalWindow")
  document.body.appendChild(modalWindow)
  
  let modalContent = document.createElement("div")
  modalContent.setAttribute("class", "modalContent")
  modalWindow.appendChild(modalContent)
  addColorBorder(modalContent, splitELem, indexTitle, "border")

  let modalHeader = document.createElement("div")
  modalHeader.setAttribute("class", "modalHeader")
  modalContent.appendChild(modalHeader)    
  addColorBorder(modalHeader, splitELem, indexTitle, "bgc")

  let headerTitle = document.createElement("div")
  headerTitle.setAttribute("class", "headerTitle")
  headerTitle.innerHTML =
  splitELem[2] + "  " + months[splitELem[1]] + "  " + splitELem[0]
  modalHeader.appendChild(headerTitle)

  let buttonClose = document.createElement("div")
  buttonClose.setAttribute("class", "buttonClose")
  buttonClose.innerHTML = closeItem  
  modalHeader.appendChild(buttonClose)    

  buttonClose.onclick = function () { 
    modalWindow.remove()
  }
  
  let modalBody = document.createElement("div")
  modalBody.setAttribute("class", "modalBody")
  modalContent.appendChild(modalBody)   

  let headerInput = document.createElement("input")
  headerInput.setAttribute("class", "headerInput")  
  headerInput.setAttribute("placeholder", "T i t l e")  
  headerInput.value = titlecell.title || elem.title || ""  
  modalBody.appendChild(headerInput)
  
  let bodyInput = document.createElement("textarea")
  bodyInput.setAttribute("class", "bodyInput")
  bodyInput.setAttribute("placeholder", "T e x t") 
  bodyInput.value = titlecell.text || elem.text || ""
  modalBody.appendChild(bodyInput)

  let modalSection = document.createElement("div")
  modalSection.setAttribute("class", "modalSection")   
  modalContent.appendChild(modalSection) 

  let startRangeDate = document.createElement("div")
  startRangeDate.setAttribute("class", "RangeDate") 
  startRangeDate.setAttribute("type", "button") 
  displayDate (startRangeDate, splitELem, getInfoDay(elem, true)[indexTitle], indexTitle, true)
  modalSection.appendChild(startRangeDate)     
  
  let endRangeDate = document.createElement("div")
  endRangeDate.setAttribute("class", "RangeDate") 
  endRangeDate.setAttribute("type", "button")
  displayDate (endRangeDate, splitELem, getInfoDay(elem, true)[indexTitle], indexTitle, false)
  modalSection.appendChild(endRangeDate)  

  let modalFooter = document.createElement("div")
  modalFooter.setAttribute("class", "modalFooter")
  modalContent.appendChild(modalFooter)

  let buttonChooseColor = document.createElement("div")
  buttonChooseColor.setAttribute("class", "buttonChooseColor") 

  modalFooter.appendChild(buttonChooseColor, indexTitle)    
      
  let buttonDelete = document.createElement("div")
  buttonDelete.setAttribute("class", "buttonDelete")
  buttonDelete.innerHTML = "DELETE"
  buttonDelete.setAttribute("type", "button")
  modalFooter.appendChild(buttonDelete)

  if ( titlecell.title == null ) {
    buttonDelete.style.display = "none"
  }

  let buttonSave = document.createElement("div")  
  buttonSave.setAttribute("class", "buttonSave")
  buttonSave.innerHTML = "SAVE"
  buttonSave.setAttribute("type", "button")
  modalFooter.appendChild(buttonSave)    

  circleChooseColor ( buttonChooseColor,modalContent, modalHeader )

    buttonDelete.onclick = function () {          
      const getDateCountSub = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          startRangeDate.value.split(".")[0],
          startRangeDate.value.split(".")[1],
          startRangeDate.value.split(".")[2]        
        )

      let temporaryStorage = {
                   
      date: changeDate (startRangeDate.value.split(".")),    

      indexTitle: indexTitle,

      indexTitleDel: true,

      color: modalContent.style.borderColor,
   
      startRangeDateDisplay: changeDate (startRangeDate.value.split(".")),

      endRangeDateDisplay: changeDate (endRangeDate.value.split(".")),

      countSubsequence: getDateCountSub[indexTitle].countSubsequence
      
      }

       function searchTitleUsingItData ( temporaryStorage ) {
        const getAllTitlesItDay = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          temporaryStorage.date[0],
          temporaryStorage.date[1],
          temporaryStorage.date[2]        
        )
        
        for ( let i = 0; i < getAllTitlesItDay.length; i++ ) {
          if ( getAllTitlesItDay[i] != null && getAllTitlesItDay[i].countSubsequence === temporaryStorage.countSubsequence && 
            getAllTitlesItDay[i].startRange.toString() === temporaryStorage.startRangeDateDisplay.toString() &&
            getAllTitlesItDay[i].endRange.toString() === temporaryStorage.endRangeDateDisplay.toString() ) {              
              if ( temporaryStorage.indexTitle != i ) {
                console.log( "У удаляемого элемента не соответсвует номер индекса в temporaryStorage.indexTitle" )
                console.log( temporaryStorage )
                console.log( " Нынешняя позиция Удаляемого Тайтла: " + i + " Правельная позиция: " + temporaryStorage.indexTitle + 
              " Дата элемента: " + temporaryStorage.date )
              }
              return i
            }
        }
       }

        let differenceBetweenDatesInDays = 
        (conversionDate (temporaryStorage.endRangeDateDisplay) - conversionDate (temporaryStorage.startRangeDateDisplay)) 
        / (1000 * 60 * 60 * 24)
        
        let additionalDays = getLastDayNote ( temporaryStorage.endRangeDateDisplay, temporaryStorage.endRangeDateDisplay, 0,
        getNumbTitle ( temporaryStorage ) ) || 0

        storageDate = separationObj ( temporaryStorage.date, "del",  differenceBetweenDatesInDays, temporaryStorage.indexTitle, 0, 
        0, temporaryStorage ) 
     
          if ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
          conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) { 
            removeTitle ( getDayCellTable ( temporaryStorage.date ) )
            daysInfo ( getDayCellTable ( temporaryStorage.date ) )  
          }

        for ( let i = 1; i <= differenceBetweenDatesInDays + additionalDays; i++ ) {

          temporaryStorage.date = changeDate (temporaryStorage.date, i)        

          if ( i > differenceBetweenDatesInDays ) {
            temporaryStorage.countNull = additionalDays
          }

          storageDate = separationObj ( temporaryStorage.date, "del",  differenceBetweenDatesInDays, searchTitleUsingItData ( temporaryStorage ),
           0, 0, temporaryStorage ) 

          if ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
          conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) { 
            removeTitle ( getDayCellTable ( temporaryStorage.date ) )
            daysInfo ( getDayCellTable ( temporaryStorage.date ) )  
          }

        }
          
        temporaryStorage.indexTitleDel = false; 
        return modalWindow.remove()
    }

  buttonSave.onclick = function () {      

    let temporaryStorage = {

      date: changeDate (startRangeDate.value.split(".")),      

      title: checkTemporaryStorageTitle(headerInput).trim(),

      text: bodyInput.value.trim(),

      indexTitle: indexTitle,

      color: modalContent.style.borderColor,
   
      startRangeDateDisplay: changeDate (startRangeDate.value.split(".")),

      endRangeDateDisplay: changeDate (endRangeDate.value.split(".")),

      countSubsequence: 0,
      
      countNull: 0

    }
    

    let count = ( conversionDate ( temporaryStorage.endRangeDateDisplay ) - conversionDate ( temporaryStorage.date ) ) / (1000 * 60 * 60 * 24)
     
    if ( count > 90 ) {

      endRangeDate.style.border = "1px rgb(210, 0, 0) solid"
      endRangeDate.style.color = "rgb(210, 0, 0)"

      return setTimeout(() => {
        endRangeDate.style.border = "0px rgb(0, 0, 0) solid"
        endRangeDate.style.color = "rgb(0, 0, 0)"       
      }, 300) 
    }

    if ( conversionDate ( temporaryStorage.date ) > conversionDate ( temporaryStorage.endRangeDateDisplay ) ) {        

      startRangeDate.style.border = "1px rgb(210, 0, 0) solid"
      startRangeDate.style.color = "rgb(210, 0, 0)"

      return setTimeout(() => {
        startRangeDate.style.border = "0px rgb(0, 0, 0) solid"
        startRangeDate.style.color = "rgb(0, 0, 0)"       
      }, 300)      
    }
       
    if (temporaryStorage.title == "") {
      headerInput.style.border = "3px rgb(210, 0, 0) solid"
      headerInput.value = " Fill in the field !"
      headerInput.style.color = "rgb(210, 0, 0)"
     
      return setTimeout(() => {
        headerInput.style.border = "1px rgb(0, 0, 0) solid"
        headerInput.style.color = "rgb(0, 0, 0)"
        headerInput.value = ""
      }, 300)
    }           

    let differenceBetweenDatesInDays = 
    (conversionDate (temporaryStorage.endRangeDateDisplay) - conversionDate (temporaryStorage.startRangeDateDisplay)) / (1000 * 60 * 60 * 24)

    if (temporaryStorage.indexTitle != null) { 

      const getIndexTitle = searchStorage (
        JSON.parse(localStorage.getItem("storageDate")),
        splitELem[0],
        splitELem[1],
        splitELem[2]
      )

      if ( getIndexTitle[indexTitle].startRange.toString() === temporaryStorage.startRangeDateDisplay.toString() &&
      getIndexTitle[indexTitle].endRange.toString() === temporaryStorage.endRangeDateDisplay.toString() ) {
        for ( let i = 0; i <= differenceBetweenDatesInDays; i++) {  

          separationObj(temporaryStorage)

          if ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
          conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) { 
          removeTitle ( getDayCellTable ( temporaryStorage.date ) )
          daysInfo ( getDayCellTable ( temporaryStorage.date ), true )  
        }

          temporaryStorage.date = changeDate (temporaryStorage.date, i)
        }       

        return modalWindow.remove()
      }   
    }   
 
    

    if ( temporaryStorage.startRangeDateDisplay.toString() != temporaryStorage.endRangeDateDisplay.toString() ) {
      
      
    
      let numberCount = checkChooseCellsDate ( temporaryStorage.date, differenceBetweenDatesInDays, 0, [] )

      const getDateAboutDay = searchStorage (
        JSON.parse(localStorage.getItem("storageDate")),
        temporaryStorage.startRangeDateDisplay[0],
        temporaryStorage.startRangeDateDisplay[1],
        temporaryStorage.startRangeDateDisplay[2]
      )

      for ( let j = 0; j < getDateAboutDay.length + 1; j++) {

        if ( getDateAboutDay[j] == null ) {
          let getNextDay = changeDate (temporaryStorage.startRangeDateDisplay, true)           
          if ( checkLongNotes ( getNextDay, j ) ) {               

           let copeDateForMoving = copyElemFromStorage ( getNextDay, j)

           if ( copeDateForMoving != null ) { 

            let differenceBetweenDates = (conversionDate (copeDateForMoving.endRange) - 
            conversionDate (copeDateForMoving.startRange)) / (1000 * 60 * 60 * 24)

            const searchFreePosition = searchStorage(
              JSON.parse(localStorage.getItem("storageDate")),
              getNextDay[0],
              getNextDay[1],
              getNextDay[2]
            )

            let countOccupiedPosition 
            let positionOriginalElemForDelete 

              for ( let k = 0; k < searchFreePosition.length + 1; k++ ) { 
                if ( searchFreePosition[k] == null) {
                  countOccupiedPosition = k   
                  break                 
                } 

                if ( copeDateForMoving.countSubsequence == searchFreePosition[k].countSubsequence &&
                  copeDateForMoving.startRange.toString() == searchFreePosition[k].startRange.toString() && 
                  copeDateForMoving.endRange.toString() == searchFreePosition[k].endRange.toString() ) {
                    positionOriginalElemForDelete = k
                }                                                   
              }

              storageDate = separationObj ( getNextDay, true,  differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
                positionOriginalElemForDelete )         
            }
            break
          }
        }
      }

      temporaryStorage.countSubsequence = numberCount
      separationObj ( temporaryStorage )

      if  ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
      conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) {         
       
      removeTitle ( getDayCellTable ( temporaryStorage.date ) )
      daysInfo ( getDayCellTable ( temporaryStorage.date ), differenceBetweenDatesInDays )   
      }
           
      let additionalDays = getLastDayNote ( temporaryStorage.endRangeDateDisplay, temporaryStorage.endRangeDateDisplay, 0,
      getNumbTitle ( temporaryStorage ), "save" ) || 0
       
      for ( let i = 1; i <= differenceBetweenDatesInDays + additionalDays; i++) {

        temporaryStorage.date = changeDate (temporaryStorage.date, i)        
              
        temporaryStorage.countSubsequence = numberCount
        
        if ( i > differenceBetweenDatesInDays ) {
          temporaryStorage.countNull = additionalDays
        }
        
        separationObj(temporaryStorage)
        
        if ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
        conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) { 
          removeTitle ( getDayCellTable ( temporaryStorage.date ) )
          daysInfo ( getDayCellTable ( temporaryStorage.date ), true )  
        }      
                       
      }
      return modalWindow.remove()
    }
       
      separationObj(temporaryStorage)
  
    if (elem.contains(elem.querySelector(".titleCell"))) {
      removeTitle(elem)      
      daysInfo(elem, titlecell)
      return modalWindow.remove()
    }
    
    daysInfo(elem, false)  

    modalWindow.remove()
  }

  modalWindow.onclick = function (event) {
    if ( event.target == modalWindow ) {   
      modalWindow.remove()
    }
  }    
}
