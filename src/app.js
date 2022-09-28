const geocode=require('./geocode.js')
const forecast=require('./forecast.js')
const hbs=require('hbs')
const path=require('path')
const express=require('express')
const { error } = require('console')
// console.log(__dirname)
const app=express()
const port=process.env.PORT || 3000

const publicDirPath=path.join(__dirname,'../public')

const viewPath=path.join(__dirname,'../views')
const partialPath=path.join(__dirname,'../views')
const partialFooter=path.join(__dirname,'../views')
const partialRender=path.join(__dirname,'../views')

//  aboutDirPath=path.join(__dirname,'../public/html/about.html')
//  helpDirPath=path.join(__dirname,'../public/html/help.html')


//handelbars setup
app.set('view engine', 'hbs')
app.set('views',viewPath)
// app.set('partials',partialPath)
hbs.registerPartials(partialPath)
hbs.registerPartials(partialFooter)
hbs.registerPartials(partialRender)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{
  res.render('index',{
    title:'weather',
    name:'Mahmoud'
  })
})

app.get('/about',(req,res)=>{
  res.render('about',{
    title:'About me',
    name:'Mahmoud Abd El Naby'
  })
})

app.get('/help',(req,res)=>{
  res.render('help',{
    contact_us:' phone number : 01212696519',
    title:'Help',
    name:'Mahmoud 3bnby'
  })
})
// app.use(express.static(aboutDirPath))
// app.use(express.static(helpDirPath))
// app.get('',(req,res)=>{
//   res.send('<h1>weather</h1>')
// })//('route like /help',)
// app.get('/help',(req,res)=>{
//   res.send({
//     Name:'mahmoud',
//     age:21
//   })
// })
// app.get('/about',(req,res)=>{
//   res.send('<h2>about title</h2>')
// })
app.get('/weather',(req,res)=>{
  if(!req.query.address){
    return res.send({
      error:'you must enter an address you want to search'
    })
  }
  // console.log(req.query.address)
  
    geocode(req.query.address,(error,{lat,long,location}={})=>{
      if (error){
        return res.send({ error })
      }
      forecast(lat,long,(error,forecastData)=>{
        if(error){
          return res.send({error})
        }
        res.send({
          forecast:forecastData,
          location:location,
          address:req.query.address 
        })
      })
    })

})

app.get('/products',(req,res)=>{
  if(!req.query.search){
    return   res.send({
      error:'You must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

//app.com
//app.com/help
//app.com/about

app.get('/help/*',(req,res)=>{
  res.render('render',{
    title:'404',
    name:'Mahmoud 3bnby',
    errormessage:'help article not found'

  })
})
app.get('*',(req,res)=>{
  res.render('render',{
    title:'404',
    name:'Mahmoud 3bnby',
    errormessage:'page not found'
  })
})
app.listen(port,()=>{
  console.log('Server is up on port '+ port)
})