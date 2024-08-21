import bcrypt from "bcrypt";
import Users from "../models/Users.model"
import Types from "../models/Types.model"
import Users_Types from "../models/Users_Types.model"
import Permissions from "../models/Permissions.model"
import Types_Permissions from "../models/Types_Permissions.model"


async function DefaultValues() {

    const email = "admin@gmail.com";
    const name = "admin";
    const password = "1234";

    // const queryInterface = db.getQueryInterface();
    // const tables = await queryInterface.showAllTables();

    // // Suponiendo que `Model` es una instancia de un modelo de Sequelize
    // const tableNameOrConfig = Users.getTableName();

    // // Verifica el tipo de retorno y maneja adecuadamente
    // let tableName: string;

    // if (typeof tableNameOrConfig === 'string') {
    //     // Si es una cadena, simplemente asigna el valor
    //     tableName = tableNameOrConfig;
    // } else {
    //     // Si es un objeto, asigna el nombre de la tabla desde el objeto
    //     tableName = tableNameOrConfig.tableName;
    // }
    // const userTable =tables.includes(tableName);


    /*Se crea Usuario tipo admin por defecto y se encripta la contraseña*/
    const usersCount = await Users.count();

    if(usersCount>0){
        return;
    }

    if (usersCount === 0) {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const userAdmin = await Users.create({
            name: name,
            email: email,
            password: hashedPassword
        });
    }

    const typeCount = await Types.count();
    if (typeCount === 0) {

        const typeAdmin = await Types.create({
            name: name,
        });
    }

    const userTypeCount = await Users_Types.count();
    if (userTypeCount === 0) {
        const [userType, created] = await Users_Types.findOrCreate({
            where: {
                email_users: email,
                name_type: name
            },
            defaults: {
                // Puedes proporcionar valores por defecto aquí si el registro necesita ser creado
                email_users: email,
                name_type: name
            }
        });
    }

    const permissionCount = await Permissions.count();
    if (permissionCount === 0) {

        //Permisos por defecto
        const permissionsToCreate = [
            { name: "users" },
            { name: "customers" },
            { name: "invoices" },
            { name: "products" },

        ];
        const permissionAdmin = await Permissions.bulkCreate(permissionsToCreate)
    }

    const typesPermissionsCount = await Types_Permissions.count();
    if (typesPermissionsCount === 0) {
        // Define los registros que deseas insertar

        const recordsToInsert = [
            { name_permissions: "users", name_type: name },
            { name_permissions: "customers", name_type: name },
            { name_permissions: "invoices", name_type: name },
            { name_permissions: "products", name_type: name }
            // Agrega más registros según sea necesario
        ];

        // Itera sobre cada registro y usa findOrCreate
        for (const record of recordsToInsert) {
            await Types_Permissions.findOrCreate({
                where: {
                    name_permissions: record.name_permissions,
                    name_type: record.name_type
                },
                defaults: record
            });
        }
    }

}

export default DefaultValues;