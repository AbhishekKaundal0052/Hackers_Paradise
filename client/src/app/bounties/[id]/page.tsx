import React from 'react';
import Layout from '@/components/layout/Layout';
import { Bounty, Difficulty, BountyStatus, BountyCategory } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

// Mock bounty detail data
const mockBounty: Bounty = {
  id: '1',
  title: 'SQL Injection Vulnerability in Login Form',
  description: 'Identify and exploit SQL injection vulnerabilities in the authentication system.\n\n**Technical Requirements:**\n- Test all input fields for SQLi\n- Provide PoC and remediation\n\n**Submission Guidelines:**\n- Attach PoC code\n- Include screenshots\n- Write a clear report',
  reward: 5000,
  difficulty: Difficulty.INTERMEDIATE,
  category: BountyCategory.WEB_APPLICATION,
  status: BountyStatus.OPEN,
  company: 'TechCorp Inc.',
  logo: '/api/placeholder/60/60',
  deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  submissions: [],
  tags: ['SQL Injection', 'Authentication', 'Web Security'],
  createdAt: new Date(),
  updatedAt: new Date()
};

const similarBounties = [
  { id: '2', title: 'XSS Vulnerability in User Comments', company: 'SocialMedia Ltd.' },
  { id: '3', title: 'API Rate Limiting Bypass', company: 'FinTech Solutions' },
];

export default function BountyDetailPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <Card className="bg-slate-800/80 border-slate-700 mb-6">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <img src={mockBounty.logo} alt={mockBounty.company} className="w-14 h-14 rounded bg-white object-contain" />
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{mockBounty.title}</h1>
                    <div className="flex gap-2 items-center">
                      <Badge className="bg-blue-700 text-white">${mockBounty.reward.toLocaleString()}</Badge>
                      <Badge className="bg-slate-700 text-white">{mockBounty.difficulty}</Badge>
                      <Badge className="bg-slate-600 text-white">{mockBounty.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none mb-6">
                  <p>{mockBounty.description.split('\n\n')[0]}</p>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Technical Requirements</h2>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Test all input fields for SQLi</li>
                    <li>Provide PoC and remediation</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Submission Guidelines</h2>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Attach PoC code</li>
                    <li>Include screenshots</li>
                    <li>Write a clear report</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Timeline & Milestones</h2>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Submission Deadline: {mockBounty.deadline?.toLocaleDateString()}</li>
                    <li>Review: Within 7 days of submission</li>
                    <li>Reward: Within 14 days of approval</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-white mb-2">Company Background</h2>
                  <p className="text-gray-300">TechCorp Inc. is a leading provider of secure authentication solutions for enterprises worldwide.</p>
                </div>
              </CardContent>
            </Card>
            {/* Similar Bounties */}
            <Card className="bg-slate-800/80 border-slate-700">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold text-white mb-3">Similar Bounties</h2>
                <ul>
                  {similarBounties.map(b => (
                    <li key={b.id} className="mb-2">
                      <Link href={`/bounties/${b.id}`} className="text-purple-400 hover:underline">
                        {b.title} <span className="text-gray-400">({b.company})</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
} 