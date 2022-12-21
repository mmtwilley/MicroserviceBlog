import express from 'express';
import cors from 'cors';
import axios from 'axios';

const port = 4003;
const app = express();
app.use(express.json());
app.use(cors());

type CommentModerated = {
    id:string,
    content:string,
    postId:string,
    status: 'approved' | 'rejected'
}

app.post('/events', async (req,res)=>{
    const {type, data} = req.body; 

    if(type === 'CommentCreated'){
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post("http://localhost:4005/events",{
            type:'CommentModerated',
            data:{
                id:data.id,
                postId: data.postId,
                status,
                content:data.content
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }
    res.send({});
});


app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
});