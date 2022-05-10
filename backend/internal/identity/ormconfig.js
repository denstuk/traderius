/* eslint-disable */
const fs = require("fs");
const dotenv = require("dotenv");

const error = (message) => console.log(`ERROR: ${message}`);

function strict(name) {
	if (!process.env[name]) {
		error(`missing environment variable '${name}'`);
		process.exit(1);
	}
	return process.env[name];
}

const ENVIRONMENT = process.env.NODE_ENV || "development";
const ENV_FILE = `.env.${ENVIRONMENT}`;

if (!fs.existsSync(ENV_FILE)) {
	error(`Configuration error: ${ENV_FILE} not exists`);
	process.exit(1);
}

dotenv.config({ path: ENV_FILE });

module.exports = {
	type: strict("DATABASE_TYPE"),
	host: strict("DATABASE_HOST"),
	username: strict("DATABASE_USERNAME"),
	password: strict("DATABASE_PASSWORD"),
	database: strict("DATABASE_DATABASE"),
	port: strict("DATABASE_PORT"),
	synchronize: false,
	entities: [strict("DATABASE_ENTITIES")],
	migrations: [strict("DATABASE_MIGRATIONS")],
	migrationsRun: strict("DATABASE_MIGRATIONS_RUN") === "true",
	migrationsTableName: process.env.DATABASE_MIGRATIONS_TABLE_NAME,
	cli: {
		migrationsDir: strict("DATABASE_MIGRATIONS_DIR"),
	},
};
