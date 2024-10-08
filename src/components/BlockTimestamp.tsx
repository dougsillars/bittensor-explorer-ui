/** @jsxImportSource @emotion/react */
import { Time, TimeProps } from "./Time";
import Spinner from "../components/Spinner";
import ErrorIcon from "@mui/icons-material/Warning";
import { css } from "@emotion/react";
import { fetchBlockTimestamp } from "../utils/block";
import { useResource } from "../hooks/useResource";

const errorIconStyle = css`
  margin-left: 8px;
  position: relative;
  top: 1px;
  color: #ef5350;
`;

interface BlockTimestampProps extends Omit<TimeProps, "time"> {
	blockHeight: bigint;
}
export const BlockTimestamp = ({
	blockHeight,
	...props
}: BlockTimestampProps) => {
	const { data, loading, error } = useResource(fetchBlockTimestamp, [
		blockHeight,
	]);

	return loading || !data ? (
		<Spinner small />
	) : error ? (
		<ErrorIcon css={errorIconStyle} />
	) : (
		<Time time={data} {...props} />
	);
};
