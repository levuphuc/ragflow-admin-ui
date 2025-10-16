import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Trash2, Volume2, User, Bot, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistoryViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatbot: {
    id: string;
    name: string;
  };
}

interface Message {
  id: string;
  type: "user" | "assistant" | "tool";
  content: string;
  timestamp: string;
  audioAvailable?: boolean;
  source?: string;
  responseTime?: number;
}

interface ChatSession {
  id: string;
  preview: string;
  messageCount: number;
  lastMessageTime: string;
  messages: Message[];
}

// Mock data
const mockSessions: ChatSession[] = [
  {
    id: "1",
    preview: "Xin hỏi về thiền định...",
    messageCount: 12,
    lastMessageTime: "15/10/2025 14:55",
    messages: [
      {
        id: "m1",
        type: "user",
        content: "Xin hỏi về thiền định trong Phật giáo?",
        timestamp: "14:50",
        audioAvailable: true,
      },
      {
        id: "m2",
        type: "assistant",
        content:
          "Thiền định (Samādhi) là một trong Tam Học trong Phật giáo, bên cạnh Giới và Tuệ. Thiền định giúp tâm trí được tập trung, thanh tịnh và phát triển trí tuệ.",
        timestamp: "14:51",
        source: "Phật Học Dataset",
        responseTime: 1.2,
      },
      {
        id: "m3",
        type: "user",
        content: "Có những phương pháp thiền nào?",
        timestamp: "14:53",
        audioAvailable: true,
      },
      {
        id: "m4",
        type: "tool",
        content: "Đang tìm kiếm trong Knowledge Base...",
        timestamp: "14:53",
      },
      {
        id: "m5",
        type: "assistant",
        content:
          "Có nhiều phương pháp thiền định như: Thiền Vipassanā (Minh sát), Thiền Samatha (Chỉ), Thiền Niệm Phật, và Thiền Tọa. Mỗi phương pháp có mục đích và kỹ thuật riêng.",
        timestamp: "14:54",
        source: "Phật Học Dataset, Kinh Trung Bộ",
        responseTime: 0.8,
      },
    ],
  },
  {
    id: "2",
    preview: "Giải thích về Tứ Diệu...",
    messageCount: 8,
    lastMessageTime: "14/10/2025 09:30",
    messages: [
      {
        id: "m1",
        type: "user",
        content: "Tứ Diệu Đế là gì?",
        timestamp: "09:28",
        audioAvailable: true,
      },
      {
        id: "m2",
        type: "assistant",
        content:
          "Tứ Diệu Đế là bốn chân lý cao quý mà Đức Phật đã giảng dạy: Khổ Đế, Tập Đế, Diệt Đế và Đạo Đế.",
        timestamp: "09:29",
        source: "Phật Học Dataset",
        responseTime: 1.0,
      },
    ],
  },
];

export function ChatHistoryViewer({
  open,
  onOpenChange,
  chatbot,
}: ChatHistoryViewerProps) {
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(
    mockSessions[0]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle>Lịch sử trò chuyện - {chatbot.name}</DialogTitle>
          <DialogDescription>
            Xem lại các cuộc hội thoại đã diễn ra với chatbot
          </DialogDescription>
        </DialogHeader>

        <div className="flex h-[70vh]">
          {/* Left Column - Session List */}
          <div className="w-80 border-r bg-muted/20">
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {mockSessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => setSelectedSession(session)}
                    className={cn(
                      "w-full text-left p-3 rounded-lg border transition-colors",
                      selectedSession?.id === session.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background hover:bg-muted border-border"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-sm line-clamp-1">
                        {session.preview}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 shrink-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle delete
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs opacity-80">
                      <Badge variant="secondary" className="text-xs">
                        {session.messageCount} tin nhắn
                      </Badge>
                      <span>{session.lastMessageTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Column - Conversation Details */}
          <div className="flex-1 flex flex-col">
            {selectedSession ? (
              <>
                <div className="px-6 py-4 border-b bg-muted/20">
                  <h3 className="font-semibold">Chi tiết cuộc hội thoại</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedSession.lastMessageTime} • Device ID: #12345
                  </p>
                </div>

                <ScrollArea className="flex-1 px-6 py-4">
                  <div className="space-y-6">
                    {selectedSession.messages.map((message) => (
                      <div key={message.id}>
                        {message.type === "user" && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <User className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">User</span>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                                {message.audioAvailable && (
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Volume2 className="h-3 w-3" />
                                  </Button>
                                )}
                                {message.audioAvailable && (
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <Download className="h-3 w-3" />
                                  </Button>
                                )}
                              </div>
                              <div className="bg-muted rounded-lg p-3 text-sm">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}

                        {message.type === "assistant" && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                              <Bot className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">
                                  {chatbot.name}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                              </div>
                              <div className="bg-primary/5 rounded-lg p-3 text-sm border border-primary/10">
                                {message.content}
                              </div>
                              {message.source && (
                                <div className="mt-2 text-xs text-muted-foreground">
                                  📚 Nguồn: {message.source}
                                  {message.responseTime && (
                                    <span className="ml-2">
                                      • ⏱️ {message.responseTime}s
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        {message.type === "tool" && (
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                              <Wrench className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm text-muted-foreground">
                                  System
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {message.timestamp}
                                </span>
                              </div>
                              <div className="bg-muted/50 rounded-lg p-3 text-sm italic text-muted-foreground">
                                {message.content}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="px-6 py-4 border-t flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Markdown
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                Chọn một cuộc hội thoại để xem chi tiết
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
