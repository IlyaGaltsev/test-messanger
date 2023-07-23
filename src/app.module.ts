import { UserService } from 'src/user/user.service';
import { AuthController } from './auth/auth.controller';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './user/user.entity';
import { Connection } from 'typeorm';

@Module({
  controllers: [AppController, AuthController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEntity],
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: process.env.NODE_ENV === 'production' ? false : true,
      autoLoadEntities: true,
    }),
    AuthModule,
    UserModule,
  ],
})
export class AppModule {
  constructor(private connection: Connection) {
    this.checkDatabaseConnection();
  }

  async checkDatabaseConnection() {
    try {
      await this.connection.query('SELECT 1');
      console.log('Database connection successful ^_^');
    } catch (error) {
      console.error(':( Database connection failed:', error.message);
    }
  }
}
