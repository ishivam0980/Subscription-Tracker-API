import {Router} from 'express'

const userRouter=Router();

userRouter.get('/',(req,res)=>{
    res.send("Get All Users");
})

userRouter.get('/:id',(req,res)=>{
    res.send("Get User By ID");
})

userRouter.post('/:id',(req,res)=>{
    res.send("Create New User");
})

userRouter.put('/:id',(req,res)=>{
    res.send("Update User By ID");
})

userRouter.delete('/:id',(req,res)=>{
    res.send("Delete User By ID");
})


export default userRouter;