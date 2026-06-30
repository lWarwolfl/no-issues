import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import IssuesPage from '@/pages/IssuesPage'
import IssueDetailsPage from '@/pages/IssueDetailsPage'
import IssueFormPage from '@/pages/IssueFormPage'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/issues" replace />} />
          <Route path="/issues" element={<IssuesPage />} />
          <Route path="/issues/new" element={<IssueFormPage />} />
          <Route path="/issues/:id" element={<IssueDetailsPage />} />
          <Route path="/issues/:id/edit" element={<IssueFormPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
