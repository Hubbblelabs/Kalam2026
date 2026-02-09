"use client"

import * as React from "react"
import Link from "next/link"
import NextImage from "next/image"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  Users,
  ShoppingCart,
  Receipt,
  Building2,
  Tags,
  Settings,
  User,
  LogOut,
  BarChart3,
  CreditCard,
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

const data = {
  navMain: [
    {
      title: "Overview",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
          icon: BarChart3,
        },
      ],
    },
    {
      title: "Management",
      items: [
        {
          title: "Events",
          url: "/admin/events",
          icon: Calendar,
        },
        {
          title: "Categories",
          url: "/admin/categories",
          icon: Tags,
        },
        {
          title: "Departments",
          url: "/admin/departments",
          icon: Building2,
        },
      ],
    },
    {
      title: "Users & Orders",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: Users,
        },
        {
          title: "Orders",
          url: "/admin/orders",
          icon: Receipt,
        },
        {
          title: "Carts",
          url: "/admin/carts",
          icon: ShoppingCart,
        },
        {
          title: "Payments",
          url: "/admin/payments",
          icon: CreditCard,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "General",
          url: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const [adminName, setAdminName] = React.useState("")
  const [adminEmail, setAdminEmail] = React.useState("")

  React.useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        if (res.ok) {
          const data = await res.json()
          if (data.success && data.data?.user) {
            setAdminName(data.data.user.name || "Admin")
            setAdminEmail(data.data.user.email || "")
          }
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
      }
    }
    fetchSession()
  }, [])

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/admin/login")
      router.refresh()
    } catch (error) {
      console.error("Sign out failed:", error)
    }
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
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin/profile">
                <User className="size-4" />
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-medium truncate">{adminName || "Admin"}</span>
                  <span className="text-xs text-muted-foreground truncate">{adminEmail}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleSignOut} className="text-red-500 hover:text-red-600 hover:bg-red-50">
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
