let storageDate = {}

function separationObj(temporaryStorage) {
  storageDate = JSON.parse(localStorage.getItem("storageDate")) || {} 
  const separationObj = handlerStorage(
    temporaryStorage.date,  
    storageDate,
    temporaryStorage.title,
    temporaryStorage.text,
    temporaryStorage.indexTitle,
    temporaryStorage.indexTitleDel,
    temporaryStorage.color
    // temporaryStorage.startRangeDateSave,
    // temporaryStorage.endRangeDateSave
  )
  localStorage.setItem("storageDate", JSON.stringify(separationObj))
}



function handlerStorage(separationObj, storageDate, separatedObjTitle, separatedObjText, indexTitle, indexTitleDel, color, index = 0) {   
  if (storageDate[separationObj[index]] === undefined || storageDate[separationObj[2]] != null) {
    if (index === 2) {      

      // console.log("handlerStorage")
      // console.log(separationObj)
      // // let rt = 
      // // console.log(rt)
       
      // console.log(start)
      // console.log(end)
        // if (start !== end) {
        //   storageDate[separationObj[index]][indexTitle] =         
        //     {
        //       title: separatedObjTitle,
        //       text: separatedObjText,
        //       color: color,
        //       start: start,
        //       end: end
        //     }
        //     separationObj == separationObj.splice(2, 1, +separationObj[2] + 1)
        //     separationObj = 
        //     storageDate[separationObj[index]] = handlerStorage(
        //       separationObj,
        //       storageDate[separationObj[index]],
        //       separatedObjTitle,
        //       separatedObjText,   
        //       indexTitle,
        //       indexTitleDel,
        //       color,
        //       separationObj,
        //       end,
        //       index + 1
        //     )
        // }
       
 
      if (indexTitleDel == true) {         
        storageDate[separationObj[index]].splice(indexTitle, 1)       
        return storageDate
      }

      
      
      if (indexTitle != null) {
        console.log("storageDate[separationObj[index]][indexTitle]")
      console.log(storageDate[separationObj[index]][indexTitle])
        storageDate[separationObj[index]][indexTitle] =         
          {
            title: separatedObjTitle,
            text: separatedObjText,
            color: color,            
          }                      
        return storageDate
      }       

      if (storageDate[separationObj[index]] === undefined ) {     
        storageDate[separationObj[index]] = [
          {
            title: separatedObjTitle,
            text: separatedObjText,
            color: color
          }            
        ] 
        return storageDate        
      }     

      let ret = {
        title: separatedObjTitle,
        text: separatedObjText,
        color: color
      }      
      storageDate[separationObj[index]].push(ret)
      
      return storageDate
    }
    storageDate[separationObj[index]] = {}
  }

  // if (start !== end) {
  //   separationObj == separationObj.splice(2, 1, +separationObj[2] + 1)
  // }

  storageDate[separationObj[index]] = handlerStorage(
    separationObj,
    storageDate[separationObj[index]],
    separatedObjTitle,
    separatedObjText,   
    indexTitle,
    indexTitleDel,
    color,
    index + 1
  )
  return storageDate
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
    bodyTitleEntry.style.outlineColor = dayInfo[i].color       
    bodyTitleEntry.innerHTML = dayInfo[i].title.substring(0, 46)    
    modalBodyList.appendChild(bodyTitleEntry)   

    bodyTitleEntry.style.backgroundColor = dayInfo[i].color

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
  let listColors = ['rgb(140, 70, 215)', 'rgb(113, 127, 6)', 'rgb(141, 16, 12)']
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


///////////////////////////////////////////////

function getDayCellTable (valueElem) {   
  let split = valueElem[0] + '.' + valueElem[1] + '.' + valueElem[2]
  console.log("getDayCellTable")
  // console.log(new Date (split))
  // console.log("split")
  // console.log(split)
  let tty = document.querySelectorAll(".cellTable") 
  for (let i = 0; i <= tty.length; i++) {
    // console.log(tty[i].value)
    if (split === tty[i].value) { 
      console.log("tti")         
      console.log(tty[i])         
      return tty[i]
    }
  }
}


/////////////////////////////////////////////////





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
  // userChooseDate (startRangeDate, splitELem)
  displayDate (startRangeDate, splitELem)
  modalSection.appendChild(startRangeDate)     
  
  let endRangeDate = document.createElement("div")
  endRangeDate.setAttribute("class", "RangeDate") 
  endRangeDate.setAttribute("type", "button")
  // userChooseDate (endRangeDate, splitELem)  
  displayDate (endRangeDate, splitELem)
  modalSection.appendChild(endRangeDate)  




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

      return elemDate.getMonth()
    }

    if ( i == 5 ) {  
      console.log("new Date")
      console.log(new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate())      

      if ( elemsFromDispleyDate[3].value > new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate()) {
        elemsFromDispleyDate[3].value = addZero (+new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate())
        elemsFromDispleyDate[3].innerHTML = addZero (+new Date (getElemRangeDate, elemsFromDispleyDate[4].value + 1, 0).getDate())  

        console.log(" Date")
      } 
      
      elemsFromDispleyDate[5].value = getElemRangeDate
      elemsFromDispleyDate[5].innerHTML = getElemRangeDate

      return getElemRangeDate
    }       
  }






  function displayDate (elem, splitELem) {

    for (let i = 0; i < 9; i++) {
      let userSelectsDate = document.createElement("div")
      userSelectsDate.setAttribute("class", "userSelectsDate")
      userSelectsDate.setAttribute("type", "button")
      userSelectsDate.innerHTML = "-"
      elem.appendChild(userSelectsDate)   
  
      let getElemChooseUser = elem.querySelectorAll(".userSelectsDate")[i]
  
      if ( i > 2 && i < 6) {      
        userSelectsDate.value = splitELem[5-i]
        userSelectsDate.innerHTML = userSelectsDate.value
        if (i === 4) {
            userSelectsDate.value = splitELem[5-i] 
            userSelectsDate.innerHTML = +userSelectsDate.value + 1
        }     
      }    
  
      if ( i < 3 ) {               
        getElemChooseUser.onclick = function () {

          let  getElemRangeDate = elem.querySelectorAll(".userSelectsDate")

          getElemRangeDate[i + 3].value = checkDate (elem, +getElemRangeDate[i + 3].value, i + 3, true)              

          elem.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value

          console.log(elem.value)
            }
          } 
        
        
        if ( i > 5 ) {        
        getElemChooseUser.onclick = function () {

          let  getElemRangeDate = elem.querySelectorAll(".userSelectsDate") 
          
          getElemRangeDate[i - 3].value = checkDate (elem, +getElemRangeDate[i - 3].value, i - 3, false)              

          elem.value = getElemRangeDate[5].value + "." + getElemRangeDate[4].value + "." + getElemRangeDate[3].value
          
              console.log(elem.value)
          }
        }                      
      }        
    }  

    console.log("value")
    console.log(elem.value)








//   function displayDate (elem, splitELem) {
//   for (let i = 0; i < 9; i++) {
//     let userSelectsDate = document.createElement("div")
//     userSelectsDate.setAttribute("class", "userSelectsDate")
//     userSelectsDate.setAttribute("type", "button")
//     userSelectsDate.innerHTML = "-"
//     elem.appendChild(userSelectsDate)   

//     let getElemChooseUser = elem.querySelectorAll(".userSelectsDate")[i]

//     if ( i > 2 && i < 6) {      
//       userSelectsDate.innerHTML = splitELem[5-i]
//       // console.log(getElemUserChoose)
//     }    

//     if ( i < 3 ) {        
//       // let getElemUserChoose = endRangeDate.querySelectorAll(".userChoose")[i]
//       getElemChooseUser.onclick = function fet () {        
//         let  getElemRangeDate = elem.querySelectorAll(".userSelectsDate")
//         getElemRangeDate[i + 3].innerHTML = checkDate (+getElemRangeDate[i + 3].innerHTML, 
//           getElemRangeDate[3].innerHTML, getElemRangeDate[4].innerHTML, getElemRangeDate[5].innerHTML)
          
//             // console.log(endRangeDate.querySelectorAll(".userSelectsDate")[3], endRangeDate.querySelectorAll(".userSelectsDate")[4], 
//             // endRangeDate.querySelectorAll(".userSelectsDate")[5])
//         } 
//       }
      
//       if ( i > 5 ) {
//         // let getElemUserChoose = endRangeDate.querySelectorAll(".userChoose")[i]
//       getElemChooseUser.onclick = function fet () {
//         let  getElemRangeDate = elem.querySelectorAll(".userSelectsDate")[i - 3]          
//         getElemRangeDate.innerHTML = +getElemRangeDate.innerHTML - 1
//             // console.log(getE)
//       }
//     }     
//   }
// }

// console.log(endRangeDate.querySelectorAll(".userSelectsDate")[3].innerHTML)
  // for (let i = 0; i < 9; i++) {
  // let getElemUserChoose = endRangeDate.querySelectorAll(".userChoose")
  // console.log(getElemUserChoose)
  // }

  // let userChooseDay = document.createElement("div")
  // userChooseDay.setAttribute("class", "userChoose")
  // userChooseDay.setAttribute("type", "button")
  // // buttonUser (userChooseDay)
  // userChooseDay.value = 24
  // console.log(userChooseDay.value)
  // // userChooseDay.innerHTML = userChooseDay.value
  // // ButtonsSwitching (userChooseDay, splitELem[2], false, userChooseYear, userChooseMonth ) 
  
  // endRangeDate.appendChild(userChooseDay)

  // let upUs = document.createElement("div")
  //   upUs.setAttribute("class", "upUs")
  //   upUs.setAttribute("type", "button")
  //   // switchDown.innerHTML = "-"
  //   elem.appendChild(upUs)

  // endRangeDate.innerHTML = userChooseDay.value 

  // function buttonUser (elem) {
  //   let upUs = document.createElement("div")
  //   upUs.setAttribute("class", "upUs")
  //   upUs.setAttribute("type", "button")
  //   // switchDown.innerHTML = "-"
  //   elem.appendChild(upUs) 
  // }


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
      let temporaryStorage = {
        date: splitELem,
        title: headerInput.value.trim(),
        text: bodyInput.value.trim(),
        indexTitle: indexTitle,
        indexTitleDel: true,        
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

    let temporaryStorage = {

      date: splitELem,      

      title: checkTemporaryStorageTitle(headerInput).trim(),

      text: bodyInput.value.trim(),

      indexTitle: indexTitle,

      color: modalContent.style.borderColor,

      endRangeDateTemp: endRangeDate.value

    }

    // console.log("buttonSave.temporaryStorage.color")
    console.log(temporaryStorage)
      // startRangeDateSave: 
      // startRangeDate.querySelectorAll('.user')[0].innerHTML +
      // "." + startRangeDate.querySelectorAll('.user')[1].innerHTML +
      // "." + startRangeDate.querySelectorAll('.user')[2].innerHTML,

      // endRangeDateSave: 
      // endRangeDate.querySelectorAll('.user')[0].innerHTML + 
      // "." + endRangeDate.querySelectorAll('.user')[1].innerHTML +
      // "." + endRangeDate.querySelectorAll('.user')[2].innerHTML,

         

            
    
    // console.log("tyt")
    //   console.log(temporaryStorage.startRangeDateSave)
    //   console.log(temporaryStorage.date)
    //   console.log(temporaryStorage.endRangeDateSave)
       
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
             
    // if (temporaryStorage.startRangeDateSave !== temporaryStorage.endRangeDateSave) {
    //   temporaryStorage.startRangeDateSave = temporaryStorage.startRangeDateSave.split(".")
    //   temporaryStorage.endRangeDateSave = temporaryStorage.endRangeDateSave.split(".")

    //   console.log("temporaryStorage.date, start, end")
    //   // console.log(temporaryStorage.date)
    //   console.log(temporaryStorage.startRangeDateSave)
    //   console.log(temporaryStorage.endRangeDateSave)

      
      
//       let numbSelectDays = ((new Date(temporaryStorage.endRangeDateSave[0], temporaryStorage.endRangeDateSave[1], temporaryStorage.endRangeDateSave[2]) - 
//               new Date(temporaryStorage.startRangeDateSave[0], temporaryStorage.startRangeDateSave[1], temporaryStorage.startRangeDateSave[2])) 
//               / (1000 * 60 * 60 * 24))
//               console.log("numbSelectDays")
//       console.log(numbSelectDays)
// // let daysTest = +temporaryStorage.startRangeDateSave[2]
//         for (let i = 0; i < numbSelectDays; i++) {
          
//           let plusDay = new Date(temporaryStorage.startRangeDateSave[0], temporaryStorage.startRangeDateSave[1],
//              (+temporaryStorage.startRangeDateSave[2] + 1))   
//           // console.log("plusDay")
//           // console.log(plusDay)
//         let numbNumb = 2 + i
//         // console.log("numbNumb")
//         //   console.log(numbNumb)
//           temporaryStorage.date = temporaryStorage.startRangeDateSave.splice(0, 3, plusDay.getFullYear(), plusDay.getMonth(), addZero (plusDay.getDate()))
//           // console.log("temporaryStorage.date TESTEST")
//           // console.log(temporaryStorage.date)
//           temporaryStorage.title = numbNumb.toString()
//           // console.log(temporaryStorage)
//           separationObj(temporaryStorage)                                    
//           daysInfo ( getDayCellTable (temporaryStorage.date), true )  
//         }         
//         return modalWindow.remove()
//       }

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


/*

function userChooseDate (elem, splitELem) {
  
  let userChooseYear = document.createElement("div")
  userChooseYear.setAttribute("class", "userChoose")
  userChooseYear.setAttribute("type", "button")  
  ButtonsSwitching (userChooseYear, splitELem[0], false) 
  elem.appendChild(userChooseYear)   

  let dividingPoint = document.createElement("div")
  dividingPoint.setAttribute("class", "dividingPoint")
  dividingPoint.innerHTML = "."
  elem.appendChild(dividingPoint)

  let userChooseMonth = document.createElement("div")
  userChooseMonth.setAttribute("class", "userChoose")
  userChooseMonth.setAttribute("type", "button")
  ButtonsSwitching (userChooseMonth, splitELem[1], true)
  elem.appendChild(userChooseMonth)
  
  let secondDividingPoint = document.createElement("div")
  secondDividingPoint.setAttribute("class", "dividingPoint")
  secondDividingPoint.innerHTML = "."
  elem.appendChild(secondDividingPoint)

  let userChooseDay = document.createElement("div")
  userChooseDay.setAttribute("class", "userChoose")
  userChooseDay.setAttribute("type", "button")
  ButtonsSwitching (userChooseDay, splitELem[2], false, userChooseYear, userChooseMonth ) 
  elem.appendChild(userChooseDay) 

}

function ButtonsSwitching (elem, chooseDate, keystrokeMonth, userChooseYear, userChooseMonth) {
 
  let switchUp = document.createElement("div")
  switchUp.setAttribute("class", "switch Down")  
  switchUp.setAttribute("type", "button")
  switchUp.innerHTML = "+"
  elem.appendChild(switchUp)

  let userDate = document.createElement("div")  
  userDate.setAttribute("class", "user")    
  elem.value = chooseDate   
  userDate.innerHTML = chooseDate  
  elem.appendChild(userDate) 
  
  let switchDown = document.createElement("div")
  switchDown.setAttribute("class", "switch Up")
  switchDown.setAttribute("type", "button")
  switchDown.innerHTML = "-"
  elem.appendChild(switchDown) 

  switchUp.onclick = function () {

    userDate.innerHTML = addZero ( +userDate.innerHTML + 1 )     

    if ( keystrokeMonth && userDate.innerHTML > 12 ) {

      userDate.innerHTML = addZero ( 1 )    

    }        

    if (userChooseMonth != null) {

      let getChooseUserYear = userChooseYear.querySelector('.user').innerHTML
      let getChooseUserMonth = userChooseMonth.querySelector('.user').innerHTML
        
      if (userDate.innerHTML > new Date(getChooseUserYear, getChooseUserMonth, 0).getDate()) {

       userDate.innerHTML = addZero ( 1 )   

      }       
    }  

    elem.value = addZero (userDate.innerHTML)   

  }

  switchDown.onclick = function () {

    userDate.innerHTML = addZero ( +userDate.innerHTML - 1 )  

    if ( keystrokeMonth && userDate.innerHTML < 1 ) {

      userDate.innerHTML = 12   

    }

    if ( userChooseMonth != null ) {

      let getChooseUserYear = userChooseYear.querySelector('.user').innerHTML
      let getChooseUserMonth = userChooseMonth.querySelector('.user').innerHTML

      if (userDate.innerHTML < 1) {

        userDate.innerHTML = new Date(getChooseUserYear, getChooseUserMonth, 0).getDate()       
      }      
    }  

     elem.value = addZero ( userDate.innerHTML ) 
  }  
 }

*/