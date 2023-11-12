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
    temporaryStorage.color,
    temporaryStorage.startRangeDateSave,
    temporaryStorage.endRangeDateSave
  )
  localStorage.setItem("storageDate", JSON.stringify(separationObj))
}



function handlerStorage(separationObj, storageDate, separatedObjTitle, separatedObjText, indexTitle, indexTitleDel, color, start, end, index = 0) {   
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
        storageDate[separationObj[index]][indexTitle] =         
          {
            title: separatedObjTitle,
            text: separatedObjText,
            color: color,
            start: start,
            end: end
          }                      
        return storageDate
      } 

      if (storageDate[separationObj[index]] === undefined ) {     
        storageDate[separationObj[index]] = [
          {
            title: separatedObjTitle,
            text: separatedObjText,
            color: color,
            start: start,
            end: end
          }            
        ] 
        return storageDate        
      }     

      let ret = {
        title: separatedObjTitle,
        text: separatedObjText,
        color: color,
        start: start,
        end: end
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
    start,
    end,
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
  startRangeDate.value = splitELem[0] + "." + splitELem[1] + "." + splitELem[2]
  startRangeDate.innerHTML = startRangeDate.value
  modalSection.appendChild(startRangeDate) 

  let endRangeDate = document.createElement("div")
  endRangeDate.setAttribute("class", "RangeDate")
  endRangeDate.value = "2023.11.03".split(".")
  endRangeDate.innerHTML = "2023.11.03"
  endRangeDate.setAttribute("type", "button")
  modalSection.appendChild(endRangeDate)

  let modalFooter = document.createElement("div")
  modalFooter.setAttribute("class", "modalFooter")
  modalContent.appendChild(modalFooter)

  localStorage.clear()
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
    // console.log("начало функции")
    // console.log(splitELem)   

    let temporaryStorage = {
      date: splitELem,       
      title: checkTemporaryStorageTitle(headerInput).trim(),
      text: bodyInput.value.trim(),
      indexTitle: indexTitle,
      color: modalContent.style.borderColor,
      startRangeDateSave: splitELem,               // Новое
      endRangeDateSave: endRangeDate.value,                   // Новое
    }              
    
    console.log("tyt")
      console.log(temporaryStorage.startRangeDateSave)
      console.log(temporaryStorage.date)
      console.log(temporaryStorage.endRangeDateSave)
       
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
            
    separationObj(temporaryStorage)
  
    if (elem.contains(elem.querySelector(".titleCell"))) {
      removeTitle(elem)      
      daysInfo(elem, titlecell)
      return modalWindow.remove()
    }
    
    daysInfo(elem, false)   
   
    
      
    if (temporaryStorage.date !== temporaryStorage.endRangeDateSave) {
      console.log("endRangeDateSave")
      console.log(temporaryStorage.date)
      console.log(temporaryStorage.endRangeDateSave)
      
      let w12 = ((new Date(temporaryStorage.endRangeDateSave[0], temporaryStorage.endRangeDateSave[1], temporaryStorage.endRangeDateSave[2]) - 
              new Date(temporaryStorage.date[0], temporaryStorage.date[1], temporaryStorage.date[2])) 
              / (1000 * 60 * 60 * 24))

        for (let i = 0; i < w12; i++) {
          
          let plusDay = new Date(temporaryStorage.date[0], temporaryStorage.date[1], (+temporaryStorage.date[2] + 1))          
        
          temporaryStorage.date == temporaryStorage.date.splice(0, 3, plusDay.getFullYear(), plusDay.getMonth(), addZero (plusDay.getDate()))
          separationObj(temporaryStorage)                                    
          daysInfo ( getDayCellTable (temporaryStorage.date), true )  
        }         
      }

    modalWindow.remove()
  }

  modalWindow.onclick = function (event) {
    if (event.target == modalWindow || event.target == buttonClose) {
      modalWindow.remove()
    }
  }    
}