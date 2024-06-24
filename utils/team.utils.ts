type RemainingPlayersOnGame = {
  peopleWithTeam: number;
  totalPlayers: number;
};

abstract class TeamUtils {
  static remainingPlayersOnGame({
    peopleWithTeam,
    totalPlayers,
  }: RemainingPlayersOnGame): number {
    return totalPlayers - peopleWithTeam;
  }
}

export default TeamUtils;
