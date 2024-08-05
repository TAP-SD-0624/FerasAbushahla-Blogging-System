"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class PostsCategories extends sequelize_1.Model {
    static initModel(sequelize) {
        PostsCategories.init({
            postId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            categoryId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        }, {
            tableName: 'post_categories',
            sequelize,
        });
    }
}
exports.default = PostsCategories;
