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
  "hoyolab": {
    app: "hoyolab",
    name: "HoYoLAB Easy Check-In Hub",
    version: "1.2.0",
    release_date: "2026-11-09",
    changelog: [
      "🎮 Mendukung seluruh 6 judul game HoYoverse: Genshin Impact, Honkai: Star Rail, Zenless Zone Zero, Honkai Impact 3rd, Tears of Themis, HoYoLAB Community",
      "⚙️ Fitur Game Toggle checklist: bebas aktifkan/nonaktifkan check-in untuk game tertentu",
      "⚡ Perintah CLI resmi 'hoyolab' di samping alias 'genshin-checkin'",
      "🔄 In-app auto-updater dengan progress check & 1-klik pasang update"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/genshin-checkin/main/checkin.py"
  },
  "genshin-checkin": {
    app: "genshin-checkin",
    name: "HoYoLAB Easy Check-In Hub (formerly genshin-checkin)",
    version: "1.2.0",
    release_date: "2026-11-09",
    changelog: [
      "🎮 Rebranded to 'hoyolab' with full support for all 6 HoYoverse games",
      "⚙️ Added Game Toggle feature to enable/disable check-ins per game",
      "⚡ New official global command 'hoyolab'",
      "🔄 In-app auto-updater with changelog prompt"
    ],
    download_url: "https://raw.githubusercontent.com/sammmms/genshin-checkin/main/checkin.py"
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
