import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { config, APIKEYNAME } from "../config/config";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import Head from "next/head";
import Navbar from "../components/Navbar";
import { Container, ThemeProvider } from "@mui/material";
import { theme } from "../theme/theme";
import CustomRainbowTheme from "../theme/rainbowTheme";

// chains
const { chains, provider } = configureChains(config.application.supportedChains, [
  alchemyProvider({ apiKey: config.client[APIKEYNAME.POLYGONMUMBAI_ALCHEMY_API_KEY] }),
  publicProvider(),
]);

// connectors
const { connectors } = getDefaultWallets({
  appName: config.application.name,
  chains,
});

// client
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LearnWeb3 Decentralized Password Manager</title>
        <meta name='description' content='One Place to store and manage your password' />
        <link rel='icon' href='/assets/icon.png' />
      </Head>

      <ThemeProvider theme={theme}>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={CustomRainbowTheme}>
            <Navbar />
            <Container disableGutters={true} maxWidth='xl'>
              <Component {...pageProps} />
            </Container>
          </RainbowKitProvider>
        </WagmiConfig>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
