import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI || 'mongodb://mongo:nmSJNFFqUXDEbQgJbuvbbETTDzEviVQb@ballast.proxy.rlwy.net:56398';

export async function GET() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('blog');
    const collection = db.collection('messages');
    
    const messages = await collection.find().sort({ createdAt: -1 }).limit(10).toArray();
    
    await client.close();
    
    return NextResponse.json({
      status: 'success',
      data: messages
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message) {
      return NextResponse.json(
        { status: 'error', message: 'Message is required' },
        { status: 400 }
      );
    }

    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db('blog');
    const collection = db.collection('messages');
    
    const result = await collection.insertOne({
      message,
      createdAt: new Date()
    });
    
    await client.close();
    
    return NextResponse.json({
      status: 'success',
      data: result
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}