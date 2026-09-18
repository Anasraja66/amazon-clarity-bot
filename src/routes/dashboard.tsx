import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bell,
  Boxes,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleAlert,
  Clock3,
  Database,
  Eye,
  FileText,
  Gauge,
  HelpCircle,
  Home,
  Lightbulb,
  LineChart,
  LoaderCircle,
  Menu,
  PackageCheck,
  PanelLeftClose,
  Play,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Store,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Amazon Intelligence Dashboard — AI Amazon Manager" },
      { name: "description", content: "Connect, analyze, understand, prioritize and act on your Amazon business data." },
      { property: "og:title", content: "Amazon Intelligence Dashboard — AI Amazon Manager" },
      { property: "og:description", content: "A clear path from Amazon data to your next best action." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

type StepId = "connect" | "analyze" | "understand" | "prioritize" | "act";
type Tone = "primary" | "success" | "warning" | "danger" | "neutral";

const steps: { id: StepId; label: string; caption: string; icon: LucideIcon }[] = [
  { id: "connect", label: "Connect", caption: "Data sources", icon: Database },
  { id: "analyze", label: "Analyze", caption: "Find signals", icon: Activity },
  { id: "understand", label: "Understand", caption: "Explain why", icon: Lightbulb },
  { id: "prioritize", label: "Prioritize", caption: "Rank actions", icon: Target },
  { id: "act", label: "Act", caption: "Execute safely", icon: Zap },
];

const sources = [
  { name: "Seller Central", detail: "Sales, traffic and inventory", icon: Store },
  { name: "Amazon Ads", detail: "Campaigns, keywords and spend", icon: Target },
  { name: "Brand Analytics", detail: "Search terms and market signals", icon: LineChart },
  { name: "Customer Voice", detail: "Reviews and return reasons", icon: Users },
];

const findings = [
  { id: 1, title: "Conversion rate dropped 22%", detail: "TrailFlex Running Shoes · ASIN B0D4RUN104", impact: "£3,840 at risk", tone: "danger" as Tone, icon: TrendingDown },
  { id: 2, title: "Keyword demand increased 32%", detail: "lightweight running shoes · UK market", impact: "+£2,100 potential", tone: "success" as Tone, icon: TrendingUp },
  { id: 3, title: "PPC spend is leaking", detail: "14 search terms without conversions", impact: "Save £420/mo", tone: "warning" as Tone, icon: CircleAlert },
];

const actions = [
  { id: 1, priority: "Critical", title: "Improve TrailFlex offer positioning", reason: "Conversion fell after a competitor reduced price by 7%.", result: "Recover £3.8k revenue", effort: "Medium", confidence: 94, tone: "danger" as Tone },
  { id: 2, priority: "High", title: "Scale lightweight running shoes", reason: "Demand is up 32% while your conversion remains strong.", result: "+£2.1k monthly potential", effort: "Low", confidence: 91, tone: "success" as Tone },
  { id: 3, priority: "High", title: "Pause 14 wasted search terms", reason: "£420 spent in 30 days without attributed conversions.", result: "Save £420 monthly", effort: "Low", confidence: 98, tone: "warning" as Tone },
  { id: 4, priority: "Medium", title: "Prepare inventory transfer", reason: "TrailFlex Black may stock out in 12 days at current velocity.", result: "Protect 320 orders", effort: "Medium", confidence: 87, tone: "primary" as Tone },
];

function Button({ children, onClick, variant = "primary", disabled = false, className = "" }: { children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger" | "ghost"; disabled?: boolean; className?: string }) {
  const styles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "border border-border bg-card text-foreground hover:bg-secondary",
    danger: "border border-danger/25 bg-danger-soft text-danger hover:bg-danger/10",
    ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  }[variant];
  return <button type="button" onClick={onClick} disabled={disabled} className={`inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-xs font-extrabold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${styles} ${className}`}>{children}</button>;
}

function ToneIcon({ tone, children }: { tone: Tone; children: ReactNode }) {
  const styles = { primary: "bg-secondary text-primary", success: "bg-success-soft text-success", warning: "bg-warning-soft text-warning", danger: "bg-danger-soft text-danger", neutral: "bg-muted text-muted-foreground" }[tone];
  return <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${styles}`}>{children}</span>;
}

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-border bg-card ${className}`}>{children}</section>;
}

function AppLogo({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="flex items-center gap-2.5 font-extrabold text-foreground"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><BarChart3 className="size-5" /></span>{!compact && <span className="text-sm">AI Amazon Manager</span>}</Link>;
}

function Sidebar({ current, onStep, open, close }: { current: StepId; onStep: (id: StepId) => void; open: boolean; close: () => void }) {
  return <>
    {open && <button aria-label="Close navigation" onClick={close} className="fixed inset-0 z-40 bg-foreground/25 lg:hidden" />}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-16 items-center justify-between border-b border-border px-5"><AppLogo /><button onClick={close} className="grid size-8 place-items-center rounded-md text-muted-foreground lg:hidden" aria-label="Close menu"><X className="size-5" /></button></div>
      <div className="px-4 py-5"><p className="px-3 text-[10px] font-extrabold uppercase text-muted-foreground">Your workflow</p><nav className="mt-3 space-y-1">{steps.map((step, index) => { const Icon = step.icon; const active = current === step.id; return <button key={step.id} onClick={() => { onStep(step.id); close(); }} className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${active ? "bg-secondary text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><span className={`grid size-8 place-items-center rounded-md ${active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Icon className="size-4" /></span><span className="min-w-0 flex-1"><span className="block text-xs font-extrabold">{step.label}</span><span className="block text-[9px] opacity-70">{step.caption}</span></span><span className="text-[9px] font-bold opacity-50">0{index + 1}</span></button> })}</nav></div>
      <div className="mt-auto border-t border-border p-4"><div className="rounded-lg bg-surface p-3"><div className="flex items-center gap-2"><ShieldCheck className="size-4 text-success" /><span className="text-[10px] font-extrabold">Workspace protected</span></div><p className="mt-2 text-[9px] leading-4 text-muted-foreground">Actions require your approval before execution.</p></div><div className="mt-4 flex items-center gap-3 px-2"><span className="grid size-8 place-items-center rounded-full bg-foreground text-[10px] font-extrabold text-primary-foreground">AM</span><div><p className="text-[10px] font-extrabold">Alex Morgan</p><p className="text-[9px] text-muted-foreground">Growth plan</p></div><ChevronDown className="ml-auto size-3.5 text-muted-foreground" /></div></div>
    </aside>
  </>;
}

function Topbar({ openMenu }: { openMenu: () => void }) {
  return <header className="sticky top-0 z-30 flex h-16 items-center border-b border-border bg-background/90 px-4 backdrop-blur-xl sm:px-6"><button onClick={openMenu} className="mr-3 grid size-9 place-items-center rounded-lg border border-border lg:hidden" aria-label="Open menu"><Menu className="size-5" /></button><div><p className="text-xs font-extrabold">TrailFlex UK</p><p className="text-[9px] text-muted-foreground">Amazon.co.uk · Updated 8 mins ago</p></div><div className="ml-auto flex items-center gap-2"><span className="hidden items-center gap-1.5 rounded-full bg-success-soft px-3 py-1.5 text-[9px] font-extrabold text-success sm:flex"><span className="size-1.5 rounded-full bg-success" />Data live</span><button className="relative grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground" aria-label="Notifications"><Bell className="size-4" /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-danger" /></button><button className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground" aria-label="Help"><HelpCircle className="size-4" /></button></div></header>;
}

function StepHeader({ step, title, copy }: { step: number; title: string; copy: string }) {
  return <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 flex items-center gap-2 text-[10px] font-extrabold uppercase text-primary"><span className="rounded-md bg-secondary px-2 py-1">Step 0{step}</span><span>of 05</span></div><h1 className="text-2xl font-extrabold tracking-[-0.02em] sm:text-3xl">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{copy}</p></div></div>;
}

function ConnectView({ connected, setConnected, next }: { connected: boolean[]; setConnected: (value: boolean[]) => void; next: () => void }) {
  const allConnected = connected.every(Boolean);
  const connect = (i: number) => { const nextState = [...connected]; nextState[i] = !nextState[i]; setConnected(nextState); };
  return <><StepHeader step={1} title="Connect your Amazon workspace" copy="Choose which data sources AI Amazon Manager should analyze. This demo uses sample UK seller data and makes no external changes." /><div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]"><Panel><div className="border-b border-border p-5"><h2 className="text-sm font-extrabold">Available data sources</h2><p className="mt-1 text-xs text-muted-foreground">Connect the full picture for stronger recommendations.</p></div><div className="divide-y divide-border">{sources.map((source, i) => { const Icon = source.icon; return <div key={source.name} className="flex items-center gap-4 p-4 sm:p-5"><ToneIcon tone={connected[i] ? "success" : "primary"}>{connected[i] ? <Check className="size-5" /> : <Icon className="size-5" />}</ToneIcon><div className="min-w-0 flex-1"><p className="text-xs font-extrabold">{source.name}</p><p className="mt-1 text-[10px] text-muted-foreground">{source.detail}</p></div><Button variant={connected[i] ? "secondary" : "primary"} onClick={() => connect(i)}>{connected[i] ? "Connected" : "Connect"}</Button></div>})}</div></Panel><div className="space-y-5"><Panel className="p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">Connection health</h2><span className="text-xs font-extrabold text-primary">{connected.filter(Boolean).length}/4</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all" style={{ width: `${connected.filter(Boolean).length * 25}%` }} /></div><div className="mt-5 space-y-3 text-[10px]">{["256-bit encrypted connection", "Read-only data access", "Approval required for actions"].map(x => <div key={x} className="flex items-center gap-2"><ShieldCheck className="size-3.5 text-success" /><span>{x}</span></div>)}</div></Panel><Panel className="p-5"><p className="text-[10px] font-extrabold uppercase text-muted-foreground">Ready to analyze</p><p className="mt-2 text-2xl font-extrabold">{connected.filter(Boolean) * 12_460}</p><p className="mt-1 text-xs text-muted-foreground">data points available</p><Button onClick={next} disabled={!allConnected} className="mt-5 w-full">Continue to analysis <ArrowRight className="size-4" /></Button></Panel></div></div></>;
}

function AnalyzeView({ complete, run, next }: { complete: boolean; run: () => void; next: () => void }) {
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(complete ? 100 : 0);
  useEffect(() => { if (!running) return; const id = window.setInterval(() => setProgress(p => { if (p >= 100) { window.clearInterval(id); setRunning(false); run(); return 100; } return Math.min(100, p + 10); }), 180); return () => window.clearInterval(id); }, [running, run]);
  const categories = [["Sales", 12_420], ["Keywords", 28_640], ["PPC", 4_820], ["Competitors", 186], ["Pricing", 2_140], ["Reviews", 3_760], ["Inventory", 94]];
  return <><StepHeader step={2} title="Analyze every business signal" copy="Run a connected analysis across your current performance, historical baselines and market movement." /><Panel className="overflow-hidden"><div className="grid lg:grid-cols-[1fr_0.75fr]"><div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r"><div className="flex items-start justify-between"><div><h2 className="text-sm font-extrabold">Full business analysis</h2><p className="mt-1 text-xs text-muted-foreground">Last 90 days compared with prior period and market.</p></div><ToneIcon tone={complete ? "success" : "primary"}>{complete ? <Check className="size-5" /> : running ? <LoaderCircle className="size-5 animate-spin" /> : <Sparkles className="size-5" />}</ToneIcon></div><div className="mt-8 flex items-end justify-between"><div><p className="text-4xl font-extrabold">{progress}%</p><p className="mt-1 text-xs text-muted-foreground">{complete ? "Analysis complete" : running ? "Evaluating signals…" : "Ready to begin"}</p></div><p className="text-[10px] font-bold text-muted-foreground">52,060 data points</p></div><div className="mt-5 h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-all duration-200" style={{ width: `${progress}%` }} /></div><div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-4">{categories.map(([name,count], i) => <div key={name} className={`rounded-lg border p-3 ${progress >= (i + 1) * 12 ? "border-success/20 bg-success-soft" : "border-border bg-muted"}`}><p className="text-[9px] font-extrabold">{name}</p><p className="mt-1 text-[10px] text-muted-foreground">{Number(count).toLocaleString()} records</p></div>)}</div></div><div className="bg-surface p-5 sm:p-7"><h2 className="text-sm font-extrabold">Analysis coverage</h2><div className="mt-5 space-y-4">{[["Historical baseline", "24 months"], ["Market comparison", "42 competitors"], ["Campaign coverage", "100%"], ["Product coverage", "36 ASINs"]].map(([a,b]) => <div key={a} className="flex items-center justify-between border-b border-border pb-3"><span className="text-xs text-muted-foreground">{a}</span><span className="text-xs font-extrabold">{b}</span></div>)}</div>{!complete ? <Button onClick={() => { setProgress(0); setRunning(true); }} disabled={running} className="mt-6 w-full">{running ? <><LoaderCircle className="size-4 animate-spin" /> Analyzing</> : <><Play className="size-4" /> Run analysis</>}</Button> : <Button onClick={next} className="mt-6 w-full">Review findings <ArrowRight className="size-4" /></Button>}</div></div></Panel></>;
}

function UnderstandView({ selected, setSelected, next }: { selected: number; setSelected: (id: number) => void; next: () => void }) {
  const active = findings.find(x => x.id === selected) ?? findings[0];
  const signals = [["Organic rank", "#8 → #21", "-13 places"], ["Conversion", "11.2% → 8.7%", "-22%"], ["Competitor price", "£46.99 → £43.70", "-7%"], ["PPC CPC", "£0.84 → £0.96", "+14%"], ["Inventory", "42 days", "Healthy"]];
  return <><StepHeader step={3} title="Understand what changed — and why" copy="Select a finding to inspect the connected signals and AI reasoning behind it." /><div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]"><Panel className="overflow-hidden"><div className="border-b border-border p-5"><div className="flex items-center justify-between"><h2 className="text-sm font-extrabold">Detected findings</h2><span className="rounded-full bg-danger-soft px-2 py-1 text-[9px] font-extrabold text-danger">3 need attention</span></div></div><div className="divide-y divide-border">{findings.map(item => { const Icon = item.icon; return <button key={item.id} onClick={() => setSelected(item.id)} className={`flex w-full gap-3 p-4 text-left transition-colors sm:p-5 ${selected === item.id ? "bg-secondary" : "hover:bg-muted"}`}><ToneIcon tone={item.tone}><Icon className="size-5" /></ToneIcon><div className="min-w-0 flex-1"><p className="text-xs font-extrabold">{item.title}</p><p className="mt-1 truncate text-[10px] text-muted-foreground">{item.detail}</p><p className="mt-2 text-[10px] font-extrabold text-primary">{item.impact}</p></div><ArrowRight className="mt-3 size-3.5 text-muted-foreground" /></button>})}</div></Panel><Panel className="overflow-hidden"><div className="flex items-center justify-between border-b border-border p-5"><div><p className="text-[10px] font-extrabold uppercase text-primary">AI explanation</p><h2 className="mt-1 text-base font-extrabold">{active.title}</h2></div><Sparkles className="size-5 text-primary" /></div><div className="p-5"><div className="grid gap-2 sm:grid-cols-5">{signals.map(([a,b,c], i) => <div key={a} className={`rounded-lg border p-3 ${i < 4 ? "border-danger/15 bg-danger-soft" : "border-success/15 bg-success-soft"}`}><p className="text-[9px] font-bold text-muted-foreground">{a}</p><p className="mt-2 text-xs font-extrabold">{b}</p><p className="mt-1 text-[9px] text-muted-foreground">{c}</p></div>)}</div><div className="my-5 flex items-center gap-3"><span className="h-px flex-1 bg-border" /><span className="rounded-full bg-secondary px-3 py-1 text-[9px] font-extrabold text-primary">Connected reasoning</span><span className="h-px flex-1 bg-border" /></div><div className="rounded-lg bg-foreground p-5 text-primary-foreground"><p className="text-[10px] font-extrabold uppercase text-primary">Why this happened</p><p className="mt-3 text-sm font-bold leading-6">Sales fell because organic visibility and conversion weakened at the same time a key competitor lowered price.</p><p className="mt-3 text-xs leading-5 opacity-65">Higher CPC amplified the impact, but inventory remained healthy. Increasing ad spend now would send more traffic to a weaker offer.</p></div><div className="mt-4 rounded-lg border border-primary/20 bg-secondary p-4"><p className="text-[10px] font-extrabold text-primary">Recommended direction</p><p className="mt-2 text-xs font-bold">Improve the offer and listing conversion before scaling PPC.</p></div><Button onClick={next} className="mt-5 w-full sm:w-auto">Prioritize actions <ArrowRight className="size-4" /></Button></div></Panel></div></>;
}

function PrioritizeView({ selected, toggle, next }: { selected: number[]; toggle: (id: number) => void; next: () => void }) {
  const [filter, setFilter] = useState("All");
  const visible = actions.filter(a => filter === "All" || a.priority === filter);
  return <><StepHeader step={4} title="Prioritize by business impact" copy="Review the ranked action queue. Select the recommendations you want to move into your approval plan." /><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex gap-1 rounded-lg border border-border bg-card p-1">{["All", "Critical", "High", "Medium"].map(x => <button key={x} onClick={() => setFilter(x)} className={`rounded-md px-3 py-2 text-[10px] font-extrabold ${filter === x ? "bg-foreground text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>{x}</button>)}</div><p className="text-xs text-muted-foreground"><strong className="text-foreground">{selected.length}</strong> actions selected</p></div><div className="space-y-3">{visible.map((action, index) => <Panel key={action.id} className={`p-4 transition-colors sm:p-5 ${selected.includes(action.id) ? "border-primary/40 bg-secondary/40" : ""}`}><div className="flex flex-col gap-4 lg:flex-row lg:items-center"><div className="flex min-w-0 flex-1 gap-3"><button onClick={() => toggle(action.id)} className={`mt-1 grid size-5 shrink-0 place-items-center rounded border ${selected.includes(action.id) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card"}`} aria-label={`Select ${action.title}`}>{selected.includes(action.id) && <Check className="size-3" />}</button><div><div className="flex flex-wrap items-center gap-2"><span className="text-[9px] font-extrabold text-muted-foreground">#{String(index + 1).padStart(2,"0")}</span><span className={`rounded-full bg-${action.tone}-soft px-2 py-1 text-[9px] font-extrabold text-${action.tone}`}>{action.priority}</span><h3 className="text-sm font-extrabold">{action.title}</h3></div><p className="mt-2 text-xs leading-5 text-muted-foreground">{action.reason}</p></div></div><div className="grid shrink-0 grid-cols-3 gap-5 border-t border-border pt-4 lg:w-[390px] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><div><p className="text-[9px] text-muted-foreground">Expected result</p><p className="mt-1 text-[10px] font-extrabold">{action.result}</p></div><div><p className="text-[9px] text-muted-foreground">Effort</p><p className="mt-1 text-[10px] font-extrabold">{action.effort}</p></div><div><p className="text-[9px] text-muted-foreground">Confidence</p><p className="mt-1 text-[10px] font-extrabold text-success">{action.confidence}%</p></div></div></div></Panel>)}</div><div className="sticky bottom-4 mt-5 flex items-center justify-between rounded-xl border border-border bg-card/95 p-4 shadow-panel backdrop-blur"><p className="text-xs text-muted-foreground"><strong className="text-foreground">{selected.length}</strong> recommendations ready</p><Button onClick={next} disabled={selected.length === 0}>Build action plan <ArrowRight className="size-4" /></Button></div></>;
}

function ActView({ selected, approved, approve, dismiss }: { selected: number[]; approved: number[]; approve: (id: number) => void; dismiss: (id: number) => void }) {
  const selectedActions = actions.filter(a => selected.includes(a.id));
  return <><StepHeader step={5} title="Review and act with confidence" copy="Approve recommendations individually. Nothing is changed without your confirmation." /><div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]"><div className="space-y-3">{selectedActions.length === 0 && <Panel className="p-8 text-center"><PackageCheck className="mx-auto size-8 text-muted-foreground" /><p className="mt-3 text-sm font-extrabold">No actions selected</p><p className="mt-1 text-xs text-muted-foreground">Return to Prioritize and add recommendations.</p></Panel>}{selectedActions.map(action => <Panel key={action.id} className="p-5"><div className="flex items-start gap-3"><ToneIcon tone={approved.includes(action.id) ? "success" : action.tone}>{approved.includes(action.id) ? <Check className="size-5" /> : <Zap className="size-5" />}</ToneIcon><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-extrabold">{action.title}</h3>{approved.includes(action.id) && <span className="rounded-full bg-success-soft px-2 py-1 text-[9px] font-extrabold text-success">Approved</span>}</div><p className="mt-2 text-xs leading-5 text-muted-foreground">{action.reason}</p><div className="mt-4 flex flex-wrap gap-4 text-[10px]"><span><b>Impact:</b> {action.result}</span><span><b>Effort:</b> {action.effort}</span><span><b>Confidence:</b> {action.confidence}%</span></div>{!approved.includes(action.id) && <div className="mt-5 flex gap-2"><Button onClick={() => approve(action.id)}><Check className="size-4" /> Approve action</Button><Button onClick={() => dismiss(action.id)} variant="ghost">Dismiss</Button></div>}</div></div></Panel>)}</div><div className="space-y-5"><Panel className="p-5"><p className="text-[10px] font-extrabold uppercase text-muted-foreground">Action plan</p><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-lg bg-secondary p-4"><p className="text-2xl font-extrabold text-primary">{approved.length}</p><p className="mt-1 text-[9px] text-muted-foreground">Approved</p></div><div className="rounded-lg bg-muted p-4"><p className="text-2xl font-extrabold">{selectedActions.length - approved.length}</p><p className="mt-1 text-[9px] text-muted-foreground">Awaiting review</p></div></div><div className="mt-5 space-y-3">{[["Estimated upside", approved.length ? "£5,940/mo" : "—"], ["Estimated savings", approved.length ? "£420/mo" : "—"], ["Next review", "Tomorrow, 09:00"]].map(([a,b]) => <div key={a} className="flex justify-between border-b border-border pb-3 text-xs"><span className="text-muted-foreground">{a}</span><span className="font-extrabold">{b}</span></div>)}</div></Panel>{approved.length > 0 && <Panel className="border-success/20 bg-success-soft p-5"><CheckCircle2 className="size-6 text-success" /><p className="mt-3 text-sm font-extrabold">Plan updated</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Approved actions are now tracked. You’ll see progress and results in your next analysis.</p></Panel>}</div></div></>;
}

function DashboardPage() {
  const [current, setCurrent] = useState<StepId>("connect");
  const [menuOpen, setMenuOpen] = useState(false);
  const [connected, setConnected] = useState([false, false, false, false]);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [finding, setFinding] = useState(1);
  const [selected, setSelected] = useState<number[]>([1, 2]);
  const [approved, setApproved] = useState<number[]>([]);
  const toggle = (id: number) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const dismiss = (id: number) => { setSelected(s => s.filter(x => x !== id)); setApproved(a => a.filter(x => x !== id)); };
  const progress = steps.findIndex(s => s.id === current) + 1;
  return <div className="min-h-screen bg-muted"><Sidebar current={current} onStep={setCurrent} open={menuOpen} close={() => setMenuOpen(false)} /><div className="lg:pl-64"><Topbar openMenu={() => setMenuOpen(true)} /><div className="border-b border-border bg-card px-4 py-3 sm:px-6"><div className="mx-auto flex max-w-7xl items-center gap-2">{steps.map((s, i) => <div key={s.id} className={`h-1.5 flex-1 rounded-full ${i < progress ? "bg-primary" : "bg-border"}`} />)}</div></div><main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">{current === "connect" && <ConnectView connected={connected} setConnected={setConnected} next={() => setCurrent("analyze")} />}{current === "analyze" && <AnalyzeView complete={analysisComplete} run={() => setAnalysisComplete(true)} next={() => setCurrent("understand")} />}{current === "understand" && <UnderstandView selected={finding} setSelected={setFinding} next={() => setCurrent("prioritize")} />}{current === "prioritize" && <PrioritizeView selected={selected} toggle={toggle} next={() => setCurrent("act")} />}{current === "act" && <ActView selected={selected} approved={approved} approve={id => setApproved(a => a.includes(id) ? a : [...a, id])} dismiss={dismiss} />}</main></div></div>;
}