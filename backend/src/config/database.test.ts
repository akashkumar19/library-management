import { initializeDatabase } from './database';

describe('initializeDatabase', () => {
  it('should create a new database connection', async () => {
    const db = await initializeDatabase();
    expect(db).toBeInstanceOf(Object);
  });

  it('should create the borrowers table', async () => {
    const db = await initializeDatabase();
    const result = await db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="borrowers"');
    expect(result).toBeDefined();
  });

  it('should create the books table', async () => {
    const db = await initializeDatabase();
    const result = await db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="books"');
    expect(result).toBeDefined();
  });
});