"use client";

import { useEffect, useState } from "react";

export type TokenData = {
  name: string;
  symbol: string;
  price: number;
  image: string;
};

export const usePrice = (token: string) => {
  const [tokenData, setTokenData] = useState<TokenData>({
    name: token ?? "",
    symbol: "",
    price: 0,
    image: "",
  });

  const url = "https://api.coingecko.com/api/v3/coins/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-oY6jNVWmyy2ewEMa1d65s8AV",
    },
  };

  // Function to convert USD to ETH
  function convertUsdToEth(usdAmount: number, ethPrice: number): number {
    return usdAmount / ethPrice;
  }

  // Function to display USD and ETH values
  function displayUsdAndEthValues(
    usdAmounts: number[],
    ethPrice: number
  ): { amount: number; ethEquivalent: number }[] {
    return usdAmounts.map((amount) => {
      const ethEquivalent = convertUsdToEth(amount, ethPrice);
      return { amount, ethEquivalent };
    });
  }

  const usdAmounts = [5, 10, 20]; // Example USD amounts
  const ethValues = usdAmounts.map((amount) =>
    convertUsdToEth(amount, tokenData.price)
  );
  const usdValues = displayUsdAndEthValues(usdAmounts, tokenData.price);

  console.log(ethValues); // Outputs the ETH equivalent of each USD amount

  const fetchPrice = (token: string) => {
    fetch(`${url}/${token}`, options)
      .then((res) => res.json())
      .then((data) => {
        console.log("Price", data.market_data.current_price.usd);

        setTokenData({
          name: data.name,
          symbol: data.symbol,
          price: data.market_data.current_price.usd,
          image: data.image.small,
        });
      })
      .catch((err) => console.log(err));
  };

  return { fetchPrice, ethValues, usdValues };
};
