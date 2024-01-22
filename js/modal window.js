let storageDate = {}

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

function saveINStorageDate( dataYYMMdd, storageDate, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete, index = 0) {

    if (storageDate[dataYYMMdd[index]] === undefined || storageDate[dataYYMMdd[2]] != null) {
        if (index === 2) {  
          
          for ( let i = 0; i <= differenceBetweenDates; i++) {
         
            if ( storageDate[dataYYMMdd[index]] == null ) {

              return storageDate
            }

            storageDate[dataYYMMdd[index]].splice( countOccupiedPosition, 0, copeDateForMoving )

            storageDate[dataYYMMdd[index]][positionOriginalElemForDelete] = null 
            dataYYMMdd = changeDate (dataYYMMdd, true)
          }
          return storageDate
        }
    }

  saveINStorageDate( dataYYMMdd, storageDate[dataYYMMdd[index]], differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete, index + 1)
  
  return storageDate
}

function separationObj(dataYYMMdd, key, differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
  positionOriginalElemForDelete ) {
    storageDate = JSON.parse(localStorage.getItem("storageDate")) || {} 
    
    if ( key ) {

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

      if (indexTitleDel == true) {    
                   
        if ( startRange.toString() !== endRange.toString() ) {

          const getDateAboutDay = searchStorage(
            JSON.parse(localStorage.getItem("storageDate")),
            separatedDate[0],
            separatedDate[1],
            separatedDate[2]
          )     
  
          for ( let i = 0; i < getDateAboutDay.length; i++) {          
            if ( getDateAboutDay[i] != null && getDateAboutDay[i].countSubsequence === baseObj.countSubsequence && 
                getDateAboutDay[i].startRange.toString() === baseObj.startRange.toString() &&
                getDateAboutDay[i].endRange.toString() === baseObj.endRange.toString() ) {

                  storageDate[separatedDate[index]].splice(i, 1)       
                  return storageDate
            }
          }
        }

        return storageDate
      } 

/////////////////////

      if (indexTitle != null) {     
        // if ( startRange.toString() !== endRange.toString() ) { 

        // }
        storageDate[separatedDate[index]][indexTitle] = baseObj      
                               
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
              if ( storageDate[separatedDate[index]][setPosition] == null ) {
                storageDate[separatedDate[index]][setPosition] = null
                return storageDate
              }
              storageDate[separatedDate[index]].splice( setPosition, 0, null )   
              return storageDate
            }            

            if ( storageDate[separatedDate[index]][setPosition] == null ) {
              storageDate[separatedDate[index]][setPosition] = baseObj
              return storageDate
            }
            
            // storageDate[separatedDate[index]][setPosition] = baseObj
          storageDate[separatedDate[index]].splice( setPosition, 0, baseObj )  
          return storageDate                  
          }       
        }

      for ( let j = 0; j < getDateAboutDay.length + 1; j++) {

          if ( getDateAboutDay[j] == null ) {
            let getNextDay = changeDate (baseObj.startRange, true)           
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

              countOccupiedPosition = 0
              positionOriginalElemForDelete = 0

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
                storageDate = separationObj ( getNextDay, separatedDate, true,  differenceBetweenDates, countOccupiedPosition, copeDateForMoving, 
                positionOriginalElemForDelete )
                  
              }
            }

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

  let buttonCloseList = document.createElement("img")
  buttonCloseList.setAttribute("class", "buttonCloseList")
  buttonCloseList.setAttribute("src", "icons/cross2.png")
  modalHeaderList.appendChild(buttonCloseList)

  let modalBodyList = document.createElement("div")
  modalBodyList.setAttribute("class", "modalBodyList")
  modalContentList.appendChild(modalBodyList)

  for (let i = 0; i < dayInfo.length; i++) {
    let bodyTitleEntry = document.createElement("div")
    bodyTitleEntry.setAttribute("class", "bodyTitleEntry highlightTitle")
    bodyTitleEntry.setAttribute("type", "button")    

    // bodyTitleEntry.innerHTML = ( dayInfo[i] == null ) ? 
    // continue : dayInfo[i].title.substring(0, 46)

    if ( dayInfo[i] == null ) {
      continue
    } 
   
    bodyTitleEntry.innerHTML = dayInfo[i].title.substring(0, 46) 
    bodyTitleEntry.style.outlineColor = dayInfo[i].color       
    bodyTitleEntry.style.backgroundColor = dayInfo[i].color

    modalBodyList.appendChild(bodyTitleEntry)   

    bodyTitleEntry.onclick = function () {
      modalWindowList.remove()
      modalWindow(cellTable, dayInfo[i], splitELem, i)          
    }
  }  

  modalWindowList.onclick = function (event) {
    if (event.target == modalWindowList || event.target == buttonCloseList) {
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

function circleChooseColor(buttonChooseColor, modalContent) {
  let listColors = ['rgb(140, 70, 215)', 'rgb(113, 127, 6)', 'rgb(141, 16, 12)', 'rgb(173, 163, 21)', 'rgb(38, 137, 137)']
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
    }    
  }      
}  

function addColorBorder (elem, splitELem, indexTitle) {
  const dayInfo = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    splitELem[0],
    splitELem[1],
    splitELem[2]
  )

  if(dayInfo[indexTitle] != null) {
    elem.style.borderColor = dayInfo[indexTitle].color
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

function displayDate (elemRangeDate, splitELem, elemCell, key) {  
  
  for (let i = 0; i < 9; i++) {
    let userSelectsDate = document.createElement("div")
    userSelectsDate.setAttribute("class", "userSelectsDate")
    userSelectsDate.setAttribute("type", "button")
    userSelectsDate.innerHTML = "-"
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
          console.log(elemRangeDate.value)    
      }
    }        

    

    if ( i < 3 ) {               
      getElemChooseUser[i].onclick = function () {  
        
        let  getElemRangeDate = elemRangeDate.querySelectorAll(".userSelectsDate")

        getElemRangeDate[i + 3].value = checkDate (elemRangeDate, +getElemRangeDate[i + 3].value, i + 3, true)              

        elemRangeDate.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value

        console.log("elem.value")
        console.log(elemRangeDate.value)
          }
        } 
      
      
      if ( i > 5 ) {        
      getElemChooseUser[i].onclick = function () {     

        let  getElemRangeDate = elemRangeDate.querySelectorAll(".userSelectsDate")
        
        getElemRangeDate[i - 3].value = checkDate (elemRangeDate, +getElemRangeDate[i - 3].value, i - 3, false)              

        elemRangeDate.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value          
        }
      }             
    }          
  }  

  function getLastDayNote (elemTemporaryStorage, elemUnaltered) {
    const checkBiggestEndrange = searchStorage(
      JSON.parse(localStorage.getItem("storageDate")),
      elemTemporaryStorage[0],
      elemTemporaryStorage[1],
      elemTemporaryStorage[2]
    )  
  
    const unalteredDate = elemUnaltered 
    
    let biggestEndrange = conversionDate ( elemTemporaryStorage )
   
    for ( let i = 0; i < checkBiggestEndrange.length; i++) {

      if ( checkBiggestEndrange[i] != null) {

        if ( biggestEndrange < conversionDate ( checkBiggestEndrange[i].endRange ) ) {     

          return getLastDayNote ( checkBiggestEndrange[i].endRange, elemUnaltered )
        }      
      }      
    }

      biggestEndrange = ( biggestEndrange - conversionDate ( unalteredDate ) ) / (1000 * 60 * 60 * 24)      

      return biggestEndrange
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

  function conversionDate (valueDate) {  
    let conversion = new Date(valueDate[0], valueDate[1], valueDate[2])      
    return conversion
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
  addColorBorder(modalContent, splitELem, indexTitle)

  let modalHeader = document.createElement("div")
  modalHeader.setAttribute("class", "modalHeader")
  modalContent.appendChild(modalHeader)    

  let headerTitle = document.createElement("div")
  headerTitle.setAttribute("class", "headerTitle")
  headerTitle.innerHTML =
  splitELem[2] + "  " + months[splitELem[1]] + "  " + splitELem[0]
  modalHeader.appendChild(headerTitle)

  let buttonClose = document.createElement("img")
  buttonClose.setAttribute("class", "buttonClose")
  buttonClose.setAttribute("src", "icons/cross2.png")
  modalHeader.appendChild(buttonClose)    

  let modalBody = document.createElement("div")
  modalBody.setAttribute("class", "modalBody")
  modalContent.appendChild(modalBody)   

  let headerInput = document.createElement("input")
  headerInput.setAttribute("class", "headerInput")  
  headerInput.value = titlecell.title || elem.title || ""  
  modalBody.appendChild(headerInput)
  
  let bodyInput = document.createElement("textarea")
  bodyInput.setAttribute("class", "bodyInput")
  bodyInput.setAttribute("type", "input")
  bodyInput.value = titlecell.text || elem.text || ""
  modalBody.appendChild(bodyInput)

  let modalSection = document.createElement("div")
  modalSection.setAttribute("class", "modalSection")   
  modalContent.appendChild(modalSection) 

  let startRangeDate = document.createElement("div")
  startRangeDate.setAttribute("class", "RangeDate") 
  startRangeDate.setAttribute("type", "button") 
  displayDate (startRangeDate, splitELem, getInfoDay(elem, true)[indexTitle], true)
  modalSection.appendChild(startRangeDate)     
  
  let endRangeDate = document.createElement("div")
  endRangeDate.setAttribute("class", "RangeDate") 
  endRangeDate.setAttribute("type", "button")
  displayDate (endRangeDate, splitELem, getInfoDay(elem, true)[indexTitle], false)
  modalSection.appendChild(endRangeDate)  



  let modalFooter = document.createElement("div")
  modalFooter.setAttribute("class", "modalFooter")
  modalContent.appendChild(modalFooter)

  // localStorage.clear()
  // console.log(startRangeDate.value)
  // console.log(endRangeDate.value)

  let buttonChooseColor = document.createElement("div")
  buttonChooseColor.setAttribute("class", "buttonChooseColor") 
  // modalFooter.appendChild(buttonChooseColor, indexTitle)  ????????? Почему тут indexTitle
  modalFooter.appendChild(buttonChooseColor, indexTitle)    
  
  circleChooseColor(buttonChooseColor, modalContent)
  
  if (titlecell.title != null) {
    let buttonDelete = document.createElement("div")
    buttonDelete.setAttribute("class", "buttonDelete")
    buttonDelete.innerHTML = "delete"
    buttonDelete.setAttribute("type", "button")
    modalFooter.appendChild(buttonDelete)

    buttonDelete.onclick = function () {    
      
      const getDateCountSub = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          startRangeDate.value.split(".")[0],
          startRangeDate.value.split(".")[1],
          startRangeDate.value.split(".")[2]        
        )

      let temporaryStorage = {
                   
      date: changeDate (startRangeDate.value.split(".")),    
      // date: splitELem,    

      // title: checkTemporaryStorageTitle(headerInput).trim(),

      // text: bodyInput.value.trim(),

      indexTitle: indexTitle,

      indexTitleDel: true,

      color: modalContent.style.borderColor,
   
      startRangeDateDisplay: changeDate (startRangeDate.value.split(".")),

      endRangeDateDisplay: changeDate (endRangeDate.value.split(".")),

      countSubsequence: getDateCountSub[indexTitle].countSubsequence
      
      }
            
      // console.log("+++temporaryStorage.countSubsequence---")
      // console.log(temporaryStorage.countSubsequence)
      if ( temporaryStorage.startRangeDateDisplay.toString() != temporaryStorage.endRangeDateDisplay.toString()) {

        // const getDateCountSub = searchStorage(
        //   JSON.parse(localStorage.getItem("storageDate")),
        //   temporaryStorage.date[0],
        //   temporaryStorage.date[1],
        //   temporaryStorage.date[2]
        // )
        // if ( getDateCountSub[temporaryStorage.indexTitle] != null) {
        //   temporaryStorage.countSubsequence = getDateCountSub[temporaryStorage.indexTitle].countSubsequence
        //   // console.log(temporaryStorage.countSubsequence)
        // }

        let differenceBetweenDatesInDays = 
        (conversionDate (temporaryStorage.endRangeDateDisplay) - conversionDate (temporaryStorage.startRangeDateDisplay)) 
        / (1000 * 60 * 60 * 24)

        let additionalDays = getLastDayNote ( temporaryStorage.endRangeDateDisplay, temporaryStorage.endRangeDateDisplay ) || 0

        for ( let i = 0; i <= differenceBetweenDatesInDays + additionalDays; i++) {

                  
          // if ( getDateCountSub[temporaryStorage.indexTitle] != null) {
          // temporaryStorage.countSubsequence = getDateCountSub[temporaryStorage.indexTitle].countSubsequence
          // }
          
          if ( i > differenceBetweenDatesInDays ) {
            const getDateCountSub = searchStorage(
              JSON.parse(localStorage.getItem("storageDate")),
              temporaryStorage.date[0],
              temporaryStorage.date[1],
              temporaryStorage.date[2]
            )

            console.log("temporaryStorage.date ====")
            console.log(getDateCountSub[temporaryStorage.indexTitle])
            // temporaryStorage.countNull = additionalDays
          }
        
          separationObj(temporaryStorage)
        
          if ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
          conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) { 
            removeTitle ( getDayCellTable ( temporaryStorage.date ) )
            daysInfo ( getDayCellTable ( temporaryStorage.date ) )  
          }
           
          temporaryStorage.date = changeDate (temporaryStorage.date, i)
        }

        temporaryStorage.indexTitleDel = false; 
        return modalWindow.remove()
      }
    
          
      separationObj(temporaryStorage)
      temporaryStorage.indexTitleDel = false;    
  
      removeTitle(elem)
      daysInfo(elem, titlecell)    
      modalWindow.remove()
    }
  }
 
  let buttonSave = document.createElement("div")  
  buttonSave.setAttribute("class", "buttonSave")
  buttonSave.innerHTML = "save"
  buttonSave.setAttribute("type", "button")
  modalFooter.appendChild(buttonSave)  

  buttonSave.onclick = function () {      

    // localStorage.clear()
    
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
          
    if (conversionDate (temporaryStorage.date) > conversionDate (temporaryStorage.endRangeDateDisplay)) {   
      startRangeDate.style.border = "3px rgb(210, 0, 0) solid"
      startRangeDate.style.color = "rgb(210, 0, 0)"

      return setTimeout(() => {
        startRangeDate.style.border = "1px rgb(0, 0, 0) solid"
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
    if ( temporaryStorage.startRangeDateDisplay.toString() != temporaryStorage.endRangeDateDisplay.toString() ) {
      
      let differenceBetweenDatesInDays = 
    (conversionDate (temporaryStorage.endRangeDateDisplay) - conversionDate (temporaryStorage.startRangeDateDisplay)) / (1000 * 60 * 60 * 24)
    
      let numberCount = checkChooseCellsDate ( temporaryStorage.date, differenceBetweenDatesInDays, 0, [] )

//////////////////////////////////////////

      const getDateAboutDay = searchStorage(
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

            countOccupiedPosition = 0
            positionOriginalElemForDelete = 0

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
          }
        }
      }

////////////////////////////////////////////

      temporaryStorage.countSubsequence = numberCount
      separationObj ( temporaryStorage )

      if  ( conversionDate ( temporaryStorage.date ) >= conversionDate ( document.querySelector(".cellTable").value.split(".") ) && 
      conversionDate ( temporaryStorage.date ) <= conversionDate ( document.querySelectorAll(".cellTable")[41].value.split(".") ) ) {         
      // removeTitle ( elem )     
      removeTitle ( getDayCellTable ( temporaryStorage.date ) )
      daysInfo ( getDayCellTable ( temporaryStorage.date ), differenceBetweenDatesInDays )   
      }
    
     let additionalDays = getLastDayNote ( temporaryStorage.endRangeDateDisplay, temporaryStorage.endRangeDateDisplay ) || 0

    //  function deleteNulls ( dataYYMMdd,  ) {
    //   const getNotesDay = searchStorage(
    //     JSON.parse(localStorage.getItem("storageDate")),
    //     dataYYMMdd[0],
    //     dataYYMMdd[1],
    //     dataYYMMdd[2]
    //   )
    //   console.log("getNotesDay")
    //   console.log(dataYYMMdd)
    //   console.log(getNotesDay[getNotesDay.length - 1] == null)
    //   if ( getNotesDay[getNotesDay.length - 1] == null ) {
        
    //   }
      

    // }
     
      for ( let i = 1; i <= differenceBetweenDatesInDays + additionalDays; i++) {

        // deleteNulls ( temporaryStorage.date, )
                
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
    if (event.target == modalWindow || event.target == buttonClose) {
      modalWindow.remove()
    }
  }    
}



/* Важная функция!!!
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
                  
    return checkChooseCellsDate ( conversionDateVersion2 ( firstDate, true ), differenceBetweenDatesInDays, freeNumb, arrayCount, index + 1 )                                            
  }
  */