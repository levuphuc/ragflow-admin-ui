import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateChatbotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateChatbot: (name: string) => void;
}

export function CreateChatbotModal({
  open,
  onOpenChange,
  onCreateChatbot,
}: CreateChatbotModalProps) {
  const [chatbotName, setChatbotName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatbotName.trim()) {
      onCreateChatbot(chatbotName);
      setChatbotName("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tạo Chatbot Mới</DialogTitle>
          <DialogDescription>
            Nhập tên cho chatbot mới của bạn
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="chatbot-name">Tên Chatbot</Label>
              <Input
                id="chatbot-name"
                placeholder="Nhập tên chatbot..."
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={!chatbotName.trim()}>
              Lưu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
