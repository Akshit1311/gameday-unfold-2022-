import "../../styles/globals.css";
import type { AppProps } from "next/app";

// rainbow kit
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import WithNavbar from "../layouts/WithNavbar";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <WithNavbar>
          <Component {...pageProps} />
        </WithNavbar>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
