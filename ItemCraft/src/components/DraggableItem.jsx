import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../dragTypes";
import { getImagePath } from "../utils/getImagePath";

export default function DraggableItem({ item, fromSlot }) {
	const [{ isDragging }, drag] = useDrag(() => ({
		type: ItemTypes.ITEM,
		item: { ...item, fromSlot },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	}));

	return (
		<img
			ref={drag}
			src={getImagePath(item.img)}
			className="item"
			style={{ opacity: isDragging ? 0.4 : 1 }}
		/>
	);
}
