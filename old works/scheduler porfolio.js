function handlerDayWeek(numb_day) {
    if (numb_day == 0) return 7
    else return numb_day
}

function counterMonthRight_f(numb_month) {
    if (numb_month == 11) return numb_month = 0    
    else return numb_month + 1
}

function counterMonthLeft_f(numb_month) {
    if (numb_month == 0) return numb_month = 11    
    else return numb_month - 1
}

function delete_space_f(variable) {
    let string_element = variable.length
    let quantity_space = 0
    for (let i = 0; i < variable.length; i++ ) {
        if (variable[i] == ' ') {
            quantity_space++                                                 
        } 
    }
    if (string_element != quantity_space) {
        return variable 
    } else {
        return null         
    }                    
} 

function key_local_Storage_f(setting) {
    for (let i = 0; i < localStorage.length; i++) {  
            if (setting == localStorage.key(i)) {
            return localStorage.getItem(localStorage.key(i))
        }                      
    }                
}   

let All_Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 

let month;
let year;

let buttom_start_calendar = document.createElement('buttom')
buttom_start_calendar.setAttribute('class', 'buttom_start')
document.body.appendChild(buttom_start_calendar)
let input_Year = document.createElement('input')
input_Year.setAttribute('class', 'input_Year') 
input_Year.setAttribute('value', new Date().getFullYear())
document.body.appendChild(input_Year)

let input_Month = document.createElement('div')
input_Month.setAttribute('type', 'input') 
input_Month.setAttribute('class', 'input_Month') 
input_Month.innerHTML = All_Months[new Date().getMonth()]
input_Month.value = All_Months[new Date().getMonth()]
document.body.appendChild(input_Month)

let list_months = document.createElement('ul')
list_months.setAttribute('class', 'list_months_ul')
for (let r = 0; r < All_Months.length; r++) {
    let list = document.createElement('li')
    list.setAttribute('class', 'list_li')
    list.setAttribute('type', 'button')
    list.innerHTML = All_Months[r]
    list_months.appendChild(list)

    list.onclick = function () {
        input_Month.value = All_Months[r]
        input_Month.innerHTML = All_Months[r]
    }
}
input_Month.appendChild(list_months)


buttom_start_calendar.onclick = function() {
    month = All_Months.indexOf(input_Month.value)
    year = input_Year.value
    calendar_Start_f(year, month)
    input_Month.remove()    
    input_Year.remove()    
    buttom_start_calendar.remove()
}

function calendar_Start_f(year, month) {
let container = document.createElement('div')
container.setAttribute('class', 'container')
document.body.prepend(container)

let duplicationDaysOutsideTable
let duplicationMonthOutsideTable

function numbering_Days(cycle, table, year, month) {
    let full_Date_Today = new Date (year, month)
    let firstDay_today_month = new Date(full_Date_Today.getFullYear(), full_Date_Today.getMonth(), 1).getDay()  

    let all_numbers = new Date(year, month, cycle - handlerDayWeek(firstDay_today_month) + 2)      
    table.innerHTML = all_numbers.getDate()

    duplicationDaysOutsideTable = all_numbers            
    duplicationMonthOutsideTable = all_numbers.getMonth()

    let getdate_allnumbers_modal_header = all_numbers.getDate() + '.' + all_numbers.getMonth() + '.' + all_numbers.getFullYear() + ' modal_header_input'
    let getdate_allnumbers = all_numbers.getDate() + '.' + all_numbers.getMonth() + '.' + all_numbers.getFullYear()

    if (table.innerHTML == 1) {
        let numberMonth = all_numbers.getMonth() + 1
        if (numberMonth > 9) table.innerHTML = all_numbers.getDate() + "." + numberMonth                               
        else table.innerHTML = "0" + all_numbers.getDate() + "." + "0" + numberMonth                
    }

    let mini_modal_in_table = document.createElement('div')
    mini_modal_in_table.setAttribute('class', 'mini_modal_in_table')
    mini_modal_in_table.setAttribute('maxlength', '4')
  
    if (localStorage.getItem(getdate_allnumbers_modal_header) != null || localStorage.getItem(getdate_allnumbers) != null) {            
        if (localStorage.getItem(getdate_allnumbers_modal_header) != ''  &&  localStorage.getItem(getdate_allnumbers_modal_header) != undefined ) {
            mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers_modal_header)
        } else {
            mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers)
        }
    }             
    table.appendChild(mini_modal_in_table)          
                                     
    table.onclick = function () {
        let modal_window = document.createElement('div')
        modal_window.setAttribute('class', 'modal_window')
        let modal_content = document.createElement('div')
        modal_content.setAttribute('class', 'modal_content')        
        let modal_header = document.createElement('div')
        modal_header.setAttribute('class', 'modal_header')

        let modal_header_input = document.createElement('input')
        modal_header_input.setAttribute('class', 'modal_header_input')                
        modal_header.appendChild(modal_header_input)
        modal_header_input.value = key_local_Storage_f(getdate_allnumbers_modal_header)
        if (modal_header_input.value == 'undefined') {
            modal_header_input.value = ''                                  
        } 

        let modal_button_close = document.createElement('img')
        modal_button_close.setAttribute('class', 'modal_button_close')                                        
        modal_button_close.setAttribute('src', 'icons/out.png')                                        
        modal_button_close.setAttribute('type', 'button') 
        modal_header.appendChild(modal_button_close)                     
        modal_content.appendChild(modal_header)

        let modal_body = document.createElement('div')                     
        modal_body.setAttribute('class', 'modal_body')
        let modal_body_input = document.createElement('input')
        modal_body_input.setAttribute('class', 'modal_body_input')                                                
        modal_body.appendChild(modal_body_input)                        
        modal_body_input.value = key_local_Storage_f(getdate_allnumbers)
        if (modal_body_input.value == 'undefined') {
            modal_body_input.value = ''                                                
        }
        modal_content.appendChild(modal_body)

        let modal_footer = document.createElement('div') 
        modal_footer.setAttribute('class', 'modal_footer')
        let modal_button_delete = document.createElement('img')
        modal_button_delete.setAttribute('class', 'modal_button_delete')
        modal_button_delete.setAttribute('src', 'icons/delete.png')                 
        modal_button_delete.setAttribute('type', 'button')                         
        modal_footer.appendChild(modal_button_delete)
        let modal_button_save = document.createElement('img')                                                                                                                                     
        modal_button_save.setAttribute('class', 'modal_button_save')
        modal_button_save.setAttribute('src', 'icons/report.png')                 
        modal_button_save.setAttribute('type', 'button')                         
        modal_footer.appendChild(modal_button_save)
        modal_content.appendChild(modal_footer)
        modal_window.appendChild(modal_content)                                                           
        document.body.prepend(modal_window)    

        modal_window.onclick = function(event) {                    
            if (event.target == modal_button_close || event.target == modal_window || event.target == modal_button_delete || event.target == modal_button_save) {
                modal_window.remove()                              
            }                                                 
        }       

        modal_button_save.onclick = function(event) {                         
            if (delete_space_f(modal_header_input.value) != null) {
                mini_modal_in_table.innerHTML = modal_header_input.value                   
            }                                       
            else if (delete_space_f(modal_body_input.value) != null)  {                   
                mini_modal_in_table.innerHTML = modal_body_input.value     
            }       
            if (delete_space_f(modal_header_input.value) != null) {
                localStorage.setItem(getdate_allnumbers_modal_header, modal_header_input.value)                 
            }
            if (delete_space_f(modal_body_input.value) != null) {
                localStorage.setItem(getdate_allnumbers, modal_body_input.value)                 
            }                  
            if (modal_header_input.value == '' || delete_space_f(modal_header_input.value) == null) { 
                localStorage.removeItem(getdate_allnumbers_modal_header)
                if (modal_body_input.value == '' || delete_space_f(modal_body_input.value) == null) mini_modal_in_table.innerHTML = ''   
            }                
            if (modal_body_input.value == '' || delete_space_f(modal_body_input.value) == null ) {
                localStorage.removeItem(getdate_allnumbers)
                if (modal_header_input.value == '' || delete_space_f(modal_header_input.value) == null) mini_modal_in_table.innerHTML = ''                      
            }       
        }

        modal_button_delete.onclick = function() {
            localStorage.removeItem(getdate_allnumbers)
            localStorage.removeItem(getdate_allnumbers_modal_header)
            mini_modal_in_table.innerHTML = ''                            
        }
                
        }               
}
    
let month_Shift_Counter = month
let year_Shift_Counter = year  
let allocate_today_in_calendar    
    
for (let i = 0; i < 7; i++) {
    let cells_Add_Options = document.createElement('div')
    cells_Add_Options.setAttribute('class', 'cell_Add_Options')
    container.appendChild(cells_Add_Options)    
     
    if (i == 0) { 
        let icon_Scroll_Left= document.createElement('i')
        icon_Scroll_Left.setAttribute('class', 'fa fa-angle-left')        
        icon_Scroll_Left.setAttribute('type', 'button')
        cells_Add_Options.appendChild(icon_Scroll_Left)     
        icon_Scroll_Left.onclick = function () {   
            if (allocate_today_in_calendar != undefined) allocate_today_in_calendar.style.backgroundColor = 'white'
            if (month_Shift_Counter == 0) year_Shift_Counter = +year_Shift_Counter - 1             
            month_Shift_Counter = counterMonthLeft_f(month_Shift_Counter)                                                     
            for (let k = 15; k < 57; k++) {
                let elem = container.querySelector('div>:nth-child('+k+')')                          
                numbering_Days(k - 15, elem, year_Shift_Counter, month_Shift_Counter)
            }
            let get_Elem_name_Month_Year = container.querySelector('.name_Month_Year')
            get_Elem_name_Month_Year.innerHTML = All_Months[month_Shift_Counter] + " " + year_Shift_Counter                       
        }     
                 
        let icon_Scroll_Right = document.createElement('i')          
        icon_Scroll_Right.setAttribute('class', 'fa fa-angle-right')        
        icon_Scroll_Right.setAttribute('type', 'button')
        cells_Add_Options.appendChild(icon_Scroll_Right)       
        icon_Scroll_Right.onclick = function () {
            if (allocate_today_in_calendar != undefined) allocate_today_in_calendar.style.backgroundColor = 'white'
            if (month_Shift_Counter == 11) year_Shift_Counter = +year_Shift_Counter + 1                         
            month_Shift_Counter = counterMonthRight_f(month_Shift_Counter)                                                              
            for (let k = 15; k < 57; k++) {
                let elem = container.querySelector('div>:nth-child('+k+')')                          
                numbering_Days(k - 15, elem, year_Shift_Counter, month_Shift_Counter)                       
            }    
            let get_Elem_name_Month_Year = container.querySelector('.name_Month_Year')
            get_Elem_name_Month_Year.innerHTML = All_Months[month_Shift_Counter] + " " + year_Shift_Counter
        }    
    }  

    if (i == 1) {            
        let name_Month_Year = document.createElement('div')
        name_Month_Year.setAttribute('class', 'name_Month_Year')
        name_Month_Year.innerHTML = All_Months[month] + " " + year
        cells_Add_Options.appendChild(name_Month_Year)          
    }   

    if (i == 2) {                          
        let today = document.createElement('div')
        today.setAttribute('class', 'today')        
        today.setAttribute('type', 'button')
        today.innerHTML = "Today"
        cells_Add_Options.appendChild(today)         
        today.onclick = function () {                                     
        let get_Elem_name_Month_Year = container.querySelector('.name_Month_Year')                      
        month_Shift_Counter = new Date().getMonth()             
        year_Shift_Counter = new Date().getFullYear()                                       
            for (let k = 15; k < 57; k++) {
                let elem = container.querySelector('div>:nth-child('+k+')')                          
                numbering_Days(k - 15, elem, year_Shift_Counter, month_Shift_Counter)                    
                let getdat_Mon_Year = duplicationDaysOutsideTable.getDate() + '.' + month_Shift_Counter + '.' + year_Shift_Counter
                    if (new Date().getDate() + '.' + duplicationMonthOutsideTable + '.' + year_Shift_Counter == getdat_Mon_Year ) {
                         allocate_today_in_calendar = container.querySelector('div>:nth-child('+k+')')                                                                                                                     
                    }                                       
            }                       
            allocate_today_in_calendar.style.backgroundColor = 'rgb(218, 228, 255)'                     
            get_Elem_name_Month_Year.innerHTML = All_Months[month_Shift_Counter] + " " + year_Shift_Counter                       
            setTimeout(() => allocate_today_in_calendar.style.backgroundColor = 'rgb(255, 255, 255)',  1500)                              
        }        
    }       
}

for (let j = 0; j < 7; j++) {
    let cells_Name_Days_Week = document.createElement('div')
    cells_Name_Days_Week.setAttribute('class', 'cell_Name_Days_Week') 
    let daysWeek_Array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]        
    cells_Name_Days_Week.innerHTML = daysWeek_Array[j]    
    container.appendChild(cells_Name_Days_Week)
}

for (let k = 0; k < 42; k++) {
    let cells_table = document.createElement('div')
    cells_table.setAttribute('class',  'cell_table')
    cells_table.setAttribute('type', 'button')   
    numbering_Days(k, cells_table, year, month)         
    container.appendChild(cells_table)                           
    }
}
