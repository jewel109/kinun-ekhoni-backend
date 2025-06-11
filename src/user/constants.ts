import { ConfigService } from "@nestjs/config";

export const secrets = {
  secret: (configService: ConfigService): string => configService.get('SECRET')
}
