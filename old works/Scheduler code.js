function name_Days_Week(section_Columns, i, j) {
    let daysWeek_Array = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]    
    if (j == 0)
    section_Columns.innerHTML = daysWeek_Array[i]
}

function month_N_Year_f() {
    let month_N_Year = document.createElement('div')
    month_N_Year.setAttribute('class', 'month_N_Year')
    let options_month_N_Year = new Date
    let options = {
        year: 'numeric',
        month: 'long',
    }
    month_N_Year.innerHTML =  options_month_N_Year.toLocaleString('de-DE', options)
    container.prepend(month_N_Year)
}

let full_Date_Today = new Date
let full_Day_Week_Today = full_Date_Today.getDay() //день недели 
let full_Day_Today = full_Date_Today.getDate()  //день 
 let full_Month_Today = full_Date_Today.getMonth()  //месяц 
 let full_Year_Today = full_Date_Today.getFullYear()  //год 
// console.log(full_Date_Today)
// console.log(full_Day_Week_Today)
// console.log(full_Day_Today)
// console.log(full_Month_Today)
// console.log(full_Year_Today)
// Date.prototype.daysInMonth = function() {
//     return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
//   }
// console.log(new Date().daysInMonth())

     
    let firstDay_today_month = new Date(full_Year_Today, full_Month_Today, 1).getDate()
    console.log(firstDay_today_month)

function days_Mounth_All(section_Columns, j) {
   
    Date.prototype.daysInMonth = function() {
        return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
      }
      let counter_Days = 1;
      if (j > 0) {    
    for (let k = 0; k <= new Date().daysInMonth(); k++) {
        counter_Days++             
        section_Columns.innerHTML = k 
        }
    }   
}


let container = document.createElement('div')
container.setAttribute('class', 'container')
document.body.prepend(container)

month_N_Year_f()

for (let i = 0; i < 7; i++) {
    let section_Columns = document.createElement('div')
    section_Columns.setAttribute('class', 'section_Columns')

    container.appendChild(section_Columns)
    for (let j = 0; j < 6; j++) {
        let section_Rows = document.createElement('div')
        section_Rows.setAttribute('class', 'section_Rows')
        name_Days_Week(section_Columns, i, j) // Название дней недели
        //days_Mounth_All(section_Columns, j)
        section_Columns.appendChild(section_Rows)
    }
}

