const API_BASE = 'http://localhost:6666';

let currentItemGuid = null;
let currentRequiredComponents = [];
let slotsData = [];

const gameContainer = document.getElementById('gameContainer');
const taskArea = document.getElementById('taskArea');
const slotsArea = document.getElementById('slotsArea');
const checkButton = document.getElementById('checkButton');
const mesage = document.getElementById('mesage');
const itemsPool = document.getElementById('itemsPool');
const itemsGrid = document.getElementById('itemsGrid');

// getImagePathFromName /Images/${itemName}.png`;

async function loadAllItems() {
	const response = await fetch(`${API_BASE}/all-items`);
	const data = await response.json();
	itemsGrid.innerHTML = '';
	for (const item of data) {
		const img = document.createElement('img');
		img.src = `Images/${itemName}.png`;

		img.style.width = '70px';
		img.style.height = '70px';

		const div = document.createElement('div');
		div.className = 'drag-item';
		div.setAttribute('draggable', true);
		div.setAttribute('data-item-guid', item.guid);
		div.appendChild(img);
		div.addEventListener('dragstart', (e) => {
			e.dataTransfer.setData('text/plain', item.guid);
			e.dataTransfer.effectAllowed = 'copy';
		});
		itemsGrid.appendChild(div);

	}

}

function renderSlots() {
	slotsContainer.innerHTML = '';
	slotsData = [];
	for (let i = 0; i < currentRequiredComponents.length; i++) {
		const slotDiv = document.createElement('div');
		slotDiv.className = 'slot empty';
		slotDiv.setAttribute('data-slot-index', i);
		slotDiv.addEventListener('dragover', (e) => {
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
			slotDiv.classList.add('drag-over');
		});

		slotDiv.addEventListener('dragleave', () => slotDiv.classList.remove('drag-over'));
		slotDiv.addEventListener('drop', (e) => {
			e.preventDefault();
			slotDiv.classList.remove('drag-over');
			const draggedGuid = e.dataTransfer.getData('text/plain');
			if (!draggedGuid) return;
			const idx = parseInt(slotDiv.getAttribute('data-slot-index'));
			fillSlot(idx, draggedGuid);
		});
		slotsContainer.appendChild(slotDiv);
		slotsDara.push({filled: false, itemGuid: null});
	}
	updateSlotsVisual();

	function fillSlot (index, itemGuid) {
		if (index < 0 || index >= slotsData.length) return;
		slotsData[index] = {filled: true, itemGuid: itemGuid};
		updateSlotsVisual();
	}

	function clearSlot (index) {
		if (index < 0 && index < slotsData.length) {
			slotsData[index] = {filled: false, itemGuid: null};
			updateSlotsVisual();
		}
	}

	async function updateSlotsVisual() {
		const res = await fetch(`${API_BASE}/all-items`);
		const allItems = await res.json();
		const guidToName = new Map(allItems.map(i => [i.guid, i.name]));

		for (let i = 0; i < slotsContainer.children.length; i++) {
			const slotDiv = slotsContainer.children[i];
			const slotData = slotsData[i];

			slotDiv.innerHTML = '';
			if (slotData.filled && slotData.itemGuid) {
				const itemName = guidToName.get(slotData.itemGuid) || 'item';
				const img = document.createElement('img');
				img.src = `Images/${itemName}.png`;
				slotDiv.appendChild(img);
				slotDiv.classList.remove('empty');
				slotDiv.ondblclick = () => clearSlot(i);
				slotDiv.style.cursor = 'pointer';
			} else {
				slotDiv.classList.add('empty');
				slotDiv.ondblclickr = null;
			}
		}
	}
	async function loadRandomRound() {
		gameContainer.classList.add('fadeOut');
		await new Promise(r => setTimeout(r, 300));
		try {
			const res = await fetch(`${API_BASE}/random-compound`);
			if (!res.ok) throw new Error('Failed to load random compound');
			const data = await res.json();
			currentItemGuid = data.guid;
			currentRequiredComponents = data.components;

			mainItemDisplay.innerHTML = `<img src="Images/${data.name}.png">
			<span>${data.name}</span>`;
			renderSlots();
		} catch (err) {
			messageBox.innerHTML = 'Error: ' + err.message;
		}
		gameContainer.classList.remove('fadeOut');

		async function checkRecipe() {
			const currentSlotsGuids = slotsData.filter(s => s.filled).map(s => s.itemGuid);
			const required = currentRequiredComponents;
			if (currentSlotsGuids.length !== required.length) messageBox.innerHTML = 'Not enough items'; return;
		}

		const sortedRequired = [...required].sort();
		const sortedCurrent = [...currentSlotsGuids].sort();
		const isEqual = sortedRequired.length === sortedCurrent.length && sortedRequired.every((value, index) => value === sortedCurrent[index]);

		if (isEqual) {
			messageBox.innerHTML = 'Correct!';
			gameContainer.classList.add('fadeOut');
			setTimeout(() => loadRandomRound(), 450);
		} else {
			messageBox.innerHTML = 'Try again';
			const slots = document.querySelectorAll('.slot');
			setTimeout(() => slots.forEach(s => s.style.backgroundColor = ''), 300);
		}
	}

	async function init() {
		await loadAllItems();
		await loadRandomRound();
		checkButton.addEventListener('click', checkRecipe);
	}
	init();
}
