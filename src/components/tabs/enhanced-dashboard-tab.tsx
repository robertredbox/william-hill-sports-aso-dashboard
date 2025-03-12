"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  ArrowUp, 
  ArrowDown, 
  Star, 
  Download, 
  Calendar, 
  Filter, 
  RefreshCw,
  Globe,
  Settings 
} from 'lucide-react';

// Function with proper TypeScript type annotation
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return `${date.getDate()}/${date.getMonth() + 1}`;
};

// Function with proper TypeScript type annotation
const getRankColor = (rank: number): string => {
  if (rank <= 3) return "#10b981"; // Green
  if (rank <= 10) return "#3b82f6"; // Blue
  if (rank <= 20) return "#f59e0b"; // Yellow
  return "#ef4444"; // Red
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

// Download data (estimated)
const downloadData = [
  { date: "2025-02-10", count: 1240 },
  { date: "2025-02-11", count: 1180 },
  { date: "2025-02-12", count: 990 },
  { date: "2025-02-13", count: 1050 },
  { date: "2025-02-14", count: 1300 },
  { date: "2025-02-15", count: 1450 },
  { date: "2025-02-16", count: 1600 },
  { date: "2025-02-17", count: 1420 },
  { date: "2025-02-18", count: 1350 },
  { date: "2025-02-19", count: 1250 },
  { date: "2025-02-20", count: 1150 },
  { date: "2025-02-21", count: 1400 },
  { date: "2025-02-22", count: 1520 },
  { date: "2025-02-23", count: 1680 },
  { date: "2025-02-24", count: 1550 },
  { date: "2025-02-25", count: 1400 },
  { date: "2025-02-26", count: 1350 },
  { date: "2025-02-27", count: 1290 },
  { date: "2025-02-28", count: 1400 },
  { date: "2025-03-01", count: 1520 },
  { date: "2025-03-02", count: 1600 },
  { date: "2025-03-03", count: 1490 },
  { date: "2025-03-04", count: 1380 },
  { date: "2025-03-05", count: 1420 },
  { date: "2025-03-06", count: 1540 },
  { date: "2025-03-07", count: 1680 },
  { date: "2025-03-08", count: 1780 },
  { date: "2025-03-09", count: 1690 },
  { date: "2025-03-10", count: 1850 }
];

// Recent app reviews
const recentReviews = [
  { date: "2025-03-10", user: "SportsFan123", rating: 5, comment: "Great app for betting on football matches. Interface is clean and easy to use." },
  { date: "2025-03-09", user: "BettingKing", rating: 4, comment: "Good app, but occasional lag during peak times." },
  { date: "2025-03-08", user: "GamblerJoe", rating: 5, comment: "Best betting app I've used. Quick payouts and great offers." },
  { date: "2025-03-06", user: "FootieExpert", rating: 3, comment: "Decent app but needs more promotions compared to competitors." },
  { date: "2025-03-05", user: "RacingFan", rating: 5, comment: "Perfect for horse racing bets. Love the live streaming feature!" }
];

export function EnhancedDashboardTab() {
  const [selectedCountry, setSelectedCountry] = useState<'uk' | 'ireland'>('uk');
  const [selectedPlatform, setSelectedPlatform] = useState<'ios' | 'android'>('ios');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1m' | '3m' | 'ytd'>('1m');
  const [showDataPanel, setShowDataPanel] = useState(false);
  const [selectedKeyword, setSelectedKeyword] = useState<string | null>(null);

  // Function to simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedPlatform === 'ios' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedPlatform('ios')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            iOS
          </Button>
          <Button 
            variant={selectedPlatform === 'android' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedPlatform('android')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            Android
          </Button>
          <Button 
            variant={selectedCountry === 'uk' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCountry('uk')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Globe className="h-4 w-4 mr-2" />
            United Kingdom
          </Button>
          <Button 
            variant={selectedCountry === 'ireland' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedCountry('ireland')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Globe className="h-4 w-4 mr-2" />
            Ireland
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={selectedTimeRange === '1m' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTimeRange('1m')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Last Month
          </Button>
          <Button 
            variant={selectedTimeRange === '3m' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTimeRange('3m')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Last 3 Months
          </Button>
          <Button 
            variant={selectedTimeRange === 'ytd' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setSelectedTimeRange('ytd')}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Year to Date
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshData}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDataPanel(!showDataPanel)}
            style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}
          >
            <Settings className="h-4 w-4 mr-2" />
            {showDataPanel ? 'Hide Details' : 'Show Details'}
          </Button>
        </div>
      </div>

      {/* Selected Data Panel */}
      {showDataPanel && (
        <Card className="bg-muted/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Data Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Currently Viewing:</strong> {selectedPlatform === 'ios' ? 'iOS' : 'Android'} data for {selectedCountry === 'uk' ? 'United Kingdom' : 'Ireland'}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Time Range:</strong> {selectedTimeRange === '1m' ? 'Last Month' : selectedTimeRange === '3m' ? 'Last 3 Months' : 'Year to Date'}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Data Last Updated:</strong> March 12, 2025
                </p>
              </div>
              <div>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>App ID:</strong> {appData[selectedPlatform][selectedCountry].id}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>App Name:</strong> {appData[selectedPlatform][selectedCountry].name}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Category:</strong> Sports
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Keyword Panel */}
      {selectedKeyword && (
        <Card className="bg-muted/50 mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>
              Keyword Details: "{selectedKeyword}"
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>iOS Rank:</strong> #{keywordRankData.find(k => k.keyword === selectedKeyword)?.ios_uk || 'N/A'}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Android Rank:</strong> #{keywordRankData.find(k => k.keyword === selectedKeyword)?.android_uk || 'N/A'}
                </p>
                <p style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
                  <strong>Volume:</strong> {keywordRankData.find(k => k.keyword === selectedKeyword)?.volume || 'N/A'}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setSelectedKeyword(null)}>Dismiss</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>App Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {appData[selectedPlatform][selectedCountry].rating} <Star className="inline h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-xs text-muted-foreground">
              {appData[selectedPlatform][selectedCountry].totalRatings.toLocaleString()} ratings
            </p>
            <div className="mt-2 text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+0.1 from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Category Rank</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              #{appData[selectedPlatform][selectedCountry].latestRank || 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              Sports - {selectedCountry === 'uk' ? 'UK' : 'IE'} {selectedPlatform === 'ios' ? 'App Store' : 'Play Store'}
            </p>
            <div className="mt-2 text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+{selectedCountry === 'uk' ? '3' : '13'} positions since last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Monthly Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {selectedPlatform === 'android' && selectedCountry === 'ireland' 
                ? appData.android.ireland.downloadsDisplayValue 
                : '43,280'}
            </div>
            <p className="text-xs text-muted-foreground">
              Estimated monthly installs
            </p>
            <div className="mt-2 text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+12.6% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium" style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Keyword Coverage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>
              {selectedPlatform === 'ios' ? '62%' : '58%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Of target keywords in top 20
            </p>
            <div className="mt-2 text-xs text-green-500 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>+4% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Download Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Download Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={downloadData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip labelFormatter={(label) => `Date: ${formatDate(label)}`} formatter={(value) => [`Downloads: ${value}`, 'Count']} />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Rank Chart */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Category Rank Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={selectedCountry === 'ireland' ? appData.ios.ireland.categoryRankings : rankHistoryData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis reversed domain={[0, 40]} />
                  <Tooltip labelFormatter={(label) => `Date: ${formatDate(label)}`} formatter={(value) => [`Rank: #${value}`, 'Rank']} />
                  <Legend />
                  <Line type="monotone" dataKey="rank" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Keyword Rankings Chart */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Keyword Rankings</CardTitle>
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
                  <YAxis 
                    type="category" 
                    dataKey="keyword" 
                    width={120}
                    onClick={(data) => setSelectedKeyword(data.value)}
                    style={{ cursor: 'pointer' }}
                  />
                  <Tooltip formatter={(value) => [`Rank: #${value}`, '']} />
                  <Legend />
                  <Bar 
                    name="iOS Rank" 
                    dataKey="ios_uk" 
                    fill="#0ea5e9"
                    onClick={(data) => setSelectedKeyword(data.keyword)}
                  >
                    {keywordRankData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRankColor(entry.ios_uk)} cursor="pointer" />
                    ))}
                  </Bar>
                  <Bar 
                    name="Android Rank" 
                    dataKey="android_uk" 
                    fill="#a855f7"
                    onClick={(data) => setSelectedKeyword(data.keyword)}
                  >
                    {keywordRankData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRankColor(entry.android_uk)} cursor="pointer" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Recent Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {recentReviews.map((review, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>{review.user}</span>
                    <div>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`inline h-3 w-3 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground" style={{ fontFamily: '"Roboto", sans-serif', fontWeight: 400 }}>{review.comment}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(review.date)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Competitor Analysis */}
      <Card>
        <CardHeader>
          <CardTitle style={{ fontFamily: '"Roboto Slab", serif', fontWeight: 500 }}>Competitor Analysis</CardTitle>
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
  );
}
