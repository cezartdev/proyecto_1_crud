import { Table, Column, Model, DataType, ForeignKey } from "sequelize-typescript";
import Employees from "./Employees.model";
import Companies from "./Companies.model";

@Table({
    tableName: "employees_companies"
})
class Employees_Companies extends Model {
    
    @ForeignKey(() => Employees)
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    rut_employees: string;

    @ForeignKey(() => Companies)
    @Column({
        type: DataType.STRING(15),
        allowNull: false,
    })
    rut_companies: string;
}

export default Employees_Companies;