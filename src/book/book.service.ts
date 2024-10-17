import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { UpdateBookDTO } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.find();
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book);
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async update(id: string, book: UpdateBookDTO): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
}
