//including mongoose
require('./db/connection')
//including collection Student
const Student = require('./models/student')
//including express
const express = require('express')
const port = process.env.PORT || 3000;
const app = express()
//router
//middleware
app.use(express.json())

//create a new student
app.post('/students', async (req,res)=>{
    //req.body mai json format mai hai
    const  user = new Student(req.body)
    try{
        const result = await user.save();
        res.status(202).send(result)
    }catch(e){
        res.status(404).send(e)
    }

})

// get student by id
app.get('/students/:id', async (req,res) =>{
    try{
        const _id = req.params.id
        const result = await Student.find({_id})
        res.status(202).send(result)
    }catch(e){
        res.status(404).send('Id not found')
    }
})

//get all students
app.get('/students', async (req,res) =>{
    try{
        const result = await Student.find()
        res.status(202).send(result)
    }catch(e){
        res.status(404).send(result)
    }
})

//patch student
app.patch('/students/:id', async (req,res) =>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndUpdate(_id,req.body,{
            new : true
        });
        res.send(updateStudent)
    }catch(e){
        res.status(404).send('cannot found')
    }
})

//delete
app.delete('/students/:id', async (req,res) =>{
    try{
        const _id = req.params.id;
        const updateStudent = await Student.findByIdAndDelete(_id,req.body);
        res.send(updateStudent)
    }catch(e){
        res.status(404).send('cannot found')
    }
})

app.listen(port, ()=>{
    console.log(`listening at ${port} port`)
})