
     
const now = new Date();
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayName = daysOfWeek[now.getDay()]; 

let hours = now.getHours();
const minutes = now.getMinutes().toString().padStart(2, '0');
const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12 || 12; //

document.getElementById("dateTime").innerHTML = ` ${dayName} ${hours}:${minutes} ${ampm}.`;






   let tasks = [];

   function showNewTask() {
       const modal = new bootstrap.Modal(document.getElementById('newTaskModal'));
       modal.show();
   }

   function renderTasks() {
       const taskList = document.getElementById('taskList');
       taskList.innerHTML = '';
       tasks.forEach((task, index) => {
           const li = document.createElement('li');
           li.className = `task-item ${task.completed ? 'completed' : ''}`;
           li.innerHTML = `
               <span>${task.description} - Due: ${task.date}</span>
               <div class="task-actions">
                   <button onclick="toggleComplete(${index})"><i class="fas fa-check text-success"></i></button>
                   <button onclick="editTask(${index})"><i class="fas fa-edit text-primary"></i></button>
                   <button onclick="deleteTask(${index})"><i class="fas fa-trash text-danger"></i></button>
               </div>
           `;
           taskList.appendChild(li);
       });
   }

   function addTask(description, date, alarm) {
       tasks.push({ description, date, alarm, completed: false });
       renderTasks();
   }

   function toggleComplete(index) {
       tasks[index].completed = !tasks[index].completed;
       renderTasks();
   }

   function editTask(index) {
       const task = tasks[index];
       document.getElementById('taskInput').value = task.description;
       document.getElementById('dateInput').value = task.date;
       document.getElementById('alarmInput').value = task.alarm || '';
       tasks.splice(index, 1);
       showNewTask();
   }

   function deleteTask(index) {
       tasks.splice(index, 1);
       renderTasks();
   }

   document.addEventListener('DOMContentLoaded', () => {
       const htmlElement = document.documentElement;
       const themeSwitch = document.getElementById('themeSwitch');
       
       const setTheme = (theme) => {
           htmlElement.setAttribute('data-bs-theme', theme);
           themeSwitch.innerHTML = theme === 'dark' 
               ? '<i class="fa-solid fa-sun"></i>' 
               : '<i class="fa-solid fa-moon"></i>';
           localStorage.setItem('theme', theme);
       };

       const savedTheme = localStorage.getItem('theme') || 'dark';
       setTheme(savedTheme);

       themeSwitch.addEventListener('click', () => {
           const currentTheme = htmlElement.getAttribute('data-bs-theme');
           const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
           setTheme(newTheme);
       });

       // Initialize Flatpickr for date and time inputs
       flatpickr("#dateInput", {
           enableTime: false,
           dateFormat: "Y-m-d",
       });

       flatpickr("#alarmInput", {
           enableTime: true,
           noCalendar: true,
           dateFormat: "H:i",
       });

       // Form submission
       document.getElementById('todoForm').addEventListener('submit', (e) => {
           e.preventDefault();
           const task = document.getElementById('taskInput').value;
           const date = document.getElementById('dateInput').value;
           const alarm = document.getElementById('alarmInput').value;
           
           if (task && date) {
               addTask(task, date, alarm);
               e.target.reset();
               bootstrap.Modal.getInstance(document.getElementById('newTaskModal')).hide();
           } else {
               alert('Please fill in the task and date fields.');
           }
       });
   });
