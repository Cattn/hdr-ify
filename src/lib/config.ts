import { writable } from 'svelte/store';

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



let currentLog = true;
logEnabled.subscribe((value) => {
	currentLog = Boolean(value);
});

const setLogEnabled = (enabled: boolean) => {
	logEnabled.set(Boolean(enabled));
};

const enableLog = () => setLogEnabled(true);
const disableLog = () => setLogEnabled(false);
const isLogEnabled = () => currentLog;

export { hdrEnabled, setHdrEnabled, enableHDR, disableHDR, isHdrEnabled, logEnabled, setLogEnabled, enableLog, disableLog, isLogEnabled };
