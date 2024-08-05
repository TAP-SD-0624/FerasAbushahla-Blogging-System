"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsCategories = exports.Comments = exports.Categories = exports.Posts = exports.Users = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const users_1 = __importDefault(require("./users"));
exports.Users = users_1.default;
const posts_1 = __importDefault(require("./posts"));
exports.Posts = posts_1.default;
const categories_1 = __importDefault(require("./categories"));
exports.Categories = categories_1.default;
const comments_1 = __importDefault(require("./comments"));
exports.Comments = comments_1.default;
const postsCategories_1 = __importDefault(require("./postsCategories"));
exports.PostsCategories = postsCategories_1.default;
// Initialize models
users_1.default.initModel(database_1.default);
posts_1.default.initModel(database_1.default);
categories_1.default.initModel(database_1.default);
comments_1.default.initModel(database_1.default);
postsCategories_1.default.initModel(database_1.default);
// Define associations
users_1.default.hasMany(posts_1.default, { foreignKey: 'userId', as: 'posts' });
posts_1.default.belongsTo(users_1.default, { foreignKey: 'userId', as: 'user' });
posts_1.default.belongsToMany(categories_1.default, { through: postsCategories_1.default, as: 'categories', foreignKey: 'postId' });
categories_1.default.belongsToMany(posts_1.default, { through: postsCategories_1.default, as: 'posts', foreignKey: 'categoryId' });
posts_1.default.hasMany(comments_1.default, { foreignKey: 'postId', as: 'comments' });
comments_1.default.belongsTo(posts_1.default, { foreignKey: 'postId', as: 'post' });
comments_1.default.belongsTo(users_1.default, { foreignKey: 'userId', as: 'user' });
users_1.default.hasMany(comments_1.default, { foreignKey: 'userId', as: 'comments' });
