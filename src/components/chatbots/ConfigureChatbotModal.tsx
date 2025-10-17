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
import { InfoIcon, Upload, X, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

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
  {
    name: "Gia sư tiếng Anh",
    voiceRole: "Nam thanh niên",
    introduction: "Tôi là {{assistant_name}}, một gia sư tiếng Anh với nhiều năm kinh nghiệm. Tôi giúp học viên cải thiện kỹ năng giao tiếp, ngữ pháp và từ vựng."
  },
  {
    name: "Tu sĩ Phật giáo",
    voiceRole: "Lão hòa thượng",
    introduction: "Tôi là {{assistant_name}}, một trợ lý AI chuyên về Phật học và triết lý Phật giáo. Tôi có thể giúp bạn tìm hiểu về giáo lý, thiền định, và các câu hỏi tâm linh."
  },
  {
    name: "Nhân viên Sale",
    voiceRole: "Nam thanh niên",
    introduction: "Tôi là {{assistant_name}}, chuyên viên tư vấn bán hàng. Tôi luôn nhiệt tình, thân thiện và giúp khách hàng tìm được sản phẩm phù hợp nhất."
  },
  {
    name: "Nhân viên CSKH",
    voiceRole: "Thiếu nữ",
    introduction: "Tôi là {{assistant_name}}, nhân viên chăm sóc khách hàng. Tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn giải quyết mọi vấn đề."
  },
  {
    name: "Trợ lý cá nhân",
    voiceRole: "湾湾小何",
    introduction: "Tôi là {{assistant_name}}, trợ lý cá nhân của bạn. Tôi có thể giúp bạn quản lý lịch trình, nhắc nhở công việc và tổ chức thông tin."
  },
];

const categories = [
  "Giáo dục",
  "Tôn giáo",
  "Kinh doanh",
  "Chăm sóc khách hàng",
  "Y tế",
  "Pháp lý",
  "Kỹ thuật",
  "Nghệ thuật",
];

export function ConfigureChatbotModal({
  open,
  onOpenChange,
  chatbot,
}: ConfigureChatbotModalProps) {
  const [selectedRole, setSelectedRole] = useState<string>("Tu sĩ Phật giáo");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Tôn giáo"]);
  const [voiceRole, setVoiceRole] = useState(chatbot.voiceRole);
  const [roleIntroduction, setRoleIntroduction] = useState("Tôi là {{assistant_name}}, một trợ lý AI chuyên về Phật học và triết lý Phật giáo. Tôi có thể giúp bạn tìm hiểu về giáo lý, thiền định, và các câu hỏi tâm linh.");
  const [voicePitch, setVoicePitch] = useState([50]);
  const [similarityThreshold, setSimilarityThreshold] = useState([70]);
  const [keywordsSimilarityWeight, setKeywordsSimilarityWeight] = useState([50]);
  const [topN, setTopN] = useState([5]);
  const [topK, setTopK] = useState([3]);
  const [variables, setVariables] = useState<Array<{ name: string; optional: boolean }>>([
    { name: "user_name", optional: false }
  ]);

  const handleRoleTemplateChange = (roleName: string) => {
    setSelectedRole(roleName);
    const template = roleTemplates.find(t => t.name === roleName);
    if (template) {
      setVoiceRole(template.voiceRole);
      setRoleIntroduction(template.introduction);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const addVariable = () => {
    setVariables([...variables, { name: "", optional: false }]);
  };

  const removeVariable = (index: number) => {
    setVariables(variables.filter((_, i) => i !== index));
  };

  const updateVariable = (index: number, field: "name" | "optional", value: string | boolean) => {
    const newVariables = [...variables];
    newVariables[index] = { ...newVariables[index], [field]: value };
    setVariables(newVariables);
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
            {/* Avatar Upload */}
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                </div>
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Image
                </Button>
              </div>
            </div>

            {/* Role Template */}
            <div className="space-y-3">
              <Label>Role Template</Label>
              <div className="flex flex-wrap gap-2">
                {roleTemplates.map((template) => (
                  <Badge
                    key={template.name}
                    variant={selectedRole === template.name ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleRoleTemplateChange(template.name)}
                  >
                    {template.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <Label>Categories (Lĩnh vực chuyên môn)</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategories.includes(category) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    {category}
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
              <Select value={voiceRole} onValueChange={setVoiceRole}>
                <SelectTrigger id="voice-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam thanh niên">Nam thanh niên</SelectItem>
                  <SelectItem value="Bé trai 6 tuổi">Bé trai 6 tuổi</SelectItem>
                  <SelectItem value="Thiếu nữ">Thiếu nữ</SelectItem>
                  <SelectItem value="Mẹ chồng miền Bắc">Mẹ chồng miền Bắc</SelectItem>
                  <SelectItem value="Lão hòa thượng">Lão hòa thượng</SelectItem>
                  <SelectItem value="湾湾小何">湾湾小何</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Greeting */}
            <div className="space-y-2">
              <Label htmlFor="greeting">Greeting Message</Label>
              <Textarea
                id="greeting"
                placeholder="Xin chào! Tôi có thể giúp gì cho bạn?"
                rows={2}
              />
            </div>

            {/* Empty Response */}
            <div className="space-y-2">
              <Label htmlFor="empty-response">Empty Response</Label>
              <Input
                id="empty-response"
                placeholder="Xin lỗi, tôi không hiểu câu hỏi của bạn..."
              />
            </div>

            {/* Role Introduction */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="role-intro">Role Introduction</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-md">
                      <div className="space-y-2">
                        <p className="font-semibold">Mô tả về nhân vật:</p>
                        <p className="text-sm">Bao gồm tiểu sử, tính cách, chuyên môn và các đặc điểm nổi bật của chatbot.</p>
                        <p className="font-semibold mt-2">Hướng dẫn sử dụng biến:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside">
                          <li><code className="bg-muted px-1 rounded">{`{{assistant_name}}`}</code> - Tự động thay thế bằng tên trợ lý</li>
                          <li><code className="bg-muted px-1 rounded">{`{{user_name}}`}</code> - Tên người dùng</li>
                          <li><code className="bg-muted px-1 rounded">{`{{date}}`}</code> - Ngày hiện tại</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Textarea
                id="role-intro"
                placeholder="Mô tả sơ lược về nhân vật, tiểu sử, tính cách, chuyên môn..."
                rows={5}
                value={roleIntroduction}
                onChange={(e) => setRoleIntroduction(e.target.value)}
              />
            </div>

            {/* Prompt Content (Admin Only) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="prompt-content">Prompt Content</Label>
                <Badge variant="secondary">Admin Only</Badge>
              </div>
              <Textarea
                id="prompt-content"
                readOnly
                rows={4}
                className="bg-muted font-mono text-sm"
                value={`System: You are ${chatbot.name}. ${roleIntroduction}\n\nFollow these guidelines:\n- Be helpful and friendly\n- Stay in character\n- Use the knowledge base when available`}
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
                <Label htmlFor="current-memory">
                  Current Memory
                  <span className="text-xs text-muted-foreground ml-2">
                    (Được tái tạo sau mỗi cuộc trò chuyện)
                  </span>
                </Label>
                <Button variant="outline" size="sm">
                  Clear Memory
                </Button>
              </div>
              <Textarea
                id="current-memory"
                readOnly
                rows={3}
                placeholder="Chưa có dữ liệu memory. Nếu chọn Short-term, sẽ lưu lại khoảng 6 câu hội thoại cuối cùng để phân tích góc nhìn của AI về người đối thoại."
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
                  <SelectItem value="chatgpt-nano">ChatGPT Nano</SelectItem>
                  <SelectItem value="chatgpt-mini">ChatGPT Mini</SelectItem>
                  <SelectItem value="Qwen3 235B Fast">Qwen3 235B (Fast)</SelectItem>
                  <SelectItem value="DeepSeek V3.1">DeepSeek V3.1 (Powerful)</SelectItem>
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

            {/* MCP Settings Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-sm">MCP Settings</h3>
              
              {/* Official Services */}
              <div className="space-y-2">
                <Label htmlFor="services">Official Services</Label>
                <Select>
                  <SelectTrigger id="services">
                    <SelectValue placeholder="Select services..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weather">Weather</SelectItem>
                    <SelectItem value="joke">Joke</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="news">News</SelectItem>
                    <SelectItem value="kb">Knowledge Base</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Knowledge Base */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="knowledge-base">Knowledge Base</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                    Quản lý Dataset →
                  </Button>
                </div>
                <Select>
                  <SelectTrigger id="knowledge-base">
                    <SelectValue placeholder="Chọn một hoặc nhiều dataset..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phat-hoc">Phật Học Dataset</SelectItem>
                    <SelectItem value="van-hoc">Văn Học Dataset</SelectItem>
                    <SelectItem value="lich-su">Lịch Sử Dataset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Prompt Detail Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-sm">Prompt Detail</h3>

              {/* Similarity Threshold */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Similarity Threshold</Label>
                  <span className="text-sm text-muted-foreground">
                    {similarityThreshold[0]}%
                  </span>
                </div>
                <Slider
                  value={similarityThreshold}
                  onValueChange={setSimilarityThreshold}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Keywords Similarity Weight */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Keywords Similarity Weight</Label>
                  <span className="text-sm text-muted-foreground">
                    {keywordsSimilarityWeight[0]}%
                  </span>
                </div>
                <Slider
                  value={keywordsSimilarityWeight}
                  onValueChange={setKeywordsSimilarityWeight}
                  min={0}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Top N */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Top N</Label>
                  <span className="text-sm text-muted-foreground">
                    {topN[0]}
                  </span>
                </div>
                <Slider
                  value={topN}
                  onValueChange={setTopN}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>20</span>
                </div>
              </div>

              {/* Top K */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Top K</Label>
                  <span className="text-sm text-muted-foreground">
                    {topK[0]}
                  </span>
                </div>
                <Slider
                  value={topK}
                  onValueChange={setTopK}
                  min={1}
                  max={10}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>

              {/* Rerank Model */}
              <div className="space-y-2">
                <Label htmlFor="rerank-model">Rerank Model</Label>
                <Select defaultValue="bge-reranker">
                  <SelectTrigger id="rerank-model">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bge-reranker">BGE Reranker</SelectItem>
                    <SelectItem value="cohere-rerank">Cohere Rerank</SelectItem>
                    <SelectItem value="cross-encoder">Cross Encoder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Variables */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Variables</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVariable}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Thêm biến
                  </Button>
                </div>
                <div className="space-y-2">
                  {variables.map((variable, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder="Tên biến"
                        value={variable.name}
                        onChange={(e) => updateVariable(index, "name", e.target.value)}
                        className="flex-1"
                      />
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <Switch
                          checked={variable.optional}
                          onCheckedChange={(checked) => updateVariable(index, "optional", checked)}
                        />
                        <Label className="text-sm">Optional</Label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariable(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="rounded-lg bg-muted px-4 py-2 text-sm text-muted-foreground max-w-md">
            <p className="font-medium">⚠️ Lưu ý:</p>
            <p className="mt-1">
              Thiết bị cần khởi động lại để áp dụng các thay đổi.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Hủy
            </Button>
            <Button variant="secondary">Reset</Button>
            <Button>Lưu thay đổi</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
