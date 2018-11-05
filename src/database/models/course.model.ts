
export default (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'Course',
        {
            course_key: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
            }
        },
        {
            tableName: 'course',
            underscored: true,

        },
    );

    return Model;
};
