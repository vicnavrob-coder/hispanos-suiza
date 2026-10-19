"use client";
import { useState, useEffect } from "react";
import { getUser } from "@/lib/auth";

export type SubscriptionStatus = {
  loading: boolean;
  active: boolean;
  plan: string | null;
  renewsAt: string | null;
};

export function useSubscription(): SubscriptionStatus {
  const [status, setStatus] = useState<SubscriptionStatus>({
    loading: true,
    active: false,
    plan: null,
    renewsAt: null,
  });

  useEffect(() => {
    const user = getUser();
    if (!user?.email) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Client-only auth check
      setStatus({ loading: false, active: false, plan: null, renewsAt: null });
      return;
    }

    // Check cache first (5 min TTL)
    const cacheKey = `hs_sub_${user.email}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < 5 * 60 * 1000) {
          setStatus({ loading: false, ...data });
          return;
        }
      } catch {}
    }

    fetch(`/api/stripe/status?email=${encodeURIComponent(user.email)}`)
      .then((r) => r.json())
      .then((data) => {
        const result = {
          active: data.active ?? false,
          plan: data.plan ?? null,
          renewsAt: data.renewsAt ?? null,
        };
        localStorage.setItem(cacheKey, JSON.stringify({ data: result, ts: Date.now() }));
        setStatus({ loading: false, ...result });
      })
      .catch(() => {
        setStatus({ loading: false, active: false, plan: null, renewsAt: null });
      });
  }, []);

  return status;
}
