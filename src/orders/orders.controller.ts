import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schemas/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/all')
  async getAllOrders(): Promise<Order[]> {
    return this.ordersService.getAllOrders();
  }
}
