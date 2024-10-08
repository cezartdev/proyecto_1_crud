import { Table, Column, Model, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import Users_Types from './Users_Types.model';
import Types_Permissions from './Types_Permissions.model';

@Table({
    tableName: 'types'
})
class Types extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    declare name: string;

    @HasMany(() => Users_Types, 'name_type')
    declare userTypes: Users_Types[];

    @HasMany(() => Types_Permissions, 'name_type')
    declare typePermissions: Types_Permissions[];

}
export default Types;