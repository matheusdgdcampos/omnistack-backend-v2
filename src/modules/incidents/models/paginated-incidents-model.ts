import { ObjectType } from '@nestjs/graphql';

import { Paginated } from 'src/utils/paginated-model';
import { IncidentsGQLModel } from './incident-paginated-model';

@ObjectType()
export class PaginatedIncidents extends Paginated(IncidentsGQLModel) { }
