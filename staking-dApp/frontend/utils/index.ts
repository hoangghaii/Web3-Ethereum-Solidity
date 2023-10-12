import { formatEther, parseEther } from 'ethers/utils';

export function calcDaysRemaining(unlockDate: number) {
  const timeNow = Date.now() / 1000;

  const secondsRemaining = unlockDate - timeNow;

  return Math.max(Number((secondsRemaining / 60 / 60 / 24).toFixed(0)), 0);
}

export function toWei(ether?: string) {
  if (!ether) return parseEther('0');

  return parseEther(ether);
}

export function toEther(wei?: string) {
  if (!wei) return formatEther('0');

  return formatEther(wei);
}
