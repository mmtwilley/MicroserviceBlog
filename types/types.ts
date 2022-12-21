export type Comment = {
    id:string;
    content:string;
    status: string;
    postId?:string;
};

export type Post = {
    [key:string]:{  
        id: string;
        title:string;
        comments:Comment[];
    }
};

