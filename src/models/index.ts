import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

import Users from './users';
import Posts from './posts';
import Categories from './categories';
import Comments from './comments';
import PostsCategories from './postsCategories';

// Initialize models
Users.initModel(sequelize);
Posts.initModel(sequelize);
Categories.initModel(sequelize);
Comments.initModel(sequelize);
PostsCategories.initModel(sequelize);

// Define associations
Users.hasMany(Posts, { foreignKey: 'userId', as: 'posts' });
Posts.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

Posts.belongsToMany(Categories, { through: PostsCategories, as: 'categories', foreignKey: 'postId' });
Categories.belongsToMany(Posts, { through: PostsCategories, as: 'posts', foreignKey: 'categoryId' });

Posts.hasMany(Comments, { foreignKey: 'postId', as: 'comments' });
Comments.belongsTo(Posts, { foreignKey: 'postId', as: 'post' });

Comments.belongsTo(Users, { foreignKey: 'userId', as: 'user' });
Users.hasMany(Comments, { foreignKey: 'userId', as: 'comments' });

export { sequelize, Users, Posts, Categories, Comments, PostsCategories };