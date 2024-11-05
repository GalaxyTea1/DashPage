import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './modules/auth/auth.module';
import { databaseConfig, jwtConfig, mailConfig } from './config/database.config';
import { PostsModule } from './modules/posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register(jwtConfig),
    MailerModule.forRoot({
      transport: mailConfig,
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
      template: {
        dir: __dirname + '/src/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    AuthModule,
    PostsModule
  ],
})
export class AppModule {}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply((req, res, next) => {
//         res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//         res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
//         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//         next();
//       })
//       .forRoutes('*');
//   }
// }