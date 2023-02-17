import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ObjectModule } from './object/object.module';
import { CustomAppModule } from './custom-app/custom-app.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URL,
      // host: process.env.DB_HOST,
      // port: +process.env.DB_PORT,
      // username: process.env.DB_USER,
      // password: process.env.DB_PASSWORD,
      // database: process.env.DB_NAME,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ContactModule,
    ObjectModule,
    CustomAppModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
