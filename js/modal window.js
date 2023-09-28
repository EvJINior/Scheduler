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
  )
  localStorage.setItem("storageDate", JSON.stringify(separationObj))
}


function handlerStorage(separationObj, storageDate, separatedObjTitle, separatedObjText, indexTitle, indexTitleDel, color, index = 0) {   
  if (storageDate[separationObj[index]] === undefined || storageDate[separationObj[2]] != null) {
    if (index === 2) {  
      console.log('handler')
  console.log(color) 
      if (indexTitleDel == true) {         
        storageDate[separationObj[index]].splice(indexTitle, 1)       
        return storageDate
      }
      
      if (indexTitle != null) {
        storageDate[separationObj[index]][indexTitle] =         
          {
            title: separatedObjTitle,
            text: separatedObjText,
            color: color
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
    splitELem[2] + "  " + Months[splitELem[1]] + "  " + splitELem[0]
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
    bodyTitleEntry.setAttribute("class", "bodyTitleEntry")
    bodyTitleEntry.setAttribute("type", "button")
    bodyTitleEntry.innerHTML = dayInfo[i].title.substring(0, 46)
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

function circleChooseColor(buttonChooseColor, modalHeader, modalBody, modalFooter) {
  let listColors = [ 'black', 'rgb(140, 70, 215)', 'rgb(113, 127, 6)', 'rgb(141, 16, 12)', 'rgb(11, 105, 27)', 'rgb(15, 9, 120)']
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

       modalHeader.style.backgroundColor = listColors[i]   
       modalBody.style.backgroundColor = listColors[i] 
       modalFooter.style.backgroundColor = listColors[i]         
    }    
  }      
}  

function addColorBackGround (elem, splitELem, indexTitle) {
  const dayInfo = searchStorage(
    JSON.parse(localStorage.getItem("storageDate")),
    splitELem[0],
    splitELem[1],
    splitELem[2]
  )

  if(dayInfo[indexTitle] != null) {
    elem.style.backgroundColor = dayInfo[indexTitle].color
    }
}

function modalWindow(elem, titlecell, splitELem, indexTitle) {         
  let modalWindow = document.createElement("div")
  modalWindow.setAttribute("class", "modalWindow")
  document.body.appendChild(modalWindow)

  let modalContent = document.createElement("div")
  modalContent.setAttribute("class", "modalContent")
  modalWindow.appendChild(modalContent)

  let modalHeader = document.createElement("div")
  modalHeader.setAttribute("class", "modalHeader")
  modalContent.appendChild(modalHeader)  
  addColorBackGround(modalHeader, splitELem, indexTitle)

  let headerTitle = document.createElement("div")
  headerTitle.setAttribute("class", "headerTitle")
  headerTitle.innerHTML =
  splitELem[2] + "  " + Months[splitELem[1]] + "  " + splitELem[0]
  modalHeader.appendChild(headerTitle)

  let buttonClose = document.createElement("img")
  buttonClose.setAttribute("class", "buttonClose")
  buttonClose.setAttribute("src", "icons/cross2.png")
  modalHeader.appendChild(buttonClose)

  let headerInput = document.createElement("input")
  headerInput.setAttribute("class", "headerInput")
  
  headerInput.value = titlecell.title || elem.title || ""  
  modalContent.appendChild(headerInput)

  let modalBody = document.createElement("div")
  modalBody.setAttribute("class", "modalBody")
  modalContent.appendChild(modalBody)  
  addColorBackGround(modalBody, splitELem, indexTitle)  
  
  let bodyInput = document.createElement("textarea")
  bodyInput.setAttribute("class", "bodyInput")
  bodyInput.setAttribute("type", "input")
  bodyInput.value = titlecell.text || elem.text || ""
  modalBody.appendChild(bodyInput)

  let modalFooter = document.createElement("div")
  modalFooter.setAttribute("class", "modalFooter")
  modalContent.appendChild(modalFooter)
  addColorBackGround(modalFooter, splitELem, indexTitle) 

  let buttonChooseColor = document.createElement("div")
  buttonChooseColor.setAttribute("class", "buttonChooseColor") 
  modalFooter.appendChild(buttonChooseColor, indexTitle)  
  
  circleChooseColor(buttonChooseColor, modalHeader, modalBody, modalFooter)
  
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
      title: headerInput.value.trim(),
      text: bodyInput.value.trim(),
      indexTitle: indexTitle,
      color: modalHeader.style.backgroundColor || modalBody.style.backgroundColor,           
    }
        
    if (titlecell != 'null') {        
      separationObj(temporaryStorage)    
      removeTitle(elem)
      daysInfo(elem, titlecell)  
      return modalWindow.remove()  
    }                                         

    if (temporaryStorage.title == "") {
      headerInput.style.border = "3px rgb(210, 0, 0) solid"
      headerInput.value = " Fill in the field !"
      headerInput.style.color = "rgb(210, 0, 0)"
     
      return setTimeout(() => {
        headerInput.style.border = "1px rgb(0, 0, 0) solid"
        headerInput.style.color = "rgb(0, 0, 0)"
        headerInput.value = ""
      }, 500)
      // При юыстром нажатии на Save сохраняется " Fill in the field !"
    }    
    
    separationObj(temporaryStorage)
  
    if (elem.contains(elem.querySelector(".titleCell"))) {
      removeTitle(elem)      
    }
    
    daysInfo(elem) 

    modalWindow.remove()
  }

  modalWindow.onclick = function (event) {
    if (event.target == modalWindow || event.target == buttonClose) {
      modalWindow.remove()
    }
  }    
}




