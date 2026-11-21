import { NextRequest, NextResponse } from "next/server";
import { getSubscribers } from "@/lib/subscribers";

export const runtime = "nodejs";

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || process.env.CRON_SECRET || "hispanos-admin-2026";

interface AnalyticsData {
  subscribers: {
    total: number;
    bySource: Record<string, number>;
    byWelcomeStep: Record<string, number>;
    recentSignups: Array<{ email: string; nombre: string; createdAt: string; source: string }>;
    growthRate: number; // percentage growth from last week
  };
  newsletter: {
    totalSent: number;
    openRate: number; // placeholder - would need email tracking
    clickRate: number; // placeholder
  };
  system: {
    cacheHitRate: number; // placeholder
    averageResponseTime: number; // placeholder
  };
}

export async function GET(req: NextRequest) {
  // Check admin token authentication
  const token = req.nextUrl.searchParams.get("token");

  if (token !== ADMIN_TOKEN) {
    return NextResponse.json({ error: "Unauthorized - Invalid token" }, { status: 401 });
  }

  try {
    // Get all subscribers
    const subs = await getSubscribers(true); // Skip cache for fresh data

    if (!subs) {
      return NextResponse.json(
        { error: "Failed to fetch subscribers" },
        { status: 500 }
      );
    }

    // Calculate metrics
    const bySource: Record<string, number> = {};
    const byWelcomeStep: Record<string, number> = {};

    subs.forEach((sub) => {
      // Count by source
      bySource[sub.source] = (bySource[sub.source] || 0) + 1;

      // Count by welcome step
      const step = `Step ${sub.welcomeStep}`;
      byWelcomeStep[step] = (byWelcomeStep[step] || 0) + 1;
    });

    // Get recent signups (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSignups = subs
      .filter((sub) => new Date(sub.createdAt) > sevenDaysAgo)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10)
      .map((sub) => ({
        email: sub.email,
        nombre: sub.nombre,
        createdAt: sub.createdAt,
        source: sub.source,
      }));

    // Calculate growth rate (last 7 days vs previous 7 days)
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

    const lastWeekCount = subs.filter(
      (sub) => new Date(sub.createdAt) > sevenDaysAgo
    ).length;

    const previousWeekCount = subs.filter(
      (sub) =>
        new Date(sub.createdAt) > fourteenDaysAgo &&
        new Date(sub.createdAt) <= sevenDaysAgo
    ).length;

    const growthRate =
      previousWeekCount > 0
        ? ((lastWeekCount - previousWeekCount) / previousWeekCount) * 100
        : lastWeekCount > 0
        ? 100
        : 0;

    // Calculate total emails sent
    const totalSent = subs.reduce((acc, sub) => acc + sub.welcomeStep, 0);

    const analytics: AnalyticsData = {
      subscribers: {
        total: subs.length,
        bySource,
        byWelcomeStep,
        recentSignups,
        growthRate: Math.round(growthRate * 10) / 10,
      },
      newsletter: {
        totalSent,
        openRate: 0, // Placeholder - would need email tracking
        clickRate: 0, // Placeholder
      },
      system: {
        cacheHitRate: 0, // Placeholder
        averageResponseTime: 0, // Placeholder
      },
    };

    return NextResponse.json(analytics);
  } catch (error) {
    console.error("[analytics] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
