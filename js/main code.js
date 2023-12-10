// import content from './conteiner table.js'

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

function addZero (elem) {
  if (elem < 10 && elem[0] != 0) {    
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
  getNavNameMonth[0].innerHTML = object.year + " " + months[object.month]
}


// ???????????????????????????????????????????????????????????????????????????????????
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
// Для чего эта функция, пересмотреть её!!!
// ???????????????????????????????????????????????????????????????????????????????????

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

let head = document.createElement("div")
head.setAttribute("class", "head")
container.appendChild(head)

let headerNav = document.createElement("div")
headerNav.setAttribute("class", "headerNav")
head.appendChild(headerNav)

// let navChangeMonth = document.createElement("div")
// navChangeMonth.setAttribute("class", "navChangeMonth")
// navChangeMonth.setAttribute("type", "button")
// headerNav.appendChild(navChangeMonth)

let ChangeLeft = document.createElement("i")
ChangeLeft.setAttribute("class", "fa fa-angle-left")
ChangeLeft.setAttribute("type", "button")
headerNav.appendChild(ChangeLeft)

let navNameMonth = document.createElement("div")
navNameMonth.setAttribute("class", "navNameMonth")
navNameMonth.setAttribute("type", "button")
navNameMonth.innerHTML = referenceDate.year + " " + months[referenceDate.month]
headerNav.appendChild(navNameMonth)

let ChangeRight = document.createElement("i")
ChangeRight.setAttribute("class", "fa fa-angle-right")
ChangeRight.setAttribute("type", "button")
headerNav.appendChild(ChangeRight)

let navToday = document.createElement("div")
navToday.setAttribute("class", "navToday")
navToday.setAttribute("type", "button")
navToday.innerHTML = "Today"
headerNav.appendChild(navToday)

let navYear = document.createElement("div")
navYear.setAttribute("class", "navYear")
navYear.setAttribute("type", "button")
navYear.innerHTML = "Year"
headerNav.appendChild(navYear)

// let numbMonth = document.createElement("div")
// numbMonth.setAttribute("class", "numbMonth")
// numbMonth.setAttribute("type", "button")
// numbMonth.innerHTML = Months[referenceDate.month]
// head.appendChild(numbMonth)

ChangeRight.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year += 1))
    // numbMonth.innerHTML = referenceDate.year
  } else {    
    handlerMonth(referenceDate, (referenceDate.month += 1), referenceDate.year)
    changesDate(referenceDate)
    // numbMonth.innerHTML = Months[referenceDate.month]       
    // handlerWeek (referenceDate, content,  handlerNumbDay, referenceDate.month) 
  }
}

ChangeLeft.onclick = function () {
  if (content.contains(document.querySelector(".cellMonth")) == true) {   
    content.querySelector(".yearView").remove()
    handlerYear((referenceDate.year -= 1))
    // numbMonth.innerHTML = referenceDate.year    
  } else {   
    handlerMonth(referenceDate, (referenceDate.month -= 1), referenceDate.year)
    changesDate(referenceDate)
    // numbMonth.innerHTML = Months[referenceDate.month]
    // handlerWeek (referenceDate, content,  handlerNumbDay, referenceDate.month)
  }
}





navToday.onclick = function () {
  if (content.contains(document.querySelector(".cellTable")) == false) {
    content.querySelector(".yearView").remove()
    startMonth(referenceDate, handlerNumbDay, content)        
  }

  referenceDate.month = new Date().getMonth()
  referenceDate.year = new Date().getFullYear()
  changesDate(referenceDate)
  highlightToday(document.querySelectorAll(".cellTable"))  
  // numbMonth.innerHTML = Months[referenceDate.month]
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

  highlightMonth(content.querySelectorAll(".cellMonth"))
  // numbMonth.innerHTML = referenceDate.year
}

let content = document.createElement("div")
content.setAttribute("class", "content")
container.appendChild(content)

startMonth(referenceDate, handlerNumbDay, content)

// let weeks = document.createElement("div")
// weeks.setAttribute("class", "weeks")
// weeks.setAttribute("type", "button")
// content.appendChild(weeks)

// handlerWeek (referenceDate, weeks,  handlerNumbDay, referenceDate.month)
