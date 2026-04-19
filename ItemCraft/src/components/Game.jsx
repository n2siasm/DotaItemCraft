import React, { useEffect, useState } from "react";
import { fetchAllItems, fetchRandomCompound, checkCraft } from "../api";
import { getImagePath } from "../utils/getImagePath";
import ItemGrid from "./ItemGrid";
import SlotsArea from "./SlotsArea";
import ModeModal from "./ModeModal";
import ResultModal from "./ResultModal";

export default function Game() {
	const [allItems, setAllItems] = useState([]);
	const [current, setCurrent] = useState(null);
	const [slots, setSlots] = useState([]);
	const [mode, setMode] = useState(null);

	const [time, setTime] = useState(0);
	const [count, setCount] = useState(0);
	const [finished, setFinished] = useState(false);

	const [fade, setFade] = useState(false);

	useEffect(() => {
		fetchAllItems().then(setAllItems);
	}, []);

	useEffect(() => {
		if (mode) loadNext();
	}, [mode]);

	useEffect(() => {
		if (mode === "timed") {
			const interval = setInterval(() => setTime((t) => t + 1), 1000);
			return () => clearInterval(interval);
		}
	}, [mode]);

	async function loadNext() {
		setFade(true);
		setTimeout(async () => {
			const data = await fetchRandomCompound();
			setCurrent(data);
			setSlots(new Array(data.components.length).fill(null));
			setFade(false);
		}, 500);
	}

	function handleDrop(item, index) {
		setSlots((prev) => {
			const newSlots = [...prev];
			newSlots[index] = item;
			return newSlots;
		});
	}

	const [wrong, setWrong] = useState(false);

	async function check() {
		const payload = {
			targetGuid: current.guid,
			items: slots.map((s) => ({
				guid: s?.isRecipe ? -1 : s?.guid,
			})),
		};

		const result = await checkCraft(payload);
		console.log("RESULT:", result);
		if (result.success) {
			setWrong(false);
			setCount((c) => c + 1);
			loadNext();
		} else {
			setWrong(true);

			setSlots(current.components);

			setTimeout(() => setWrong(false), 800);
		}
	}

	function moveItem(from, to) {
		const newSlots = [...slots];
		const temp = newSlots[from];
		newSlots[from] = newSlots[to];
		newSlots[to] = temp;
		setSlots(newSlots);
	}

	function finish() {
		setFinished(true);
	}

	return (
		<div className={`game ${fade ? "fade" : ""}`}>
			{!mode && <ModeModal setMode={setMode} />}

			{finished && <ResultModal mode={mode} count={count} time={time} />}

			{mode && current && (
				<>
					<img src={getImagePath(current.img)} className="target" />

					<SlotsArea
						slots={slots}
						onDrop={handleDrop}
						moveItem={moveItem}
					/>

					<button onClick={check} className={wrong ? "wrong" : ""}>
						Enter
					</button>

					<div className="finished" onClick={finish}>
						finished
					</div>

					<ItemGrid items={allItems} />

					<div className="hud">
						<span>Items: {count}</span>
						{mode === "timed" && <span>Time: {time}s</span>}
					</div>
				</>
			)}
		</div>
	);
}
