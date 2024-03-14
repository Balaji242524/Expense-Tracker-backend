const mongoose = require('mongoose')

const expenseTrackerschema = new mongoose.Schema //Schema 
(
    {
        amount : {
            type : Number
        },
        category : {
            type : String
        },
        date:{
            type: String
        }
    }
)

const Expense = mongoose.model('expensedetails',expenseTrackerschema) //first letter caps for model

module.exports = {Expense}  //exporting the model