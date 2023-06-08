import dbConnection from './connection.js';

export const createTable = async () => {
  try {
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS films (
      id int auto_increment,
      cim varchar(20),
      ev int,
      leiras varchar(50),
      zsaner varchar(20),
      boritokep varchar(100),
      primary key (id));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS reviews (
      id int auto_increment,
      reviewstext varchar(100),
      rating int,
      filmid int,
      felhnev varchar(100),
      primary key(id));
    `);
    await dbConnection.executeQuery(`CREATE TABLE IF NOT EXISTS felhasznalo (
      id int auto_increment,
      nev varchar(100),
      jelszo varchar(1000),
      szerep varchar(100),
      salt varchar(100),
      primary key (id));
    `);
    console.log('Table created successfully');
  } catch (err) {
    console.error(`Create table error: ${err}`);
    process.exit(1);
  }
};

export default createTable;
