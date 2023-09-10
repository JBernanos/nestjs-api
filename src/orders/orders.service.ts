import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Order } from './schemas/orders.schema';
import { InputCreateOrderDto } from './dto/orders.dto';

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

  async getOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ id: orderId });
    if (order) return order;
    else throw new NotFoundException('Order not found.');
  }

  async createOrder(payload: InputCreateOrderDto): Promise<void> {
    //TODO: Verify if user and products exist.
  }
}
