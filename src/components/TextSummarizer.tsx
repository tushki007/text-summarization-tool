import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, FileText, Zap, Clock, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface TextStats {
  characters: number;
  words: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
}

const TextSummarizer = () => {
  const [inputText, setInputText] = useState('');
  const [summaryLength, setSummaryLength] = useState([30]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState('');

  // Calculate text statistics
  const textStats: TextStats = useMemo(() => {
    if (!inputText.trim()) {
      return { characters: 0, words: 0, sentences: 0, paragraphs: 0, readingTime: 0 };
    }

    const characters = inputText.length;
    const words = inputText.trim().split(/\s+/).filter(word => word.length > 0).length;
    const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const paragraphs = inputText.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
    const readingTime = Math.ceil(words / 200); // Average reading speed: 200 words per minute

    return { characters, words, sentences, paragraphs, readingTime };
  }, [inputText]);

  // Extract key sentences using a simple algorithm
  const extractiveSummarization = useCallback((text: string, targetLength: number): string => {
    if (!text.trim()) return '';

    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length === 0) return '';

    // Calculate sentence scores based on word frequency
    const wordFreq: { [key: string]: number } = {};
    const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 2);
    
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    // Score sentences based on word frequencies
    const sentenceScores = sentences.map(sentence => {
      const sentenceWords = sentence.toLowerCase().split(/\W+/).filter(w => w.length > 2);
      const score = sentenceWords.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
      return {
        sentence: sentence.trim(),
        score: score / sentenceWords.length || 0
      };
    });

    // Sort by score and take top sentences
    const topSentences = sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, Math.max(1, Math.ceil(sentences.length * targetLength / 100)))
      .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence));

    return topSentences.map(item => item.sentence).join('. ') + '.';
  }, []);

  // Generate summary
  const handleSummarize = useCallback(async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const generatedSummary = extractiveSummarization(inputText, summaryLength[0]);
    setSummary(generatedSummary);
    setIsProcessing(false);
    
    toast.success('Summary generated successfully!');
  }, [inputText, summaryLength, extractiveSummarization]);

  // Copy summary to clipboard
  const handleCopy = useCallback(async () => {
    if (!summary) return;
    
    try {
      await navigator.clipboard.writeText(summary);
      toast.success('Summary copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  }, [summary]);

  // Download summary as text file
  const handleDownload = useCallback(() => {
    if (!summary) return;

    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'summary.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('Summary downloaded successfully!');
  }, [summary]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <Card className="flex flex-col shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileText className="h-5 w-5 text-primary" />
            Input Text
          </CardTitle>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <BarChart3 className="h-3 w-3" />
              {textStats.words} words
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {textStats.readingTime} min read
            </div>
            <Badge variant="outline" className="text-xs">
              {textStats.sentences} sentences
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <Textarea
            placeholder="Paste your lengthy article or text here for summarization..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 min-h-[300px] resize-none border-muted focus:border-primary transition-colors"
          />
          
          <div className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Summary Length</label>
                <Badge variant="secondary">{summaryLength[0]}%</Badge>
              </div>
              <Slider
                value={summaryLength}
                onValueChange={setSummaryLength}
                max={70}
                min={10}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Concise</span>
                <span>Detailed</span>
              </div>
            </div>
            
            <Button 
              onClick={handleSummarize}
              disabled={!inputText.trim() || isProcessing}
              variant="professional"
              size="lg"
              className="w-full"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Generate Summary
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Output Section */}
      <Card className="flex flex-col shadow-card">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Zap className="h-5 w-5 text-accent" />
            Generated Summary
          </CardTitle>
          {summary && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="text-xs">
                {summary.split(' ').length} words
              </Badge>
              <Badge variant="outline" className="text-xs">
                {Math.round((summary.split(' ').length / textStats.words) * 100)}% compression
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4">
          <div className="flex-1 min-h-[300px] p-4 bg-muted/30 rounded-lg border border-border">
            {summary ? (
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {summary}
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-4 opacity-30" />
                <p className="text-sm">Your generated summary will appear here</p>
                <p className="text-xs mt-1">Enter text and click "Generate Summary" to begin</p>
              </div>
            )}
          </div>
          
          {summary && (
            <>
              <Separator />
              <div className="flex gap-2">
                <Button 
                  onClick={handleCopy}
                  variant="glass"
                  size="sm"
                  className="flex-1"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={handleDownload}
                  variant="glass"
                  size="sm"
                  className="flex-1"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TextSummarizer;