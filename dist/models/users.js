"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
    static initModel(sequelize) {
        Users.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: new sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: new sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            tableName: 'users',
            sequelize,
        });
    }
}
exports.default = Users;
