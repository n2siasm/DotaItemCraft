import React, { useEffect, useState } from "react";
import { fetchAllItems, fetchRandomCompound, checkCraft } from "../api";
import { getImagePath } from "../utils/getImagePath";
import ItemGrid from "./ItemGrid";
import SlotsArea from "./SlotsArea";
import ModeModal from "./ModeModal";
import ResultModal from "./ResultModal";

export default function Game() {
	const [allItems, setAllItems] = useState([]);
	const [itemsMap, setItemsMap] = useState({});
	const [current, setCurrent] = useState(null);
	const [slots, setSlots] = useState([]);
	const [mode, setMode] = useState(null);

	const [time, setTime] = useState(0);
	const [count, setCount] = useState(0);
	const [finished, setFinished] = useState(false);

	const [fade, setFade] = useState(false);

	useEffect(() => {
		fetchAllItems().then((data) => {
			setAllItems(data);

			const map = {};
			data.forEach((item) => {
				map[item.guid] = item;
			});

			setItemsMap(map);
		});
	}, []);

	useEffect(() => {
		if (mode && Object.keys(itemsMap).length > 0) {
			loadNext();
		}
	}, [mode, itemsMap]);

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
			const resolvedComponents = data.components.map((c) => {
				const full = itemsMap[c.guid];

				return {
					...full,
					guid: full.guid,
					isRecipe: full.isRecipe,
				};
			});
			setCurrent({
				...data,
				components: resolvedComponents,
			});

			setSlots(new Array(resolvedComponents.length).fill(null));

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
				guid: s?.isRecipe ? "-1" : s?.guid,
			})),
		};

		const result = await checkCraft(payload);
		if (result.success) {
			setWrong(false);
			setCount((c) => c + 1);
			loadNext();
		} else {
			setWrong(true);

			setSlots(current.components);

			setTimeout(() => {
				setWrong(false);
				loadNext();
			}, 1500);
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
						ENTER
					</button>

					<button className="finish" onClick={finish}>
						finish
					</button>

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
