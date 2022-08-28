import React, { useState } from "react";
import gameService from "../../services/game";
import { EChessOptionModal } from "../chessTypes";

interface IGameOptionsBar {
  toggleOption: (option: EChessOptionModal) => void;
  gameData: any;
}

const options = [
  {
    name: EChessOptionModal.CREATE_GAME,
    label: "Create Game",
  },
  {
    name: EChessOptionModal.JOIN_GAME,
    label: "Join Game",
  },
  {
    name: EChessOptionModal.CONFIRM_RESIGNATION,
    label: "Resign",
  },
  {
    name: EChessOptionModal.CREATED_GAME_INFO,
    label: "Show Game ID",
  },
];

const GameOptionsBar: React.FC<IGameOptionsBar> = ({
  toggleOption,
  gameData,
}) => {
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendNotif = async () => {
    if (isLoading) return;

    const NEXT_PUBLIC_FRONTEND_ENDPOINT =
      // eslint-disable-next-line turbo/no-undeclared-env-vars
      process.env.NEXT_PUBLIC_FRONTEND_ENDPOINT;

    try {
      setIsLoading(true);

      if (recipient) {
        const gameServiceEpnsResult = await gameService.sendEpnsNotif({
          recipient,
          link: `${NEXT_PUBLIC_FRONTEND_ENDPOINT}/play/chess?gameId=${gameData.id}`,
        });

        console.log({ gameServiceEpnsResult });
        alert("Game invite sent successfully");
        setRecipient("");
      } else alert("Invalid recipient");
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        {options.map(({ label, name }) => (
          <button
            className="px-4  rounded-lg py-2 bg-blue-500 text-white"
            onClick={() => toggleOption(name)}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        "Loading"
      ) : (
        <div className="my-8">
          <div className="text-xl mb-2">Invite Player : </div>
          <input
            className="px-3 py-2 border-2 rounded-lg"
            placeholder="Wallet Address of player2"
            type="text"
            onChange={(e) => setRecipient(e.target.value)}
          />
          <button
            className="mx-4 px-4 rounded-lg py-2 bg-blue-500 text-white hover:opacity-75"
            onClick={handleSendNotif}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default GameOptionsBar;
