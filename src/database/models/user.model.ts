
export default (sequelize, DataTypes) => {
    const Model = sequelize.define(
        'User',
        {
            user_key: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                validate: { isEmail: { msg: 'email invalid.' } },
            },
            first_nme: DataTypes.STRING,
            last_nme: DataTypes.STRING,
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                validate: {
                    len: { args: [7, 20], msg: 'Phone number invalid, too short.' },
                    isNumeric: { msg: 'not a valid phone number.' },
                },
            },
            password_hash: DataTypes.STRING,

            user_status_key: { type: DataTypes.INTEGER, defaultValue: 1 },
            user_role_key: { type: DataTypes.INTEGER, defaultValue: 1 },
            tenant_key: DataTypes.INTEGER,
        },
        {
            tableName: 'user',
            indexes: [
                {
                    unique: true,
                    fields: ['email'],
                },
            ],
            underscored: true,

        },
    );

    return Model;
};
