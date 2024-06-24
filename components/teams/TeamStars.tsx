import { cn } from '@/lib/utils';
import { StarFilledIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback } from '../ui/avatar';

const COLORS = {
  green: 'text-green-600',
  red: 'text-red-600',
  blue: 'text-blue-600',
  yellow: 'text-yellow-500',
};

const LABEL_ENUM = {
  green: 'Verde',
  red: 'Vermelho',
  blue: 'Azul',
  yellow: 'Amarelo',
};

const OneStar = ({ color }: { color: string }) => {
  return (
    <Avatar>
      <AvatarFallback className="bg-inherit">
        <StarFilledIcon className={cn(`w-7 h-7 ${color}`)} />
      </AvatarFallback>
    </Avatar>
  );
};

export default function TeamStars({
  starColor,
  membersCount,
  maxMembers,
}: {
  starColor: 'green' | 'red' | 'blue' | 'yellow';
  membersCount: number;
  maxMembers: number;
}) {
  return (
    <div className="flex justify-center flex-col items-center">
      <h1 className={cn(`text-lg font-bold ${COLORS[starColor]}`)}>
        Time {LABEL_ENUM[starColor]}
      </h1>
      <div className="flex flex-wrap">
        {Array.from({ length: maxMembers }).map((_, index) => {
          if (index < membersCount) {
            return <OneStar key={index} color={COLORS[starColor]} />;
          }
          return <OneStar key={index} color="text-gray-300" />;
        })}
      </div>
    </div>
  );
}
