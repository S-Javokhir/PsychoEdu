import React, { createContext, useContext, useState, useEffect } from 'react';

type ItemType = 'material' | 'case' | 'video';

interface BookmarkContextType {
  savedMaterialIds: string[];
  savedCaseIds: string[];
  savedVideoIds: string[];
  toggleBookmark: (type: ItemType, id: string) => boolean; // returns true if added, false if removed
  isBookmarked: (type: ItemType, id: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedMaterialIds, setSavedMaterialIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('psychoedu_saved_materials');
    return saved ? JSON.parse(saved) : ['mat-001', 'mat-003'];
  });

  const [savedCaseIds, setSavedCaseIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('psychoedu_saved_cases');
    return saved ? JSON.parse(saved) : ['case-024'];
  });

  const [savedVideoIds, setSavedVideoIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('psychoedu_saved_videos');
    return saved ? JSON.parse(saved) : ['vid-101'];
  });

  useEffect(() => {
    localStorage.setItem('psychoedu_saved_materials', JSON.stringify(savedMaterialIds));
  }, [savedMaterialIds]);

  useEffect(() => {
    localStorage.setItem('psychoedu_saved_cases', JSON.stringify(savedCaseIds));
  }, [savedCaseIds]);

  useEffect(() => {
    localStorage.setItem('psychoedu_saved_videos', JSON.stringify(savedVideoIds));
  }, [savedVideoIds]);

  const toggleBookmark = (type: ItemType, id: string): boolean => {
    if (type === 'material') {
      const exists = savedMaterialIds.includes(id);
      setSavedMaterialIds(prev => exists ? prev.filter(i => i !== id) : [...prev, id]);
      return !exists;
    } else if (type === 'case') {
      const exists = savedCaseIds.includes(id);
      setSavedCaseIds(prev => exists ? prev.filter(i => i !== id) : [...prev, id]);
      return !exists;
    } else {
      const exists = savedVideoIds.includes(id);
      setSavedVideoIds(prev => exists ? prev.filter(i => i !== id) : [...prev, id]);
      return !exists;
    }
  };

  const isBookmarked = (type: ItemType, id: string): boolean => {
    if (type === 'material') return savedMaterialIds.includes(id);
    if (type === 'case') return savedCaseIds.includes(id);
    return savedVideoIds.includes(id);
  };

  return (
    <BookmarkContext.Provider
      value={{
        savedMaterialIds,
        savedCaseIds,
        savedVideoIds,
        toggleBookmark,
        isBookmarked,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
};
