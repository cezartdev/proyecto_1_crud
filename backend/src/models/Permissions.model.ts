import { Table, Column, Model, DataType, Unique, HasMany, PrimaryKey } from 'sequelize-typescript';
import Types_Permissions from './Types_Permissions.model';

@Table({
    tableName: 'permissions'
})
class Permissions extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    name: string;


    @HasMany(() => Types_Permissions, 'name_permissions')
    userPermissions: Types_Permissions[];
}

export default Permissions;