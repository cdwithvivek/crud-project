import studentModel from "../models/student.js"

class StudentController {
    
    static createDoc =  async (req,res) => {
        try{
            const {name,age,fees} = req.body
            const doc = new studentModel( {name,age,fees } )
            //saving document
            await doc.save();
        }catch(e){
            console.log(e)
        }finally{
            res.redirect('/student')
        }
    }

    static updateDocById = async (req,res) => {
        try {
            const id = req.params.id
            const {name,age,fees} = req.body
            await studentModel.findByIdAndUpdate(id, {name,age,fees})
        }catch(e) {
            console.log(e)
        }finally{
            res.redirect('/student')
        }
        
    } 

    static deleteDocById = async (req,res) => {
        
        try {
            const id = req.params.id
            await studentModel.findByIdAndDelete(id)
        }catch(e) {
            console.log(e)
        }finally{
            res.redirect('/student')
        }
    }

    static editDoc = async (req,res) => {
        //id lana hai
        try{
            const id = req.params?.id
            const result = await studentModel.findById(id);
            const {name,age,fees,_id} = result
            res.render('edit', {name,age,fees,_id})
        }catch(e){
            console.log(e)
        }
    }    
    
    static getAllDoc = async (req,res) => {
        try {
            const result = await studentModel.find()
            res.render('index', {data : result})
        }catch(e){
            console.log(e)
        }

        
    }

}

export {StudentController};