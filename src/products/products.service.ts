import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Product } from './schemas/products.schema';
import { InputCreateProductDto, InputUpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  private async idInUse(productId): Promise<boolean> {
    const document = await this.productModel.findOne({ id: productId });
    return document ? true : false;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find({});
    if (products.length > 0) return products;
    else throw new NotFoundException('Products collection is empty.');
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ id: productId });
    if (product) return product;
    else throw new NotFoundException('Product not found.');
  }

  async createProduct(payload: InputCreateProductDto): Promise<void> {
    if (!(await this.idInUse(payload.id))) await this.productModel.create(payload);
    else throw new BadRequestException('Id already in use.');
  }

  async updateProduct(payload: InputUpdateProductDto): Promise<void> {
    const productDocument = await this.productModel.findOne({ id: payload.id });
    if (productDocument) {
      const fields = Object.keys(productDocument.schema.obj);
      fields.map((field) => {
        if (field in payload && field != 'id') productDocument[field] = payload[field];
      });
      await this.productModel.updateOne({ id: payload.id }, productDocument);
    } else throw new NotFoundException('Product not found in database.');
  }

  async deleteProduct(productId: string): Promise<void> {
    const { deletedCount } = await this.productModel.deleteOne({ id: productId });
    if (deletedCount == 0) throw new BadRequestException('Product not found in database.');
  }
}
