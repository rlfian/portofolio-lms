# ====================================================================
# PORTOFOLIO LMS - VERCEL ONE-COMMAND DEPLOY SCRIPT
# Author: Antigravity Squad for Rio Alfian
# ====================================================================

Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host "          MEMULAI DEPLOYMENT PORTOFOLIO LMS KE VERCEL" -ForegroundColor Cyan
Write-Host "====================================================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah Vercel CLI sudah terautentikasi
Write-Host "[1/2] Menyiapkan kredensial & otorisasi..." -ForegroundColor Yellow
npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "[!] Anda belum login ke Vercel CLI. Membuka jendela login di browser..." -ForegroundColor Green
    npx vercel login
}

Write-Host ""
Write-Host "[2/2] Membangun dan meluncurkan ke Vercel Production..." -ForegroundColor Yellow
npx vercel --prod --yes

Write-Host ""
Write-Host "====================================================================" -ForegroundColor Green
Write-Host "   SELAMAT! PROYEK TELAH BERHASIL DILUNCURKAN KE VERCEL PRODUCTION  " -ForegroundColor Green
Write-Host "====================================================================" -ForegroundColor Green
