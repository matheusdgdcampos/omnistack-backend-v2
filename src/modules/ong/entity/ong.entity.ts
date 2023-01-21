import {
  Model,
  Column,
  CreatedAt,
  Index,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import { IncidentEntity } from 'src/modules/incidents/entity/incidents';

@Table({
  tableName: 'ongs',
})
export class OngEntity extends Model<OngAttributes, OngCreationAttributes> {
  @Index
  @PrimaryKey
  @Column
  id: string;

  @Column
  name: string;

  @Index
  @Unique
  @Column
  email: string;

  @Unique
  @Column
  whatsapp: string;

  @Column
  city: string;

  @Column
  uf: string;

  @HasMany(() => IncidentEntity)
  incidents: IncidentEntity[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
