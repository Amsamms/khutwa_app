'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect to login after 2 seconds
    const timer = setTimeout(() => {
      router.push('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <Logo size="landing" showText={true} />
      </div>
    </div>
  );
}