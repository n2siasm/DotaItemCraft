import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "../dragTypes";
import DraggableItem from "./DraggableItem";

function Slot({ slot, index, onDrop, moveItem }) {
	const [{ isOver }, drop] = useDrop(() => ({
		accept: ItemTypes.ITEM,
		drop: (item) => {
			if (item.fromSlot !== undefined) {
				moveItem(item.fromSlot, index);
			} else {
				onDrop(item, index);
			}
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
		}),
	}));

	return (
		<div
			ref={drop}
			className="slot"
			style={{
				backgroundColor: isOver ? "#333" : "transparent",
			}}
		>
			{slot && <DraggableItem item={slot} fromSlot={index} />}
		</div>
	);
}

export default function SlotsArea({ slots, onDrop, moveItem }) {
	return (
		<div className="slots">
			{slots.map((slot, i) => (
				<Slot
					key={i}
					slot={slot}
					index={i}
					onDrop={onDrop}
					moveItem={moveItem}
				/>
			))}
		</div>
	);
}
