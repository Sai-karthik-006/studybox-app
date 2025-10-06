import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentCollege, setCurrentCollege] = useState(null);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const clearSelections = () => {
    setCurrentCollege(null);
    setCurrentBranch(null);
    setCurrentYear(null);
    setCurrentSemester(null);
    setCurrentSubject(null);
  };

  const getCurrentPath = () => {
    const path = [];
    if (currentCollege) path.push(currentCollege.name);
    if (currentBranch) path.push(currentBranch.name);
    if (currentYear) path.push(currentYear.name);
    if (currentSemester) path.push(currentSemester.name);
    if (currentSubject) path.push(currentSubject.name);
    return path.join(' > ');
  };

  const value = {
    // State
    currentCollege,
    currentBranch,
    currentYear,
    currentSemester,
    currentSubject,
    sidebarOpen,
    
    // Setters
    setCurrentCollege,
    setCurrentBranch,
    setCurrentYear,
    setCurrentSemester,
    setCurrentSubject,
    setSidebarOpen,
    
    // Actions
    clearSelections,
    getCurrentPath
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};