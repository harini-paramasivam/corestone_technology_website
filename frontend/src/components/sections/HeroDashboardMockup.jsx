import { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  Package,
  FileCheck,
  Users,
  ShoppingCart,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Clock,
  ChevronRight,
  Bell
} from 'lucide-react'

export default function HeroDashboardMockup() {
  const chartBars = [
    { month: 'Mon', value: 65, sales: '₹1.2L' },
    { month: 'Tue', value: 85, sales: '₹1.8L' },
    { month: 'Wed', value: 45, sales: '₹95K' },
    { month: 'Thu', value: 95, sales: '₹2.1L' },
    { month: 'Fri', value: 75, sales: '₹1.5L' },
    { month: 'Sat', value: 100, sales: '₹2.4L' },
    { month: 'Sun', value: 60, sales: '₹1.1L' },
  ]

  const recentTransactions = [
    { id: 'INV-4821', client: 'Apex Retailers', amount: '₹42,500', status: 'Paid', time: '2 mins ago' },
    { id: 'INV-4820', client: 'Green Leaf Nursery', amount: '₹18,200', status: 'Paid', time: '14 mins ago' },
    { id: 'INV-4819', client: 'Vanguard Logistics', amount: '₹89,000', status: 'Processing', time: '1 hr ago' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      {/* Outer Glow Ring */}
      <div className="absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-blue-600 via-emerald-500 to-indigo-600 opacity-30 blur-lg transition duration-1000 group-hover:opacity-100" />

      {/* Main Glass Card Container */}
      <div className="relative overflow-hidden rounded-[24px] border border-slate-700/60 bg-slate-950 p-4 sm:p-5 shadow-2xl backdrop-blur-xl">
        
        {/* Top App Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-rose-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="ml-2 flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-slate-300 border border-slate-800">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CoreStone POS & Cloud ERP Live
            </div>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Bell className="h-3.5 w-3.5 hover:text-white transition-colors cursor-pointer" />
            <span className="text-[11px] font-mono text-slate-400">v4.2.0</span>
          </div>
        </div>

        {/* Top Metric Cards Row */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-4">
          <div className="rounded-xl bg-slate-900/90 p-2.5 sm:p-3 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-medium">Daily Sales</span>
              <span className="flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                +18.4% <ArrowUpRight className="h-2.5 w-2.5 ml-0.5" />
              </span>
            </div>
            <p className="mt-1 text-base sm:text-lg font-black font-display text-white">₹1,84,200</p>
            <p className="text-[10px] text-slate-400 mt-0.5">142 Invoices today</p>
          </div>

          <div className="rounded-xl bg-slate-900/90 p-2.5 sm:p-3 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-medium">Live Inventory</span>
              <Package className="h-3.5 w-3.5 text-blue-400" />
            </div>
            <p className="mt-1 text-base sm:text-lg font-black font-display text-blue-400">4,890 SKUs</p>
            <p className="text-[10px] text-amber-400 mt-0.5 font-medium">3 low stock alerts</p>
          </div>

          <div className="rounded-xl bg-slate-900/90 p-2.5 sm:p-3 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[11px] font-medium">GST Compliance</span>
              <FileCheck className="h-3.5 w-3.5 text-emerald-400" />
            </div>
            <p className="mt-1 text-base sm:text-lg font-black font-display text-emerald-400">100% Filed</p>
            <p className="text-[10px] text-slate-400 mt-0.5">GSTR-1 & 3B Ready</p>
          </div>
        </div>

        {/* Analytics Bar Chart Area */}
        <div className="rounded-xl bg-slate-900/80 p-3.5 sm:p-4 border border-slate-800/80 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-bold text-slate-200">Weekly Revenue & Volume Trend</span>
            </div>
            <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded font-mono">This Week</span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-32 pt-4 px-1">
            {chartBars.map((bar, i) => (
              <div key={bar.month} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[9px] font-mono text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.sales}
                </span>
                <div className="w-full bg-slate-800/60 rounded-t-md h-full flex items-end overflow-hidden p-0.5">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                    className="w-full rounded-t-sm bg-gradient-to-t from-blue-600 via-indigo-500 to-emerald-400 group-hover:brightness-125 transition-all"
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-400">{bar.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Recent Invoices & Live Activity */}
        <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800/60">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2 px-1">
            <span>Recent Live Invoices</span>
            <span className="text-[10px] text-blue-400 hover:underline cursor-pointer flex items-center gap-0.5">
              View All <ChevronRight className="h-3 w-3" />
            </span>
          </div>
          <div className="space-y-1.5">
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/80 border border-slate-800/50 text-xs">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p className="font-bold text-white leading-tight">{tx.client}</p>
                    <p className="text-[10px] text-slate-400">{tx.id} &bull; {tx.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-emerald-400">{tx.amount}</p>
                  <span className="text-[9px] text-emerald-300/80 bg-emerald-950/50 px-1.5 py-0.2 rounded border border-emerald-800/40">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Accent Card 1 — Sales */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="hidden sm:flex absolute -top-5 -left-6 items-center gap-3 rounded-2xl bg-slate-900/95 p-3.5 shadow-2xl border border-emerald-500/40 backdrop-blur-md"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
          <TrendingUp className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-300">Sales Growth Today</p>
          <p className="text-base font-black font-display text-emerald-400">₹1,84,200 <span className="text-xs font-normal text-slate-400">(+18.4%)</span></p>
        </div>
      </motion.div>

      {/* Floating Accent Card 2 — GST Status */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="hidden sm:flex absolute -bottom-4 -right-6 items-center gap-3 rounded-2xl bg-slate-900/95 p-3.5 shadow-2xl border border-blue-500/40 backdrop-blur-md"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-400">
          <FileCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-300">GST Invoice Auto-Filing</p>
          <p className="text-sm font-black font-display text-blue-300 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-400" /> 100% Compliant & On Time
          </p>
        </div>
      </motion.div>

    </div>
  )
}
