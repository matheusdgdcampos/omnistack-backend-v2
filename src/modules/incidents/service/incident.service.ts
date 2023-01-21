import { Injectable, Logger } from '@nestjs/common';

import { CreateIncidentDTO } from '../dto/create-incident.dto';
import { IncidentEntity } from '../entity/incidents';
import { NotAuthorized } from '../error/not-authorized.error';
import { IncidentRepository } from '../repository/incident-repository';

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);

  constructor(private readonly repository: IncidentRepository) { }

  public async createIncident(
    data: CreateIncidentDTO,
  ): Promise<IncidentEntity> {
    try {
      const incident = await this.repository.createIncident(data);
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
      const incident = await this.repository.findById(incidentId);

      if (incident.ongId !== ongId) {
        throw new NotAuthorized();
      }

      await this.repository.deleteIncident(incident.id, ongId);
    } catch (error) {
      this.logger.error(error, this.deleteIncident.name);
      throw error;
    }
  }

  public async getAllIncidentsPaginated(first: number, offset: number) {
    try {
      const incidents = await this.repository.paginatedIncidents(first, offset);
      const count = await this.repository.countIncidents();
      const result: any = {};
      result.edges = [];

      for (const incident of incidents) {
        const cursor = Buffer.from(incident.id).toString('base64');
        result.edges.push({
          node: incident,
          cursor: cursor,
        });
      }

      result.totalCount = count;
      result.hasNextPage = first + offset < count;

      return result;
    } catch (error) {
      this.logger.error(error, this.getAllIncidentsPaginated.name);
      throw new error();
    }
  }
}
