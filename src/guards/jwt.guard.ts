import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any, info: any) {
        if(err) {
            throw new UnauthorizedException('No permission to access');
        }

        if(!user) {
            if(info?.name === 'JsonWebTokenError') throw new UnauthorizedException('Token is not valid');
            if(info?.name === 'TokenExpiredError') throw new UnauthorizedException('Token is expired');
            else throw new UnauthorizedException('No access');
        }

        return user;
    }
}