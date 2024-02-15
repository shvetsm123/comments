import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { User } from 'src/users/users.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsGateway } from './comments.gateway';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsGateway],
  imports: [
    SequelizeModule.forFeature([Comment, User]),
    FilesModule,
    AuthModule,
  ],
  exports: [CommentsGateway],
})
export class CommentsModule {}
