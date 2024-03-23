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


router.get('/getUser/:id',async(request, response)=>{
    const{id}=request.params;

 
    try {
        const user=await UserModel.findById(id);

        if(!user){    
         return response
         .status(404)
         .send({
             statuscode:404,
             message:'the request user does not exist!'
         })  
        }

       response
       .status(200)
       .send(user) 
    } catch (e) {
        response
        .status(500)
        .send({
            statuscode:500,
            message:'internal server error'
        })
    }
})

router.get('/getUser/byName/:query',async(request, response)=>{
    const{query}=request.params;
    try {
        const user=await UserModel.find({
            firstName:{
                $regex:'.*'+ query +'.*',
                $options:'i'
            }
        })
        if(!user){
            return response
            .status(404)
            .send({
                statuscode:404,
                message:'User not found with the given query!'
            })
        }
        response .status(200) .send(user);
    } catch (e) {
        response
        .status(500)
        .send({
            statuscode:500,
            message:'internal server error'
        })
    }
})


router.post('/createUser',async(request, response)=>{
    const newUser= new UserModel({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password:request.body.password,
        age:Number(request.body.age)

    });
    try{
       const userToSave = await newUser.save();
       response
       .status(201)
       .send({
        statuscode:201,
        payload:userToSave
       }) 
    }catch(e){
        response
        .status(500)
        .send({
            statuscode:500,
            message:'internal server error'
        })
    }
})

router.patch('/updateUser',async(request, response)=>{
    const {id} = request.params;
    
    try {
      const user = await UserModel.findById(id);
      if(!user){
        return response
     .status(404)
     .send({
        statuscode:404,
        message:'the request user does not exist!'
     })
    }
    const updatedData= request.body;
    const option = {new:true};
    const result=await UserModel.findByIdAndUpdate(id, updatedData,option);
    response
    .status(200)
    .send(result)  
    } catch (e) {
        response 
        .status(500)
        .send({
            statuscode:500,
            message:'internal server error'
        })
    }
})


router.delete('/deleteUser/:id',async(request, response)=>{
    const {id} = request.params;
    try {
      const user = await UserModel.findByIdAndDelete(id);
      if(!user){
        return response
   .status(404)
   .send({
        statuscode:404,
        message:'the request user does not exist!'
     })
    }
    response
    .status(200)
    .send('User with id ${id} successfully deleted')
}catch (e) {
    response 
    .status(500)
    .send({
        statuscode:500,
        message:'internal server error'
      })
    }
})
   
module.exports=router;