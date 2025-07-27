import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Code, Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-subtle border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <Separator className="mb-6" />
        
        <div className="text-center space-y-4">
          {/* CODTECH Badge */}
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline" className="px-4 py-2 bg-gradient-accent text-accent-foreground border-accent/30">
              <GraduationCap className="h-4 w-4 mr-2" />
              CODTECH IT Solutions
            </Badge>
          </div>

          {/* Project Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Text Summarization Tool
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Internship Project demonstrating Natural Language Processing techniques 
              for automated text summarization with extractive algorithms.
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary" className="text-xs">
              <Code className="h-3 w-3 mr-1" />
              React
            </Badge>
            <Badge variant="secondary" className="text-xs">
              <Zap className="h-3 w-3 mr-1" />
              TypeScript
            </Badge>
            <Badge variant="secondary" className="text-xs">
              NLP Algorithms
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Extractive Summarization
            </Badge>
          </div>

          {/* Certificate Note */}
          <div className="pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">📋 Completion Certificate:</strong> 
              This project demonstrates practical implementation of text summarization techniques 
              and will be evaluated for internship completion certification.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;