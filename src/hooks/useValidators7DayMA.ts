import { useState, useEffect, useCallback } from "react";
import { useRollbar } from "@rollbar/react";

import { getValidatorsMovingAverage } from "../services/validatorService";
import { DataError } from "../utils/error";
import {
	ValidatorMovingAverage,
	ValidatorMovingAveragePaginatedResponse,
	ValidatorMovingAverageResponse,
} from "../model/validator";

export function useValidator7DayMA(
	address: string
): ValidatorMovingAverageResponse {
	const rollbar = useRollbar();

	const [data, setData] = useState<ValidatorMovingAverage[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<DataError>();

	const fetchData = useCallback(async () => {
		try {
			let finished = false;
			let after: string | undefined = undefined;

			const result: ValidatorMovingAverage[] = [];
			while (!finished) {
				const stats: ValidatorMovingAveragePaginatedResponse =
					await getValidatorsMovingAverage(
						{ address: { equalTo: address } },
						"HEIGHT_ASC",
						after
					);
				result.push(...stats.data);
				finished = !stats.hasNextPage;
				after = stats.endCursor;
			}
			setData(result);
		} catch (e) {
			if (e instanceof DataError) {
				rollbar.error(e);
				setError(e);
			} else {
				throw e;
			}
		}

		setLoading(false);
	}, []);

	useEffect(() => {
		setData([]);
		setError(undefined);
		setLoading(true);
		fetchData();
	}, [fetchData]);

	return {
		loading,
		error,
		data,
	};
}
