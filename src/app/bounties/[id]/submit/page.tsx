'use client';
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const steps = [
  'Vulnerability Details',
  'Proof of Concept',
  'Attachments',
  'Preview & Submit',
];

export default function BountySubmissionPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    description: '',
    code: '',
    files: [],
    screenshots: [],
  });

  function nextStep() { setStep(s => Math.min(s + 1, steps.length - 1)); }
  function prevStep() { setStep(s => Math.max(s - 1, 0)); }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-slate-800/80 border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-8">
            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              {steps.map((label, idx) => (
                <div key={label} className="flex items-center">
                  <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold text-white ${idx === step ? 'bg-purple-600' : 'bg-slate-700'}`}>{idx + 1}</div>
                  {idx < steps.length - 1 && <div className="w-8 h-1 bg-slate-600 mx-2" />}
                </div>
              ))}
            </div>
            {/* Step Content */}
            {step === 0 && (
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="submission-title">Title</label>
                <input id="submission-title" title="Submission Title" placeholder="Enter a title for your submission" className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700 mb-4" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                <label className="block text-gray-300 mb-2" htmlFor="submission-description">Description</label>
                <textarea id="submission-description" title="Submission Description" placeholder="Describe the vulnerability in detail" className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700" rows={5} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            )}
            {step === 1 && (
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="submission-code">Proof of Concept (Code)</label>
                {/* Placeholder for code editor */}
                <textarea id="submission-code" title="Proof of Concept Code" placeholder="Paste your code here..." className="w-full p-2 rounded bg-slate-900 text-white border border-slate-700 font-mono" rows={8} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} />
                <div className="text-xs text-gray-400 mt-2">Syntax highlighting will be shown here.</div>
              </div>
            )}
            {step === 2 && (
              <div>
                <label className="block text-gray-300 mb-2">Attachments</label>
                {/* Placeholder for drag-and-drop file upload */}
                <div className="w-full p-6 border-2 border-dashed border-purple-500 rounded bg-slate-900 text-center text-gray-400 mb-4">Drag and drop files here</div>
                <label className="block text-gray-300 mb-2">Screenshot Annotation</label>
                {/* Placeholder for screenshot annotation tool */}
                <div className="w-full h-32 bg-slate-700 rounded flex items-center justify-center text-gray-400">Screenshot annotation tool (coming soon)</div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Preview Submission</h3>
                <div className="mb-2"><span className="font-semibold text-gray-300">Title:</span> {form.title}</div>
                <div className="mb-2"><span className="font-semibold text-gray-300">Description:</span> {form.description}</div>
                <div className="mb-2"><span className="font-semibold text-gray-300">Code:</span>
                  <pre className="bg-slate-900 text-purple-300 p-2 rounded overflow-x-auto"><code>{form.code}</code></pre>
                </div>
                <div className="mb-2"><span className="font-semibold text-gray-300">Files:</span> {form.files.length} files</div>
                <div className="mb-2"><span className="font-semibold text-gray-300">Screenshots:</span> {form.screenshots.length} screenshots</div>
              </div>
            )}
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button onClick={prevStep} disabled={step === 0} variant="secondary">Back</Button>
              {step < steps.length - 1 ? (
                <Button onClick={nextStep} variant="primary">Next</Button>
              ) : (
                <Button variant="primary">Submit</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
} 