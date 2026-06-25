"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  Settings2Icon,
  CircleHelpIcon,
  DatabaseIcon,
  FileChartColumnIcon,
  FileTextIcon,
  MessageSquareIcon,
  PlugZapIcon,
} from "lucide-react"

const navMain = [
  {
    title: "Dashboard Snapshot",
    url: "/dashboard",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Ask Business",
    url: "/dashboard/ask",
    icon: <MessageSquareIcon />,
  },
  {
    title: "Memory Graph",
    url: "/dashboard/memory",
    icon: <DatabaseIcon />,
  },
  {
    title: "Credits & Billing",
    url: "/dashboard/billing",
    icon: <FileChartColumnIcon />,
  },
]

const navSecondary = [
  {
    title: "Integrations",
    url: "/connect",
    icon: <PlugZapIcon />,
  },
  {
    title: "Settings",
    url: "/dashboard/billing",
    icon: <Settings2Icon />,
  },
  {
    title: "Get Help",
    url: "#",
    icon: <CircleHelpIcon />,
  },
]

const documents = [
  {
    name: "Security & Privacy",
    url: "/privacy",
    icon: <FileTextIcon />,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = React.useState({
    name: "Owner",
    email: "owner@coretify.id",
    avatar: "",
  })

  React.useEffect(() => {
    const stored = localStorage.getItem("coretify_company")
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser({
          name: parsed.ownerName || parsed.name || "Owner",
          email: parsed.email || "owner@coretify.id",
          avatar: parsed.avatarUrl || "",
        })
      } catch {
        // silently fail — use defaults
      }
    }
  }, [])

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              render={<a href="/dashboard" />}
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              {/* Coretify logo */}
              <img
                src="/coretify.png"
                alt="Coretify"
                className="size-5! object-contain"
              />
              <span className="text-base font-semibold tracking-tight">
                Coretify
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
        <NavDocuments items={documents} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
