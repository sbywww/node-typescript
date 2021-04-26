import { Router, Request, Response } from "express";
import PostDto from "../dtos/PostDto";
import Controller from "../interfaces/Controller";
import validationMiddleware from "../middlewares/ValidationMiddleware";
import PostService from "../services/PostService";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();

  public postService: PostService;

  constructor() {
    this.initializeRoutes();
    this.postService = new PostService();
  }

  initializeRoutes() {
    this.router.get(`${this.path}`, this.getPostList);
    this.router.get(`${this.path}/:id`, this.getPost);
    this.router.post(`${this.path}/edit`, validationMiddleware(PostDto), this.addPost);
    this.router.patch(`${this.path}/:id/edit`, validationMiddleware(PostDto), this.modPost);
    this.router.delete(`${this.path}/:id`, this.delPost);
  }

  /**
   * 글목록조회
   */
  public getPostList = async (req: Request, res: Response) => {
    const postList = await this.postService.getPostList();
    return res.json({
      success: true,
      msg: "OK",
      data: postList,
    });
  };

  /**
   * 글조회
   */
  public getPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const post = await this.postService.getPost(id);

    if (!post) {
      return res.json({ success: false, msg: "존재하는 게시판이 없습니다.", code: 404 });
    }

    return res.json({
      success: true,
      msg: "OK",
      data: post,
    });
  };

  /**
   * 글작성
   */
  public addPost = async (req: Request, res: Response) => {
    const postDto: PostDto = req.body;
    await this.postService.addPost(postDto);

    return res.json({
      success: true,
      msg: "OK",
    });
  };

  /**
   * 글수정
   */
  public modPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    const postDto: PostDto = req.body;
    await this.postService.modPost(id, postDto);

    return res.json({
      success: true,
      msg: "OK",
    });
  };

  /**
   * 글삭제
   */
  public delPost = async (req: Request, res: Response) => {
    const id = req.params.id;
    await this.postService.delPost(id);

    return res.json({
      success: true,
      msg: "OK",
    });
  };
}

export default PostController;
