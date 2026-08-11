import { Outlet } from 'react-router-dom'
import { ToastProvider } from '@/components/ui/Toast.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import WhatsAppButton from './WhatsAppButton.jsx'

export default function Layout() {
  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar transparent={false} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </ToastProvider>
  )
}
