import React, { StrictMode } from "react";
import Game from "./components/Game";
import "./styles.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
	return (
		<StrictMode>
			<DndProvider backend={HTML5Backend}>
				<Game />
			</DndProvider>
		</StrictMode>
	);
}
