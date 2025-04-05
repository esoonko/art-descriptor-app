import type { HistoryData } from "./bigquery";

let historyCache: HistoryData[] | null = null;

export const getHistoryCache = () => {
  return historyCache;
};

export const setHistoryCache = (newHistory: HistoryData[]) => {
  historyCache = newHistory;
};

export const addToHistoryCache = (newEntry: HistoryData) => {
  if (historyCache) {
    historyCache.unshift(newEntry); // Add new entry to the front
  } else {
    historyCache = [newEntry];
  }
};
