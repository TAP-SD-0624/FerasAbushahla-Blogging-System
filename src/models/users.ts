import { Model, DataTypes, Sequelize } from 'sequelize';

class Users extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public static initModel(sequelize: Sequelize): void {
        Users.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: new DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: new DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'users',
            sequelize,
        });
    }
}

export default Users;