import express from 'express';
import cors from 'cors';
import { randomBytes } from 'crypto';
import axios from 'axios';

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());


const posts: {[id:string]:{id:string,title:string}} = {};

app.get('/posts',(req,res) =>{
    res.send(posts);
});


app.post('/posts',async (req,res) =>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body; 

    posts[id] = {
        id, title
    }

    await axios.post('http:event-bus-srv:4005/events',{
        type: 'PostCreated',
        data:{
            id, 
            title
        }
    });

    res.status(201).send(posts[id]);
});

app.post('/events',(req,res) => {
    console.log('Received Event', req.body.type);

    res.send({});
});


app.listen(port, ()=>{
    console.log(`Listening on port ${port}.`);
    console.log("With V5")
})