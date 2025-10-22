import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ApiTokensModule } from './api-tokens/api-tokens.module';
import { AuditLogsModule } from './audit-logs/audit-logs.module';
import { MlModelsModule } from './ml-moduls/ml-moduls.module';
import { PaymentsModule } from './payments/payments.module';
import { PromptAnalysisModule } from './prompt-analysis/prompt-analysis.module';
import { PromptFeaturesModule } from './prompt-features/prompt-features.module';
import { PromptSModule } from './prompt-s/prompt-s.module';
import { SchemaVersionsModule } from './schema-version/schema-version.module';
import { TeamMembersModule } from './team-members/team-members.module';
import { TeamsModule } from './teams/teams.module';
import { TenantsModule } from './tenants/tenants.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'bootcamp2025',
      database: 'my_llmdb',
      autoLoadEntities: true,
      synchronize: true, // ⚠️ Disable in production
    }),
    UsersModule,
    ApiTokensModule,
    AuditLogsModule,
    MlModelsModule,
    PaymentsModule,
    PromptAnalysisModule,
    PromptFeaturesModule,
    PromptSModule,
    SchemaVersionsModule,
    TeamMembersModule,
    TeamsModule,
    TenantsModule,
    SubscriptionsModule,
  ],
})
export class AppModule {}
