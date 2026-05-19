import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  getConsent,
  setConsent,
  OPEN_SETTINGS_EVENT,
} from "@/lib/cookie-consent";

export function CookieConsent() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    const existing = getConsent();
    if (existing) {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    } else {
      const t = window.setTimeout(() => setShowBanner(true), 400);
      return () => window.clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const onOpen = () => {
      const current = getConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setDialogOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen);
  }, [mounted]);

  useEffect(() => {
    if (showBanner) acceptRef.current?.focus();
  }, [showBanner]);

  if (!mounted) return null;

  const acceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setAnalytics(true);
    setMarketing(true);
    setShowBanner(false);
    setDialogOpen(false);
  };

  const savePreferences = () => {
    setConsent({ analytics, marketing });
    setShowBanner(false);
    setDialogOpen(false);
  };

  return (
    <>
      {showBanner && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          className="fixed bottom-0 inset-x-0 z-50 bg-surface text-surface-foreground border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        >
          <div className="max-w-5xl mx-auto px-5 md:px-6 py-4 md:py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <p className="text-sm text-zinc-300 leading-relaxed flex-1">
              We use cookies to make the site work and to understand how
              visitors use it. Essential cookies are always on. See our{" "}
              <Link
                to="/privacy"
                hash="cookies"
                className="text-brand underline-offset-2 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 shrink-0">
              <Button
                variant="outline"
                className="bg-transparent border-white/20 text-zinc-100 hover:bg-white/10 hover:text-zinc-100"
                onClick={() => setDialogOpen(true)}
              >
                Customize
              </Button>
              <Button
                ref={acceptRef}
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={acceptAll}
              >
                Accept all
              </Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Cookie preferences</DialogTitle>
            <DialogDescription>
              Choose which categories of cookies you allow. You can change this
              any time from the footer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <Row
              title="Essential"
              description="Required for the site to work — security and remembering your cookie preferences."
              checked
              disabled
              onChange={() => {}}
            />
            <Row
              title="Analytics"
              description="Helps us understand how visitors use the site so we can improve it."
              checked={analytics}
              onChange={setAnalytics}
            />
            <Row
              title="Marketing"
              description="Used to measure ads and personalize promotions. Currently unused."
              checked={marketing}
              onChange={setMarketing}
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button variant="outline" onClick={savePreferences}>
              Save preferences
            </Button>
            <Button
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              onClick={acceptAll}
            >
              Accept all
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function Row({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-border pb-4 last:border-b-0 last:pb-0">
      <div className="flex-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
      <Switch
        checked={checked}
        disabled={disabled}
        onCheckedChange={onChange}
        aria-label={title}
      />
    </div>
  );
}