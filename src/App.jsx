import Header from './shared/components/widgets/Header'
import Footer from './shared/components/widgets/Footer'

import { Routes, Route} from 'react-router-dom';
import { Suspense, lazy } from 'react';

// providers
import { ProjectsProvider } from './contexts/ProjectsContext';
import { TasksProvider } from './contexts/TasksContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ConfirmProvider } from './contexts/Confirm';

// pages
const Home = lazy(() => import('./shared/components/pages/Home'));
const ProjectsPage = lazy(() => import('./features/projects/pages/ProjectsPage'));
const ProjectNewPage = lazy(() => import('./features/projects/pages/ProjectNewPage'));
const ProjectEditPage = lazy(() => import('./features/projects/pages/ProjectEditPage'));

const TasksPage = lazy(() => import('./features/tasks/pages/TasksPage'));
const TaskNewPage = lazy(() => import('./features/tasks/pages/TaskNewPage'));
const SingleTaskPage = lazy(() => import('./features/tasks/pages/SingleTaskPage'));

export default function App() {

  // localStorage.clear();

  return (
    <>
    <ThemeProvider>
      <Header />
    </ThemeProvider>
    <main className="main">
      <ConfirmProvider>
        <Suspense fallback={<p>lodaing...</p>}>
          <Routes>
            <Route element={<ProjectsProvider />}>
              <Route element={<TasksProvider />}>
                <Route path="/" element={<Home />} />
              </Route>  
            </Route>

            <Route element={<ProjectsProvider />}>
              <Route element={<TasksProvider />}>
                <Route path="/projects/new" element={<ProjectNewPage />} />
                <Route path="/projects" element={<ProjectsPage/>} />
                <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
                <Route path="/projects/:id/tasks" element={<TasksPage/>} />
                <Route path="/projects/:id/tasks/new" element={<TaskNewPage />} />
                <Route path="/projects/:id/tasks/:taskID" element={<SingleTaskPage />} />
              </Route>
            </Route>
          </Routes>
        </Suspense>
      </ConfirmProvider>
    </main>
    <Footer />
    </>
  );
};
