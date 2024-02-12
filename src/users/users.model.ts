import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Comment } from 'src/comments/comments.model';

interface UserCreationAttrs {
  userName: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { is: /^[a-zA-Z0-9]+$/ },
    field: 'user_name',
  })
  userName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    validate: { isUrl: true },
  })
  homepage: string;

  @HasMany(() => Comment)
  comments: Comment[];
}
