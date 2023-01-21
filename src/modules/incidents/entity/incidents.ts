import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { OngEntity } from 'src/modules/ong/entity/ong.entity';

@Table({
  tableName: 'incidents',
})
export class IncidentEntity extends Model<
  IncidentAttributes,
  IncidentCreationAttributes
> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  value: number;

  @ForeignKey(() => OngEntity)
  @Column
  ongId: string;

  @BelongsTo(() => OngEntity)
  ong: OngEntity;
}
