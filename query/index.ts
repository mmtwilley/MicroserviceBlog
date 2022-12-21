import express from 'express';
import cors from 'cors';

const port = 4002;
const app = express();
app.use(express.json());
app.use(cors);


type Comment = {
        id:string;
        content:string;
        postId?:string;
};

type Post = {
    [key:string]:{  
        id: string;
        title:string;
        comments:Comment[];
    }
};

const posts:Post = {};



app.get('/post',(req,res)=>{

});

app.post('/events',(req,res)=>{
    const {type, data} = req.body;

    if(type === 'POSTCREATED'){
        const {id, title} = data;

        posts[id]

        posts[id] = {id, title, comments:[]};
        // Trying to access the index of the post
    }
    if(type === 'COMMENTCREATED'){
        const {id, content, postId}:Comment = data; 

        const post = posts[postId as string]; 
        post.comments.push({id,content})
            
        
    }

});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`)
});
