import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Load configuration from .env file
    ConfigModule.forRoot({
      isGlobal: true,  // Makes config available globally
    }),

    // Use MongooseModule with the connection string from environment variables
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USERNAME')}:${configService.get<string>('DB_PASSWORD')}@book-homestay.457sp.mongodb.net/${configService.get<string>('DB_NAME')}?retryWrites=true&w=majority`,
      }),
      inject: [ConfigService], // Inject the ConfigService to get env variables
    }),

    UsersModule,

  ],
})
export class AppModule {}
