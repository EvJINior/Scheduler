// function dayWeek_f(numb_day) {
//     if (numb_day == 0) return 7
//     else return numb_day
// } 

// // let All_Months = ["January", "Februare", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 
// let All_Months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] 

// let month;
// let year;

// let buttom_start_calendar = document.createElement('buttom')
// buttom_start_calendar.setAttribute('class', 'buttom_start')
// document.body.prepend(buttom_start_calendar)
// let input_Year = document.createElement('input')
// input_Year.setAttribute('value', new Date(2023,04).getFullYear())
// document.body.prepend(input_Year)
// let input_Month = document.createElement('input')
// input_Month.setAttribute('value', All_Months[new Date(2023,04).getMonth()])
// document.body.prepend(input_Month)

// buttom_start_calendar.onclick = function() {
//     month = All_Months.indexOf(input_Month.value)
//     year = input_Year.value
//     calendar_Start_f(year, month)
//     input_Month.remove()    
//     input_Year.remove()    
//     buttom_start_calendar.remove()    
//     console.log(month, year)
// }

// function calendar_Start_f(year, month) {

let container = document.createElement('div')
container.setAttribute('class', 'container')
document.body.prepend(container)

// function numbering_Days(cycle, table, year, month) {
//     let full_Date_Today = new Date (year, month)
//     //let firstDay_today_month = getDate_f (full_Date_Today)
//     let firstDay_today_month = new Date(full_Date_Today.getFullYear(), full_Date_Today.getMonth(), 1).getDay()
//     //let lastDay_today_month = 32 - new Date(full_Date_Today.getFullYear(), full_Date_Today.getMonth(), 32).getDate()
//     // вместо этих значений (то что выше) будут переменные с годом и месяцем от пользователя
//         // if (cycle >= firstDay_today_month && cycle < lastDay_today_month + firstDay_today_month) {
//         // }          

//             let all_numbers = new Date(year, month, cycle - dayWeek_f(firstDay_today_month) + 2)      
//             table.innerHTML = all_numbers.getDate()

//             if (table.innerHTML == 1) {
//                 let numberMonth = all_numbers.getMonth() + 1
//                 if (numberMonth > 9) table.innerHTML = all_numbers.getDate() + "." + numberMonth                               
//                 else table.innerHTML = "0" + all_numbers.getDate() + "." + "0" + numberMonth                
//             }
//             // if (all_numbers.getMonth() == full_Date_Today.getMonth()) {  
//             //     // table.setAttribute('id', 'numb ' + table.innerHTML)         
//             //     console.log("дни текущего месяца: " + table.innerHTML)
//             // }

//             // if (all_numbers.getMonth() == full_Date_Today.getMonth() - 1 || all_numbers.getMonth() == full_Date_Today.getMonth() + 1) 
//             // console.log("Дни прошлого и следущего месяцев: " + table.innerHTML)

//             table.onclick = function () {
//                 console.log("Hello " + table.innerHTML)
//             }                     
//     }
    
// for (let i = 0; i < 7; i++) {
    let cells_Add_Options = document.createElement('div')
    cells_Add_Options.setAttribute('class', 'item header')
    container.appendChild(cells_Add_Options)

    // let icon_Scroll_Right= document.createElement('i')
    // let name_Month_Year = document.createElement('div')
    // let today = document.createElement('div')
    // if (i == 0) {      
    //     let month_Shift_Counter = month;           
    //     icon_Scroll_Right.setAttribute('class', 'fa fa-angle-right')        
    //     icon_Scroll_Right.setAttribute('type', 'button')
    //     cells_Add_Options.prepend(icon_Scroll_Right)         
    //     icon_Scroll_Right.onclick = function () {            
    //         month_Shift_Counter = month_Shift_Counter + 1                
    //         for (let k = 15; k < 57; k++) {
    //         let elem = container.querySelector('div>:nth-child('+k+')')                          
    //         numbering_Days(k - 15, elem, 2023, month_Shift_Counter)            
    //         }    
    //         let elem_find_1 = container.querySelector('div>:nth-child(1)') 
    //         console.log(elem_find_1)        
    //     }

    //     let icon_Scroll_Left= document.createElement('i')
    //     icon_Scroll_Left.setAttribute('class', 'fa fa-angle-left')        
    //     icon_Scroll_Left.setAttribute('type', 'button')
    //     cells_Add_Options.prepend(icon_Scroll_Left)
    //     icon_Scroll_Left.onclick = function () {
    //         month_Shift_Counter = month_Shift_Counter - 1                
    //         for (let k = 15; k < 57; k++) {
    //         let elem = container.querySelector('div>:nth-child('+k+')')                          
    //         numbering_Days(k - 15, elem, 2023, month_Shift_Counter)
    //         }            
    //     }
    // }  
    // if (i == 1) {        
        
    //     name_Month_Year.innerHTML = All_Months[month] + " " + year
    //     cells_Add_Options.prepend(name_Month_Year) 
    // // let options_month_N_Year = new Date(2023, 04)
    // //     let options = {
    // //     year: 'numeric',
    // //     month: 'long',
    // //     }    
    // // cells_Add_Options.innerHTML = options_month_N_Year.toLocaleString('EN', options)
    // }   
    // if (i == 2) {        
    //     today.setAttribute('class', 'today')        
    //     today.setAttribute('type', 'button')
    //     today.innerHTML = "Today"
    //     cells_Add_Options.prepend(today) 
    //     today.onclick = function () {            
    //         let elem_find_today = new Date().getDate() + 14
    //         let elem_find = container.querySelector('div>:nth-child('+elem_find_today+')')
    //         elem_find.style.backgroundColor = 'rgb(218, 228, 255)'            
    //         setTimeout(() => elem_find.style.backgroundColor = 'rgb(255, 255, 255)',  5000)           
    //     }        
    // }     
    
// }

// for (let j = 0; j < 7; j++) {
    let cells_Name_Days_Week = document.createElement('div')
    cells_Name_Days_Week.setAttribute('class', 'item sidebar')
    let daysWeek_Array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]        
    cells_Name_Days_Week.innerHTML = daysWeek_Array[j]    
    container.appendChild(cells_Name_Days_Week)
// }



// for (let k = 0; k < 42; k++) {
    let cells_table = document.createElement('div')
    cells_table.setAttribute('class',  'item content')
    cells_table.setAttribute('type', 'button')
    // numbering_Days_last_Months(k, cells_table)    
    //numbering_Days(k, cells_table, year, month)
    // numbering_Days_Next_Months(k, cells_table)        
    container.appendChild(cells_table)                           
    // }

