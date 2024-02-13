export class CreateCommentDto {
  readonly text: string;
  readonly captcha: string;
  readonly userId: number;
  file?: string;
}
