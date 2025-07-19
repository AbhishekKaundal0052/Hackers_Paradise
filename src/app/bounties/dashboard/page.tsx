import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, DollarSign, TrendingUp } from 'lucide-react';

const mockSubmissions = [
  { id: '1', title: 'SQL Injection', status: 'approved', reward: 5000 },
  { id: '2', title: 'XSS in Comments', status: 'pending', reward: 0 },
];
const mockPayments = [
  { id: 'p1', amount: 5000, date: '2024-05-01' },
];
const mockAchievements = [
  { id: 'a1', name: 'First Bounty', icon: <Trophy className="w-5 h-5 text-yellow-400" /> },
];

export default function BountyDashboardPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-6">Bounty Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Earnings Calculator */}
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-6 h-6 text-green-400" />
                <span className="text-lg text-white font-semibold">Total Earnings</span>
              </div>
              <div className="text-2xl font-bold text-green-300">${mockPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</div>
            </CardContent>
          </Card>
          {/* Success Rate */}
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                <span className="text-lg text-white font-semibold">Success Rate</span>
              </div>
              <div className="text-2xl font-bold text-blue-300">{Math.round((mockSubmissions.filter(s => s.status === 'approved').length / mockSubmissions.length) * 100)}%</div>
            </CardContent>
          </Card>
          {/* Achievements */}
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-lg text-white font-semibold">Achievements</span>
              </div>
              <div className="flex gap-2 mt-2">
                {mockAchievements.map(a => (
                  <div key={a.id} className="flex flex-col items-center">
                    {a.icon}
                    <span className="text-xs text-gray-300 mt-1">{a.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Submissions & Leaderboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white mb-3">My Submissions</h2>
              <ul>
                {mockSubmissions.map(s => (
                  <li key={s.id} className="mb-2 flex justify-between">
                    <span className="text-gray-300">{s.title}</span>
                    <span className={`text-xs font-bold ${s.status === 'approved' ? 'text-green-400' : 'text-yellow-400'}`}>{s.status}</span>
                    <span className="text-gray-400">${s.reward}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          {/* Leaderboard */}
          <Card className="bg-slate-800/80 border-slate-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold text-white mb-3">Leaderboard</h2>
              <ul>
                <li className="mb-2 flex justify-between"><span className="text-purple-400 font-bold">You</span><span>1st</span></li>
                <li className="mb-2 flex justify-between"><span className="text-gray-300">Alice</span><span>2nd</span></li>
                <li className="mb-2 flex justify-between"><span className="text-gray-300">Bob</span><span>3rd</span></li>
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* Payment History */}
        <Card className="bg-slate-800/80 border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-white mb-3">Payment History</h2>
            <ul>
              {mockPayments.map(p => (
                <li key={p.id} className="mb-2 flex justify-between">
                  <span className="text-gray-300">${p.amount}</span>
                  <span className="text-gray-400">{p.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 