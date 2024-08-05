import {Table, Column, Model, DataType, Default, AllowNull, Unique} from "sequelize-typescript"

@Table({
    tableName: "users"
})

class Users extends Model{
    @Unique
    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    email: string

    @Column({
        type: DataType.STRING(300),
        allowNull: false,
    })
    password: string

    @Default("cliente")
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    type: string

}


export default Users