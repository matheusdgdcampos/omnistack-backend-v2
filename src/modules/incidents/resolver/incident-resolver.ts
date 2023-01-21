import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateIncidentDTO } from '../dto/create-incident.dto';
import { IncidentsGQLModel } from '../models/incident-paginated-model';
import { PaginatedIncidents } from '../models/paginated-incidents-model';
import { IncidentsService } from '../service/incident.service';

@Resolver((of) => IncidentsGQLModel)
export class IncidentsResolver {
  constructor(private readonly incidentsService: IncidentsService) { }

  @Query((result) => PaginatedIncidents)
  public async findAllIncidents(
    @Args({ name: 'first', type: () => Int }) first: number,
    @Args({ name: 'offset', type: () => Int }) offset: number,
  ) {
    const incidents = await this.incidentsService.getAllIncidentsPaginated(
      first,
      offset,
    );
    return incidents;
  }

  @Mutation((result) => IncidentsGQLModel)
  public async createIncident(@Args('args') args: CreateIncidentDTO) {
    const incident = await this.incidentsService.createIncident(args);
    return incident;
  }

  @Mutation((result) => String)
  public async deleteIncident(@Args('incidentId') incidentId: string) {
    await this.deleteIncident(incidentId);
    return 'Incident deleted';
  }
}
