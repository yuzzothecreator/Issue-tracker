"use client";

import { Skeleton } from "@/app/components";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classnames from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--gray-5)] bg-[var(--color-background)]/95 backdrop-blur">
      <Container>
        <Flex justify="between" align="center" className="px-1 py-3">
          <Flex align="center" gap="5">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[var(--accent-11)]">
              <AiFillBug size={22} />
              <span className="hidden sm:inline">Issue Tracker</span>
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <ul className="flex items-center gap-1 sm:gap-2">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? currentPath === "/"
            : currentPath.startsWith(link.href);

        return (
          <li key={link.href}>
            <Link
              className={classnames(
                "rounded-md px-3 py-1.5 text-sm transition-colors",
                {
                  "bg-[var(--accent-3)] font-medium text-[var(--accent-11)]":
                    active,
                  "text-zinc-500 hover:bg-[var(--gray-3)] hover:text-zinc-800":
                    !active,
                }
              )}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" height="2rem" />;

  if (status === "unauthenticated") {
    return (
      <Link
        href="/auth/signin"
        className="inline-flex h-8 items-center rounded-md bg-[var(--accent-9)] px-3 text-sm font-medium text-white hover:bg-[var(--accent-10)]"
      >
        Sign in
      </Link>
    );
  }

  const name = session?.user?.name || "Account";
  const email = session?.user?.email || "";
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-8)]"
            aria-label="Open account menu"
          >
            <Avatar
              src={session?.user?.image || undefined}
              fallback={initials || "?"}
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
            <Text size="2" className="hidden md:inline max-w-[10rem] truncate">
              {name}
            </Text>
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" className="min-w-[12rem]">
          <DropdownMenu.Label>
            <Flex direction="column" gap="1">
              <Text size="2" weight="medium">
                {name}
              </Text>
              {email && (
                <Text size="1" color="gray">
                  {email}
                </Text>
              )}
            </Flex>
          </DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item
            color="red"
            onSelect={() => signOut({ callbackUrl: "/" })}
          >
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
