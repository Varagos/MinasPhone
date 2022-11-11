import path from 'path';
import { Sequelize } from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
const connection = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(process.cwd(), 'database.sqlite'),
  logging: false,
});

async function test() {
  try {
    await connection.authenticate();
    console.log('Connection to SQLite has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();

export { connection };
