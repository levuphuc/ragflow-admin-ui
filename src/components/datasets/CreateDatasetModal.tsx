import { useState } from "react"
import { Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const PRESET_TAGS = [
  "phật học", "văn học", "lịch sử", "khoa học", "triết học", 
  "tôn giáo", "thơ ca", "tiểu thuyết", "giáo dục", "y tế"
]

interface CreateDatasetModalProps {
  onCreateDataset: (dataset: {
    name: string
    description: string
    tags: string[]
  }) => void
}

export function CreateDatasetModal({ onCreateDataset }: CreateDatasetModalProps) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const handleAddTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onCreateDataset({
        name: name.trim(),
        description: description.trim(),
        tags
      })
      // Reset form
      setName("")
      setDescription("")
      setTags([])
      setNewTag("")
      setOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddTag(newTag)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="admin" className="md:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          Tạo Dataset mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Tạo Dataset mới</DialogTitle>
          <DialogDescription>
            Tạo một tập dữ liệu mới để tổ chức tri thức theo chủ đề
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên Dataset *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Kinh Trung Bộ, Văn học Việt Nam..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn gọn về nội dung dataset..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Thẻ chủ đề</Label>
            
            {/* Selected tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add new tag */}
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Thêm thẻ mới..."
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddTag(newTag)}
                disabled={!newTag || tags.includes(newTag)}
              >
                Thêm
              </Button>
            </div>

            {/* Preset tags */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Gợi ý:</Label>
              <div className="flex flex-wrap gap-1">
                {PRESET_TAGS.filter(tag => !tags.includes(tag)).map((tag) => (
                  <Button
                    key={tag}
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 px-2 text-xs"
                    onClick={() => handleAddTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={!name.trim()}>
              Tạo Dataset
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}