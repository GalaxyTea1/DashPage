import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
import { compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async register(email: string, password: string) {
    const existingUser = await this.usersRepository.findOne({ 
      where: { email } 
    });
    
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    try {
      const user = this.usersRepository.create({ 
        email, 
        password 
      });
      const savedUser = await this.usersRepository.save(user);

      // return this.login(savedUser);

      return savedUser;

    } catch (error) {
      if (error.code === '23505') { // PostgreSQL unique constraint violation
        throw new ConflictException('Email already exists');
      }
      console.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
}

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getInfo(token: string) {
    try {
      const decoded = this.jwtService.verify(token); 
      const userId = decoded.sub;
      
      const user = await this.usersRepository.findOne({where: {id: userId}});
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user && await compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async forgotPassword(email: string) {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const token = uuidv4();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
    await this.usersRepository.save(user);

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      template: './reset-password',
      context: {
        token,
        url: `http://localhost:3002/auth/reset-password?token=${token}`,
      },
    });

    return { message: 'Reset password instructions sent to email' };
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.usersRepository.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: MoreThan(new Date()),
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.usersRepository.save(user);

    return { message: 'Password successfully reset' };
  }
}