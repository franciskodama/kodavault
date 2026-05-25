'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { Flame, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { useBubblePhysics } from '@/lib/hooks/useBubblePhysics';
import { Asset } from '@/lib/types';
import CryptoBubblesModal from './CryptoBubblesModal';

interface CardCryptoBubblesProps {
  allCryptos: any[];
  userAssets: Asset[];
}

export default function CardCryptoBubbles({ allCryptos, userAssets }: CardCryptoBubblesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 320, height: 240 });

  // Get user-owned symbols to highlight them in bubbles
  const userOwnedSymbols = useMemo(() => {
    const symbols = new Set<string>();
    userAssets.forEach((asset) => {
      if (asset && asset.type === 'Crypto' && asset.asset) {
        symbols.add(asset.asset.toUpperCase());
      }
    });
    return symbols;
  }, [userAssets]);

  // Extract top 9 coins by 24h volume for the card widget
  const topCoins = useMemo(() => {
    if (!allCryptos || !Array.isArray(allCryptos)) return [];
    
    // CoinGecko API data structure mapping
    return [...allCryptos]
      .sort((a, b) => (b.total_volume || 0) - (a.total_volume || 0))
      .slice(0, 9)
      .map((c) => ({
        id: c.id,
        symbol: c.symbol.toUpperCase(),
        name: c.name,
        image: c.image,
        price_change_percentage_24h: c.price_change_percentage_24h || 0,
        total_volume: c.total_volume || 0,
        market_cap: c.market_cap || 0,
      }));
  }, [allCryptos]);

  // Monitor size of card container to adapt physics boundaries
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

  const { nodes } = useBubblePhysics({
    data: topCoins,
    width: dimensions.width,
    height: dimensions.height,
    minRadius: 24,
    maxRadius: 48,
    sizeKey: 'total_volume',
    userOwnedSymbols,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="w-full border-none shadow-sm flex flex-col h-full group hover:shadow-md transition-all duration-300">
        <div className="flex flex-col h-full justify-between">
          <div>
            <CardHeader className="pb-3">
              <CardTitle className="capitalize flex items-center justify-between">
                <span className="font-semibold tracking-tight text-slate-900">
                  Market Bubbles
                </span>
                <Flame size={24} className="text-amber-500 animate-pulse" />
              </CardTitle>
            </CardHeader>

            <CardContent className="relative pb-0">
              <div 
                ref={containerRef} 
                className="relative overflow-hidden w-full h-[240px] rounded-xl bg-slate-50 border border-slate-100/50 cursor-pointer"
                onClick={() => setIsOpen(true)}
              >
                {nodes.map((node) => {
                  const isPositive = node.priceChange >= 0;
                  const absPercent = Math.abs(node.priceChange).toFixed(1);
                  const showDetailedText = node.radius > 30;

                  return (
                    <div
                      key={node.id}
                      style={{
                        position: 'absolute',
                        left: `${node.x - node.radius}px`,
                        top: `${node.y - node.radius}px`,
                        width: `${node.radius * 2}px`,
                        height: `${node.radius * 2}px`,
                        transition: 'transform 0.15s ease-out',
                      }}
                      className={`rounded-full flex flex-col items-center justify-center text-white select-none
                        ${isPositive 
                          ? 'bg-gradient-to-tr from-emerald-500/90 to-teal-600/95 border border-emerald-400/40 shadow-[0_4px_12px_rgba(16,185,129,0.2)]' 
                          : 'bg-gradient-to-tr from-rose-500/90 to-red-600/95 border border-rose-400/40 shadow-[0_4px_12px_rgba(244,63,94,0.2)]'
                        }
                        ${node.isPortfolio 
                          ? 'ring-[3px] ring-[#DDF906] ring-offset-2 ring-offset-white shadow-[0_0_15px_rgba(221,249,6,0.6)] z-10' 
                          : ''
                        }
                        hover:scale-110 hover:z-20 transition-transform duration-300
                      `}
                    >
                      {/* Token Image / Icon */}
                      {node.radius > 36 && node.image && (
                        <img 
                          src={node.image} 
                          alt={node.name} 
                          className="w-5 h-5 rounded-full mb-0.5 object-cover pointer-events-none"
                        />
                      )}

                      {/* Symbol */}
                      <span 
                        style={{ fontSize: `${node.radius * 0.36}px` }} 
                        className="font-bold tracking-tight uppercase"
                      >
                        {node.symbol}
                      </span>

                      {/* Percentage */}
                      {showDetailedText && (
                        <span 
                          style={{ fontSize: `${node.radius * 0.24}px` }} 
                          className="font-medium opacity-90"
                        >
                          {isPositive ? '+' : '-'}{absPercent}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </div>

          <CardFooter className="flex items-center justify-between p-6 pt-0 border-t border-slate-50 mt-auto">
            <div className="self-end">
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="px-4 rounded-xl text-[10px] uppercase tracking-widest group/btn transition-all"
                >
                  <span>Explore Bubbles</span>
                  <Maximize2
                    size={12}
                    className="ml-2 group-hover/btn:scale-110 transition-transform"
                  />
                </Button>
              </DialogTrigger>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                Data Refresh
              </span>
              <span className="text-xs font-semibold text-slate-900 tracking-tighter">
                Real-Time 24h
              </span>
            </div>
          </CardFooter>
        </div>
      </Card>

      <DialogContent className="max-w-[95vw] w-[1000px] h-[85vh] p-0 overflow-hidden bg-slate-900 border-slate-800 text-white rounded-2xl">
        <CryptoBubblesModal 
          allCryptos={allCryptos} 
          userOwnedSymbols={userOwnedSymbols} 
          onClose={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
