import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
  getAllComments(@Query() paginationDto?: PaginationDto) {
    if (paginationDto && paginationDto.limit > 25) {
      throw new HttpException('Limit must be <= 25', HttpStatus.BAD_REQUEST);
    }
    return this.commentService.getAllComments(paginationDto);
  }
}
