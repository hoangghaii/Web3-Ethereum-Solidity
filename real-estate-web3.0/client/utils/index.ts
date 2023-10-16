export function daysLeft(deadline: string | number | Date) {
  const difference = new Date(deadline).getTime() - Date.now();

  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
}

export function calculateBarPercentage(goal: number, raisedAmount: number) {
  const percentage = Math.round((raisedAmount * 100 * 100) / goal);

  return percentage;
}

export function checkIfImage(url: string, callback: (arg0: boolean) => void) {
  const img = new Image();

  img.src = url;

  if (img.complete) {
    callback(true);
  }

  img.onload = function () {
    callback(true);
  };

  img.onerror = function () {
    callback(false);
  };
}
