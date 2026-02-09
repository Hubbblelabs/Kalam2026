"use client"

import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Receipt,
  Building2,
  Tags,
  Settings,
  User,
  LogOut,
  BarChart3,
  CreditCard,
  Megaphone,
  Shield,
  ClipboardList,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { useAdminAuth } from "@/contexts/admin-auth-context"
import { getNavForRole, type AdminRole } from "@/lib/admin-permissions"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Tags,
  Building2,
  Megaphone,
  Users,
  Shield,
  ClipboardList,
  Receipt,
  CreditCard,
  Settings,
}

const roleLabelMap: Record<AdminRole, string> = {
  superadmin: "Super Admin",
  event_manager: "Event Manager",
  department_manager: "Dept Manager",
}

const roleBadgeVariant: Record<AdminRole, "default" | "secondary" | "outline"> = {
  superadmin: "default",
  event_manager: "secondary",
  department_manager: "outline",
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()
  const { user, role, logout, isLoading } = useAdminAuth()

  const navGroups = React.useMemo(() => {
    if (!role) return []
    return getNavForRole(role)
  }, [role])

  if (isLoading) {
    return (
      <Sidebar {...props}>
        <SidebarContent className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Loading...</p>
        </SidebarContent>
      </Sidebar>
    )
  }

  if (!role) {
    return (
      <Sidebar {...props}>
        <SidebarContent className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">No role assigned</p>
        </SidebarContent>
      </Sidebar>
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <NextImage
                    src="/kalam26-logo-hor-yellow.svg"
                    alt="Kalam"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Kalam 2026</span>
                  <span className="text-xs text-muted-foreground">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navGroups.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const Icon = iconMap[item.icon] || LayoutDashboard
                  const isActive =
                    item.url === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.url)
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>
                          <Icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-muted">
                <User className="size-4" />
              </div>
              <div className="flex flex-col leading-tight min-w-0">
                <span className="text-sm font-medium truncate">
                  {user?.name || "Admin"}
                </span>
                <span className="text-xs text-muted-foreground truncate">
                  {user?.email || ""}
                </span>
                {role && (
                  <Badge variant={roleBadgeVariant[role]} className="mt-1 w-fit text-[10px] px-1.5 py-0">
                    {roleLabelMap[role]}
                  </Badge>
                )}
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={logout}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <LogOut className="size-4" />
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
