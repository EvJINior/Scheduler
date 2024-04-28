// localStorage.clear()

const months = [
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

const arrayRight = '<svg viewBox="-6 -9 36 32"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path></svg>'
const arrayLeft = '<svg viewBox="-6 -9 36 32"><path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"></path></svg>'

function addZero (elem) {
return elem < 10 ? `0${elem}` : elem
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

function handlerNumbMonth(Object, numbMonth, numbYear) {
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
  
  getNavNameMonth[0].innerHTML = object.year + " " + months[object.month]
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

function highlightElem ( elem ) {
  let dateToday = referenceDate.year + "." + referenceDate.month + "." + addZero(new Date().getDate())
  let dateMonth = referenceDate.year + "." + new Date().getMonth()
  for ( let i = 0; i < elem.length; i++ ) { 
    if ( elem[i].value == dateToday ) { 
      elem[i].style.border = "3px rgba(21, 119, 144, 0.963) solid"
      setTimeout(  
        () => ( elem[i].style.border = "1px rgb(26, 125, 149) solid" ),        
        700
      )
    }

    if ( elem[i].value == dateMonth ) { 
      elem[i].style.border = "6px rgba(21, 119, 144, 0.963) solid"
      setTimeout(
        () => ( elem[i].style.border = "1px rgb(26, 125, 149) solid" ),
        500
      )
    }
  }  
}

let container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

let head = document.createElement("div")
head.setAttribute("class", "head")
container.appendChild(head)

let headerNav = document.createElement("div")
headerNav.setAttribute("class", "headerNav")
head.appendChild(headerNav)

let ChangeLeft = document.createElement("div")
ChangeLeft.setAttribute("class", "change")
ChangeLeft.innerHTML = arrayLeft
headerNav.appendChild(ChangeLeft)

let navNameMonth = document.createElement("div")
navNameMonth.setAttribute("class", "navNameMonth")
navNameMonth.innerHTML = referenceDate.year + " " + months[referenceDate.month]
headerNav.appendChild(navNameMonth)

let ChangeRight = document.createElement("i")
ChangeRight.setAttribute("class", "change")
ChangeRight.innerHTML = arrayRight
headerNav.appendChild(ChangeRight)

let navScheduler = document.createElement("div")
navScheduler.setAttribute("class", "navScheduler")
navScheduler.innerHTML = "Scheduler"
headerNav.appendChild(navScheduler)

let navToday = document.createElement("div")
navToday.setAttribute("class", "navToday")
navToday.innerHTML = "Today"
headerNav.appendChild(navToday)

let navYear = document.createElement("div")
navYear.setAttribute("class", "navYear")
navYear.innerHTML = "Year"
headerNav.appendChild(navYear)

let content = document.createElement("div")
content.setAttribute("class", "content")
container.appendChild(content)

startMonth(referenceDate, content)

ChangeRight.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year += 1))
    return
  }
    handlerNumbMonth(referenceDate, (referenceDate.month += 1), referenceDate.year)
    changesDate(referenceDate)
}

ChangeLeft.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {   
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year -= 1))
    return
  }    
    handlerNumbMonth(referenceDate, (referenceDate.month -= 1), referenceDate.year)
    changesDate(referenceDate)
}

navToday.onclick = function () {
  if (content.contains(document.querySelector(".cellTable")) == false) {
    content.querySelector(".yearView").remove()
    startMonth(referenceDate, content)        
  } 

  referenceDate.month = new Date().getMonth()
  referenceDate.year = new Date().getFullYear()
  changesDate(referenceDate)
  highlightElem(document.querySelectorAll(".cellTable"))  
}

navYear.onclick = function () {
  if ( content.contains(document.querySelector(".cellDay")) == false ) {
    content.querySelector(".titleDaysWeek").remove()
    content.querySelector(".monthView").remove()
    handlerYear(referenceDate.year)    
  } 

  if ( document.querySelector(".navNameMonth").innerHTML != new Date().getFullYear() ) {
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year = new Date().getFullYear()))    
  }

  highlightElem(content.querySelectorAll(".cellMonth"))
}

