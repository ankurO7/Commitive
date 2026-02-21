import React from "react";
import {Navbar,NavbarBrand,NavbarContent,NavbarItem } from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { Card, CardHeader, CardBody } from "@heroui/card";

export default function CommitiveLandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navigation */}
      <Navbar isBordered maxWidth="xl">
        <NavbarBrand>
          <div className="w-8 h-8 bg-primary rounded-md mr-2 flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <p className="font-bold text-inherit text-xl tracking-tight">Commitive</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <Link color="foreground" href="#features">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signin" variant="flat" className="font-medium">
              Sign In with GitHub
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">

        <section className="flex flex-col items-center justify-center text-center py-24 px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl leading-tight">
            Stop Switching Tabs. <br className="hidden md:block" />
            Start&nbsp;<span className="text-secondary">Shipping.</span>
          </h1>
          <p className="text-xl text-default-500 max-w-2xl mb-10 leading-relaxed">
            Commitive tracks your open-source contributions, lists your active PRs and issues by priority, and lets you jump straight into the action—no endless scrolling required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button color="primary" size="lg" className="font-semibold px-8">
              Start Prioritizing Now
            </Button>
            <Button color="default" variant="bordered" size="lg" className="px-8">
              View on GitHub
            </Button>
          </div>
        </section>


        <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built to End Notification Fatigue</h2>
            <p className="text-default-500 text-lg max-w-2xl mx-auto">
              Stop letting maintainer replies slip through the cracks. Everything you need to action is organized in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 border-none bg-default-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-xl mb-2">Centralized Hub</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 leading-relaxed">
                  View all your active repositories, issues, and Pull Requests in one unified dashboard.
                </p>
              </CardBody>
            </Card>

            <Card className="p-4 border-none bg-default-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-xl mb-2">Custom Priority</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 leading-relaxed">
                  Take control of your workflow. Set custom priorities so the most critical PRs automatically bubble up to the top.
                </p>
              </CardBody>
            </Card>

            <Card className="p-4 border-none bg-default-50 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-xl mb-2">One-Click Actions</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <p className="text-default-500 leading-relaxed">
                  Hop directly from Commitive to the exact GitHub thread you need. Spend less time searching and more time coding.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>


        <section className="bg-primary-50 dark:bg-primary-900/20 py-24 px-6 mt-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Perfect for Open Source Sprints</h2>
            <p className="text-lg text-default-600 dark:text-default-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Whether you are managing daily open-source contributions or participating in high-volume events like Hacktoberfest, Commitive keeps your PRs and maintainer reviews organized across multiple organizations.
            </p>
            <Button color="primary" variant="shadow" size="lg" className="font-semibold px-10">
              Get Started for Free
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-default-400 border-t border-divider">
        <p>© {new Date().getFullYear()} Commitive. Built for open-source developers.</p>
      </footer>
    </div>
  );
}