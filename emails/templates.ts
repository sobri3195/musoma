const shell = (title: string, content: string) => `<!doctype html><html lang="id"><body style="margin:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#102142"><table role="presentation" width="100%"><tr><td align="center" style="padding:24px"><table role="presentation" width="100%" style="max-width:560px;background:white;border-radius:16px"><tr><td style="padding:32px"><div style="font-size:26px;font-weight:800">so<span style="color:#1967e8">bri.</span></div><h1 style="font-size:24px;margin-top:30px">${title}</h1>${content}<p style="margin-top:32px;color:#718096;font-size:12px">Butuh bantuan? Balas email ini atau hubungi halo@sobri.id.</p></td></tr></table></td></tr></table></body></html>`;
export const emailTemplates = {
  paid: (name: string, order: string) => shell('Pembayaran diterima', `<p>Halo ${name}, pembayaran pesanan <b>${order}</b> telah terverifikasi. Produk Anda kini siap diakses.</p>`),
  failed: (order: string) => shell('Pembayaran belum berhasil', `<p>Pembayaran pesanan <b>${order}</b> belum berhasil. Coba kembali dari dashboard.</p>`),
  download: (url: string) => shell('Produk siap diunduh', `<p>Tautan aman ini memiliki masa berlaku.</p><a href="${url}" style="display:inline-block;background:#1967e8;color:white;padding:14px 20px;border-radius:10px;text-decoration:none">Unduh produk</a>`),
  invoice: (order: string, total: string) => shell('Invoice pembelian', `<p>Nomor: <b>${order}</b></p><p>Total: <b>${total}</b></p>`),
  reset: (url: string) => shell('Atur ulang kata sandi', `<p><a href="${url}">Atur ulang kata sandi</a>. Abaikan bila bukan Anda.</p>`),
  magic: (url: string) => shell('Tautan masuk aman', `<p><a href="${url}">Masuk ke Sobri</a>. Tautan hanya dapat digunakan satu kali.</p>`),
  pending: (order: string) => shell('Pengingat pembayaran', `<p>Pesanan <b>${order}</b> masih menunggu pembayaran.</p>`),
};
