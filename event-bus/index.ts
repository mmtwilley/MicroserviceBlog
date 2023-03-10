import express from 'express';
import axios from 'axios';

const port = 4005;
const app = express();
app.use(express.json());


const events: any[] = []

app.post('/events',(req,res)=>{
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://comments-srv:4001/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://query-srv:4002/events', event).catch((err) => {
        console.log(err.message);
    });
    axios.post('http://moderation-srv:4003/events', event).catch((err) => {
        console.log(err.message);
    });
    
    res.send({ status: 'OK' });
});


app.get('/events',(req,res)=>{
    res.send(events);
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});