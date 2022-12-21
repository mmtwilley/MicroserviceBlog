import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';
import {Comment} from '../types/types'

const port = 4001;
const app = express();
app.use(express.json());
app.use(cors());


// type PostComment = {id:string,content:string,status:string}



const commentsByPostId:{
    [id:string]:Array<Comment>
} = {};


app.get('/posts/:id/comments',(req,res) =>{
    res.send(commentsByPostId[req.params.id] || []);
});

 
app.post ('/posts/:id/comments', async (req,res) =>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body; 
    
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId,content,status:"string"});
    commentsByPostId[req.params.id] = comments;

    await axios.post('http://localhost:4005/events',{
        type: 'CommentCreated',
        data:{
            id:commentId,
            content,
            postId: req.params.id,
            status:'pending'
        }
    })
    
    res.status(201).send(comments)
});

app.post('/events', async(req,res) => {
    console.log('Event Received:', req.body.type);

    const {type, data} = req.body;

    if(type === 'CommentModerated'){
        const{postId, id, status,content}:Comment = data;
        const comments = commentsByPostId[postId as string];
        const comment = comments.find(comment => {
            return comment.id === id;
        });
        //https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional
        comment!.status = status;

        await axios.post('http://localhost:4005/events', {
            type: 'CommentUpdated',
            data:{
                id,
                status,
                postId,
                content
            }
        });

    }

    res.send({});
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})