const request=require('request')

const forecast =(lat,long,callback)=>{
  const url='http://api.weatherstack.com/current?access_key=9201a2b416da4f9d8330dca906b06a64&query='+lat+' '+long+'&units=m'   
  request({url,json:true},(error,{body})=>{
       if(error){
            callback('Unable to connect to weather service ',undefined)
       }else if(body.error){
            callback('Unable to find this location',undefined)
       }else{
            callback(undefined,{
                  deg:body.current.temperature,
                  forecast:body.current.weather_descriptions[0],
                  chance_of_rain:body.current.precip,
                wind:body.current.wind_speed
            })
       }
  })
}

module.exports=forecast