import { DataTypes, Sequelize } from "sequelize";
import { RsvpEntity } from "./entities/rsvp";
import { Dietary } from "./models/dietary";
import { config } from "./config";

// Set up the database connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: config.database.host,
  port: config.database.port,
  username: config.database.username,
  password: config.database.password,
  database: config.database.database,
});

const initRsvpModel = (sequelize: Sequelize) => {
  RsvpEntity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      dietary: {
        type: DataTypes.ENUM(...Object.values(Dietary)),
        allowNull: true,
      },
      coming: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      allergies: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      partner: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'rsvps',
    }
  );
};

initRsvpModel(sequelize);

export { sequelize };