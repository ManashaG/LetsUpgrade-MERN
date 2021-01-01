// middleware packages
const bodyParser=require('body-parser');
const cors=require('cors');

// express package
const mongoose = require('mongoose');
const express=require("express");

const app=express();

// middleware application 
app.use(bodyParser.json());
app.use(cors());


// creation of schema 

let movieSchema=new mongoose.Schema({
    "name": String,
    "universe": String,
    "year":Number,
    "rating": Number,
    "revenue": Number,
    "poster": String
})

// creation of model 

let movieModel=new mongoose.model("movies",movieSchema);


mongoose.connect("mongodb://127.0.0.1:27017/project_movies",{ useNewUrlParser: true,  useUnifiedTopology: true }).then(()=>{
    console.log("connected to database");
})



// Request handling 

app.get('/api/v1/movies',(req,res)=>{
    // fetch all the movies

    movieModel.find().then((movies)=>{
        res.send(movies);
    })

    
})


app.get('/api/v1/movies/:id',(req,res)=>{

    let id=req.params.id;
    // movieModel.find({"_id":id}).then((movie)=>{
    //     res.send(movie);
    // })

    movieModel.findById(id).then((movie)=>{
        res.send(movie);
    })
    
})



app.post('/api/v1/movies',(req,res)=>{
    // creation of movie
    let movie=req.body;
    
    let movieObj=new movieModel(movie);
    movieObj.save().then(()=>{
        res.send({"message":"Movie Created"});
    })

    


})

app.put('/api/v1/movies/:id',(req,res)=>{

        let id = req.params.id;
        let movie=req.body;

        // to replcae everything
        movieModel.updateOne({"_id":id},movie).then(()=>{
            res.send({"message":"Movie Updated"});
        });

        // to update a specific field
        // movieModel.updateOne({"_id":id},{$set:movie}).then(()=>{
        //     res.send({"message":"Movie Updated"});
        // });


})


app.delete('/api/v1/movies/:id',(req,res)=>{

    let id=req.params.id;
    movieModel.deleteOne({"_id":id}).then(()=>{
        res.send({"message":"Movie Deleted"});
    })

})



app.listen(3000,()=>{
    console.log("server is running");
});
