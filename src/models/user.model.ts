// Create user table

import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { ProjectUser} from './project_users.model';

@Table
export class User extends Model<User> {
  @Column({
      allowNull: false,
      unique: true,
      type: DataType.STRING,
    })
  email: string;

  @Column({
      allowNull: false,
      type: DataType.STRING,
    })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true
  })
  isActive: boolean;

// Relationship
@HasMany(() => ProjectUser)
projectUsers: ProjectUser[];

}