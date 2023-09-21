import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Orders', timestamps: true })
export class Order {
  @Prop()
  id: string;

  @Prop()
  user_email: string;

  @Prop()
  products: string[];

  @Prop()
  total_price: number;

  @Prop()
  discount: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
