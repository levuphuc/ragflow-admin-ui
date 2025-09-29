import { 
  Database, 
  FileText, 
  Bot, 
  MessageSquare, 
  Activity, 
  Users, 
  TrendingUp,
  Clock
} from "lucide-react"
import { StatsCard } from "@/components/ui/stats-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  const systemServices = [
    { name: "Vector Database", status: "online" as const, latency: "12ms" },
    { name: "LLM API", status: "online" as const, latency: "234ms" },
    { name: "File Processor", status: "processing" as const, latency: "1.2s" },
    { name: "Queue System", status: "online" as const, latency: "5ms" },
  ]

  const recentActivity = [
    { action: "Dataset created", user: "Admin", time: "2 minutes ago", type: "create" },
    { action: "Chatbot updated", user: "User", time: "5 minutes ago", type: "update" },
    { action: "File uploaded", user: "Admin", time: "10 minutes ago", type: "upload" },
    { action: "Agent configured", user: "Admin", time: "15 minutes ago", type: "config" },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Tổng quan hệ thống RAGFlow Admin Dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Datasets"
          value={24}
          description="3 đang xử lý"
          icon={Database}
          trend={{ value: 12, label: "so với tháng trước" }}
        />
        <StatsCard
          title="Active Chatbots"
          value={8}
          description="Trên 5 domains"
          icon={Bot}
          trend={{ value: 25, label: "tăng trưởng" }}
        />
        <StatsCard
          title="Files Uploaded"
          value="1,234"
          description="245 GB tổng dung lượng"
          icon={FileText}
          trend={{ value: 8, label: "tuần này" }}
        />
        <StatsCard
          title="Chat Sessions"
          value="12,543"
          description="Hôm nay: 234"
          icon={MessageSquare}
          trend={{ value: 15, label: "so với hôm qua" }}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* System Health */}
        <Card className="lg:col-span-2 bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health
            </CardTitle>
            <CardDescription>
              Trạng thái các dịch vụ cốt lõi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemServices.map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <StatusBadge status={service.status}>
                      {service.status === "online" ? "Online" : 
                       service.status === "processing" ? "Processing" : "Offline"}
                    </StatusBadge>
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {service.latency}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Xem chi tiết Monitoring
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Hoạt động gần đây
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-2 w-2 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Xem tất cả
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Các thao tác thường dùng
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="admin" className="h-auto flex-col gap-2 p-6">
              <Database className="h-8 w-8" />
              <span>Tạo Dataset mới</span>
            </Button>
            <Button variant="admin" className="h-auto flex-col gap-2 p-6">
              <Bot className="h-8 w-8" />
              <span>Tạo Chatbot</span>
            </Button>
            <Button variant="admin" className="h-auto flex-col gap-2 p-6">
              <FileText className="h-8 w-8" />
              <span>Upload Files</span>
            </Button>
            <Button variant="admin" className="h-auto flex-col gap-2 p-6">
              <Users className="h-8 w-8" />
              <span>Quản lý Team</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}