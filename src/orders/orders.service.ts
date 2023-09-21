import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

import { Order } from './schemas/orders.schema';
import { InputCreateOrderDto } from './dto/orders.dto';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,

    @Inject(UsersService)
    private readonly userService: UsersService,

    @Inject(ProductsService)
    private readonly productService: ProductsService,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find({});
    if (orders.length > 0) return orders;
    else throw new NotFoundException('Orders collection is empty.');
  }

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ id: orderId });
    if (order) return order;
    else throw new NotFoundException('Order not found.');
  }

  async createOrder(payload: InputCreateOrderDto): Promise<void> {
    if (await this.userService.emailInUse(payload.user_email)) {
      for (let i = 0; i < payload.products.length; i++) {
        if (!(await this.productService.idInUse(payload.products[i]))) throw new NotFoundException('Cannot create order, product not found.');
      }
      await this.orderModel.create({ ...payload, id: uuidv4() });
    } else throw new NotFoundException('Cannot create order, user not found.');
  }
}
