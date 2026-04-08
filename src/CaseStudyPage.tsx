import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import CaseStudyTemplate, { CaseStudyData } from './components/CaseStudyTemplate';

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<CaseStudyData | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;
    
    // Attempt to load the JSON file
    import(`./data/case-studies/${slug}.json`)
      .then((module) => {
        setData(module.default as CaseStudyData);
      })
      .catch((err) => {
        console.error("Failed to load case study:", err);
        setError(true);
      });
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-12 text-center font-sans tracking-tight">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 uppercase">Case Study Not Found</h1>
        <p className="text-xl text-white/60 mb-8 max-w-2xl">
          We couldn't find the case study you're looking for.
        </p>
        <Link to="/work" className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-neutral-200 transition-colors">
          Return to Work
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F8] text-black">
        <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return <CaseStudyTemplate data={data} />;
}
