# Sobri — toko produk digital

E-commerce mobile-first berbasis Vite, React, TypeScript, Tailwind, React Router, Supabase, Midtrans Snap, dan Vercel Functions. Tanpa kredensial, aplikasi berjalan dalam **mode demo** dan tidak mengaktifkan pembayaran atau produk nyata.

## Instalasi dan pemeriksaan

```bash
npm install
cp .env.example .env.local
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Supabase

1. Buat project, lalu isi URL, anon key, dan service-role key sesuai `.env.example`.
2. Jalankan `supabase/schema.sql` di SQL Editor untuk tabel, relasi, indeks, RLS, policy, role, dan bucket privat.
3. Aktifkan email/password serta magic link di Authentication; atur Site URL dan redirect produksi.
4. Buat pengguna admin, lalu ubah `profiles.role` ke `admin` melalui lingkungan tepercaya.
5. Unggah file ke bucket privat `products`; simpan hanya `storage_path`, bukan signed URL.
6. Data demo terpusat ada di `src/data/products.ts` dan dapat diimpor/diganti dari dashboard.

Service role hanya boleh digunakan oleh Vercel Functions. Secret tidak boleh diberi awalan `VITE_`.

## Midtrans dan webhook

1. Ambil Server Key/Client Key Sandbox, isi environment, dan gunakan `MIDTRANS_IS_PRODUCTION=false`.
2. Atur HTTP Notification URL: `https://domain-anda/api/webhook`.
3. Aktifkan QRIS, virtual account, transfer bank, dan e-wallet di Midtrans.
4. Uji pending, settlement, deny, expire, serta refund. Webhook memverifikasi SHA-512 dan transaction ID unik menjaga idempotensi.
5. Setelah lulus pengujian, pasang production key dan ubah flag produksi.

Redirect browser bukan bukti pembayaran. Server membaca ulang harga database. Download memverifikasi sesi dan kepemilikan `paid`, kemudian menerbitkan signed URL 5 menit.

## Email

Isi Resend key, pengirim, dan email admin; verifikasi domain. Template responsif tersedia di `emails/templates.ts`. Hubungkan Resend ke webhook/worker serta gunakan antrean untuk retry dan pengingat pending.

## Branding, admin, dan produk

Edit katalog demo di `src/data/products.ts`, token visual di `src/index.css`, dan logo teks di `src/components/Layout.tsx`. Sebelum dashboard admin digunakan, setiap endpoint admin wajib memvalidasi JWT dan `profiles.role=admin`; menyembunyikan menu bukan otorisasi.

## Deploy Vercel

1. Import repository ke Vercel; preset Vite, build `npm run build`, output `dist`.
2. Isi semua environment dari `.env.example` untuk Production/Preview.
3. Deploy lalu perbarui Site URL Supabase, redirect auth, callback Midtrans, canonical, dan webhook dengan domain HTTPS final.
4. Untuk custom domain buka **Project → Domains**, tambahkan domain, lalu ikuti petunjuk DNS.
5. `vercel.json` sudah memuat SPA rewrite dan security headers.

## Checklist produksi

- [ ] RLS diuji sebagai anonymous, customer, dan admin; bucket tetap privat.
- [ ] Harga, kupon, status produk, kepemilikan, role, dan batas download diverifikasi server.
- [ ] Midtrans production, webhook idempoten, refund, dan rekonsiliasi diuji end-to-end.
- [ ] Order-item snapshot serta aktivasi akses dari webhook terverifikasi diselesaikan.
- [ ] Resend/domain aktif dan seluruh email diuji.
- [ ] Rate limit persisten (Redis/KV) menggantikan fallback memory untuk multi-instance.
- [ ] Monitoring, audit log, backup, alert webhook, dan SOP dukungan aktif.
- [ ] Dokumen legal ditinjau; identitas bisnis dan kontak sudah benar.
- [ ] Sitemap/canonical memakai domain final dan audit Lighthouse dijalankan.
- [ ] Testimoni berlabel demo tidak dipublikasikan sebagai klaim pelanggan nyata.

Fondasi ini siap dikonfigurasi, tetapi transaksi nyata memerlukan kredensial vendor, penyelesaian integrasi operasional, dan pengujian produksi.
