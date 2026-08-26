import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookmarkProvider } from './context/BookmarkContext';
import { ProfessorDataProvider } from './context/ProfessorDataContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { ScrollToTop } from './components/common/ScrollToTop';
import { AppRoutes } from './routes';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <BookmarkProvider>
          <ProfessorDataProvider>
            <AdminDataProvider>
              <AppRoutes />
            </AdminDataProvider>
          </ProfessorDataProvider>
        </BookmarkProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
