export async function fetchAllItems() {
	const res = await fetch("http://localhost:5000/Craft/all-items");
	return await res.json();
}

export async function fetchRandomCompound() {
	const res = await fetch("http://localhost:5000/Craft/random-compound");
	return await res.json();
}

export async function checkCraft(payload) {
	console.log("PAYLOAD:", JSON.stringify(payload));
	const res = await fetch("http://localhost:5000/Craft/check", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	return await res.json();
}
