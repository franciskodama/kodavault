'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Sparkles,
  RefreshCcw,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import Image from 'next/image';

interface WavePoint {
  label: string;
  x: number;
  y: number;
  type?: string;
}

interface AnalysisData {
  waves: WavePoint[];
  interpretation: {
    strategy_bullets?: string[];
    preferred_count_reasoning?: string;
    rules_verified: string[];
    guidelines_observed: string;
    alternate_count?: string;
  };
}

export function ElliottAIAnalyzer() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onPaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of Array.from(items)) {
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        if (file) handleFile(file);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    setError(null);
    try {
      const response = await fetch('/api/elliott-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Analysis failed');
      }
      setResult(data);
      toast.success('Elliott Wave Analysis Complete!');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Something went wrong.');
      toast.error('AI Analysis failed. Try again.');
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setError(null);
    setAnalyzing(false);
  };

  return (
    <Card className='bg-[#0F172A] border-slate-800 text-white overflow-hidden shadow-2xl relative mb-8'>
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500' />
      <CardHeader className='pb-4 border-b border-white/5 bg-white/[0.02]'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-slate-800/50 rounded-lg'>
              <Sparkles className='w-5 h-5 text-indigo-400 font-bold' />
            </div>
            <div className='flex flex-col'>
              <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mb-0.5'>
                AI Powered
              </p>
              <CardTitle className='text-lg font-bold tracking-wide text-white uppercase'>
                Elliott AI Vision
              </CardTitle>
            </div>
          </div>
          <Button
            variant='ghost'
            size='sm'
            onClick={reset}
            className='text-slate-500 hover:text-white hover:bg-white/5'
          >
            <RefreshCcw className='w-4 h-4 mr-2' />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className='pt-6'>
        {!image ? (
          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onPaste={onPaste}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-12 px-8 cursor-pointer transition-all duration-300',
              isDragOver
                ? 'border-indigo-500 bg-indigo-500/10 scale-[0.98]'
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
            )}
          >
            <input
              type='file'
              ref={fileInputRef}
              className='hidden'
              accept='image/*'
              onChange={(e) =>
                e.target.files?.[0] && handleFile(e.target.files[0])
              }
            />
            <div className='p-4 bg-slate-800 rounded-full mb-4'>
              <Upload className='w-8 h-8 text-indigo-400' />
            </div>
            <h3 className='text-md font-bold text-slate-200 mb-1 uppercase tracking-wider'>
              Drop Chart or Paste Image
            </h3>
            <p className='text-xs text-slate-500 text-center max-w-[250px]'>
              Drag and drop your screenshot here, or just Ctrl+V from anywhere.
            </p>
          </div>
        ) : (
          <div className='flex flex-col gap-6'>
            <div className='relative rounded-2xl overflow-hidden border border-slate-800 group bg-black/40'>
              <Image
                src={image}
                alt='Chart to analyze'
                width={1600}
                height={900}
                className='w-full h-auto block opacity-80'
                unoptimized
                priority
              />

              {/* Analysis Overlay - Removed for text-only analysis */}

              {analyzing && (
                <div className='absolute inset-0 bg-indigo-900/40 backdrop-blur-sm flex flex-col items-center justify-center'>
                  <div className='flex flex-col items-center'>
                    <RefreshCcw className='w-12 h-12 text-white animate-spin mb-4' />
                    <p className='text-white font-black tracking-widest uppercase text-sm animate-pulse'>
                      Gemini decoding waves...
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className='flex flex-col gap-4'>
              {!result ? (
                <Button
                  onClick={handleAnalyze}
                  disabled={analyzing}
                  className='w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase py-6 text-md shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all transform hover:scale-[1.01]'
                >
                  {analyzing ? (
                    <span className='flex items-center gap-2'>
                      <RefreshCcw className='w-5 h-5 animate-spin' />
                      Processing Chart...
                    </span>
                  ) : (
                    <span className='flex items-center gap-2'>
                      <Sparkles className='w-5 h-5' />
                      Analyze Elliott Potential
                    </span>
                  )}
                </Button>
              ) : (
                <div className='flex flex-col gap-4'>
                  {/* Primary Reasoning */}
                  <div className='bg-slate-900/50 border border-slate-800 rounded-xl p-6 relative overflow-hidden'>
                    <div className='absolute top-0 right-0 p-3 opacity-10'>
                      <ImageIcon className='w-20 h-20 text-indigo-400' />
                    </div>
                    <div className='flex items-center gap-2 mb-3'>
                      <CheckCircle2 className='w-4 h-4 text-emerald-400' />
                      <h4 className='text-md font-bold uppercase tracking-[0.2em] text-slate-400'>
                        Preferred Count Strategy
                      </h4>
                    </div>
                    <div className='flex flex-col gap-3 relative z-10'>
                      {(() => {
                        const bullets = result.interpretation.strategy_bullets;
                        const reasoning =
                          result.interpretation.preferred_count_reasoning;

                        const displayBullets =
                          bullets && bullets.length > 0
                            ? bullets
                            : reasoning
                            ? [reasoning]
                            : ['Analyzing wave patterns and market cycles...'];

                        return displayBullets.map((bullet, idx) => (
                          <div
                            key={idx}
                            className='flex gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.05] transition-colors group/bullet shadow-inner'
                          >
                            <div className='flex flex-col items-center pt-1.5 shrink-0'>
                              <div className='w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)] group-hover/bullet:scale-125 transition-transform' />
                            </div>
                            <p className='text-sm text-slate-300 leading-relaxed'>
                              {bullet}
                            </p>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* Rules & Guidelines Grid */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div className='bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-5'>
                      <h5 className='text-md font-bold uppercase tracking-widest text-emerald-400 mb-3'>
                        Rules Verified
                      </h5>
                      <div className='flex flex-wrap gap-2'>
                        {result.interpretation.rules_verified.map(
                          (rule, idx) => (
                            <div
                              key={idx}
                              className='flex bg-emerald-500/10 px-4 py-2 rounded-md border border-emerald-500/20'
                            >
                              <span className='text-sm text-emerald-300 leading-relaxed'>
                                {rule}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className='bg-indigo-500/5 border border-indigo-500/10 rounded-xl p-5'>
                      <h5 className='text-md font-bold uppercase tracking-widest text-indigo-400 mb-3'>
                        Key Guidelines
                      </h5>
                      <p className='text-sm text-slate-400 leading-relaxed'>
                        {result.interpretation.guidelines_observed}
                      </p>
                    </div>
                  </div>

                  {/* Alternate Count */}
                  {result.interpretation.alternate_count && (
                    <div className='bg-amber-500/5 border border-amber-500/10 rounded-xl p-4'>
                      <h5 className='text-sm uppercase tracking-widest text-amber-400 mb-2'>
                        Alternate Perspective
                      </h5>
                      <p className='text-sm text-amber-200/70'>
                        {result.interpretation.alternate_count}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className='bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center gap-3'>
                  <AlertCircle className='w-5 h-5' />
                  <p className='text-xs font-bold'>{error}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
