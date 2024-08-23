import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Types from "./Types.model";
import Permissions from "./Permissions.model"

@Table({
    tableName: "types_permissions"
})
class Types_Permissions extends Model {
    
    @ForeignKey(() => Permissions)
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    declare name_permissions: string;

    @ForeignKey(() => Types)
    @Column({
        type: DataType.STRING(70),
        allowNull: false,
    })
    declare name_type: string;
}

export default Types_Permissions;