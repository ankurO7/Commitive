"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {Tabs, Tab} from "@heroui/tabs";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { signIn } from "next-auth/react";

import { signUpAction, signInAction } from "@/app/actions/auth";

export default function AuthPage() {
  const [selected, setSelected] = useState<string | number>("login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Client wrapper for Sign Up
  async function handleSignUp(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await signUpAction(formData);
    
    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSelected("login"); // Switch to login tab on success
      setError("Account created! Please log in."); // Temporarily use error state for success message
    }
    setIsLoading(false);
  }

  // Client wrapper for Sign In
  async function handleSignIn(formData: FormData) {
    setIsLoading(true);
    setError(null);
    const result = await signInAction(formData);
    
    if (result?.error) {
      setError(result.error);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-default-50 px-4">
      <Card className="w-full max-w-md p-4 shadow-lg">
        <CardHeader className="flex flex-col items-center pb-0 pt-4 px-4">
          <div className="w-12 h-12 bg-primary rounded-xl mb-4 flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Commitive</h1>
        </CardHeader>

        <CardBody className="overflow-hidden mt-6">
          {error && (
            <div className={`p-3 mb-4 rounded-md text-sm text-center ${error.includes('created') ? 'bg-success/20 text-success-600' : 'bg-danger/20 text-danger-600'}`}>
              {error}
            </div>
          )}

          <Tabs fullWidth size="md" selectedKey={selected as string} onSelectionChange={(k) => { setSelected(k); setError(null); }}>
            {/* SIGN IN TAB */}
            <Tab key="login" title="Sign In">
              <form action={handleSignIn} className="flex flex-col gap-4 mt-4">
                <Button 
                  onPress={() => signIn("github", { callbackUrl: "/dashboard" })} 
                  color="default" variant="bordered" className="font-medium bg-default-100"
                >
                  Continue with GitHub
                </Button>
                
                <div className="flex items-center gap-4 py-2">
                  <Divider className="flex-1" />
                  <p className="text-tiny text-default-400 uppercase">Or email</p>
                  <Divider className="flex-1" />
                </div>

                <Input name="email" isRequired label="Email" type="email" variant="faded" />
                <Input name="password" isRequired label="Password" type="password" variant="faded" />
                
                <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
                  Login
                </Button>
              </form>
            </Tab>

            {/* SIGN UP TAB */}
            <Tab key="sign-up" title="Sign Up">
              <form action={handleSignUp} className="flex flex-col gap-4 mt-4">
                <Input name="name" isRequired label="Name" type="text" variant="faded" />
                <Input name="email" isRequired label="Email" type="email" variant="faded" />
                <Input name="password" isRequired label="Password" type="password" variant="faded" />
                
                <Button type="submit" fullWidth color="primary" isLoading={isLoading}>
                  Sign up
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}