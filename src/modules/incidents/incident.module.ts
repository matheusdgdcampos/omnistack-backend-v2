import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { IncidentEntity } from './entity/incidents';
import { IncidentRepository } from './repository/incident-repository';
import { IncidentsResolver } from './resolver/incident-resolver';
import { IncidentsService } from './service/incident.service';

@Module({
  imports: [SequelizeModule.forFeature([IncidentEntity])],
  providers: [IncidentRepository, IncidentsService, IncidentsResolver],
  exports: [IncidentRepository],
})
export class IncidentModule { }
