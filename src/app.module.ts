import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DB_URI } from './config/constants';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { BcryptModule } from './bcrypt/bcrypt.module';
import { AuthModule } from './auth/auth.module';
import { RoleMiddleware } from './middlewares/role.middleware';
import { UserController } from './user/user.controller';
import { ProductController } from './product/product.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(DB_URI),
      }),
      //agregar modulos de entidades
      inject: [ConfigService],
    }),
    UserModule,
    ProductModule,
    CartModule,
    OrderModule,
    BcryptModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RoleMiddleware)
      .exclude(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.POST },
        { path: 'user', method: RequestMethod.PUT },
      )
      .forRoutes(UserController);
  }
}
