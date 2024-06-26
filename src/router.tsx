import { createBrowserRouter, redirect } from "react-router-dom";

import { ResultLayout } from "./components/ResultLayout";
import { encodeAddress } from "./utils/formatAddress";

import { AccountPage } from "./screens/account";
import { BlockPage } from "./screens/block";
import { EventPage } from "./screens/event";
import { ExtrinsicPage } from "./screens/extrinsic";
import { HomePage } from "./screens/home";
import { NotFoundPage } from "./screens/notFound";
import { SearchPage } from "./screens/search";
import { NETWORK_CONFIG } from "./config";
import { ValidatorPage } from "./screens/validator";
import { ValidatorsPage } from "./screens/validators";
import { SubnetsPage } from "./screens/subnets";
import { RootSubnetPage } from "./screens/subnet";
import { SubnetPage } from "./screens/subnet";
import { ColdkeyPage } from "./screens/coldkey";
import { HotkeyPage } from "./screens/hotkey";
import { TokenomicsPage } from "./screens/tokenomics";
import { StakingPage } from "./screens/staking";

export const router = createBrowserRouter(
	[
		{
			element: <ResultLayout />,
			children: [
				{
					index: true,
					element: <HomePage />,
				},
				{
					path: "extrinsic/:query",
					element: <ExtrinsicPage />,
				},
				{
					path: "search",
					element: <SearchPage />,
				},
				{
					path: "block/:id",
					element: <BlockPage />,
				},
				{
					path: "account/:address",
					element: <AccountPage />,
					loader: ({ params }) => {
						const { address } = params;

						if (!address) {
							return null;
						}

						const encodedAddress = encodeAddress(
							address,
							NETWORK_CONFIG.prefix
						);
						if (address !== encodedAddress) {
							return redirect(`/account/${encodedAddress}`);
						}

						return null;
					},
				},
				{
					path: "event/:id",
					element: <EventPage />,
				},
				{
					path: "validator/:address",
					element: <ValidatorPage />,
				},
				{
					path: "validators",
					element: <ValidatorsPage />,
				},
				{
					path: "subnets",
					element: <SubnetsPage />,
				},
				{
					path: "subnet/0",
					element: <RootSubnetPage />,
				},
				{
					path: "subnet/:id",
					element: <SubnetPage />,
				},
				{
					path: "coldkey/:coldkey",
					element: <ColdkeyPage />,
				},
				{
					path: "hotkey/:hkey",
					element: <HotkeyPage />,
				},
				{
					path: "tokenomics",
					element: <TokenomicsPage />,
				},
				{
					path: "staking",
					element: <StakingPage />,
				},
				{
					path: "*",
					element: <NotFoundPage />,
				},
			],
		},
	],
	{
		basename:
			window.location.hostname === "localhost"
				? undefined
				: process.env.PUBLIC_URL,
	}
);
