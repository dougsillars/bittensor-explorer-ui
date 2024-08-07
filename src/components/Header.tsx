import { useState } from "react";
import Logo from "../assets/logo.png";
import PolygonGray from "../assets/polygon-gray.svg";
import { useAppStats } from "../contexts";
import { nFormatter } from "../utils/number";
import subnets from "../subnets.json";

export const Header = () => {
	const {
		state: { tokenStats },
	} = useAppStats();
	const price = tokenStats?.price ?? 0;
	const priceChange24h = tokenStats?.priceChange24h ?? 0;
	const volume24h = tokenStats?.volume24h ?? 0;
	const marketCap = tokenStats?.marketCap ?? 0;

	const [isFaded, setFaded] = useState(false);

	const toggleFade = () => {
		setFaded(!isFaded);
	};

	const openSubMenu = (
		event: React.MouseEvent<HTMLSpanElement, MouseEvent>
	) => {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(event.target as any).parentElement.classList.toggle("open-menu");
		event.preventDefault();
	};

	const subnetIDs = Object.keys(subnets);
	const totalSubnets = subnetIDs.length;
	const subnetMenuColumn = 3;

	const onSubMenuMouseEnter = () => {
		document.body.classList.add("active-overlay");
	};

	const onSubMenuMouseLeave = () => {
		document.body.classList.remove("active-overlay");
	};

	return (
		<header className="new-site-header">
			{/* <a
				href="https://keycheck.taostats.io/"
				rel="noreferrer"
				target="_blank"
			>
				<Marquee
					speed={0}
					style={{
						backgroundColor: "#c27502",
						borderBottom: "1px solid #333",
						fontSize: "12px",
						paddingLeft: "10px",
					}}
				>
					After the recent attack, taostats.io have released an
					interface to help you determine if your key may have been
					affected. Click here to check your key.
				</Marquee>
			</a> */}
			<div className="header-top">
				<div className="container">
					<div className="ht-inner">
						<div className="ht-left">
							<ul>
								<li>
									<label>Price.</label> ${price}{" "}
									<span
										className={`${
											priceChange24h > 0
												? "success"
												: priceChange24h < 0
													? "warning"
													: ""
										}`}
									>
										{priceChange24h > 0
											? "▴"
											: priceChange24h < 0
												? "▾"
												: ""}
										{` ${priceChange24h}%`}
									</span>
								</li>
								<li>
									<label>24 Vol.</label> $
									{nFormatter(volume24h, 2)}
								</li>
								<li>
									<label>Market Cap</label> $
									{nFormatter(marketCap, 2)}
								</li>
							</ul>
						</div>
						<div className="ht-right">
							<div className="ht-search">
								<form action="/search" method="get">
									<input
										type="text"
										name="query"
										id="query"
										placeholder="Search by Address / Validator /Txn Hash"
									/>
									<input type="submit" value="" />
								</form>
							</div>
							<div className="ht-btns">
								<a
									href="https://delegate.taostats.io"
									target="_blank"
									className="btn"
									rel="noreferrer"
								>
									STAKE TAO
								</a>
								<div className="menu-dropdown">
									<a href="#" className="btn">
										BUY TAO
										<span>
											<img
												src={PolygonGray}
												alt="Taostats down caret"
											/>
										</span>
									</a>
									<ul className="menu">
										<li>
											<a
												href="https://www.mexc.com/register?inviteCode=1M9bg"
												target="_blank"
												rel="noreferrer"
											>
												MEXC
											</a>
										</li>
										<li>
											<a
												href="https://www.kucoin.com/r/af/H7QQtt"
												target="_blank"
												rel="noreferrer"
											>
												KUCOIN
											</a>
										</li>
										<li>
											<a
												href="https://www.gate.io/trade/TAO_USDT?ref=A1QSXVla&amp;ref_type=106"
												target="_blank"
												rel="noreferrer"
											>
												GATE.IO
											</a>
										</li>
										<li>
											<a
												href="https://partner.bitget.com/bg/X0Z47N"
												target="_blank"
												rel="noreferrer"
											>
												BITGET
											</a>
										</li>
										<li>
											<a
												href="https://tensor.exchange/"
												target="_blank"
												rel="noreferrer"
											>
												TENSOR EXCHANGE
											</a>
										</li>
										<li>
											<a
												href="https://app.uniswap.org/#/swap?outputCurrency=0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44"
												target="_blank"
												rel="noreferrer"
											>
												UNISWAP(wTAO)
											</a>
										</li>
										<li>
											<a
												href="https://app.uniswap.org/swap?outputCurrency=0xB60acD2057067DC9ed8c083f5aa227a244044fD6"
												target="_blank"
												rel="noreferrer"
											>
												UNISWAP(stTAO)
											</a>
										</li>
										<li>
											<a
												href="https://accounts.binance.com/register?ref=JCEYWLC3"
												target="_blank"
												rel="noreferrer"
											>
												BINANCE
											</a>
										</li>
									</ul>
								</div>
								<a
									href="https://corcel.io"
									target="_blank"
									className="btn"
									rel="noreferrer"
								>
									<img
										src="https://taostats.io/wp-content/themes/taostats/images/corcel-logo.png"
										data-xblocker="passed"
										style={{ visibility: "visible" }}
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="header-bottom">
				<div className="container">
					<div className="hb-inner">
						<div className="logo">
							<a href="https://taostats.io">
								<img src={Logo} alt="Taostats Logo" />
							</a>
						</div>
						<div
							className="menuBtn"
							onClick={() => {
								document.body.classList.toggle("active-menu");
								toggleFade();
							}}
						>
							<span />
							<span />
							<span />
						</div>

						<div
							className={`main-menu fade-in-out ${
								isFaded ? "active" : ""
							}`}
						>
							<div className="container">
								<div className="ht-search">
									<form action="/search" method="get">
										<input
											type="text"
											name="query"
											id="mobile-query"
											placeholder="Search by Address / Validator /Txn Hash"
										/>
										<input type="submit" value="" />
									</form>
								</div>
								<nav>
									<ul>
										<li className="menu-item">
											<a href="https://taostats.io">
												Home
											</a>
											<span className="menuItem-glow" />
										</li>
										<li
											className="menu-item-has-children"
											onMouseEnter={onSubMenuMouseEnter}
											onMouseLeave={onSubMenuMouseLeave}
										>
											<a href="/subnets/">
												Subnets
												<span
													className="has-btn"
													onClick={(e) =>
														openSubMenu(e)
													}
												/>
											</a>
											<ul className="megaMenu subMenu">
												{Array.from(Array(3)).map(
													(_, menuIndex) => (
														<li
															key={`subnet-menu-column-${menuIndex}`}
														>
															<ul>
																{Array.from(
																	Array(
																		Math.min(
																			Math.floor(
																				(totalSubnets +
																					2) /
																					subnetMenuColumn
																			),
																			totalSubnets -
																				Math.floor(
																					(totalSubnets +
																						2) /
																						subnetMenuColumn
																				) *
																					menuIndex
																		)
																	)
																).map(
																	(
																		_,
																		itemIndex
																	) => {
																		const passed =
																			Math.floor(
																				(totalSubnets +
																					2) /
																					subnetMenuColumn
																			) *
																			menuIndex;
																		const netUid =
																			parseInt(
																				subnetIDs[
																					passed +
																						itemIndex
																				] ??
																					"0"
																			);
																		const name =
																			(
																				subnets as any
																			)[
																				netUid
																			]
																				?.name ||
																			"Unknown";
																		return (
																			<li
																				key={`subnet-menu-item-${itemIndex}`}
																			>
																				<a
																					href={`/subnet/${netUid}`}
																				>
																					{
																						netUid
																					}

																					:{" "}
																					{
																						name
																					}
																				</a>
																			</li>
																		);
																	}
																)}
															</ul>
														</li>
													)
												)}
											</ul>
											<span className="menuItem-glow"></span>
										</li>
										<li
											className="current-menu-item menu-item-has-children"
											onMouseEnter={onSubMenuMouseEnter}
											onMouseLeave={onSubMenuMouseLeave}
										>
											<a href="/">
												Blockchain
												<span
													className="has-btn"
													onClick={(e) =>
														openSubMenu(e)
													}
												/>
											</a>
											<ul className="subMenu">
												<li>
													<a href="/#blocks">
														Blocks
													</a>
												</li>
												<li>
													<a href="/#transfers">
														Transfers
													</a>
												</li>
												<li>
													<a href="/#delegation">
														Delegation
													</a>
												</li>
												<li>
													<a href="/validators">
														Validators
													</a>
												</li>
												<li>
													<a href="/#accounts">
														Accounts
													</a>
												</li>
												<li>
													<a href="/subnets">
														Subnets
													</a>
												</li>
												<li>
													<a href="/tokenomics/">
														Tokenomics
													</a>
												</li>
												<li>
													<a href="https://nx.taostats.io/">
														Nakamoto
													</a>
												</li>
												<li>
													<a href="https://kx.taostats.io/">
														Kusanagi
													</a>
												</li>
											</ul>
											<span className="menuItem-glow"></span>
										</li>
										<li
											className="menu-item-has-children"
											onMouseEnter={onSubMenuMouseEnter}
											onMouseLeave={onSubMenuMouseLeave}
										>
											<a href="/validators">
												Validators
												<span
													className="has-btn"
													onClick={(e) =>
														openSubMenu(e)
													}
												/>
											</a>
											<ul className="subMenu">
												<li>
													<a href="https://taostats.io/verified-validators/">
														Verified Validators
													</a>
												</li>
												<li>
													<a href="/staking">
														Delegation/Staking
													</a>
												</li>
											</ul>
											<span className="menuItem-glow"></span>
										</li>
										<li
											className="menu-item-has-children"
											onMouseEnter={onSubMenuMouseEnter}
											onMouseLeave={onSubMenuMouseLeave}
										>
											<a href="https://taostats.io/developers/">
												Developers
												<span
													className="has-btn"
													onClick={(e) =>
														openSubMenu(e)
													}
												/>
											</a>
											<ul className="subMenu">
												<li>
													<a href="https://corcel.io/">
														Corcel
													</a>
												</li>
												<li>
													<a href="https://taostats.io/api/">
														Taostats API
													</a>
												</li>
											</ul>
											<span className="menuItem-glow" />
										</li>
										<li
											className="menu-item-has-children"
											onMouseEnter={onSubMenuMouseEnter}
											onMouseLeave={onSubMenuMouseLeave}
										>
											<a href="#">
												Resources
												<span
													className="has-btn"
													onClick={(e) =>
														openSubMenu(e)
													}
												/>
											</a>
											<ul className="subMenu">
												<li className="">
													<a href="https://taostats.io/links/">
														Links
													</a>
												</li>
												<li className="">
													<a href="https://taostats.io/media/">
														Media
													</a>
												</li>
												<li className="">
													<a
														href="https://keycheck.taostats.io/"
														target="_blank"
														rel="noreferrer"
													>
														Keycheck
													</a>
												</li>
											</ul>
											<span className="menuItem-glow" />
										</li>
										<li className="menu-item-has-children">
											<a href="https://docs.taostats.io/?_gl=1*znpib6*_ga*MTg2NzIzMTA0Ny4xNzEyMDc3NDk3*_ga_VCM7H6TDR4*MTcxNDEzMTAxNy40LjAuMTcxNDEzMTAxNy4wLjAuMA..">
												Docs
											</a>
											<ul
												className="megaMenu subMenu"
												style={{
													left: "auto",
													right: 0,
												}}
											>
												<li
													style={{
														width: "25%",
														paddingRight: "16px",
													}}
												>
													<div className="menu-col-box">
														<p>
															Dive into detailed
															guides on Bittensor,
															Taostats, subnets,
															miners, validators,
															and blockchain
															analytics.
														</p>
													</div>
												</li>
												<li
													style={{
														width: "25%",
														paddingRight: "16px",
													}}
												>
													<ul>
														<li className="mi-title">
															<a href="https://docs.taostats.io/docs/index">
																What is
																Bittensor
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/getting-started-with-bittensor">
																Getting Started
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/tao">
																Tao
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/tao-allocation">
																Tao Allocation
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/faq">
																FAQ
															</a>
														</li>
													</ul>
												</li>
												<li
													style={{
														width: "25%",
														paddingRight: "16px",
													}}
												>
													<ul>
														<li className="mi-title">
															<a href="https://docs.taostats.io/docs/subnet">
																Bittensor
																Architecture
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/subnet">
																Subnet
																Architecture
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/consensus">
																Yuma Consensus
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/blockchain">
																Blockchain
															</a>
														</li>
														<li>
															<a href="https://docs.taostats.io/docs/user">
																Bittensor
																Personas
															</a>
														</li>
													</ul>
												</li>
												<li
													style={{
														width: "25%",
														paddingRight: "16px",
													}}
												>
													<ul>
														<li className="mi-title">
															<a href="https://docs.taostats.io/docs/what-is-taostats">
																Taostats
															</a>
														</li>
														<li className="">
															<a href="https://docs.taostats.io/docs/subnets">
																Subnets
															</a>
														</li>
														<li className="">
															<a href="https://docs.taostats.io/docs/validators">
																Validators
															</a>
														</li>
														<li className="">
															<a href="https://docs.taostats.io/docs/delegation">
																Delegation
															</a>
														</li>
														<li className="">
															<a href="https://docs.taostats.io/docs/accounts">
																Accounts
															</a>
														</li>
													</ul>
												</li>
											</ul>
											<span className="menuItem-glow"></span>
											<span className="has-btn"></span>
										</li>
									</ul>
								</nav>
								<div className="ht-btns">
									<a
										href="https://delegate.taostats.io"
										className="btn"
									>
										Stake Tao
									</a>
									<div className="menu-dropdown">
										<a href="#" className="btn">
											BUY TAO
											<span>
												<img
													src={PolygonGray}
													alt="Taostats down caret"
												/>
											</span>
										</a>
										<ul className="menu">
											<li>
												<a
													href="https://www.mexc.com/register?inviteCode=1M9bg"
													target="_blank"
													rel="noreferrer"
												>
													MEXC
												</a>
											</li>
											<li>
												<a
													href="https://www.kucoin.com/r/af/H7QQtt"
													target="_blank"
													rel="noreferrer"
												>
													KUCOIN
												</a>
											</li>
											<li>
												<a
													href="https://www.gate.io/trade/TAO_USDT?ref=A1QSXVla&amp;ref_type=106"
													target="_blank"
													rel="noreferrer"
												>
													GATE.IO
												</a>
											</li>
											<li>
												<a
													href="https://partner.bitget.com/bg/X0Z47N"
													target="_blank"
													rel="noreferrer"
												>
													BITGET
												</a>
											</li>
											<li>
												<a
													href="https://tensor.exchange/"
													target="_blank"
													rel="noreferrer"
												>
													TENSOR EXCHANGE
												</a>
											</li>

											<li>
												<a
													href="https://app.uniswap.org/#/swap?outputCurrency=0x77e06c9eccf2e797fd462a92b6d7642ef85b0a44"
													target="_blank"
													rel="noreferrer"
												>
													UNISWAP(wTAO)
												</a>
											</li>
											<li>
												<a
													href="https://app.uniswap.org/swap?outputCurrency=0xB60acD2057067DC9ed8c083f5aa227a244044fD6"
													target="_blank"
													rel="noreferrer"
												>
													UNISWAP(stTAO)
												</a>
											</li>
											<li>
												<a
													href="https://accounts.binance.com/register?ref=JCEYWLC3"
													target="_blank"
													rel="noreferrer"
												>
													BINANCE
												</a>
											</li>
										</ul>
									</div>
									<a
										href="https://corcel.io"
										target="_blank"
										className="btn"
										rel="noreferrer"
									>
										<img
											src="https://taostats.io/wp-content/themes/taostats/images/corcel-logo.png"
											data-xblocker="passed"
											style={{ visibility: "visible" }}
										/>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};
