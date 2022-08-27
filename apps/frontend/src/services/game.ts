/* eslint-disable turbo/no-undeclared-env-vars */
import axios from "axios";
//const baseUrl = '/api/games'
const BACKEND_ENDPOINT = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT;

const baseUrl = `${BACKEND_ENDPOINT}/api/games`;

console.log({ BACKEND_ENDPOINT, baseUrl });

interface EpnsBody {
  recipient: string;
  link: string;
}

const sendEpnsNotif = async (body: EpnsBody) => {
  const response = await axios.post(
    `${BACKEND_ENDPOINT}/epns/send-notif`,
    body
  );
  console.log({ response });

  return response.data;
};
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

const playMove = async (id: string, move: any) => {
  try {
    const response = await axios.post(`${baseUrl}/${id}/moves`, move);
    return response.data;
  } catch {
    return { error: "error" };
  }
};

const setGameResult = async (id: string | null, result: any) => {
  const response = await axios.patch(`${baseUrl}/${id}/result`, result);
  console.log("result", result, "response", response);
  return response.data;
};

const gameService = {
  sendEpnsNotif,
  getGame,
  playMove,
  createGame,
  setGameResult,
};

export default gameService;
