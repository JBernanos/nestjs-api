import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';

import { InputCreateOrderDto } from './dto/orders.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/all')
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }

  @Get('/id/:id')
  async getOrderById(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.getOrderById(orderId);
  }

  @Post()
  async createOrder(@Body() payload: InputCreateOrderDto): Promise<void> {
    return this.ordersService.createOrder(payload);
  }
}
