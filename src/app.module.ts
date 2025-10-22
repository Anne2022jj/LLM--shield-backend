import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Feature modules
import { UsersModule } from './users/users.module';
import { ApiTokensModule } from './api-tokens/api-tokens.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { MlModelsModule } from './ml-moduls/ml-moduls.module';
import { PaymentsModule } from './payments/payments.module';
import { PromptAnalysisModule } from './prompt-analysis/prompt-analysis.module';
import { PromptFeaturesModule } from './prompt-features/prompt-features.module';
import { PromptsModule } from './prompt-s/prompt-s.module';
import { SchemaVersionsModule } from './schema-version/schema-version.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TeamsModule } from './teams/teams.module';
import { TenantsModule } from './tenants/tenants.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production',
      logging: false,
      extra: {
        connectionLimit: 1,
        connectTimeout: 10000,
      },
    }),
    UsersModule,
    ApiTokensModule,
    AuditLogsModule,
    MlModelsModule,
    PaymentsModule,
    PromptAnalysisModule,
    PromptFeaturesModule,
    PromptsModule,
    SchemaVersionsModule,
    TeamMembersModule,
    TeamsModule,
    TenantsModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}
