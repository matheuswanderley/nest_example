import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  const dto = {
    _id: '1',
    name: 'matheus',
    email: 'matheus@matheus',
    password: '12345',
  };
  class UserModel {
    constructor(private dto) {}
    create = jest.fn().mockResolvedValue(this.dto);
    static findAll = jest.fn().mockResolvedValue(dto);
    static findOne = jest.fn().mockResolvedValue(dto);
    static update = jest.fn().mockResolvedValue(dto);
    static remove = jest.fn().mockResolvedValueOnce(dto);
    save = jest.fn().mockResolvedValue(this.dto);
    static find = jest.fn().mockResolvedValue(dto);
    static findById = jest.fn().mockResolvedValue(dto);
    static findByIdAndUpdate = jest.fn().mockResolvedValue(dto);
    static deleteOne = jest.fn().mockResolvedValueOnce(dto);
    static exec = jest.fn();
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be create a user', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await controller.create(dto)).toEqual(dto);
  });

  it('should be findall a users', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await controller.findAll()).toEqual(dto);
  });

  it('should be find one user', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await controller.findOne('1')).toEqual(dto);
  });

  it('should be update one user', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await controller.update('1', dto)).toEqual(dto);
  });

  it('should be delete one user', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await controller.remove('1')).toEqual(dto);
  });
});
