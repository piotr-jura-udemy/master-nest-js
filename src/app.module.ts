import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppDummy } from './app.dummy';
import { AppJapanService } from './app.japan.service';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV ?? ''}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      debug: true,
      playground: true,
    }),
    AuthModule,
    EventsModule,
    SchoolModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: AppService,
      useClass: AppJapanService,
    },
    {
      provide: 'APP_NAME',
      useValue: 'Nest Events Backend!',
    },
    {
      provide: 'MESSAGE',
      inject: [AppDummy],
      useFactory: (app) => `${app.dummy()} Factory!`,
    },
    AppDummy,
  ],
})
export class AppModule {}
