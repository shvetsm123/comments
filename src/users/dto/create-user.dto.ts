import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'required' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'required' })
  @IsString()
  @Length(6)
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'required' })
  @IsString()
  @Length(3)
  readonly userName: string;
}
