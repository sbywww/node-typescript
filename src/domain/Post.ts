interface Post {
  id: number | string;
  title: string;
  content: string;
  author: string;
  regDate: Date;
  modDate?: Date;
}

export default Post;
