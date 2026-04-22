import React from "react";

export default function ResultModal({ mode, count, time }) {
	const rate = time ? (count / (time / 60)).toFixed(2) : 0;

	return (
		<div className="modal">
			<h2>Results</h2>
			<p>Items: {count}</p>

			{mode === "timed" && <p>Craft Rate: {rate}/min</p>}
		</div>
	);
}
