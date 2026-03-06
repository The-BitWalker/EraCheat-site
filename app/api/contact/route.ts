import { NextRequest, NextResponse } from 'next/server';
import { turso } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, category, message } = await request.json();

    if (!name || !email || !category || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Create table if not exists
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        category TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert the contact
    const result = await turso.execute({
      sql: 'INSERT INTO contacts (name, email, category, message) VALUES (?, ?, ?, ?)',
      args: [name, email, category, message],
    });

    return NextResponse.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json({ error: 'Failed to save contact' }, { status: 500 });
  }
}
