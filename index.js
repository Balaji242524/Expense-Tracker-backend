const express = require('express')
const mongoose = require('mongoose')
const{Expense} = require('./schema.js')
const bodyParser=require('body-parser')


const app = express()
app.use(bodyParser.json())
function connecttodb(){
      try{  
        mongoose.connect('mongodb+srv://balaji240424:1234@cluster0.flrrscv.mongodb.net/Expensetracker?retryWrites=true&w=majority&appName=Cluster0')
        console.log("Database Connected Successfully");
        const port = 3000
        app.listen(port,function(){
        console.log(`Listening to ${port}...`);
    })
}catch(err){
    console.log("doesn't connect",err);
}
}
connecttodb()
app.use(bodyParser.json()) 

app.get('/get-expense', async function
(req, res){
    const expensesdata = await Expense.find()
    res.status(200).json(expensesdata)
})

//create
app.post('/expense-create', async function(request, response) {
        try {
            await Expense.create({
                "category" : request.body.category,
                "amount" : request.body.amount
                    
            })
            response.status(201).json({
                "status" : "success",
                "message" : "entry created"
            })
        } catch(error) {
            response.status(500).json({
                "status" : "failure",
                "message" : "entry not created"
            })
        }
    })
   //delete
    app.delete('/expense-delete/:_id',async function(request,response){
        try{
           const id = request.params._id;
              const deleted = await ExpenseTrackerModel.findByIdAndDelete(id);
              console.log(deleted);
              response.status(200).json({
                 status:"success",
                 "message":"Deleted Successfully"
              })
           
        }
        catch(err){
           response.status(500).json({
           "status" : "failure",
           "message" : "Delete Not Successfull",
           "error" : err  
        })
       }
     })
//update
app.patch('/expense-update/:id',async function(request,response){
    try{
       const expenseEntry = await ExpenseTrackerModel.findById(request.params.id)
       if(expenseEntry){
          await expenseEntry.updateOne({
             "amount" : request.body.amount,
          "category" : request.body.category,
          "date" : request.body.date
          })
          response.status(200).send({
                         "status" : "success",
                         "message" : "Update successfully"
                      })
                 }
                }
                 catch(error){
                   response.status(500).json({
                      "status" : "failure",
                      "message" : "Update Not Successfull",
                      "error" : error   
                   })
                }
       })

