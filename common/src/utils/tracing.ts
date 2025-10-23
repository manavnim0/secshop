export const traceLog = (traceId: string, message: string) => {
  console.log(`[trace:${traceId}] ${message}`);
};
