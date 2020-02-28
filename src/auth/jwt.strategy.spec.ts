import { Test } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});


describe('JwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: UserRepository, useFactory: mockUserRepository },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });


  describe('validate', () => {
    it('validates and returns the user based on JWT payload', async () => {
      const user = new User();
      user.username = 'TestUsername';

      userRepository.findOne.mockResolvedValue(user);
      const result = await jwtStrategy.validate({ username: 'TestUserName' });
      expect(userRepository.findOne).toHaveBeenCalledWith({ username: 'TestUserName' });
      expect(result).toEqual(user);
    });
    
    it('throws an unauthorized exception if user cannot be found', () => {
      userRepository.findOne.mockResolvedValue(null);
      expect(jwtStrategy.validate({ username: 'TestUserName' })).rejects.toThrowError(UnauthorizedException);
    });
  });
});
