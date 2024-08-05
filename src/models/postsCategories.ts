import { Model, DataTypes, Sequelize } from 'sequelize';

class PostsCategories extends Model {
    public postId!: number;
    public categoryId!: number;

    public static initModel(sequelize: Sequelize): void {
      PostsCategories.init({
            postId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
            categoryId: {
                type: DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
            },
        }, {
            tableName: 'post_categories',
            sequelize,
        });
    }
}

export default PostsCategories;