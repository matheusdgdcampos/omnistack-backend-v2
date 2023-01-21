import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class IncidentsGQLModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field((type) => Int)
  value: number;

  @Field()
  ongId: string;
}
