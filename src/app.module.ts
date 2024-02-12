import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';
import { Comment } from './comments/comments.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Comment],
      autoLoadModels: true,
      synchronize: true,
    }),
    CommentsModule,
    UsersModule,
  ],
})
export class AppModule {}
