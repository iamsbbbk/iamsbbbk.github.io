function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const themeSwitcherIcon = document.querySelector('.theme-switcher i');
    if (body.classList.contains('dark-mode')) {
        themeSwitcherIcon.className = 'far fa-sun';
        themeSwitcherIcon.nextSibling.nodeValue = ' 白天模式';
    } else {
        themeSwitcherIcon.className = 'far fa-moon';
        themeSwitcherIcon.nextSibling.nodeValue = ' 晚间模式';
    }
}