import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { generateUniqueId } from 'src/utils/generate-unique-id';
import { OngEntity } from '../entity/ong.entity';

@Injectable()
export class OngRepository {
  private readonly logger = new Logger(OngRepository.name);

  constructor(
    @InjectModel(OngEntity)
    private readonly entity: typeof OngEntity,
  ) { }

  public async findAll(): Promise<OngEntity[]> {
    try {
      const ongs = await this.entity.findAll();
      return ongs;
    } catch (error) {
      this.logger.error(error, 'findAll');
      throw error;
    }
  }

  public async create(data: OngCreationAttributes): Promise<OngEntity> {
    try {
      const ong = await this.entity.create({
        id: generateUniqueId(),
        ...data,
      });
      return ong;
    } catch (error) {
      this.logger.error(error, 'create');
      throw error;
    }
  }

  public async findByEmail(email: string): Promise<OngEntity | undefined> {
    try {
      const ong = await this.entity.findOne({ where: { email } });
      return ong;
    } catch (error) {
      this.logger.error(error, 'findByEmail');
      throw error;
    }
  }

  public async findById(id: string): Promise<OngEntity> {
    try {
      const ong = await this.entity.findByPk(id);
      return ong;
    } catch (error) {
      this.logger.error(error, 'findById');
      throw error;
    }
  }
}
