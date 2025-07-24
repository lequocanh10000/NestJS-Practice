import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import { ProjectUser} from './project_users.model';

@Table
export class User extends Model<User> {
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
    allowNull: false
  })
  isActive: boolean;

// Relationship
@HasMany(() => ProjectUser)
projectUsers: ProjectUser[];

}