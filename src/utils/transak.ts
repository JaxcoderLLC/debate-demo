import { TransakConfig, Transak } from "@transak/transak-sdk";
import dotenv from "dotenv";

dotenv.config();

const transakConfig: TransakConfig = {
  apiKey: process.env.TRANSAK_API_KEY as string,
  environment: Transak.ENVIRONMENTS.STAGING, // STAGING/PRODUCTION
  widgetHeight: "625px",
  widgetWidth: "500px",
  // Examples of some of the customization parameters you can pass
  defaultCryptoCurrency: "USDC",
  walletAddress: "", // Your customer's wallet address
  // themeColor: "[COLOR_HEX]", // App theme color
  fiatCurrency: "USD",
  // email: "example@gmail.com", // Your customer's email address
  redirectURL: "http://localhost:3000/", // Redirect URL of your app
};

const transak = new Transak(transakConfig);

transak.init();

// To get all the events
Transak.on("*", (data) => {
  console.log(data);
});

// This will trigger when the user closed the widget
Transak.on(Transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
  console.log("Transak SDK closed!");
});

/*
 * This will trigger when the user has confirmed the order
 * This doesn't guarantee that payment has completed in all scenarios
 * If you want to close/navigate away, use the TRANSAK_ORDER_SUCCESSFUL event
 */
Transak.on(Transak.EVENTS.TRANSAK_ORDER_CREATED, (orderData) => {
  console.log(orderData);
});

/*
 * This will trigger when the user marks payment is made
 * You can close/navigate away at this event
 */
Transak.on(Transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
  console.log(orderData);
  transak.close();
});
