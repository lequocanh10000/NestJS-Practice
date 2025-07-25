export class CreateProjectDto {
    name: string;
    category?: string;
    projectedSpend?: number;
    projectedVariance?: number;
    projectStartedAt?: string;
    projectEndedAt?: string;
}