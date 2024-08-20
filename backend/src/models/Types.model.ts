import { Table, Column, Model, DataType, HasMany, PrimaryKey } from 'sequelize-typescript';
import Users_Types from './Users_Types.model';

@Table({
    tableName: 'types'
})
class Types extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    name: string;

    @HasMany(() => Users_Types, 'name_type')
    userTypes: Users_Types[];
}
export default Types;