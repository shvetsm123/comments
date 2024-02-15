import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from './dto/pagination.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  createComment(@Body() dto: CreateCommentDto, @UploadedFile() file?) {
    return this.commentService.create(dto, file);
  }

  @Get()
  getAllComments(@Query() paginationDto: PaginationDto) {
    if (paginationDto) {
      return this.commentService.getAllComments(paginationDto);
    }
    return this.commentService.getAllCommentsWithoutPagination();
  }
}
