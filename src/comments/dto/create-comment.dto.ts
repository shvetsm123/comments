import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'comment text', description: 'required' })
  @IsString()
  @Length(3)
  readonly text: string;

  @ApiProperty({ example: '123', description: 'required' })
  @IsString()
  @Length(3)
  readonly captcha: string;

  file?: string;
}
