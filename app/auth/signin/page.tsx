"use client";

import {
  Box,
  Button,
  Callout,
  Card,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { AiFillBug } from "react-icons/ai";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("admin@issue-tracker.dev");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState(
    authError ? "Sign in failed. Please try again." : ""
  );
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email: email.trim(),
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result?.url || callbackUrl);
    router.refresh();
  };

  return (
    <Card size="3" className="w-full max-w-md shadow-sm">
      <Flex direction="column" gap="5">
        <Flex direction="column" align="center" gap="2">
          <Flex
            align="center"
            justify="center"
            className="h-12 w-12 rounded-full bg-[var(--accent-3)] text-[var(--accent-11)]"
          >
            <AiFillBug size={24} />
          </Flex>
          <Heading size="6">Welcome back</Heading>
          <Text size="2" color="gray" align="center">
            Sign in to manage issues and track project progress.
          </Text>
        </Flex>

        {error && (
          <Callout.Root color="red" role="alert">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}

        <form onSubmit={onSubmit}>
          <Flex direction="column" gap="4">
            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Email
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@company.com"
                />
              </TextField.Root>
            </label>

            <label>
              <Text as="div" size="2" mb="1" weight="medium">
                Password
              </Text>
              <TextField.Root>
                <TextField.Input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
              </TextField.Root>
            </label>

            <Button type="submit" size="3" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </Flex>
        </form>

        <Box className="rounded-md bg-[var(--gray-2)] p-3">
          <Text size="1" color="gray">
            Demo account: <strong>admin@issue-tracker.dev</strong> /{" "}
            <strong>password123</strong>
          </Text>
        </Box>

        <Text size="2" color="gray" align="center">
          <Link href="/" className="text-[var(--accent-11)] hover:underline">
            Back to dashboard
          </Link>
        </Text>
      </Flex>
    </Card>
  );
}

export default function SignInPage() {
  return (
    <Flex
      align="center"
      justify="center"
      className="min-h-[70vh] py-8"
    >
      <Suspense
        fallback={
          <Card size="3" className="w-full max-w-md">
            <Text color="gray">Loading sign in...</Text>
          </Card>
        }
      >
        <SignInForm />
      </Suspense>
    </Flex>
  );
}
