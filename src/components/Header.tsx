import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Brain, Sparkles, Award } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-subtle border-b border-border">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center space-y-6">
          {/* Main Title */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary animate-pulse-glow" />
                <Sparkles className="h-4 w-4 text-accent absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TextSummarize AI
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced Natural Language Processing tool for intelligent text summarization. 
              Transform lengthy articles into concise, meaningful summaries.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Badge variant="outline" className="px-3 py-1 bg-background/80 backdrop-blur-sm">
              <Brain className="h-3 w-3 mr-1" />
              NLP Powered
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-background/80 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Extractive Algorithm
            </Badge>
            <Badge variant="outline" className="px-3 py-1 bg-background/80 backdrop-blur-sm">
              <Award className="h-3 w-3 mr-1" />
              CODTECH Certified
            </Badge>
          </div>

          <Separator className="max-w-md mx-auto" />
          
          {/* Instructions */}
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 max-w-3xl mx-auto border border-border/50">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">How to use:</strong> Paste your lengthy article in the input area, 
              adjust the summary length using the slider, and click "Generate Summary" to create a concise version 
              using advanced text processing algorithms.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;