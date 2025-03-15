import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { reviewModule } from './reviews/review.module';
import { HomestayModule } from './homestays/homestay.module';

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
    UserModule,
    reviewModule,
    HomestayModule
  ],
})
export class AppModule {}
