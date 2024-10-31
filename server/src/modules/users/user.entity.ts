import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  resetPasswordExpires: Date;

  @BeforeInsert()
  async beforeInsert() {
    if (!this.password) {
      throw new Error('Password is required');
    }
    
    this.id = uuidv4();
    this.password = await hash(this.password, 10);
  }
}