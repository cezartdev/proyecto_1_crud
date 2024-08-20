import { Table, Column, Model, DataType, Unique, HasMany, PrimaryKey } from 'sequelize-typescript';
import Users_Types from './Users_Types.model';

@Table({
    tableName: 'users'
})
class Users extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
    })
    password: string;

    @HasMany(() => Users_Types, 'email_users')
    userTypes: Users_Types[];
}

export default Users;