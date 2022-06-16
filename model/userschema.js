const mongoose=require('mongoose');
const { userInfo } = require('../controllers/authControllers');
const UserInfo= new mongoose.Schema(
    {

        name:{type:String,
           
        
        },
        mobile:{ type: String, maxlength:10 ,minlength:10  }
        
        
        ,
        gmail:{type:String},
        date:{type:String},
      
    
        
    
        endtime:{ type:String},
        

    }
   
    

);
module.exports=mongoose.model('UserInfo',UserInfo)

