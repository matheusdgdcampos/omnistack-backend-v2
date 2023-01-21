import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/guards/auth.guard';

import { CreateOngDTO } from '../dto/create-ong.dto';
import { OngEntity } from '../entity/ong.entity';
import { OngGQLModel } from '../model/ong-model';
import { OngRepository } from '../repository/ong-repository';
import { OngService } from '../services/ong.service';

@Resolver((of) => OngGQLModel)
export class OngResolver {
  constructor(
    private readonly ongRepository: OngRepository,
    private readonly ongService: OngService,
  ) { }

  @Query((returns) => [OngGQLModel])
  public async getAllOngs(): Promise<OngEntity[]> {
    const ongs = await this.ongRepository.findAll();
    return ongs;
  }

  @Mutation((returns) => String)
  @UsePipes(new ValidationPipe())
  public async createOng(@Args('args') args: CreateOngDTO): Promise<string> {
    const ongId = await this.ongService.createOng(args);
    return ongId;
  }
}
