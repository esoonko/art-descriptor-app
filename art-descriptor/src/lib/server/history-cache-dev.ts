import type { HistoryData } from "./bigquery";

let historyCacheDev: HistoryData[] | null = null;

export const getHistoryCache = () => {
  return historyCacheDev;
};

export const setHistoryCache = (newHistory: HistoryData[]) => {
  historyCacheDev = newHistory;
};

export const addToHistoryCache = (newEntry: HistoryData) => {
  if (historyCacheDev) {
    historyCacheDev.unshift(newEntry); // Add new entry to the front
  } else {
    historyCacheDev = [newEntry];
  }
};
