import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import Users from './Users.model';
import Types from './Types.model';

@Table({
    tableName: 'users_types'
})
class Users_Types extends Model {

    @ForeignKey(() => Users)
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    email_users: string;

    @ForeignKey(() => Types)
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    name_type: string;
}

export default Users_Types;