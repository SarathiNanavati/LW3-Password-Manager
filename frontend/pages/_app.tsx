import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import CustomRainbowTheme from "../theme/rainbowTheme";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import type { AppProps } from "next/app";
import { Provider as ReduxStoreProvider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { config, APIKEYNAME } from "../config/config";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";
import { store } from "../store/store";
import { theme } from "../theme/theme";

///////////////////////Wagmi Configuration///////////////////////////////////////////////
//chains
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

// return (
//   <SnackbarProvider
//     //not working
//     classes={{
//       variantError: styles.error,
//     }}>
//     <CustomStack />
//   </SnackbarProvider>
// );

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LearnWeb3 Decentralized Password Manager</title>
        <meta name='description' content='One Place to store and manage your password' />
        <link rel='icon' href='/assets/icon.png' />
      </Head>

      <ReduxStoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={CustomRainbowTheme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </WagmiConfig>
        </ThemeProvider>
      </ReduxStoreProvider>
    </>
  );
}

export default MyApp;
