export const showAuthRes = (message, status) => {
    let auth_result = document.getElementById('auth-result');
    if (window.getComputedStyle(auth_result).visibility === "visible") {
        auth_result.classList.add("shake");
        setTimeout(function() {
            auth_result.classList.remove("shake");
        }, 300);
    }
    auth_result.innerHTML = message;
    let style = '';
    if (status) {
        style += 'background-color: green;';
    } else {
        style += 'background: rgb(220,53,68);';
    }
    style += ' visibility: visible;';
    auth_result.setAttribute('style', style);
}