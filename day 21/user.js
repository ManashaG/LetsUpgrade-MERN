// packages 
const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const app=express();

// middlewares 
app.use(bodyParser.json());
app.use(cors());


// dummy response variable for testing
let dummyRes={"test":"success!!!"};

// mongo db setup

// Schema for users

let userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    city:String
})

// model for users

let usersModel=new mongoose.model('users',userSchema);

// connection to mongo db
mongoose.connect('mongodb://127.0.0.1:27017/auth_users',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("connected");
})




// routes 

app.get('/',(req,res)=>{

    
    res.send(dummyRes);
})

// route to create users 
app.post('/user/register',(req,res)=>{

    let user=req.body;
    
    let userData=new usersModel(user);
    userData.save()
    .then(()=>{
        res.send({"message":"User Created"});
    })

    
})


// route for login 


app.post('/user/login',async (req,res)=>{
    let userdetails=req.body;
    let count = await usersModel.find(userdetails).countDocuments();
    
    if(count==1){

        jwt.sign({user:userdetails},"secretkey",(err,token)=>{

            if(err==null){
                res.send({"token":token});
            }
            else{
                res.send({"message":"Some problem!!"});
            }
            

        })


        
    }
    else{
        res.send({"message":"wrong username or password!!"});
    }


    
})


// these are routes that will be called based on a token


app.get('/users/fetch',verifyToken,(req,res)=>{

jwt.verify(req.token,"secretkey",(err,userdetails)=>{
    if(err==null){

        console.log(userdetails);
        res.send({"message":"Token authenticated"});
        //code

    }
    else{
        res.status(403);
        res.send({"message":"Wrong token"});
    }
})

    

})




function verifyToken(req,res,next){

    let headerData=req.headers['authorization'];
    console.log(req.headers);    

    if(headerData!=undefined){

            let token=headerData.split(" ")[1];
            req.token=token;
            next();
    }
    else{
        res.status(403);
        res.send({"message":"no token available"});
    }




}




app.listen(3000);
