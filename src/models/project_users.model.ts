import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Project } from "./project.model";
import { User } from "./user.model";

@Table
export class ProjectUser extends Model<ProjectUser> {
    @ForeignKey(() => Project)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    }) 
    projectId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    }) 
    userId: number;

    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => User) 
    user: User;

}