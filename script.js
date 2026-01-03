// Update current time
function updateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    
    document.getElementById('current-time').textContent = 
        now.toLocaleDateString('en-US', options);
    
    document.getElementById('timestamp').textContent = 
        `Page loaded at: ${now.toLocaleTimeString()}`;
}

// Set repository links dynamically
function setLinks() {
    const repoUrl = window.location.href.includes('github.io') 
        ? 'https://github.com/YOUR-USERNAME/my-vercel-project'
        : window.location.origin.replace('https://', 'https://github.com/');
    
    document.getElementById('repo-link').href = repoUrl;
    document.getElementById('vercel-link').href = window.location.origin;
}

// Add log entry
function addLogEntry(message) {
    const logDiv = document.getElementById('log-content');
    const entry = document.createElement('p');
    entry.innerHTML = `<i class="fas fa-chevron-right"></i> ${message}`;
    logDiv.appendChild(entry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateTime();
    setLinks();
    
    // Update time every second
    setInterval(updateTime, 1000);
    
    // Refresh button functionality
    document.getElementById('refresh-btn').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        this.disabled = true;
        
        addLogEntry(`Manual refresh at ${new Date().toLocaleTimeString()}`);
        
        setTimeout(() => {
            updateTime();
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            this.disabled = false;
            addLogEntry('Refresh completed ✓');
        }, 1500);
    });
    
    // Simulate deployment process
    setTimeout(() => addLogEntry('Vercel deployment detected ✓'), 1000);
    setTimeout(() => addLogEntry('Build process completed ✓'), 2000);
    setTimeout(() => addLogEntry('Site is now live on Vercel ✓'), 3000);
});