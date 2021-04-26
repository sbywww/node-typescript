import { IsNotEmpty } from "class-validator";

class PostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  author: string;
}

export default PostDto;
