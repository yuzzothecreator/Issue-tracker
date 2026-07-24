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
import { FormEvent, Suspense, useEffect, useState } from "react";
import { AiFillBug } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const errorMessages: Record<string, string> = {
  OAuthAccountNotLinked:
    "This email is already used with another sign-in method.",
  OAuthSignin: "Could not start Google sign-in. Check Google OAuth settings.",
  OAuthCallback: "Google sign-in failed during callback. Check redirect URIs.",
  Configuration: "Auth configuration is incomplete. Check environment variables.",
  AccessDenied: "Access was denied.",
  Default: "Sign in failed. Please try again.",
};

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleEnabled, setGoogleEnabled] = useState(false);

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((res) => res.json())
      .then((providers) => {
        setGoogleEnabled(Boolean(providers?.google));
      })
      .catch(() => setGoogleEnabled(false));
  }, []);

  useEffect(() => {
    if (!authError) return;
    setError(errorMessages[authError] || errorMessages.Default);
  }, [authError]);

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

  const onGoogleSignIn = async () => {
    setError("");
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
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

        {googleEnabled && (
          <>
            <Button
              type="button"
              size="3"
              variant="outline"
              disabled={googleLoading || loading}
              onClick={onGoogleSignIn}
            >
              <Flex align="center" gap="2">
                <FcGoogle size={18} />
                {googleLoading ? "Redirecting to Google..." : "Continue with Google"}
              </Flex>
            </Button>

            <Flex align="center" gap="3">
              <Box className="h-px flex-1 bg-[var(--gray-5)]" />
              <Text size="1" color="gray">
                or
              </Text>
              <Box className="h-px flex-1 bg-[var(--gray-5)]" />
            </Flex>
          </>
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

            <Button type="submit" size="3" disabled={loading || googleLoading}>
              {loading ? "Signing in..." : "Sign in with email"}
            </Button>
          </Flex>
        </form>

        {!googleEnabled && (
          <Box className="rounded-md bg-amber-50 border border-amber-200 p-3">
            <Text size="1" className="text-amber-900">
              Google sign-in is not configured yet. Add{" "}
              <strong>GOOGLE_CLIENT_ID</strong> and{" "}
              <strong>GOOGLE_CLIENT_SECRET</strong> to enable it.
            </Text>
          </Box>
        )}

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
    <Flex align="center" justify="center" className="min-h-[70vh] py-8">
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
