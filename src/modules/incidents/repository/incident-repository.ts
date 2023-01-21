import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OngEntity } from 'src/modules/ong/entity/ong.entity';
import { generateUniqueId } from 'src/utils/generate-unique-id';
import { IncidentEntity } from '../entity/incidents';

@Injectable()
export class IncidentRepository {
  private readonly logger = new Logger(IncidentRepository.name);

  constructor(
    @InjectModel(IncidentEntity)
    private readonly entity: typeof IncidentEntity,
  ) { }

  public async createIncident(
    data: IncidentCreationAttributes,
  ): Promise<IncidentEntity> {
    try {
      const incident = await this.entity.create({
        id: generateUniqueId(),
        ...data,
      });
      return incident;
    } catch (error) {
      this.logger.error(error, this.createIncident.name);
      throw error;
    }
  }

  public async deleteIncident(
    incidentId: string,
    ongId: string,
  ): Promise<void> {
    try {
      await this.entity.destroy({ where: { id: incidentId, ongId: ongId } });
    } catch (error) {
      this.logger.error(error, this.deleteIncident.name);
      throw error;
    }
  }

  public async paginatedIncidents(first: number, offset: number) {
    try {
      const incidents = this.entity.findAll({
        include: OngEntity,
        offset: offset ?? 0,
        limit: first,
      });
      return incidents;
    } catch (error) {
      this.logger.error(error, this.paginatedIncidents.name);
      throw error;
    }
  }

  public async countIncidents() {
    try {
      const count = await this.entity.count({ include: OngEntity });
      return count;
    } catch (error) {
      this.logger.error(error, this.countIncidents.name);
      throw error;
    }
  }

  public async findById(id: string): Promise<IncidentEntity> {
    try {
      const incident = await this.entity.findByPk(id);
      return incident;
    } catch (error) {
      this.logger.error(error, this.findById.name);
      throw error;
    }
  }
}
