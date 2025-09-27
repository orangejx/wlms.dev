// Theme switching and configuration application functions
$(document).ready(function() {
    // Load configuration file
    $.getJSON('./config.json')
        .done(function(config) {
            // Apply configuration to DOM
            applyConfig(config);
            setupThemeToggle();
        })
        .fail(function(error) {
            console.error('Failed to load config file:', error);
        });
});

// Set up theme toggle function
function setupThemeToggle() {
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check theme settings in local storage
    const currentTheme = localStorage.getItem('theme');
    
    // If there are theme settings in local storage, apply them
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
        // Otherwise, set theme based on system preferences
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
    }
    
    // Update button icon status
    updateThemeIcon();
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            updateThemeIcon();
        }
    });
    
    // Click to toggle theme
    themeSwitch.addEventListener('click', () => {
        let theme = 'light';
        
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            theme = 'dark';
        }
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon();
    });
}

// Update theme icon
function updateThemeIcon() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
        document.querySelector('.fa-sun').style.display = 'none';
        document.querySelector('.fa-moon').style.display = 'inline-block';
    } else {
        document.querySelector('.fa-sun').style.display = 'inline-block';
        document.querySelector('.fa-moon').style.display = 'none';
    }
}

// Apply configuration to DOM
function applyConfig(config) {
    // Set personal information
    document.getElementById('profile-name').textContent = config.profile.name;
    
    // Set avatar
    if (config.profile.avatar) {
        document.getElementById('profile-image').style.backgroundImage = `url(${config.profile.avatar})`;
    }
    
    // Set position titles
    const titlesContainer = document.getElementById('profile-positions');
    titlesContainer.innerHTML = ''; // Clear existing content
    titlesContainer.classList.add('position-tags'); // Add position-tags class

    // Create an independent tag for each position
    config.profile.positions.forEach(position => {
        if (position === '@') {
            // If it's a special separator, consider not displaying or handling it specially
            return;
        }
        const positionTag = $('<div>').addClass('position-tag').text(position);
        titlesContainer.appendChild(positionTag[0]);
    });
    
    // Set social links
    const socialLinksContainer = document.getElementById('social-links');
    socialLinksContainer.innerHTML = ''; // Clear existing links
    
    config.socialLinks.forEach(link => {
        const linkElement = document.createElement('a');
        linkElement.href = link.url;
        linkElement.target = '_blank';
        linkElement.setAttribute('aria-label', link.name);
        
        const iconElement = document.createElement('i');
        iconElement.className = link.icon;
        
        const textElement = document.createElement('span');
        textElement.textContent = link.username;
        
        linkElement.appendChild(iconElement);
        linkElement.appendChild(textElement);
        
        socialLinksContainer.appendChild(linkElement);
    });
    
    // Set footer
    const footerContainer = document.getElementById('footer');
    footerContainer.innerHTML = ''; // Clear existing content
    
    // Add original footer information
    const originalFooterLink = document.createElement('span');
    originalFooterLink.className = 'link';
    
    const originalFooterAnchor = document.createElement('a');
    originalFooterAnchor.href = config.footer.url;
    originalFooterAnchor.target = '_blank';
    originalFooterAnchor.textContent = config.footer.text;
    
    originalFooterLink.appendChild(originalFooterAnchor);
    footerContainer.appendChild(originalFooterLink);
    
    // Add new designer information
    const designerInfo = document.createElement('div');
    designerInfo.className = 'designer-info';
    designerInfo.innerHTML = '<span class="link">Redesigned by Aldrich J. Xing</span>';
    footerContainer.appendChild(designerInfo);
    
    // Apply theme variables
    applyThemeVariables(config);
}

// Apply theme variables
function applyThemeVariables(config) {
    const root = document.documentElement;
    const darkTheme = config.theme.dark;
    const lightTheme = config.theme.light;
    
    // Set CSS variables
    root.style.setProperty('--dark-bg-color', darkTheme.bgColor);
    root.style.setProperty('--dark-bg-pattern-color', darkTheme.bgPatternColor);
    root.style.setProperty('--dark-card-bg', darkTheme.cardBg);
    root.style.setProperty('--dark-text-color', darkTheme.textColor);
    root.style.setProperty('--dark-heading-color', darkTheme.headingColor);
    root.style.setProperty('--dark-highlight-color', darkTheme.highlightColor);
    root.style.setProperty('--dark-hover-color', darkTheme.hoverColor);
    root.style.setProperty('--dark-shadow-color', darkTheme.shadowColor);
    root.style.setProperty('--dark-toggle-bg', darkTheme.toggleBg);
    root.style.setProperty('--dark-toggle-icon', darkTheme.toggleIcon);
    
    root.style.setProperty('--light-bg-color', lightTheme.bgColor);
    root.style.setProperty('--light-bg-pattern-color', lightTheme.bgPatternColor);
    root.style.setProperty('--light-card-bg', lightTheme.cardBg);
    root.style.setProperty('--light-text-color', lightTheme.textColor);
    root.style.setProperty('--light-heading-color', lightTheme.headingColor);
    root.style.setProperty('--light-highlight-color', lightTheme.highlightColor);
    root.style.setProperty('--light-hover-color', lightTheme.hoverColor);
    root.style.setProperty('--light-shadow-color', lightTheme.shadowColor);
    root.style.setProperty('--light-toggle-bg', lightTheme.toggleBg);
    root.style.setProperty('--light-toggle-icon', lightTheme.toggleIcon);
}