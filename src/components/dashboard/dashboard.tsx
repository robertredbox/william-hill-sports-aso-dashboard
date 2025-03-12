"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend, LineChart, Line } from 'recharts';
import { ArrowUp, ArrowDown, Star, Download, Search, Award } from 'lucide-react';

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

// William Hill app data based on AppTweak API
const appData = {
  ios: {
    uk: {
      id: "465712788",
      name: "William Hill – Sports Betting",
      rating: 4.7,
      totalRatings: 172832,
      latestRank: 5, // Category rank in Sports (Free)
      topKeywords: [
        { keyword: "william hill", ranking: 1, volume: 70 },
        { keyword: "betting", ranking: 4, volume: 56 },
        { keyword: "paddy power", ranking: 4, volume: 72 },
        { keyword: "sky bet", ranking: 5, volume: 70 },
        { keyword: "bet 365", ranking: 6, volume: 76 }
      ]
    },
    ireland: {
      id: "6470913794",
      name: "William Hill: Sports Betting",
      rating: 4.6,
      totalRatings: 587,
      latestRank: 3, // Category rank in Sports (Free)
      categoryRankings: [
        { date: "2025-02-10", rank: 16 },
        { date: "2025-02-17", rank: 30 },
        { date: "2025-02-24", rank: 23 },
        { date: "2025-03-03", rank: 11 },
        { date: "2025-03-10", rank: 3 }
      ]
    }
  },
  android: {
    uk: {
      id: "com.williamhill.sports.android",
      name: "William Hill - Sports Betting",
      rating: 4.3,
      totalRatings: 29163,
      latestRank: 13, // Category rank in Sports (Free)
      topKeywords: [
        { keyword: "william hill", ranking: 1, volume: 65 },
        { keyword: "betting", ranking: 4, volume: 59 },
        { keyword: "betfred", ranking: 3, volume: 60 },
        { keyword: "betting apps", ranking: 3, volume: 55 },
        { keyword: "betmgm", ranking: 5, volume: 53 }
      ]
    },
    ireland: {
      id: "com.williamhill.app.googleplay",
      name: "William Hill - Sports Betting",
      rating: 4.2,
      totalRatings: 377,
      downloadsDisplayValue: "10,000+ downloads"
    }
  }
};

// Rank history data from UK iOS app
const rankHistoryData = [
  { date: "2025-02-10", rank: 8 },
  { date: "2025-02-17", rank: 14 },
  { date: "2025-02-24", rank: 12 },
  { date: "2025-03-03", rank: 9 },
  { date: "2025-03-10", rank: 5 }
];

// Keyword rankings data
const keywordRankData = [
  { keyword: "william hill", ios_uk: 1, android_uk: 1, volume: 70 },
  { keyword: "betting", ios_uk: 4, android_uk: 4, volume: 56 },
  { keyword: "bet", ios_uk: 8, android_uk: 7, volume: 63 },
  { keyword: "sports betting", ios_uk: 3, android_uk: 10, volume: 51 },
  { keyword: "betting app", ios_uk: 8, android_uk: 3, volume: 53 },
  { keyword: "football betting", ios_uk: 13, android_uk: 15, volume: 47 },
  { keyword: "betting sites", ios_uk: 3, android_uk: 6, volume: 49 }
];

// Top competitor apps
const competitorData = [
  { name: "bet365", ios_rating: 4.7, android_rating: 4.5, category_rank: 2 },
  { name: "Paddy Power", ios_rating: 4.7, android_rating: 4.3, category_rank: 3 },
  { name: "Sky Bet", ios_rating: 4.6, android_rating: 4.5, category_rank: 4 },
  { name: "Betfair", ios_rating: 4.7, android_rating: 4.6, category_rank: 6 },
  { name: "Ladbrokes", ios_rating: 4.6, android_rating: 4.6, category_rank: 7 }
];

// Function to get color based on rank
const getRankColor = (rank) => {
  if (rank <= 3) return "#10b981"; // Green
  if (rank <= 10) return "#3b82f6"; // Blue
  if (rank <= 20) return "#f59e0b"; // Yellow
  return "#ef4444"; // Red
};

const Dashboard = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-10 border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-primary" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>William Hill Sports ASO Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>Last updated: March 12, 2025</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>UK App Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  {appData.ios.uk.rating} <Star className="inline h-4 w-4 text-yellow-400" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {appData.ios.uk.totalRatings.toLocaleString()} ratings
                </div>
              </div>
              <div className="text-2xl font-bold mr-2 mt-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                {appData.android.uk.rating} <Star className="inline h-4 w-4 text-yellow-400" />
              </div>
              <div className="text-xs text-muted-foreground">
                {appData.android.uk.totalRatings.toLocaleString()} ratings (Android)
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Ireland App Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold mr-2" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  {appData.ios.ireland.rating} <Star className="inline h-4 w-4 text-yellow-400" />
                </div>
                <div className="text-xs text-muted-foreground">
                  {appData.ios.ireland.totalRatings.toLocaleString()} ratings
                </div>
              </div>
              <div className="text-2xl font-bold mr-2 mt-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                {appData.android.ireland.rating} <Star className="inline h-4 w-4 text-yellow-400" />
              </div>
              <div className="text-xs text-muted-foreground">
                {appData.android.ireland.totalRatings.toLocaleString()} ratings (Android)
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>UK Category Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>#{appData.ios.uk.latestRank}</div>
              <p className="text-xs text-muted-foreground">Sports - UK App Store</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+3 positions since last month</span>
              </div>
              
              <div className="text-2xl font-bold mt-4" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>#{appData.android.uk.latestRank}</div>
              <p className="text-xs text-muted-foreground">Sports - UK Play Store</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+1 position since last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Ireland Category Rank</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>#{appData.ios.ireland.latestRank}</div>
              <p className="text-xs text-muted-foreground">Sports - IE App Store</p>
              <div className="flex items-center mt-2">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-xs text-green-500">+13 positions since last month</span>
              </div>
              
              <div className="text-sm mt-4 text-gray-500">
                Android downloads: {appData.android.ireland.downloadsDisplayValue}
              </div>
            </CardContent>
          </Card>
        </div>
      
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>UK iOS Category Rank Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={rankHistoryData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis reversed domain={[0, 20]} />
                    <Tooltip labelFormatter={(label) => `Date: ${formatDate(label)}`} formatter={(value) => [`Rank: #${value}`, 'Rank']} />
                    <Line type="monotone" dataKey="rank" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Top Keywords (UK)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appData.ios.uk.topKeywords.map((keyword, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>{keyword.keyword}</span>
                    <span className="text-green-500" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>#{keyword.ranking}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>iOS vs Android UK Keyword Rankings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={keywordRankData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 20]} reversed />
                    <YAxis type="category" dataKey="keyword" width={120} />
                    <Tooltip formatter={(value) => [`Rank: #${value}`, '']} />
                    <Legend />
                    <Bar name="iOS Rank" dataKey="ios_uk" fill="#0ea5e9">
                      {keywordRankData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRankColor(entry.ios_uk)} />
                      ))}
                    </Bar>
                    <Bar name="Android Rank" dataKey="android_uk" fill="#a855f7">
                      {keywordRankData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRankColor(entry.android_uk)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Ireland iOS Category Rank Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={appData.ios.ireland.categoryRankings}
                    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={formatDate} />
                    <YAxis reversed domain={[0, 40]} />
                    <Tooltip labelFormatter={(label) => `Date: ${formatDate(label)}`} formatter={(value) => [`Rank: #${value}`, 'Rank']} />
                    <Line type="monotone" dataKey="rank" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Competitor Analysis (UK)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 text-left">App</th>
                      <th className="py-2 text-left">iOS Rating</th>
                      <th className="py-2 text-left">Android Rating</th>
                      <th className="py-2 text-left">Category Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-primary/10">
                      <td className="py-2 font-medium">William Hill</td>
                      <td className="py-2">{appData.ios.uk.rating} <Star className="inline h-3 w-3 text-yellow-400" /></td>
                      <td className="py-2">{appData.android.uk.rating} <Star className="inline h-3 w-3 text-yellow-400" /></td>
                      <td className="py-2 font-medium">#{appData.ios.uk.latestRank}</td>
                    </tr>
                    {competitorData.map((competitor, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2">{competitor.name}</td>
                        <td className="py-2">{competitor.ios_rating} <Star className="inline h-3 w-3 text-yellow-400" /></td>
                        <td className="py-2">{competitor.android_rating} <Star className="inline h-3 w-3 text-yellow-400" /></td>
                        <td className="py-2">#{competitor.category_rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;