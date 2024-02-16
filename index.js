const express = require('express')
const app = express()
const db = require('./config/db')
const Post = require('./models/Post')

app.use(express.json())

const PORT = process.env.PORT || 3000;

db().then(()=>console.log("Database connected Successfully")).catch(err=>console.log(err))

app.get('/api',(req,res)=>{
    res.status(200).json({"message":"api is working fine!"})
})

// get all posts
app.get('/api/posts',async (req,res)=>{
    Post.find({}).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        res.status(500).json({"message":err})
    });
})

// get post by id

app.get('/api/posts/:id',async (req,res)=>{
    let postId = req.params.id;
    Post.find({_id:postId}).then((data)=>{
        res.status(200).json({data})
    }).catch((err)=>{
        res.status(500).json({"message":err})
    });
})

// create new post

app.post('/api/posts',(req,res)=>{
    let newPost = new Post({
        title: req.body.title,
        description: req.body.description
    })

    newPost.save().then((data)=>{
        console.log(data)
        res.status(200).json({message:"post created successfully",data:data})
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({message:err})
    })

})

// update post

app.put('/api/posts/:id',async (req,res)=>{
    let postId = req.params.id;
    let newInfo = {
        title: req.body.title,
        description: req.body.description
    }
    Post.findByIdAndUpdate(postId,newInfo).then((data)=>{
        res.status(200).json({message:"post updated successfully",data:data})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})

// delete post

app.delete('/api/posts/:id',async (req,res)=>{
    let postId = req.params.id;
   
    Post.findByIdAndDelete(postId).then((data)=>{
        res.status(200).json({message:"post deleted successfully",data:data})
    }).catch((err)=>{
        res.status(500).json({message:err})
    })
})



app.listen(PORT,(err)=>{
    if(!err){
        console.log("server started on port "+PORT)
    }
    
})