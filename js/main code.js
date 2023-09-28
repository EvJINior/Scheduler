// import content from './conteiner table.js'

const Months = [
  "January",
  "Februare",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const nameDaysWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

function addZero (elem) {
  if (elem < 10) {
  return elem = "0" + elem
} 
return elem
}

let referenceDate = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: 1,
}

function handlerDayWeek(numbDay) {
  if (numbDay == 0) return 7
  else return numbDay
}

function handlerMonth(Object, numbMonth, numbYear) {
  if (numbMonth > 11) return (Object.month = 0), (Object.year = numbYear + 1)
  if (numbMonth < 0) return (Object.month = 11), (Object.year = numbYear - 1)
  else return Object.month, Object.year
}

function changesDate(object) {
  let getCellTable = content.querySelectorAll(".cellTable")
  let getNavNameMonth = headerNav.querySelectorAll(".navNameMonth")
  for (let i = 0; i < 42; i++) {
    let days = new Date(
      object.year,
      object.month,
      i - handlerDayWeek(new Date(object.year, object.month, 1).getDay()) + 2
    )
    getCellTable[i].innerHTML = handlerNumbDay(days.getDate(), days.getMonth())
    getCellTable[i].value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate())

    daysInfo(getCellTable[i])    
  }
  getNavNameMonth[0].innerHTML = object.year + " " + Months[object.month]
}

function handlerNumbDay(numb, month) {
  let processedMonth = month + 1
  if (numb < 10) {
    if (numb == 1) {
      if (month < 9) return "0" + numb + "." + "0" + processedMonth
      else return "0" + numb + "." + processedMonth
    } else {
      return "0" + numb
    }
  } else {
    return numb
  }
}

/*
function removeElem(varrible, elem) {
    for ( let i = 0; i < elem.length; i++) {    
        varrible.removeChild(elem[i])
    }
}
// removeElem(content, content.querySelectorAll('.cellMonth'))
*/

function highlightToday(elem) {
  let date = referenceDate.year + "." + referenceDate.month + "." + addZero(new Date().getDate())
  for (let i = 0; i < elem.length; i++) {
    if (elem[i].value == date) {
      console.log(elem[i])
      elem[i].style.border = "6px rgb(26, 125, 149) solid"
      setTimeout(
        () => (elem[i].style.border = "1px rgb(26, 125, 149) solid"),
        500
      )
    }
  }
}

function highlightMonth(elem) {
  let date = referenceDate.year + "." + new Date().getMonth()
  for (let i = 0; i < elem.length; i++) {
    if (elem[i].value == date) {
      elem[i].style.border = "6px rgb(30, 91, 117) solid"
      setTimeout(
        () => (elem[i].style.border = "1px rgb(26, 125, 149) solid"),
        500
      )
    }
  }
}

let container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

let headerNav = document.createElement("div")
headerNav.setAttribute("class", "headerNav")
container.appendChild(headerNav)

let navChangeMonth = document.createElement("div")
navChangeMonth.setAttribute("class", "navChangeMonth")
navChangeMonth.setAttribute("type", "button")
headerNav.appendChild(navChangeMonth)

let ChangeLeft = document.createElement("i")
ChangeLeft.setAttribute("class", "fa fa-angle-left")
ChangeLeft.setAttribute("type", "button")
navChangeMonth.appendChild(ChangeLeft)

let ChangeRight = document.createElement("i")
ChangeRight.setAttribute("class", "fa fa-angle-right")
ChangeRight.setAttribute("type", "button")
navChangeMonth.appendChild(ChangeRight)

ChangeRight.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year += 1))
  } else {
    handlerMonth(referenceDate, (referenceDate.month += 1), referenceDate.year)
    changesDate(referenceDate)
  }
}

ChangeLeft.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {
    // console.log("Hi")
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year -= 1))
  } else {
    handlerMonth(referenceDate, (referenceDate.month -= 1), referenceDate.year)
    changesDate(referenceDate)
  }
}

let navNameMonth = document.createElement("div")
navNameMonth.setAttribute("class", "navNameMonth")
navNameMonth.setAttribute("type", "button")
navNameMonth.innerHTML = referenceDate.year + " " + Months[referenceDate.month]
headerNav.appendChild(navNameMonth)

let navToday = document.createElement("div")
navToday.setAttribute("class", "navToday")
navToday.setAttribute("type", "button")
navToday.innerHTML = "Today"
headerNav.appendChild(navToday)

navToday.onclick = function () {
  if (content.contains(document.querySelector(".cellTable")) == false) {
    content.querySelector(".yearView").remove()
    startMonth(referenceDate, handlerNumbDay, content)
  }

  referenceDate.month = new Date().getMonth()
  referenceDate.year = new Date().getFullYear()
  changesDate(referenceDate)
  highlightToday(document.querySelectorAll(".cellTable"))
}

let navYear = document.createElement("div")
navYear.setAttribute("class", "navYear")
navYear.setAttribute("type", "button")
navYear.innerHTML = "Year"
headerNav.appendChild(navYear)

navYear.onclick = function () {
  if (content.contains(document.querySelector(".cellDay")) == false) {
    content.querySelector(".titleDaysWeek").remove()
    content.querySelector(".monthView").remove()
    handlerYear(referenceDate.year)
  } else if (
    document.querySelector(".navNameMonth").innerHTML !=
    new Date().getFullYear()
  ) {
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year = new Date().getFullYear()))
  }

  highlightMonth(content.querySelectorAll(".cellMonth"))
}

///////////////////////////////////////

let content = document.createElement("div")
content.setAttribute("class", "content")
container.appendChild(content)

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
      
    ///////////////////////////////////////////////////////
    // createTitleCell (cellTable, cellTable)
    // console.log(cellTable.value)
    daysInfo(cellTable)
      // console.log(cellTable.value )
    //////////////////////////////////////////////////////

    cellTable.onclick = function (event) {      
      if (event.target == cellTable) {  
        const splitELem = cellTable.value.split(".") 
        // console.log(splitELem)              
        const dayInfo = searchStorage(
        JSON.parse(localStorage.getItem("storageDate")),
        splitELem[0],
        splitELem[1],
        splitELem[2]
      )
      
      if (cellTable.contains(cellTable.querySelector('.titleCell')) == false) {    
      
        return modalWindow(cellTable, "null", splitELem)
      }
      // modalTaskList(cellTable, splitELem)
              //  modalWindow(cellTable)
      modalTaskList(cellTable, splitELem, dayInfo)
      }
    }
  }
}

startMonth(referenceDate, handlerNumbDay, content)

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
      // console.log(handlerDayWeek(new Date(object, numbMonth, 1).getDay()))
      // cellTable.value = days.getFullYear() + "." + days.getMonth() + "." + addZero(days.getDate())
      //  
      daysMonth.appendChild(cellDay)
      // if 
      
    }

    for (let j = 0; j < lastDayMonth; j++) {
      let cellDay = document.createElement("div")
      cellDay.setAttribute("class", "cellDay")
      cellDay.setAttribute("type", "button")
      cellDay.innerHTML = j + 1
      cellDay.value = object + "." + numbMonth + "." + addZero(cellDay.innerHTML) 
      daysMonth.appendChild(cellDay)

      
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

function daysInfo(elem, color) {  
  const splitELem = elem.value.split(".")
  const dayInfo = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    splitELem[0],
    splitELem[1],
    splitELem[2]
  )
 
  for (let i = 0; i < dayInfo.length; i++) {          
    let titleCell = document.createElement("div")
    titleCell.setAttribute("class", "titleCell") 
    titleCell.innerHTML = dayInfo[i].title.substring(0, 15)       
    elem.appendChild(titleCell) 
      if (i > 2) {
        titleCell.innerHTML = '...'
        titleCell.onclick = function() {
          modalTaskList(elem, splitELem, dayInfo)
        }        
        return        
      }   
      
    titleCell.onclick = function() {                   
        modalWindow(elem, dayInfo[i], splitELem, i)                           
      }  
    }  
  }  
