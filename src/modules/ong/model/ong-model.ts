import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OngGQLModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  whatsapp: string;

  @Field()
  city: string;

  @Field()
  uf: string;
}
