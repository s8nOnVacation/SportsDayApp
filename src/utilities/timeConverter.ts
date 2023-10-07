export function convertTo12HrsTimeFormat(timeString: string) {
  return new Date(timeString).toLocaleString("en-US", {
    hour: "numeric",
    hour12: true
  });
}
