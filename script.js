class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        this.isWorkMode = true;
        
        // DOM elements
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = document.querySelectorAll('.mode');
        this.toggleButton = document.getElementById('toggle-mode');
        
        // Event listeners
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.toggleButton.addEventListener('click', () => this.toggleMode());
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => this.setMode(button));
        });
        
        this.updateDisplay();
    }
    
    toggleMode() {
        this.isWorkMode = !this.isWorkMode;
        this.toggleButton.textContent = this.isWorkMode ? 'Rest' : 'Work';
        this.toggleButton.classList.toggle('active');
        
        // Set time based on mode
        this.timeLeft = this.isWorkMode ? 25 * 60 : 5 * 60;
        this.updateDisplay();
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.reset();
                    // Play a sound or show notification when timer ends
                    new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3').play();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            clearInterval(this.timerId);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.isWorkMode ? 25 * 60 : 5 * 60;
        this.updateDisplay();
    }
    
    setMode(button) {
        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        this.reset();
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timeDisplay.textContent = timeString;
        document.title = `${timeString} - Pomodoro Timer`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 