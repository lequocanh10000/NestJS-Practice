import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { ProjectUser } from "./project_users.model";

@Table
export class Project extends Model<Project> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    }) name: string;

    @Column({
        type: DataType.STRING,
        defaultValue: 'client',
    }) category: string;

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
        allowNull: false,
    }) projectedStartedAt: object;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    }) projectedEndedAt: object;

    // Relationship
    @HasMany(() => ProjectUser)
    projectUsers: ProjectUser[];
}