const express= require('express');
const router= express.Router();
const UserModel=require('../models/user');

router.get('/getUser',async(request, response)=>{
    try{
        const user=await UserModel.find();
        response
        .status(200)
        .send(user)
        
 } catch(e){
       response
       .status(500)
       .send({
        statuscode:500,
        message:'internal server error'
       })
    }
})



module.exports=router;