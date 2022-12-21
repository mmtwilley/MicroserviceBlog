import { Comment } from "./types/types";



interface CommentListProps{
    commentList:Comment; 
}

// Fix the type of code for comments


const CommentList:React.FC<CommentListProps> = ({commentList}) => {

    const renderedComments = commentList.map(comment => {
        let content;

        switch(comment.status){
            case 'approved':
                content = comment.content;
                break;
            case 'pending':
                content = 'This content is awaiting moderation.';
                break;
            case 'rejected':
                content =  content = 'This content was rejected.';
                break;
            default:
                break;
        }
    
        return<li key={comment.id}>{content}</li>
    })

    return(
        <ul>
            {renderedComments}
        </ul>
    )
}

export default CommentList;