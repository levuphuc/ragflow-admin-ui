import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfigureChatbotModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chatbot: {
    id: string;
    name: string;
    voiceRole: string;
    languageModel: string;
  };
}

const roleTemplates = [
  "Gia sư",
  "Tu sĩ",
  "CSKH",
  "Trợ lý cá nhân",
  "Chuyên gia tài chính",
];

export function ConfigureChatbotModal({
  open,
  onOpenChange,
  chatbot,
}: ConfigureChatbotModalProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["Tu sĩ"]);
  const [voicePitch, setVoicePitch] = useState([50]);

  const toggleRole = (role: string) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Cấu hình Chatbot: {chatbot.name}</DialogTitle>
          <DialogDescription>
            Tùy chỉnh vai trò, giọng nói và các thiết lập nâng cao cho chatbot
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-6 mt-6">
            {/* Role Template */}
            <div className="space-y-3">
              <Label>Role Template</Label>
              <div className="flex flex-wrap gap-2">
                {roleTemplates.map((role) => (
                  <Badge
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleRole(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Assistant Name */}
            <div className="space-y-2">
              <Label htmlFor="assistant-name">Assistant Name</Label>
              <Input
                id="assistant-name"
                defaultValue={chatbot.name}
                placeholder="Nhập tên trợ lý..."
              />
            </div>

            {/* Communication Language */}
            <div className="space-y-2">
              <Label htmlFor="language">Communication Language</Label>
              <Select defaultValue="vi">
                <SelectTrigger id="language">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vi">Tiếng Việt</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
                  <SelectItem value="ja">日本語</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Voice Role */}
            <div className="space-y-2">
              <Label htmlFor="voice-role">Voice Role</Label>
              <Select defaultValue={chatbot.voiceRole}>
                <SelectTrigger id="voice-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="湾湾小何">湾湾小何</SelectItem>
                  <SelectItem value="Friendly Teacher">Friendly Teacher</SelectItem>
                  <SelectItem value="Professional">Professional Voice</SelectItem>
                  <SelectItem value="Warm">Warm & Caring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Role Introduction */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="role-intro">Role Introduction</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Sử dụng biến {`{{assistant_name}}`} để tự động thay thế tên
                        trợ lý
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="role-intro"
                placeholder="Tôi là {{assistant_name}}, một trợ lý AI..."
                rows={4}
                defaultValue="Tôi là {{assistant_name}}, một trợ lý AI chuyên về Phật học và triết lý Phật giáo. Tôi có thể giúp bạn tìm hiểu về giáo lý, thiền định, và các câu hỏi tâm linh."
              />
            </div>

            {/* Memory Type */}
            <div className="space-y-2">
              <Label htmlFor="memory-type">Memory Type</Label>
              <Select defaultValue="short-term">
                <SelectTrigger id="memory-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="short-term">Short-term</SelectItem>
                  <SelectItem value="long-term">Long-term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Current Memory */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="current-memory">Current Memory</Label>
                <Button variant="outline" size="sm">
                  Clear Memory
                </Button>
              </div>
              <Textarea
                id="current-memory"
                readOnly
                rows={3}
                placeholder="Chưa có dữ liệu memory..."
                className="bg-muted"
              />
            </div>

            {/* Language Model */}
            <div className="space-y-2">
              <Label htmlFor="language-model">Language Model</Label>
              <Select defaultValue={chatbot.languageModel}>
                <SelectTrigger id="language-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GPT-4o Mini">GPT-4o Mini</SelectItem>
                  <SelectItem value="GPT-4o">GPT-4o</SelectItem>
                  <SelectItem value="Qwen3 235B Fast">Qwen3 235B Fast</SelectItem>
                  <SelectItem value="DeepSeek V3">DeepSeek V3</SelectItem>
                  <SelectItem value="Claude Sonnet">Claude Sonnet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>

          {/* Advanced Settings Tab */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            {/* Voice Recognition Speed */}
            <div className="space-y-2">
              <Label htmlFor="recognition-speed">Voice Recognition Speed</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="recognition-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fast">Fast</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Character Speech Speed */}
            <div className="space-y-2">
              <Label htmlFor="speech-speed">Character Speech Speed</Label>
              <Select defaultValue="normal">
                <SelectTrigger id="speech-speed">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="fast">Fast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Voice Pitch */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Voice Pitch</Label>
                <span className="text-sm text-muted-foreground">
                  {voicePitch[0]}%
                </span>
              </div>
              <Slider
                value={voicePitch}
                onValueChange={setVoicePitch}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Official Services */}
            <div className="space-y-2">
              <Label htmlFor="services">Official Services</Label>
              <Select>
                <SelectTrigger id="services">
                  <SelectValue placeholder="Select services..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weather">Weather</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="kb">Knowledge Base</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Knowledge Base */}
            <div className="space-y-2">
              <Label htmlFor="knowledge-base">Knowledge Base</Label>
              <Select>
                <SelectTrigger id="knowledge-base">
                  <SelectValue placeholder="Select datasets..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="phat-hoc">Phật Học Dataset</SelectItem>
                  <SelectItem value="van-hoc">Văn Học Dataset</SelectItem>
                  <SelectItem value="lich-su">Lịch Sử Dataset</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Note */}
            <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
              <p className="font-medium">⚠️ Lưu ý:</p>
              <p className="mt-1">
                Thiết bị cần khởi động lại để áp dụng các thay đổi.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button variant="secondary">Reset</Button>
          <Button>Lưu thay đổi</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
