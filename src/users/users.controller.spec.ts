import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    create: jest.fn((dto) => {
      return { _id: Date.now().toString(), ...dto };
    }),
    findAll: jest.fn((dto) => {
      return {
        _id: '11111111',
        name: 'matheus',
        email: 'matheus@matheus',
        password: '12345',
      };
    }),
    findOne: jest.fn((dto) => {
      return {
        _id: '1',
        name: 'matheus',
        email: 'matheus@matheus',
        password: '12345',
      };
    }),
    update: jest.fn((_id, dto) => {
      return {
        _id: '1',
        name: 'matheus',
        email: 'matheus@matheus',
        password: '12345',
      };
    }),
    remove: jest.fn((_id, dto) => {
      return {
        _id: '1',
        name: 'matheus',
        email: 'matheus@matheus',
        password: '12345',
      };
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be create a user', () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(controller.create(dto)).toEqual(dto);
    expect(mockUsersService.create).toHaveBeenCalled();
  });

  it('should be findall a users', () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(controller.findAll()).toEqual(dto);
    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should be find one user', () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(controller.findOne('1')).toEqual(dto);
    expect(mockUsersService.findOne).toHaveBeenCalled();
  });

  it('should be update one user', () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(controller.update('1', dto)).toEqual(dto);
    expect(mockUsersService.update).toHaveBeenCalled();
  });

  it('should be delete one user', () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(controller.remove('1')).toEqual(dto);
    expect(mockUsersService.remove).toHaveBeenCalled();
  });
});
