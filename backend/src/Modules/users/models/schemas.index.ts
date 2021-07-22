import { MongooseModule } from "@nestjs/mongoose";



import { Users, UsersSchema } from "./schemas/userSchema";

export const _USERSCHEMA = MongooseModule.forFeature([
  {
    name: Users.name,
    schema: UsersSchema,
  },
]);
 

