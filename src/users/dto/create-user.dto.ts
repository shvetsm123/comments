import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com', description: 'required' })
  readonly email: string;

  @ApiProperty({ example: 'qwerty123', description: 'required' })
  readonly password: string;

  @ApiProperty({ example: 'John', description: 'required' })
  readonly userName: string;
}
