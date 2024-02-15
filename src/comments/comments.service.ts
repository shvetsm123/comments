import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comments.model';
import { FilesService } from 'src/files/files.service';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private fileService: FilesService,
  ) {}

  async create(dto: CreateCommentDto, file?: string) {
    if (file) {
      const fileName = await this.fileService.createFile(file);
      dto.file = fileName;
    }
    const comment = await this.commentRepository.create(dto);
    return comment;
  }

  async getAllComments(paginationDto: PaginationDto): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll(paginationDto);
    return comments;
  }

  async getAllCommentsWithoutPagination(): Promise<Comment[]> {
    const comments = await this.commentRepository.findAll();
    return comments;
  }
}
