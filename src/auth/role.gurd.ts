import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "src/utils/public.decorator";
import { PolicyService } from "./policy.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector,
    private policyService: PolicyService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const action = this.reflector.get<string>('action', context.getHandler());
    const resource = this.reflector.get<string>('resource', context.getHandler());

    console.log(`action = ${action} resource = ${resource}`)

    const request = context.switchToHttp().getRequest();
    console.log(request.user)
    const user = request.user
    // console.log(user)
    if (isPublic) {
      console.log("in public route")
      return true;
    }

    if (!action || !resource) {
      throw new UnauthorizedException('Missing action/resource metadata');
    }

    const allowed = await this.policyService.canAccess({ user, resource, action });

    if (!allowed) {
      throw new UnauthorizedException('Access Denied');
    }

    return true;
  }

}

