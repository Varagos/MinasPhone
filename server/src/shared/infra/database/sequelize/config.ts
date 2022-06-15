import { Sequelize } from 'sequelize';

// Option 2: Passing parameters separately (sqlite)
const connection = new Sequelize({
  dialect: 'sqlite',
  storage: '/Users/markos/code/side-projects/MinasPhone/server/database.sqlite',
});

async function test() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
test();

export { connection };
