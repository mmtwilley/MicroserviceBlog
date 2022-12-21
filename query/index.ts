import express from 'express';
import cors from 'cors';
import axios from 'axios';
import {Comment, Post} from '../types/types'

const port = 4002;
const app = express();
app.use(express.json());
app.use(cors());

const posts:Post = {};

const handleEvent = (type:any, data:any) => {
    if(type === 'PostCreated'){
        const {id, title} = data;

        posts[id]

        posts[id] = {id, title, comments:[]};
        // Trying to access the index of the post
    }
    if(type === 'CommentCreated'){
        const {id, content, postId,status}:Comment = data; 

        const post = posts[postId as string]; 
        post.comments.push({id,content,status})
    }
    if(type === 'CommentUpdated'){
        const {id,content,postId,status}:Comment = data;

        const post = posts[postId as string];
        const comment = post.comments.find(comment =>{
            return comment.id === id;
        });
        comment!.status = status;
        comment!.content = content;
    }
}

app.get('/posts',(req,res)=>{
   res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type, data} = req.body;

    handleEvent(type,data);
    

    console.log(posts);
    res.send({});
});

app.listen(port, async () => {
    console.log(`Listening on port ${port}.`)

    try {
        const res = await axios.get("http://localhost:4005/events");
     
        for (let event of res.data) {
          console.log("Processing event:", event.type);
     
          handleEvent(event.type, event.data);
        }
      } catch (error:any) {
        console.log(error.message);
      }

});
