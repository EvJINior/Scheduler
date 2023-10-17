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
      
      daysInfo(cellTable)
        
      cellTable.onclick = function (event) {      
        if (event.target == cellTable) {  
          const splitELem = cellTable.value.split(".") 
          const dayInfo = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          splitELem[0],
          splitELem[1],
          splitELem[2]
        )
        
        if (cellTable.contains(cellTable.querySelector('.titleCell')) == false) {    
        
          return modalWindow(cellTable, "null", splitELem)
        }
        
        modalTaskList(cellTable, splitELem, dayInfo)
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
        Months[numbMonth]
  
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

        const splitELem = cellDay.value.split(".")
        const dayInfo = searchStorage(
          JSON.parse(localStorage.getItem("storageDate")),
          splitELem[0],
          splitELem[1],
          splitELem[2]
        )
          if (dayInfo.length > 0) {
        let presenceNote = document.createElement("div")
        presenceNote.setAttribute("class", "presenceNote")
        // presenceNote.innerHTML = '✓'    
        cellDay.appendChild(presenceNote)      
        }      
      }
    }
  }