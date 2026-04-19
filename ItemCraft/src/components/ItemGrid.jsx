import React from "react";
import DraggableItem from "./DraggableItem";

export default function ItemGrid({ items }) {
	const normalItems = items.filter((i) => i.isRecipe === 0);
	const recipeItems = items.filter((i) => i.isRecipe === 1);

	const recipeItem =
		recipeItems.length > 0
			? {
					id: "RECIPE",
					image: recipeItems[0].img,
					isRecipe: 1,
			  }
			: null;

	const finalItems = recipeItem ? [...normalItems, recipeItem] : normalItems;

	return (
		<div className="grid">
			{finalItems.map((item) => (
				<DraggableItem key={`${item.guid}`} item={item} />
			))}
		</div>
	);
}
