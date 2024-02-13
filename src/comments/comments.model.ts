import {
  BeforeValidate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface CommentCreationAttrs {
  text: string;
  captcha: string;
  userId: number;
  file: string;
}

@Table({ tableName: 'comments' })
export class Comment extends Model<Comment, CommentCreationAttrs> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { is: /^[a-zA-Z0-9]+$/ },
  })
  text: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  captcha: string;

  @Column({
    type: DataType.STRING,
  })
  file: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: 'user_id',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    field: 'parent_comment_id',
    defaultValue: null,
  })
  parentCommentId: number;

  @BelongsTo(() => Comment, 'parent_comment_id')
  parent_comment: Comment;

  @HasMany(() => Comment, 'parent_comment_id')
  comments: Comment[];

  @BeforeValidate
  static sanitizeText(comment: Comment) {
    // Регулярное выражение для поиска всех HTML тегов
    const htmlTagRegex = /<[^>]*>/g;
    // Удаляем все HTML теги кроме  [i], [strong], [code], [a]
    comment.text = comment.text.replace(htmlTagRegex, (tag) => {
      return tag.match(/<(\/)?(i|strong|code|a)\b[^>]*>/) ? tag : '';
    });
  }
}
