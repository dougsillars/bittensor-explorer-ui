import Decimal from "decimal.js";
import { TAOSTATS_DATA_ENDPOINT } from "../config";
export const USD_RATES_REFRESH_RATE = 5 * 60 * 1000; // 5 minutes

export async function getTaoPrice() {
	await window.navigator.locks.request("tao-price", async () => {
		const priceUpdatedAt = loadPriceUpdatedAt();

		const nextRefreshAt = priceUpdatedAt + USD_RATES_REFRESH_RATE;

		if (Date.now() < nextRefreshAt) {
			return;
		}

		const price = await fetchTaoPrice();
		savePrice(price);
		savePriceUpdatedAt(Date.now());
	});

	return loadPrice();
}

export function getPriceUpdatedAt() {
	return loadPriceUpdatedAt();
}

/*** PRIVATE ***/

function loadPrice() {
	try {
		const price = localStorage.getItem("tao-price");
		return new Decimal(price || 0);
	} catch (e) {
		return new Decimal(0);
	}
}

function savePrice(price: Decimal) {
	localStorage.setItem("tao-price", price.toFixed(2));
}

function loadPriceUpdatedAt() {
	return parseInt(localStorage.getItem("tao-price-updated-at") || "0");
}

function savePriceUpdatedAt(time: number) {
	localStorage.setItem("tao-price-updated-at", time.toString());
}

async function fetchTaoPrice(): Promise<Decimal> {
	const res = await fetch(TAOSTATS_DATA_ENDPOINT);
	try {
		const [data] = await res.json();
		return new Decimal(data.price || "0");
	} catch {
		throw new Error("Failed to fetch TAO price");
	}
}
