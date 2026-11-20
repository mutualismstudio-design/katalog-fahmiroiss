import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ponytail: static niche dictionary ceiling 5 presets; upgrade to LLM or dynamic JSON config when expanding beyond Indonesian e-commerce.
const NICHES = {
  setup: {
    name: 'Setup Meja & Produktivitas',
    handle: 'kurasi.meja',
    bio: 'Kurasi setup meja kerja & gadget produktivitas.\nUji pakai sebelum direkomendasikan.\nKatalog & diskon resmi di bawah 👇',
    products: [
      { name: 'Aluminium Laptop Stand', cat: 'desk', price: 'Rp 85.000', badge: 'Must Have', desc: 'Kokoh dan anti-goyang, sejajar mata.' },
      { name: 'Magnetic Cable Clip', cat: 'desk', price: 'Rp 29.000', badge: 'Meja Rapi', desc: 'Kabel charger ga berserakan di lantai.' },
      { name: 'LED Monitor Bar', cat: 'desk', price: 'Rp 145.000', badge: 'Mata Rileks', desc: 'Cahaya fokus ke meja tanpa silau di layar.' }
    ],
    samplePost: '3 printilan meja kerja under 50k yang paling kerasa fungsinya:\n\n1. Cable clip magnetik\n2. Coaster silikon anti noda basah\n3. Busa wrist rest keyboard\n\nLink toko resminya saya kumpulin di bio profil #affiliate'
  },
  home: {
    name: 'Kamar & Home Estetik',
    handle: 'sudut.estetik',
    bio: 'Inspirasi dekorasi kamar minimalis & hemat budget.\nBikin kamar nyaman tanpa renovasi mahal.\nLink toko resmi barang di bawah 👇',
    products: [
      { name: 'Smart LED Bulb 9W', cat: 'room', price: 'Rp 65.000', badge: 'Favorit', desc: 'Warm white bikin suasana kamar tenang.' },
      { name: 'Diffuser Aromaterapi 500ml', cat: 'room', price: 'Rp 89.000', badge: 'Relaksasi', desc: 'Bikin kamar wangi dan udara tidak kering.' }
    ],
    samplePost: 'Kamar 3x3 bisa keliatan jauh lebih lega cuma dengan 2 trik:\n\n1. Ganti lampu putih silau ke warm white 3000K\n2. Pakai sprei warna solid tanpa motif ramai\n\nLink bohlam dan sprei yang saya pakai ada di bio.'
  },
  gadget: {
    name: 'Gadget & Audio Pilihan',
    handle: 'gadget.kurasi',
    bio: 'Review jujur gadget budget & audio harian.\nBebas klaim berlebihan.\nLink toko terpercaya di bawah 👇',
    products: [
      { name: 'Wired IEM with Mic', cat: 'gadget', price: 'Rp 125.000', badge: 'Best Budget', desc: 'Suara jernih tanpa delay untuk meeting kantor.' },
      { name: 'Powerbank 20W PD 10000mAh', cat: 'gadget', price: 'Rp 165.000', badge: 'Fast Charge', desc: 'Support fast charge iPhone & Android.' }
    ],
    samplePost: 'Kalau budget under 200 ribu, jangan paksakan beli TWS wireless kalau butuh mic jernih buat call/meeting. Ambil wired IEM kabel, kualitas mic dan suaranya jauh lebih stabil.\n\nLink tipe yang saya pakai ada di bio.'
  },
  tech_creator: {
    name: 'Katalog Shopee Pilihan @fahmiroiss',
    handle: 'fahmiroiss',
    bio: 'Koleksi barang setup meja, audio, kopi & gear harian yang sudah dites langsung.\nToko Shopee resmi & garansi jelas 👇',
    products: [
      { no: '01', name: 'Aluminium Laptop Stand Adjustable', cat: 'desk', price: 'Rp 85.000', badge: 'Anti Sakit Leher', desc: 'Bahan tebal anti goyang, sejajar mata biar leher ga tegang.' },
      { no: '02', name: 'Tangzu Wan\'er S.G In-Ear Monitor', cat: 'gadget', price: 'Rp 240.000', badge: 'Audio Jernih', desc: 'Detail vokal & instrumen Coldplay/Jazz jernih, mic meeting bersih.' },
      { no: '03', name: 'Baseus Monitor ScreenBar LED', cat: 'desk', price: 'Rp 310.000', badge: 'Mata Nyaman', desc: 'Cahaya fokus ke meja tanpa silau di layar saat lembur malam.' },
      { no: '04', name: 'Timemore Chestnut C2 Manual Grinder', cat: 'room', price: 'Rp 485.000', badge: 'Kopi V60 Wangi', desc: 'Burr stainless steel presisi buat seduh kopi manual harian.' },
      { no: '05', name: 'Ugreen GaN 65W 3-Port Fast Charger', cat: 'gadget', price: 'Rp 280.000', badge: 'Mungil & Ringkas', desc: 'Satu batok charger buat laptop MacBook, HP, dan tablet sekaligus.' },
      { no: '06', name: 'Heavyweight Cotton 24s Boxy T-Shirt', cat: 'room', price: 'Rp 75.000', badge: 'Kaos Kerja Awet', desc: 'Kerah dobel jahit anti-melar, bahan tebal tidak nerawang.' },
      { no: '07', name: 'Magnetic Cable Organizer Clip', cat: 'desk', price: 'Rp 29.000', badge: 'Meja Rapi', desc: 'Ujung kabel nempel di pinggir meja, ga jatuh ke kolong lagi.' },
      { no: '08', name: 'Stainless Vacuum Tumbler 500ml', cat: 'room', price: 'Rp 89.000', badge: 'Es Tahan 12 Jam', desc: 'Es batu ga cepat cair, meja bebas noda basah embun air.' },
      { no: '09', name: 'Faux Leather Deskmat 80x40cm', cat: 'desk', price: 'Rp 52.000', badge: 'Meja Estetik', desc: 'Kulit sintetis matte tahan tumpahan air, meja bebas baret.' },
      { no: '10', name: 'Running Waist Bag Anti-Bounce', cat: 'room', price: 'Rp 45.000', badge: 'Lari Nyaman', desc: 'Muat HP & kunci, nempel pas di pinggang tanpa goyang.' }
    ],
    samplePost: 'Dulu tiap jam 3 sore kepala bagian belakang rasanya kayak ditusuk jarum.\n\nTernyata masalahnya layar laptop terlalu rendah. Iseng beli laptop stand aluminium 80 ribuan di Shopee, leher langsung rileks dan ga pegal lagi.\n\nToko Shopee tempat saya beli ada di katalog bio nomor 01 ya.'
  }
};

export function generateAccountProfile(options = {}) {
  const nicheKey = options.niche && NICHES[options.niche] ? options.niche : 'setup';
  const nicheData = NICHES[nicheKey];
  const affiliateId = options.affiliateId || 'ID_AFFILIATE';
  const baseUrl = options.baseUrl || 'https://shope.ee';

  const profile = {
    generatedAt: new Date().toISOString(),
    niche: nicheData.name,
    suggestedHandle: options.handle || nicheData.handle,
    bio: options.bio || nicheData.bio,
    threadsPostLimit: 500,
    firstPost: {
      content: nicheData.samplePost,
      charCount: nicheData.samplePost.length,
      withinLimit: nicheData.samplePost.length <= 500
    },
    catalog: nicheData.products.map(p => ({
      ...p,
      affiliateUrl: p.affiliateUrl || `${baseUrl}/${encodeURIComponent(affiliateId)}/${encodeURIComponent(p.name.toLowerCase().replace(/\s+/g, '-'))}`
    })),
    onboardingSteps: [
      '1. Buka instagram.com atau aplikasi Instagram, daftar dengan email khusus.',
      '2. Ubah akun ke Profesional (Creator) di menu Pengaturan Akun.',
      '3. Salin teks Bio & Handle yang telah digenerate ke profil IG.',
      '4. Login ke Threads menggunakan akun IG tersebut.',
      '5. Unggah First Post perdana dan sematkan link katalog di bio.'
    ]
  };

  return profile;
}

export function compileBridgeHtml(profile) {
  // ponytail: inline string template ceiling ~100 items; upgrade to JSX/template engine when adding multi-page routing.
  const cardsHtml = profile.catalog.map((item, idx) => {
    const num = item.no || String(idx + 1).padStart(2, '0');
    return `
      <article class="product-card" data-category="${item.cat}">
        <div class="card-top">
          <h2 class="product-name"><span style="color:var(--accent);margin-right:6px;">#${num}</span>${item.name}</h2>
          <span class="badge">${item.badge}</span>
        </div>
        <p class="product-desc">${item.desc}</p>
        <div class="product-price">${item.price}</div>
        <a href="${item.affiliateUrl}" target="_blank" rel="noopener sponsored" class="btn-affiliate">
          Cek Toko Shopee (No. ${num})
        </a>
      </article>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.niche} - Katalog Rekomendasi</title>
  <style>
    :root { --bg: #0d0f12; --card-bg: #161a20; --text-main: #f3f4f6; --text-muted: #9ca3af; --accent: #10b981; --border: #262d38; --badge-bg: rgba(16, 185, 129, 0.12); --badge-text: #34d399; }
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    body { background-color: var(--bg); color: var(--text-main); display: flex; justify-content: center; padding: 24px 16px 48px; min-height: 100vh; }
    .container { width: 100%; max-width: 540px; display: flex; flex-direction: column; gap: 20px; }
    .profile-header { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
    .avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #10b981, #3b82f6); display: flex; align-items: center; justify-content: center; font-size: 32px; font-weight: 700; color: #fff; }
    .profile-title { font-size: 1.25rem; font-weight: 700; }
    .profile-handle { font-size: 0.9rem; color: var(--text-muted); }
    .profile-bio { font-size: 0.9rem; color: #d1d5db; line-height: 1.45; white-space: pre-line; }
    .search-bar { width: 100%; padding: 12px 16px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; color: var(--text-main); font-size: 0.95rem; outline: none; }
    .product-list { display: flex; flex-direction: column; gap: 12px; }
    .product-card { background: var(--card-bg); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
    .card-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .product-name { font-size: 1rem; font-weight: 600; }
    .badge { font-size: 0.75rem; font-weight: 600; padding: 3px 8px; border-radius: 6px; background: var(--badge-bg); color: var(--badge-text); }
    .product-desc { font-size: 0.85rem; color: var(--text-muted); }
    .product-price { font-size: 0.95rem; font-weight: 700; color: #34d399; }
    .category-pills { display: flex; gap: 8px; overflow-x: auto; }
    .pill { background: var(--card-bg); border: 1px solid var(--border); color: var(--text-muted); padding: 6px 12px; border-radius: 20px; font-size: 0.85rem; cursor: pointer; }
    .pill.active { background: var(--accent); color: #fff; }
    .btn-affiliate { display: flex; align-items: center; justify-content: center; background: var(--accent); color: #fff; text-decoration: none; padding: 10px 16px; border-radius: 10px; font-size: 0.9rem; font-weight: 600; }
    .footer { text-align: center; font-size: 0.75rem; color: #6b7280; padding-top: 16px; border-top: 1px solid var(--border); }
  </style>
</head>
<body>
  <div class="container">
    <header class="profile-header">
      <div class="avatar">${profile.suggestedHandle[0]?.toUpperCase() || 'A'}</div>
      <h1 class="profile-title">${profile.niche}</h1>
      <p class="profile-handle">@${profile.suggestedHandle} di Threads</p>
      <p class="profile-bio">${profile.bio}</p>
    </header>

    <input type="text" id="searchInput" class="search-bar" placeholder="Cari nama barang...">

    <div class="category-pills">
      <button class="pill active" data-cat="all">Semua</button>
      <button class="pill" data-cat="desk">Setup Meja</button>
      <button class="pill" data-cat="room">Kamar</button>
      <button class="pill" data-cat="gadget">Gadget</button>
    </div>

    <main class="product-list" id="productList">
${cardsHtml}
    </main>

    <footer class="footer">
      <p>Disclosure: Sebagian link di halaman ini adalah tautan afiliasi berbayar (#affiliate). Kami menerima komisi kecil tanpa biaya tambahan bagi Anda.</p>
    </footer>
  </div>
  <script>
    const searchInput = document.getElementById('searchInput');
    const pills = document.querySelectorAll('.pill');
    const cards = document.querySelectorAll('.product-card');
    let currentCat = 'all', searchQuery = '';
    const filter = () => cards.forEach(c => {
      const matchCat = currentCat === 'all' || c.dataset.category === currentCat;
      const matchQuery = c.innerText.toLowerCase().includes(searchQuery);
      c.style.display = matchCat && matchQuery ? 'flex' : 'none';
    });
    searchInput.addEventListener('input', (e) => { searchQuery = e.target.value.toLowerCase().trim(); filter(); });
    pills.forEach(p => p.addEventListener('click', () => {
      pills.forEach(x => x.classList.remove('active'));
      p.classList.add('active');
      currentCat = p.dataset.cat;
      filter();
    }));
  </script>
</body>
</html>`;
}

// Execution if invoked directly from CLI
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const nicheArg = args.find(a => a.startsWith('--niche='))?.split('=')[1] || 'setup';
  const idArg = args.find(a => a.startsWith('--id='))?.split('=')[1] || 'racunmeja2026';

  const config = generateAccountProfile({ niche: nicheArg, affiliateId: idArg });
  const outJsonPath = path.join(__dirname, 'profile-config.json');
  fs.writeFileSync(outJsonPath, JSON.stringify(config, null, 2), 'utf8');

  const outHtmlPath = path.join(__dirname, 'index.html');
  fs.writeFileSync(outHtmlPath, compileBridgeHtml(config), 'utf8');

  console.log(`Akun profile config berhasil digenerate untuk niche [${config.niche}] ke: ${outJsonPath}`);
  console.log(`Bridge page HTML berhasil diupdate ke: ${outHtmlPath}`);
  console.log(`Handle rekomendasi: @${config.suggestedHandle}`);
  console.log(`Panjang First Post: ${config.firstPost.charCount} karakter (Maks Threads: 500).`);
}
