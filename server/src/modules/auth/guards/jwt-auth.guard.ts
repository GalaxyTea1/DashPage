import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: any) {
    console.log('JwtAuthGuard - canActivate called');
    const request = context.switchToHttp().getRequest();
    console.log('Authorization header:', request.headers.authorization);
    return super.canActivate(context);
  }
}