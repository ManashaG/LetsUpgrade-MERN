let superheroes=[{
    id:1,
    name:"Thor",
    age:50,
    planet:"Earth",
    weapon:"Mjolnir"
},
{
    id:2,
    name:"Iron Man",
    age:40,
    planet:"Vormir",
    weapon:"Suit"
},
{
    id:3,
    name:"Black Panther",
    age:45,
    planet:"Zen-Whoberi",
    weapon:"Claws"
},
{
    id:4,
    name:"Captain America",
    age:55,
    planet:"Nidavellir",
    weapon:"Shield"
},
{
    id:5,
    name:"Black Widow",
    age:35,
    planet:"Titan",
    weapon:"Bites"
},
]

const superheroesString=JSON.stringify(superheroes);



const http = require('http');
const url = require('url');

const server=http.createServer((req,res)=>{

    const path=url.parse(req.url,true);

    res.writeHead(200,{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers":"*",
        "Content-Type":"application/json"
    });

    if(path.pathname=="/" || path.pathname=="/superheroes"){
        res.end(superheroesString);
    }
    else if(path.pathname=="/superhero"){
        if(req.method=="OPTIONS"){
            res.end(superheroesString);
        }
        else if(req.method=="GET"){
            const id=path.query.id;
            const singleData=superheroes.find((ele)=>{
                return ele.id==id;
            })
            res.end(JSON.stringify(singleData));
        }
        else if(req.method=="POST"){
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let superhero=JSON.parse(body);
                superheroes.push(superhero);
                res.end(JSON.stringify({message:"Hey,Superhero is added!!"}));
            })
        }
        else if(req.method=="PUT"){
            const id=path.query.id;
            let body="";
            req.on('data',(data)=>{
                body+=data;
            })
            req.on('end',()=>{
                let superhero=JSON.parse(body);
                superheroes.forEach((ele)=>{
                    if(ele.id==id){
                        ele.name=superhero.name;
                        ele.age=superhero.age;
                        ele.planet=superhero.planet;
                        ele.weapon=superhero.weapon;
                    }
                
                })
                res.end(JSON.stringify({message:"Hey,Superhero is updated!!"}));
                console.log(superheroes);
            })
        }
        else if(req.method=="DELETE"){
            const id=path.query.id;
            superheroes.forEach((ele,index)=>{
                if(ele.id==id){
                    superheroes.splice(index,1);
                }
            })
            res.end(JSON.stringify({message:"product deleted"}));
            console.log(superheroes);
            
        }
    }
    else{
        res.writeHead(404,{
            "Content-Type":"application/json"
        })
        res.end(JSON.stringify({message:"Not Found anything for this URL"}));
    }
    
})
server.listen("3000","127.0.0.1",()=>{
    console.log("server is running");
})