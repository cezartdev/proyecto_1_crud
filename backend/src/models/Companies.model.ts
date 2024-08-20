import { Table, Column, Model, DataType, Unique, HasMany, PrimaryKey } from "sequelize-typescript";
import Employees_Companies from "./Employees_Companies.model";

@Table({
    tableName: "companies"
})
class Companies extends Model {

    @PrimaryKey
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    rut: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    company_name: string;

    @Unique
    @Column({
        type: DataType.STRING(200),
        allowNull: true,
    })
    email: string;

    @Column({
        type: DataType.STRING(200),
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING(150),
        allowNull: false,
    })
    region: string;

    @Unique
    @Column({
        type: DataType.STRING(50),
        allowNull: true,
    })
    phone: string;

    @HasMany(() => Employees_Companies, 'rut_companies')
    employeeCompanies: Employees_Companies[];
}

export default Companies;