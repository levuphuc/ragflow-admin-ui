import { useState } from "react";
import { Plus, LayoutGrid, Table as TableIcon, Settings, History, Radio, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConfigureChatbotModal } from "@/components/chatbots/ConfigureChatbotModal";
import { ChatHistoryViewer } from "@/components/chatbots/ChatHistoryViewer";

interface Chatbot {
  id: string;
  name: string;
  voiceRole: string;
  languageModel: string;
  lastChat: string;
  language: string;
  status: "active" | "inactive" | "error";
}

// Mock data
const mockChatbots: Chatbot[] = [
  {
    id: "1",
    name: "Hòa Thượng Tuệ Sỹ",
    voiceRole: "湾湾小何",
    languageModel: "Qwen3 235B Fast",
    lastChat: "15/10/2025 14:55",
    language: "Vietnamese",
    status: "active",
  },
  {
    id: "2",
    name: "Gia Sư Toán Học",
    voiceRole: "Friendly Teacher",
    languageModel: "GPT-4o Mini",
    lastChat: "14/10/2025 09:30",
    language: "Vietnamese",
    status: "active",
  },
];

export default function Chatbots() {
  const [viewMode, setViewMode] = useState<"card" | "table">("card");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [historyViewerOpen, setHistoryViewerOpen] = useState(false);
  const [chatbots] = useState<Chatbot[]>(mockChatbots);

  const filteredChatbots = chatbots.filter((bot) =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConfigure = (chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
    setConfigModalOpen(true);
  };

  const handleViewHistory = (chatbot: Chatbot) => {
    setSelectedChatbot(chatbot);
    setHistoryViewerOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chatbots</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý và cấu hình chatbot AI của bạn
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tạo Chatbot Mới
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Tìm kiếm chatbot..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "card" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("card")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <TableIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "card" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatbots.map((chatbot) => (
            <Card key={chatbot.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl">{chatbot.name}</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium">Voice:</span> {chatbot.voiceRole}
                        </div>
                        <div>
                          <span className="font-medium">Model:</span> {chatbot.languageModel}
                        </div>
                      </div>
                    </CardDescription>
                  </div>
                  <Badge
                    variant={chatbot.status === "active" ? "default" : "secondary"}
                  >
                    {chatbot.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Trò chuyện gần nhất:</span>
                  <span className="font-medium">{chatbot.lastChat}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleConfigure(chatbot)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Cấu hình
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewHistory(chatbot)}
                  >
                    <History className="mr-2 h-4 w-4" />
                    Lịch sử
                  </Button>
                  <Button variant="outline" size="sm">
                    <Radio className="mr-2 h-4 w-4" />
                    Thiết bị
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="mr-2 h-4 w-4" />
                    Nhận dạng
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>Voice Role</TableHead>
                <TableHead>Language Model</TableHead>
                <TableHead>Ngôn ngữ</TableHead>
                <TableHead>Trò chuyện gần nhất</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredChatbots.map((chatbot) => (
                <TableRow key={chatbot.id}>
                  <TableCell className="font-medium">{chatbot.name}</TableCell>
                  <TableCell>{chatbot.voiceRole}</TableCell>
                  <TableCell>{chatbot.languageModel}</TableCell>
                  <TableCell>{chatbot.language}</TableCell>
                  <TableCell>{chatbot.lastChat}</TableCell>
                  <TableCell>
                    <Badge
                      variant={chatbot.status === "active" ? "default" : "secondary"}
                    >
                      {chatbot.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleConfigure(chatbot)}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewHistory(chatbot)}
                    >
                      <History className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Modals */}
      {selectedChatbot && (
        <>
          <ConfigureChatbotModal
            open={configModalOpen}
            onOpenChange={setConfigModalOpen}
            chatbot={selectedChatbot}
          />
          <ChatHistoryViewer
            open={historyViewerOpen}
            onOpenChange={setHistoryViewerOpen}
            chatbot={selectedChatbot}
          />
        </>
      )}
    </div>
  );
}
