import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProjectUser } from "./project_users.model";

// Tạo table projects
export enum ProjectEnum {
    client = 'client',
    nonbillable = 'non-billable',
    system = 'system'
}

@Table
export class Project extends Model<Project> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) name: string;

    @Column({
        type: DataType.ENUM(...Object.values(ProjectEnum)),
        defaultValue: ProjectEnum.client,
    }) category: ProjectEnum;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    }) projectedSpend: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    }) projectedVariance: number;
    
    @Column({
        type: DataType.DATE,
        allowNull: true,
    }) projectedStartedAt: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    }) projectedEndedAt: Date;

    // Relationship
    @HasMany(() => ProjectUser)
    projectUsers: ProjectUser[];

    // Method
    getStartProjectDate(){
        return this.projectedStartedAt ? this.projectedStartedAt.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    }
}