import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request } from 'express'
import { AuthGuard } from './auth.guard'
import { JwtService } from "@nestjs/jwt";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtService: JwtService) {}

    @Post('signup')
    signup (@Req() request: Request) {
        console.log(request.body)
        return this.authService.signup()
    }

    @Post('login')
    @UseGuards(AuthGuard)
    async login (@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Get('profile')
    profile() {
        const profile = {
            firstName: 'John',
            email: 'test@me.com',
            id: 'ascasdvvm,cmkascjcas'
        }
        return profile
    }

}