import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateIncidentDTO {
  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;

  @IsNumber()
  @Field((type) => Int)
  value: number;

  @IsUUID()
  @Field()
  ongId: string;
}
