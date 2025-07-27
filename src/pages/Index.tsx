import React from 'react';
import Header from '@/components/Header';
import TextSummarizer from '@/components/TextSummarizer';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header />
      
      <main className="container mx-auto px-6 py-8">
        <div className="animate-fade-in">
          <TextSummarizer />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
