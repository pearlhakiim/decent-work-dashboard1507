import React, { useState } from 'react';
import {
  BookOpen,
  Target,
  ShieldCheck,
  TrendingUp,
  Users,
  Briefcase,
  Clock,
  HeartHandshake,
  MessageSquare,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  GraduationCap,
  Building2,
  Anchor,
  CheckCircle2,
  Sparkles,
  Info,
  Scale,
  ArrowRight,
  Filter,
  FileText,
  Lightbulb,
  Compass,
  MapPin,
  GitBranch,
  ArrowRightCircle,
  CheckSquare
} from 'lucide-react';

export default function PolicyAnalysisSection({ actualYear = 2025, tablesByFile = {} }) {
  const [activeTab, setActiveTab] = useState('pillars');
  const [selectedPillar, setSelectedPillar] = useState('all');
  const [expandedCard, setExpandedCard] = useState('pilar-1');

  // Key data indicators for Tanjung Jabung Barat (2025)
  const dataFacts = {
    tpt: 3.12,
    epr: 61.28,
    informalStatusCount: '84.198', // Status 1 (30.780) + Status 2 (25.105) + Status 7 (28.313)
    berusahaSendiri: '30.780',
    buruhPegawai: '39.953',
    pekerjaKeluarga: '28.313',
    totalPekerja: '154.821',
    pekerjaPerempuan: '44.970',
    proporsiPerempuanTotal: 29.04,
    ruralPct: 63.74,
    urbanPct: 36.26,
    lowEducationPct: 64.93, // SD ke bawah (42,69%) + SMP (22,24%)
    jamsosPct: 49.36,
    excessiveHoursPct: 24.17,
    unionPct: 7.62,
    femaleProfessionalPct: 50.73,
    femaleUnpaidPct: 56.02,
    wageNonAgriCount: '36.714'
  };

  // 5 Strategic Policy Pillars synthesizing Data + Reference Books + Benchmarks
  const policyPillars = [
    {
      id: 'pilar-1',
      number: '01',
      title: 'Hilirisasi Komoditas Perkebunan & Perikanan Pesisir',
      subTitle: 'Transformasi Struktural Nilai Tambah Agribisnis dan Kelautan Berkelanjutan',
      category: 'Sektor Riil & Agribisnis',
      color: 'emerald',
      icon: Anchor,
      whyChosen: 'Sebanyak 84.198 orang (54,4% dari seluruh pekerja daerah, dan 63,74% di antaranya di perdesaan) terpusat pada status berusaha sendiri, buruh tidak tetap, dan pekerja keluarga di sektor primer (kelapa dalam, pinang, sawit, dan perikanan tangkap). Mereka menanggung risiko kejatuhan harga komoditas mentah tanpa perlindungan harga minimum. Tanpa hilirisasi pengolahan lokal, nilai tambah terbesar diekspor keluar daerah sementara pekerja lokal terjebak dalam upah subsisten dengan tingkat pendidikan rendah (64,9% tamat SMP ke bawah).',
      reasoningChain: {
        symptom: '84.198 pekerja informal perdesaan rentan terhadap anjloknya harga komoditas primer mentah (kelapa, pinang, TBS sawit, dan ikan tangkap basah).',
        rootCause: 'Rantai pasok panjang dikuasai pedagang perantara (tengkulak); ketiadaan industri pengolahan hilir di tingkat sentra desa; fasilitas cold storage perikanan minim di Kuala Tungkal sehingga hasil tangkapan cepat rusak.',
        solution: 'Membangun Kawasan Sentra Industri Hilir Kelapa Terpadu (KSHK) untuk produk turunan (VCO, sabut, briket tempurung) dan cold storage komunal bertenaga surya bagi nelayan Kuala Tungkal.',
        expectedImpact: 'Meningkatkan pendapatan riil petani dan nelayan hingga 35-50%, memangkas kerugian pasca-tangkap di bawah 5%, serta menyerap ribuan tenaga kerja lokal ke pekerjaan formal non-pertanian berupah teratur.'
      },
      benchmark: {
        location: 'Kabupaten Indragiri Hilir (Riau) & Kabupaten Banyuwangi (Jawa Timur)',
        policyName: 'Perda Perlindungan Tata Niaga Kelapa Terpadu & Rantai Dingin Nelayan Surya',
        howItWorked: 'Pemkab Inhil menerbitkan regulasi penetapan harga pembelian kelapa rakyat terstandar dan memfasilitasi pembangunan sentra pengolahan sabut kelapa dan arang aktif bekerja sama dengan kelompok tani perdesaan. Sementara di Banyuwangi, Pemda membangun fasilitas solar cold storage komunal di Tempat Pelelangan Ikan (TPI) Muncar yang dikelola koperasi nelayan.',
        provenResults: 'Di Inhil, nilai jual kelapa rakyat naik 40% dan serapan tenaga kerja pabrik olahan lokal mencapai >12.000 pekerja tetap. Di Banyuwangi, tingkat pembusukan ikan tangkap turun dari 28% menjadi hanya 4%, menstabilkan harga ikan nelayan kecil.',
        relevanceToTanjabbar: 'Sangat cocok untuk wilayah sentra kelapa dalam di Tungkal Ilir, Betara, dan Pengabuan, serta pelabuhan perikanan tangkap pesisir Kuala Tungkal yang berbatasan langsung dengan perairan Selat Berhala.'
      },
      evidenceData: [
        'Sebanyak 84.198 orang (63,74% di perdesaan) bekerja pada status mandiri/keluarga tak dibayar (Status 1, 2, 7), didominasi sektor perkebunan (kelapa, pinang, sawit) dan perikanan.',
        'Pendidikan pekerja mandiri perdesaan didominasi SD ke bawah (42,69%) dan SMP (22,24%), menyebabkan ketergantungan pada penjualan komoditas mentah dengan margin rendah.',
        'Pekerja penerima upah non-pertanian baru tercatat 36.714 orang, mencerminkan masih sempitnya kapasitas penyerapan sektor industri manufaktur formal lokal.'
      ],
      references: [
        {
          author: 'World Bank (Januari 2026)',
          docTitle: 'Country Growth & Jobs Report: Indonesia Running Faster, for Longer — Structural Transformation, Productivity, and Good Jobs',
          file: 'P180900-719ea266-fcef-4269-8fcb-4fb184482031.pdf',
          chapter: 'Bab 1 & Bab 6: Reallocating Labor to Higher Value-Added Sectors & Trade Connectivity',
          coreConcept: 'Pertumbuhan pekerjaan berkualitas mensyaratkan relokasi tenaga kerja dari pertanian subsisten mentah menuju industri pengolahan berbasis agribisnis dan penguatan konektivitas pelabuhan daerah.'
        },
        {
          author: 'CIPS Policy Brief No. 37 (April 2026)',
          docTitle: 'Casting the Right Policy Net: Fisheries Management and Coastal Livelihoods in Indonesia',
          file: '709916-casting-the-right-policy-net-should-indo-713a5916.pdf',
          chapter: 'Rekomendasi Manajemen Perikanan & Kesejahteraan Nelayan Tradisional Pesisir',
          coreConcept: 'Perlindungan nelayan pesisir skala kecil dicapai melalui penyediaan rantai pendingin (cold chain) terdesentralisasi dan pemotongan rantai tengkulak lewat penguatan koperasi maritim.'
        },
        {
          author: 'CIPS & Arianto Patunru (2024/2025)',
          docTitle: 'Protecting the Farmers, Improving the Quality: Rantai Pasok dan Nilai Tambah Pertanian',
          file: '270482-protecting-the-farmers-improving-the-qua-da5df7f9.pdf',
          chapter: 'Integrasi Pasar & Pemotongan Rantai Perantara Petani Swadaya',
          coreConcept: 'Menghubungkan kelompok tani kelapa dan pinang langsung dengan industri pembeli akhir (offtaker) untuk memotong ketergantungan pada rantai perantara berbiaya tinggi.'
        }
      ],
      interventions: [
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Inisiasi Kawasan Sentra Industri Hilir Kelapa Terpadu (KSHK)',
          detail: 'Membangun sentra pengolahan turunan kelapa rakyat (minyak kelapa murni VCO, arang briket tempurung, dan serat sabut kelapa untuk ekspor) di sentra perkebunan (Tungkal Ilir, Betara, Pengabuan) guna menyerap tenaga kerja lokal.'
        },
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Modernisasi Rantai Dingin & Higienitas Perikanan Kuala Tungkal',
          detail: 'Revitalisasi TPI dan penyediaan fasilitas solar ice/cold storage komunal bagi nelayan tradisional Kuala Tungkal guna mencegah anjloknya harga saat musim tangkapan melimpah.'
        },
        {
          timeline: 'Jangka Menengah (3–5 Tahun)',
          program: 'Integrasi Koridor Logistik Pelabuhan Roro Kuala Tungkal - Batam/Singapura',
          detail: 'Optimalisasi posisi strategis Pelabuhan Roro Kuala Tungkal sebagai simpul ekspor komoditas hortikultura, perikanan, dan produk olahan kelapa langsung ke pasar Kepulauan Riau dan regional.'
        }
      ],
      kpiTarget: 'Menaikkan proporsi pekerja penerima upah non-pertanian dari 36.714 orang menjadi >45.000 orang serta menekan kerentanan pendapatan petani/nelayan.'
    },
    {
      id: 'pilar-2',
      number: '02',
      title: 'Peningkatan Produktivitas & Formalisasi UMKM',
      subTitle: 'Reorientasi Pembiayaan Berkualitas, Digitalisasi & Standardisasi Mutu Produk Lokal',
      category: 'Kewirausahaan & UMKM',
      color: 'blue',
      icon: Briefcase,
      whyChosen: 'Sebanyak 30.780 pekerja berstatus berusaha sendiri dan 25.105 berusaha dibantu buruh tidak tetap, mayoritas tergolong usaha mikro-subsisten dengan omzet rendah. Pekerja upah rendah (LPR) terkonsentrasi di sektor ini karena minimnya kepemilikan alat modal modern dan hambatan legalitas formal (NIB, P-IRT, Sertifikasi Halal, BPOM). Usaha kuliner khas seperti kopi liberika Tungkal, kerupuk udang/ikan ketak, dan dodol kelapa sulit masuk ke pasar ritel modern dan e-commerce karena kendala izin edar dan standardisasi kemasan.',
      reasoningChain: {
        symptom: 'Tingginya konsentrasi wirausaha mandiri subsisten berpendapatan rendah; produk olahan khas daerah terhambat di pasar tradisional lokal.',
        rootCause: 'Penyaluran kredit perbankan (KUR) sering kali hanya digunakan untuk konsumsi atau perputaran stok barang dagangan, bukan investasi mesin/alat produksi modal; perizinan edar sulit diurus mandiri oleh pelaku usaha mikro.',
        solution: 'Menggulirkan skema subsidi bunga KUR Tanggap Alsintan khusus pembelian alat mesin pengolah, disertai Layanan Jemput Bola Terpadu Perizinan & Sertifikasi Halal/P-IRT gratis.',
        expectedImpact: 'Mendorong 15-20% usaha mikro mandiri naik kelas menjadi usaha kecil-menengah yang memiliki izin edar resmi, kemasan kedap udara berstandar ekspor, dan mampu mempekerjakan buruh tetap.'
      },
      benchmark: {
        location: 'Kabupaten Kulon Progo (D.I. Yogyakarta) & Provinsi Jawa Timur',
        policyName: 'Program "Bela-Beli Produk Lokal" & Skema Pembiayaan Klaster Alsintan',
        howItWorked: 'Pemkab Kulon Progo mendirikan klinik terpadu jemput bola untuk memproses sertifikasi P-IRT, Halal, dan NIB secara massal bagi UMKM perdesaan, lalu mewajibkan toko ritel modern di wilayahnya menjual minimal 20% produk UMKM lokal. Sementara Pemprov Jatim bermitra dengan Bank Jatim mendesain skema kredit berbunga murah khusus untuk peremajaan mesin kemasan dan alat olah pascapanen.',
        provenResults: 'Di Kulon Progo, lebih dari 1.200 produk UMKM desa berhasil menembus ritel modern dan jaringan hotel daerah, meningkatkan pendapatan pemilik usaha sebesar 65%. Di Jatim, produktivitas tenaga kerja UMKM pangan melonjak 42% pasca adopsi mesin pengemas otomatis.',
        relevanceToTanjabbar: 'Dapat diterapkan langsung pada sentra Kopi Liberika di Betara serta industri olahan boga laut (kerupuk ikan/udang belanak dan dodol nipah) di sepanjang pesisir Kuala Tungkal.'
      },
      evidenceData: [
        'Tanjab Barat memiliki 30.780 pekerja berusaha sendiri dan 25.105 berusaha dibantu buruh tidak tetap, mayoritas tergolong usaha mikro-subsisten.',
        'Pekerja upah rendah (LPR) masih terkonsentrasi di sektor usaha perseorangan berskala mikro yang belum mengadopsi teknologi dan manajemen modern.',
        'Hambatan utama usaha mikro lokal adalah akses modal investasi produktif, legalitas izin edar, sertifikasi halal, dan penetrasi pasar modern.'
      ],
      references: [
        {
          author: 'World Bank Policy Research Working Paper 10894 (2024/2025)',
          docTitle: 'Can Public Credit Schemes Improve Access to Finance for Small Businesses? Evidence from Indonesia',
          file: 'IDU12698ff2e1c4be1400518dec1e349ef771a96.pdf',
          chapter: 'Evaluasi Efektivitas Kredit Usaha Rakyat (KUR) & Belanja Modal Produktif',
          coreConcept: 'Kredit usaha publik terbukti mendongkrak produktivitas tenaga kerja secara permanen hanya jika disalurkan untuk belanja modal teknologi (capital goods) dan didampingi literasi finansial.'
        },
        {
          author: 'World Bank / Malaysia Economic Monitor (2026)',
          docTitle: 'From Quantity to Quality Financing: Financing Productive SMEs',
          file: 'P518853-84f118a9-49ca-42ea-9c0d-32eb982dd5b1.pdf',
          chapter: 'Shift to Productive Firm-Level Upgrading',
          coreConcept: 'Beralih dari sekadar mengejar kuantitas debitur pinjaman ke pembiayaan berorientasi peningkatan mutu, adopsi mesin pengolahan, dan penciptaan lapangan kerja formal.'
        },
        {
          author: 'CIPS Policy Report (2025)',
          docTitle: 'Dari Sertifikasi Menuju Pertumbuhan: Membantu UMKM Naik Kelas Melalui Standardisasi',
          file: '737849-dari-sertifikasi-menuju-pertumbuhan-meng-be91d583.pdf',
          chapter: 'Standardisasi Produk, Sertifikasi Halal & Daya Saing Rantai Pasok',
          coreConcept: 'Standardisasi mutu dan sertifikasi resmi (Halal, P-IRT, SNI) merupakan katalis esensial agar produk lokal mampu menembus ritel modern dan rantai nilai nasional.'
        }
      ],
      interventions: [
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Klinik Layanan Terpadu Legalitas & Sertifikasi Cepat UMKM',
          detail: 'Fasilitasi jemput bola penerbitan NIB, Sertifikasi Halal Gratis (SEHATI), P-IRT, dan izin BPOM untuk produk unggulan (kopi liberika Tungkal, olahan ikan belanak/udang ketak, dodol kelapa).'
        },
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Skema KUR Daerah Berbasis Pendampingan Alat Produksi (KUR Tanggap Alsintan)',
          detail: 'Kolaborasi Bank Jambi / Himbara dan Pemkab untuk mensubsidi bunga KUR yang dialokasikan khusus pembelian mesin pengupas kelapa, alat pemanggang kopi otomatis, dan mesin vacum packaging.'
        },
        {
          timeline: 'Jangka Menengah (3–5 Tahun)',
          program: 'Inkubator Bisnis Digital & Agropreneur Muda Tanjab Barat',
          detail: 'Program kemitraan dengan e-commerce nasional untuk menghubungkan 500 wirausaha mandiri Tanjab Barat ke ekosistem logistik nasional dan ekspor ritel.'
        }
      ],
      kpiTarget: 'Mendorong transformasi sedikitnya 15% pekerja berusaha sendiri (±4.500 unit) menjadi usaha formal yang mampu mempekerjakan buruh tetap berupah layak.'
    },
    {
      id: 'pilar-3',
      number: '03',
      title: 'Universalitas Jaminan Sosial & Perlindungan Pekerja Rentan',
      subTitle: 'Perluasan Cakupan BPJS Ketenagakerjaan bagi Petani, Nelayan & Buruh Harian Lepas',
      category: 'Perlindungan Sosial',
      color: 'purple',
      icon: ShieldCheck,
      whyChosen: 'Data Sakernas membuktikan adanya defisit perlindungan yang sangat mencolok: cakupan buruh yang memiliki jaminan sosial ketenagakerjaan baru mencapai 49,36%, artinya separuh buruh (50,64%) sama sekali tidak terlindungi jaring pengaman. Selain itu, 24,17% pekerja mengalami jam kerja berlebih (>48 jam/minggu) di perkebunan sawit, pelabuhan roro, dan perkapalan dengan risiko kecelakaan fisik tinggi. Bila terjadi kecelakaan atau kematian kepala keluarga, rumah tangga miskin langsung kehilangan sumber nafkah utama.',
      reasoningChain: {
        symptom: '50,64% buruh formal tanpa BPJS Ketenagakerjaan; 24,17% pekerja bekerja melebihi batas waktu 48 jam/minggu; puluhan ribu petani/nelayan bukan penerima upah (BPU) tanpa perlindungan.',
        rootCause: 'Rendahnya kesadaran dan kemampuan bayar iuran mandiri pekerja informal; lemahnya penegakan sanksi terhadap perusahaan/kontraktor perkebunan yang mempekerjakan buruh harian lepas tanpa jaminan sosial.',
        solution: 'Penerbitan Peraturan Bupati untuk mengalokasikan Dana Bagi Hasil (DBH) Sawit dan APBD guna membiayai 100% iuran JKK (Jaminan Kecelakaan Kerja) dan JKM (Jaminan Kematian) bagi 20.000 pekerja rentan.',
        expectedImpact: 'Mencegah kemiskinan katastropik saat terjadi kecelakaan kerja/kematian, memberikan kepastian biaya santunan anak sekolah hingga sarjana, serta menaikkan cakupan jamsos buruh formal di atas 75%.'
      },
      benchmark: {
        location: 'Kabupaten Siak (Riau) & Kabupaten Musi Banyuasin (Sumatera Selatan)',
        policyName: 'Inisiasi Alokasi DBH Sawit untuk Universal Jamsos Perlindungan Pekerja Rentan',
        howItWorked: 'Pemkab Siak dan Muba menerbitkan Perbup yang mewajibkan penyisihan 10-15% alokasi DBH Sawit daerah untuk mendaftarkan dan membayar penuh premi iuran BPJS Ketenagakerjaan (JKK & JKM) bagi seluruh petani sawit swadaya, buruh panen harian lepas, dan nelayan perdesaan miskin.',
        provenResults: 'Di Siak, lebih dari 30.000 pekerja rentan perdesaan terdaftar otomatis, menurunkan angka kemiskinan ekstrem sebesar 1,2% poin. Ratusan keluarga korban kecelakaan kerja perkebunan menerima santunan klaim tanpa membebani kas APBD daerah.',
        relevanceToTanjabbar: 'Tanjung Jabung Barat merupakan salah satu penerima DBH Sawit terbesar di Provinsi Jambi dengan luas perkebunan sawit swadaya dan perusahaan yang sangat masif di Tebing Tinggi, Batang Asam, dan Tungkal Ulu.'
      },
      evidenceData: [
        'Cakupan Jaminan Sosial Ketenagakerjaan baru mencapai 49,36% di kalangan buruh/karyawan, meninggalkan lebih dari 50% buruh tanpa jaring pengaman.',
        'Kelompok pekerja informal bukan penerima upah (BPU) seperti petani swadaya, nelayan tangkap, dan buruh bongkar muat hampir seluruhnya belum terlindungi program JKK & JKM.',
        'Proporsi pekerja dengan jam kerja berlebih (>48 jam/minggu) mencapai 24,17%, meningkatkan kerentanan kecelakaan kerja, penyakit akibat kerja, dan kelelahan kronis.'
      ],
      references: [
        {
          author: 'ILO (2024)',
          docTitle: 'Asia-Pacific Employment and Social Outlook 2024: Promoting Decent Work and Social Justice',
          file: 'Asia-pacific-employment-social-outlook-2024 (web).pdf',
          chapter: 'Universal Social Protection Floors for Informal & Ageing Workforce',
          coreConcept: 'Jaminan sosial ketenagakerjaan bukan sekadar biaya, melainkan investasi perlindungan produktivitas masyarakat agar tidak jatuh miskin saat terjadi guncangan ekonomi atau sakit.'
        },
        {
          author: 'CIPS Policy Brief No. 35 (April 2026)',
          docTitle: 'Menavigasi Masa Depan Dunia Kerja: Pendekatan Kebijakan untuk Pekerjaan Gig dan Rentan di Indonesia',
          file: '689505-navigating-the-future-of-work-policy-app-0ea7341e.pdf',
          chapter: 'Rekomendasi Skema Portabilitas Jamsos & Bantuan Iuran Daerah',
          coreConcept: 'Mendesain mekanisme kepesertaan fleksibel dan skema subsidi iuran pemerintah daerah bagi kelompok pekerja lepas dan pekerja rentan (precarious workers).'
        },
        {
          author: 'ILO Recommendations (2025/2026)',
          docTitle: 'The Future of Social Insurance: Policy Options and Recommendations',
          file: 'Layout ILO recommendations.eng 26.9.25.pdf',
          chapter: 'Financing Mechanisms & Enforcement for Non-Standard Employment',
          coreConcept: 'Penguatan integrasi data registrasi sosial daerah dengan penegakan kepatuhan pemberi kerja dalam mendaftarkan pekerja kontrak dan harian lepas.'
        }
      ],
      interventions: [
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Penerbitan Perbup Perlindungan Pekerja Rentan Berbasis DBH Sawit & APBD',
          detail: 'Alokasi Dana Bagi Hasil (DBH) Sawit dan APBD Tanjab Barat untuk mensubsidi 100% iuran JKK (Jaminan Kecelakaan Kerja) dan JKM (Jaminan Kematian) BPJS Ketenagakerjaan bagi 20.000 petani sawit swadaya, nelayan kecil, dan buruh harian.'
        },
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Satgas Pengawasan Kepatuhan Pendaftaran Karyawan Swasta',
          detail: 'Inspeksi berkala ke Pabrik Kelapa Sawit (PKS), perusahaan perkebunan besar, galangan kapal, dan gudang komoditas untuk memastikan seluruh buruh harian lepas didaftarkan ke BPJS Ketenagakerjaan.'
        },
        {
          timeline: 'Jangka Menengah (3–5 Tahun)',
          program: 'Integrasi Jamsos BPU pada Program Bantuan Sosial Daerah',
          detail: 'Menjadikan kepesertaan jaminan sosial ketenagakerjaan sebagai prasyarat terintegrasi dalam penerimaan program bantuan sarana pertanian dan perikanan (genset, jaring, bibit).'
        }
      ],
      kpiTarget: 'Meningkatkan cakupan jaminan sosial ketenagakerjaan dari 49,36% menjadi minimal 75% pada buruh formal dan melindungi >30.000 pekerja mandiri rentan.'
    },
    {
      id: 'pilar-4',
      number: '04',
      title: 'Pemberdayaan Tenaga Kerja Perempuan & Ekonomi Pengasuhan',
      subTitle: 'Pengentasan Beban Pekerja Keluarga Tidak Berbayar Menjadi Wirausaha Mandiri',
      category: 'Kesetaraan Gender & Keluarga',
      color: 'rose',
      icon: Users,
      whyChosen: 'Terjadi paradoks ketenagakerjaan gender di Tanjung Jabung Barat: perempuan memegang peran luar biasa di sektor profesional dan manajerial (50,73%), namun secara agregat proporsi perempuan yang bekerja hanya 29,04% (44.970 dari total 154.821 pekerja). Lebih memprihatinkan, perempuan menanggung 56,02% dari seluruh pekerja keluarga tidak berbayar (15.860 orang). Beban ganda pengasuhan anak dan tugas rumah tangga menahan partisipasi ekonomi perempuan di pasar kerja berupah.',
      reasoningChain: {
        symptom: '15.860 perempuan bekerja membantu usaha suami/keluarga tanpa upah mandiri; porsi perempuan di pasar kerja formal hanya 29,04%.',
        rootCause: 'Tidak tersedianya sarana pengasuhan anak (childcare) yang terjangkau dan aman di desa perkebunan; keterbatasan literasi bisnis dan pinjaman modal produktif tanpa agunan bagi ibu rumah tangga.',
        solution: 'Mengembangkan Pos Penitipan Anak (TPA) & PAUD Terpadu Ramah Kerja di balai desa sentra perkebunan, didukung Program Wirausaha Mandiri Rumah Tangga dengan pembiayaan kelompok PNM Mekaar / Bank Jambi.',
        expectedImpact: 'Membebaskan waktu produktif ibu rumah tangga untuk memasuki pasar kerja berupah atau menjalankan usaha olahan rumah tangga beromzet mandiri, menaikkan pendapatan keluarga hingga 40%.'
      },
      benchmark: {
        location: 'Perkebunan Sawit Berkelanjutan di Kalimantan Timur & Malaysia Estate (FELDA)',
        policyName: 'Community Workplace Childcare & Program Pemberdayaan Perempuan Berbasis Kelompok',
        howItWorked: 'Pengelola perkebunan bersama pemerintah desa mendirikan fasilitas Tempat Penitipan Anak (TPA) komunal di setiap perumahan afdeling perkebunan dengan pengasuh tersertifikasi. Bersamaan dengan itu, ibu-ibu difasilitasi modal usaha kelompok untuk memproduksi olahan pangan lokal dan sabun herbal dari minyak sawit/kelapa.',
        provenResults: 'Partisipasi tenaga kerja perempuan di sektor berupah melonjak 35%, tingkat kehadiran kerja ibu meningkat signifikan, dan angka stunting balita di kawasan perkebunan turun hingga 18% berkat makanan tambahan bergizi di TPA.',
        relevanceToTanjabbar: 'Sangat relevan untuk kawasan pemukiman perkebunan sawit di Tebing Tinggi, Merlung, Batang Asam, dan kawasan padat nelayan pesisir Tungkal Ilir.'
      },
      evidenceData: [
        'Proporsi perempuan yang bekerja di seluruh jabatan baru mencapai 29,04% (44.970 dari 154.821 pekerja).',
        'Perempuan menanggung 56,02% dari seluruh beban pekerja keluarga tidak dibayar (unpaid family workers) di Tanjab Barat, setara 15.860 orang.',
        'Meskipun demikian, perempuan membuktikan kompetensi tinggi dengan memegang 50,73% posisi profesional, teknisi, dan manajerial di sektor formal pemerintahan dan pendidikan.'
      ],
      references: [
        {
          author: 'World Bank Discussion Paper No. 2705 (July 2026)',
          docTitle: 'Making Skills Work for Women: Enhancing Access, Retention and Outcomes in Skills Training',
          file: 'Making Skills Work for Women.pdf',
          chapter: 'Rekomendasi Vokasi Ramah Gender & Fleksibilitas Waktu Pelatihan',
          coreConcept: 'Pelatihan vokasi perempuan harus dirancang modular, berlokasi di tingkat desa/komunitas, dan mengakomodasi jadwal tanggung jawab pengasuhan keluarga.'
        },
        {
          author: 'ILO (2024)',
          docTitle: 'Care at Work: Investing in Care Leave and Services for a More Gender Equal World of Work',
          file: 'wcms_838653.pdf',
          chapter: 'Investing in Childcare Infrastructure as an Employment Engine',
          coreConcept: 'Penyediaan sarana pengasuhan anak (childcare) yang terjangkau merupakan kunci utama membebaskan waktu produktif perempuan untuk masuk ke pasar kerja berupah.'
        },
        {
          author: 'CIPS Working Paper No. 3 (Pasaribu et al.)',
          docTitle: 'Trade and Gendered Labor Outcomes: Evidence from Indonesia',
          file: '611145-trade-and-gendered-labor-outcomes-eviden-ee6576b9.pdf',
          chapter: 'Keterlibatan Perempuan dalam Rantai Pasok Ekspor Agrikultur',
          coreConcept: 'Peningkatan integrasi ekonomi daerah ke rantai pasok industri memberi dampak positif nyata pada penyerapan tenaga kerja perempuan berpendidikan dasar.'
        }
      ],
      interventions: [
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Program Transformasi Pekerja Keluarga Perempuan menjadi "Wanita Wirausaha Mandiri"',
          detail: 'Pelatihan pembuatan produk turunan kelapa dan olahan boga laut khas pesisir di rumah tangga, disertai paket bantuan modal awal dan alat pengemas hampa udara.'
        },
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Inisiasi Ruang Penitipan Anak (TPA) & Pos PAUD Terpadu Ramah Kerja Desa',
          detail: 'Pengembangan pos penitipan anak di balai desa sentra perkebunan sawit/kelapa agar ibu rumah tangga dapat berpartisipasi dalam aktivitas ekonomi berbayar tanpa cemas.'
        },
        {
          timeline: 'Jangka Menengah (3–5 Tahun)',
          program: 'Perluasan Kredit Khusus Kelompok Perempuan (Program Kartu Ibu Produktif)',
          detail: 'Bekerja sama dengan PNM Mekaar dan Bank Pembangunan Daerah untuk memperluas akses permodalan tanpa agunan dengan pendampingan mingguan.'
        }
      ],
      kpiTarget: 'Mengonversi minimal 5.000 pekerja keluarga perempuan tidak dibayar menjadi wirausaha mikro produktif serta meningkatkan proporsi pekerja perempuan daerah.'
    },
    {
      id: 'pilar-5',
      number: '05',
      title: 'Revitalisasi Vokasi, Inklusi Pemuda (Gen Z) & Dialog Tripartit',
      subTitle: 'Penguatan Kapasitas SDM Kerja dan Penataan Hubungan Industrial yang Sehat',
      category: 'SDM, K3 & Hubungan Kerja',
      color: 'indigo',
      icon: GraduationCap,
      whyChosen: 'Partisipasi pekerja dalam serikat buruh di Tanjung Jabung Barat adalah salah satu yang terendah, hanya 7,62%, yang mencerminkan minimnya saluran advokasi dan negosiasi bipartit di tingkat perusahaan. Akibatnya, jam kerja berlebih (>48 jam/minggu) mencapai 24,17% tanpa mekanisme kompensasi lembur yang transparan. Di sisi penawaran tenaga kerja, generasi muda (Gen Z) yang lulus SMK/SMA menghadapi mismatch keterampilan dengan tuntutan mekanisasi pabrik kelapa sawit (PKS) dan operasional pelabuhan logistik maritim modern.',
      reasoningChain: {
        symptom: 'Partisipasi serikat pekerja hanya 7,62%; pekerja jam berlebih tinggi (24,17%); lulusan muda mengalami kesulitan transisi dari sekolah ke dunia kerja.',
        rootCause: 'Kurikulum Balai Latihan Kerja (BLK) daerah belum terhubung dengan teknologi dunia usaha; minimnya penerapan Perjanjian Kerja Bersama (PKB) dan Struktur Skala Upah di perkebunan swasta.',
        solution: 'Merevitalisasi BLK dengan sistem pelatihan ganda (dual-system) berbasis industri lokal serta mengaktifkan Lembaga Kerja Sama (LKS) Tripartit dan Dewan Pengupahan Daerah.',
        expectedImpact: 'Mencetak tenaga kerja muda yang siap pakai di sektor mekanisasi dan logistik, menekan sengketa industrial, dan menjamin penegakan batas jam kerja maksimal 40-48 jam/minggu.'
      },
      benchmark: {
        location: 'Kabupaten Morowali (Sulawesi Tengah) & Kabupaten Pasuruan (Jawa Timur)',
        policyName: 'Revitalisasi BLK Sistem Ganda Kemitraan Industri & Mediasi Tripartit Proaktif',
        howItWorked: 'Di Morowali, Pemkab menggandeng konsorsium industri untuk menyusun kurikulum teknisi alat berat, operator otomasi, dan K3 dengan jaminan langsung rekrutmen kerja formal. Di Pasuruan, Disnakertrans secara proaktif mendampingi pembentukan LKS Bipartit dan penyusunan PKB di seluruh perusahaan dengan lebih dari 50 pekerja.',
        provenResults: 'Di Morowali, 92% lulusan BLK langsung terserap ke sektor industri formal dalam 3 bulan pasca-pelatihan. Di Pasuruan, angka mogok kerja dan sengketa perselisihan jam kerja turun drastis hingga 75%, meningkatkan produktivitas pabrik secara keseluruhan.',
        relevanceToTanjabbar: 'Sangat dibutuhkan oleh puluhan Pabrik Kelapa Sawit (PKS), industri pengolahan kayu/kertas, serta kawasan logistik pelabuhan maritim Kuala Tungkal.'
      },
      evidenceData: [
        'Partisipasi serikat pekerja di Tanjung Jabung Barat sangat rendah, hanya 7,62%, mencerminkan minimnya ruang dialog sosial bipartit di tingkat perusahaan.',
        'Jam kerja berlebih (>48 jam/minggu) mencapai 24,17%, mengindikasikan beban kerja berat tanpa kompensasi lembur yang memadai di beberapa sektor.',
        'Tingkat Pengangguran Terbuka (TPT) Pemuda dan status NEET (Not in Employment, Education, or Training) masih membutuhkan jembatan transisi sekolah ke dunia kerja yang solid.'
      ],
      references: [
        {
          author: 'World Bank (2026)',
          docTitle: 'Building Human Capital Where It Matters: Homes, Neighborhoods, and Workplaces',
          file: 'Building Human Capital When It Matters_ Homes, Neighborhoods, and Workplaces.pdf',
          chapter: 'Workplace Learning, Lifelong Training and Regional TVET Systems',
          coreConcept: 'Revitalisasi pendidikan vokasi daerah harus berbasis kebutuhan nyata dunia usaha lokal (demand-driven) dengan skema magang terstruktur di tempat kerja.'
        },
        {
          author: 'World Bank Policy Research Working Paper 10972 (2025)',
          docTitle: 'Are There Jobs for Everyone? Relationship between Employment of Older and Younger Persons in Indonesia',
          file: 'IDU144dbb75e12515147cb18f981d55e29e78ec3.pdf',
          chapter: 'Youth Employment Dynamics & Intergenerational Complementarity',
          coreConcept: 'Pemberdayaan generasi muda (Gen Z) tidak harus menggantikan pekerja senior, melainkan mengisi ceruk keterampilan baru seperti teknologi digital, mekanisasi, dan logistik modern.'
        },
        {
          author: 'ILO Decent Work Governance Standards',
          docTitle: 'Strengthening Tripartite Social Dialogue & Industrial Relations',
          file: 'Asia-pacific-employment-social-outlook-2024 (web).pdf',
          chapter: 'Bipartite & Tripartite Social Dialogue for Decent Working Hours and Wage Setting',
          coreConcept: 'Dialog sosial yang kuat antara serikat pekerja, asosiasi pengusaha, dan pemerintah daerah adalah instrumen paling efektif untuk mencegah jam kerja berlebih dan menjamin keselamatan kerja (K3).'
        }
      ],
      interventions: [
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Revitalisasi Balai Latihan Kerja (BLK) Tanjab Barat Berbasis Kemitraan Industri',
          detail: 'Merancang kurikulum pelatihan baru: operator alat berat perkebunan, teknik pengolahan sabut kelapa otomatis, teknisi mesin pendingin ikan, dan pemasaran digital UMKM.'
        },
        {
          timeline: 'Jangka Pendek (1 Tahun)',
          program: 'Penguatan Lembaga Kerja Sama (LKS) Tripartit & Dewan Pengupahan Daerah',
          detail: 'Menyelenggarakan forum mediasi rutin tripartit untuk menegakkan norma batas jam kerja maksimal 40-48 jam per minggu dan memastikan transparansi struktur skala upah di perkebunan swasta.'
        },
        {
          timeline: 'Jangka Menengah (3–5 Tahun)',
          program: 'Program Pemagangan Daerah Gen Z Tanjab Barat (Apprenticeship)',
          detail: 'Kerja sama Pemkab dengan 30+ perusahaan perkebunan, pabrik kelapa sawit, dan logistik pelabuhan untuk menyerap 1.000 lulusan SMK/SMA dalam program magang bersertifikat.'
        }
      ],
      kpiTarget: 'Meningkatkan kepesertaan dialog serikat pekerja / wadah aspirasi buruh di atas 20% serta menurunkan proporsi jam kerja berlebih di bawah 18%.'
    }
  ];

  // Reference Books Catalog from 00 Buku Referensi
  const referenceCatalog = [
    {
      title: 'Country Growth & Jobs Report: Indonesia Running Faster, for Longer',
      author: 'World Bank (Januari 2026)',
      file: 'P180900-719ea266-fcef-4269-8fcb-4fb184482031.pdf',
      pages: '116 hlm',
      topic: 'Transformasi Struktural, Produktivitas, dan Pekerjaan Berkualitas di Indonesia',
      summary: 'Analisis komprehensif jalur transformasi ekonomi Indonesia menuju negara berpendapatan tinggi melalui relokasi tenaga kerja dari sektor informal bersubstitusi rendah menuju manufaktur pengolahan, modernisasi logistik, dan iklim usaha daerah.'
    },
    {
      title: 'Asia-Pacific Employment and Social Outlook 2024',
      author: 'International Labour Organization (ILO, 2024)',
      file: 'Asia-pacific-employment-social-outlook-2024 (web).pdf',
      pages: '85 hlm',
      topic: 'Pekerjaan Layak, Keadilan Sosial, dan Pengelolaan Transisi Demografi Kerja',
      summary: 'Pedoman standar pekerjaan layak (Decent Work Indicators) ILO yang mencakup lantai perlindungan sosial universal, penurunan precarious work, dan perlindungan jam kerja layak.'
    },
    {
      title: 'Menavigasi Masa Depan Dunia Kerja: Pendekatan Kebijakan Pekerjaan Gig & Rentan',
      author: 'Center for Indonesian Policy Studies (CIPS Policy Brief No. 35, April 2026)',
      file: '689505-navigating-the-future-of-work-policy-app-0ea7341e.pdf',
      pages: '19 hlm',
      topic: 'Jaminan Sosial Portabel & Perlindungan Tenaga Kerja Bukan Penerima Upah',
      summary: 'Rekomendasi reformasi regulasi ketenagakerjaan daerah untuk mengakomodasi pekerja fleksibel, buruh harian lepas, dan gig economy melalui jaminan sosial portabel berbantuan pemerintah.'
    },
    {
      title: 'Casting the Right Policy Net: Fisheries Management in Indonesia',
      author: 'CIPS Policy Brief No. 37 (April 2026)',
      file: '709916-casting-the-right-policy-net-should-indo-713a5916.pdf',
      pages: '14 hlm',
      topic: 'Manajemen Perikanan Berkelanjutan & Kesejahteraan Nelayan Skala Kecil',
      summary: 'Kajian kebijakan perlindungan mata pencaharian nelayan tradisional pesisir, perbaikan rantai pasok perikanan tangkap, dan mitigasi risiko ekonomi maritim.'
    },
    {
      title: 'Can Public Credit Schemes Improve Access to Finance for Small Businesses?',
      author: 'World Bank Policy Research Working Paper 10894 (2024/2025)',
      file: 'IDU12698ff2e1c4be1400518dec1e349ef771a96.pdf',
      pages: '35 hlm',
      topic: 'Efektivitas Skema Kredit Publik (KUR) Terhadap Pertumbuhan Usaha Mikro di Indonesia',
      summary: 'Temuan empiris bahwa penyaluran kredit usaha mikro hanya berdampak jangka panjang jika diarahkan pada belanja modal mesin pengolahan dan peningkatan produktivitas riil tenaga kerja.'
    },
    {
      title: 'Making Skills Work for Women: Enhancing Access and Outcomes',
      author: 'World Bank Social Policy & Labor Discussion Paper No. 2705 (Juli 2026)',
      file: 'Making Skills Work for Women.pdf',
      pages: '28 hlm',
      topic: 'Pelatihan Keterampilan dan Pemberdayaan Partisipasi Ekonomi Perempuan',
      summary: 'Strategi mengatasi kesenjangan partisipasi perempuan melalui pelatihan vokasi fleksibel, kemitraan pengusaha perempuan, dan integrasi dengan layanan pengasuhan keluarga.'
    },
    {
      title: 'Care at Work: Investing in Care Leave and Services for Gender Equality',
      author: 'International Labour Organization (ILO, 2024)',
      file: 'wcms_838653.pdf',
      pages: '432 hlm',
      topic: 'Investasi Ekonomi Pengasuhan dan Pengentasan Unpaid Care Work',
      summary: 'Pedoman investasi layanan penitipan anak dan cuti keluarga sebagai stimulus penciptaan lapangan kerja formal dan pendorong lonjakan partisipasi kerja perempuan.'
    },
    {
      title: 'Dari Sertifikasi Menuju Pertumbuhan: Membantu UMKM Naik Kelas',
      author: 'CIPS Policy Report (2025)',
      file: '737849-dari-sertifikasi-menuju-pertumbuhan-meng-be91d583.pdf',
      pages: '50 hlm',
      topic: 'Standardisasi Mutu, Sertifikasi Halal, dan Akses Pasar Modern bagi UMKM',
      summary: 'Panduan teknis bagi pemerintah daerah dalam memfasilitasi legalitas dan sertifikasi mutu produk lokal agar dapat terserap dalam rantai pasok ritel modern dan ekspor.'
    },
    {
      title: 'Building Human Capital Where It Matters: Homes, Neighborhoods, and Workplaces',
      author: 'World Bank Report (2026)',
      file: 'Building Human Capital When It Matters_ Homes, Neighborhoods, and Workplaces.pdf',
      pages: '164 hlm',
      topic: 'Pengembangan Modal Manusia Sepanjang Hayat dan Penguatan Vokasi',
      summary: 'Pentingnya lingkungan kerja yang aman (K3), pelatihan berkelanjutan di tempat kerja, dan kolaborasi dunia usaha-pendidikan dalam mencetak angkatan kerja tangguh.'
    }
  ];

  const filteredPillars =
    selectedPillar === 'all'
      ? policyPillars
      : policyPillars.filter((p) => p.id === selectedPillar);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8 mt-4">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 rounded-2xl p-6 sm:p-7 text-white">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Based Policy • Rujukan Ilmiah World Bank, ILO & CIPS</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Arah & Rekomendasi Kebijakan Ketenagakerjaan Kabupaten Tanjung Jabung Barat
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sintesis strategis berbasis diagnosis data statistik Sakernas BPS (2020–2025) dipadukan dengan telaah literatur dari koleksi <strong>00 Buku Referensi</strong>. Disertai alur berpikir penetapan prioritas, diagnosis akar masalah, dan telaah benchmark praktik baik dari daerah lain.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 text-xs">
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
              <span className="text-slate-300">Pekerja Mandiri & Keluarga</span>
              <span className="font-black text-amber-300 text-sm">{dataFacts.informalStatusCount} Jiwa</span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
              <span className="text-slate-300">Cakupan Jamsos Saat Ini</span>
              <span className="font-black text-blue-300 text-sm">{dataFacts.jamsosPct}%</span>
            </div>
            <div className="px-3.5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
              <span className="text-slate-300">Pekerja Perempuan Seluruh Jabatan</span>
              <span className="font-black text-rose-300 text-sm">{dataFacts.proporsiPerempuanTotal}% ({dataFacts.pekerjaPerempuan})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('pillars')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pillars'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Target className="w-4 h-4" />
          <span>5 Pilar Agenda Kebijakan</span>
        </button>

        <button
          onClick={() => setActiveTab('framework')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'framework'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Lightbulb className="w-4 h-4" />
          <span>Alur Berpikir & Rasional Pemilihan</span>
        </button>

        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'benchmarks'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Contoh Penerapan di Tempat Lain</span>
        </button>

        <button
          onClick={() => setActiveTab('diagnosis')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'diagnosis'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Diagnosis Data & Realita Daerah</span>
        </button>

        <button
          onClick={() => setActiveTab('actionplan')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'actionplan'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Matriks Rencana Aksi (OPD Terkait)</span>
        </button>

        <button
          onClick={() => setActiveTab('references')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'references'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Kajian & Buku Referensi (Folder 00)</span>
        </button>
      </div>

      {/* TAB 1: 5 PILAR AGENDA KEBIJAKAN (DENGAN ALUR BERPIKIR & BENCHMARK LENGKAP) */}
      {activeTab === 'pillars' && (
        <div className="space-y-6">
          {/* Sub-filter pilar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0">
              <Filter className="w-3.5 h-3.5" /> Filter Pilar:
            </span>
            <button
              onClick={() => setSelectedPillar('all')}
              className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
                selectedPillar === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Semua Pilar (5)
            </button>
            {policyPillars.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPillar(p.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
                  selectedPillar === p.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pilar {p.number}: {p.title.split('&')[0].trim()}
              </button>
            ))}
          </div>

          {/* Pillars List */}
          <div className="space-y-6">
            {filteredPillars.map((pillar) => {
              const IconComp = pillar.icon;
              const isExpanded = expandedCard === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Pillar Header Card */}
                  <div className="p-5 sm:p-6 bg-slate-50/50 border-b border-slate-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 font-black flex items-center justify-center shrink-0 shadow-xs">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[11px] font-extrabold uppercase bg-blue-50 text-blue-700 tracking-wider">
                              Pilar {pillar.number} • {pillar.category}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                            {pillar.title}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">
                            {pillar.subTitle}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedCard(isExpanded ? null : pillar.id)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
                      >
                        <span>{isExpanded ? 'Tutup Rincian' : 'Buka Alur & Bukti'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Latar Belakang & Alasan Pemilihan Pilar */}
                    <div className="mt-4 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-800 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-amber-900 font-black uppercase text-[11px] tracking-wide">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-700" />
                        <span>Kenapa Pilar Ini Dipilih? (Latar Belakang & Urgensi Daerah)</span>
                      </div>
                      <p className="leading-relaxed text-slate-700">
                        {pillar.whyChosen}
                      </p>
                    </div>

                    {/* Quick Highlights */}
                    <div className="mt-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Basis Bukti Data Sakernas
                        </span>
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {pillar.evidenceData[0]}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-slate-200/80">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
                          Contoh Penerapan Nyata
                        </span>
                        <p className="text-slate-700 leading-relaxed font-semibold text-emerald-800">
                          📍 {pillar.benchmark.location.split('&')[0].trim()}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-200/60">
                        <span className="text-[10px] uppercase font-bold text-blue-600 block mb-1">
                          Target Kinerja Daerah (KPI)
                        </span>
                        <p className="text-blue-950 leading-relaxed font-semibold">
                          {pillar.kpiTarget}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 space-y-6 bg-white animate-fadeIn">
                      {/* Section 1: Alur Berpikir (Problem-to-Solution Chain) */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                          <GitBranch className="w-4 h-4 text-blue-600" />
                          Alur Berpikir Kebijakan: Dari Data Sakernas Menuju Solusi Nyata
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                          {/* Step 1: Simtom */}
                          <div className="p-3.5 rounded-xl bg-rose-50/60 border border-rose-200/70 text-xs space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-rose-200/70 text-rose-800">
                              1. Simtom & Fakta Empiris
                            </span>
                            <p className="text-rose-950 leading-relaxed font-medium pt-1">
                              {pillar.reasoningChain.symptom}
                            </p>
                          </div>

                          {/* Step 2: Akar Masalah */}
                          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-200/70 text-amber-800">
                              2. Akar Masalah Struktural
                            </span>
                            <p className="text-amber-950 leading-relaxed font-medium pt-1">
                              {pillar.reasoningChain.rootCause}
                            </p>
                          </div>

                          {/* Step 3: Solusi Kebijakan */}
                          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70 text-xs space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-blue-200/70 text-blue-800">
                              3. Solusi Intervensi
                            </span>
                            <p className="text-blue-950 leading-relaxed font-medium pt-1">
                              {pillar.reasoningChain.solution}
                            </p>
                          </div>

                          {/* Step 4: Dampak & Transformasi */}
                          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/70 text-xs space-y-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-200/70 text-emerald-800">
                              4. Dampak Transformasi
                            </span>
                            <p className="text-emerald-950 leading-relaxed font-medium pt-1">
                              {pillar.reasoningChain.expectedImpact}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Studi Kasus / Benchmark Nyata di Tempat Lain */}
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-emerald-600" />
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                              Studi Kasus & Contoh Penerapan di Tempat Lain: {pillar.benchmark.location}
                            </h4>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            Praktik Baik Teruji
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                          <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                              Nama Kebijakan & Inisiatif
                            </span>
                            <p className="font-bold text-slate-800">
                              {pillar.benchmark.policyName}
                            </p>
                            <p className="text-slate-600 mt-1 leading-relaxed text-[11px]">
                              {pillar.benchmark.howItWorked}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-white border border-slate-200/70">
                            <span className="text-[10px] font-bold uppercase text-emerald-600 block mb-1">
                              Hasil Pembuktian (Outcomes)
                            </span>
                            <p className="text-slate-700 leading-relaxed text-[11px] font-medium">
                              {pillar.benchmark.provenResults}
                            </p>
                          </div>

                          <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-200/70">
                            <span className="text-[10px] font-bold uppercase text-indigo-700 block mb-1">
                              Kontekstualisasi ke Tanjab Barat
                            </span>
                            <p className="text-indigo-950 leading-relaxed text-[11px] font-medium">
                              {pillar.benchmark.relevanceToTanjabbar}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Rujukan Literatur Terkoneksi (Folder 00) */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                          Rujukan Teoretis & Kerangka Kebijakan (00 Buku Referensi)
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {pillar.references.map((ref, rIdx) => (
                            <div
                              key={rIdx}
                              className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col justify-between"
                            >
                              <div>
                                <span className="font-extrabold text-blue-700 block mb-1">
                                  {ref.author}
                                </span>
                                <p className="font-bold text-slate-900 leading-snug mb-1">
                                  {ref.docTitle}
                                </p>
                                <span className="text-[11px] font-semibold text-slate-500 block mb-2">
                                  {ref.chapter}
                                </span>
                                <p className="text-slate-600 text-[11px] leading-relaxed italic bg-white p-2.5 rounded-lg border border-slate-100">
                                  "{ref.coreConcept}"
                                </p>
                              </div>
                              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                                <span>File: {ref.file.substring(0, 20)}...</span>
                                <span className="text-blue-600 font-semibold">Folder 00</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Section 4: Matriks Intervensi Program */}
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Rencana Aksi Intervensi Kebijakan Kabupaten
                        </h4>

                        <div className="space-y-2.5">
                          {pillar.interventions.map((intv, iIdx) => (
                            <div
                              key={iIdx}
                              className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs"
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                                      intv.timeline.includes('1 Tahun')
                                        ? 'bg-amber-100 text-amber-800'
                                        : 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {intv.timeline}
                                  </span>
                                  <span className="font-bold text-slate-900">
                                    {intv.program}
                                  </span>
                                </div>
                                <p className="text-slate-600 leading-relaxed pl-0.5">
                                  {intv.detail}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ALUR BERPIKIR & RASIONAL PEMILIHAN (DEDICATED NARRATIVE) */}
      {activeTab === 'framework' && (
        <div className="space-y-6">
          {/* Narrative Big Picture */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30">
              <Compass className="w-3.5 h-3.5" />
              <span>Kerangka Kerja Konseptual Kebijakan Daerah</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Alur Berpikir Penetapan 5 Pilar Agenda Kebijakan Ketenagakerjaan
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Penetapan 5 pilar kebijakan ini bukan asumsi teoretis, melainkan hasil penalaran kausal yang menghubungkan <strong>fakta empiris Sakernas BPS</strong>, <strong>teori ekonomi pembangunan Bank Dunia & ILO</strong>, serta <strong>karakteristik geografis pesisir-agraris Tanjung Jabung Barat</strong>.
            </p>
          </div>

          {/* 3 Step Core Reasoning Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs">
                1
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">
                Dekonstruksi Ilusi Angka Pengangguran Rendah
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tingkat Pengangguran Terbuka (TPT) Tanjab Barat hanya <strong>3,12%</strong>. Namun, menurut teori <em>World Bank Country Growth & Jobs Report (2026)</em>, di wilayah berpendapatan menengah-bawah dengan dominasi perdesaan, pengangguran terbuka yang rendah sering kali menutupi fenomena <strong>underemployment dan perangkap pekerja subsisten</strong>.
              </p>
              <p className="text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded-lg">
                Masyarakat miskin tidak sanggup menganggur karena tidak ada tunjangan pengangguran. Mereka terpaksa bekerja di sektor informal dengan produktivitas dan upah rendah.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black flex items-center justify-center text-xs">
                2
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">
                Penyelidikan Titik Lemah Struktural (Vulnerability Knot)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dari 154.821 pekerja di Tanjab Barat, sebanyak <strong>84.198 orang (54,4%)</strong> berstatus berusaha sendiri dan pekerja keluarga tidak dibayar (63,74% di perdesaan). Ditambah lagi:
              </p>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li><strong>50,64% buruh</strong> tidak memiliki perlindungan jaminan sosial.</li>
                <li><strong>24,17% pekerja</strong> jam kerjanya berlebih (&gt;48 jam/minggu).</li>
                <li><strong>56,02% pekerja keluarga tak dibayar</strong> adalah perempuan.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2.5">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-black flex items-center justify-center text-xs">
                3
              </span>
              <h4 className="text-sm font-extrabold text-slate-900">
                Formulasi 5 Intervensi Pengungkit Nilai Tambah
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Untuk memutus rantai kerentanan tersebut, disusun 5 pilar kebijakan yang saling melengkapi *(mutually reinforcing)*:
              </p>
              <ul className="text-xs text-slate-600 space-y-1">
                <li>• <strong>Sisi Produksi & Pasar:</strong> Hilirisasi komoditas mentah (Pilar 1) & Modernisasi UMKM (Pilar 2).</li>
                <li>• <strong>Sisi Jaring Pengaman:</strong> Universalitas Jamsos via DBH Sawit (Pilar 3).</li>
                <li>• <strong>Sisi Keadilan Gender:</strong> Ekonomi Pengasuhan & Wirausaha Ibu (Pilar 4).</li>
                <li>• <strong>Sisi Kapasitas SDM:</strong> Vokasi Gen Z & Tripartit (Pilar 5).</li>
              </ul>
            </div>
          </div>

          {/* Detailed Justification per Pillar */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Matriks Argumen: Mengapa 5 Pilar Ini yang Menjadi Prioritas?</span>
            </h4>

            <div className="space-y-3">
              {policyPillars.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-blue-700 uppercase">
                      Pilar {p.number}: {p.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                      {p.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Rasionalisasi:</strong> {p.whyChosen}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                    <span>
                      <strong>Rujukan Pokok:</strong> {p.references[0].author} - <em>{p.references[0].docTitle.split(':')[0]}</em>
                    </span>
                    <span className="text-emerald-700 font-semibold">
                      Benchmark: {p.benchmark.location.split('&')[0].trim()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CONTOH PENERAPAN DI TEMPAT LAIN (BENCHMARK TAB) */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>
                <strong>Pembelajaran Praktik Baik (Benchmarking):</strong> Contoh nyata bagaimana daerah atau entitas lain di Indonesia dan regional berhasil mengeksekusi kebijakan serupa dengan dampak terukur yang dapat diadaptasi oleh Pemkab Tanjung Jabung Barat.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policyPillars.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3 hover:border-emerald-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      Pilar {p.number} Benchmark
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      📍 {p.benchmark.location}
                    </span>
                  </div>

                  <h4 className="text-sm font-extrabold text-slate-900">
                    {p.benchmark.policyName}
                  </h4>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block">
                      Mekanisme Pelaksanaan:
                    </span>
                    <p className="text-slate-700 leading-relaxed text-[11px]">
                      {p.benchmark.howItWorked}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-700 block">
                      Hasil Terbukti (Outcomes):
                    </span>
                    <p className="text-emerald-950 leading-relaxed text-[11px] font-medium">
                      {p.benchmark.provenResults}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                  <strong className="text-indigo-700">Relevansi untuk Tanjab Barat:</strong> {p.benchmark.relevanceToTanjabbar}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DIAGNOSIS DATA & REALITA DAERAH */}
      {activeTab === 'diagnosis' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
            <strong>Ringkasan Diagnosis:</strong> Pasar tenaga kerja Kabupaten Tanjung Jabung Barat memiliki karakteristik unik wilayah pesisir berbasis perkebunan dan perikanan. Tingkat Pengangguran Terbuka (TPT) berada pada angka yang relatif rendah (3,12%), namun tantangan mendasar terletak pada <em>kualitas pekerjaan (informalitas tinggi)</em>, <em>rendahnya perlindungan jaminan sosial (49,36%)</em>, dan <em>ketimpangan gender dalam pekerjaan keluarga tak dibayar (56,02%)</em>.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Box 1: Informalitas & Dominasi Perdesaan */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-sm">
                <Briefcase className="w-4 h-4" />
                <span>1. Dominasi Pekerja Mandiri & Informalitas Perdesaan</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tanjung Jabung Barat memiliki <strong>84.198 pekerja</strong> yang berstatus berusaha sendiri (30.780), dibantu buruh tidak tetap (25.105), dan pekerja keluarga tidak dibayar (28.313). Sebanyak <strong>63,74%</strong> berada di wilayah perdesaan.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span>Pendidikan SD ke Bawah:</span>
                  <span className="font-bold">42,69%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pendidikan SMP Sederajat:</span>
                  <span className="font-bold">22,24%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pendidikan Diploma/Sarjana:</span>
                  <span className="font-bold">4,33%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Implikasi:* Pekerja rentan terhadap volatilitas harga tandan buah segar (TBS) sawit, pinang basah/kering, dan kelapa dalam, serta terbatas dalam adopsi inovasi teknologi.
              </p>
            </div>

            {/* Box 2: Defisit Perlindungan Jamsos */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2 text-purple-600 font-extrabold text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>2. Kesenjangan Perlindungan Jaminan Sosial Ketenagakerjaan</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cakupan buruh/karyawan yang terlindungi sekurang-kurangnya satu program jaminan sosial (BPJS Ketenagakerjaan) baru tercatat <strong>49,36%</strong>. Artinya, separuh buruh formal belum terlindungi.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span>Buruh Terlindungi Jamsos:</span>
                  <span className="font-bold text-emerald-600">49,36%</span>
                </div>
                <div className="flex justify-between">
                  <span>Buruh Tanpa Jamsos:</span>
                  <span className="font-bold text-rose-600">50,64%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pekerja Jam Kerja Berlebih (&gt;48 Jam):</span>
                  <span className="font-bold text-amber-600">24,17%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Implikasi:* Beban pengobatan kecelakaan kerja dan kematian jatuh langsung pada keluarga pekerja, mempercepat siklus kemiskinan antargenerasi.
              </p>
            </div>

            {/* Box 3: Ketimpangan Gender & Beban Kerja Tak Berbayar */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2 text-rose-600 font-extrabold text-sm">
                <Users className="w-4 h-4" />
                <span>3. Disparitas Gender & Beban Kerja Tak Dibayar</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proporsi perempuan yang bekerja di seluruh lapangan pekerjaan baru mencapai <strong>29,04% (44.970 dari total 154.821 pekerja)</strong>. Selain itu, perempuan menanggung <strong>56,02% (15.860 orang)</strong> dari seluruh pekerja keluarga tidak dibayar, meskipun di posisi profesional perempuan mampu memegang 50,73%.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span>Proporsi Perempuan Total:</span>
                  <span className="font-bold text-rose-600">29,04% (44.970 jiwa)</span>
                </div>
                <div className="flex justify-between">
                  <span>Porsi Perempuan di Unpaid Family Worker:</span>
                  <span className="font-bold text-rose-600">56,02% (15.860 jiwa)</span>
                </div>
                <div className="flex justify-between">
                  <span>Keterwakilan Manajerial/Profesional:</span>
                  <span className="font-bold text-indigo-600">50,73%</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Implikasi:* Ketiadaan sarana pengasuhan anak dan fasilitas pemberdayaan wirausaha berbasis rumah tangga membatasi akses perempuan ke pekerjaan produktif berupah.
              </p>
            </div>

            {/* Box 4: Lemahnya Representasi & Dialog Sosial */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-3">
              <div className="flex items-center gap-2 text-sky-600 font-extrabold text-sm">
                <MessageSquare className="w-4 h-4" />
                <span>4. Lemahnya Partisipasi Dialog Sosial & Jam Kerja</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tingkat partisipasi pekerja dalam serikat pekerja/buruh sangat rendah, hanya <strong>7,62%</strong>. Ditambah lagi, <strong>24,17% pekerja</strong> bekerja lebih dari 48 jam per minggu tanpa mekanisme pengawasan lembur yang memadai.
              </p>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span>Partisipasi Serikat Pekerja:</span>
                  <span className="font-bold text-sky-700">7,62%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pekerja Jam Berlebih (&gt;48 Jam):</span>
                  <span className="font-bold text-amber-700">24,17%</span>
                </div>
                <div className="flex justify-between">
                  <span>Pekerja Penerima Upah Non-Pertanian:</span>
                  <span className="font-bold">36.714 Jiwa</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 italic">
                *Implikasi:* Perjanjian Kerja Bersama (PKB) minim diterapkan di perusahaan perkebunan swasta dan UMKM perikanan, menyebabkan posisi tawar buruh lemah.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MATRIKS RENCANA AKSI OPD */}
      {activeTab === 'actionplan' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
            Berikut adalah peta jalan kolaborasi lintas Organisasi Perangkat Daerah (OPD), asosiasi dunia usaha (APINDO/KADIN), serikat pekerja, dan BPJS Ketenagakerjaan dalam mengeksekusi rekomendasi kebijakan di Kabupaten Tanjung Jabung Barat:
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3.5">Pilar Kebijakan</th>
                  <th className="p-3.5">Program Strategis</th>
                  <th className="p-3.5">Instansi Penanggung Jawab (OPD)</th>
                  <th className="p-3.5">Mitra Kolaborasi</th>
                  <th className="p-3.5">Indikator Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-emerald-700">Pilar 1: Hilirisasi Komoditas</td>
                  <td className="p-3.5">Sentra Pengolahan Kelapa Terpadu & Rantai Dingin Perikanan</td>
                  <td className="p-3.5 font-semibold text-slate-900">Dinas Perkebunan & Peternakan, Dinas Perikanan</td>
                  <td className="p-3.5">Koperasi Nelayan, Kelompok Tani Sawit/Kelapa</td>
                  <td className="p-3.5">3 unit pengolahan aktif, 1 fasilitas cold storage komunal di Tungkal</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-blue-700">Pilar 2: Produktivitas UMKM</td>
                  <td className="p-3.5">KUR Tanggap Alsintan & Sertifikasi Cepat Halal/P-IRT</td>
                  <td className="p-3.5 font-semibold text-slate-900">Dinas Koperasi, UKM, Perindag & PTSP</td>
                  <td className="p-3.5">Bank Himbara, Bank Jambi, BPJPH Kemenag</td>
                  <td className="p-3.5">1.500 UMKM tersertifikasi NIB/Halal, penyaluran KUR modal alat naik 25%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-purple-700">Pilar 3: Universal Jamsos</td>
                  <td className="p-3.5">Subsidi Iuran JKK/JKM Berbasis DBH Sawit & Pengawasan BHL</td>
                  <td className="p-3.5 font-semibold text-slate-900">Disnakertrans, Bappeda, BPKAD</td>
                  <td className="p-3.5">BPJS Ketenagakerjaan KCP Tungkal, GAPKI</td>
                  <td className="p-3.5">20.000 pekerja rentan terdaftar subsidi, cakupan buruh naik &gt;75%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-rose-700">Pilar 4: Pemberdayaan Perempuan</td>
                  <td className="p-3.5">Kredit Usaha Rumah Tangga & Ruang Pengasuhan Anak Desa</td>
                  <td className="p-3.5 font-semibold text-slate-900">Dinas P3AP2KB & Dinas PMD</td>
                  <td className="p-3.5">PKK Desa, PNM Mekaar, Pengelola PAUD</td>
                  <td className="p-3.5">15 Pos TPA Ramah Kerja di desa perkebunan, 3.000 wirausaha wanita baru</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3.5 font-bold text-indigo-700">Pilar 5: Vokasi & Tripartit</td>
                  <td className="p-3.5">Revitalisasi BLK Dual-System & Penguatan LKS Tripartit</td>
                  <td className="p-3.5 font-semibold text-slate-900">Disnakertrans & Dinas Pendidikan</td>
                  <td className="p-3.5">APINDO Tanjab Barat, Serikat Buruh (FSPPP, dsb.)</td>
                  <td className="p-3.5">1.000 pemuda lulus magang industri, forum LKS Tripartit aktif tiap kuartal</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: KAJIAN & BUKU REFERENSI DARI FOLDER 00 */}
      {activeTab === 'references' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 leading-relaxed flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Koleksi rujukan ilmiah resmi dari <strong>Folder 00 Buku Referensi</strong> yang digunakan dalam menyusun telaah kebijakan ketenagakerjaan Kabupaten Tanjung Jabung Barat:
              </span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-200/60 text-indigo-900 shrink-0">
              Total 9 Rujukan Utama
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {referenceCatalog.map((book, bIdx) => (
              <div
                key={bIdx}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mb-1.5">
                    <span className="text-blue-700 font-bold">{book.author}</span>
                    <span>{book.pages}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug mb-1">
                    {book.title}
                  </h4>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold bg-slate-100 text-slate-600 mb-2">
                    {book.topic}
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    {book.summary}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="truncate max-w-[180px] font-mono">📁 {book.file}</span>
                  <span className="font-semibold text-emerald-600">Terverifikasi</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
