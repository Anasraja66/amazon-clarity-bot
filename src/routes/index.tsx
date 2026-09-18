import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  CircleAlert,
  CircleCheck,
  Eye,
  Gauge,
  Layers3,
  LineChart,
  Menu,
  MousePointerClick,
  PackageSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Amazon Manager — Your Amazon Business, Managed by AI" },
      { name: "description", content: "Turn Amazon sales, keyword, PPC, competitor and inventory data into clear, prioritised actions." },
      { property: "og:title", content: "AI Amazon Manager — Your Amazon Business, Managed by AI" },
      { property: "og:description", content: "See what changed, understand why, and know what to do next." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const navItems = ["Product", "Features", "Pricing", "FAQ"];

function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2.5 font-extrabold text-foreground" aria-label="AI Amazon Manager home">
      <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground"><BarChart3 className="size-5" /></span>
      <span className="text-[15px] sm:text-base">AI Amazon Manager</span>
    </a>
  );
}

function ActionLink({ href, children, variant = "primary", className = "" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" | "light"; className?: string }) {
  const styles = variant === "primary"
    ? "bg-primary text-primary-foreground hover:bg-primary/90"
    : variant === "light"
      ? "bg-card text-foreground hover:bg-secondary"
      : "border border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary";
  return <a href={href} className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold transition-colors ${styles} ${className}`}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{item}</a>)}
        </nav>
        <div className="hidden md:block"><ActionLink href="/dashboard">Open Dashboard <ArrowRight className="size-4" /></ActionLink></div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-lg border border-border text-foreground md:hidden" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X className="size-5" /> : <Menu className="size-5" />}</button>
      </div>
      {open && <nav className="page-shell flex flex-col gap-1 border-t border-border py-4 md:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-secondary">{item}</a>)}<ActionLink href="/dashboard" className="mt-2">Open Dashboard</ActionLink></nav>}
    </header>
  );
}

function MiniChart() {
  return (
    <div className="relative mt-5 h-24 overflow-hidden" aria-label="Revenue trending upward">
      <div className="absolute inset-0 flex flex-col justify-between">{[1,2,3,4].map(i => <span key={i} className="border-t border-border/70" />)}</div>
      <svg viewBox="0 0 440 95" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" role="img">
        <path d="M0,78 C38,76 55,60 92,65 S150,47 185,52 S248,30 282,38 S340,21 370,27 S410,12 440,9 L440,95 L0,95Z" className="fill-accent/60" />
        <path d="M0,78 C38,76 55,60 92,65 S150,47 185,52 S248,30 282,38 S340,21 370,27 S410,12 440,9" fill="none" className="stroke-primary" strokeWidth="3" />
      </svg>
    </div>
  );
}

function HeroDashboard() {
  return (
    <div className="hero-rise-late relative mx-auto w-full max-w-[610px] lg:mx-0">
      <div className="panel-shadow overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
          <div><p className="text-xs font-bold">Business overview</p><p className="mt-0.5 text-[10px] text-muted-foreground">Last 30 days · United Kingdom</p></div>
          <span className="rounded-md bg-success-soft px-2 py-1 text-[10px] font-bold text-success">Live data</span>
        </div>
        <div className="p-3 sm:p-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[['Revenue','£84,290','+18.4%'],['Sales growth','24.8%','+6.2%'],['ROAS','4.82x','+0.7'],['Conversion','12.6%','+1.4%']].map(([label,value,change]) => (
              <div key={label} className="rounded-lg border border-border bg-background p-3"><p className="text-[9px] font-semibold text-muted-foreground">{label}</p><p className="mt-1 text-base font-extrabold sm:text-lg">{value}</p><p className="mt-1 text-[9px] font-bold text-success">↗ {change}</p></div>
            ))}
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.4fr_1fr]">
            <div className="rounded-lg border border-border p-3"><div className="flex items-center justify-between"><span className="text-[11px] font-bold">Revenue performance</span><span className="text-[9px] text-muted-foreground">May 01–30</span></div><MiniChart /></div>
            <div className="rounded-lg border border-border p-3"><p className="text-[11px] font-bold">AI recommendations</p><div className="mt-3 space-y-2">{[['Keyword opportunity','High impact','success'],['Critical issue','2 detected','danger'],['PPC efficiency','Save £420','primary']].map(([a,b,c]) => <div key={a} className="flex items-center gap-2 rounded-md bg-muted p-2"><span className={`size-1.5 rounded-full bg-${c}`} /><span className="min-w-0 flex-1 truncate text-[9px] font-semibold">{a}</span><span className="text-[9px] font-bold">{b}</span></div>)}</div></div>
          </div>
        </div>
      </div>
      <div className="soft-shadow absolute -bottom-6 -left-3 hidden w-52 rounded-lg border border-border bg-card p-3 sm:block"><div className="flex gap-2"><span className="grid size-7 shrink-0 place-items-center rounded-md bg-success-soft text-success"><TrendingUp className="size-4" /></span><div><p className="text-[10px] font-bold">Growth opportunity</p><p className="mt-1 text-[9px] leading-relaxed text-muted-foreground">3 keywords gaining demand</p></div></div></div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="overflow-hidden border-b border-border bg-surface">
      <div className="page-shell grid min-h-[690px] items-center gap-14 py-16 lg:grid-cols-[0.88fr_1.12fr] lg:py-20">
        <div className="hero-rise text-center lg:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1.5 text-xs font-bold text-primary"><span className="size-1.5 rounded-full bg-primary" />Launching in the UK</div>
          <h1 className="text-[clamp(2.5rem,5vw,4.65rem)] font-extrabold leading-[1.04] tracking-[-0.035em]">Your Amazon Business, <span className="text-primary">Managed by AI.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground lg:mx-0">Stop digging through dashboards. AI Amazon Manager analyzes your Amazon data and tells you what changed, why it happened, and what you should do next.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"><ActionLink href="/dashboard">Start Free <ArrowRight className="size-4" /></ActionLink><ActionLink href="/dashboard" variant="secondary"><Eye className="size-4" /> See How It Works</ActionLink></div>
          <p className="mt-4 text-xs font-medium text-muted-foreground"><CircleCheck className="mr-1 inline size-3.5 text-success" /> No credit card required</p>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}

const problems = [
  [Layers3, "Too Much Data", "Thousands of metrics, keywords and campaigns make it difficult to see what needs attention."],
  [LineChart, "Changing Markets", "A keyword that worked last year may not work today."],
  [CircleAlert, "Hidden Problems", "Sales can fall because of ranking, conversion, pricing, competitors, PPC or inventory — and the real cause isn't always obvious."],
  [Gauge, "Too Many Dashboards", "Sellers waste time moving between different tools just to understand what is happening."],
] as const;

function SectionIntro({ eyebrow, title, copy, center = true }: { eyebrow?: string; title: string; copy?: string; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>{eyebrow && <p className="mb-4 text-xs font-extrabold uppercase text-primary">{eyebrow}</p>}<h2 className="text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">{title}</h2>{copy && <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg">{copy}</p>}</div>;
}

function Problems() {
  return <section className="section-pad bg-background"><div className="page-shell"><SectionIntro eyebrow="The problem" title="Amazon gives you data. We give you decisions." copy="Amazon sellers already have access to huge amounts of data. The problem is knowing what actually matters." /><div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">{problems.map(([Icon,title,copy]) => <article key={title} className="bg-card p-6 sm:p-7"><span className="grid size-10 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-5" /></span><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>;
}

const flow = ["Historical Data", "Current Market", "Competitor Movement", "PPC + Sales + SEO", "AI Analysis", "Prioritized Action"];
function Differentiator() {
  return <section id="product" className="section-pad bg-foreground text-primary-foreground"><div className="page-shell"><SectionIntro eyebrow="The difference" title="Don't just see what happened. Know what to do next." copy="AI Amazon Manager combines historical performance with current market conditions to produce actionable recommendations." /><div className="mt-14 grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center"><div className="space-y-2">{flow.map((item,i) => <div key={item}><div className={`flex items-center gap-4 rounded-lg border px-5 py-3.5 ${i === flow.length - 1 ? 'border-primary bg-primary text-primary-foreground' : 'border-primary-foreground/15 bg-primary-foreground/5'}`}><span className="text-xs font-bold opacity-60">0{i+1}</span><span className="font-bold">{item}</span>{i === flow.length - 1 && <Sparkles className="ml-auto size-4" />}</div>{i < flow.length - 1 && <div className="ml-8 h-2 border-l border-primary-foreground/30" />}</div>)}</div><div className="rounded-xl bg-card p-6 text-card-foreground panel-shadow sm:p-8"><div className="flex items-center justify-between border-b border-border pb-5"><div><p className="text-xs font-extrabold uppercase text-primary">Example</p><p className="mt-2 text-lg font-extrabold">lightweight running shoes</p></div><span className="rounded-md bg-success-soft px-3 py-1 text-xs font-extrabold text-success">SCALE</span></div><div className="grid grid-cols-2 gap-x-6 gap-y-5 py-6 sm:grid-cols-3">{[['Historical performance','Strong'],['Current demand','+32%'],['Competition','Medium'],['Conversion','Strong'],['Organic Rank','#27']].map(([a,b]) => <div key={a}><p className="text-[10px] font-semibold text-muted-foreground">{a}</p><p className="mt-1 text-sm font-extrabold">{b}</p></div>)}</div><div className="rounded-lg border border-primary/20 bg-secondary p-4"><div className="flex gap-3"><span className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Sparkles className="size-4" /></span><div><p className="text-xs font-extrabold text-primary">AI Recommendation</p><p className="mt-2 text-sm leading-6">“Demand is increasing while conversion remains strong. Increase keyword visibility and expand PPC targeting.”</p></div></div></div></div></div></div></section>;
}

const features = [
  [Search,"Historical Keyword Intelligence","Understand which keywords actually generated results in the past — and whether they are still worth targeting today."],
  [TrendingDown,"Sales Drop Diagnosis","AI investigates ranking, traffic, CTR, conversion, PPC, pricing, competitors, reviews and inventory to identify likely causes."],
  [Users,"Competitor Intelligence","Monitor competitor pricing, rankings, reviews and listing changes to understand how the market is moving."],
  [Target,"PPC Intelligence","Analyze spend, ACOS, ROAS, CPC, conversion and campaigns to identify wasted spend and scaling opportunities."],
  [Sparkles,"AI Growth Recommendations","Get prioritised recommendations that explain what happened, why, what to do and why it matters."],
  [Zap,"Daily Action Plan","Every day, see the most important actions for your Amazon business in priority order."],
] as const;
function Features() { return <section id="features" className="section-pad bg-background"><div className="page-shell"><SectionIntro eyebrow="Core intelligence" title="Everything your Amazon business needs to make better decisions." /><div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{features.map(([Icon,title,copy],i) => <article key={title} className="rounded-xl border border-border bg-card p-7 soft-shadow"><div className="flex items-center justify-between"><span className="grid size-11 place-items-center rounded-lg bg-secondary text-primary"><Icon className="size-5" /></span><span className="text-xs font-extrabold text-muted-foreground">0{i+1}</span></div><h3 className="mt-7 text-lg font-extrabold">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section>; }

function WhySection() {
  const signals = [["Organic ranking","#8 → #21","danger"],["Conversion rate","11.2% → 8.7%","danger"],["Competitor price","↓ 7%","warning"],["PPC CPC","↑ 14%","danger"],["Inventory","42 days remaining","success"]];
  return <section className="section-pad border-y border-border bg-surface"><div className="page-shell grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center"><div><p className="mb-4 text-xs font-extrabold uppercase text-primary">Connected reasoning</p><h2 className="text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">AI that explains the “why.”</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Most tools show you that something changed.</p><p className="mt-2 text-lg font-bold">AI Amazon Manager goes one step further.</p></div><div className="overflow-hidden rounded-xl border border-border bg-card panel-shadow"><div className="flex items-center justify-between border-b border-border p-5"><div><p className="text-xs text-muted-foreground">Detected change</p><p className="mt-1 text-xl font-extrabold">Sales <span className="text-danger">↓ 18%</span></p></div><CircleAlert className="size-6 text-danger" /></div><div className="grid gap-px bg-border sm:grid-cols-5">{signals.map(([a,b,c]) => <div key={a} className="bg-card p-4"><p className="text-[10px] font-semibold text-muted-foreground">{a}</p><p className={`mt-2 text-xs font-extrabold text-${c}`}>{b}</p></div>)}</div><div className="p-5 sm:p-6"><div className="rounded-lg border border-primary/20 bg-secondary p-5"><div className="flex items-start gap-3"><span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground"><Sparkles className="size-4" /></span><div><p className="text-xs font-extrabold text-primary">Recommended Action</p><p className="mt-2 text-sm font-bold leading-6">Fix conversion and offer positioning before increasing PPC spend.</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Ranking and conversion weakened together while a competitor reduced price. More ad spend is unlikely to solve the underlying issue.</p></div></div></div></div></div></div></section>;
}

const steps = [["Connect","Connect your Amazon data."],["Analyze","AI analyzes sales, keywords, PPC, competitors, pricing, reviews and inventory."],["Understand","The system identifies changes, problems and opportunities."],["Prioritize","Actions are ranked based on potential business impact."],["Act","Follow the recommendation or approve automation where available."]];
function Workflow() { return <section className="section-pad bg-background"><div className="page-shell"><SectionIntro eyebrow="How it works" title="From Amazon data to your next move." /><div className="relative mt-14 grid gap-4 md:grid-cols-5"><div className="absolute left-[10%] right-[10%] top-6 hidden border-t border-dashed border-line md:block" />{steps.map(([title,copy],i) => <article key={title} className="relative bg-background text-center"><span className="relative z-10 mx-auto grid size-12 place-items-center rounded-full border border-primary/30 bg-secondary text-xs font-extrabold text-primary">0{i+1}</span><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-xs leading-5 text-muted-foreground">{copy}</p></article>)}</div></div></section>; }

function FullDashboard() {
  const kpis = [['Revenue','£84,290','+18.4%'],['Orders','2,481','+12.1%'],['ROAS','4.82x','+0.7'],['ACOS','20.7%','-3.2%'],['Conversion','12.6%','+1.4%'],['Ad Spend','£8,940','+5.1%']];
  return <div className="panel-shadow overflow-hidden rounded-xl border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-4 py-4 sm:px-6"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-md bg-primary text-primary-foreground"><BarChart3 className="size-4" /></span><div><p className="text-xs font-extrabold">Business Intelligence</p><p className="text-[9px] text-muted-foreground">Amazon.co.uk · All products</p></div></div><span className="hidden rounded-md border border-border px-3 py-1.5 text-[10px] font-bold sm:block">Last 30 days⌄</span></div><div className="bg-muted p-3 sm:p-5"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">{kpis.map(([a,b,c]) => <div key={a} className="rounded-lg border border-border bg-card p-3"><p className="text-[9px] font-semibold text-muted-foreground">{a}</p><p className="mt-1 text-sm font-extrabold sm:text-base">{b}</p><p className="mt-1 text-[9px] font-bold text-success">{c}</p></div>)}</div><div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr]"><div className="rounded-lg border border-border bg-card p-4"><div className="flex items-center justify-between"><p className="text-xs font-extrabold">Revenue & orders</p><span className="text-[9px] text-muted-foreground">Daily</span></div><MiniChart /><div className="mt-3 flex gap-4 text-[9px] font-semibold text-muted-foreground"><span><i className="mr-1 inline-block size-2 rounded-full bg-primary" /> Revenue</span><span><i className="mr-1 inline-block size-2 rounded-full bg-success" /> Orders</span></div></div><div className="rounded-lg border border-border bg-card p-4"><p className="text-xs font-extrabold">Critical Issues</p><div className="mt-4 rounded-lg bg-danger-soft p-3"><p className="text-[10px] font-extrabold text-danger">Conversion rate dropped 22%</p><p className="mt-1 text-[9px] leading-4 text-muted-foreground">3 products affected · High impact</p></div><div className="mt-2 rounded-lg bg-warning-soft p-3"><p className="text-[10px] font-extrabold text-warning">Stock risk detected</p><p className="mt-1 text-[9px] text-muted-foreground">SKU RUN-104 · 12 days remaining</p></div></div><div className="rounded-lg border border-border bg-card p-4"><p className="text-xs font-extrabold">Growth Opportunities</p><div className="mt-4 rounded-lg bg-success-soft p-3"><p className="text-[10px] font-extrabold text-success">Keyword demand increased 32%</p><p className="mt-1 text-[9px] leading-4 text-muted-foreground">“lightweight running shoes”</p></div><p className="mt-4 text-[10px] font-extrabold">AI Actions</p><div className="mt-2 space-y-2">{['Review listing images','Reduce wasted PPC spend','Test competitor keyword','Monitor inventory'].map(x => <div key={x} className="flex items-center gap-2 text-[9px] font-semibold"><Check className="size-3 text-primary" />{x}</div>)}</div></div></div></div></div>;
}

function DashboardSection() { return <section className="section-pad bg-foreground text-primary-foreground"><div className="page-shell"><SectionIntro eyebrow="Your command centre" title="One place to understand your Amazon business." copy="See the signal behind every metric, then move directly from insight to action." /><div className="mt-14 text-foreground"><FullDashboard /></div></div></section>; }

const plans = [
  { name:'Starter', price:'15', copy:'For sellers getting started with AI.', features:['1 Amazon account','Basic sales analytics','Keyword intelligence','Basic competitor analysis','AI recommendations','Limited AI usage'] },
  { name:'Growth', price:'29', copy:'For growing sellers ready to move faster.', popular:true, features:['Advanced historical keyword intelligence','Sales drop diagnosis','Competitor intelligence','PPC analysis','Listing recommendations','Daily AI action plan','Higher AI usage limits'] },
  { name:'Pro', price:'49', copy:'For serious Amazon sellers.', features:['Multiple products','Advanced competitor intelligence','Advanced PPC insights','Inventory intelligence','Pricing intelligence','Advanced AI recommendations','Higher usage limits','Priority features'] },
];
function Pricing() { return <section id="pricing" className="section-pad bg-background"><div className="page-shell"><SectionIntro eyebrow="Pricing" title="Simple pricing. Built for Amazon sellers." /><div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">{plans.map(p => <article key={p.name} className={`relative flex flex-col rounded-xl border bg-card p-7 ${p.popular ? 'border-primary panel-shadow lg:-translate-y-3' : 'border-border soft-shadow'}`}>{p.popular && <span className="absolute right-5 top-0 -translate-y-1/2 rounded-full bg-primary px-3 py-1 text-[9px] font-extrabold uppercase text-primary-foreground">Most Popular</span>}<h3 className="text-lg font-extrabold">{p.name}</h3><p className="mt-2 min-h-10 text-sm text-muted-foreground">{p.copy}</p><p className="mt-7 flex items-end gap-1"><span className="text-4xl font-extrabold">£{p.price}</span><span className="pb-1 text-sm text-muted-foreground">/month</span></p><div className="my-7 border-t border-border" /><ul className="flex-1 space-y-3">{p.features.map(f => <li key={f} className="flex gap-2.5 text-sm"><CircleCheck className="mt-0.5 size-4 shrink-0 text-primary" /><span>{f}</span></li>)}</ul><ActionLink href="#final-cta" variant={p.popular ? 'primary' : 'secondary'} className="mt-8 w-full">Start Free <ArrowRight className="size-4" /></ActionLink></article>)}</div><p className="mt-8 text-center text-sm font-semibold text-muted-foreground">Launching with founding customer pricing in the UK.</p></div></section>; }

const faqs = [
  ["Does AI Amazon Manager replace Amazon Seller Central?","No. It works alongside your Amazon data and turns complex information into actionable insights."],
  ["Does it only analyze PPC?","No. It combines sales, keywords, PPC, competitors, pricing, reviews, inventory and historical performance."],
  ["Can it tell me why my sales dropped?","Yes. It analyzes multiple signals to identify the most likely causes and recommends what to investigate or change."],
  ["Does it use my historical data?","Yes. Historical performance is an important part of the system because past performance should be compared with current market conditions."],
  ["Can it automate actions?","Automation will be introduced progressively. Recommendations should be explainable and, where appropriate, require user approval before changes are executed."],
  ["Who is it for?","Amazon sellers, brands, agencies and businesses that want a clearer way to understand and grow their Amazon business."],
];
function FAQ() { return <section id="faq" className="section-pad border-t border-border bg-surface"><div className="page-shell grid gap-10 lg:grid-cols-[0.65fr_1.35fr]"><div><p className="mb-4 text-xs font-extrabold uppercase text-primary">FAQ</p><h2 className="text-3xl font-extrabold tracking-[-0.025em] sm:text-5xl">Questions, answered.</h2><p className="mt-5 text-muted-foreground">Everything you need to know before getting started.</p></div><div className="divide-y divide-border border-y border-border">{faqs.map(([q,a],i) => <details key={q} className="group py-5" open={i === 0}><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold"><span>{q}</span><ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" /></summary><p className="max-w-2xl pt-4 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></div></section>; }

function Footer() { return <><section id="final-cta" className="bg-primary py-20 text-primary-foreground"><div className="page-shell text-center"><p className="text-xs font-extrabold uppercase opacity-80">Launching in the UK</p><h2 className="mx-auto mt-5 max-w-4xl text-3xl font-extrabold leading-tight tracking-[-0.025em] sm:text-5xl">Stop Managing Amazon From 20 Different Dashboards.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 opacity-80">Let AI Amazon Manager tell you what changed, why it matters, and what to do next.</p><ActionLink href="#pricing" variant="light" className="mt-8">Start Free <ArrowRight className="size-4" /></ActionLink></div></section><footer className="bg-foreground py-12 text-primary-foreground"><div className="page-shell flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><Logo /><p className="mt-3 text-sm opacity-60">Your Amazon Business, Managed by AI.</p></div><nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold opacity-70">{['Product','Features','Pricing','FAQ','Contact','Privacy','Terms'].map(x => <a key={x} href={['Product','Features','Pricing','FAQ'].includes(x) ? `#${x.toLowerCase()}` : `mailto:hello@aiamazonmanager.co.uk`}>{x}</a>)}</nav></div><div className="page-shell mt-10 border-t border-primary-foreground/10 pt-6 text-[11px] opacity-40">© 2026 AI Amazon Manager. All rights reserved.</div></footer></>; }

function LandingPage() {
  return <main><Header /><Hero /><Problems /><Differentiator /><Features /><WhySection /><Workflow /><DashboardSection /><Pricing /><FAQ /><Footer /></main>;
}