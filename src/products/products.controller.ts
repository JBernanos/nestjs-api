import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/products.schema';
import { InputCreateProductDto, InputUpdateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/all')
  async getAllProducts(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('/id/:id')
  async getProductById(@Param('id') productId: string): Promise<Product> {
    return this.productsService.getProductById(productId);
  }

  @Post()
  async createProduct(@Body() payload: InputCreateProductDto): Promise<void> {
    return this.productsService.createProduct(payload);
  }

  @Put()
  async updateProduct(@Body() payload: InputUpdateProductDto): Promise<void> {
    return this.productsService.updateProduct(payload);
  }

  @Delete('/id/:id')
  async deleteProduct(@Param('id') productId: string): Promise<void> {
    return this.productsService.deleteProduct(productId);
  }
}
