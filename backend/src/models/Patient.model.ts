import {Table, Column, Model, DataType, Default, AllowNull, Unique, AutoIncrement} from "sequelize-typescript"

@Table({
    tableName: "patients"
})

class Patients extends Model{
    @Unique
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    code: number

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    ownername: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    ownerlastname: string

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    petname: string

    @Column({
        type: DataType.STRING(300),
        allowNull: true,
    })
    description: string

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    date: Date

}


export default Patients