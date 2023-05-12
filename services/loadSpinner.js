import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import "./Loader/loader.module.css";

export function Loader() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);
  
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
  
      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    }, [router]);
  
    return loading ?  <div id="spinner"></div> : <div id="pause"></div>;
  }
  