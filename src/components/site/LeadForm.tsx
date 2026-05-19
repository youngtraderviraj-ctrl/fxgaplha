import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, CheckCircle2, Loader2, Lock, MessageCircle, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const OPEN_EVENT = "fxg:open-lead-form";
export const openLeadForm = () => {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_EVENT));
};

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(200),
  phone: z.string().trim().min(6, "Enter a valid number").max(30),
  capital: z.string().min(1, "Select a range"),
  broker: z.string().trim().max(60).optional().or(z.literal("")),
});

type FormState = z.infer<typeof schema>;
type ErrState = Partial<Record<keyof FormState, string>>;

const initial: FormState = { name: "", email: "", phone: "", capital: "", broker: "" };

export function LeadForm() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<ErrState>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, handler);
    const onHash = () => {
      if (window.location.hash === "#claim") {
        setOpen(true);
        history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(OPEN_EVENT, handler);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onChange = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: ErrState = {};
      for (const i of parsed.error.issues) errs[i.path[0] as keyof FormState] = i.message;
      setErrors(errs);
      toast.error("Please fix the highlighted fields");
      return;
    }
    setLoading(true);
    try {
      const stored = JSON.parse(localStorage.getItem("fxg_leads") || "[]");
      stored.push({ ...parsed.data, at: new Date().toISOString() });
      localStorage.setItem("fxg_leads", JSON.stringify(stored));
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
      toast.success("You're on the list. Our team will reach out within 24h.");
      setForm(initial);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/40 outline-none transition-smooth focus:border-[oklch(0.78_0.18_230)] focus:bg-white/[0.07] focus:shadow-glow";

  return (
    <>
      {/* Floating chat trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Claim your slot"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 group inline-flex items-center gap-2 rounded-full bg-gradient-blue text-white pl-4 pr-5 py-3 sm:py-3.5 shadow-[0_10px_40px_-10px_oklch(0.65_0.22_240/0.7)] hover:shadow-[0_15px_50px_-10px_oklch(0.65_0.22_240/0.9)] transition-all hover:-translate-y-0.5 animate-shine overflow-hidden"
      >
        <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/25 to-transparent opacity-60 pointer-events-none" />
        <span className="relative flex h-9 w-9 -ml-2 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <MessageCircle className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-ink animate-pulse" />
        </span>
        <span className="relative text-sm font-semibold hidden sm:inline">Claim Your Slot</span>
      </button>

      {/* Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-ink/70 backdrop-blur-md animate-fade-up"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-ink text-white border border-white/10 shadow-elevated animate-scale-in">
            <div
              className="absolute -inset-4 rounded-3xl opacity-50 pointer-events-none"
              style={{ background: "var(--gradient-glow)", filter: "blur(40px)" }}
            />
            <div className="relative p-5 sm:p-7">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute top-3 right-3 h-9 w-9 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/10 transition-smooth"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[11px] text-white/80 mb-4">
                <Sparkles className="h-3 w-3 text-[oklch(0.78_0.18_230)]" />
                Only 50 slots remaining this month
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                Claim Your <span className="text-gradient">Slot</span>.
              </h3>
              <p className="mt-2 text-sm text-white/65">
                Drop your details — we'll get you set up within 24 hours.
              </p>

              <div className="relative mt-5">
                {done ? (
                  <div className="text-center py-10">
                    <div className="mx-auto h-14 w-14 rounded-full bg-emerald-400/15 grid place-items-center mb-4">
                      <CheckCircle2 className="h-7 w-7 text-emerald-400" />
                    </div>
                    <h3 className="font-display text-2xl font-bold">You're in.</h3>
                    <p className="mt-2 text-sm text-white/65 max-w-sm mx-auto">
                      Our onboarding team will reach out within 24 hours to activate your account.
                    </p>
                    <Button variant="glass" size="lg" className="mt-6" onClick={() => setDone(false)}>
                      Submit another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} noValidate className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display text-xl font-semibold">Get started — it's free</h3>
                      <span className="text-[10px] uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Accepting
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Full name"
                        value={form.name}
                        onChange={onChange("name")}
                        className={inputCls}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.name}</p>}
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="email"
                          autoComplete="email"
                          placeholder="Email address"
                          value={form.email}
                          onChange={onChange("email")}
                          className={inputCls}
                          aria-invalid={!!errors.email}
                        />
                        {errors.email && <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.email}</p>}
                      </div>
                      <div>
                        <input
                          type="tel"
                          autoComplete="tel"
                          placeholder="Phone / WhatsApp"
                          value={form.phone}
                          onChange={onChange("phone")}
                          className={inputCls}
                          aria-invalid={!!errors.phone}
                        />
                        {errors.phone && <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <select
                          value={form.capital}
                          onChange={onChange("capital")}
                          className={`${inputCls} appearance-none cursor-pointer`}
                          aria-invalid={!!errors.capital}
                        >
                          <option value="" className="bg-ink">Account size</option>
                          <option value="<1000" className="bg-ink">Under $1,000</option>
                          <option value="1000-5000" className="bg-ink">$1,000 – $5,000</option>
                          <option value="5000-25000" className="bg-ink">$5,000 – $25,000</option>
                          <option value="25000-100000" className="bg-ink">$25,000 – $100,000</option>
                          <option value="100000+" className="bg-ink">$100,000+</option>
                        </select>
                        {errors.capital && <p className="text-xs text-rose-400 mt-1.5 ml-1">{errors.capital}</p>}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Broker (optional)"
                          value={form.broker}
                          onChange={onChange("broker")}
                          className={inputCls}
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      variant="hero"
                      size="xl"
                      disabled={loading}
                      className="w-full relative overflow-hidden animate-shine mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" /> Submitting…
                        </>
                      ) : (
                        <>
                          Claim My Slot <ArrowRight />
                        </>
                      )}
                    </Button>

                    <p className="text-[11px] text-white/45 text-center flex items-center justify-center gap-1.5">
                      <Lock className="h-3 w-3" /> Your data is encrypted. We never share it.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
