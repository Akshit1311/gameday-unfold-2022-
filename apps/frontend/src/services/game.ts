import axios from "axios";
//const baseUrl = '/api/games'
const baseUrl = "http://localhost:3001/api/games";

const createGame = async () => {
  const response = await axios.post(`${baseUrl}`);
  return response.data;
};

const getGame = async (id: string | null) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}/moves`);
    return response.data;
  } catch {
    return { error: "error" };
  }
};

const playMove = async (id: string, move) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/moves`, move);
    return response.data;
  } catch {
    return { error: "error" };
  }
};

const setGameResult = async (id: string | null, result) => {
  const response = await axios.patch(`${baseUrl}/${id}/result`, result);
  console.log("result", result, "response", response);
  return response.data;
};

const gameService = { getGame, playMove, createGame, setGameResult };

export default gameService;
