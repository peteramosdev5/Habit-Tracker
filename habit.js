const taskInput = document.getElementById('taskInput');
const addBut = document.getElementById('addBut');
const habitFreq = document.getElementById('habitFreq');
const allBut = document.getElementById('allBut');
const todayBut = document.getElementById('todayBut');
const compBut = document.getElementById('compBut');
const notCom = document.getElementById('notCom');
const totalHab =document.getElementById('totalHab');
const comHab = document.getElementById('comHab');
const pendingHab = document.getElementById('pendingHab');
const currentDate = document.getElementById('currentDate');

let habits = JSON.parse(localStorage.getItem('habits')) || [];
let filter = 'all';
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

const now = new Date();
const todayString = now.toDateString();

const options = {weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};

if (currentDate) {
    currentDate.textContent = now.toLocaleDateString('en-Us', options);
    showHabits();
}



addBut.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text === '') return;

    const newHabit = {
        id: Date.now(),
        text: text,
        completed: false,
        frequency: habitFreq.value,
        createdAt: todayString
    };
    habits.push(newHabit);
    saveHabits();
    taskInput.value = '';
    showHabits();
    
});

allBut.addEventListener('click', () => {
    filter = 'all';
    showHabits();
});

todayBut.addEventListener('click', () => {
    filter = 'today';
    showHabits();
});

compBut.addEventListener('click', () => {
    filter = 'completed';
    showHabits();
});

notCom.addEventListener('click', () => {
    filter = 'incompleted';
    showHabits();
});

function showHabits() {
    taskList.innerHTML = '';
    let filteredHabits = habits;

    if (filter === 'incompleted') {
    filteredHabits = habits.filter(habit => !habit.completed);
    } else if (filter === 'completed') {
        filteredHabits = habits.filter(habit => habit.completed);
    } else if (filter === 'today') {
        filteredHabits = habits.filter(habit => habit.createdAt === todayString);
    }

    totalHab.textContent = "Total:" + habits.length;
    comHab.textContent = "Completed:" + habits.filter(habit => habit.completed).length;
    pendingHab.textContent = "Pending:" + habits.filter(habit => !habit.completed).length;

    filteredHabits.forEach((habit, index) => {
        const realIndex = habits.indexOf(habit);
        const li = document.createElement('li');
        li.className = "habit-tree";
        if (habit.important) {
            li.classList.add('important');
        }

        li.innerHTML =`
        <div class="habitI">
        <input type ="checkbox" ${habit.completed ? 'checked' : ''}>
        <span class="habitT ${habit.completed ? 'done' : ''}">${habit.text}</span>
        <span class="daily-badge">${habit.frequency}</span>
        <span class="habit-date">${habit.createdAt}</span>
        <div class="habit-button">
        <button onclick='toggleCompleted(${realIndex})'>Important</button>
        <button onclick='deleteHabits(${realIndex})'>Delete</button>`;
        taskList.appendChild(li); 
    });
} 


function toggleCompleted(i) {
    habits[i].completed = !habits[i].completed;
    saveHabits();
    showHabits();
}

function deleteHabits(i) {
    habits.splice(i, 1);
    saveHabits();
    showHabits();
}
