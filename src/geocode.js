// setTimeout(() => {
//   console.log("two seconds")
// }, 2000);

// const geocode=(address,callback)=>{
//   setTimeout(() => {
//     const data={
//       latitude:0,
//       longtude:0
//     }
//     callback(data)
//   }, 2000);
// }
// geocode('philadelphia',(data)=>{
// console.log(data)
// })

// const add=(num1,num2,callback)=>{
//   setTimeout(() => {
//     const sum=num1+num2
//     callback(sum)

//   }, 2000);
// }

// add(1,4,(sm)=>{
//   console.log(sm)
// })


//geocode
const request=require('request')
const geocode=(address,callback)=>{
     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address +' .json?access_token=pk.eyJ1IjoibWFobW91ZDNibmJ5IiwiYSI6ImNsN3N3aWM3MzB0YzUzd3BsZHo4ZHR5OGwifQ.y74kYVxulJVv6MXcRlpyJw&limit=1'
     request({url,json:true},(error,{body})=>{ //response is an object so use es6 we replace it by {body}
      if(error){
           callback('Unable to connect to weather service ',undefined)
      }else if(body.features.length===0){
           callback('Unable to find this location',undefined)
      }else{
           callback(undefined,{
                lat:body.features[0].center[0],
                long:body.features[0].center[1],
                location:body.features[0].place_name
           })
      }
 })
}


//forecast
// const forecast =(lat,long,callback)=>{
//   const url='http://api.weatherstack.com/current?access_key=9201a2b416da4f9d8330dca906b06a64&query='+lat+' '+long+'&units=m'   
//   request({url,json:true},(error,{body})=>{
//        if(error){
//             callback('Unable to connect to weather service ',undefined)
//        }else if(body.error){
//             callback('Unable to find this location',undefined)
//        }else{
//             callback(undefined,{
//                   deg:body.current.temperature,
//                   forcast:body.current.weather_descriptions[0],
//                   chance_of_rain:body.current.precip,
                
//             })
//        }
//   })
// }


//exports
module.exports=geocode