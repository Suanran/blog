
'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useState } from 'react';

export default function ChatPage() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>(['欢迎来到聊天室！']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const response = await fetch('/api/mongodb/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        setMessages([...messages, message]);
        setMessage('');
      }
    } catch (error) {
      console.error('发送消息失败:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">聊天室</h1>
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className="p-4 bg-gray-100 rounded-lg">
              <p>{msg}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <Input 
            placeholder="输入消息..." 
            className="flex-1" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit">发送</Button>
        </form>
      </Card>
    </div>
  );
}