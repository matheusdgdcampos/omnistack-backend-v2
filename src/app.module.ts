import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';

import environments from './config/environments';
import { IncidentModule } from './modules/incidents/incident.module';
import { OngModule } from './modules/ong/ong.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environments],
    }),
    SequelizeModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        dialect: 'sqlite',
        storage: join(process.cwd(), 'src', 'database', 'db.sqlite3'),
        autoLoadModels: true,
        logging:
          config.getOrThrow<string>('app.environment.running') === 'development'
            ? true
            : false,
        synchronize:
          config.getOrThrow<string>('app.environment.running') === 'development'
            ? true
            : false,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'src', 'schema.gql'),
        sortSchema: true,
      }),
    }),
    OngModule,
    IncidentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
