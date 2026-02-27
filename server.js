const app = require('./src/app')

app.listen(process.env.PORT, ()=>{
    console.log("Server running at port 3000")
})