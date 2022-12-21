import express from 'express';
import { randomBytes } from 'crypto';

const app = express();
app.use(express.json());



app.get('/posts/:id/comments',(req,res) =>{
    res.send(commentsByPostId[req.params.id] || []);
});


app.post('/posts/:id/comments',(req,res) =>{
    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body; 
    
    const comment = commentsByPostId[req.params.id] || [];

    comments.push({id:commentId,content});
    commentsByPostId[req.params.id] = comments;
    
    res.sendStatus(201).send(comments)
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})