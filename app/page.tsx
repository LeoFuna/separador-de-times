'use client';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TokensIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';

export default function Home() {
  const router = useRouter();
  const peopleCountRef = useRef('');
  const teamCountRef = useRef('');

  const onStartSeparation = () => {
    const peopleCount = parseInt(peopleCountRef.current);
    const teamCount = parseInt(teamCountRef.current);

    if (isNaN(peopleCount) || isNaN(teamCount)) {
      alert('Preencha os campos corretamente');
      return;
    }

    if (peopleCount < teamCount) {
      alert('O número de pessoas deve ser maior ou igual ao número de times');
      return;
    }

    router.push(`/teams?peopleCount=${peopleCount}&teamCount=${teamCount}`);
  };

  return (
    <main className="flex flex-col gap-8 justify-start items-center min-h-dvh mx-7">
      <div className="flex flex-col items-center mb-10 mt-40">
        <Avatar>
          <AvatarFallback className="bg-inherit">
            <TokensIcon className="text-primary h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold">Separador de Times</h1>
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label htmlFor="peopleCount">Quantas Pessoas?</Label>
        <Input
          type="number"
          onChange={(e) => (peopleCountRef.current = e.target.value)}
          id="peopleCount"
          placeholder="Pessoas"
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-4">
        <Label htmlFor="teamCount">Quantos Times?</Label>
        <Input
          type="number"
          onChange={(e) => (teamCountRef.current = e.target.value)}
          id="teamCount"
          placeholder="Times"
        />
      </div>

      <Button size="lg" onClick={onStartSeparation} className="w-full">
        Iniciar
      </Button>
    </main>
  );
}
