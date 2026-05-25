'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Volume2, Landmark, CheckCircle2, TrendingUp, TrendingDown, RefreshCw, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBubblePhysics } from '@/lib/hooks/useBubblePhysics';
import { numberFormatter, currencyFormatter, numberFormatterNoDecimals } from '@/lib/utils';

interface CryptoBubblesModalProps {
  allCryptos: any[];
  userOwnedSymbols: Set<string>;
  onClose: () => void;
}

export default function CryptoBubblesModal({ allCryptos, userOwnedSymbols, onClose }: CryptoBubblesModalProps) {
  const [sizeKey, setSizeKey] = useState<'total_volume' | 'market_cap'>('total_volume');
  const [filterType, setFilterType] = useState<'all' | 'portfolio' | 'gainers' | 'losers'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredNode, setHoveredNode] = useState<any>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 900, height: 500 });

  // Update container size dynamically
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Filter and prepare data for the bubble chart
  const bubbleData = useMemo(() => {
    if (!allCryptos || !Array.isArray(allCryptos)) return [];

    let processed = allCryptos.map((c) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      image: c.image,
      price_change_percentage_24h: c.price_change_percentage_24h || 0,
      total_volume: c.total_volume || 0,
      market_cap: c.market_cap || 0,
      current_price: c.current_price || 0,
      market_cap_rank: c.market_cap_rank || 999,
    }));

    // Filter by type
    if (filterType === 'portfolio') {
      processed = processed.filter((c) => userOwnedSymbols.has(c.symbol));
    } else if (filterType === 'gainers') {
      processed = processed.filter((c) => c.price_change_percentage_24h > 0);
    } else if (filterType === 'losers') {
      processed = processed.filter((c) => c.price_change_percentage_24h < 0);
    }

    // Sort by sizeKey to take the top 60 largest coins to avoid cluttering
    processed.sort((a, b) => (b[sizeKey] || 0) - (a[sizeKey] || 0));
    
    // Return top 60 coins
    return processed.slice(0, 60);
  }, [allCryptos, filterType, sizeKey, userOwnedSymbols]);

  const { nodes } = useBubblePhysics({
    data: bubbleData,
    width: dimensions.width,
    height: dimensions.height,
    minRadius: 28,
    maxRadius: 65,
    sizeKey,
    userOwnedSymbols,
  });

  // Calculate search matching to dim non-matching bubbles
  const nodesWithSearch = useMemo(() => {
    if (!searchQuery.trim()) {
      return nodes.map(n => ({ ...n, isDimmed: false }));
    }
    const query = searchQuery.toUpperCase();
    return nodes.map(n => ({
      ...n,
      isDimmed: !n.symbol.includes(query) && !n.name.toUpperCase().includes(query),
    }));
  }, [nodes, searchQuery]);

  const hoveredCoinDetails = useMemo(() => {
    if (!hoveredNode) return null;
    return bubbleData.find((c) => c.symbol === hoveredNode.symbol);
  }, [hoveredNode, bubbleData]);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100">
      {/* Modal Header Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 border-b border-slate-800 bg-slate-900/60 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
            Crypto Market Bubbles
          </h2>
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-2 py-0.5 rounded-full bg-slate-800">
            Top 60 Active
          </span>
        </div>

        {/* Size Toggles and Groups */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Size Metric Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSizeKey('total_volume')}
              className={`rounded-lg text-xs font-semibold px-3 py-1.5 h-8 gap-1.5 transition-all
                ${sizeKey === 'total_volume' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }
              `}
            >
              <Volume2 size={14} />
              Volume
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSizeKey('market_cap')}
              className={`rounded-lg text-xs font-semibold px-3 py-1.5 h-8 gap-1.5 transition-all
                ${sizeKey === 'market_cap' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                }
              `}
            >
              <Landmark size={14} />
              Market Cap
            </Button>
          </div>

          {/* Group Filter Selector */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            {(['all', 'portfolio', 'gainers', 'losers'] as const).map((type) => (
              <Button
                key={type}
                variant="ghost"
                size="sm"
                onClick={() => setFilterType(type)}
                className={`rounded-lg text-xs font-semibold px-3 py-1.5 h-8 capitalize transition-all
                  ${filterType === type 
                    ? 'bg-slate-800 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }
                `}
              >
                {type}
              </Button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-[220px]">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="text"
              placeholder="Search coin..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9 w-full bg-slate-950 border-slate-800 rounded-xl text-xs placeholder:text-slate-500 text-white focus-visible:ring-1 focus-visible:ring-slate-700"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-500 hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Close button */}
          <button 
            onClick={onClose} 
            className="hidden md:flex p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Physics Bubble Canvas Area */}
      <div className="flex-1 relative overflow-hidden bg-slate-950" ref={containerRef}>
        {dimensions.width > 0 && dimensions.height > 0 && (
          <div className="absolute inset-0">
            {nodesWithSearch.map((node) => {
              const isPositive = node.priceChange >= 0;
              const absPercent = Math.abs(node.priceChange).toFixed(1);
              const showPercent = node.radius > 32;
              const showImage = node.radius > 40;

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${node.x - node.radius}px`,
                    top: `${node.y - node.radius}px`,
                    width: `${node.radius * 2}px`,
                    height: `${node.radius * 2}px`,
                    transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                  }}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`rounded-full flex flex-col items-center justify-center text-white select-none cursor-pointer
                    ${isPositive 
                      ? 'bg-gradient-to-tr from-emerald-500/80 to-teal-600/90 border border-emerald-400/30 shadow-[0_4px_16px_rgba(16,185,129,0.15)] hover:from-emerald-500 hover:to-teal-500' 
                      : 'bg-gradient-to-tr from-rose-500/80 to-red-600/90 border border-rose-400/30 shadow-[0_4px_16px_rgba(244,63,94,0.15)] hover:from-rose-500 hover:to-red-500'
                    }
                    ${node.isPortfolio 
                      ? 'ring-[3px] ring-[#DDF906] ring-offset-2 ring-offset-slate-950 shadow-[0_0_20px_rgba(221,249,6,0.6)] z-10' 
                      : ''
                    }
                    ${node.isDimmed ? 'opacity-25 scale-90' : 'opacity-100 scale-100 hover:scale-110 hover:z-25'}
                  `}
                >
                  {/* Icon image */}
                  {showImage && node.image && (
                    <img
                      src={node.image}
                      alt={node.name}
                      className="w-6 h-6 rounded-full mb-1 object-cover pointer-events-none"
                    />
                  )}

                  {/* Symbol */}
                  <span
                    style={{ fontSize: `${node.radius * 0.34}px` }}
                    className="font-extrabold tracking-tight uppercase"
                  >
                    {node.symbol}
                  </span>

                  {/* Price percentage */}
                  {showPercent && (
                    <span
                      style={{ fontSize: `${node.radius * 0.22}px` }}
                      className="font-semibold opacity-90"
                    >
                      {isPositive ? '+' : '-'}{absPercent}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer/Detail Drawer Panel */}
      <div className="h-24 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-8 py-4 shrink-0 shadow-lg">
        {hoveredNode && hoveredCoinDetails ? (
          <div className="flex items-center justify-between w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center gap-4">
              {hoveredNode.image && (
                <img src={hoveredNode.image} alt={hoveredNode.name} className="w-10 h-10 rounded-full" />
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-white">{hoveredNode.name}</span>
                  <span className="text-xs text-slate-400 font-bold uppercase">{hoveredNode.symbol}</span>
                  <span className="text-[10px] text-slate-500 font-medium bg-slate-800 px-2 py-0.5 rounded">
                    Rank #{hoveredCoinDetails.market_cap_rank || 'N/A'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {sizeKey === 'total_volume' 
                    ? `24h Volume: $${numberFormatterNoDecimals.format(hoveredNode.value)}` 
                    : `Market Cap: $${numberFormatterNoDecimals.format(hoveredNode.value)}`
                  }
                </span>
              </div>
            </div>

            {/* Performance status & details */}
            <div className="flex items-center gap-8">
              {hoveredNode.isPortfolio && (
                <div className="flex items-center gap-2 px-3 py-1 bg-yellow-500/10 border border-[#DDF906]/35 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#DDF906]" />
                  <span className="text-xs font-semibold text-[#DDF906]">Portfolio Asset</span>
                </div>
              )}
              
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Price
                </span>
                <span className="text-base font-extrabold text-white tracking-tight">
                  {currencyFormatter(hoveredCoinDetails.current_price)}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  24h Return
                </span>
                <div className={`flex items-center gap-1 font-extrabold text-base
                  ${hoveredNode.priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}
                `}>
                  {hoveredNode.priceChange >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{hoveredNode.priceChange >= 0 ? '+' : ''}{hoveredNode.priceChange.toFixed(2)}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full text-slate-400 text-xs font-medium">
            <p className="flex items-center gap-2">
              <RefreshCw size={14} className="animate-spin text-slate-500" />
              Hover over a bubble to inspect real-time performance and portfolio statistics.
            </p>
            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-slate-500">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                <span>Gains</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                <span>Losses</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 border-[2px] border-[#DDF906] rounded-full" />
                <span>My Portfolio</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
