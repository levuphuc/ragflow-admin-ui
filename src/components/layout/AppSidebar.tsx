import { useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Database,
  FileText,
  Bot,
  Brain,
  Settings,
  Users,
  MessageSquare,
  Search,
  Activity,
  BarChart3,
  ChevronDown,
  Home,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Datasets", url: "/datasets", icon: Database },
  { title: "Files", url: "/files", icon: FileText },
  { title: "Chatbots", url: "/chatbots", icon: Bot },
  { title: "Agents", url: "/agents", icon: Brain },
  { title: "Models", url: "/models", icon: Settings },
]

const managementItems = [
  { title: "Team", url: "/team", icon: Users },
  { title: "Chat Logs", url: "/chat-logs", icon: MessageSquare },
]

const devToolsItems = [
  { title: "Search Tester", url: "/search-tester", icon: Search },
  { title: "Monitoring", url: "/monitoring", icon: Activity },
  { title: "Tracing", url: "/tracing", icon: BarChart3 },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const [isManagementOpen, setIsManagementOpen] = useState(true)
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(true)

  const isActive = (path: string) => currentPath === path || (path !== "/" && currentPath.startsWith(path))
  
  const getNavClass = (path: string) => 
    isActive(path) 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-gradient-sidebar`} collapsible="icon">
      <SidebarContent className="p-4">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
            <Bot className="h-6 w-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="text-lg font-bold text-foreground">RAGFlow</h2>
              <p className="text-xs text-muted-foreground">Admin Dashboard</p>
            </div>
          )}
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2"}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${getNavClass(item.url)}`}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Management Section */}
        {!collapsed && (
          <Collapsible open={isManagementOpen} onOpenChange={setIsManagementOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground">
                Management
                <ChevronDown className={`h-4 w-4 transition-transform ${isManagementOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {managementItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${getNavClass(item.url)}`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Dev Tools Section */}
        {!collapsed && (
          <Collapsible open={isDevToolsOpen} onOpenChange={setIsDevToolsOpen}>
            <SidebarGroup>
              <CollapsibleTrigger className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground">
                Dev Tools
                <ChevronDown className={`h-4 w-4 transition-transform ${isDevToolsOpen ? 'rotate-180' : ''}`} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {devToolsItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <NavLink 
                            to={item.url} 
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${getNavClass(item.url)}`}
                          >
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>
    </Sidebar>
  )
}