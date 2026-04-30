import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ElliottAIAnalyzer } from './ai-analyzer';
import {
  Brain,
  BookOpen,
  Lightbulb,
  Sparkles,
  RefreshCcw,
  Puzzle,
  PuzzleIcon,
} from 'lucide-react';

export default function Elliott() {
  return (
    <div className='flex flex-col w-full gap-2 px-8 sm:p-0'>
      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 mb-10 px-4 sm:px-0'>
        <div className='flex items-center gap-4'>
          <div className='w-1 h-10 bg-[#22C55E] rounded-lg' />
          <div className='flex flex-col'>
            <p className='text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 leading-none mb-1'>
              Strategy Hub
            </p>
            <h1 className='text-xl font-bold text-slate-900 tracking-tight leading-none'>
              Elliott Perspective
            </h1>
          </div>
        </div>
      </div>

      <Tabs defaultValue='vision' className='w-full'>
        <TabsList className='bg-slate-100/50 p-1 rounded-xl mb-8'>
          <TabsTrigger
            value='vision'
            className='flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all'
          >
            <Brain className='w-4 h-4' />
            <span className='font-bold uppercase tracking-wider text-[10px]'>
              Elliott AI Vision
            </span>
          </TabsTrigger>
          {/* <TabsTrigger
            value='pieces'
            className='flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all'
          >
            <PuzzleIcon className='w-4 h-4' />
            <span className='font-bold uppercase tracking-wider text-[10px]'>
              Elliott by Pieces
            </span>
          </TabsTrigger> */}
          <TabsTrigger
            value='rules'
            className='flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all'
          >
            <BookOpen className='w-4 h-4' />
            <span className='font-bold uppercase tracking-wider text-[10px]'>
              Rules and Guidelines
            </span>
          </TabsTrigger>
          <TabsTrigger
            value='takeaways'
            className='flex items-center gap-2 px-6 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all'
          >
            <Lightbulb className='w-4 h-4' />
            <span className='font-bold uppercase tracking-wider text-[10px]'>
              Key Takeaways
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='vision'
          className='mt-0 transition-all focus-visible:outline-none'
        >
          <ElliottAIAnalyzer />
        </TabsContent>

        <TabsContent value='rules' className='mt-0 focus-visible:outline-none'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* 1. Motive Waves */}
            <Card className='border-slate-100 shadow-sm overflow-hidden'>
              <CardHeader className='bg-slate-50/50 border-b border-slate-100 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-emerald-100 rounded-lg text-emerald-600'>
                    <Sparkles className='w-4 h-4' />
                  </div>
                  <h3 className='font-bold text-slate-900 tracking-tight'>
                    1. Motive Waves
                  </h3>
                </div>
              </CardHeader>
              <CardContent className='pt-6 space-y-6'>
                <div>
                  <h4 className='text-[10px] font-black uppercase tracking-widest text-emerald-500 mb-3'>
                    Impulse Waves (5-3-5-3-5)
                  </h4>
                  <ul className='space-y-3'>
                    <li className='flex gap-3 text-sm'>
                      <div className='w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0' />
                      <span className='text-slate-600'>
                        <strong className='text-slate-900'>
                          Subdivisions:
                        </strong>{' '}
                        Waves 1, 3, and 5 are impulses; Wave 3 must be an
                        impulse.
                      </span>
                    </li>
                    <li className='flex gap-3 text-sm'>
                      <div className='w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0' />
                      <span className='text-slate-600'>
                        <strong className='text-slate-900'>Wave 2:</strong>{' '}
                        Never moves beyond the start of Wave 1.
                      </span>
                    </li>
                    <li className='flex gap-3 text-sm'>
                      <div className='w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0' />
                      <span className='text-slate-600'>
                        <strong className='text-slate-900'>Wave 3:</strong>{' '}
                        Never the shortest wave and must move beyond Wave 1.
                      </span>
                    </li>
                    <li className='flex gap-3 text-sm'>
                      <div className='w-1 h-1 rounded-full bg-emerald-500 mt-2 shrink-0' />
                      <span className='text-slate-600'>
                        <strong className='text-slate-900'>Wave 4:</strong>{' '}
                        Never moves into the price territory of Wave 1.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='bg-slate-50 rounded-xl p-4'>
                  <h4 className='text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2'>
                    Motive Guidelines
                  </h4>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]'>
                    <div>
                      <span className='font-bold block mb-1 text-slate-900'>
                        Alternation
                      </span>
                      <p className='text-slate-500 leading-tight'>
                        W4 is usually a different pattern than W2.
                      </p>
                    </div>
                    <div>
                      <span className='font-bold block mb-1 text-slate-900'>
                        Slope
                      </span>
                      <p className='text-slate-500 leading-tight'>
                        Wave 3 typically has the steepest slope.
                      </p>
                    </div>
                    <div>
                      <span className='font-bold block mb-1 text-slate-900'>
                        Channeling
                      </span>
                      <p className='text-slate-500 leading-tight'>
                        W5 often ends near the peak of a 2-4 parallel.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='pt-4 border-t border-slate-50'>
                  <h4 className='text-[10px] font-black uppercase tracking-widest text-blue-500 mb-3'>
                    Diagonal Waves
                  </h4>
                  <div className='space-y-3 mb-3'>
                    <div className='flex items-start gap-2'>
                      <div className='px-1.5 py-0.5 bg-blue-100 text-blue-600 rounded text-[9px] font-bold'>
                        ENDING
                      </div>
                      <p className='text-[11px] text-slate-600'>
                        Occur in W5 or C; all subwaves are zigzags.
                      </p>
                    </div>
                    <div className='flex items-start gap-2'>
                      <div className='px-1.5 py-0.5 bg-indigo-100 text-indigo-600 rounded text-[9px] font-bold'>
                        LEADING
                      </div>
                      <p className='text-[11px] text-slate-600'>
                        Occur in W1 or A positions.
                      </p>
                    </div>
                  </div>
                  <div className='bg-blue-50/50 rounded-lg p-3 text-[11px] text-blue-700 border border-blue-100'>
                    <strong>Overlap:</strong> Wave 4 in a diagonal usually ends
                    within the price territory of Wave 1.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Corrective Waves */}
            <Card className='border-slate-100 shadow-sm overflow-hidden'>
              <CardHeader className='bg-slate-50/50 border-b border-slate-100 py-4'>
                <div className='flex items-center gap-3'>
                  <div className='p-2 bg-amber-100 rounded-lg text-amber-600'>
                    <RefreshCcw className='w-4 h-4' />
                  </div>
                  <h3 className='font-bold text-slate-900 tracking-tight'>
                    2. Corrective Waves
                  </h3>
                </div>
              </CardHeader>
              <CardContent className='pt-6 space-y-6'>
                <div>
                  <h4 className='text-[10px] font-black uppercase tracking-widest text-amber-500 mb-3'>
                    Zigzags & Flats
                  </h4>
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <span className='text-[10px] font-bold text-slate-400 uppercase'>
                        Zigzags (5-3-5)
                      </span>
                      <p className='text-xs text-slate-600'>
                        Wave B never exceeds Wave A start. C is often equal to
                        A.
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <span className='text-[10px] font-bold text-slate-400 uppercase'>
                        Flats (3-3-5)
                      </span>
                      <p className='text-xs text-slate-600'>
                        Subwave A is never a triangle. Wave B retraces at least
                        90%.
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100'>
                    <span className='text-[10px] font-bold text-amber-600 uppercase block mb-2 underline'>
                      Flat Variations
                    </span>
                    <div className='flex flex-col gap-2'>
                      <p className='text-[11px] text-slate-600 leading-tight'>
                        <strong className='text-slate-900'>Expanded:</strong> B
                        &gt; 105% of A, C ends beyond A.
                      </p>
                      <p className='text-[11px] text-slate-600 leading-tight'>
                        <strong className='text-slate-900'>Running:</strong> B
                        &gt; 100% of A, C fails to exceed A.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='pt-4 border-t border-slate-50'>
                  <h4 className='text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-3'>
                    Triangles (3-3-3-3-3)
                  </h4>
                  <p className='text-xs text-slate-600 mb-2'>
                    Five terminal waves (A-B-C-D-E). Occur only in Wave 4 or B
                    positions.
                  </p>
                  <div className='flex gap-2 overflow-x-auto pb-1'>
                    {['Contracting', 'Barrier', 'Expanding'].map((t) => (
                      <span
                        key={t}
                        className='text-[9px] font-bold px-2 py-1 bg-slate-100 text-slate-500 rounded uppercase tracking-tighter'
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 3. Deductive Reasoning */}
            <Card className='lg:col-span-2 border-slate-100 shadow-sm border-l-4 border-l-indigo-500'>
              <CardContent className='pt-6'>
                <div className='flex flex-col md:flex-row gap-6 items-center'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-2 mb-4'>
                      <Lightbulb className='w-5 h-5 text-indigo-500' />
                      <h3 className='font-bold text-lg text-slate-900'>
                        Application of Deductive Reasoning
                      </h3>
                    </div>
                    <p className='text-sm text-slate-600 leading-relaxed italic border-l-2 border-slate-100 pl-4 py-2 mb-4'>
                      &ldquo;When you have eliminated the impossible, whatever
                      remains... must be the truth.&rdquo; &mdash; Sherlock
                      Holmes
                    </p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                      <div>
                        <h4 className='text-xs font-bold text-slate-900 mb-2'>
                          The Preferred Count
                        </h4>
                        <p className='text-xs text-slate-500'>
                          The interpretation that satisfies the highest number
                          of rules and guidelines objectively.
                        </p>
                      </div>
                      <div>
                        <h4 className='text-xs font-bold text-slate-900 mb-2'>
                          The Alternate Count
                        </h4>
                        <p className='text-xs text-slate-500'>
                          The &ldquo;Plan B&rdquo; interpretation kept in
                          reserve if the market violates a primary rule.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-64 shrink-0 p-4 bg-indigo-50/30 rounded-2xl border border-indigo-50'>
                    <h5 className='text-[10px] font-black text-indigo-600 uppercase mb-3'>
                      Rule of Objectivity
                    </h5>
                    <p className='text-[11px] text-slate-600 leading-relaxed uppercase font-medium'>
                      Avoid &ldquo;reading into&rdquo; a chart what you want to
                      see. If a rule is violated, the count is objectively
                      wrong.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent
          value='takeaways'
          className='mt-0 focus-visible:outline-none'
        >
          <div className='w-full'>
            <Card>
              <div className='flex flex-col justify-between'>
                <div className='flex flex-col'>
                  <CardHeader>
                    <CardDescription className='text-xs'>
                      Decoding psychology, enhancing risk-return.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <ul className='my-8 space-y-3'>
                        <div className='text-[10px] font-black mb-4 uppercase tracking-[0.2em] text-slate-400'>
                          Key Principles
                        </div>
                        <li className='flex items-start gap-2 text-sm text-slate-600'>
                          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                          <span>
                            Be flexible in your Elliott Wave analysis. Market
                            conditions can change rapidly.
                          </span>
                        </li>
                        <li className='flex items-start gap-2 text-sm text-slate-600'>
                          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                          <span>
                            Do not rely solely on wave counts. Use multiple
                            technical indicators for confirmation.
                          </span>
                        </li>
                        <li className='flex items-start gap-2 text-sm text-slate-600'>
                          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                          <span>
                            Consider the larger timeframe trend to provide
                            context.
                          </span>
                        </li>
                        <li className='flex items-start gap-2 text-sm text-slate-600'>
                          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0' />
                          <span>
                            Remember that Elliott wave analysis is a
                            probabilistic method, and not a guaranteed predictor
                            of market movement.
                          </span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
