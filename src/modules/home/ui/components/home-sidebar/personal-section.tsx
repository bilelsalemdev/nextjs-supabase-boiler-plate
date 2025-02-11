"use client";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { useClerk } from "@clerk/nextjs";
import { UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

type Item = {
    label: string;
    icon: React.ElementType;
    href: string;
    auth?: boolean;
};
const items: Item[] = [
    {
        label: "Profile",
        icon: UserIcon,
        href: "/profile",
        auth: true,
    },
];
export const PersonalSection = () => {
    const pathname = usePathname();
    const clerk = useClerk();
    const { isSignedIn } = useAuth();
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, item: Item) => {
        if (item.auth && !isSignedIn) {
            e.preventDefault();
            return clerk.openSignIn()
        }
    }
    return (
        <SidebarGroup>
            <SidebarGroupLabel>You</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.label}>
                            <SidebarMenuButton
                                asChild
                                tooltip={item.label}
                                isActive={item.href === pathname}
                                onClick={(e) => handleClick(e, item)}
                            >
                                <Link
                                    href={item.href}
                                    className="flex items-center gap-4"
                                >
                                    <item.icon />
                                    <span className="text-sm ">
                                        {item.label}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
