const mysql = require('mysql2/promise');
const fs = require('fs/promises');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// ---This script will completely wipe and rebuild the database.

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true, 
};

async function resetDatabase() {
  let connection;
  try {
    // Connect to the database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to the database.');

    // Warn the user
    console.warn('\n⚠️  WARNING: This will permanently delete all data from tables:');
    console.warn('   `investments`, `proposals`, `ventures`, `users`\n');
    await new Promise(resolve => setTimeout(resolve, 4000));

    console.log('🔄 Reading schema.sql file...');
    const schemaSql = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf-8');

    console.log('🚀 Executing schema... Dropping old tables and creating new ones...');
    await connection.query(schemaSql);
    
    console.log('\n🎉 Database reset successfully!');
    console.log('   All tables are now fresh and empty, as defined in schema.sql.');

  } catch (error) {
    console.error('\n❌ Database reset failed:', error);
    // Exit with an error code to signal failure
    process.exit(1);
  } finally {
    // Ensure the connection is always closed
    if (connection) {
      await connection.end();
      console.log('\n👋 Connection closed.');
    }
  }
}

resetDatabase();