const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
var img = document.createElement("img")

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    img.src= ""
    //img.style.visibility = (visible? 'visible' : 'hidden')

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = data.location
            img.src = data.icon[0]
            img.id = "image-icon"
            var src = document.getElementById("x")
            src.appendChild(img)

            //document.getElementById("icon-image").src = '"' + data.icon[0] + '"'
            console.log(data.icon[0])
            messageTwo.textContent = data.forecast + "\nFeels Like: " + data.feelslike 
        }
    })
})
})