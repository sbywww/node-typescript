import Post from "../../domain/Post";
import PostDto from "../../dtos/PostDto";
import Repository from "../Repository";

class PostRepository extends Repository {
  public async getPostList(): Promise<Post[]> {
    this.title("-- 글목록조회 --");
    const sql = `
    SELECT
     *
    FROM Post
    WHERE 1 = 1
    ORDER BY reg_date DESC;
    `;
    const rows = await this.query(sql);

    const postList: Post[] = [];
    for (const row of rows) {
      const post: Post = {
        id: row.id,
        title: row.title,
        content: row.content,
        author: row.author,
        regDate: row.reg_date,
        modDate: row.mod_date,
      };

      postList.push(post);
    }

    return postList;
  }

  public async getPost(id: number | string): Promise<Post> | null {
    this.title("-- 글 조회 --");
    const sql = `
    SELECT
     *
    FROM Post
    WHERE id = ?
    `;

    const row = await this.queryForObject(sql, [id]);
    if (!row) return null;

    const post: Post = {
      id: row.id,
      title: row.title,
      content: row.content,
      author: row.author,
      regDate: row.reg_date,
      modDate: row.mod_date,
    };

    return post;
  }

  public async addPost(postDto: PostDto) {
    this.title("-- 글 작성 --");
    const sql = `
    INSERT INTO Post (title, content, author, reg_date, mod_date)
    VALUES (?, ?, ?, now(), now());
    `;
    await this.query(sql, [postDto.title, postDto.content, postDto.author]);
  }

  public async modPost(id: number | string, postDto: PostDto) {
    this.title("-- 글 수정 --");
    const sql = `
    UPDATE Post SET title = ?, content = ?, author = ? WHERE id = ?;
    `;
    await this.query(sql, [postDto.title, postDto.content, postDto.author, id]);
  }

  public async delPost(id: number | string) {
    this.title("-- 글 삭제 --");
    const sql = `
    DELETE FROM Post WHERE id = ?;
    `;
    await this.query(sql, [id]);
  }
}

export default PostRepository;
