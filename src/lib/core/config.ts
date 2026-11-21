type Subscriber<T> = (value: T) => void;

export interface Writable<T> {
	subscribe(run: Subscriber<T>): () => void;
	set(value: T): void;
	update(fn: (value: T) => T): void;
}

function writable<T>(initial: T): Writable<T> {
	let value = initial;
	const subscribers = new Set<Subscriber<T>>();
	const set = (next: T) => {
		if (Object.is(next, value)) return;
		value = next;
		for (const run of [...subscribers]) run(value);
	};
	return {
		subscribe(run) {
			subscribers.add(run);
			run(value);
			return () => subscribers.delete(run);
		},
		set,
		update: (fn) => set(fn(value))
	};
}

const hdrEnabled = writable(true);
const logEnabled = writable(false);

let current = true;
hdrEnabled.subscribe((value) => {
	current = Boolean(value);
});

const setHdrEnabled = (enabled: boolean) => {
	hdrEnabled.set(Boolean(enabled));
};

const enableHDR = () => setHdrEnabled(true);
const disableHDR = () => setHdrEnabled(false);
const isHdrEnabled = () => current;

let currentLog = false;
logEnabled.subscribe((value) => {
	currentLog = Boolean(value);
});

const setLogEnabled = (enabled: boolean) => {
	logEnabled.set(Boolean(enabled));
};

const enableLog = () => setLogEnabled(true);
const disableLog = () => setLogEnabled(false);
const isLogEnabled = () => currentLog;

export {
	hdrEnabled,
	setHdrEnabled,
	enableHDR,
	disableHDR,
	isHdrEnabled,
	logEnabled,
	setLogEnabled,
	enableLog,
	disableLog,
	isLogEnabled
};
