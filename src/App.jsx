import Header from './shared/components/widgets/Header'
import Footer from './shared/components/widgets/Footer'

import { Routes, Route} from 'react-router-dom';
import { Suspense, lazy } from 'react';

// providers
import { ProjectsProvider } from './contexts/ProjectsContext';
import { TasksProvider } from './contexts/TaskContext';

// pages
const ProjectsPage = lazy(() => import('./features/projects/pages/ProjectsPage'));
const ProjectNewPage = lazy(() => import('./features/projects/pages/ProjectNewPage'));
const ProjectEditPage = lazy(() => import('./features/projects/pages/ProjectEditPage'));

const TasksPage = lazy(() => import('./features/tasks/pages/TasksPage'));
const TaskNewPage = lazy(() => import('./features/tasks/pages/TaskNewPage'));


export default function App() {
  return (
    <>
    <Header />
    <main className="main">
      <Suspense fallback={<p>lodaing...</p>}>
        <Routes>
          <Route element={<ProjectsProvider />}>
            <Route path="/" element={<ProjectsPage/>} />
            <Route path="/projects/new" element={<ProjectNewPage />} />
            <Route path="/projects/:id/edit" element={<ProjectEditPage />} />
          </Route>
          <Route element={<TasksProvider />}>
            <Route path="/projects/:id/tasks" element={<TasksPage/>} />
            <Route path="/projects/:id/tasks/new" element={<TaskNewPage />} />
          </Route>
        </Routes>
      </Suspense>
    </main>
    <Footer />
    </>
  );
};
