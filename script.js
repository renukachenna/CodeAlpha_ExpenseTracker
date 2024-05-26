const expenseForm = document.getElementById("expenseForm");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${expense.name} - $${expense.amount}</span>
                    <button onclick="editExpense(${index})">Edit</button>
                    <button onclick="deleteExpense(${index})">Delete</button>`;
    expenseList.appendChild(li);
  });
}

function addExpense(event) {
  event.preventDefault();

  const name = expenseNameInput.value;
  const amount = expenseAmountInput.value;

  if (name && amount) {
    const newExpense = {
      name,
      amount
    };
    expenses.push(newExpense);
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
}

function editExpense(index) {
  const newName = prompt("Enter new expense name:");
  const newAmount = prompt("Enter new expense amount:");
  
  if (newName && newAmount) {
    expenses[index].name = newName;
    expenses[index].amount = newAmount;
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

expenseForm.addEventListener("submit", addExpense);

renderExpenses();
