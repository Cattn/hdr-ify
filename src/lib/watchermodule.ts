// essentially a global element watcher, adds element to a set and runs the update function when the element is updated
let initialized = false;
type UpdateFn = () => void;

const elementToUpdate = new Map<Element, UpdateFn>();
const elementListeners = new WeakMap<
	Element,
	{ onTransition: () => void; onAnimation: () => void }
>();

const pendingElements = new Set<Element>();
let raf = 0;
const scheduleElement = (element: Element) => {
	pendingElements.add(element);
	if (raf) return;
	raf = requestAnimationFrame(() => {
		raf = 0;
		const toRun = Array.from(pendingElements);
		pendingElements.clear();
		for (const el of toRun) {
			const update = elementToUpdate.get(el);
			if (update) update();
		}
	});
};

let mutationObserver: MutationObserver | null = null;
let resizeObserver: ResizeObserver | null = null;

export function initGlobalWatcher() {
	if (initialized) return;
	initialized = true;

	mutationObserver = new MutationObserver((records) => {
		for (const record of records) {
			if (
				record.type === 'attributes' &&
				(record.attributeName === 'style' || record.attributeName === 'class')
			) {
				const el = record.target as Element;
				if (elementToUpdate.has(el)) scheduleElement(el);
			}
		}
	});
	mutationObserver.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['style', 'class'],
		subtree: true
	});

	resizeObserver = new ResizeObserver((entries) => {
		for (const entry of entries) {
			const el = entry.target as Element;
			if (elementToUpdate.has(el)) scheduleElement(el);
		}
	});
}

export function registerElement(element: Element, update: UpdateFn) {
	if (!initialized) initGlobalWatcher();
	elementToUpdate.set(element, update);
	resizeObserver?.observe(element);

	const onTransition = () => scheduleElement(element);
	const onAnimation = () => scheduleElement(element);
	element.addEventListener('transitionend', onTransition);
	element.addEventListener('transitionrun', onTransition);
	element.addEventListener('animationend', onAnimation);
	element.addEventListener('animationiteration', onAnimation);

	elementListeners.set(element, { onTransition, onAnimation });
}

export function unregisterElement(element: Element) {
	elementToUpdate.delete(element);
	resizeObserver?.unobserve(element);
	const listeners = elementListeners.get(element);
	if (listeners) {
		element.removeEventListener('transitionend', listeners.onTransition);
		element.removeEventListener('transitionrun', listeners.onTransition);
		element.removeEventListener('animationend', listeners.onAnimation);
		element.removeEventListener('animationiteration', listeners.onAnimation);
		elementListeners.delete(element);
	}
}
