import { useState, useEffect } from "react";
import axios from "axios";
import CommentCreate from './CommentCreate';
import CommentList from "./CommentList";
import { Post } from "./types/types";



const PostList:React.FC = ()=>{
    const [posts, setPosts] = useState({});

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    };

    useEffect(()=>{
        fetchPosts();
    },[]);

    const renderedPosts = Object.values<Post>(posts).map(post=> {
        return <div className="card" style={{width:'30%', marginBottom:'20ox'}}
        key={post.id}>
        <div className="card-body">
            <h3>{post.title}</h3>
            <CommentList commentList={post.comments}/>
            <CommentCreate postId={post.id}/>
        </div>
        </div>
    });

    return(<div className="d-flex flex-row flex-wrap justify-content-between">
        {renderedPosts}
    </div>)
}

export default PostList;