"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    User.init(
        {
            first_name: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: {
                //     isNull: { msg: "First Name cannot be null" },
                //     notEmpty: { msg: "First Name must not be empty" },
                //     isAlpha: { msg: "First Name must be a letter" },
                // },
            },
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            last_name: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: {
                //     isNull: { msg: "Last Name cannot be null" },
                //     notEmpty: { msg: "Last Name must not be empty" },
                //     isAlpha: { msg: "First Name must be a letter" },
                // },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                // validate: {
                //     isEmail: { msg: "Please provide a valid email" },
                // },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false,
                // validate: {
                //     isNull: { msg: "Phone number cannot be null" },
                //     notEmpty: { msg: "Phone number must not be empty" },
                //     isInt: { msg: "Phone number must be numbers" },
                // },
            },
            comments: {
                type: DataTypes.TEXT,

                // validate: {
                //     isNull: { msg: "Last Name cannot be null" },
                //     notEmpty: { msg: "Last Name must not be empty" },
                //     isAlpha: { msg: "First Name must be a letter" },
                // },
            },
        },
        {
            sequelize,
            tableName: "users",
            modelName: "User",
        }
    );
    return User;
};
