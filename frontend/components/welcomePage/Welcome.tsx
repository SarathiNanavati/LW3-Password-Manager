import { Grid } from "@mui/material";
import WelcomeCard from "./WelcomeCard";

const welcomeCardData = [
  {
    id: 1,
    iconUrl: "/icons/128/digital_key.png",
    title: "storage",
    subtitle: "Locked up tight",
    description: `Your logins and private information are securely stored in your password vault.
      This keeps your information locked away from thieves, hackers, and other unsavory type`,
  },
  {
    id: 2,
    iconUrl: "/icons/128/anonymity.png",
    title: "security",
    subtitle: "Keep your secrets safe",
    description: `Your privacy is our top priority. A combination of policy, innovative thinking, 
    and a deep respect for your right to privacy ensure that your data is always kept safe and secure.`,
  },
  {
    id: 3,
    iconUrl: "/icons/128/mining.png",
    title: "Password Generator",
    subtitle: "Create a Strong one",
    description: `Password Vault App will help you with strong and tough passwords for your account making it imposible to hack`,
  },
  {
    id: 4,
    iconUrl: "/icons/128/decentralized.png",
    title: "de-centralized storage",
    subtitle: "Still no one knows",
    description: `Password Vault App use LIT, CERAMIC Protocol on Polygon Blockchain infrastructure. An innovative but reliable method to work with`,
  },
  {
    id: 5,
    iconUrl: "/icons/128/wallet.png",
    title: "wallets",
    subtitle: "Supports wide range of wallet",
    description: `MetaMask, Rainbow, Coinbase, WalletConnect are supported wallets by Password Vault DApp`,
  },
  {
    id: 6,
    iconUrl: "/icons/128/encryption.png",
    title: "convenience",
    subtitle: "Away One Click",
    description: `Password Vault App can record your usernames and passwords when you sign in to apps and websites. 
    Our automatic form filler allows you to sign in to your online accounts with a single click, look, or touch.`,
  },
];

type WelcomeProps = {};

const Welcome = (props: WelcomeProps) => {
  return (
    <>
      <Grid container mt={1} spacing={4} sx={{}}>
        {welcomeCardData.map((card) => {
          return (
            <Grid key={card.id} item xs={12} sm={6} md={6} lg={4} xl={4}>
              <WelcomeCard
                iconUrl={card.iconUrl}
                title={card.title}
                subTitle={card.subtitle}
                description={card.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Welcome;
