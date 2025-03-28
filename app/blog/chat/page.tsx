
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ChatPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">聊天室</h1>
        <div className="space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <p>欢迎来到聊天室！</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Input placeholder="输入消息..." className="flex-1" />
          <Button>发送</Button>
        </div>
      </Card>
    </div>
  );
}