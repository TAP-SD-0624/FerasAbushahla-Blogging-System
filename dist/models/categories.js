"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Category extends sequelize_1.Model {
    static initModel(sequelize) {
        Category.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: new sequelize_1.DataTypes.STRING(128),
                allowNull: false,
            },
        }, {
            tableName: 'categories',
            sequelize,
        });
    }
}
exports.default = Category;
