import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { OngEntity } from './entity/ong.entity';
import { OngRepository } from './repository/ong-repository';
import { OngResolver } from './resolver/ong-resolver';
import { OngService } from './services/ong.service';

@Module({
  imports: [SequelizeModule.forFeature([OngEntity])],
  providers: [OngRepository, OngService, OngResolver],
  exports: [OngRepository],
})
export class OngModule { }
