import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'Users', timestamps: true })
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
