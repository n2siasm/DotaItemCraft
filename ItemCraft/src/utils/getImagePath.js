export function getImagePath(name) {
	if (!name) return null;

	if (name.endsWith(".png") || name.includes("/")) {
		return name;
	}

	return `./public/${name}.png`;
}
