import { NextResponse } from "next/server";

const APP_UPDATES: Record<string, any> = {
  "tiktok-streak": {
    app: "tiktok-streak",
    name: "TikTok Streak Auto-Saver & Helper Hub",
    version: "1.3.0",
    release_date: "2026-11-10",
    changelog: [
      "💬 Konfigurasi Pesan Dinamis: Message Pool (rotasi acak harian agar anti-spam/bot)",
      "🏷️  Template Placeholders: {name}, {first_name}, {time_greeting}, {day}, {date}",
      "👤 Pesan Khusus per Kontak (Contact Overrides)",
      "⚡ Pengaturan Kecepatan (Pacing: Cepat, Normal, Santai) & Batas Jam Aman (Safe Hours)",
      "📜 Sistem Audit Logging & Retensi Otomatis 3 Hari (pekerjaan & perubahan konfigurasi)",
      "🛠️  Internet Readiness Waiter & Multi-Interval Catch-up saat Mac bangun tidur"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/tiktok-streak/main/tiktok-streak.py"
  },
  "snapchat-streak": {
    app: "snapchat-streak",
    name: "Snapchat Streak Auto-Saver & Helper Hub",
    version: "1.0.0",
    release_date: "2026-11-10",
    changelog: [
      "🚀 Initial Release: Snapchat Streak Automation Hub",
      "📸 Automated Snap camera capture & dispatch via web.snapchat.com",
      "🔥 Auto-detect friends with active Snap streaks",
      "⏰ macOS LaunchAgent scheduler with morning run and wake-up catch-up",
      "📜 3-Day activity and audit logging with automatic pruning",
      "📱 Native Telegram Bot & Discord Webhook notification integration",
      "🎨 Dynamic Snap caption generator with variable formatting ({name}, {first_name}, {time_greeting}, {date})"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/snapchat-streak/main/snapchat-streak.py"
  },
  "hoyolab-checkin": {
    app: "hoyolab-checkin",
    name: "HoYoLAB Check-In Hub",
    version: "1.3.0",
    release_date: "2026-11-10",
    changelog: [
      "🏷️  Project resmi diganti nama menjadi 'hoyolab-checkin'",
      "📦 Standardisasi install.sh dengan Virtual Environment terisolasi",
      "⏰ Multi-interval hourly wake-up catch-up pada macOS LaunchAgent",
      "⚡ Dukungan penuh untuk 3 alias perintah: 'hoyolab-checkin', 'hoyolab', dan 'genshin-checkin'"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/hoyolab-checkin/main/checkin.py"
  },
  "hoyolab": {
    app: "hoyolab-checkin",
    name: "HoYoLAB Check-In Hub",
    version: "1.3.0",
    release_date: "2026-11-10",
    changelog: [
      "🏷️  Project resmi diganti nama menjadi 'hoyolab-checkin'",
      "📦 Standardisasi install.sh dengan Virtual Environment terisolasi",
      "⏰ Multi-interval hourly wake-up catch-up pada macOS LaunchAgent",
      "⚡ Dukungan penuh untuk 3 alias perintah: 'hoyolab-checkin', 'hoyolab', dan 'genshin-checkin'"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/hoyolab-checkin/main/checkin.py"
  },
  "genshin-checkin": {
    app: "hoyolab-checkin",
    name: "HoYoLAB Check-In Hub (formerly genshin-checkin)",
    version: "1.3.0",
    release_date: "2026-11-10",
    changelog: [
      "🏷️  Project resmi diganti nama menjadi 'hoyolab-checkin'",
      "📦 Standardisasi install.sh dengan Virtual Environment terisolasi",
      "⏰ Multi-interval hourly wake-up catch-up pada macOS LaunchAgent",
      "⚡ Dukungan penuh untuk 3 alias perintah: 'hoyolab-checkin', 'hoyolab', dan 'genshin-checkin'"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/hoyolab-checkin/main/checkin.py"
  }
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const app = searchParams.get("app")?.toLowerCase();

  if (!app) {
    return NextResponse.json({
      status: "ok",
      available_apps: Object.keys(APP_UPDATES),
      message: "Specify ?app=tiktok-streak or ?app=hoyolab"
    });
  }

  const updateInfo = APP_UPDATES[app];
  if (!updateInfo) {
    return NextResponse.json(
      { error: `App '${app}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(updateInfo, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
