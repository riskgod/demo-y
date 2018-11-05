
export default (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'Price',
        {
            price_key: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            singler_price: DataTypes.STRING,
            group_price: DataTypes.STRING,
        },
        {
            tableName: 'price',
            underscored: true,

        },
    );

    return Model;
};
