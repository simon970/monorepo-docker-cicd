import express from "express";
import { prismaClient } from "db/client";
import type { User } from "../../packages/db/generated/prisma/client";

const app = express();

app.use(express.json());


app.get("/users", async(req,res)=>{
    try {
        const users:User[] = await prismaClient.user.findMany();
        res.json({"users":users});
        
    } catch (error:any) {
        res.status(500).json({error: error.message})
    }
    
});

app.post("/user", async(req,res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).json({
            "message":"Invalid username or password"
        })
        return;
    }

    prismaClient.user.create({data:{
        username:username,
        password:password
    }})
    .then(user=>{
        res.status(200).json(user)
    })
    .catch(err=>{res.status(500).json({err})})
    
});

app.listen(8000);

