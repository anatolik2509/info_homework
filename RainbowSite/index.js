document.addEventListener('DOMContentLoaded', () => {
    let buttons = document.getElementsByClassName('color-button')
    let body = document.body
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', (event) => {
            body.style.background = window.getComputedStyle(event.target, null).getPropertyValue('background-color')
        })
    }
    let rgb_button = document.getElementById("RGB")
    let colors = ["red", "green", "blue"]
    let iter = 0
    rgb_button.addEventListener('click', (event) => {
        iter++;
        iter = iter % colors.length
        body.style.backgroundColor = colors[iter]
    })
})