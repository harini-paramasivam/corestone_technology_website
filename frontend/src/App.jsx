import { Routes, Route } from 'react-router-dom'
import ScrollToTop from '@/components/layout/ScrollToTop.jsx'
import Layout from '@/components/layout/Layout.jsx'
import Home from '@/pages/Home.jsx'
import SolutionsIndex from '@/pages/solutions/SolutionsIndex.jsx'
import SolutionDetail from '@/pages/solutions/SolutionDetail.jsx'
import IndustriesIndex from '@/pages/industries/IndustriesIndex.jsx'
import IndustryDetail from '@/pages/industries/IndustryDetail.jsx'
import Contact from '@/pages/Contact.jsx'
import RequestDemo from '@/pages/RequestDemo.jsx'
import DemoSuccess from '@/pages/DemoSuccess.jsx'
import NotFound from '@/pages/NotFound.jsx'
import WhyCoreStone from '@/pages/WhyCoreStone.jsx'
import Services from '@/pages/Services.jsx'

/**
 * Module 6 scope: Contact, Request Demo (full validated enterprise form)
 * and the post-submit success/WhatsApp handoff page.
 */
function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<SolutionsIndex />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/industries" element={<IndustriesIndex />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-demo" element={<RequestDemo />} />
          <Route path="/request-demo/success" element={<DemoSuccess />} />
          <Route path="/why-corestone" element={<WhyCoreStone />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
