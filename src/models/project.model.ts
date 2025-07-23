import { Column, DataType, Model, Table } from "sequelize-typescript";

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
    }) projected_spend: number;

    @Column({
        type: DataType.INTEGER,
        defaultValue: 0,
    }) projected_variance: number;
    
    @Column({
        type: DataType.DATE,
        allowNull: false,
    }) projected_started_at: object;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    }) projected_ended_at: object;
}