function searchStorage(getObject, fragmentYear, fragmentMonth, fragmentDay) {
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

function conversionDate (valueDate) {  
    let conversion = new Date(valueDate[0], valueDate[1], valueDate[2])      
    return conversion
  } 





function getInfoDay(elem, keySwitch) {
  const splitELem = elem.value.split(".")
  if ( keySwitch ) {
        const dayInfo = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          splitELem[0],
          splitELem[1],
          splitELem[2]
        )
        return dayInfo
  }
  return splitELem      
}

function daysInfo(elem, key) {     
  for (let i = 0; i < getInfoDay(elem, true).length; i++) {          
    let titleCell = document.createElement("div")
    titleCell.setAttribute("class", "titleCell")     
    // titleCell.innerHTML = getInfoDay(elem, true)[i].title.substring(0, 15)  
    // titleCell.style.backgroundColor = getInfoDay(elem, true)[i].color 
    
      titleCell.innerHTML = ( getInfoDay(elem, true)[i] == null ) ? 
      titleCell.innerHTML = "" : getInfoDay(elem, true)[i].title.substring(0, 15) 

      titleCell.style.backgroundColor = ( getInfoDay(elem, true)[i] == null ) ?
    "rgb(255, 255, 255)" : getInfoDay(elem, true)[i].color 

    elem.appendChild(titleCell)     

    // function handlerTitle ( titleCell,  ) { 
      const getTitle = getInfoDay(elem, true)[i]
      // if ( getTitle.startRange)
      // console.log("getTitle")
      //   console.log(getInfoDay(elem))

      // let sadf = document.querySelectorAll(".cellTable")[1]
      // let getStyle = window.getComputedStyle(sadf).width.slice( 0 , -2)
      
      
      // let widthStyle = getStyle
      // console.log("sadf")
      // console.log( getStyle )

      titleCell.onclick = function() {                   
        if ( getInfoDay( elem, true )[i] == null ) {

          modalTaskList(elem, getInfoDay(elem, false), getInfoDay(elem, true))
          return
        }  
  
        modalWindow(elem, getInfoDay(elem, true)[i], getInfoDay(elem, false), i)                                  
        }

      if (i > 2) {
        titleCell.innerHTML = '...'
        titleCell.style.backgroundColor = "tan" 
        titleCell.onclick = function() {
          modalTaskList(elem, getInfoDay(elem, false), getInfoDay(elem, true))
        }        
        return        
      } 

      

      if ( getTitle != null && getTitle.startRange.toString() != getTitle.endRange.toString() ) {
        let differenceBetweenDates = (conversionDate (getTitle.endRange) - 
          conversionDate (getTitle.startRange)) / (1000 * 60 * 60 * 24)
          let widthElemTitle = 157
          let widthStyleTitle = widthElemTitle * differenceBetweenDates + 120
          let findDayWeek = 7 - handlerDayWeek( conversionDate ( getTitle.startRange ).getDay() )                         

        if ( conversionDate ( elem.value.split ( "." ) ).getDay() == 0 && getTitle.startRange.toString() == getInfoDay(elem).toString()) {
          titleCell.style.position = "relative"
          titleCell.style.width = widthElemTitle + "px"
          continue
        }

        if ( getTitle.startRange.toString() == getInfoDay(elem).toString() ) {   
               
          if ( findDayWeek < differenceBetweenDates ) {
            widthStyleTitle = widthElemTitle * findDayWeek + 120
            titleCell.style.position = "relative"
            titleCell.style.width = widthStyleTitle + "px"
            continue
          }          
                  
          titleCell.style.position = "relative"
          titleCell.style.width = widthStyleTitle + "px"
          continue
        }        

         
          
        if ( conversionDate ( elem.value.split ( "." ) ).getDay() == 1 ) { 
          if ( conversionDate ( getTitle.startRange ) < conversionDate ( elem.value.split ( "." ) ) ) {            
            widthStyleTitle = ( differenceBetweenDates - findDayWeek - 1 ) * widthElemTitle + 120
            titleCell.style.position = "relative"
            titleCell.style.width = widthStyleTitle + "px"
            continue
          }  
          titleCell.style.position = "relative"
          titleCell.style.width = widthStyleTitle + "px"
          continue
        }
    
        titleCell.innerHTML = ""
        titleCell.style.backgroundColor = "rgb(255, 255, 255)"
      }
      

    // }

    // handlerTitle (  )

    
      // if ( key == true) {
      //   titleCell.innerHTML = ""
      //   titleCell.style.backgroundColor = "rgb(255, 255, 255)"
      // }
      //   // let sadf = document.querySelector(".monthView")
      //   // let getStyle = window.getComputedStyle(sadf)
      //   // // let widthStyle = getStyle
      //   // console.log("sadf")
      //   // console.log( getStyle )
      // if ( Number.isInteger(key) ) {        
      //   let widthTitle = 152.7 * key + 120
      //   titleCell.setAttribute("class", "titleCellChanges") 
      //   console.log("key")
      //   console.log( widthTitle )
        
      //   // titleCell.style.position = "relative"
      //   titleCell.style.width = widthTitle + "px"
      //   // titleCell.style.width = "360px"
      // }
   

        
            
      
    }  
  } 

  function startMonth(referenceDate, handlerNumbDay, content) {
    let titleDaysWeek = document.createElement("div")
    titleDaysWeek.setAttribute("class", "titleDaysWeek")
    content.appendChild(titleDaysWeek)
  
    let monthView = document.createElement("div")
    monthView.setAttribute("class", "monthView")
    content.appendChild(monthView)
  
    for (let j = 0; j < 7; j++) {
      let daysWeek = document.createElement("div")
      daysWeek.setAttribute("class", "daysWeek")
      daysWeek.innerHTML = nameDaysWeek[j]
      titleDaysWeek.appendChild(daysWeek)      
    }

    let changeButton = document.createElement("div")
    changeButton.setAttribute("class", "changeButton")
    monthView.appendChild(changeButton)
  
    for (let i = 0; i < 42; i++) {
      let cellTable = document.createElement("div")
      cellTable.setAttribute("class", "cellTable")
      cellTable.setAttribute("type", "button")
      changeButton.appendChild(cellTable)
  
      let days = new Date(
        referenceDate.year,
        referenceDate.month,
        i - handlerDayWeek(new Date(referenceDate.year, referenceDate.month, 1).getDay()) + 2
        )
      cellTable.innerHTML = handlerNumbDay(days.getDate(), days.getMonth())
      cellTable.value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate())   

      // console.log("days " + i)
      // let fff = document.querySelectorAll(".cellTable")[i]
      // console.log(fff)
      // console.log(fff.querySelectorAll(".titleCell"))

      daysInfo(cellTable)
      
      cellTable.onclick = function (event) {      
        if (event.target == cellTable) {                

          if ( cellTable.contains(cellTable.querySelector('.titleCell')) == false ||
          getInfoDay(cellTable, true)[cellTable.querySelectorAll('.titleCell').length - 1] == null ) { 

            return modalWindow(cellTable, "null", getInfoDay(cellTable, false))

          }  
          // console.log(cellTable.querySelectorAll('.titleCell').length)
          // console.log( getInfoDay(cellTable, true)[cellTable.querySelectorAll('.titleCell').length - 1] == null )
        modalTaskList( cellTable, getInfoDay(cellTable, false), getInfoDay(cellTable, true) )

        }
      }
    }
  }

  
function handlerYear(object) {
    document.querySelector(".navNameMonth").innerHTML = object
      
    let yearView = document.createElement("div")
    yearView.setAttribute("class", "yearView content")
    content.appendChild(yearView)
  
    for (let numbMonth = 0; numbMonth < 12; numbMonth++) {
      let cellMonth = document.createElement("div")
      cellMonth.setAttribute("class", "cellMonth")
      yearView.appendChild(cellMonth)
  
      cellMonth.value = object + "." + numbMonth
      document.querySelectorAll(".cellMonth")[numbMonth].innerHTML =
        months[numbMonth]
  
      let lastDayMonth = new Date(
        object,
        numbMonth + 1,
        1 - new Date(object, numbMonth + 1, 1).getDate()
      ).getDate()
      let nameday = document.createElement("div")
      nameday.setAttribute("class", "nameday")
      cellMonth.appendChild(nameday)     
  
      for (let k = 0; k < 7; k++) {
        let dayW = document.createElement("div")
        dayW.setAttribute("class", "dayW")
        dayW.innerHTML = nameDaysWeek[k].substring(0, 2)
        nameday.appendChild(dayW)      
      }
  
      let daysMonth = document.createElement("div")
      daysMonth.setAttribute("class", "daysMonth")
      cellMonth.appendChild(daysMonth)
  
      for (let n = 1; n < handlerDayWeek(new Date(object, numbMonth, 1).getDay()); n++) {
        let cellDay = document.createElement("div")        
        daysMonth.appendChild(cellDay)            
      }
  
      for (let j = 0; j < lastDayMonth; j++) {
        let cellDay = document.createElement("div")
        cellDay.setAttribute("class", "cellDay")
        cellDay.setAttribute("type", "button")
        cellDay.innerHTML = j + 1
        cellDay.value = object + "." + numbMonth + "." + addZero(cellDay.innerHTML)         
        daysMonth.appendChild(cellDay)

        if (cellDay.value == new Date().getFullYear() + '.' + new Date().getMonth() + '.' + addZero(new Date().getDate())) {          
          cellDay.style.backgroundColor = 'antiquewhite' 
        } 
       
          if ( getInfoDay(cellDay, true).length > 0 ) {
        let presenceNote = document.createElement("div")
        presenceNote.setAttribute("class", "presenceNote")
        // presenceNote.innerHTML = '✓'    
        cellDay.appendChild(presenceNote)      
        }      
      }
    }
  }

  // function handlerWeek (referenceDate, content,  handlerNumbDay) {

  // let week = document.createElement("div")
  //   week.setAttribute("class", "week")
  //   week.setAttribute("type", "button")
  //   content.appendChild(week)

  // for (let i = 0; i < 42; i++) {
  //   let weekTable = document.createElement("div")
  //   weekTable.setAttribute("class", "weekTable")
  //   weekTable.setAttribute("type", "button")
  //   week.appendChild(weekTable)

  //   let days = new Date(
  //     referenceDate.year,
  //     referenceDate.month,
  //     i - handlerDayWeek(new Date(referenceDate.year, referenceDate.month, 1).getDay()) + 2
  //     )
  //     // console.log(days)

  //     let counterWeek = new Date(
  //       referenceDate.year,
  //       3,
  //       i - handlerDayWeek(new Date(referenceDate.year, 3, 1).getDay()) + 2
  //       )
  //       // console.log(new Date(referenceDate.year, 3, i).getDay())
  //       // console.log(new Date(referenceDate.year, 3, i))
  //       if (new Date(referenceDate.year, 3, i).getDay() === 1) {   
  //     console.log(new Date(referenceDate.year, 3, i).getDay())
  //     console.log(counterWeek)
  //       }
  //     // weekTable.innerHTML = handlerNumbDay(days.getDate(), days.getMonth())
  //     weekTable.value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate()) 
  //   }
  // }
  

  // function handlerWeek (referenceDate, weeks,  handlerNumbDay, getNumbMonth) {         

  //     let numbMonth = document.createElement("div")
  //     numbMonth.setAttribute("class", "numbMonth")      
  //     numbMonth.innerHTML = handlerNumbDay(referenceDate.month)
  //     weeks.appendChild(numbMonth)

  //     let nameMonth = document.createElement("div")
  //     nameMonth.setAttribute("class", "nameMonth")      
  //     nameMonth.innerHTML = Months[referenceDate.month]
  //     weeks.appendChild(nameMonth)

  //     let weekContent = document.createElement("div")
  //     weekContent.setAttribute("class", "weekContent")      
  //     // weekContent.innerHTML = Months[referenceDate.month]
  //     weeks.appendChild(weekContent)
      

  //   let counterWeek = 0;
  //   for (let i = 0; i <= getNumbMonth; i++) {
  //     for (let k = 0; k < new Date(referenceDate.year, i+1, 0).getDate(); k++) { // все дни месяца          
  //       if (new Date(referenceDate.year, i+1, k).getDay() == 1) {
  //         counterWeek = counterWeek + 1;           
  //         if ( i == getNumbMonth ) {
  //           let weekMonth = document.createElement("div")
  //           weekMonth.setAttribute("class", "weekMonth")                           
  //           weekContent.appendChild(weekMonth)

  //           let weekTitle = document.createElement("div")
  //           weekTitle.setAttribute("class", "weekTitle")         
  //           weekTitle.innerHTML = 'Week ' + counterWeek
  //           weekMonth.appendChild(weekTitle)

  //           let weekPeriod = document.createElement("div")
  //           weekPeriod.setAttribute("class", "weekPeriod")                       
  //           weekPeriod.innerHTML = 
  //           new Date(referenceDate.year, i+1, k).getMonth() + "/" + new Date(referenceDate.year, i+1, k).getDate() + " - " + 
  //           new Date(referenceDate.year, i+1, k + 6).getMonth() + "/" + new Date(referenceDate.year, i+1, k + 6).getDate()
  //           weekMonth.appendChild(weekPeriod)

  //           let weekNestedDays = document.createElement("div")
  //           weekNestedDays.setAttribute("class", "weekNestedDays")
  //           weekMonth.appendChild(weekNestedDays)
  //           console.log(counterWeek)
  //           // console.log(new Date(referenceDate.year, i, k))
            
  //           // for (let n = new Date(referenceDate.year, i, 0).getDate(); n > new Date(referenceDate.year, i, 0).getDate() - 7; n--) {
  //           //   let weekSevenDays = document.createElement("div")
  //           //   weekSevenDays.setAttribute("class", "weekSevenDays")
  //           //   weekSevenDays.innerHTML = new Date(referenceDate.year, i, n).getDate()              
  //           //   weekNestedDays.appendChild(weekSevenDays)
  //           //   console.log(new Date(referenceDate.year, i, k + j))
  //           // }

  //           for (let j = 0; j < 7; j++) {
  //             let weekSevenDays = document.createElement("div")
  //             weekSevenDays.setAttribute("class", "weekSevenDays")
  //             weekSevenDays.innerHTML = new Date(referenceDate.year, i, k + j).getDate()
  //             // cellTable.innerHTML = handlerNumbDay(days.getDate(), days.getMonth())
  //             // cellTable.value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate())
  //             weekNestedDays.appendChild(weekSevenDays)
  //             console.log(new Date(referenceDate.year, i, k + j))
  //           }
  //         }         
  //         // let weekTable = document.createElement("div")
  //         // weekTable.setAttribute("class", "weekTable")
  //         // weekTable.setAttribute("type", "button")
  //         // week.appendChild(weekTable)
  //         // console.log(counterWeek = counterWeek + 1)
  //       }
  //     }
  //   }
  // }