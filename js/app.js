// Task Management
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.currentEditId = null;
    }

    addTask(task) {
        task.id = Date.now().toString();
        task.createdAt = new Date().toISOString();
        task.completed = false;
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    editTask(id, updatedTask) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
            this.saveTasks();
            return this.tasks[index];
        }
        return null;
    }

    toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            return task;
        }
        return null;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
    }

    getStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        return { total, completed, pending };
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
}

// UI Management
class UI {
    constructor(taskManager) {
        this.taskManager = taskManager;
        this.initializeElements();
        this.bindEvents();
        this.renderTasks();
        this.updateStats();
    }

    initializeElements() {
        this.taskGrid = document.getElementById('taskGrid');
        this.modal = document.getElementById('taskModal');
        this.modalContent = document.getElementById('modalContent');
        this.taskForm = document.getElementById('taskForm');
        this.addTaskBtn = document.getElementById('addTaskBtn');
        this.closeModalBtn = document.getElementById('closeModal');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.modalTitle = document.getElementById('modalTitle');
        
        // Stats elements
        this.totalTasksElement = document.getElementById('totalTasks');
        this.completedTasksElement = document.getElementById('completedTasks');
        this.pendingTasksElement = document.getElementById('pendingTasks');
    }

    bindEvents() {
        this.addTaskBtn.addEventListener('click', () => this.openModal());
        this.closeModalBtn.addEventListener('click', () => this.closeModal());
        this.cancelBtn.addEventListener('click', () => this.closeModal());
        this.taskForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });

        // Prevent modal content clicks from closing the modal
        this.modalContent.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    openModal(taskId = null) {
        this.taskManager.currentEditId = taskId;
        this.modalTitle.textContent = taskId ? 'Edit Task' : 'Add New Task';
        this.modal.classList.remove('hidden');
        
        // Add animation classes
        setTimeout(() => {
            this.modalContent.classList.remove('scale-95', 'opacity-0');
            this.modalContent.classList.add('scale-100', 'opacity-100');
        }, 10);
        
        if (taskId) {
            const task = this.taskManager.tasks.find(t => t.id === taskId);
            if (task) {
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';
                document.getElementById('taskDueDate').value = task.dueDate || '';
                document.getElementById('taskPriority').value = task.priority || 'low';
            }
        } else {
            this.taskForm.reset();
        }
    }

    closeModal() {
        // Add closing animation
        this.modalContent.classList.add('scale-95', 'opacity-0');
        this.modalContent.classList.remove('scale-100', 'opacity-100');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            this.modal.classList.add('hidden');
            this.taskForm.reset();
            this.taskManager.currentEditId = null;
        }, 300);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        try {
            const formData = {
                title: document.getElementById('taskTitle').value.trim(),
                description: document.getElementById('taskDescription').value.trim(),
                dueDate: document.getElementById('taskDueDate').value,
                priority: document.getElementById('taskPriority').value,
            };

            if (!formData.title) {
                throw new Error('Task title is required');
            }

            if (this.taskManager.currentEditId) {
                this.taskManager.editTask(this.taskManager.currentEditId, formData);
            } else {
                this.taskManager.addTask(formData);
            }

            this.closeModal();
            this.renderTasks();
            this.updateStats();
        } catch (error) {
            alert(error.message);
        }
    }

    renderTasks() {
        this.taskGrid.innerHTML = '';
        
        if (this.taskManager.tasks.length === 0) {
            this.renderEmptyState();
            return;
        }

        this.taskManager.tasks.forEach(task => {
            const taskCard = this.createTaskCard(task);
            this.taskGrid.appendChild(taskCard);
        });
    }

    createTaskCard(task) {
        const card = document.createElement('div');
        card.className = `bg-white rounded-xl shadow-custom hover:shadow-custom-hover transition-all duration-200 
            ${task.completed ? 'opacity-75' : ''}`;
        
        const priorityColors = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800'
        };

        card.innerHTML = `
            <div class="p-6 space-y-4">
                <div class="flex items-start justify-between">
                    <div class="flex items-start space-x-3 flex-1">
                        <button 
                            onclick="ui.toggleTaskCompletion('${task.id}')"
                            class="mt-1 text-lg ${task.completed ? 'text-green-500' : 'text-gray-300'} hover:scale-110 transition-transform"
                        >
                            <i class="fas ${task.completed ? 'fa-check-circle' : 'fa-circle'}"></i>
                        </button>
                        <div class="space-y-1 flex-1">
                            <h3 class="font-semibold text-lg text-text ${task.completed ? 'line-through' : ''}">${task.title}</h3>
                            ${task.description ? `
                                <p class="text-muted ${task.completed ? 'line-through' : ''}">${task.description}</p>
                            ` : ''}
                        </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                        <button onclick="ui.openModal('${task.id}')" 
                            class="text-muted hover:text-accent transition-colors p-1 hover:bg-gray-100 rounded">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="ui.deleteTask('${task.id}')" 
                            class="text-muted hover:text-red-500 transition-colors p-1 hover:bg-gray-100 rounded">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="flex items-center justify-between pt-2">
                    <span class="text-sm ${priorityColors[task.priority]} px-3 py-1 rounded-full font-medium">
                        ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                    ${task.dueDate ? `
                        <span class="text-sm text-muted flex items-center">
                            <i class="far fa-calendar-alt mr-1"></i>
                            ${new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    ` : ''}
                </div>
            </div>
        `;

        return card;
    }

    renderEmptyState() {
        const emptyState = document.createElement('div');
        emptyState.className = 'col-span-full text-center py-12';
        emptyState.innerHTML = `
            <div class="text-muted">
                <i class="fas fa-tasks text-6xl mb-4 text-accent opacity-50"></i>
                <h3 class="text-xl font-semibold mb-2">No tasks yet</h3>
                <p>Click the "Add Task" button to create your first task</p>
            </div>
        `;
        this.taskGrid.appendChild(emptyState);
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.taskManager.deleteTask(id);
            this.renderTasks();
            this.updateStats();
        }
    }

    toggleTaskCompletion(id) {
        this.taskManager.toggleTaskCompletion(id);
        this.renderTasks();
        this.updateStats();
    }

    updateStats() {
        const stats = this.taskManager.getStats();
        this.totalTasksElement.textContent = stats.total;
        this.completedTasksElement.textContent = stats.completed;
        this.pendingTasksElement.textContent = stats.pending;
    }
}

// Initialize the app
const taskManager = new TaskManager();
const ui = new UI(taskManager);

// Make UI instance available globally for event handlers
window.ui = ui;
