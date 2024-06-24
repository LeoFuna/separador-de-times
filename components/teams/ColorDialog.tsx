import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

const COLORS = {
  green: 'bg-green-600',
  red: 'bg-red-600',
  blue: 'bg-blue-600',
  yellow: 'bg-yellow-500',
};

const LABEL_ENUM = {
  green: 'Verde',
  red: 'Vermelho',
  blue: 'Azul',
  yellow: 'Amarelo',
};

export default function ColorDialog({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen: () => 'green' | 'red' | 'blue' | 'yellow';
}) {
  const [showFinalColor, setShowFinalColor] = useState(false);
  const [finalColor, setFinalColor] = useState<
    'green' | 'red' | 'blue' | 'yellow'
  >();
  const [startStopCount, setStartStopCount] = useState(false);
  useEffect(() => {
    if (!startStopCount) return;
    setTimeout(() => {
      setShowFinalColor(true);
      setStartStopCount(false);
    }, 2000);
  }, [startStopCount]);

  return (
    <Dialog
      onOpenChange={(e: boolean) => {
        setStartStopCount(e);
        setShowFinalColor(false);
        if (e) {
          setTimeout(() => {
            setFinalColor(onOpen());
          }, 250);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-1/2">
        {showFinalColor ? (
          <div
            className={cn(
              `w-full h-full ${
                COLORS[finalColor as 'green' | 'red' | 'blue' | 'yellow']
              }`
            )}
          >
            <div className="flex justify-center items-center h-full">
              <h1 className="text-3xl text-white">
                {LABEL_ENUM[finalColor as 'green' | 'red' | 'blue' | 'yellow']}
              </h1>
            </div>
          </div>
        ) : (
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <rect width="100%" height="100%">
              <animate
                attributeName="fill"
                values="red;green;blue;yellow;red"
                dur="1s"
                repeatCount="indefinite"
              />
            </rect>
          </svg>
        )}
        <DialogTitle style={{ display: 'none' }} />
      </DialogContent>
    </Dialog>
  );
}
