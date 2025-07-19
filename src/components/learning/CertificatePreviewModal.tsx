'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Award, Download } from 'lucide-react';

interface CertificatePreviewModalProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  courseName: string;
}

export default function CertificatePreviewModal({ open, onClose, userName, courseName }: CertificatePreviewModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="max-w-lg p-0 overflow-hidden">
            <DialogHeader className="bg-gradient-to-r from-red-700/80 to-purple-700/80 p-6">
              <DialogTitle className="flex items-center space-x-2 text-white">
                <Award className="w-6 h-6 text-yellow-400" />
                <span>Certificate Preview</span>
              </DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="bg-white rounded-b-lg p-8 flex flex-col items-center"
            >
              <div className="w-full max-w-md border-4 border-yellow-400 rounded-lg bg-gradient-to-br from-white to-yellow-50 shadow-xl p-6 text-center relative">
                <div className="absolute top-2 right-2">
                  <Award className="w-8 h-8 text-yellow-300 opacity-30" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
                <p className="text-gray-600 mb-4">This is to certify that</p>
                <div className="text-2xl font-semibold text-purple-700 mb-2">{userName}</div>
                <p className="text-gray-600 mb-4">has successfully completed the course</p>
                <div className="text-xl font-semibold text-red-600 mb-4">{courseName}</div>
                <div className="flex items-center justify-center space-x-2 mt-6">
                  <span className="text-sm text-gray-500">Hacker&apos;s Paradise</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              <DialogFooter className="mt-6">
                <Button className="cyber-button" onClick={onClose}>
                  Close
                </Button>
                <Button className="cyber-button ml-2" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
} 