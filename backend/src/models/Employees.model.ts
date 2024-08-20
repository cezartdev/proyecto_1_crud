import { Table, Column, Model, DataType, Unique, HasMany, PrimaryKey } from "sequelize-typescript";
import Employees_Companies from "./Employees_Companies.model";

@Table({
    tableName: "employees"
})
class Employees extends Model {
    @PrimaryKey
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    rut: string;

    @Column({
        type: DataType.STRING(50),
        allowNull: false,
    })
    name: string;

    @Unique
    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING(100),
        allowNull: false,
    })
    position: string;

    @HasMany(() => Employees_Companies, 'rut_employees')
    employeeCompanies: Employees_Companies[];
}

export default Employees;