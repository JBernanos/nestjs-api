import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Order } from './schemas/orders.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find({});
    if (orders.length > 0) return orders;
    else throw new NotFoundException('Orders collection is empty.');
  }
}
