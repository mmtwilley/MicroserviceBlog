import { useState,useEffect } from "react";
import axios from "axios";

interface CommentListProps{
    postId:string; 
}
type commentType = Array<{id:string,content:string}>;

// Fix the type of code for comments


const CommentList:React.FC<CommentListProps> = ({postId}) => {
    const[comments,setComments] = useState<commentType>([]);

    const fetchData = async () => {
        const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);

        setComments(res.data);
    };

    useEffect(() =>{
        fetchData();
    },[])


    const renderedComments = comments.map(comments => {
        return<li key={comments.id}>{comments.content}</li>
    })

    return(
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList;