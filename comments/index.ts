import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const port = 4001;
const app = express();
app.use(express.json());
app.use(cors());


type PostComment = {id:string,content:string}



const commentsByPostId:{
    [id:string]:Array<PostComment>
} = {};


app.get('/posts/:id/comments',(req,res) =>{
    res.send(commentsByPostId[req.params.id] || []);
});

 
app.post ('/posts/:id/comments', async (req,res) =>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body; 
    
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId,content});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data:{
            id:commentId,
            content,
            postId: req.params.id
        }
    })
    
    res.status(201).send(comments)
});

app.post('/events',(req,res) => {
    console.log('Event Received:', req.body.type);

    res.send({});
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})