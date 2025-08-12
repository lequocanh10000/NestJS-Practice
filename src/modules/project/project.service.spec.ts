import { Test, TestingModule } from '@nestjs/testing';
import { ProjectService } from './project.service';
import { getModelToken } from '@nestjs/sequelize';
import { Project, ProjectUser } from 'src/models';

describe('ProjectService', () => {
  let service: ProjectService;

  const mockProjectModel = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  };

  const mockProjectUserModel = {
    bulkCreate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getModelToken(Project),
          useValue: mockProjectModel,
        },
        {
          provide: getModelToken(ProjectUser),
          useValue: mockProjectUserModel,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create project', async () => {
      const payload = {
        name: 'Miku'
      }
      const mockProject = {id: 1, name: 'Miku'};

      mockProjectModel.create.mockResolvedValue(mockProject);

      const project = await service.create(payload);

      expect(project).toEqual(mockProject)
    })
  })

  describe('findAll', () => {
    it('should find all', async () => {
      const mockProjects = [
        {
          id: 1,
          name: 'Miku'
        },
        {
          id: 2,
          name: 'Teto'
        }
      ]
      mockProjectModel.findAll.mockResolvedValue(mockProjects)
      const projects = await service.findAll();
      expect(projects).toEqual(mockProjects);
    })
  })

  describe('update', () => {
    it('should update successfully', async () => {
      const id = 1;
      const payload = {
        name: "Miku"
      };
      const mockProject = {
        id,
        name: 'Teto',
        update: jest.fn().mockResolvedValue({id, name: 'Miku'})
      };

      mockProjectModel.findByPk.mockResolvedValue(mockProject);

      const project = await service.update(payload, id)

      expect(project).toEqual({
        message: 'Project updated successfully',
        data: { id, name: 'Miku' },
      })
    })

    it('should throw error if id not found', async() => {
      const id = 999;
      const payload = {
        name: 'Miku'
      }
      mockProjectModel.findByPk.mockResolvedValue(null);
      const project = async() => {
        return await service.update(payload, id)
      }
      expect(project).rejects.toThrow('Project not found');
    })
  })

  describe('delete', () => {
    it('should be deleted', async () => {
      const id = 1;
      mockProjectModel.destroy = jest.fn().mockResolvedValue(1); 
      const result = await service.delete(id);

      expect(result).toEqual({ message: 'Project deleted successfully' })
    })
  })
});