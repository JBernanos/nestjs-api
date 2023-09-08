import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Products', timestamps: true })
export class Product {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
