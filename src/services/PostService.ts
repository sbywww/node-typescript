import PostRepository from "../database/sql/PostRepository";
import PostDto from "../dtos/PostDto";

class PostService {
  private postRepository: PostRepository;
  constructor() {
    this.postRepository = new PostRepository();
  }

  public async getPostList() {
    return await this.postRepository.getPostList();
  }

  public async getPost(id: number | string) {
    return await this.postRepository.getPost(id);
  }

  public async addPost(postDto: PostDto) {
    await this.postRepository.addPost(postDto);
  }

  public async modPost(id: number | string, postDto: PostDto) {
    await this.postRepository.modPost(id, postDto);
  }

  public async delPost(id: number | string) {
    await this.postRepository.delPost(id);
  }
}

export default PostService;
