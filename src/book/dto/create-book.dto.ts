import { Category } from '../schemas/book.schema';

export class CreateBookDTO {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly price: number;
  readonly category: Category;
}
