"use client";

import React from "react";
import {Navbar,NavbarBrand,NavbarContent} from "@heroui/navbar";
import {DropdownItem, DropdownTrigger, Dropdown, DropdownMenu} from "@heroui/dropdown"
import {Avatar} from "@heroui/avatar";
import { Link } from "@heroui/link";
import { signOut } from "next-auth/react";

interface UserProps {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export default function DashboardNavbar({ user }: { user: UserProps }) {
  return (
    <Navbar isBordered maxWidth="full" className="bg-background/70 backdrop-blur-md">
      <NavbarBrand>
        <div className="w-8 h-8 bg-primary rounded-md mr-2 flex items-center justify-center shadow-sm">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <p className="font-bold text-inherit text-xl tracking-tight hidden sm:block">
          Commitive
        </p>
      </NavbarBrand>

      <NavbarContent justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name={user?.name?.charAt(0) || "U"}
              size="sm"
              src={user?.image || ""} // GitHub automatically provides this image URL
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2 border-b border-divider rounded-none">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold text-primary truncate">{user?.email}</p>
            </DropdownItem>
            <DropdownItem key="settings" href="/dashboard/settings">
              Settings
            </DropdownItem>
            <DropdownItem key="help_and_feedback">
              Help & Feedback
            </DropdownItem>
            <DropdownItem 
              key="logout" 
              color="danger" 
              className="text-danger"
              onPress={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}