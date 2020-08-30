'use strict';

let startBtn = document.getElementById('start'), // my
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],//?
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],

    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    checkSavings = document.querySelector('#savings'),
    sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue =  document.querySelector('.day-value');

let money, time;
//----------------------------------------------------------------------
startBtn.addEventListener('click', function() {
  time = prompt("Enter date in format YYYY-MM-DD", "");
  money = +prompt("Enter your month budget: ", "");
  
  while(isNaN(money) || money == "" || money == null ) {
      money = +prompt("Enter your month budget: ", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed(2);
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});
//--------------------------------------------------------------------
expensesBtn.addEventListener('click', function() {
  var sum = 0;
    for( let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;
            if ((typeof(a) === "string") 
                && (typeof(a) != null ) 
                && (typeof(b) != null )
                && (isNaN(b) == false )
                && (a != "") 
                && (b != "")
                && (a.length < 50 )
                ) {
                    appData.expenses[a] = b;
                    sum += +b; 
            } else {
                alert("Вы ввели некорректный ответ! Это может привести к снижению точности вычислений.");
                console.log((i+1) + "Input Error");
             }
    }
    expensesValue.textContent = sum;
});
//---------------------------------------------------------------------------
optionalExpensesBtn.addEventListener('click', function() {
    for( let i = 0; i < optionalExpensesItem.length; i++)  {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ' ;
      }
});
//----------------------------------------------------------------------------
countBtn.addEventListener('click', function() {
    if(appData.budget != undefined) {
        appData.moneyPerDay = (appData.budget/30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
    
        if(appData.moneyPerDay < 100 ) {
            levelValue.textContent = "Минимальный уровень достатка";
    } else if (( appData.moneyPerDay == 100 || ( appData.moneyPerDay > 100)  && appData.moneyPerDay < 1000  )) {
            levelValue.textContent = "Средний уровень достатка";
    } else if ( appData.moneyPerDay == 1000 || appData.moneyPerDay > 1000 ) { 
            levelValue.textContent = "Высокий уровень достатка";
    } else { levelValue.textContent = "Произошла непредвиденная ошибка!";
    }
    }
    else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});
//------------------------------------------------------------------------------
incomeItem.addEventListener('change', function() {
    let items = incomeItem.value;
    appData.income = items.split(", ");
    appData.income.sort();
    incomeValue.textContent = appData.income;
});
//---------------------------------------------------------------------------
checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {appData.savings = false;}
    else {appData.savings = true;}
});
//------------------------------------------------------------------------------
sumValue.addEventListener('input', function() {
    if (appData.savings == true){
        let sum = +sumValue.value,
            percent = +percentValue.value;

        appData.monthIncome = (sum/100/12*percent).toFixed(1); 
        appData.yearIncome = (sum/100*percent).toFixed(1);

        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
    }
});
//-----------------------------------------------------------------------------------
percentValue.addEventListener('input', function() {
    if (appData.savings == true){
        let sum = +sumValue.value,
        percent = +percentValue.value;

    appData.monthIncome = (sum/100/12*percent).toFixed(1); 
    appData.yearIncome = (sum/100*percent).toFixed(1);

    monthSavingsValue.textContent = appData.monthIncome;
    yearSavingsValue.textContent = appData.yearIncome;      
    }
});
//-----------------------------------------------------------------------------------

let appData  = { 
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [ ] ,
    savings: false,
}; 