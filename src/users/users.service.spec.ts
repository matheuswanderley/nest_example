import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const dto = {
    _id: '1',
    name: 'matheus',
    email: 'matheus@matheus',
    password: '12345',
  };
  class UserModel {
    constructor(private dto) {}
    save = jest.fn().mockResolvedValue(this.dto);
    static find = jest.fn().mockResolvedValue(dto);
    static findById = jest.fn().mockResolvedValue(dto);
    static findByIdAndUpdate = jest.fn().mockResolvedValue(dto);
    static deleteOne = jest.fn().mockResolvedValueOnce(dto);
    static exec = jest.fn();
    static remove = jest.fn().mockResolvedValueOnce(dto);
  }
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: UserModel,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await service.create(dto)).toEqual({
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    });
  });
  it('should find all users and return that', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await service.findAll()).toEqual(dto);
  });
  it('should find one user and return that', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await service.findOne('1')).toEqual(dto);
  });

  it('should update one user and return that', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await service.update('1', dto)).toEqual(dto);
  });
  it('should remove one user and return that', async () => {
    const dto = {
      _id: expect.any(String),
      name: 'matheus',
      email: 'matheus@matheus',
      password: '12345',
    };
    expect(await service.remove('1')).toEqual(dto);
  });
});
