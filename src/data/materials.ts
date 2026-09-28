import { Makalah } from '../types';

export const makalahList: Makalah[] = [
  {
    id: 1,
    title: 'Peraturan Perundang-Undangan Teknologi dan Informasi',
    subtitle: 'Kajian Yuridis dan Praktis Regulasi Siber, UU ITE, UU PDP, serta Dinamika Keamanan Digital di Indonesia',
    subject: 'Informatika',
    authors: [
      'Anindya Quinnsha',
      'Dinda Karen Clarita',
      'Jovita Galena Adhyaksa',
      'Muhammad Syafiq Allaamsyah',
      'Nova Adellya Putri Imawan',
      'Ra’uf Daffa Azali',
      'Sultan Zaky',
    ],
    advisor: 'Cici Lia Dwi Hapsari, S.Pd',
    school: 'SMA Negeri 1 Simpang Empat, Kabupaten Tanah Bumbu',
    year: '2026/2027',
    summary:
      'Makalah ini mengulas tuntas arsitektur regulasi siber di Indonesia mulai dari UU No. 11 Tahun 2008, UU No. 19 Tahun 2016, hingga perubahan kedua melalui UU No. 1 Tahun 2024 serta UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (PDP). Pembahasan mencakup hak dan kewajiban digital, sanksi pidana kejahatan siber (hoaks, perundungan siber, peretasan, penipuan online), analisis kasus nyata lintas dekade (2001, 2006, 2026), serta strategi cyber hygiene.',
    stats: {
      questionCount: 40,
      subtopicsCount: 8,
      keyPointsCount: 24,
    },
    keyLawTable: [
      {
        category: 'Penyebaran Berita Bohong (Konsumen)',
        article: 'Pasal 28 ayat (1) jo Pasal 45A ayat (1) UU ITE',
        sanction: 'Penjara maksimal 6 tahun dan/atau denda maksimal Rp1.000.000.000 (1 Miliar)',
        details: 'Menyebarkan informasi bohong dan menyesatkan yang mengakibatkan kerugian materiil bagi konsumen dalam transaksi elektronik.',
      },
      {
        category: 'Penyebaran Berita Bohong (Kerusuhan)',
        article: 'Pasal 28 ayat (3) jo Pasal 45A ayat (3) UU ITE',
        sanction: 'Penjara maksimal 6 tahun',
        details: 'Menyebarkan berita bohong yang memicu kerusuhan atau kekacauan di tengah masyarakat.',
      },
      {
        category: 'Pencemaran Nama Baik & Penghinaan',
        article: 'Pasal 27A jo Pasal 45 ayat (4) UU ITE (UU 1/2024)',
        sanction: 'Penjara maksimal 2 tahun dan/atau denda maksimal Rp400.000.000',
        details: 'Menyerang kehormatan atau nama baik seseorang dengan menuduhkan hal tertentu agar diketahui umum secara digital.',
      },
      {
        category: 'Ancaman Kekerasan / Menakut-nakuti',
        article: 'Pasal 29 jo Pasal 45B UU ITE',
        sanction: 'Penjara maksimal 4 tahun dan/atau denda maksimal Rp750.000.000',
        details: 'Mengirimkan informasi elektronik berisi ancaman kekerasan atau intimidasi yang ditujukan langsung secara pribadi.',
      },
      {
        category: 'Akses Ilegal ke Sistem Komputer (Hacking)',
        article: 'Pasal 30 jo Pasal 46 UU ITE',
        sanction: 'Penjara 6 hingga 8 tahun dan/atau denda Rp600.000.000 hingga Rp800.000.000',
        details: 'Mengakses komputer atau sistem elektronik orang lain tanpa hak, melanggar atau menerobos sistem pengamanan.',
      },
      {
        category: 'Perusakan & Pencurian Data Elektronik',
        article: 'Pasal 32 jo Pasal 48 UU ITE',
        sanction: 'Penjara maksimal 8 tahun dan/atau denda maksimal Rp2.000.000.000 (2 Miliar)',
        details: 'Mengubah, menambah, mengurangi, merusak, mentransmisikan, atau menghilangkan dokumen/informasi elektronik tanpa hak.',
      },
      {
        category: 'Penipuan Online Konvensional',
        article: 'Pasal 378 KUHP',
        sanction: 'Penjara maksimal 4 tahun',
        details: 'Tindak tipu muslihat atau rangkaian kebohongan untuk menguntungkan diri sendiri secara melawan hukum.',
      },
      {
        category: 'Tindak Pidana Pencucian Uang (TPPU)',
        article: 'UU Pencegahan & Pemberantasan TPPU',
        sanction: 'Penjara hingga 20 tahun',
        details: 'Menyembunyikan, menyamarkan, atau mengalihkan aset hasil tindak kejahatan digital/penipuan daring.',
      },
    ],
    sections: [
      {
        id: 'sec-1-1',
        title: '1. Pengertian dan Dasar Hukum Teknologi Informasi',
        content: [
          'Teknologi informasi merujuk pada penggunaan perangkat lunak, perangkat keras, dan sistem komputer untuk mengelola, menyimpan, mengirim, dan memproses informasi. Teknologi informasi meliputi segala hal mulai dari komputer pribadi hingga jaringan komputer global yang terhubung secara luas.',
          'Dalam konteks bisnis, pemanfaatan TI bertujuan meningkatkan efisiensi operasional, menaikkan produktivitas, mengotomatisasi proses bisnis, mempercepat komunikasi internal maupun eksternal, dan menghasilkan analisis berbasis data yang lebih akurat.',
          'Dasar hukum pembentukan peraturan perundang-undangan diatur dalam Pasal 1 angka 2 UU No. 12 Tahun 2011, yang mendefinisikannya sebagai peraturan tertulis yang memuat norma hukum, mengikat secara umum, serta dibentuk atau ditetapkan oleh lembaga negara atau pejabat yang berwenang melalui prosedur yang sah.',
          'Empat tujuan pokok regulasi TI di Indonesia adalah: (1) Mengatasi tantangan akses teknologi yang belum merata, (2) Menanggulangi masalah keamanan siber, (3) Mencegah penyebaran berita hoaks, dan (4) Meminimalisir misinformasi yang berpotensi memecah belah bangsa.',
        ],
      },
      {
        id: 'sec-1-2',
        title: '2. Sejarah dan Dinamika Regulasi TI di Indonesia',
        content: [
          'Pertumbuhan teknologi di Indonesia bergerak sangat pesat seiring peningkatan penetrasi internet, maraknya media sosial, adopsi artificial intelligence (AI), dan tumbuhnya e-commerce. Regulasi teknologi informasi berfungsi sebagai instrumen pengontrol dan pelindung berbagai aspek industri digital.',
          'Dua instansi pemerintah yang memiliki peran sentral dalam pengawasan dan perumusan regulasi teknologi adalah Direktorat Jenderal Aplikasi Informatika (Ditjen Aptika Kominfo/Komdigi) dan Badan Regulasi Telekomunikasi Indonesia (BRTI).',
        ],
        subsections: [
          {
            id: 'sec-1-2-1',
            title: 'Hierarki Regulasi Utama di Bidang TI Indonesia',
            bullets: [
              'UU No. 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik: Tonggak awal hukum siber nasional yang mengakui alat bukti elektronik.',
              'UU No. 19 Tahun 2016 tentang Perubahan atas UU 11/2008: Menyesuaikan rumusan delik dan besaran ancaman sanksi pidana.',
              'UU No. 1 Tahun 2024 tentang Perubahan Kedua atas UU 11/2008: Pembaruan komprehensif terkait kejahatan siber, tanggung jawab platform digital, penyelesaian sengketa, dan AI.',
              'UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP): Regulasi komprehensif pelindungan data pribadi warga negara Indonesia.',
              'Peraturan Pemerintah (PP) No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik (PSTE): Mengatur keabsahan sertifikat elektronik dan tanda tangan digital.',
              'Peraturan Menteri Komunikasi dan Informatika No. 10 Tahun 2021: Perubahan atas Permenkominfo No. 5/2020 mengenai kewajiban pendaftaran dan tanggung jawab PSE Lingkup Privat.',
            ],
          },
          {
            id: 'sec-1-2-2',
            title: 'Tujuh Poin Pembaharuan Kunci dalam Revisi Kedua UU ITE (UU No. 1 Tahun 2024)',
            bullets: [
              'Perluasan Definisi: Memperjelas dan memperluas batasan data pribadi, sistem elektronik, dan tanda tangan elektronik guna mengantisipasi teknologi masa depan.',
              'Sanksi Pidana Kejahatan Siber: Memperbarui klasifikasi kejahatan digital baru dan menerapkan penjatuhan hukuman pidana yang lebih proporsional serta tegas.',
              'Penguatan Perlindungan Data Pribadi: Menyelaraskan hak-hak pemilik data dan kewajiban penyelenggara sistem elektronik dengan standar hukum internasional.',
              'Tanggung Jawab Penyelenggara Sistem Elektronik (PSE): Mempertegas tanggung jawab hukum platform media sosial dan e-commerce dalam menyaring konten ilegal.',
              'Penyelesaian Sengketa: Mengatur jalur penyelesaian sengketa transaksi elektronik yang lebih adaptif, baik melalui jalur non-litigasi (mediasi/arbitrase) maupun litigasi peradilan.',
              'Kecerdasan Buatan (AI): Mulai meletakkan kerangka hukum pemanfaatan AI yang mengutamakan keselamatan, transparansi etika, dan akuntabilitas pencipta/pengembang.',
              'Keterlibatan Pemerintah: Memperluas kewenangan pemerintah dalam pengawasan, pemutusan akses (takedown), dan moderasi konten ilegal di ruang digital.',
            ],
          },
          {
            id: 'sec-1-2-3',
            title: 'Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)',
            bullets: [
              'Prinsip Pokok Pelindungan Data: Wajib menjunjung tinggi asas transparansi pemrosesan, akuntabilitas hukum pengendali data, dan minimisasi data (hanya mengumpulkan data yang benar-benar relevan).',
              'Hak-Hak Subjek Data: Individu memiliki hak penuh untuk mengakses data pribadinya, meminta koreksi atas data yang keliru, hingga meminta penghapusan (right to erasure/be forgotten).',
              'Kewajiban Pengendali & Prosesor Data: Bertanggung jawab penuh menjaga kerahasiaan, mencegah peretasan dan kebocoran data, serta melapor dalam batas waktu resmi saat terjadi insiden kebocoran.',
            ],
          },
        ],
      },
      {
        id: 'sec-1-3',
        title: '3. Hak, Kewajiban, dan Etika Pengguna Teknologi Informasi',
        content: [
          'Ruang siber bukanlah zona bebas tanpa batas, melainkan ruang publik beradab yang dilindungi oleh hukum. Setiap warganet diwajibkan memahami keseimbangan antara hak-hak fundamental dan tanggung jawab hukumnya.',
        ],
        subsections: [
          {
            id: 'sec-1-3-1',
            title: 'Empat Hak Digital Pengguna Internet',
            bullets: [
              'Hak atas Akses Informasi: Kebebasan mencari, menerima, dan membagikan ilmu pengetahuan dan berita tanpa sensor yang sewenang-wenang.',
              'Hak atas Privasi dan Perlindungan Data Pribadi: Hak mendapatkan jaminan kerahasiaan identitas, nomor kontak, surel, dan riwayat aktivitas digital.',
              'Hak Kebebasan Berekspresi: Kebebasan beropini dan berkarya secara digital dalam koridor hukum dan penghormatan atas hak orang lain.',
              'Hak atas Keamanan Digital: Hak dilindungi dari segala bentuk serangan siber, penipuan, intimidasi, dan doxxing.',
            ],
          },
          {
            id: 'sec-1-3-2',
            title: 'Kewajiban dan Etika Menggunakan Teknologi Informasi',
            bullets: [
              'Mematuhi Regulasi Hukum: Tunduk pada perundang-undangan positif yang berlaku di Republik Indonesia (khususnya UU ITE dan UU PDP).',
              'Menghormati Privasi Orang Lain: Menolak aksi doxxing (menyebarkan identitas pribadi orang lain tanpa izin untuk mempermalukan atau mengintimidasi).',
              'Mencegah Penyebaran Hoaks & Ujaran SARA: Tidak memproduksi atau meneruskan kabar dusta bernada provokatif atau permusuhan berbasis suku, agama, ras, dan antargolongan.',
              'Bertanggung Jawab atas Jejak Digital: Memahami bahwa jejak digital (digital footprint) bersifat permanen dan memiliki konsekuensi hukum.',
              'Etika Berbahasa dan Anti-Plagiarisme: Berkomunikasi dengan tutur kata santun, mencantumkan atribusi sumber karya secara sah, dan menghindari tindakan flaming.',
              'Prinsip "Saring Sebelum Sharing": Melakukan verifikasi kebenaran minimal 3 sumber resmi sebelum mendistribusikan informasi apa pun.',
            ],
          },
        ],
      },
      {
        id: 'sec-1-4',
        title: '4. Bentuk Pelanggaran Kejahatan Siber dan Sanksinya',
        content: [
          'Berdasarkan pembaruan UU No. 1 Tahun 2024 dan KUHP, kejahatan digital diklasifikasikan ke dalam beberapa rumpun pelanggaran berat dengan sanksi penjara dan denda finansial yang signifikan.',
          'Penyebaran Hoaks Konsumen (Pasal 28 ayat 1) diancam pidana penjara paling lama 6 tahun dan/atau denda maksimal Rp1.000.000.000 (Pasal 45A ayat 1). Sedangkan Hoaks yang memicu kerusuhan masyarakat (Pasal 28 ayat 3) diancam kurungan paling lama 6 tahun (Pasal 45A ayat 3).',
          'Pencemaran Nama Baik & Penghinaan (Pasal 27A UU ITE revisi) memiliki sanksi pidana penjara maksimal 2 tahun dan/atau denda paling banyak Rp400.000.000 (Pasal 45 ayat 4). Ancaman kekerasan dan intimidasi pribadi (Pasal 29) diancam penjara paling lama 4 tahun dan/atau denda maksimal Rp750.000.000 (Pasal 45B).',
          'Peretasan / Hacking (Pasal 30) diancam hukuman 6 sampai 8 tahun penjara dan denda Rp600 juta hingga Rp800 juta. Perusakan atau penghapusan data elektronik (Pasal 32) diancam penjara maksimal 8 tahun dan denda hingga Rp2 Miliar (Pasal 48).',
          'Penipuan Online dijerat Pasal 378 KUHP (penjara max 4 tahun) atau Pasal 28 ayat 1 UU ITE (penjara max 6 tahun, denda max 1M). Jika uang hasil penipuan dialihkan atau disamarkan, pelaku dapat dijerat Tindak Pidana Pencucian Uang (TPPU) dengan hukuman penjara hingga 20 tahun.',
        ],
      },
      {
        id: 'sec-1-5',
        title: '5. Analisis Kasus Pelanggaran TI Lintas Dekade (2001, 2006, 2026)',
        content: [
          'Makalah menyajikan kajian tiga peristiwa historis dan kontemporer untuk memahami evolusi penegakan hukum di Indonesia:',
        ],
        subsections: [
          {
            id: 'sec-1-5-1',
            title: 'Kasus Pencurian Data & Cybercrime Awal (2001) - Sengketa Domain mustikaratu.com',
            bullets: [
              'Penyebab: Infrastruktur internet awal minim enkripsi, kesadaran kata sandi sangat rendah, dan ketiadaan undang-undang khusus kejahatan siber.',
              'Penyelesaian Masalah: Karena UU ITE belum ada, aparat hanya mengandalkan pasal konvensional penipuan dan perbuatan curang di KUHP, dengan bukti digital yang kerap ditolak hakim.',
              'Pengaruh Jangka Panjang: Memicu adopsi prinsip Budapest Convention on Cybercrime 2001 oleh pemerintah hingga melahirkan UU No. 11 Tahun 2008 tentang ITE.',
            ],
          },
          {
            id: 'sec-1-5-2',
            title: 'Kasus Penghinaan Presiden di Blog (2006) - Herman Saksono & Uji Materi MK',
            bullets: [
              'Penyebab: Unggahan foto parodi rekayasa digital Presiden SBY di blog personal yang direspons aparat kepolisian menggunakan Pasal 134, 136 bis, dan 137 KUHP kolonial.',
              'Penyelesaian: Diselesaikan melalui judicial review di Mahkamah Konstitusi melalui Putusan MK No. 013-022/PUU-IV/2006 yang resmi membatalkan pasal-pasal penghinaan presiden karena bertentangan dengan UUD 1945.',
              'Dampak Positif: Memperkuat kebebasan berpendapat dan menyetarakan presiden dengan warga biasa dalam konteks delik pencemaran nama baik biasa.',
              'Dampak Negatif: Terjadi pergeseran di mana aparat penegak hukum beralih menjerat warganet menggunakan pasal karet pencemaran nama baik dalam UU ITE.',
            ],
          },
          {
            id: 'sec-1-5-3',
            title: 'Kasus Pelecehan Seksual Mahasiswi UI dan IPB University (April 2026)',
            bullets: [
              'Penyebab: Grup percakapan WhatsApp privat yang disalahgunakan untuk objektifikasi tubuh dan komentar seksis tanpa kontrol sosial (rape culture), rendahnya literasi hukum, dan lemahnya deteksi internal fakultas.',
              'Sorotan Moral: Kekecewaan publik karena pelaku justru berasal dari fakultas hukum dan teknik di kampus terkemuka.',
              'Penyelesaian: Investigasi internal satgas kampus menghasilkan sanksi skorsing akademik, kewajiban konseling psikologis, mata kuliah pencegahan kekerasan seksual, serta pendampingan pemulihan bagi korban.',
              'Dampak Sistemik: Mendorong penerapan tegas UU TPKS dan Permendikbudristek di institusi pendidikan nasional.',
            ],
          },
        ],
      },
      {
        id: 'sec-1-6',
        title: '6. Pencegahan, Penegakan Hukum, dan Cyber Hygiene',
        content: [
          'Berdasarkan data APJII (Asosiasi Penyelenggara Jasa Internet Indonesia), penetrasi internet di Indonesia telah melampaui 79% dari total populasi. Sayangnya akselerasi ini tidak diiringi dengan literasi keamanan yang proporsional.',
          'Prinsip Cyber Hygiene Praktis: Wajib menerapkan Multi-Factor Authentication (MFA/2FA) menggunakan aplikasi authenticator terenkripsi (seperti Google Authenticator) daripada SMS OTP yang rentan terhadap serangan SIM swap.',
          'Waspada Rekayasa Sosial (Social Engineering): Ancaman nyata pengiriman berkas APK berbahaya berkedok undangan pernikahan online, resi pelacakan paket ekspedisi palsu, dan tawaran kerja paruh waktu di WhatsApp. Pengguna tidak boleh menginstal berkas di luar Google Play Store atau Apple App Store.',
          'Digital Wellbeing: Membatasi paparan media sosial pemicu pelepasan dopamin berlebih dan sindrom FOMO (Fear of Missing Out) melalui jadwal digital detox.',
          'Operasional Penegakan Hukum: Badan Siber dan Sandi Negara (BSSN) bertanggung jawab memproteksi infrastruktur informasi vital nasional dari serangan siber tingkat tinggi (APT). Dittipidsiber Bareskrim Polri menindak laporan kriminal masyarakat melalui portal Patrolisiber.id.',
          'Kendala Takedown Konten Ilegal: Kementerian Komunikasi dan Digital (Komdigi) aktif memblokir situs judi online dan phishing, namun terkendala fenomena "mati satu tumbuh seribu" karena pelaku memanfaatkan VPN, server luar negeri, dan perputaran nama domain dinamis.',
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Membaca Lateral: Mengevaluasi Kebenaran Konten',
    subtitle: 'Strategi Verifikasi Informasi Era Digital Melalui Triangulasi dan Analisis Kredibilitas Konten Teks, Gambar, dan Video',
    subject: 'Informatika (Kurikulum Merdeka Kelas XI)',
    authors: [
      'Andi Muh Luthfi Ar-Rizky',
      'Clarissa Zanovia S.',
      'Jihan Liviana N.',
      'M. Rafie Mubarak H.',
      'Nania Aira R.',
      'Ratu Inayah',
      'Siti Naurah R. C.',
    ],
    advisor: 'Cici Lia Dwi Hapsari, S.Pd',
    school: 'SMA Negeri 1 Simpang Empat, Kabupaten Tanah Bumbu',
    year: '2026',
    summary:
      'Makalah ini mengupas tuntas teknik membaca lateral (lateral reading) sebagai kompetensi esensial warganet dalam menyaring banjir informasi dan hoaks di media digital. Membahas secara mendalam metode triangulasi (metode, sumber, peneliti), serta parameter evaluasi kredibilitas konten teks, gambar (reverse image search, metadata EXIF, deteksi manipulasi), dan video (analisis konteks utuh dan verifikasi metadata).',
    stats: {
      questionCount: 30,
      subtopicsCount: 5,
      keyPointsCount: 18,
    },
    sections: [
      {
        id: 'sec-2-1',
        title: '1. Pengertian Membaca Lateral dan Urgensinya',
        content: [
          'Perkembangan teknologi internet mempermudah distribusi berita, teks, gambar, dan video secara instan. Namun, kemudahan ini memicu lonjakan hoaks, misinformasi (informasi salah tanpa niat jahat), dan disinformasi (informasi salah yang sengaja dibuat untuk menipu).',
          'Membaca lateral (lateral reading) adalah kebiasaan membuka tab-tab baru untuk memeriksa kebenaran suatu informasi dengan membandingkannya ke berbagai sumber terpercaya di luar situs asal, daripada hanya terpaku membaca ke bawah (vertical reading) pada satu situs yang belum tentu kredibel.',
          'Kemampuan membaca lateral melatih sikap skeptis sehat dan daya kritis masyarakat sebelum mempercayai atau membagikan berita viral di media sosial.',
        ],
      },
      {
        id: 'sec-2-2',
        title: '2. Metode Triangulasi dalam Verifikasi Informasi',
        content: [
          'Triangulasi merupakan metode yang digunakan untuk memeriksa, membandingkan, dan memperkuat kebenaran suatu informasi atau hasil penelitian dengan menggunakan lebih dari satu cara, instrumen, atau sumber.',
          'Tujuan utama triangulasi adalah memastikan kebenaran data yang valid dan terpercaya, meningkatkan reliabilitas, mengurangi kekeliruan pengumpulan data, menghindari bias konfirmasi (hanya mencari pembenaran atas opini sendiri), dan memperkuat kesimpulan akhir.',
          'Penerapan dalam kehidupan sehari-hari: Saat menerima kabar viral di WhatsApp, seorang netizen tidak langsung menyebarkannya, melainkan mengecek ke portal berita bereputasi, mencari siaran pers resmi dari instansi terkait, dan membaca klarifikasi pihak berwenang.',
        ],
        subsections: [
          {
            id: 'sec-2-2-1',
            title: 'Tiga Macam Jenis Triangulasi',
            bullets: [
              'Triangulasi Metode: Menggunakan lebih dari satu metode penyelidikan/pengumpulan data (misalnya memadukan wawancara narasumber, observasi lapangan, angket kuisioner, dan telaah dokumen arsip). Contoh: Guru meneliti faktor penurunan nilai siswa dengan mewawancarai siswa, mengamati kelas, dan menelaah rekapan tugas.',
              'Triangulasi Sumber: Membandingkan informasi yang didapat dari beberapa sumber data berbeda (narasumber beragam, dokumen tertulis, arsip sejarah, survei independen, data dinas resmi). Contoh: Memverifikasi jumlah peserta kegiatan sekolah dengan membandingkan catatan guru pembina, daftar presensi fisik, dan laporan panitia.',
              'Triangulasi Peneliti: Melibatkan lebih dari satu pemeriksa atau analis independen untuk membedah data yang sama guna menekan bias subjektif perseorangan. Contoh: Dua analis fakta secara terpisah membedah rekaman audio dan mencocokkan temuannya secara objektif.',
            ],
          },
        ],
      },
      {
        id: 'sec-2-3',
        title: '3. Karakteristik Sumber Konten Teks yang Kredibel',
        content: [
          'Untuk memilah konten tulisan atau artikel berita daring yang layak dipercaya, pembaca wajib meneliti enam pilar indikator mutu:',
        ],
        subsections: [
          {
            id: 'sec-2-3-1',
            title: 'Indikator Utama Kredibilitas Konten Teks',
            bullets: [
              'Kredibilitas Situs Web: Dipublikasikan oleh situs resmi pemerintah (.go.id), lembaga akademis (.ac.id / .edu), media pers terdaftar Dewan Pers, menggunakan protokol enkripsi HTTPS, menampilkan susunan redaksi jelas, dan nomor kontak aktif.',
              'Riwayat Publikasi: Memiliki rekam jejak konsisten dalam menyajikan berita akurat dalam rentang waktu yang panjang, bukan situs dadakan yang baru dibuat kemarin sore.',
              'Gaya Bahasa & Tata Tulis: Bahasa formal, runtut, minim salah ketik (typo), tidak bernada provokatif/bombastis, serta dilengkapi grafik data dan daftar referensi pendukung.',
              'Transparansi Sumber Fakta: Secara gamblang menyebutkan asal data, metodologi wawancara, dan tautan ke sumber rujukan primer.',
              'Pemeriksaan Potensi Bias: Membedakan tulisan opini subjektif penulis dengan laporan berita faktual berbasis data objektif.',
              'Pemanfaatan Fact-Checking Tools: Memanfaatkan portal cek fakta independen seperti TurnBackHoax.id (MAFINDO) dan CekFakta.com sebelum menyebarkannya.',
            ],
          },
        ],
      },
      {
        id: 'sec-2-4',
        title: '4. Karakteristik Evaluasi Konten Gambar yang Kredibel',
        content: [
          'Gambar adalah media visual yang sangat persuasif namun paling rentan disunting, dipotong, atau digunakan di luar konteks aslinya (misleading context).',
        ],
        subsections: [
          {
            id: 'sec-2-4-1',
            title: 'Tiga Tahap Pengujian Keaslian Gambar',
            bullets: [
              'Reverse Image Search: Mencari jejak digital gambar menggunakan Google Lens, Yandex Images, atau TinEye. Teknik ini mengungkap tanggal publikasi pertama kali, sumber asli fotografer, serta apakah foto lama tersebut sengaja didaur ulang untuk isu terkini.',
              'Pemeriksaan Metadata EXIF: Membaca rincian teknis yang tersimpan dalam berkas gambar (tanggal pemotretan, jenis sensor kamera, pengaturan shutter/aperture, dan titik koordinat GPS). Catatan penting: Metadata dapat dimodifikasi atau dihapus oleh platform perpesanan seperti WhatsApp, sehingga harus dikombinasikan dengan teknik lain.',
              'Evaluasi Kualitas Visual & Artefak Manipulasi: Memeriksa anomali pencahayaan, arah jatuhnya bayangan yang inkonsisten, proporsi anatomi tubuh yang tidak wajar, pikselasi bergerigi, atau keanehan khas gambar buatan AI generator (seperti jari tangan abnormal atau teks latar belakang tak terbaca).',
            ],
          },
        ],
      },
      {
        id: 'sec-2-5',
        title: '5. Karakteristik Evaluasi Konten Video yang Kredibel',
        content: [
          'Video memadukan gambar bergerak, audio, dan narasi sehingga tampak sangat meyakinkan. Tiga langkah evaluasi video meliputi:',
          '1. Verifikasi Reputasi Pengunggah: Meneliti saluran pengunggah pertama, apakah berasal dari kantor berita resmi, jurnalis terakreditasi, atau akun anonim pencari klik (clickbait).',
          '2. Analisis Konteks & Keutuhan Rekaman: Memastikan video bukan potongan pendek (cherry-picking) yang sengaja dicabut dari durasi aslinya untuk memutarbalikkan pernyataan narasumber.',
          '3. Verifikasi Metadata & Penelusuran Silang: Meneliti waktu pembuatan, lokasi fisik peristiwa (misal plang nama jalan, rambu lalu lintas, kondisi cuaca), serta mencocokkannya dengan siaran pers media berita arus utama.',
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Mesin Pencari',
    subtitle: 'Arsitektur, Evolusi Sejarah, Algoritma Perankingan, Klasifikasi, dan Dampak Kognitif di Era Kecerdasan Buatan',
    subject: 'Pendidikan Pancasila dan Kewarganegaraan / Informatika Kelas XI.B',
    authors: [
      'Almira Khayla Faeyza',
      'Bernadus Adhitya Dwi Prasetyo',
      'Jihan',
      'Missyael Agapenia',
      'Nacita Prishelia',
      'Rafeyfa Mahira Salma Susanto',
      'Siti Maysyaroh',
      'Zyva Putri Rahmawati',
    ],
    advisor: 'Cici Lia Dwi Hapsari, S.Pd',
    school: 'SMA Negeri 1 Simpang Empat, Kabupaten Tanah Bumbu',
    year: '2026',
    summary:
      'Makalah komprehensif yang membedah sistem mesin pencari dari era pra-web hingga kecerdasan buatan generatif. Menguraikan arsitektur tiga tahap (crawling, indexing, searching & ranking), sinyal algoritma modern (relevansi kata kunci, backlink, UX, search intent, dan formula E-E-A-T), perbandingan 4 jenis mesin pencari, fenomena dampak kognitif (echo chamber, penurunan rentang perhatian, memori eksternal), serta tantangan privasi data dan manipulasi SEO.',
    stats: {
      questionCount: 30,
      subtopicsCount: 6,
      keyPointsCount: 22,
    },
    comparativeTable: [
      {
        type: 'Mesin Pencari Umum (General)',
        examples: 'Google, Microsoft Bing, Yahoo!',
        pros: 'Indeks web sangat raksasa, hasil cepat kilat, dukungan format terpadu (teks, gambar, video, maps, belanja).',
        cons: 'Banyak iklan berbayar yang memenuhi layar atas, pelacakan profil pengguna (tracking) untuk iklan terarah.',
      },
      {
        type: 'Mesin Pencari Privasi (Privacy-Focused)',
        examples: 'DuckDuckGo, Startpage, Qwant',
        pros: 'Tidak menyimpan riwayat kueri pengguna, tidak menjual data pribadi ke pengiklan komersial, bebas profil geolokasi.',
        cons: 'Indeks dan personalisasi tidak seluas Google saat mencari kata kunci teknis yang sangat spesifik.',
      },
      {
        type: 'Mesin Pencari Vertikal (Niche)',
        examples: 'Skyscanner (tiket pesawat), PubMed (medis), IMDb (sinema/film)',
        pros: 'Informasi sangat mendalam, terkurasi, terstruktur, dan akurat untuk satu industri tertentu.',
        cons: 'Cakupan data sangat terbatas pada domain tunggal; tidak dapat digunakan mencari pengetahuan umum di luar ranah.',
      },
      {
        type: 'Mesin Pencari Berbasis AI (AI Search)',
        examples: 'Perplexity AI, ChatGPT Search',
        pros: 'Menghasilkan jawaban naratif komprehensif langsung disertai sitasi kutipan sumber tanpa perlu membuka puluhan tab.',
        cons: 'Risiko halusinasi data (AI hallucination) yang menyampaikan fakta salah dalam gaya bahasa sangat meyakinkan.',
      },
    ],
    sections: [
      {
        id: 'sec-3-1',
        title: '1. Definisi dan Empat Fase Sejarah Mesin Pencari',
        content: [
          'Mesin pencari (search engine) adalah sistem perangkat lunak berbasis web yang dirancang untuk membantu pengguna menemukan dokumen dan informasi di jaringan World Wide Web dengan mencocokkan kata kunci kueri pengguna.',
        ],
        subsections: [
          {
            id: 'sec-3-1-1',
            title: 'Empat Fase Evolusi Sejarah Mesin Pencari',
            bullets: [
              'Era Pra-Web & Web Awal (1990–1993): Lahir Archie (1990) oleh Alan Emtage untuk mengindeks direktori file di server FTP, disusul sistem Gopher untuk dokumen teks. Pada 1993, The World Wide Web Wanderer diperkenalkan Matthew Gray sebagai robot web pertama yang mengukur pertumbuhan web.',
              'Generasi Pertama & Direktori (1994–1997): Lahir AliWeb, Yahoo! (1994 yang awalnya direktori tautan manual terkurasi), Lycos, dan AltaVista (1995) yang pertama kali memperkenalkan pencarian teks penuh (full-text search) dan pengindeksan masif otomatis.',
              'Era Algoritma & PageRank (1998–2000-an): Revolusi Google yang didirikan Larry Page dan Sergey Brin (1998). Google tidak hanya membaca kecocokan teks, tetapi menghitung kuantitas dan kualitas tautan masuk (backlink) sebagai indikator otoritas menggunakan algoritma PageRank.',
              'Era Modern & Kecerdasan Buatan (2010-an–Sekarang): Penerapan pemrosesan bahasa alami (NLP), pencarian semantik berdasar makna kontekstual, personalisasi hasil, dan pencarian AI generatif mandiri.',
            ],
          },
        ],
      },
      {
        id: 'sec-3-2',
        title: '2. Tiga Arsitektur dan Prinsip Kerja Dasar Mesin Pencari',
        content: [
          'Mesin pencari beroperasi melalui tiga tahapan teknis berkesinambungan:',
          '1. Penyusuran (Crawling): Perangkat lunak otomatis (spider/bot/crawler) melompat menelusuri hyperlink dari satu halaman web ke halaman web lain di seluruh internet untuk mendeteksi konten baru atau perubahan konten lama.',
          '2. Pengindeksan (Indexing): Konten teks, struktur HTML, gambar, dan metadata yang didapat diuraikan (parse) dan disimpan dalam basis data terdistribusi raksasa yang disebut "Indeks", memungkinkan pemanggilan data dalam hitungan milidetik.',
          '3. Pencarian & Perankingan (Searching & Ranking): Saat pengguna memasukkan kata kunci kueri, mesin mencocokkannya dengan database indeks. Algoritma perankingan mengevaluasi ribuan sinyal kualitas dan menyajikan daftar hasil teratas pada halaman SERP (Search Engine Results Page).',
        ],
      },
      {
        id: 'sec-3-3',
        title: '3. Faktor Penentu Algoritma Perankingan (SERP)',
        content: [
          'Algoritma modern menilai kelayakan suatu situs berdasarkan lima parameter krusial:',
        ],
        subsections: [
          {
            id: 'sec-3-3-1',
            title: 'Lima Faktor Utama Perankingan',
            bullets: [
              'Relevansi Konten: Keselarasan antara kueri pencari dengan elemen judul (title tag), sub-judul (heading H1/H2), dan kedalaman materi pada tubuh paragraf.',
              'Konsep E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness): Penilaian atas pengalaman nyata sang penulis, tingkat kepakaran/keahlian di bidangnya, pengakuan otoritas oleh sesama pakar di industrinya, dan jaminan kejujuran serta keamanan situs.',
              'Tautan Balik (Backlinks): Dianggap sebagai "suara kepercayaan" atau rekomendasi dari situs eksternal lain. Semakin banyak situs berotoritas tinggi mereferensikan halaman Anda, semakin tinggi peringkatnya.',
              'Pengalaman Pengguna (User Experience / UX): Kecepatan waktu muat (page speed), keramahan layar ponsel (mobile-friendly responsive), navigasi yang intuitif, serta kestabilan visual tata letak.',
              'Niat Pengguna (Search Intent): Terbagi 3 kategori utama: (1) Informational (mencari pemahaman topik baru), (2) Transactional (siap membeli atau memesan produk/jasa), dan (3) Navigational (ingin langsung menuju ke alamat web spesifik tertentu).',
            ],
          },
        ],
      },
      {
        id: 'sec-3-4',
        title: '4. Dampak Kognitif dan Perilaku Pengguna di Era Digital',
        content: [
          'Penggunaan mesin pencari yang sangat masif memunculkan sejumlah pergeseran kebiasaan berpikir pada manusia modern:',
          'Penurunan Rentang Perhatian (Attention Span): Ekspektasi terhadap informasi instan menurunkan kesabaran pengguna dalam membaca teks panjang secara analitis dan reflektif (deep reading).',
          'Ruang Gema (Echo Chamber): Algoritma yang mempersonalisasi hasil pencarian berdasarkan riwayat pengguna berisiko hanya menyajikan sudut pandang yang disukai pengguna, mengisolasi mereka dari sudut pandang pembanding.',
          'Ketergantungan Kognitif & Memori Eksternal: Mesin pencari kerap diposisikan sebagai pengganti daya ingat otak manusia, menurunkan kemandirian analitis dan kemampuan mengingat konsep dasar secara mendalam.',
        ],
      },
      {
        id: 'sec-3-5',
        title: '5. Tantangan Utama Mesin Pencari Modern',
        content: [
          'Tantangan Privasi Data: Pengumpulan jejak digital pengguna (lokasi GPS, riwayat kueri, klik tautan) untuk keperluan lelang iklan bertarget komersial.',
          'Bias Informasi Algoritmik: Data pelatihan algoritma yang berpotensi merefleksikan prasangka sosial manusia sehingga mengesampingkan kelompok minoritas.',
          'Penyebaran Hoaks via Manipulasi SEO: Pelaku kejahatan digital merekayasa kata kunci dan backlink artifisial (black-hat SEO) agar artikel palsu mereka berada di halaman pertama Google.',
          'Krisis Hak Cipta & Publisher: Fitur ringkasan jawaban instan berbasis AI (seperti AI Overviews) menyedot konten penerbit berita asli tanpa mengirimkan klik pembaca ke website jurnalis, memicu konflik ekonomi media independen.',
        ],
      },
    ],
  },
];
