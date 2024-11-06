import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConfig } from '../../../config/database.config';
import { JwtPayload } from '../interfaces/jwtPayload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    try {
      console.log('Payload in validate:', payload);
      if (!payload.user_id || !payload.email) {
        throw new UnauthorizedException('Invalid token payload');
      }
      return { id: payload.user_id, email: payload.email };
    } catch (error) {
      console.error('Error in JWT validation:', error);
      throw new UnauthorizedException('Token validation failed');
    }
  }
}