import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [

        {
          provide: UserService,
          useValue: {
            createUser: jest.fn().mockResolvedValue({ accessToken: "token" })
          }
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {

    await expect(
      service.createUser({ email: 'jewel', password: 'sf', role: 'seller' })
    ).resolves.toEqual({ accessToken: 'token' });

    expect(service).toBeDefined();
  });
});
