import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';

interface UserCreationAttrs {
  userName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: 'John', description: 'required' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { is: /^[a-zA-Z0-9]+$/ },
    field: 'user_name',
  })
  userName: string;

  @ApiProperty({ example: 'johndoe@gmail.com', description: 'required' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ example: 'qwerty123', description: 'required' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({ example: 'google.com', description: 'optional' })
  @Column({
    type: DataType.STRING,
    validate: { isUrl: true },
  })
  homepage: string;

  @ApiProperty({
    example: ['hello, world!', 'hi, world!'],
    description: 'optional',
  })
  @HasMany(() => Comment)
  comments: Comment[];
}
