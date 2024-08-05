"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Comment extends sequelize_1.Model {
    static initModel(sequelize) {
        Comment.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            content: {
                type: new sequelize_1.DataTypes.TEXT,
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
            postId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
            },
        }, {
            tableName: 'comments',
            sequelize,
        });
    }
}
exports.default = Comment;
