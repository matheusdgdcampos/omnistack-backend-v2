import { Injectable, Logger } from '@nestjs/common';
import { CreateOngDTO } from '../dto/create-ong.dto';

import { OngWithEmailAlreadyExists } from '../errors/ong-with-email-already-exists.error';
import { OngRepository } from '../repository/ong-repository';

@Injectable()
export class OngService {
  private readonly logger = new Logger(OngService.name);

  constructor(private readonly repository: OngRepository) { }

  public async createOng(data: CreateOngDTO): Promise<string> {
    try {
      const alreadyExists = await this.repository.findByEmail(data.email);

      if (alreadyExists) {
        throw new OngWithEmailAlreadyExists();
      }

      const ong = await this.repository.create(data);
      return ong.id;
    } catch (error) {
      this.logger.error(error, 'createOng');
      throw error;
    }
  }
}
