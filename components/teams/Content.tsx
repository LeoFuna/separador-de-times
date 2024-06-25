'use client';
import TeamUtils from '@/utils/team.utils';
import { TokensIcon } from '@radix-ui/react-icons';
import { useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';
import ColorDialog from './ColorDialog';
import TeamStars from './TeamStars';

type Team = {
  members: number;
  maxMembers: number;
  color: 'green' | 'red' | 'blue' | 'yellow';
};

const randomSelectTeam = ({
  teams,
  setTeams,
}: {
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
}) => {
  const teamsWithSpace = teams.filter((team) => team.members < team.maxMembers);
  const randomIndex = Math.floor(Math.random() * teamsWithSpace.length);

  const teamToJoin = teamsWithSpace[randomIndex];
  const serializedTeams = teams.map((team) => {
    if (team.color === teamToJoin.color) {
      team.members += 1;
    }
    return team;
  });
  setTeams(serializedTeams);
  return teamsWithSpace[randomIndex].color;
};

const generateTeams = (teams: number, peopleCount: number): Team[] => {
  const getColor = (index: number) => {
    switch (index) {
      case 0:
        return 'green';
      case 1:
        return 'red';
      case 2:
        return 'blue';
      default:
        return 'yellow';
    }
  };

  const teamsArray = Array.from({ length: teams }).map((_, index): Team => {
    return {
      members: 0,
      maxMembers: Math.floor(peopleCount / teams),
      color: getColor(index),
    };
  });

  if (peopleCount % teams !== 0) {
    const remainingPlayers = peopleCount % teams;
    for (let i = 0; i < remainingPlayers; i++) {
      teamsArray[i].maxMembers += 1;
    }
  }

  return teamsArray;
};

export default function Content() {
  const searchParams = useSearchParams();
  const peopleCount = searchParams.get('peopleCount') as string;
  const teamCount = searchParams.get('teamCount') as string;

  const [teams, setTeams] = useState<Team[]>(
    generateTeams(Number(teamCount), Number(peopleCount))
  );

  const remainingPlayers = TeamUtils.remainingPlayersOnGame({
    totalPlayers: Number(peopleCount),
    peopleWithTeam: teams.reduce((acc, team) => acc + team.members, 0),
  });
  return (
    <>
      <h1 className="text-xl mt-20">
        <span className="font-bold">Pessoas Restantes: </span>
        {remainingPlayers} pessoa(s)
      </h1>

      <div className="flex flex-col justify-end gap-6">
        {teams.map((team, index) => (
          <TeamStars
            key={index}
            starColor={team.color}
            maxMembers={team.maxMembers}
            membersCount={team.members}
          />
        ))}
      </div>

      <ColorDialog onOpen={() => randomSelectTeam({ teams, setTeams })}>
        <Button
          disabled={remainingPlayers === 0}
          size="lg"
          className="flex justify-center gap-3 w-full h-16"
        >
          <TokensIcon className="text-secondary h-5 w-5" />
          Escolher
        </Button>
      </ColorDialog>
    </>
  );
}
