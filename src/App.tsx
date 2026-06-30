import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
          <Route index element={<IssuesPage />} />
          <Route path="new" element={<IssueFormPage />} />
          <Route path=":id" element={<IssueDetailsPage />} />
          <Route path=":id/edit" element={<IssueFormPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
