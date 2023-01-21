import { Field, InputType } from '@nestjs/graphql';
import {
  IsString,
  IsEmail,
  Matches,
  IsNumberString,
  MaxLength,
  IsUppercase,
} from 'class-validator';

@InputType()
export class CreateOngDTO {
  @IsString()
  @Field()
  name: string;

  @IsEmail()
  @Field()
  email: string;

  @IsNumberString()
  @Matches(/\d{11}/)
  @Field()
  whatsapp: string;

  @IsString()
  @Field()
  city: string;

  @IsString()
  @MaxLength(2)
  @IsUppercase()
  @Field()
  uf: string;
}
