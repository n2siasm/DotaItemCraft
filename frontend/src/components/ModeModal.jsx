import React from "react";

export default function ModeModal({ setMode }) {
	return (
		<div className="modal">
			<div onClick={() => setMode("timed")}>
				<h2>Timed</h2>
				<p>Craft as many items per minute as possible.</p>
			</div>

			<div onClick={() => setMode("infinite")}>
				<h2>Infinite</h2>
				<p>No time limit, just practice.</p>
			</div>
		</div>
	);
}
