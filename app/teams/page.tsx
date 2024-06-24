import Content from '@/components/teams/Content';
import { Suspense } from 'react';

export default function TeamsPage() {
  return (
    <main className="flex flex-col gap-28 justify-start items-center min-h-dvh mx-7">
      <Suspense>
        <Content />
      </Suspense>
    </main>
  );
}
