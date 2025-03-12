"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary">William Hill Sports ASO Dashboard</h1>
          <nav className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">Last updated: March 12, 2025</div>
          </nav>
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">App Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.7</div>
              <p className="text-xs text-muted-foreground">+0.2 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">285,421</div>
              <p className="text-xs text-muted-foreground">+14% since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Keywords Ranked</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">427</div>
              <p className="text-xs text-muted-foreground">Top 10 for 83 keywords</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Category Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#12</div>
              <p className="text-xs text-muted-foreground">Sports - UK App Store</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Download Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Download Trend Chart (Placeholder)</p>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Top Keywords</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>sports betting</span>
                  <span className="text-green-500">#2</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>bet app</span>
                  <span className="text-green-500">#4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>william hill</span>
                  <span className="text-green-500">#1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>football odds</span>
                  <span className="text-green-500">#7</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>horse racing</span>
                  <span className="text-green-500">#5</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Competitive Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Competitive Analysis Chart (Placeholder)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;