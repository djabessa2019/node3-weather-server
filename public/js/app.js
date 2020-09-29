console.log('client side javascript is loaded!') 

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textcontent = 'Loading....'
    messageTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location + "'").then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }

            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          
            console.log(data.location)
            console.log(data.forecast)
        })
    })


   
    //console.log(location)
})
