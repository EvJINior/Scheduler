
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
    
    // if (  checkNull ( getInfoDay( elem, true ) ) >= 1 && i < 3) {
    let titleCell = document.createElement("div")
    titleCell.setAttribute("class", "titleCell")     
    
      titleCell.innerHTML = ( getInfoDay(elem, true)[i] == null ) ? 
      titleCell.innerHTML = "" : getInfoDay(elem, true)[i].title.substring(0, 15) 
 
      titleCell.style.backgroundColor = ( getInfoDay(elem, true)[i] == null ) ?
    "rgb(255, 255, 255)" : getInfoDay(elem, true)[i].color

      if ( titleCell.style.backgroundColor == "" ) {          
        titleCell.style.color = "rgb(255, 255, 255)"
      }

    elem.appendChild(titleCell)     

    const getTitle = getInfoDay(elem, true)[i]
    
      titleCell.onclick = function() {                   
        if ( getTitle == null ) {         

          modalTaskList(elem, getInfoDay(elem, false), getInfoDay(elem, true))
          return
        }  
  
        modalWindow(elem, getInfoDay(elem, true)[i], getInfoDay(elem, false), i)                                  
        }

      
        if ( getTitle != null && getTitle.startRange.toString() != getTitle.endRange.toString() ) {
          let differenceBetweenDates = (conversionDate (getTitle.endRange) - 
            conversionDate (getTitle.startRange)) / (1000 * 60 * 60 * 24)
            let widthElemTitle = 156
            let findDayWeek = 7 - handlerDayWeek( conversionDate ( getTitle.startRange ).getDay() )    

          if ( getTitle.startRange.toString() != elem.value.split('.').toString() && 
          conversionDate ( elem.value.split ( "." ) ).getDay() != 1 ) {  

            titleCell.innerHTML  = ""
          }

          if ( conversionDate ( elem.value.split ( "." ) ).getDay() == 0 &&
          getTitle.endRange.toString() == getInfoDay(elem).toString() ||
          getTitle.endRange.toString() == elem.value.split('.').toString() ) {
            continue
          }
          
          titleCell.style.width = widthElemTitle + "px"        
        
        }

      if (  i == 3 && checkNull ( getInfoDay( elem, true ) ) >= 3 ) {
        titleCell.innerHTML = '...'
        titleCell.style.width = "74px"
        titleCell.style.backgroundColor = "rgba(14, 94, 114, 0.963)"
        
        titleCell.onclick = function() {
          modalTaskList(elem, getInfoDay(elem, false), getInfoDay(elem, true))
        } 
        
        return
      }  


    // }

    }
  }

  function startMonth(referenceDate, content) {
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

      daysInfo(cellTable)
      
      cellTable.onclick = function (event) {      
        if (event.target == cellTable) {                

          if ( cellTable.contains(cellTable.querySelector('.titleCell')) == false ||
          getInfoDay(cellTable, true)[cellTable.querySelectorAll('.titleCell').length - 1] == null ) { 

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
        cellDay.appendChild(presenceNote)      
        }      
      }
    }
  }