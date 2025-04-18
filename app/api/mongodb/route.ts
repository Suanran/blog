import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || 'mongodb://mongo:nmSJNFFqUXDEbQgJbuvbbETTDzEviVQb@ballast.proxy.rlwy.net:56398';

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    // 测试连接
    const db = client.db();
    const collections = await db.listCollections().toArray();
    
    await client.close();
    
    return NextResponse.json({ 
      status: 'success', 
      collections: collections.map(c => c.name) 
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}