import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ScanRecord } from '../types/disease';


interface HistoryContextType {
  history: ScanRecord[];
  addRecord: (record: Omit<ScanRecord, 'id' | 'timestamp'>) => void;
  deleteRecord: (id: string) => void;
  clearHistory: () => void;
  exportHistory: () => void;
}

const STORAGE_KEY = 'citrus_disease_detection_history';

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ScanRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [history]);

  const addRecord = (record: Omit<ScanRecord, 'id' | 'timestamp'>) => {
    const newRecord: ScanRecord = {
      ...record,
      id: `scan_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newRecord, ...prev]);
  };

  const deleteRecord = (id: string) => {
    setHistory((prev) => prev.filter((r) => r.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const exportHistory = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `citrus_scan_history_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addRecord,
        deleteRecord,
        clearHistory,
        exportHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
