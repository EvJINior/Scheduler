function dayWeek_f(numb_day) {
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
        // return mini_modal_in_table.innerHTML = localStorage.getItem(localStorage.key(i))
            return localStorage.getItem(localStorage.key(i))
            // console.log('itog   ' + localStorage.getItem(localStorage.key(i)))
        }              
        // else if (setting == localStorage.key(i) ) {
        //     // if (modal_header_input.value == '') {
        //     //     return mini_modal_in_table.innerHTML = localStorage.getItem(localStorage.key(i))
        //     // } else 
        // return mini_modal_in_table.innerHTML = localStorage.getItem(localStorage.key(i))
        // }  
            //   getdate_allnumbers + ' modal_header_input'
            //console.log(getdate_allnumbers)
            //console.log("wet" + localStorage.getItem(getdate_allnumbers))
        
    }                
}   

// function counteryear_f(numb_year) {
//     if (numb_year == 0) return numb_year = 11
//     else return numb_year
// }

// let All_Months = ["January", "Februare", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
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
// input_Month.setAttribute('value', All_Months[new Date().getMonth()])
// All_List_Months_f (input_Month)

document.body.appendChild(input_Month)

// function All_List_Months_f (input_Month) {
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
// }

buttom_start_calendar.onclick = function() {
    month = All_Months.indexOf(input_Month.value)
    year = input_Year.value
    calendar_Start_f(year, month)
    input_Month.remove()    
    input_Year.remove()    
    buttom_start_calendar.remove() 
    // console.log(month, year)
}

function calendar_Start_f(year, month) {

let container = document.createElement('div')
container.setAttribute('class', 'container')
document.body.prepend(container)

// let close_modal_window = event => {
//     const target = event.target;
//     console.log("dff")
//     if (target === modal_window) {
//         modal_window.style.opacity = 0;
//         modal_window.style.visibility = 'hidden';
//     }
// }

let duplicationDaysOutsideTable
let duplicationMonthOutsideTable


function numbering_Days(cycle, table, year, month) {
    let full_Date_Today = new Date (year, month)
    //let firstDay_today_month = getDate_f (full_Date_Today)
    let firstDay_today_month = new Date(full_Date_Today.getFullYear(), full_Date_Today.getMonth(), 1).getDay()
    //let lastDay_today_month = 32 - new Date(full_Date_Today.getFullYear(), full_Date_Today.getMonth(), 32).getDate()
    // вместо этих значений (то что выше) будут переменные с годом и месяцем от пользователя
        // if (cycle >= firstDay_today_month && cycle < lastDay_today_month + firstDay_today_month) {
        // }          

            let all_numbers = new Date(year, month, cycle - dayWeek_f(firstDay_today_month) + 2)      
            table.innerHTML = all_numbers.getDate()

            duplicationDaysOutsideTable = all_numbers            
            duplicationMonthOutsideTable = all_numbers.getMonth()

            let getdate_allnumbers_modal_header = all_numbers.getDate() + '.' + all_numbers.getMonth() + '.' + all_numbers.getFullYear() + ' modal_header_input'
            let getdate_allnumbers = all_numbers.getDate() + '.' + all_numbers.getMonth() + '.' + all_numbers.getFullYear()
            // console.log(getdate_allnumbers)
            // console.log(localStorage.key(getdate_allnumbers))

            // console.log(localStorage.key(all_numbers))
            // let value_modal_text = document.createElement('p')

            // = localStorage.getItem('tableText')
            // localStorage.setItem("02.07.2023", modal_body_input.value)
            // mini_modal_in_table.value = localStorage.getItem("JS")
                                                                         
            if (table.innerHTML == 1) {
                let numberMonth = all_numbers.getMonth() + 1
                if (numberMonth > 9) table.innerHTML = all_numbers.getDate() + "." + numberMonth                               
                else table.innerHTML = "0" + all_numbers.getDate() + "." + "0" + numberMonth                
            }

            let mini_modal_in_table = document.createElement('div')
            mini_modal_in_table.setAttribute('class', 'mini_modal_in_table')
            mini_modal_in_table.setAttribute('maxlength', '4')

            

            // function key_local_Storage_f(setting) {
            //     for (let i = 0; i < localStorage.length; i++) {
            //         if (setting == localStorage.key(i)) {
            //             return localStorage.getItem(localStorage.key(i))
            //         }   
            //     }    
            // }
            
            console.log(localStorage.getItem(getdate_allnumbers_modal_header) + "  " + localStorage.getItem(getdate_allnumbers))

           if (localStorage.getItem(getdate_allnumbers_modal_header) != null || localStorage.getItem(getdate_allnumbers) != null) {            
            
                if (localStorage.getItem(getdate_allnumbers_modal_header) != ''  &&  localStorage.getItem(getdate_allnumbers_modal_header) != undefined ) {
                        
                        mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers_modal_header)

                } else {

                        mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers)
                    }
            } 
            
        //       
            // mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers)
            // ?????????????????????????????????????????????????
            // if (key_local_Storage_f(getdate_allnumbers_modal_header) != '' || 'undefined') {
            //     mini_modal_in_table.innerHTML = key_local_Storage_f(getdate_allnumbers_modal_header)
            // }             
            // else if (key_local_Storage_f(getdate_allnumbers) == '' || 'undefined'){
            //     mini_modal_in_table.innerHTML = ''
            // }
            // ?????????????????????????????????????????????????
            
            // key_local_Storage_f(getdate_allnumbers_modal_header)
            table.appendChild(mini_modal_in_table)             

            
            // if (all_numbers.getMonth() == full_Date_Today.getMonth()) {  
            //     // table.setAttribute('id', 'numb ' + table.innerHTML)         
            //     console.log("дни текущего месяца: " + table.innerHTML)
            // }

            // if (all_numbers.getMonth() == full_Date_Today.getMonth() - 1 || all_numbers.getMonth() == full_Date_Today.getMonth() + 1)                               
            //     console.log("Дни прошлого и следущего месяцев: " + table.innerHTML)
                                                       
                            if (all_numbers.getMonth() == full_Date_Today.getMonth() - 1 ) {
                                // numberDaysLastMonth = numberDaysLastMonth + 1
                                // let hele 
                                console.log( "Дни прошлого месяца: " + table.innerHTML )                
                                // console.log(numberDaysLastMonth)                
                            }         

            // table.addEventListener('click', function (event) {
            //     console.log(event)
            // })            
                                     
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
                            console.log("head")                       
                        } 
                        // modal_header_input.value = key_local_Storage_f(getdate_allnumbers)     //???

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
                            console.log("body")                       
                        } 
                        
                    // if (mini_modal_in_table.value != '' && mini_modal_in_table.value != undefined) {
                    //     modal_body_input.value = mini_modal_in_table.value
                    // }                                    
                    modal_content.appendChild(modal_body)
                    
                    // if (modal_header_input.value = '' || 'undefined') {
                    //     mini_modal_in_table.innerHTML = modal_header_input.value
                    // } else {
                    //     modal_body_input.innerHTML = modal_header_input.value
                    // }

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
                // modal_window.appendChild(modal_content)

                    // console.log("Hello " + table.innerHTML)
                // modal.style.display = 'block'           
                                
                // modal_content.appendChild(modal_button_save)                                                             
                document.body.prepend(modal_window)       

                modal_window.onclick = function(event) {                    
                    if (event.target == modal_button_close || event.target == modal_window || event.target == modal_button_delete || event.target == modal_button_save) {
                        // console.log("modal_button_close")
                        modal_window.remove()       
                        // console.log(mini_modal_in_table.value)                 
                        // modal_window.style.display = 'none'
                    }   
                    

                                    
                }
                
                modal_button_save.onclick = function(event) {                                    
                    
                    // value_modal_text.setAttribute('class', 'value_modal_text')                        
                    // table.appendChild(value_modal_text)
                    // mini_modal_in_table.value = localStorage.getItem('tableText')
                    // localStorage.setItem("JS", modal_body_input.value)
                    // mini_modal_in_table.value = localStorage.getItem("JS")                    
                    // localStorage.setItem('tableText', modal_body_input.value)
                    // mini_modal_in_table.innerHTML = modal_header_input.value  

                                      
                // if (mini_modal_in_table.innerHTML == "") {
                //     mini_modal_in_table.innerHTML = modal_body_input.value 
                // }    
                
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    //когда нажимаю сохранить то если input хедер в пробелах, а input бади с текстом, то высвечивается пустота в mini_modal_in_table.innerHTML
                    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! сегодня исправить!!!!!!!!!!!!!!!!!

                    if (delete_space_f(modal_header_input.value) != null) {
                        mini_modal_in_table.innerHTML = modal_header_input.value
                        console.log("header")
                    }                   
                    
                    else if (delete_space_f(modal_body_input.value) != null)  {                                                 
                        // let alldate_string = year + '.' + month + '.' + all_numbers.getDate()
                        mini_modal_in_table.innerHTML = modal_body_input.value 
    
                        // console.log(alldate_string)
                    } 

                // if (modal_header_input.value != "") {
                //     mini_modal_in_table.innerHTML = modal_header_input.value
                //     console.log("header")
                // }                   
                
                // else if (modal_body_input.value != "")  {                                                 
                //     // let alldate_string = year + '.' + month + '.' + all_numbers.getDate()
                //     mini_modal_in_table.innerHTML = modal_body_input.value 

                //     // console.log(alldate_string)
                // }                      
                
                //!!!!!!!!!!!!!!! Добавить ограничение на ввод: нелья вводить пробелы !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                // if (modal_header_input.value[0] != ' ') {
                    
                // } 
                // if (modal_header_input.value[0] != '') {
                    
                // }
                
                // console.log(modal_header_input.value.length + '     length')
                   

                if (delete_space_f(modal_header_input.value) != null) {
                    localStorage.setItem(getdate_allnumbers_modal_header, modal_header_input.value)
                }
                                // for (let i = 0; i < modal_header_input.value.length; i++ ) {
                                //     if (modal_header_input.value[i] == ' ') {
                                //         modal_header_input.value[i].remove()
                                //         localStorage.setItem(getdate_allnumbers_modal_header, modal_header_input.value)
                                //     }
                                // }
                // textarea.onkeyup = function () {
                //     if (this.value.match(/^[ ]+$/)) { 
                //         this.value = ''
                //     } else { 
                //         localStorage.setItem(getdate_allnumbers_modal_header, modal_header_input.value)
                //     }
                // }
                
                    // let save_date = all_numbers.getDate() + '.' + month + '.' + year
                    // console.log(save_date)  
                // if (modal_body_input.value[0] != ' ') {
                if (delete_space_f(modal_body_input.value) != null) {
                    localStorage.setItem(getdate_allnumbers, modal_body_input.value) 
                }    

                if (modal_header_input.value == '' || delete_space_f(modal_header_input.value) == null) {
                    localStorage.removeItem(getdate_allnumbers_modal_header)
                }

                if (modal_body_input.value == '' || delete_space_f(modal_body_input.value) == null) {
                    localStorage.removeItem(getdate_allnumbers)
                }
                    // попробовать сохранять не modal_body_input.value, 
                // }                                                                       // а modal_window
                    // localStorage.setItem(save_date, modal_body_input.value)
                    //console.log(modal_body_input.value)
                    // console.log(mini_modal_in_table.innerHTML )
                    // console.log(modal_body_input.value)

                    // if (modal_header_input.value == '' || modal_body_input.value == '') {
                    //     console.log(" good")

                    // }
                    
                    // if (event.target == modal_button_save) {
                    //     modal_window.remove() 
                    // }

                    console.log(table)
                    // localStorage.clear() //- полностью очищает хранилище
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
    let allocate_today_in_calendar /// ???
    
    
for (let i = 0; i < 7; i++) {
    let cells_Add_Options = document.createElement('div')
    cells_Add_Options.setAttribute('class', 'cell_Add_Options')
    container.appendChild(cells_Add_Options)    
     
    if (i == 0) { 
        // let month_Shift_Counter = month
        // let year_Shift_Counter = year
        let icon_Scroll_Left= document.createElement('i')
        icon_Scroll_Left.setAttribute('class', 'fa fa-angle-left')        
        icon_Scroll_Left.setAttribute('type', 'button')
        cells_Add_Options.appendChild(icon_Scroll_Left)     
        icon_Scroll_Left.onclick = function () {   
            if(allocate_today_in_calendar != undefined) allocate_today_in_calendar.style.backgroundColor = 'white' //чтобы ячейка при переключении оставалась белой               
            if (month_Shift_Counter == 0) year_Shift_Counter = +year_Shift_Counter - 1             
            month_Shift_Counter = counterMonthLeft_f(month_Shift_Counter)
            console.log(month_Shift_Counter, year_Shift_Counter)                                          
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
            if(allocate_today_in_calendar != undefined) allocate_today_in_calendar.style.backgroundColor = 'white' //чтобы ячейка при переключении оставалась белой
            if (month_Shift_Counter == 11) year_Shift_Counter = +year_Shift_Counter + 1                         
            month_Shift_Counter = counterMonthRight_f(month_Shift_Counter)
            console.log(month_Shift_Counter, year_Shift_Counter)                                                  
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
        
        let search_allocate_elemToday    // лучше поменять способ    
        let today = document.createElement('div')
        today.setAttribute('class', 'today')        
        today.setAttribute('type', 'button')
        today.innerHTML = "Today"
        cells_Add_Options.appendChild(today)         
        today.onclick = function () { 
            // console.log( search_allocate_elemToday + "  hele")
            // let elem_find_today = new Date().getDate() + 19                            
            let get_Elem_name_Month_Year = container.querySelector('.name_Month_Year')            
            // let thisMonth = new Date().getMonth()             
            // let thisYear = new Date().getFullYear()                              

            // month_Shift_Counter = new Date().getMonth()             
            // year_Shift_Counter = new Date().getFullYear()       
            month_Shift_Counter = new Date().getMonth()             
            year_Shift_Counter = new Date().getFullYear()       
            // if (All_Months[month_Shift_Counter] + " " + year_Shift_Counter == get_Elem_name_Month_Year.textContent) {
            //                 // let elem_find = container.querySelector('div>:nth-child('+elem_find_today+')') 
            //                 // search_allocate_elemToday = duplicationDaysOutsideTable.getDate() + 13 + new Date().getDate()
            //                 // console.log(duplicationDaysOutsideTable.getDate() + "   этот день") 
                            
            //     allocate_today_in_calendar = container.querySelector('div>:nth-child('+search_allocate_elemToday+')')    // лучше поменять способ
            //                                            // лучше поменять способ             
            //     allocate_today_in_calendar.style.backgroundColor = 'rgb(218, 228, 255)' 
                    
            //     setTimeout(() => allocate_today_in_calendar.style.backgroundColor = 'rgb(255, 255, 255)',  500)
            //     console.log("Wait Please!")  
            // } else {                                
                for (let k = 15; k < 57; k++) {
                    let elem = container.querySelector('div>:nth-child('+k+')')                          
                    numbering_Days(k - 15, elem, year_Shift_Counter, month_Shift_Counter) 
                    // let all_numbs = new Date(year, month, cycle - dayWeek_f(firstDay_today_month) + 2) 
                    let getdat_Mon_Year = duplicationDaysOutsideTable.getDate() + '.' + month_Shift_Counter + '.' + year_Shift_Counter
                        if (new Date().getDate() + '.' + duplicationMonthOutsideTable + '.' + year_Shift_Counter == getdat_Mon_Year ) {
                            allocate_today_in_calendar = container.querySelector('div>:nth-child('+k+')')   
                            search_allocate_elemToday = k         // лучше поменять способ   
                            console.log(search_allocate_elemToday + "   день основа")                                                                       
                        }                                       
                }          
                // allocate_today.style.backgroundColor = 'rgb(218, 228, 255)'
                    allocate_today_in_calendar.style.backgroundColor = 'rgb(218, 228, 255)' 
                    // let get_Elem_name_Month_Year = container.querySelector('.name_Month_Year')
                    get_Elem_name_Month_Year.innerHTML = All_Months[month_Shift_Counter] + " " + year_Shift_Counter    
                            
                    // elem_find = container.querySelector('div>:nth-child('+elem_find_today+')')
                    // elem_find.style.backgroundColor = 'rgb(218, 228, 255)'            
                    // // console.log(elem_find) 
                    setTimeout(() => allocate_today_in_calendar.style.backgroundColor = 'rgb(255, 255, 255)',  1500) 
                       
            // }          
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

// function calendar_Grid_f(year, month) {
for (let k = 0; k < 42; k++) {
    let cells_table = document.createElement('div')
    cells_table.setAttribute('class',  'cell_table')
    cells_table.setAttribute('type', 'button')
    // numbering_Days_last_Months(k, cells_table)    
    numbering_Days(k, cells_table, year, month)
    // numbering_Days_Next_Months(k, cells_table)        
    container.appendChild(cells_table)                           
    }
// }

// calendar_Grid_f(2023, 04)

// numb_days (cycle, table, year, month)

}
