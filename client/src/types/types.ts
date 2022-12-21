export type Comment = Array<{id:string,content:string,status:string}>;
export type Post = {id:string,title:string,comments:Comment};