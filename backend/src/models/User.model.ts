import {Table, Column, Model, DataType, Default} from "sequelize-typescript"

@Table({
    tableName: "users"
})

class Users extends Model{
    @Column({
        type: DataType.STRING(100)
    })
    email: string

    @Column({
        type: DataType.STRING(50)
    })
    password: string

    @Column({
        type: DataType.STRING(50)
    })
    type: string

}


export default Users