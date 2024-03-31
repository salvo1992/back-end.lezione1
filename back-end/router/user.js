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

router.patch('/updateUser/:id', async (request, response) => {
    const { id } = request.params;
    try {
        // Verifica se l'utente esiste
        const user = await UserModel.findById(id);
        if (!user) {
            return response.status(404).send(JSON.stringify({
                statusCode: 404,
                message: 'L\'utente richiesto non esiste!'
            }));
        }

        // Aggiorna l'utente
        const updateData = request.body;
        const option = { new: true };
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, option);

        if (!updatedUser) {
            return response.status(404).send(JSON.stringify({
                statusCode: 404,
                message: 'Impossibile trovare l\'utente da aggiornare.'
            }));
        }

        // Rispondi con l'utente aggiornato
        response.status(200).send(JSON.stringify(updatedUser));

    } catch (error) {
        // Gestione degli errori interni
        console.error('Errore durante l\'aggiornamento dell\'utente:', error);
        response.status(500).send(JSON.stringify({
            statusCode: 500,
            message: 'Si è verificato un errore interno del server.'
        }));
    }
});


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
   
//pagination routes

router.get('/getUsers', async (request, response) => {
    const { page=1, pageSize=5} = request.query;
    try {
        const users = await UserModel.find()
        .limit(pageSize)
        .skip((page - 1) * pageSize)
        .sort({age:-1})
const totalUser =await UserModel.countDocuments();

        response.status(200).send({
            currentPage:+page,
            totalPages:Math.ceil(totalUser/pageSize),
            users,
        });
    } catch (e) {
        response.status(500).send({
            statuscode:500,
            message:'internal server error'
        })
    }
});


module.exports=router;