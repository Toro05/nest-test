import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from '@nestjs/jwt';


@Injectable({}) 
export class AuthService {
    constructor(private jwtService: JwtService, private usersService: UsersService){}
    signup (){
        return 'I am signed up'
    }

    async signIn(username, pass) {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        const payload = { username: user.username, sub: user.userId };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    
}