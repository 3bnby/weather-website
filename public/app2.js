console.log('Client side javascript file is loaded')

const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
weatherForm.addEventListener('submit',(event)=>{
  // stop refresh the page 
  event.preventDefault()
  const location=search.value
  messageOne.textContent='Loading....'
  messageTwo.textContent=''

  fetch('/weather?address=' + location).then((response)=>{
  response.json().then((data)=>{
    if(data.error){
      messageOne.textContent=data.error
    }else{
      messageOne.textContent= data.location
      messageTwo.textContent= 'forecast is : ' + data.forecast.forecast + ' and degree is : ' +
      data.forecast.deg + ' and chance of rain is : ' +data.forecast.chance_of_rain + '% ' + "  it`s feels like : " +data.forecast.wind +"℃"
    }
    })

})


})
