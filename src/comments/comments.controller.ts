import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from './dto/pagination.dto';

@Controller('comments')
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createComment(@Body() dto: CreateCommentDto, @UploadedFile() file?) {
    return this.commentService.create(dto, file);
  }

  @Get()
  getAllComments(@Query() paginationDto?: PaginationDto) {
    if (paginationDto && paginationDto.limit > 25) {
      throw new HttpException('Limit must be <= 25', HttpStatus.BAD_REQUEST);
    }
    return this.commentService.getAllComments(paginationDto);
  }
}
