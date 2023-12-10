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

function getInfoDay(elem, keySwitch) {
  const splitELem = elem.value.split(".")
  if (keySwitch){
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
    titleCell.innerHTML = getInfoDay(elem, true)[i].title.substring(0, 15) 
    titleCell.style.backgroundColor = getInfoDay(elem, true)[i].color      
    elem.appendChild(titleCell) 
    console.log("getInfoDay")
    // let ert = getInfoDay(elem, true)[i].start.sort().join('.')
    // let ter = getInfoDay(elem, true)[i].end
    // console.log(ert)
    // console.log(ter)
    // console.log(getInfoDay(elem, true)[i].end)
    // console.log(getInfoDay(elem, true)[i].start.join('.'))
    // let temporaryVar = +getInfoDay(elem, true)[i].end[2] + 1
    // let tem = getInfoDay(elem, true)[i].end.splice(2, 1, +getInfoDay(elem, true)[i].end[2] + 1)
    // console.log("temporaryVar")
    // console.log(tem)

    // let tem = getInfoDay(elem, true)[i].start[2].split(0, 1, )
      // if(key){
      //   // if (getInfoDay(elem, true)[i].start.join('.') < getInfoDay(elem, true)[i].end.join('.')) {
      //     console.log( "Gerty")
      //     titleCell.innerHTML = ""
      //     titleCell.style.backgroundColor = "rgb(255, 255, 255)"
      //   // }
      // }
      
      if (i > 1) {
        titleCell.innerHTML = '...'
        titleCell.style.backgroundColor = "tan" 
        titleCell.onclick = function() {
          modalTaskList(elem, getInfoDay(elem, false), getInfoDay(elem, true))
        }        
        return        
      }   
      
    titleCell.onclick = function() {       
      console.log("getInfoDay(elem, true)[i]")            
      console.log(getInfoDay(elem, true)[i])            
        modalWindow(elem, getInfoDay(elem, true)[i], getInfoDay(elem, false), i)                           
      }  
    }  
  } 

  function startMonth(referenceDate, handlerNumbDay, content) {
    let titleDaysWeek = document.createElement("div")
    titleDaysWeek.setAttribute("class", "titleDaysWeek content")
    content.appendChild(titleDaysWeek)
  
    let monthView = document.createElement("div")
    monthView.setAttribute("class", "monthView content")
    content.appendChild(monthView)
  
    for (let j = 0; j < 7; j++) {
      let daysWeek = document.createElement("div")
      daysWeek.setAttribute("class", "daysWeek")
      daysWeek.innerHTML = nameDaysWeek[j]
      titleDaysWeek.appendChild(daysWeek)      
    }
  
    for (let i = 0; i < 42; i++) {
      let cellTable = document.createElement("div")
      cellTable.setAttribute("class", "cellTable")
      cellTable.setAttribute("type", "button")
      monthView.appendChild(cellTable)
  
      let days = new Date(
        referenceDate.year,
        referenceDate.month,
        i - handlerDayWeek(new Date(referenceDate.year, referenceDate.month, 1).getDay()) + 2
        )
      cellTable.innerHTML = handlerNumbDay(days.getDate(), days.getMonth())
      cellTable.value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate())    
      // console.log("days")
      // console.log(days)

      daysInfo(cellTable)
      
      cellTable.onclick = function (event) {      
        if (event.target == cellTable) {                

          if (cellTable.contains(cellTable.querySelector('.titleCell')) == false) { 

            return modalWindow(cellTable, "null", getInfoDay(cellTable, false))

          }  

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