import { writable } from 'svelte/store';

const hdrEnabled = writable(true);

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

export { hdrEnabled, setHdrEnabled, enableHDR, disableHDR, isHdrEnabled };
