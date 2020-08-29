
let startBtn = document.getElementById('start'),
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


let appData = {
  budget: money,
  expenses: {},
  optionalExpenses: {},
  income: [],
  timeData: time,
  savings: true,
  chooseExpenses: function() {
      for (let i = 0; i < 2; i++) {
    let a = prompt("Enter the required expense item for this month", "");
    let b = prompt("How much does it cost?", "");
    if ( (typeof(a)) === 'string' && (typeof(a)) != null && (typeof(b)) != null && (a != "") && (b != "") && (a.lenght < 50) ) {
      console.log("Done!");
      appData.expenses[a] = b;
    } else {i++}
    }
    },
  detectDayBudget: function() {
    appData.moneyPerDay = (appData.budget / 30).toFixed(2);
    alert("Money per day: " + appData.moneyPerDay);
    },
  detectLevel: function() {
      if (appData.moneyPerDay < 100) {console.log("Minimum level of income");}
    else if (appData.moneyPerDay >= 100 && appData.moneyPerDay <= 2000) {console.log("Average level of income");}
    else if (appData.moneyPerDay > 2000) {console.log("High level of wealth");}
    else {console.log("Error!");}
    },
  checkSavings: function() {
     if (appData.savings) {
    let save = +prompt("How many savings  you have?", "");
    let percent = +prompt("What percent?", "");
    appData.monthIncome = save/100/12*percent;
    alert("Income per month from your deposit: " + appData.monthIncome)
    }
    },
  checkOptExpenses: function() {
    for (let i = 0; i < 2; i++) {
      let opt = prompt("Optional expense item:", "");
      appData.optionalExpenses[i] = opt;
    }
    },
  chooseIncome: function() {
    let items = prompt("What will bring additional income? (list separated by commas)", "");
    appData.income = items.split(', ');
    appData.income.push(prompt("Maybe something else?", ""));
    appData.income.sort();
  }
};


