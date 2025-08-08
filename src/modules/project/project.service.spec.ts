import { HttpModule } from '@nestjs/axios';
import { ProjectService } from "./project.service";
import { TestingModule, Test} from '@nestjs/testing';

describe('ProjectService', () => {
    let service: ProjectService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [ProjectService],
        }).compile();

        service = module.get<ProjectService>(ProjectService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});