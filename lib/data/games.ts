export interface Game {
  id: string
  title: string
  platform: "mobile" | "pc" | "console"
  publisher: string
  genre: string
  releaseDate: string
}

export const games: Game[] = [
  {
    id: "game-1",
    title: "Apex Legends",
    platform: "pc",
    publisher: "EA",
    genre: "Battle Royale",
    releaseDate: "2019-02-04",
  },
  {
    id: "game-2",
    title: "Genshin Impact",
    platform: "mobile",
    publisher: "HoYoverse",
    genre: "Action RPG",
    releaseDate: "2020-09-28",
  },
  {
    id: "game-3",
    title: "Fortnite",
    platform: "pc",
    publisher: "Epic Games",
    genre: "Battle Royale",
    releaseDate: "2017-07-25",
  },
  {
    id: "game-4",
    title: "PUBG Mobile",
    platform: "mobile",
    publisher: "Krafton",
    genre: "Battle Royale",
    releaseDate: "2018-03-19",
  },
  {
    id: "game-5",
    title: "League of Legends",
    platform: "pc",
    publisher: "Riot Games",
    genre: "MOBA",
    releaseDate: "2009-10-27",
  },
  {
    id: "game-6",
    title: "Valorant",
    platform: "pc",
    publisher: "Riot Games",
    genre: "Tactical Shooter",
    releaseDate: "2020-06-02",
  },
  {
    id: "game-7",
    title: "Candy Crush Saga",
    platform: "mobile",
    publisher: "King",
    genre: "Puzzle",
    releaseDate: "2012-04-12",
  },
  {
    id: "game-8",
    title: "Roblox",
    platform: "pc",
    publisher: "Roblox Corporation",
    genre: "Platform",
    releaseDate: "2006-09-01",
  },
  {
    id: "game-9",
    title: "Call of Duty Mobile",
    platform: "mobile",
    publisher: "Activision",
    genre: "FPS",
    releaseDate: "2019-10-01",
  },
  {
    id: "game-10",
    title: "Honkai: Star Rail",
    platform: "mobile",
    publisher: "HoYoverse",
    genre: "Turn-Based RPG",
    releaseDate: "2023-04-26",
  },
]
