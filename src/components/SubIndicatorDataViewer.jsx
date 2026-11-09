import React, { useState, useMemo, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import {
  Table as TableIcon,
  TrendingUp,
  Search,
  Filter,
  Download,
  Info,
  Calendar,
  Users,
  MapPin,
  Clock,
  Layers,
  GraduationCap,
  Briefcase,
  CheckSquare,
  PieChart as PieChartIcon,
  BarChart3,
  Sparkles,
  Check,
  Eye,
  RotateCcw
} from 'lucide-react';

export default function SubIndicatorDataViewer({
  subIndicator,
  sheetsData,
  selectedYear,
  setSelectedYear
}) {
  const isEpr = subIndicator?.code === 'EPR' || subIndicator?.id === '01_1';
  const isTpt = (subIndicator?.code === 'TPT' || subIndicator?.id === '01_2') && subIndicator?.id !== '01_2_2';
  const isInformal =
    subIndicator?.code === 'INFORMAL' ||
    subIndicator?.id === '01_4' ||
    subIndicator?.file?.includes('01_4');
  const isTpak =
    subIndicator?.code === 'TPAK' ||
    subIndicator?.id === '01_5' ||
    subIndicator?.file?.includes('01_5');
  const isStatusPekerjaan =
    subIndicator?.code === 'STATUS' ||
    subIndicator?.id === '01_6' ||
    subIndicator?.file?.includes('01_6');
  const isPekerjaKeluarga =
    subIndicator?.code === 'OWN_ACCOUNT' ||
    subIndicator?.id === '01_7' ||
    subIndicator?.file?.includes('01_7');
  const isWageNonAgri =
    subIndicator?.code === 'WAGE_NON_AGRI' ||
    subIndicator?.id === '01_8' ||
    subIndicator?.file?.includes('01_8');
  const isUpahRendah =
    subIndicator?.code === 'LPR' ||
    subIndicator?.id === '02_1' ||
    subIndicator?.file?.includes('02_1');
  const isRerataPendapatan =
    subIndicator?.code === 'RERATA_PENDAPATAN' ||
    subIndicator?.id === '02_2' ||
    subIndicator?.file?.includes('02_2');
  const isRerataBuruh =
    subIndicator?.code === 'RERATA_BURUH' ||
    subIndicator?.id === '02_3' ||
    subIndicator?.file?.includes('02_3');
  const isJamLebih =
    subIndicator?.code === 'EXCESSIVE_HOURS' ||
    subIndicator?.id === '03_1' ||
    subIndicator?.file?.includes('03_1');
  const isRataJamMinggu =
    subIndicator?.code === 'RATA_JAM_MINGGU' ||
    subIndicator?.id === '03_2' ||
    subIndicator?.file?.includes('03_2');
  const isRataJamTahun =
    subIndicator?.code === 'RATA_JAM_TAHUN' ||
    subIndicator?.id === '03_3' ||
    subIndicator?.file?.includes('03_3');
  const isSetengahPengangguran =
    subIndicator?.code === 'SETENGAH_MENGANGGUR' ||
    subIndicator?.id === '03_4' ||
    subIndicator?.file?.includes('03_4');
  const isPrecarious =
    subIndicator?.code === 'PRECARIOUS' ||
    subIndicator?.id === '05_1' ||
    subIndicator?.file?.includes('05_1');
  const isFemaleShare =
    subIndicator?.code === 'FEMALE_SHARE' ||
    subIndicator?.id === '06_1' ||
    subIndicator?.file?.includes('06_1');
  const isJamsos =
    subIndicator?.code === 'JAMSOS_RATE' ||
    subIndicator?.id === '07_1' ||
    subIndicator?.file?.includes('07_1');
  const isSerikat =
    subIndicator?.code === 'UNION_RATE' ||
    subIndicator?.id === '08_1' ||
    subIndicator?.id === '08_2' ||
    subIndicator?.file?.includes('08_2');

  // -------------------------------------------------------------
  // 1. DINAMIS: MENENTUKAN TAB DIMENSI SESUAI SUB-INDIKATOR
  // -------------------------------------------------------------
  const availableTabs = useMemo(() => {
    if (!sheetsData || sheetsData.length === 0) return [];

    // Case 1: EPR -> 3 Tab Spesifik (Gender, Wilayah, Umur)
    if (isEpr) {
      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: sheetsData[0]
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart Antarwaktu',
          icon: MapPin,
          sheet: sheetsData[1]
        },
        {
          id: 'umur',
          label: 'Menurut Kelompok Umur',
          badge: 'Multi-Line Perbandingan',
          icon: Clock,
          sheet: sheetsData[2]
        }
      ];
    }

    // Case 2: TPT -> 3 Dimensi Spesifik (Gender, Kab/Kota, Pendidikan)
    if (isTpt) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s5 = sheetsData.find((s) => s.sheet === 'Sheet5') || sheetsData[2];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: s1
        },
        {
          id: 'kabupaten',
          label: 'Menurut Kabupaten Kota',
          badge: '11 Kab/Kota Se-Jambi',
          icon: MapPin,
          sheet: s2
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: '<= SMP vs >= SMA',
          icon: GraduationCap,
          sheet: s5
        }
      ];
    }

    // Case 3: TPAK -> 4 Dimensi Spesifik (Gender, Wilayah, Kelompok Umur, Pendidikan)
    if (isTpak) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
      const s5 = sheetsData.find((s) => s.sheet === 'Sheet5') || sheetsData[4];
      const s6 = sheetsData.find((s) => s.sheet === 'Sheet6') || sheetsData[5];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: s4,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart Antarwaktu',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Daerah Tempat Tinggal'
        },
        {
          id: 'umur',
          label: 'Menurut Kelompok Umur',
          badge: 'Multi-Line Perbandingan',
          icon: Clock,
          sheet: s1,
          categoryColName: 'Kelompok Umur'
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: 'Stacked Bar 100%',
          icon: GraduationCap,
          sheet: s6,
          categoryColName: 'Pendidikan'
        }
      ];
    }

    // Case 3: Penduduk Bekerja pada Sektor Informal -> 4 Dimensi Khusus (Gender, Wilayah, Sektor, Generasi)
    if (isInformal) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart Antarwaktu',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'sektor',
          label: 'Menurut Sektor',
          badge: 'Pie Chart Distribusi',
          icon: Layers,
          sheet: s3,
          categoryColName: 'Sektor'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Pie Chart Distribusi',
          icon: Clock,
          sheet: s4,
          categoryColName: 'Generasi'
        }
      ];
    }

    // Case 5: Penduduk Bekerja Menurut Status Pekerjaan Utama (01_6) -> 3 Dimensi (Gender, Generasi, Wilayah)
    if (isStatusPekerjaan) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Status dalam Pekerjaan'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart & Stacked Bar',
          icon: Layers,
          sheet: s2,
          categoryColName: 'Status dalam Pekerjaan'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s3,
          categoryColName: 'Status dalam Pekerjaan'
        }
      ];
    }

    // Case 5b: Pekerja Berusaha Sendiri dan Pekerja Keluarga (01_7) -> 4 Dimensi
    if (isPekerjaKeluarga) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart & Stacked Bar',
          icon: Layers,
          sheet: s3,
          categoryColName: 'Generasi'
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: 'Line Chart & Stacked Bar',
          icon: GraduationCap,
          sheet: s4,
          categoryColName: 'Pendidikan'
        }
      ];
    }

    // Case 5c: Share Pekerja Penerima Upah di Sektor Non-Pertanian (01_8) -> 4 Dimensi
    if (isWageNonAgri) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart & Stacked Bar',
          icon: Layers,
          sheet: s4,
          categoryColName: 'Generasi'
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: 'Line Chart & Stacked Bar',
          icon: GraduationCap,
          sheet: s3,
          categoryColName: 'Pendidikan'
        }
      ];
    }

    // Case 5d: Proporsi Pekerja Penerima Upah Rendah (02_1) -> 3 Dimensi (Gender, Wilayah, Pendidikan)
    if (isUpahRendah) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: 'Line Chart & Stacked Bar',
          icon: GraduationCap,
          sheet: s3,
          categoryColName: 'Pendidikan'
        }
      ];
    }

    // Case 5e: Rata-Rata Upah/Pendapatan Bersih (02_2) -> 7 Dimensi
    if (isRerataPendapatan) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
      const s5 = sheetsData.find((s) => s.sheet === 'Sheet5') || sheetsData[4];
      const s6 = sheetsData.find((s) => s.sheet === 'Sheet6') || sheetsData[5];
      const s7 = sheetsData.find((s) => s.sheet === 'Sheet7') || sheetsData[6];

      return [
        {
          id: 'non_pertanian',
          label: 'Sektor Non Pertanian',
          badge: 'Pengusaha & Buruh',
          icon: Briefcase,
          sheet: s1,
          categoryColName: 'Jabatan'
        },
        {
          id: 'pertanian',
          label: 'Sektor Pertanian',
          badge: 'Petani & Buruh Tani',
          icon: Briefcase,
          sheet: s2,
          categoryColName: 'Jabatan'
        },
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Gender Antarwaktu',
          icon: Users,
          sheet: s3,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Perkotaan & Perdesaan',
          icon: MapPin,
          sheet: s4,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Klasifikasi Generasi',
          icon: Layers,
          sheet: s5,
          categoryColName: 'Generasi'
        },
        {
          id: 'pendidikan',
          label: 'Menurut Pendidikan',
          badge: 'Tingkat Pendidikan',
          icon: GraduationCap,
          sheet: s6,
          categoryColName: 'Pendidikan'
        },
        {
          id: 'sektor',
          label: 'Menurut Sektor',
          badge: 'Lapangan Usaha',
          icon: Layers,
          sheet: s7,
          categoryColName: 'Sektor'
        }
      ];
    }

    // Case 5f: Rata-Rata Upah Buruh/Karyawan/Pegawai (02_3) -> 3 Dimensi
    if (isRerataBuruh) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];

      return [
        {
          id: 'pekerjaan',
          label: 'Menurut Jenis Pekerjaan',
          badge: 'Kategori Jabatan',
          icon: Briefcase,
          sheet: s1,
          categoryColName: 'Jabatan'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Filter Wilayah',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Jabatan'
        },
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Filter Gender',
          icon: Users,
          sheet: s3,
          categoryColName: 'Jabatan'
        }
      ];
    }

    // Case 5g: Pekerja dengan Jam Kerja Lebih (>48 Jam) (03_1) -> 3 Dimensi (Gender, Wilayah, Generasi)
    if (isJamLebih) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart & Stacked Bar',
          icon: Layers,
          sheet: s3,
          categoryColName: 'Generasi'
        }
      ];
    }

    // Case 5h: Rata-Rata Jam Kerja Seminggu (03_2) -> 4 Dimensi (Gender, Wilayah, Generasi, Distribusi Jam Kerja)
    if (isRataJamMinggu) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      const s4 = sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart Antarwaktu',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart Antarwaktu',
          icon: Layers,
          sheet: s3,
          categoryColName: 'Generasi'
        },
        {
          id: 'distribusi',
          label: 'Distribusi Jam Kerja',
          badge: 'Filter Gender & Kelompok Jam',
          icon: Clock,
          sheet: s4,
          categoryColName: 'Jam Kerja'
        }
      ];
    }

    // Case 5i: Rata-Rata Jam Kerja Selama Setahun (03_3) -> 3 Dimensi (Gender, Wilayah, Generasi)
    if (isRataJamTahun) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      const s3 = sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart Antarwaktu',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart Antarwaktu',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        },
        {
          id: 'generasi',
          label: 'Menurut Generasi',
          badge: 'Line Chart Antarwaktu',
          icon: Layers,
          sheet: s3,
          categoryColName: 'Generasi'
        }
      ];
    }

    // Case 5j: Tingkat Setengah Pengangguran (03_4) -> 1 Dimensi (Gender)
    if (isSetengahPengangguran) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        }
      ];
    }

    // Case 5k: Precarious Worker (05_1) -> 2 Dimensi (Gender, Wilayah)
    if (isPrecarious) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        }
      ];
    }

    // Case 5l: Proporsi Pekerja Perempuan Menurut Jabatan (06_1) -> 2 Dimensi (Jabatan, Wilayah) [Sheet3 dropped]
    if (isFemaleShare) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];

      return [
        {
          id: 'jabatan',
          label: 'Menurut Jabatan',
          badge: 'Line Chart Antarwaktu',
          icon: Briefcase,
          sheet: s1,
          categoryColName: 'Jabatan'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Filter Wilayah',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Jabatan'
        }
      ];
    }

    // Case 5m: Proporsi Pekerja Penerima Jamsos (07_1) -> 2 Dimensi (Gender, Wilayah)
    if (isJamsos) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        }
      ];
    }

    // Case 5n: Proporsi Pekerja Berserikat (08_2) -> 2 Dimensi (Gender, Wilayah)
    if (isSerikat) {
      const s1 = sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      const s2 = sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];

      return [
        {
          id: 'gender',
          label: 'Menurut Gender',
          badge: 'Line Chart & Stacked Bar',
          icon: Users,
          sheet: s1,
          categoryColName: 'Jenis Kelamin'
        },
        {
          id: 'wilayah',
          label: 'Menurut Wilayah',
          badge: 'Line Chart & Stacked Bar',
          icon: MapPin,
          sheet: s2,
          categoryColName: 'Wilayah'
        }
      ];
    }

    // Case 6: Indikator lainnya -> Dinamis mengikuti sheets yang tersedia
    const usedLabels = {};
    return sheetsData.map((sheet, idx) => {
      const t = (sheet.title || '')
        .toLowerCase()
        .replace('kabupaten tanjung jabung barat', '')
        .replace('tanjung jabung barat', '');
      const c = (sheet.category_col || '').toLowerCase();

      let label = 'Menurut Kategori';
      let icon = Layers;
      let badge = 'Line Chart Antarwaktu';

      if (t.includes('pendidikan') || c.includes('pendidikan')) {
        label = 'Menurut Pendidikan';
        icon = GraduationCap;
        badge = 'Tingkat Pendidikan';
      } else if (
        t.includes('se provinsi') ||
        t.includes('kabupaten/kota') ||
        t.includes('kabupaten kota') ||
        t.includes('provinsi') ||
        c === 'nama'
      ) {
        label = 'Menurut Kabupaten/Kota';
        icon = MapPin;
        badge = 'Antar Daerah';
      } else if (t.includes('kelompok umur') || c.includes('kelompok umur') || t.includes('usia')) {
        label = 'Menurut Kelompok Umur';
        icon = Clock;
        badge = 'Struktur Umur';
      } else if (
        t.includes('jenis kelamin') ||
        t.includes('gender') ||
        t.includes('perempuan') ||
        c.includes('jenis kelamin')
      ) {
        label = 'Menurut Gender';
        icon = Users;
        badge = 'Gender Antarwaktu';
      } else if (
        t.includes('wilayah') ||
        t.includes('tempat tinggal') ||
        t.includes('daerah') ||
        c.includes('wilayah')
      ) {
        label = 'Menurut Wilayah';
        icon = MapPin;
        badge = 'Perkotaan & Pedesaan';
      } else if (t.includes('sektor') || t.includes('lapangan usaha') || c.includes('sektor')) {
        label = 'Menurut Sektor';
        icon = Layers;
        badge = 'Lapangan Usaha';
      } else if (t.includes('generasi') || c.includes('generasi')) {
        label = 'Menurut Generasi';
        icon = Layers;
        badge = 'Klasifikasi Generasi';
      } else if (t.includes('jabatan') || c.includes('jabatan')) {
        label = 'Menurut Jabatan';
        icon = Briefcase;
        badge = 'Kategori Jabatan';
      } else if (t.includes('jam kerja') || c.includes('jam kerja')) {
        label = 'Menurut Jam Kerja';
        icon = Clock;
        badge = 'Durasi Kerja';
      } else if (t.includes('status') || c.includes('status')) {
        label = 'Menurut Status';
        icon = CheckSquare;
        badge = 'Status Pekerjaan';
      } else {
        label = sheet.sheet || `Dimensi ${idx + 1}`;
      }

      if (usedLabels[label]) {
        usedLabels[label]++;
        label = `${label} (${sheet.sheet})`;
      } else {
        usedLabels[label] = 1;
      }

      return {
        id: sheet.sheet || `sheet_${idx}`,
        label,
        badge,
        icon,
        sheet
      };
    });
  }, [
    sheetsData,
    isEpr,
    isTpt,
    isTpak,
    isInformal,
    isStatusPekerjaan,
    isPekerjaKeluarga,
    isWageNonAgri,
    isUpahRendah,
    isRerataPendapatan,
    isRerataBuruh,
    isJamLebih,
    isRataJamMinggu,
    isRataJamTahun,
    isSetengahPengangguran,
    isPrecarious,
    isFemaleShare,
    isJamsos,
    isSerikat
  ]);

  // Tab aktif (default ke tab pertama saat sub-indikator berganti)
  const [activeDimension, setActiveDimension] = useState(availableTabs[0]?.id || 'gender');

  useEffect(() => {
    if (availableTabs.length > 0) {
      if (!availableTabs.some((t) => t.id === activeDimension)) {
        setActiveDimension(availableTabs[0].id);
      }
    }
  }, [subIndicator?.id, availableTabs]);

  const activeTabMeta = useMemo(() => {
    return availableTabs.find((t) => t.id === activeDimension) || availableTabs[0] || null;
  }, [availableTabs, activeDimension]);

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS EPR TAB KELOMPOK UMUR:
  // -------------------------------------------------------------
  const [ageCompareMode, setAgeCompareMode] = useState('gender'); // 'gender', 'wilayah', 'gabungan'
  const [ageSelectedYear, setAgeSelectedYear] = useState(2025);
  const [activeAgeLines, setActiveAgeLines] = useState({
    'Laki-Laki': true,
    Perempuan: true,
    'Laki-Laki dan Perempuan': true,
    'Total (L+P)': true,
    Perkotaan: true,
    Pedesaan: true
  });

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS TPT TAB KABUPATEN/KOTA (11 Kab/Kota)
  // -------------------------------------------------------------
  const [activeKabupaten, setActiveKabupaten] = useState({});
  const allKabupatenList = useMemo(() => {
    if (!isTpt || activeDimension !== 'kabupaten') return [];
    const kabSheet = activeTabMeta?.sheet;
    if (!kabSheet || !kabSheet.data) return [];
    const setKab = new Set();
    kabSheet.data.forEach((r) => {
      const k = String(r['Nama'] || r[kabSheet.category_col] || '').trim();
      if (k) setKab.add(k);
    });
    return Array.from(setKab).sort();
  }, [isTpt, activeDimension, activeTabMeta]);

  useEffect(() => {
    if (allKabupatenList.length > 0 && Object.keys(activeKabupaten).length === 0) {
      const initMap = {};
      allKabupatenList.forEach((kab) => {
        initMap[kab] = true;
      });
      setActiveKabupaten(initMap);
    }
  }, [allKabupatenList]);

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS INFORMAL TAB SEKTOR & GENERASI, DAN TPAK PENDIDIKAN (PIE CHART)
  // -------------------------------------------------------------
  const [pieSelectedYear, setPieSelectedYear] = useState(2025);
  const [tpakEduGender, setTpakEduGender] = useState('Laki-Laki + Perempuan');

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS STATUS DALAM PEKERJAAN (01_6)
  // -------------------------------------------------------------
  const [statusGenderFilter, setStatusGenderFilter] = useState('Laki-Laki dan Perempuan');
  const [statusGenerasiFilter, setStatusGenerasiFilter] = useState('01 Gen Z');
  const [statusWilayahFilter, setStatusWilayahFilter] = useState('Perkotaan');
  const [statusStackedYear, setStatusStackedYear] = useState(2025);

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS PEKERJA BERUSAHA SENDIRI & KELUARGA (01_7)
  // -------------------------------------------------------------
  const [pekerjaKeluargaStackMode, setPekerjaKeluargaStackMode] = useState('percent'); // 'percent' | 'count'

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS SHARE PEKERJA PENERIMA UPAH NON-PERTANIAN (01_8)
  // -------------------------------------------------------------
  const [wageNonAgriStackMode, setWageNonAgriStackMode] = useState('percent'); // 'percent' | 'count'

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS PILAR 02 (02_1 & 02_3)
  // -------------------------------------------------------------
  const [upahRendahStackMode, setUpahRendahStackMode] = useState('percent'); // 'percent' | 'count'
  const [rerataBuruhWilayahFilter, setRerataBuruhWilayahFilter] = useState('Perkotaan'); // 'Perkotaan' | 'Pedesaan'
  const [rerataBuruhGenderFilter, setRerataBuruhGenderFilter] = useState('Laki-laki'); // 'Laki-laki' | 'Perempuan'

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS PILAR 03 (03_1, 03_2, 03_4)
  // -------------------------------------------------------------
  const [jamLebihStackMode, setJamLebihStackMode] = useState('percent'); // 'percent' | 'count'
  const [distribusiJamKerjaGenderFilter, setDistribusiJamKerjaGenderFilter] = useState('Laki-Laki + Perempuan'); // 'Laki-Laki + Perempuan' | 'Laki-laki' | 'Perempuan'
  const [setengahPengangguranStackMode, setSetengahPengangguranStackMode] = useState('percent'); // 'percent' | 'count'

  // -------------------------------------------------------------
  // STATE FILTER KHUSUS PILAR 05, 06, 07, 08
  // -------------------------------------------------------------
  const [precariousStackMode, setPrecariousStackMode] = useState('percent'); // 'percent' | 'count'
  const [femaleShareWilayahFilter, setFemaleShareWilayahFilter] = useState('Perkotaan'); // 'Perkotaan' | 'Pedesaan'
  const [jamsosStackMode, setJamsosStackMode] = useState('percent'); // 'percent' | 'count'
  const [serikatStackMode, setSerikatStackMode] = useState('percent'); // 'percent' | 'count'

  const isStatusGenderActive =
    isStatusPekerjaan &&
    (activeDimension === 'gender' ||
      activeDimension === 'Sheet1' ||
      activeTabMeta?.label?.toLowerCase().includes('gender'));

  const isStatusGenerasiActive =
    isStatusPekerjaan &&
    (activeDimension === 'generasi' ||
      activeDimension === 'Sheet2' ||
      activeTabMeta?.label?.toLowerCase().includes('generasi'));

  const isStatusWilayahActive =
    isStatusPekerjaan &&
    (activeDimension === 'wilayah' ||
      activeDimension === 'Sheet3' ||
      activeTabMeta?.label?.toLowerCase().includes('wilayah'));

  // -------------------------------------------------------------
  // STATE TOGGLE GARIS KATEGORI UMUM
  // -------------------------------------------------------------
  const [categoryLineToggles, setCategoryLineToggles] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  // -------------------------------------------------------------
  // MENENTUKAN SHEET DATA AKTIF
  // -------------------------------------------------------------
  const currentSheet = useMemo(() => {
    if (!activeTabMeta) return sheetsData?.[0] || null;

    if (isEpr) {
      if (activeDimension === 'gender') return sheetsData[0];
      if (activeDimension === 'wilayah') return sheetsData[1];
      if (activeDimension === 'umur') {
        if (ageCompareMode === 'wilayah' && sheetsData[3]) {
          return sheetsData[3];
        }
        return sheetsData[2] || sheetsData[0];
      }
    }

    if (isTpak) {
      if (activeDimension === 'gender') return sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
      if (activeDimension === 'wilayah') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'umur') {
        if (ageCompareMode === 'wilayah') {
          return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
        }
        if (ageCompareMode === 'gender') {
          return sheetsData.find((s) => s.sheet === 'Sheet5') || sheetsData[4];
        }
        return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      }
      if (activeDimension === 'pendidikan') return sheetsData.find((s) => s.sheet === 'Sheet6') || sheetsData[5];
    }

    if (isStatusPekerjaan) {
      if (activeDimension === 'gender') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'generasi') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'wilayah') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isPekerjaKeluarga) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      if (activeDimension === 'pendidikan' || activeDimension === 'Sheet4') return sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
    }

    if (isWageNonAgri) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet4') return sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
      if (activeDimension === 'pendidikan' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isUpahRendah) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'pendidikan' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isRerataPendapatan) {
      if (activeDimension === 'non_pertanian' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'pertanian' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'gender' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet4') return sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet5') return sheetsData.find((s) => s.sheet === 'Sheet5') || sheetsData[4];
      if (activeDimension === 'pendidikan' || activeDimension === 'Sheet6') return sheetsData.find((s) => s.sheet === 'Sheet6') || sheetsData[5];
      if (activeDimension === 'sektor' || activeDimension === 'Sheet7') return sheetsData.find((s) => s.sheet === 'Sheet7') || sheetsData[6];
    }

    if (isRerataBuruh) {
      if (activeDimension === 'pekerjaan' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'gender' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isJamLebih) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isRataJamMinggu) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
      if (activeDimension === 'distribusi' || activeDimension === 'Sheet4') return sheetsData.find((s) => s.sheet === 'Sheet4') || sheetsData[3];
    }

    if (isRataJamTahun) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
      if (activeDimension === 'generasi' || activeDimension === 'Sheet3') return sheetsData.find((s) => s.sheet === 'Sheet3') || sheetsData[2];
    }

    if (isSetengahPengangguran) {
      return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
    }

    if (isPrecarious) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
    }

    if (isFemaleShare) {
      if (activeDimension === 'jabatan' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
    }

    if (isJamsos) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
    }

    if (isSerikat) {
      if (activeDimension === 'gender' || activeDimension === 'Sheet1') return sheetsData.find((s) => s.sheet === 'Sheet1') || sheetsData[0];
      if (activeDimension === 'wilayah' || activeDimension === 'Sheet2') return sheetsData.find((s) => s.sheet === 'Sheet2') || sheetsData[1];
    }

    return activeTabMeta.sheet || sheetsData?.[0] || null;
  }, [
    isEpr,
    isTpak,
    isStatusPekerjaan,
    isPekerjaKeluarga,
    isWageNonAgri,
    isUpahRendah,
    isRerataPendapatan,
    isRerataBuruh,
    isJamLebih,
    isRataJamMinggu,
    isRataJamTahun,
    isSetengahPengangguran,
    isPrecarious,
    isFemaleShare,
    isJamsos,
    isSerikat,
    activeDimension,
    ageCompareMode,
    activeTabMeta,
    sheetsData
  ]);

  // Tentukan kolom kategori dan metrik secara presisi
  const categoryCol = useMemo(() => {
    if (
      (isInformal ||
        isTpak ||
        isStatusPekerjaan ||
        isPekerjaKeluarga ||
        isWageNonAgri ||
        isUpahRendah ||
        isRerataPendapatan ||
        isRerataBuruh ||
        isJamLebih ||
        isRataJamMinggu ||
        isRataJamTahun ||
        isSetengahPengangguran ||
        isPrecarious ||
        isFemaleShare ||
        isJamsos ||
        isSerikat) &&
      activeTabMeta?.categoryColName
    ) {
      return activeTabMeta.categoryColName;
    }
    return currentSheet?.category_col || currentSheet?.headers?.[1] || 'Kategori';
  }, [
    isInformal,
    isTpak,
    isStatusPekerjaan,
    isPekerjaKeluarga,
    isWageNonAgri,
    isUpahRendah,
    isRerataPendapatan,
    isRerataBuruh,
    isJamLebih,
    isRataJamMinggu,
    isRataJamTahun,
    isSetengahPengangguran,
    isPrecarious,
    isFemaleShare,
    isJamsos,
    isSerikat,
    activeTabMeta,
    currentSheet
  ]);

  const metricCol =
    currentSheet?.metric_col || currentSheet?.headers?.[currentSheet.headers.length - 1] || 'Nilai';

  // Daftar tahun yang tersedia untuk sheet aktif
  const sheetYears = useMemo(() => {
    const yrSet = new Set();
    currentSheet?.data?.forEach((r) => {
      const y = Number(r['Tahun'] || r['Thn']);
      if (y) yrSet.add(y);
    });
    const list = Array.from(yrSet).sort((a, b) => b - a);
    return list.length > 0 ? list : [2025, 2024, 2023, 2022, 2021, 2020];
  }, [currentSheet]);

  // Pastikan pieSelectedYear dan statusStackedYear selalu sinkron dan valid
  useEffect(() => {
    if (sheetYears.length > 0 && !sheetYears.includes(pieSelectedYear)) {
      setPieSelectedYear(sheetYears[0]);
    }
  }, [sheetYears, pieSelectedYear]);

  useEffect(() => {
    if (sheetYears.length > 0 && !sheetYears.includes(statusStackedYear)) {
      setStatusStackedYear(sheetYears[0]);
    }
  }, [sheetYears, statusStackedYear]);

  // -------------------------------------------------------------
  // COLOR & STYLE MAPPING UNTUK GARIS LINE CHART & PIE CHART
  // -------------------------------------------------------------
  const getLineProps = (lineName, idx = 0) => {
    const raw = String(lineName || '').trim();
    const clean = raw.toLowerCase();

    // Sorotan Khusus: Tanjung Jabung Barat
    if (clean.includes('tanjung jabung barat')) {
      return {
        stroke: '#2563eb', // Vibrant Blue
        strokeWidth: 3.5,
        isHighlight: true
      };
    }

    // Khusus Pekerja Berusaha Sendiri & Pekerja Keluarga (01_7)
    if (isPekerjaKeluarga) {
      if (
        clean.includes('laki-laki perempuan') ||
        clean.includes('laki-laki dan perempuan') ||
        clean.includes('laki-laki+perempuan') ||
        clean.includes('laki-laki + perempuan') ||
        (clean.includes('laki') && clean.includes('perempuan')) ||
        clean === 'total'
      ) {
        return { stroke: '#0f172a', strokeWidth: 3 }; // Hitam pekat
      }
      if (clean === 'laki-laki' || (clean.includes('laki') && !clean.includes('perempuan'))) {
        return { stroke: '#00ced1', strokeWidth: 2.5 }; // Turquoise Blue
      }
      if (clean === 'perempuan') {
        return { stroke: '#fa8072', strokeWidth: 2.5 }; // Salmon
      }
      if (clean === 'perkotaan' || clean.includes('perkotaan')) {
        return { stroke: '#4f46e5', strokeWidth: 2.5 }; // Indigo
      }
      if (clean === 'pedesaan' || clean.includes('pedesaan') || clean.includes('perdesaan')) {
        return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
      }
      if (clean.includes('gen z')) return { stroke: '#06b6d4', strokeWidth: 2.5 }; // Cyan
      if (clean.includes('milenial')) return { stroke: '#3b82f6', strokeWidth: 2.5 }; // Blue
      if (clean.includes('gen x')) return { stroke: '#8b5cf6', strokeWidth: 2.5 }; // Purple
      if (clean.includes('boomer')) return { stroke: '#f59e0b', strokeWidth: 2.5 }; // Amber
      if (clean.includes('sd')) return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
      if (clean.includes('smp')) return { stroke: '#06b6d4', strokeWidth: 2.5 }; // Cyan
      if (clean.includes('sma') || clean.includes('smk')) return { stroke: '#3b82f6', strokeWidth: 2.5 }; // Blue
      if (clean.includes('tinggi') || clean.includes('perguruan')) return { stroke: '#8b5cf6', strokeWidth: 2.5 }; // Purple
    }

    // Khusus Share Pekerja Penerima Upah Non-Pertanian (01_8)
    if (isWageNonAgri) {
      if (
        clean.includes('laki-laki dan perempuan') ||
        clean.includes('laki-laki perempuan') ||
        clean.includes('laki-laki+perempuan') ||
        clean.includes('laki-laki + perempuan') ||
        (clean.includes('laki') && clean.includes('perempuan')) ||
        clean === 'total'
      ) {
        return { stroke: '#1e293b', strokeWidth: 3, strokeDasharray: '4 4' }; // Hitam/Slate dash
      }
      if (clean === 'laki-laki' || (clean.includes('laki') && !clean.includes('perempuan'))) {
        return { stroke: '#0284c7', strokeWidth: 2.5 }; // Sky Blue
      }
      if (clean === 'perempuan') {
        return { stroke: '#ec4899', strokeWidth: 2.5 }; // Pink
      }
      if (clean === 'perkotaan' || clean.includes('perkotaan')) {
        return { stroke: '#4f46e5', strokeWidth: 2.5 }; // Indigo
      }
      if (clean === 'pedesaan' || clean.includes('pedesaan') || clean.includes('perdesaan')) {
        return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
      }
      if (clean.includes('gen z')) return { stroke: '#06b6d4', strokeWidth: 2.5 }; // Cyan
      if (clean.includes('milenial')) return { stroke: '#3b82f6', strokeWidth: 2.5 }; // Blue
      if (clean.includes('gen x')) return { stroke: '#8b5cf6', strokeWidth: 2.5 }; // Purple
      if (clean.includes('boomer')) return { stroke: '#f59e0b', strokeWidth: 2.5 }; // Amber
      if (clean.includes('sd')) return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
      if (clean.includes('smp')) return { stroke: '#06b6d4', strokeWidth: 2.5 }; // Cyan
      if (clean.includes('sma') || clean.includes('smk')) return { stroke: '#3b82f6', strokeWidth: 2.5 }; // Blue
      if (clean.includes('tinggi') || clean.includes('perguruan')) return { stroke: '#8b5cf6', strokeWidth: 2.5 }; // Purple
    }

    // Gender styling
    if (
      clean.includes('laki-laki dan perempuan') ||
      clean === 'total' ||
      clean.includes('laki-laki+perempuan')
    ) {
      return {
        stroke: '#1e293b', // Slate Dark
        strokeWidth: 3,
        strokeDasharray: '4 4'
      };
    }
    if (clean === 'laki-laki' || clean.includes('laki')) {
      return { stroke: '#0891b2', strokeWidth: 2.5 }; // Cyan
    }
    if (clean === 'perempuan') {
      return { stroke: '#ec4899', strokeWidth: 2.5 }; // Pink
    }

    // Wilayah styling
    if (clean === 'perkotaan' || clean.includes('perkotaan')) {
      return { stroke: '#059669', strokeWidth: 2.5 }; // Emerald
    }
    if (clean === 'pedesaan' || clean.includes('pedesaan') || clean.includes('perdesaan')) {
      return { stroke: '#d97706', strokeWidth: 2.5 }; // Amber
    }

    // Tingkat Pendidikan styling (TPT Tab 3)
    if (clean.includes('<= smp') || clean.includes('smp')) {
      return { stroke: '#059669', strokeWidth: 3 }; // Emerald
    }
    if (clean.includes('>= sma') || clean.includes('sma')) {
      return { stroke: '#8b5cf6', strokeWidth: 3 }; // Purple
    }

    // Sektor styling
    if (clean.includes('primer')) return { stroke: '#10b981', strokeWidth: 3 };
    if (clean.includes('sekunder')) return { stroke: '#f59e0b', strokeWidth: 3 };
    if (clean.includes('tersier')) return { stroke: '#3b82f6', strokeWidth: 3 };

    // Generasi styling
    if (clean.includes('gen z')) return { stroke: '#06b6d4', strokeWidth: 3 };
    if (clean.includes('milenial')) return { stroke: '#3b82f6', strokeWidth: 3 };
    if (clean.includes('gen x')) return { stroke: '#8b5cf6', strokeWidth: 3 };
    if (clean.includes('boomer')) return { stroke: '#f97316', strokeWidth: 3 };

    // Status dalam Pekerjaan styling (01_6)
    if (clean.includes('berusaha sendiri')) return { stroke: '#6366f1', strokeWidth: 2.5 }; // Indigo
    if (clean.includes('tidak tetap') || clean.includes('tidak dibayar')) return { stroke: '#06b6d4', strokeWidth: 2.5 }; // Cyan
    if (clean.includes('buruh tetap') || clean.includes('buruh dibayar')) return { stroke: '#f97316', strokeWidth: 2.5 }; // Orange
    if (clean.includes('buruh/karyawan') || clean.includes('pegawai')) return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
    if (clean.includes('pekerja bebas')) return { stroke: '#eab308', strokeWidth: 2.5 }; // Yellow
    if (clean.includes('pekerja keluarga')) return { stroke: '#ec4899', strokeWidth: 2.5 }; // Pink

    // Jam Kerja styling (03_2 Distribusi Jam Kerja)
    if (clean.includes('0 - 34') || clean.includes('0-34') || clean.includes('< 35') || clean.includes('<35')) {
      return { stroke: '#f59e0b', strokeWidth: 2.5 }; // Amber
    }
    if (clean.includes('35-47') || clean.includes('35 - 47')) {
      return { stroke: '#10b981', strokeWidth: 2.5 }; // Emerald
    }
    if (clean.includes('48+') || clean.includes('48 +') || clean.includes('>48') || clean.includes('> 48')) {
      return { stroke: '#ef4444', strokeWidth: 2.5 }; // Red/Rose
    }

    // Palette variatif untuk 11 Kabupaten/Kota & Kategori Lainnya
    const palette = [
      '#6366f1', // Indigo
      '#06b6d4', // Cyan
      '#f97316', // Orange
      '#84cc16', // Lime
      '#ec4899', // Pink
      '#14b8a6', // Teal
      '#eab308', // Yellow
      '#f43f5e', // Rose
      '#a855f7', // Violet
      '#64748b', // Slate
      '#0284c7' // Sky
    ];
    return {
      stroke: palette[idx % palette.length],
      strokeWidth: 2
    };
  };

  // -------------------------------------------------------------
  // DATA LINE CHART ANTARWAKTU UMUM / GENDER / WILAYAH / KABUPATEN
  // Sumbu X: Tahun • Garis-garis: Kategori dari categoryCol
  // -------------------------------------------------------------
  const trendLineData = useMemo(() => {
    if (!currentSheet || !currentSheet.data || ((isEpr || isTpak) && activeDimension === 'umur')) return [];
    // Jangan buat line chart jika sedang di tab Pie Chart (Sektor / Generasi di Sektor Informal atau Pendidikan di TPAK)
    if (isInformal && (activeDimension === 'sektor' || activeDimension === 'generasi')) return [];
    if (isTpak && activeDimension === 'pendidikan') return [];

    const byYear = {};
    currentSheet.data.forEach((r) => {
      // KHUSUS SEKTOR INFORMAL: HANYA ambil baris Status === 'Informal' (tidak memasukkan formal)
      if (isInformal) {
        const st = String(r['Status'] || '').trim().toLowerCase();
        if (st !== 'informal') return;
      }

      // KHUSUS STATUS DALAM PEKERJAAN (01_6) TAB GENDER: Filter sesuai statusGenderFilter
      if (isStatusGenderActive) {
        const rowGen = String(r['Jenis Kelamin'] || '').trim().toLowerCase();
        if (rowGen !== statusGenderFilter.trim().toLowerCase()) return;
      }

      // KHUSUS STATUS DALAM PEKERJAAN (01_6) TAB GENERASI: Filter sesuai statusGenerasiFilter
      if (isStatusGenerasiActive) {
        const rowGen = String(r['Generasi'] || '').trim().toLowerCase();
        if (!rowGen.includes(statusGenerasiFilter.trim().toLowerCase()) &&
            rowGen !== statusGenerasiFilter.trim().toLowerCase()) return;
      }

      // KHUSUS STATUS DALAM PEKERJAAN (01_6) TAB WILAYAH: Filter sesuai statusWilayahFilter
      if (isStatusWilayahActive) {
        const rowWil = String(r['Wilayah'] || '').trim().toLowerCase();
        if (rowWil !== statusWilayahFilter.trim().toLowerCase()) return;
      }

      // KHUSUS RERATA UPAH BURUH (02_3) TAB WILAYAH: Filter 'Perkotaan' atau 'Pedesaan'
      if (isRerataBuruh && activeDimension === 'wilayah') {
        const rowJenis = String(r['Jenis'] || '').trim().toLowerCase();
        const target = rerataBuruhWilayahFilter.trim().toLowerCase();
        const isMatch = (target.includes('des') || target.includes('pedesaan') || target.includes('perdesaan'))
          ? (rowJenis.includes('des') || rowJenis.includes('pedesaan') || rowJenis.includes('perdesaan'))
          : rowJenis === target;
        if (!isMatch) return;
      }

      // KHUSUS RERATA UPAH BURUH (02_3) TAB GENDER: Filter 'Laki-laki' atau 'Perempuan'
      if (isRerataBuruh && activeDimension === 'gender') {
        const rowJenis = String(r['Jenis'] || '').trim().toLowerCase();
        if (rowJenis !== rerataBuruhGenderFilter.trim().toLowerCase()) return;
      }

      // KHUSUS RATA-RATA JAM KERJA (03_2) TAB DISTRIBUSI JAM KERJA: Filter sesuai distribusiJamKerjaGenderFilter
      if (isRataJamMinggu && (activeDimension === 'distribusi' || activeDimension === 'Sheet4')) {
        const rowGen = String(r['Jenis Kelamin'] || '').trim().toLowerCase();
        const target = distribusiJamKerjaGenderFilter.trim().toLowerCase();
        if (target.includes('+') || target.includes('dan') || (target.includes('laki') && target.includes('perempuan'))) {
          const isTot = (rowGen.includes('laki') && rowGen.includes('perempuan')) || rowGen.includes('+') || rowGen.includes('dan') || rowGen === 'total';
          if (!isTot) return;
        } else if (target === 'laki-laki' || target.includes('laki')) {
          const isLakiOnly = rowGen.includes('laki') && !(rowGen.includes('perempuan') || rowGen.includes('+') || rowGen.includes('dan'));
          if (!isLakiOnly) return;
        } else if (target === 'perempuan' || target.includes('perempuan')) {
          const isPerempuanOnly = rowGen.includes('perempuan') && !(rowGen.includes('laki') || rowGen.includes('+') || rowGen.includes('dan'));
          if (!isPerempuanOnly) return;
        }
      }

      // KHUSUS PROPORSI PEKERJA PEREMPUAN (06_1) TAB WILAYAH: Filter sesuai femaleShareWilayahFilter
      if (isFemaleShare && (activeDimension === 'wilayah' || activeDimension === 'Sheet2')) {
        const rowWil = String(r['Wilayah'] || '').trim().toLowerCase();
        const target = femaleShareWilayahFilter.trim().toLowerCase();
        const isMatch = (target.includes('des') || target.includes('pedesaan') || target.includes('perdesaan'))
          ? (rowWil.includes('des') || rowWil.includes('pedesaan') || rowWil.includes('perdesaan'))
          : rowWil === target;
        if (!isMatch) return;
      }

      const yr = Number(r['Tahun'] || r['Thn'] || r['Year']);
      let cat = String(r[categoryCol] || 'Total').trim();
      let val = Number(r[metricCol]);

      // Normalisasi skala persen untuk TPAK jika tersimpan dalam desimal (contoh: Sheet4 Gender)
      if (isTpak && val <= 1 && val > 0) {
        val = Number((val * 100).toFixed(2));
      }

      // Normalisasi nama status pekerjaan (misal '6 Pekerja Bebas' -> '6 Pekerja bebas')
      if (isStatusPekerjaan) {
        cat = cat.replace(/6 Pekerja [Bb]ebas/i, '6 Pekerja bebas');
      }

      if (yr && !isNaN(val)) {
        if (!byYear[yr]) byYear[yr] = { tahun: yr };
        const cleanCat = cat.replace(/[+&]/g, ' ').replace(/\s+/g, ' ').trim();
        byYear[yr][cleanCat] = Number(val.toFixed(2));
      }
    });

    return Object.values(byYear).sort((a, b) => a.tahun - b.tahun);
  }, [
    currentSheet,
    categoryCol,
    metricCol,
    isEpr,
    isTpak,
    isInformal,
    isStatusGenderActive,
    isStatusGenerasiActive,
    isStatusWilayahActive,
    isStatusPekerjaan,
    isPekerjaKeluarga,
    isWageNonAgri,
    isRerataBuruh,
    isRataJamMinggu,
    statusGenderFilter,
    statusGenerasiFilter,
    statusWilayahFilter,
    rerataBuruhWilayahFilter,
    rerataBuruhGenderFilter,
    distribusiJamKerjaGenderFilter,
    isFemaleShare,
    femaleShareWilayahFilter,
    activeDimension
  ]);

  const trendCategories = useMemo(() => {
    if (trendLineData.length === 0) return [];
    const keys = new Set();
    trendLineData.forEach((row) => {
      Object.keys(row).forEach((k) => {
        if (k !== 'tahun') keys.add(k);
      });
    });
    return Array.from(keys);
  }, [trendLineData]);

  // -------------------------------------------------------------
  // DATA KHUSUS SEKTOR INFORMAL: PIE CHART (SEKTOR & GENERASI)
  // -------------------------------------------------------------
  const informalPieData = useMemo(() => {
    if (!isInformal || (activeDimension !== 'sektor' && activeDimension !== 'generasi')) {
      return [];
    }
    if (!currentSheet || !currentSheet.data) return [];

    // Filter HANYA status Informal dan tahun yang dipilih
    const yearRows = currentSheet.data.filter(
      (r) =>
        Number(r['Tahun'] || r['Thn']) === Number(pieSelectedYear) &&
        String(r['Status'] || '').trim().toLowerCase() === 'informal'
    );

    // Hitung total pekerja informal untuk tahun ini
    const totalInformalCount = yearRows.reduce((acc, r) => {
      const c = Number(r['Jumlah Pekerja'] || r['Jumlah'] || r['Jumlah Pekerja Informal'] || 0);
      return acc + (isNaN(c) ? 0 : c);
    }, 0);

    return yearRows.map((r, idx) => {
      const rawName = String(r[categoryCol] || `Kategori ${idx + 1}`).trim();
      const cleanName = rawName.replace(/^\d+\s*/, '');
      const proporsiIndikator = Number(r[metricCol] || r['proporsi'] || 0);
      const count = Number(r['Jumlah Pekerja'] || r['Jumlah'] || r['Jumlah Pekerja Informal'] || 0);
      const se = r['SE Proporsi'] || r['SE'] || null;
      const rse = r['RSE'] || null;

      let color = '#3b82f6';
      if (activeDimension === 'sektor') {
        if (rawName.includes('Primer')) color = '#10b981'; // Emerald
        else if (rawName.includes('Sekunder')) color = '#f59e0b'; // Amber
        else if (rawName.includes('Tersier')) color = '#3b82f6'; // Blue
      } else {
        if (rawName.includes('Gen Z')) color = '#06b6d4'; // Cyan
        else if (rawName.includes('Milenial')) color = '#3b82f6'; // Blue
        else if (rawName.includes('Gen X')) color = '#8b5cf6'; // Purple
        else color = '#f97316'; // Orange (Boomer)
      }

      // Cari baris pekerja formal untuk kategori dan tahun yang sama
      const formalRow = currentSheet.data.find(
        (fr) =>
          Number(fr['Tahun'] || fr['Thn']) === Number(pieSelectedYear) &&
          String(fr[categoryCol] || '').trim().toLowerCase() === rawName.toLowerCase() &&
          String(fr['Status'] || '').trim().toLowerCase() === 'formal'
      );
      const formalCount = Number(
        formalRow?.['Jumlah Pekerja'] || formalRow?.['Jumlah'] || formalRow?.['Jumlah Pekerja Formal'] || 0
      );
      const formalProporsi = Number(formalRow?.[metricCol] || formalRow?.['proporsi'] || 0);
      const totalCategoryWorkers = count + formalCount;

      // Hitung persentase komposisi terhadap seluruh pekerja informal pada tahun tersebut (100% total pie)
      const komposisiPct =
        totalInformalCount > 0
          ? Number(((count / totalInformalCount) * 100).toFixed(2))
          : 0;

      return {
        fullName: rawName,
        name: cleanName,
        value: komposisiPct, // Slice pie chart: komposisi pekerja informal antar sektor/generasi (total 100%)
        komposisiPct,
        proporsiIndikator, // Prevalensi informal dalam kategori
        count,
        formalCount,
        formalProporsi,
        totalCategoryWorkers,
        totalInformalCount,
        se,
        rse,
        color
      };
    });
  }, [isInformal, activeDimension, currentSheet, pieSelectedYear, categoryCol, metricCol]);

  // -------------------------------------------------------------
  // DATA KHUSUS TPAK: STACKED BAR CHART (PENDIDIKAN DARI SHEET6)
  // Menampilkan komposisi pendidikan (SD, SMP, SMA, PT) dalam satu grafik
  // batang bertumpuk (Stacked Bar 100%) antarwaktu (2020 - 2025)
  // -------------------------------------------------------------
  const tpakEducationStackedData = useMemo(() => {
    if (!isTpak || activeDimension !== 'pendidikan') {
      return [];
    }
    const s6 = sheetsData?.find((s) => s.sheet === 'Sheet6') || sheetsData?.[5];
    if (!s6 || !s6.data) return [];

    const yearsSet = new Set();
    s6.data.forEach((r) => {
      const y = Number(r['Tahun'] || r['Thn']);
      if (y) yearsSet.add(y);
    });
    const sortedYears = Array.from(yearsSet).sort((a, b) => a - b);

    return sortedYears.map((year) => {
      const yearRows = s6.data.filter(
        (r) =>
          Number(r['Tahun'] || r['Thn']) === year &&
          String(r['Jenis Kelamin'] || '').trim().toLowerCase() === tpakEduGender.toLowerCase()
      );

      const totalCount = yearRows.reduce((acc, r) => {
        const c = Number(r['Jumlah'] || 0);
        return acc + (isNaN(c) ? 0 : c);
      }, 0);

      const rowObj = {
        tahun: `Tahun ${year}`,
        yearNum: year,
        totalCount
      };

      yearRows.forEach((r) => {
        const rawName = String(r['Pendidikan'] || '').trim();
        const cleanName = rawName.replace(/^\d+\s*/, '');
        const proporsi = Number(r['Proporsi'] || 0);
        const count = Number(r['Jumlah'] || 0);
        const se = r['SE'] !== undefined ? r['SE'] : null;

        rowObj[cleanName] = proporsi;
        rowObj[`${cleanName}_count`] = count;
        rowObj[`${cleanName}_se`] = se;
      });

      return rowObj;
    });
  }, [isTpak, activeDimension, sheetsData, tpakEduGender]);

  // -------------------------------------------------------------
  // DATA KHUSUS STATUS PEKERJAAN (01_6) TAB GENDER:
  // GRAFIK KEDUA: STACKED BAR CHART 100% KOMPOSISI GENDER PER STATUS
  // -------------------------------------------------------------
  const statusGenderStackedData = useMemo(() => {
    if (!isStatusGenderActive || !currentSheet || !currentSheet.data) return [];

    const sheetRows = currentSheet.data.filter(
      (r) => Number(r['Tahun'] || r['Thn']) === Number(statusStackedYear)
    );

    const statusOrder = [
      '1 Berusaha sendiri',
      '2 Berusaha dibantu buruh tidak tetap/pekerja keluarga/tidak dibayar',
      '3 Berusaha dibantu buruh tetap/dibayar',
      '4 Buruh/karyawan/pegawai',
      '6 Pekerja bebas',
      '7 Pekerja keluarga/tidak dibayar'
    ];

    const getNormalizedStatus = (raw) => {
      const s = String(raw || '').replace(/\s+/g, ' ').trim();
      if (/6 Pekerja [Bb]ebas/i.test(s)) return '6 Pekerja bebas';
      return s;
    };

    const detectedStatuses = Array.from(
      new Set(sheetRows.map((r) => getNormalizedStatus(r['Status dalam Pekerjaan'])))
    );

    const orderedStatuses = statusOrder.filter((s) =>
      detectedStatuses.some((ds) => ds.toLowerCase() === s.toLowerCase())
    );
    const finalStatuses = orderedStatuses.length > 0 ? orderedStatuses : detectedStatuses;

    return finalStatuses.map((st) => {
      const rowsForStatus = sheetRows.filter(
        (r) => getNormalizedStatus(r['Status dalam Pekerjaan']).toLowerCase() === st.toLowerCase()
      );

      const totRow = rowsForStatus.find((r) =>
        String(r['Jenis Kelamin'] || '').trim().toLowerCase() === 'laki-laki dan perempuan'
      );
      const maleRow = rowsForStatus.find((r) =>
        String(r['Jenis Kelamin'] || '').trim().toLowerCase() === 'laki-laki'
      );
      const femaleRow = rowsForStatus.find((r) =>
        String(r['Jenis Kelamin'] || '').trim().toLowerCase() === 'perempuan'
      );

      const maleCount = Number(maleRow?.['Jumlah'] || 0);
      const femaleCount = Number(femaleRow?.['Jumlah'] || 0);
      const totalCount = Number(totRow?.['Jumlah'] || (maleCount + femaleCount) || 0);

      const malePct = totalCount > 0 ? Number(((maleCount / totalCount) * 100).toFixed(2)) : 0;
      const femalePct = totalCount > 0 ? Number(((femaleCount / totalCount) * 100).toFixed(2)) : 0;

      let shortName = st;
      if (st.includes('1 Berusaha sendiri')) shortName = 'Berusaha Sendiri';
      else if (st.includes('2 Berusaha dibantu buruh tidak tetap')) shortName = 'Buruh Tdk Tetap';
      else if (st.includes('3 Berusaha dibantu buruh tetap')) shortName = 'Buruh Tetap';
      else if (st.includes('4 Buruh/karyawan')) shortName = 'Buruh/Karyawan';
      else if (st.includes('6 Pekerja bebas')) shortName = 'Pekerja Bebas';
      else if (st.includes('7 Pekerja keluarga')) shortName = 'Pekerja Keluarga';

      return {
        rawStatus: st,
        shortName,
        totalCount,
        'Laki-Laki': malePct,
        'Perempuan': femalePct,
        maleCount,
        femaleCount,
        malePct,
        femalePct,
        totProporsi: Number(totRow?.['proporsi'] || 0),
        maleProporsi: Number(maleRow?.['proporsi'] || 0),
        femaleProporsi: Number(femaleRow?.['proporsi'] || 0),
        se: totRow?.['SE Proporsi'] || null
      };
    });
  }, [isStatusGenderActive, currentSheet, statusStackedYear]);

  // -------------------------------------------------------------
  // DATA KHUSUS STATUS PEKERJAAN (01_6) TAB GENERASI:
  // GRAFIK KEDUA: STACKED BAR CHART 100% KOMPOSISI GENERASI PER STATUS
  // -------------------------------------------------------------
  const statusGenerasiStackedData = useMemo(() => {
    if (!isStatusGenerasiActive || !currentSheet || !currentSheet.data) return [];

    const sheetRows = currentSheet.data.filter(
      (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === Number(statusStackedYear)
    );

    const statusOrder = [
      '01 Berusaha sendiri',
      '02/03 Berusaha dibantu buruh tidak dibayar/buruh dibayar',
      '04 Buruh/Karyawan/Pegawai',
      '05/06 Pekerja Bebas',
      '07 Pekerja Keluarga/Tidak dibayar'
    ];

    const getNormalizedStatus = (raw) => {
      return String(raw || '').replace(/\s+/g, ' ').trim();
    };

    const detectedStatuses = Array.from(
      new Set(sheetRows.map((r) => getNormalizedStatus(r['Status dalam Pekerjaan'])))
    );

    const orderedStatuses = statusOrder.filter((s) =>
      detectedStatuses.some((ds) => ds.toLowerCase() === s.toLowerCase())
    );
    const finalStatuses = orderedStatuses.length > 0 ? orderedStatuses : detectedStatuses;

    return finalStatuses.map((st) => {
      const rowsForStatus = sheetRows.filter(
        (r) => getNormalizedStatus(r['Status dalam Pekerjaan']).toLowerCase() === st.toLowerCase()
      );

      const genZRow = rowsForStatus.find((r) =>
        String(r['Generasi'] || '').toLowerCase().includes('gen z')
      );
      const milenialRow = rowsForStatus.find((r) =>
        String(r['Generasi'] || '').toLowerCase().includes('milenial')
      );
      const genXRow = rowsForStatus.find((r) =>
        String(r['Generasi'] || '').toLowerCase().includes('gen x')
      );
      const boomerRow = rowsForStatus.find((r) =>
        String(r['Generasi'] || '').toLowerCase().includes('boomer')
      );

      const genZCount = Number(genZRow?.['Jumlah Pekerja'] || genZRow?.['Jumlah'] || 0);
      const milenialCount = Number(milenialRow?.['Jumlah Pekerja'] || milenialRow?.['Jumlah'] || 0);
      const genXCount = Number(genXRow?.['Jumlah Pekerja'] || genXRow?.['Jumlah'] || 0);
      const boomerCount = Number(boomerRow?.['Jumlah Pekerja'] || boomerRow?.['Jumlah'] || 0);
      const totalCount = genZCount + milenialCount + genXCount + boomerCount;

      const genZPct = totalCount > 0 ? Number(((genZCount / totalCount) * 100).toFixed(2)) : 0;
      const milenialPct = totalCount > 0 ? Number(((milenialCount / totalCount) * 100).toFixed(2)) : 0;
      const genXPct = totalCount > 0 ? Number(((genXCount / totalCount) * 100).toFixed(2)) : 0;
      const boomerPct = totalCount > 0 ? Number(((boomerCount / totalCount) * 100).toFixed(2)) : 0;

      let shortName = st;
      if (st.includes('01 Berusaha sendiri')) shortName = 'Berusaha Sendiri';
      else if (st.includes('02/03 Berusaha dibantu')) shortName = 'Buruh Tdk Dibayar/Dibayar';
      else if (st.includes('04 Buruh/Karyawan')) shortName = 'Buruh/Karyawan';
      else if (st.includes('05/06 Pekerja Bebas')) shortName = 'Pekerja Bebas';
      else if (st.includes('07 Pekerja Keluarga')) shortName = 'Pekerja Keluarga';

      return {
        rawStatus: st,
        shortName,
        totalCount,
        '01 Gen Z': genZPct,
        '02 Milenial': milenialPct,
        '03 Gen X': genXPct,
        '04 Boomer + Pre Boomer': boomerPct,
        genZCount,
        milenialCount,
        genXCount,
        boomerCount,
        genZPct,
        milenialPct,
        genXPct,
        boomerPct,
        genZProporsi: Number(genZRow?.['proporsi'] || 0),
        milenialProporsi: Number(milenialRow?.['proporsi'] || 0),
        genXProporsi: Number(genXRow?.['proporsi'] || 0),
        boomerProporsi: Number(boomerRow?.['proporsi'] || 0)
      };
    });
  }, [isStatusGenerasiActive, currentSheet, statusStackedYear]);

  // -------------------------------------------------------------
  // DATA KHUSUS STATUS PEKERJAAN (01_6) TAB WILAYAH:
  // GRAFIK KEDUA: STACKED BAR CHART 100% KOMPOSISI WILAYAH PER STATUS
  // -------------------------------------------------------------
  const statusWilayahStackedData = useMemo(() => {
    if (!isStatusWilayahActive || !currentSheet || !currentSheet.data) return [];

    const sheetRows = currentSheet.data.filter(
      (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === Number(statusStackedYear)
    );

    const statusOrder = [
      '1 Berusaha sendiri',
      '2 Berusaha dibantu buruh tidak tetap/pekerja keluarga/tidak dibayar',
      '3 Berusaha dibantu buruh tetap/dibayar',
      '4 Buruh/karyawan/pegawai',
      '6 Pekerja bebas',
      '7 Pekerja keluarga/tidak dibayar'
    ];

    const getNormalizedStatus = (raw) => {
      const s = String(raw || '').replace(/\s+/g, ' ').trim();
      if (/6 Pekerja [Bb]ebas/i.test(s)) return '6 Pekerja bebas';
      return s;
    };

    const detectedStatuses = Array.from(
      new Set(sheetRows.map((r) => getNormalizedStatus(r['Status dalam Pekerjaan'])))
    );

    const orderedStatuses = statusOrder.filter((s) =>
      detectedStatuses.some((ds) => ds.toLowerCase() === s.toLowerCase())
    );
    const finalStatuses = orderedStatuses.length > 0 ? orderedStatuses : detectedStatuses;

    return finalStatuses.map((st) => {
      const rowsForStatus = sheetRows.filter(
        (r) => getNormalizedStatus(r['Status dalam Pekerjaan']).toLowerCase() === st.toLowerCase()
      );

      const perkotaanRow = rowsForStatus.find((r) =>
        String(r['Wilayah'] || '').trim().toLowerCase() === 'perkotaan'
      );
      const pedesaanRow = rowsForStatus.find((r) =>
        String(r['Wilayah'] || '').trim().toLowerCase() === 'pedesaan'
      );

      const perkotaanCount = Number(perkotaanRow?.['Jumlah'] || 0);
      const pedesaanCount = Number(pedesaanRow?.['Jumlah'] || 0);
      const totalCount = perkotaanCount + pedesaanCount;

      const perkotaanPct = totalCount > 0 ? Number(((perkotaanCount / totalCount) * 100).toFixed(2)) : 0;
      const pedesaanPct = totalCount > 0 ? Number(((pedesaanCount / totalCount) * 100).toFixed(2)) : 0;

      let shortName = st;
      if (st.includes('1 Berusaha sendiri')) shortName = 'Berusaha Sendiri';
      else if (st.includes('2 Berusaha dibantu buruh tidak tetap')) shortName = 'Buruh Tdk Tetap';
      else if (st.includes('3 Berusaha dibantu buruh tetap')) shortName = 'Buruh Tetap';
      else if (st.includes('4 Buruh/karyawan')) shortName = 'Buruh/Karyawan';
      else if (st.includes('6 Pekerja bebas')) shortName = 'Pekerja Bebas';
      else if (st.includes('7 Pekerja keluarga')) shortName = 'Pekerja Keluarga';

      return {
        rawStatus: st,
        shortName,
        totalCount,
        'Perkotaan': perkotaanPct,
        'Pedesaan': pedesaanPct,
        perkotaanCount,
        pedesaanCount,
        perkotaanPct,
        pedesaanPct,
        perkotaanProporsi: Number(perkotaanRow?.['proporsi'] || 0),
        pedesaanProporsi: Number(pedesaanRow?.['proporsi'] || 0),
        sePerkotaan: perkotaanRow?.['SE Proporsi'] || null,
        sePedesaan: pedesaanRow?.['SE Proporsi'] || null
      };
    });
  }, [isStatusWilayahActive, currentSheet, statusStackedYear]);

  // -------------------------------------------------------------
  // DATA KHUSUS PEKERJA BERUSAHA SENDIRI & KELUARGA (01_7):
  // STACKED BAR CHART KOMPOSISI PEKERJA KODE 1, 2, ATAU 7 ANTARWAKTU (SEMUA TAHUN)
  // -------------------------------------------------------------
  const pekerjaKeluargaStackedData = useMemo(() => {
    if (!isPekerjaKeluarga || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Ambil daftar kategori secara stabil sesuai urutan kemunculan di dataset
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan'))
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja Kode 1,2 atau 7'] || 0);
      } else {
        totalCount = yearRows.reduce(
          (sum, r) => sum + Number(r['Jumlah Pekerja Kode 1,2 atau 7'] || 0),
          0
        );
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja Kode 1,2 atau 7'] || 0);
        const prev = Number(r['Proporsi'] || r['proporsi'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi
      };

      catList.forEach((cat) => {
        rowObj[cat] = pekerjaKeluargaStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isPekerjaKeluarga, currentSheet, activeDimension, categoryCol, pekerjaKeluargaStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS SHARE PEKERJA PENERIMA UPAH NON-PERTANIAN (01_8):
  // STACKED BAR CHART KOMPOSISI PEKERJA PENERIMA UPAH NON-PERTANIAN ANTARWAKTU
  // -------------------------------------------------------------
  const wageNonAgriStackedData = useMemo(() => {
    if (!isWageNonAgri || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan')) ||
            gen === 'total'
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja Penerima Upah Non Pertanian'] || 0);
      } else {
        totalCount = yearRows.reduce(
          (sum, r) => sum + Number(r['Jumlah Pekerja Penerima Upah Non Pertanian'] || 0),
          0
        );
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const populasi = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja Penerima Upah Non Pertanian'] || 0);
        const pop = Number(r['Jumlah Pekerja Non Pertanian'] || 0);
        const prev = Number(
          r['Proporsi Pekerja Penerima Upah Non Pertanian'] ||
            r['Proporsi'] ||
            r['proporsi'] ||
            0
        );
        counts[rawCat] = count;
        populasi[rawCat] = pop;
        prevalensi[rawCat] = Number(prev.toFixed(2));
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _populasi: populasi
      };

      catList.forEach((cat) => {
        rowObj[cat] = wageNonAgriStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isWageNonAgri, currentSheet, activeDimension, categoryCol, wageNonAgriStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS PROPORSI PEKERJA UPAH RENDAH (02_1):
  // STACKED BAR CHART KOMPOSISI PEKERJA UPAH RENDAH ANTARWAKTU
  // -------------------------------------------------------------
  const upahRendahStackedData = useMemo(() => {
    if (!isUpahRendah || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan'))
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja Upah Rendah'] || 0);
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const populasiBuruh = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja Upah Rendah'] || 0);
        const prev = Number(r['Proporsi'] || 0);
        const pop = Number(r['Jumlah Buruh/karyawan/pegawai'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        populasiBuruh[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _populasiBuruh: populasiBuruh
      };

      catList.forEach((cat) => {
        rowObj[cat] = upahRendahStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isUpahRendah, currentSheet, activeDimension, categoryCol, upahRendahStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS PEKERJA DENGAN JAM KERJA LEBIH (03_1):
  // STACKED BAR CHART KOMPOSISI PEKERJA JAM LEBIH ANTARWAKTU
  // Mendukung dimensi: Gender, Wilayah, Generasi
  // -------------------------------------------------------------
  const jamLebihStackedData = useMemo(() => {
    if (!isJamLebih || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan'))
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja Jam lebih'] || 0);
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const totalPekerja = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja Jam lebih'] || 0);
        const prev = Number(r['Persentase pekerja dengan jam kerja lebih'] || r['Proporsi'] || 0);
        const pop = Number(r['Jumlah Pekerja'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        totalPekerja[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _totalPekerja: totalPekerja
      };

      catList.forEach((cat) => {
        rowObj[cat] = jamLebihStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isJamLebih, currentSheet, activeDimension, categoryCol, jamLebihStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS SETENGAH PENGANGGURAN (03_4):
  // STACKED BAR CHART KOMPOSISI JUMLAH SETENGAH PENGANGGURAN ANTARWAKTU
  // Mendukung dimensi: Gender
  // -------------------------------------------------------------
  const setengahPengangguranStackedData = useMemo(() => {
    if (!isSetengahPengangguran || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    // Daftar kategori secara stabil: Laki-laki vs Perempuan
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r['Jenis Kelamin'] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        lower.includes('+') ||
        lower.includes('dan') ||
        (lower.includes('laki') && lower.includes('perempuan')) ||
        lower === 'total'
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      const totRow = yearRows.find((r) => {
        const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
        return (
          gen.includes('+') ||
          gen.includes('dan') ||
          (gen.includes('laki') && gen.includes('perempuan'))
        );
      });
      let totalCount = Number(totRow?.['Jumlah Set Pengangguran'] || 0);

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const totalPekerja = {};

      yearRows.forEach((r) => {
        const rawCat = String(r['Jenis Kelamin'] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total'
        ) {
          return;
        }

        const count = Number(r['Jumlah Set Pengangguran'] || 0);
        const prev = Number(r['Tingkat Setengah Pengangguran'] || 0);
        const pop = Number(r['Jumlah Pekerja'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        totalPekerja[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _totalPekerja: totalPekerja
      };

      catList.forEach((cat) => {
        rowObj[cat] = setengahPengangguranStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isSetengahPengangguran, currentSheet, setengahPengangguranStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS PRECARIOUS WORKER (05_1):
  // STACKED BAR CHART KOMPOSISI PEKERJA PRECARIOUS ANTARWAKTU
  // Mendukung dimensi: Gender, Wilayah
  // -------------------------------------------------------------
  const precariousStackedData = useMemo(() => {
    if (!isPrecarious || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan')) ||
            gen === 'total'
          );
        });
        totalCount = Number(totRow?.['Jumlah Precarious Worker'] || 0);
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const totalPekerja = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Precarious Worker'] || 0);
        const prev = Number(r['Proporsi'] || 0);
        const pop = Number(r['Jumlah Pekerja'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        totalPekerja[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _totalPekerja: totalPekerja
      };

      catList.forEach((cat) => {
        rowObj[cat] = precariousStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isPrecarious, currentSheet, activeDimension, categoryCol, precariousStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS PENERIMA JAMINAN SOSIAL (07_1):
  // STACKED BAR CHART KOMPOSISI PENERIMA JAMSOS ANTARWAKTU
  // Mendukung dimensi: Gender, Wilayah
  // -------------------------------------------------------------
  const jamsosStackedData = useMemo(() => {
    if (!isJamsos || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan')) ||
            gen === 'total'
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja yang mendapatkan Jamsos'] || 0);
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const totalPekerja = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja yang mendapatkan Jamsos'] || 0);
        const prev = Number(
          r['Persentase Pekerja yang mendapat Jamsos'] ||
          r['Persentase Pekerja yang mendapat Jamsos2'] ||
          0
        );
        const pop = Number(r['Jumlah Buruh/Karyawan/Pekerja Bebas'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        totalPekerja[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _totalPekerja: totalPekerja
      };

      catList.forEach((cat) => {
        rowObj[cat] = jamsosStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isJamsos, currentSheet, activeDimension, categoryCol, jamsosStackMode]);

  // -------------------------------------------------------------
  // DATA KHUSUS SERIKAT PEKERJA (08_2):
  // STACKED BAR CHART KOMPOSISI PEKERJA BERSERIKAT ANTARWAKTU
  // Mendukung dimensi: Gender, Wilayah
  // -------------------------------------------------------------
  const serikatStackedData = useMemo(() => {
    if (!isSerikat || !currentSheet || !currentSheet.data) {
      return { rows: [], categories: [] };
    }

    const years = [
      ...new Set(
        currentSheet.data
          .map((r) => Number(r['Tahun'] || r['Thn'] || r['Year']))
          .filter((y) => !isNaN(y) && y > 0)
      )
    ].sort((a, b) => a - b);

    if (years.length === 0) return { rows: [], categories: [] };

    const isGender = activeDimension === 'gender' || activeDimension === 'Sheet1';

    // Daftar kategori secara stabil
    const catList = [];
    currentSheet.data.forEach((r) => {
      const rawCat = String(r[categoryCol] || '').trim();
      const lower = rawCat.toLowerCase();
      if (
        isGender &&
        (lower.includes('+') ||
          lower.includes('dan') ||
          (lower.includes('laki') && lower.includes('perempuan')) ||
          lower === 'total')
      ) {
        return;
      }
      if (rawCat && !catList.includes(rawCat)) {
        catList.push(rawCat);
      }
    });

    const rows = years.map((yr) => {
      const yearRows = currentSheet.data.filter(
        (r) => Number(r['Tahun'] || r['Thn'] || r['Year']) === yr
      );

      let totalCount = 0;
      if (isGender) {
        const totRow = yearRows.find((r) => {
          const gen = String(r['Jenis Kelamin'] || '').toLowerCase();
          return (
            gen.includes('+') ||
            gen.includes('dan') ||
            (gen.includes('laki') && gen.includes('perempuan')) ||
            gen === 'total'
          );
        });
        totalCount = Number(totRow?.['Jumlah Pekerja Berserikat'] || 0);
      }

      const pcts = {};
      const counts = {};
      const prevalensi = {};
      const totalPekerja = {};

      yearRows.forEach((r) => {
        const rawCat = String(r[categoryCol] || '').trim();
        const lower = rawCat.toLowerCase();
        if (
          isGender &&
          (lower.includes('+') ||
            lower.includes('dan') ||
            (lower.includes('laki') && lower.includes('perempuan')) ||
            lower === 'total')
        ) {
          return;
        }

        const count = Number(r['Jumlah Pekerja Berserikat'] || 0);
        const prev = Number(r['Persentase Pekerja yang berserikat'] || 0);
        const pop = Number(r['Jumlah Pekerja'] || 0);
        counts[rawCat] = count;
        prevalensi[rawCat] = Number(prev.toFixed(2));
        totalPekerja[rawCat] = pop;
      });

      if (!totalCount) {
        totalCount = Object.values(counts).reduce((a, b) => a + b, 0);
      }

      catList.forEach((cat) => {
        const count = counts[cat] || 0;
        const pct = totalCount > 0 ? Number(((count / totalCount) * 100).toFixed(2)) : 0;
        pcts[cat] = pct;
      });

      const rowObj = {
        tahun: yr,
        totalCount,
        _counts: counts,
        _pcts: pcts,
        _prevalensi: prevalensi,
        _totalPekerja: totalPekerja
      };

      catList.forEach((cat) => {
        rowObj[cat] = serikatStackMode === 'percent' ? pcts[cat] || 0 : counts[cat] || 0;
      });

      return rowObj;
    });

    return { rows, categories: catList };
  }, [isSerikat, currentSheet, activeDimension, categoryCol, serikatStackMode]);

  // Flag aktif untuk Diagram Batang Bertumpuk (Stacked Bar)
  const isStackedBarActive = isTpak && activeDimension === 'pendidikan';

  // Flag aktif apakah tampilan saat ini menggunakan Diagram Lingkaran (Pie Chart) khusus Sektor Informal
  const isPieChartActive =
    isInformal && (activeDimension === 'sektor' || activeDimension === 'generasi');

  // -------------------------------------------------------------
  // DATA KHUSUS EPR & TPAK TAB KELOMPOK UMUR: LINE CHART MULTI-LINE
  // -------------------------------------------------------------
  const ageYearOptions = useMemo(() => {
    if ((!isEpr && !isTpak) || activeDimension !== 'umur') return [2025];
    const yearsSet = new Set();

    if (isEpr) {
      const gSheet = sheetsData?.[2];
      const wSheet = sheetsData?.[3];
      gSheet?.data?.forEach((r) => {
        const y = Number(r['Tahun'] || r['Thn']);
        if (y) yearsSet.add(y);
      });
      wSheet?.data?.forEach((r) => {
        const y = Number(r['Tahun'] || r['Thn']);
        if (y) yearsSet.add(y);
      });
    } else if (isTpak) {
      const s1 = sheetsData?.find((s) => s.sheet === 'Sheet1') || sheetsData?.[0];
      const s3 = sheetsData?.find((s) => s.sheet === 'Sheet3') || sheetsData?.[2];
      const s5 = sheetsData?.find((s) => s.sheet === 'Sheet5') || sheetsData?.[4];
      [s1, s3, s5].forEach((s) => {
        s?.data?.forEach((r) => {
          const y = Number(r['Tahun'] || r['Thn']);
          if (y) yearsSet.add(y);
        });
      });
    }

    const list = Array.from(yearsSet).sort((a, b) => b - a);
    return list.length > 0 ? list : [2025, 2024, 2023, 2022, 2021, 2020];
  }, [isEpr, isTpak, activeDimension, sheetsData]);

  useEffect(() => {
    if (ageYearOptions.length > 0 && !ageYearOptions.includes(ageSelectedYear)) {
      setAgeSelectedYear(ageYearOptions[0]);
    }
  }, [ageYearOptions]);

  const ageMultiLineData = useMemo(() => {
    if ((!isEpr && !isTpak) || activeDimension !== 'umur') return [];

    const ageMap = {};
    const standardAgeOrder = [
      '15-19', '20-24', '25-29', '30-34', '35-39',
      '40-44', '45-49', '50-54', '55-59', '60-64', '65+'
    ];
    const detectedAgeOrder = [];

    const registerAge = (age) => {
      if (!ageMap[age]) {
        ageMap[age] = { age };
        detectedAgeOrder.push(age);
      }
    };

    if (isEpr) {
      const gSheet = sheetsData?.[2];
      const wSheet = sheetsData?.[3];

      // 1. Ambil data Gender
      if (gSheet?.data && (ageCompareMode === 'gender' || ageCompareMode === 'gabungan')) {
        const gCol = gSheet.headers?.[2] || 'Jenis Kelamin';
        const ageCol = gSheet.headers?.[1] || 'Kelompok Umur ';

        gSheet.data.forEach((r) => {
          const yr = Number(r['Tahun'] || r['Thn']);
          if (yr === Number(ageSelectedYear)) {
            const age = String(r[ageCol] || '').trim();
            const cat = String(r[gCol] || '').trim();
            const val = Number(r[metricCol]);

            if (age && !isNaN(val)) {
              registerAge(age);
              ageMap[age][cat] = val;
            }
          }
        });
      }

      // 2. Ambil data Wilayah
      if (wSheet?.data && (ageCompareMode === 'wilayah' || ageCompareMode === 'gabungan')) {
        const wCol = wSheet.headers?.[2] || 'Wilayah';
        const ageCol = wSheet.headers?.[1] || 'Kelompok Umur ';

        wSheet.data.forEach((r) => {
          const yr = Number(r['Tahun'] || r['Thn']);
          if (yr === Number(ageSelectedYear)) {
            const age = String(r[ageCol] || '').trim();
            const cat = String(r[wCol] || '').trim();
            const val = Number(r[metricCol]);

            if (age && !isNaN(val)) {
              registerAge(age);
              ageMap[age][cat] = val;
            }
          }
        });
      }
    } else if (isTpak) {
      const s1 = sheetsData?.find((s) => s.sheet === 'Sheet1') || sheetsData?.[0]; // Total
      const s3 = sheetsData?.find((s) => s.sheet === 'Sheet3') || sheetsData?.[2]; // Wilayah
      const s5 = sheetsData?.find((s) => s.sheet === 'Sheet5') || sheetsData?.[4]; // Gender

      // 1. Total (Laki-Laki + Perempuan) dari Sheet1
      if (s1?.data) {
        s1.data.forEach((r) => {
          const yr = Number(r['Tahun'] || r['Thn']);
          if (yr === Number(ageSelectedYear)) {
            const age = String(r['Kelompok Umur'] || r['Kelompok Umur '] || '').trim();
            let val = Number(r['TPAK']);
            if (val <= 1 && val > 0) val = Number((val * 100).toFixed(2));
            if (age && !isNaN(val)) {
              registerAge(age);
              ageMap[age]['Total (L+P)'] = val;
            }
          }
        });
      }

      // 2. Gender dari Sheet5 (Laki-Laki & Perempuan)
      if (s5?.data && (ageCompareMode === 'gender' || ageCompareMode === 'gabungan')) {
        s5.data.forEach((r) => {
          const yr = Number(r['Tahun'] || r['Thn']);
          if (yr === Number(ageSelectedYear)) {
            const age = String(r['Kelompok Umur'] || r['Kelompok Umur '] || '').trim();
            const cat = String(r['Jenis Kelamin'] || '').trim();
            let val = Number(r['TPAK']);
            if (val <= 1 && val > 0) {
              val = Number((val * 100).toFixed(2));
            }
            if (age && !isNaN(val)) {
              registerAge(age);
              ageMap[age][cat] = val;
            }
          }
        });
      }

      // 3. Wilayah dari Sheet3 (Perkotaan & Pedesaan)
      if (s3?.data && (ageCompareMode === 'wilayah' || ageCompareMode === 'gabungan')) {
        s3.data.forEach((r) => {
          const yr = Number(r['Tahun'] || r['Thn']);
          if (yr === Number(ageSelectedYear)) {
            const age = String(r['Kelompok Umur'] || r['Kelompok Umur '] || '').trim();
            const cat = String(r['Wilayah'] || '').trim();
            let val = Number(r['TPAK']);
            if (val <= 1 && val > 0) {
              val = Number((val * 100).toFixed(2));
            }
            if (age && !isNaN(val)) {
              registerAge(age);
              ageMap[age][cat] = val;
            }
          }
        });
      }
    }

    // Urutkan berdasarkan urutan umur standar
    const sortedAges = standardAgeOrder.filter((a) => ageMap[a]);
    const finalOrder = sortedAges.length > 0 ? sortedAges : detectedAgeOrder;

    return finalOrder.map((a) => ageMap[a]);
  }, [isEpr, isTpak, activeDimension, sheetsData, ageCompareMode, ageSelectedYear, metricCol]);

  const availableAgeLines = useMemo(() => {
    if (ageMultiLineData.length === 0) return [];
    const keys = new Set();
    ageMultiLineData.forEach((row) => {
      Object.keys(row).forEach((k) => {
        if (k !== 'age') keys.add(k);
      });
    });
    return Array.from(keys);
  }, [ageMultiLineData]);

  // -------------------------------------------------------------
  // HELPER TOGGLE KATEGORI / KABUPATEN
  // -------------------------------------------------------------
  const toggleAgeLine = (lineName) => {
    setActiveAgeLines((prev) => ({
      ...prev,
      [lineName]: prev[lineName] === false ? true : false
    }));
  };

  const toggleCategoryLine = (catName) => {
    setCategoryLineToggles((prev) => ({
      ...prev,
      [catName]: prev[catName] === false ? true : false
    }));
  };

  const toggleKabupatenLine = (kabName) => {
    setActiveKabupaten((prev) => ({
      ...prev,
      [kabName]: prev[kabName] === false ? true : false
    }));
  };

  const setKabupatenPreset = (preset) => {
    const nextMap = {};
    if (preset === 'all') {
      allKabupatenList.forEach((k) => {
        nextMap[k] = true;
      });
    } else if (preset === 'fokus') {
      allKabupatenList.forEach((k) => {
        const clean = k.toLowerCase();
        nextMap[k] =
          clean.includes('tanjung jabung barat') ||
          clean.includes('kota jambi') ||
          clean.includes('muaro jambi');
      });
    } else if (preset === 'only_tanjab') {
      allKabupatenList.forEach((k) => {
        nextMap[k] = k.toLowerCase().includes('tanjung jabung barat');
      });
    }
    setActiveKabupaten(nextMap);
  };

  // -------------------------------------------------------------
  // FILTER TABEL RINCIAN LENGKAP
  // -------------------------------------------------------------
  const filteredTableRows = useMemo(() => {
    if (!currentSheet || !currentSheet.data) return [];
    return currentSheet.data.filter((row) => {
      // KHUSUS SEKTOR INFORMAL: HANYA tampilkan baris Status === 'Informal' (tidak memasukkan pekerja formal)
      if (isInformal) {
        const st = String(row['Status'] || '').trim().toLowerCase();
        if (st !== 'informal') return false;
      }

      // Filter tahun & gender
      if ((isEpr || isTpak) && activeDimension === 'umur') {
        const rowYr = Number(row['Tahun'] || row['Thn']);
        if (rowYr !== Number(ageSelectedYear)) return false;
      } else if (isTpak && activeDimension === 'pendidikan') {
        if (
          tpakEduGender &&
          String(row['Jenis Kelamin'] || '').trim().toLowerCase() !== tpakEduGender.toLowerCase()
        ) {
          return false;
        }
      } else if (isStatusGenderActive) {
        const rowGen = String(row['Jenis Kelamin'] || '').trim().toLowerCase();
        if (rowGen !== statusGenderFilter.trim().toLowerCase()) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isStatusGenerasiActive) {
        const rowGen = String(row['Generasi'] || '').trim().toLowerCase();
        if (!rowGen.includes(statusGenerasiFilter.trim().toLowerCase()) &&
            rowGen !== statusGenerasiFilter.trim().toLowerCase()) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isStatusWilayahActive) {
        const rowWil = String(row['Wilayah'] || '').trim().toLowerCase();
        if (rowWil !== statusWilayahFilter.trim().toLowerCase()) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isRerataBuruh && activeDimension === 'wilayah') {
        const rowJenis = String(row['Jenis'] || '').trim().toLowerCase();
        const target = rerataBuruhWilayahFilter.trim().toLowerCase();
        const isMatch = (target.includes('des') || target.includes('pedesaan') || target.includes('perdesaan'))
          ? (rowJenis.includes('des') || rowJenis.includes('pedesaan') || rowJenis.includes('perdesaan'))
          : rowJenis === target;
        if (!isMatch) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isRerataBuruh && activeDimension === 'gender') {
        const rowJenis = String(row['Jenis'] || '').trim().toLowerCase();
        if (rowJenis !== rerataBuruhGenderFilter.trim().toLowerCase()) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isRataJamMinggu && (activeDimension === 'distribusi' || activeDimension === 'Sheet4')) {
        const rowGen = String(row['Jenis Kelamin'] || '').trim().toLowerCase();
        const target = distribusiJamKerjaGenderFilter.trim().toLowerCase();
        let matchGen = false;
        if (target.includes('+') || target.includes('dan') || (target.includes('laki') && target.includes('perempuan'))) {
          matchGen = (rowGen.includes('laki') && rowGen.includes('perempuan')) || rowGen.includes('+') || rowGen.includes('dan') || rowGen === 'total';
        } else if (target === 'laki-laki' || target.includes('laki')) {
          matchGen = rowGen.includes('laki') && !(rowGen.includes('perempuan') || rowGen.includes('+') || rowGen.includes('dan'));
        } else if (target === 'perempuan' || target.includes('perempuan')) {
          matchGen = rowGen.includes('perempuan') && !(rowGen.includes('laki') || rowGen.includes('+') || rowGen.includes('dan'));
        }
        if (!matchGen) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isFemaleShare && (activeDimension === 'wilayah' || activeDimension === 'Sheet2')) {
        const rowWil = String(row['Wilayah'] || '').trim().toLowerCase();
        const target = femaleShareWilayahFilter.trim().toLowerCase();
        const isMatch = (target.includes('des') || target.includes('pedesaan') || target.includes('perdesaan'))
          ? (rowWil.includes('des') || rowWil.includes('pedesaan') || rowWil.includes('perdesaan'))
          : rowWil === target;
        if (!isMatch) return false;
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      } else if (isPieChartActive) {
        const rowYr = Number(row['Tahun'] || row['Thn']);
        if (pieSelectedYear !== 'ALL' && rowYr !== Number(pieSelectedYear)) return false;
      } else {
        if (selectedYear !== 'ALL') {
          const rowYr = Number(row['Tahun'] || row['Thn'] || row['Year']);
          if (rowYr && rowYr !== Number(selectedYear)) return false;
        }
      }

      // Filter search
      if (searchTerm.trim()) {
        const match = Object.values(row).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (!match) return false;
      }
      return true;
    });
  }, [
    currentSheet,
    isEpr,
    isTpak,
    isInformal,
    isStatusGenderActive,
    isStatusGenerasiActive,
    isStatusWilayahActive,
    isRerataBuruh,
    isRataJamMinggu,
    isFemaleShare,
    femaleShareWilayahFilter,
    statusGenderFilter,
    statusGenerasiFilter,
    statusWilayahFilter,
    rerataBuruhWilayahFilter,
    rerataBuruhGenderFilter,
    distribusiJamKerjaGenderFilter,
    isPieChartActive,
    activeDimension,
    ageSelectedYear,
    pieSelectedYear,
    tpakEduGender,
    selectedYear,
    searchTerm
  ]);

  // Ekspor CSV
  const handleExportCSV = () => {
    if (!currentSheet || filteredTableRows.length === 0) return;
    const headers = currentSheet.headers;
    const csvRows = [headers.join(',')];
    filteredTableRows.forEach((row) => {
      const line = headers.map((h) => {
        let v = row[h] !== undefined && row[h] !== null ? String(row[h]) : '';
        if (v.includes(',') || v.includes('"')) {
          v = `"${v.replace(/"/g, '""')}"`;
        }
        return v;
      });
      csvRows.push(line.join(','));
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${subIndicator.code}_${activeDimension}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* KARTU PILIHAN DIMENSI: DINAMIS SESUAI SUB-INDIKATOR AKTIF         */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Pilihan Dimensi Analisis ({availableTabs.length} Dimensi Tersedia)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {isInformal
              ? `${filteredTableRows.length} Baris Data Informal`
              : `${currentSheet?.total_rows || 0} Total Baris Data Publikasi`}
          </span>
        </div>

        {/* Dynamic Grid Tabs */}
        <div
          className={`grid gap-2.5 ${
            availableTabs.length === 1
              ? 'grid-cols-1'
              : availableTabs.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : availableTabs.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
          }`}
        >
          {availableTabs.map((tab) => {
            const TabIcon = tab.icon || Layers;
            const isTabActive = activeDimension === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveDimension(tab.id)}
                className={`px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border text-left ${
                  isTabActive
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25 ring-2 ring-blue-500/30'
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <TabIcon
                    className={`w-4 h-4 shrink-0 ${isTabActive ? 'text-white' : 'text-slate-500'}`}
                  />
                  <span className="truncate">{tab.label}</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold shrink-0 ml-2 ${
                    isTabActive ? 'bg-blue-700 text-blue-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* FILTER INTERAKTIF KHUSUS EPR & TPAK TAB KELOMPOK UMUR             */}
      {/* ----------------------------------------------------------------- */}
      {(isEpr || isTpak) && activeDimension === 'umur' && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-white border border-blue-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
            <div>
              <h5 className="text-xs font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-blue-600" />
                Filter Perbandingan Kelompok Umur {isTpak ? 'TPAK' : 'EPR'}
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Membandingkan kurva {isTpak ? 'partisipasi angkatan kerja (TPAK)' : 'penyerapan kerja (EPR)'} menurut kelompok umur antar-kategori pada line chart
              </p>
            </div>

            {/* Filter Waktu (Tahun) */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-blue-200 shadow-xs">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Tahun Data:</span>
              <select
                value={ageSelectedYear}
                onChange={(e) => setAgeSelectedYear(Number(e.target.value))}
                className="bg-transparent text-xs font-extrabold text-blue-700 outline-none cursor-pointer"
              >
                {ageYearOptions.map((yr) => (
                  <option key={yr} value={yr}>
                    Tahun {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Opsi Mode Pembanding: Gender / Wilayah / Gabungan */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Mode Garis Pembanding:
              </span>
              <div className="inline-flex p-1 rounded-xl bg-slate-200/80 gap-1 border border-slate-300/60">
                <button
                  onClick={() => setAgeCompareMode('gender')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    ageCompareMode === 'gender'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Bandingkan Gender
                </button>
                <button
                  onClick={() => setAgeCompareMode('wilayah')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    ageCompareMode === 'wilayah'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Bandingkan Wilayah
                </button>
                <button
                  onClick={() => setAgeCompareMode('gabungan')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    ageCompareMode === 'gabungan'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  Bandingkan Keduanya (Gender + Wilayah)
                </button>
              </div>
            </div>

            {/* Checkbox Toggle Garis Kategori */}
            <div>
              <span className="text-[11px] font-bold text-slate-700 block mb-1.5">
                Pilih Garis Kategori:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {availableAgeLines.map((lineKey, idx) => {
                  const isChecked = activeAgeLines[lineKey] !== false;
                  const style = getLineProps(lineKey, idx);

                  return (
                    <button
                      key={lineKey}
                      onClick={() => toggleAgeLine(lineKey)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        isChecked
                          ? 'bg-white text-slate-800 border-slate-300 shadow-xs'
                          : 'bg-slate-100/80 text-slate-400 border-slate-200 line-through'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: isChecked ? style.stroke : '#94a3b8' }}
                      ></span>
                      <span>{lineKey}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* FILTER KHUSUS TPT TAB 2: MENURUT KABUPATEN/KOTA (11 KAB/KOTA)      */}
      {/* ----------------------------------------------------------------- */}
      {isTpt && activeDimension === 'kabupaten' && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-white border border-blue-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-200/60 pb-3">
            <div>
              <h5 className="text-xs font-extrabold text-blue-900 uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                Filter Perbandingan 11 Kabupaten / Kota Se-Provinsi Jambi (2013 – 2025)
              </h5>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sorotan utama: <strong>Kabupaten Tanjung Jabung Barat</strong> (Garis Biru Tebal). Klik tombol di bawah untuk menyaring daerah pembanding.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-blue-200 shadow-xs">
              <button
                onClick={() => setKabupatenPreset('all')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Pilih Semua (11)
              </button>
              <button
                onClick={() => setKabupatenPreset('fokus')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-blue-700 hover:bg-blue-50 transition-colors"
              >
                Fokus Tanjab Barat vs Jambi
              </button>
              <button
                onClick={() => setKabupatenPreset('only_tanjab')}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white shadow-xs"
              >
                Hanya Tanjab Barat
              </button>
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-slate-700 block mb-2">
              Klik nama Kabupaten/Kota untuk menampilkan atau menyembunyikan garis:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {allKabupatenList.map((kab, idx) => {
                const isChecked = activeKabupaten[kab] !== false;
                const style = getLineProps(kab, idx);
                const isTanjab = kab.toLowerCase().includes('tanjung jabung barat');

                return (
                  <button
                    key={kab}
                    onClick={() => toggleKabupatenLine(kab)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isChecked
                        ? isTanjab
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/25 ring-2 ring-blue-400/40'
                          : 'bg-white text-slate-800 border-slate-300 shadow-xs'
                        : 'bg-slate-100/90 text-slate-400 border-slate-200 line-through'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 ${isTanjab && isChecked ? 'bg-white ring-2 ring-blue-300' : ''}`}
                      style={{
                        backgroundColor:
                          !isTanjab || !isChecked ? (isChecked ? style.stroke : '#94a3b8') : undefined
                      }}
                    ></span>
                    <span>{kab}</span>
                    {isTanjab && (
                      <span className="text-[9px] bg-blue-800/80 text-blue-100 px-1.5 py-0.2 rounded-sm font-mono ml-0.5">
                        Fokus Utama
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* FILTER GARIS KATEGORI UMUM & SEKTOR INFORMAL (GENDER & WILAYAH)   */}
      {/* ----------------------------------------------------------------- */}
      {!((isEpr || isTpak) && activeDimension === 'umur') &&
        !(isTpt && activeDimension === 'kabupaten') &&
        !isPieChartActive &&
        !isStackedBarActive &&
        trendCategories.length > 1 && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-700">Filter Garis Kategori:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {trendCategories.map((catKey, idx) => {
                const isChecked = categoryLineToggles[catKey] !== false;
                const style = getLineProps(catKey, idx);

                return (
                  <button
                    key={catKey}
                    onClick={() => toggleCategoryLine(catKey)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                      isChecked
                        ? 'bg-white text-slate-800 border-slate-300 shadow-xs'
                        : 'bg-slate-100 text-slate-400 border-slate-200 line-through'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: isChecked ? style.stroke : '#94a3b8' }}
                    ></span>
                    <span>{catKey}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

      {/* BANNER JUDUL TABEL BPS AKTIF */}
      {currentSheet?.title && (
        <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold">
              Tabel Publikasi BPS Aktif {isInformal && '• Khusus Sektor Informal'}
            </span>
            <h3 className="text-sm font-semibold mt-0.5 leading-snug">{currentSheet.title}</h3>
          </div>
          <div className="text-[11px] font-mono text-slate-400 shrink-0">
            Metrik:{' '}
            <strong className="text-blue-300">
              {isInformal ? 'Proporsi Informal' : metricCol}
            </strong>{' '}
            ({subIndicator.unit})
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* CHART CONTAINER: LINE CHART ATAU PIE CHART                       */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        {/* HEADER GRAFIK */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              {isStackedBarActive ? (
                <BarChart3 className="w-4 h-4 text-blue-600" />
              ) : isPieChartActive ? (
                <PieChartIcon className="w-4 h-4 text-blue-600" />
              ) : (
                <TrendingUp className="w-4 h-4 text-blue-600" />
              )}
              <span>
                {/* Judul EPR */}
                {isEpr && activeDimension === 'gender' && 'Grafik Tren EPR Menurut Gender Antarwaktu (2020 – 2025)'}
                {isEpr && activeDimension === 'wilayah' && 'Grafik Tren EPR Menurut Wilayah Tempat Tinggal Antarwaktu (2020 – 2025)'}
                {isEpr && activeDimension === 'umur' && `Perbandingan EPR Antar-Kategori Menurut Kelompok Umur Tahun ${ageSelectedYear}`}
                {/* Judul TPT */}
                {isTpt && activeDimension === 'gender' && 'Grafik Tren TPT Menurut Gender Antarwaktu (2020 – 2025)'}
                {isTpt && activeDimension === 'kabupaten' && 'Grafik Perbandingan TPT 11 Kabupaten/Kota Se-Provinsi Jambi (2013 – 2025)'}
                {isTpt && activeDimension === 'pendidikan' && 'Grafik Perbandingan TPT Menurut Tingkat Pendidikan (<= SMP vs >= SMA, 2020 – 2025)'}
                {/* Judul TPAK */}
                {isTpak && activeDimension === 'gender' && 'Grafik Tren TPAK Menurut Gender Antarwaktu (2020 – 2025)'}
                {isTpak && activeDimension === 'wilayah' && 'Grafik Tren TPAK Menurut Wilayah Tempat Tinggal Antarwaktu (2020 – 2025)'}
                {isTpak && activeDimension === 'umur' && `Perbandingan TPAK Antar-Kategori Menurut Kelompok Umur Tahun ${ageSelectedYear}`}
                {isTpak && activeDimension === 'pendidikan' && 'Perbandingan Komposisi Distribusi Angkatan Kerja Menurut Tingkat Pendidikan (2020 – 2025)'}
                {/* Judul Sektor Informal */}
                {isInformal && activeDimension === 'gender' && 'Grafik Tren Proporsi Pekerja Informal Menurut Gender Antarwaktu (2020 – 2025)'}
                {isInformal && activeDimension === 'wilayah' && 'Grafik Tren Proporsi Pekerja Informal Menurut Wilayah Antarwaktu (2020 – 2025)'}
                {isInformal && activeDimension === 'sektor' && `Komposisi Pekerja Informal Menurut Sektor Lapangan Usaha Tahun ${pieSelectedYear}`}
                {isInformal && activeDimension === 'generasi' && `Komposisi Pekerja Informal Menurut Klasifikasi Generasi Tahun ${pieSelectedYear}`}
                {/* Judul Status Pekerjaan (01_6) */}
                {isStatusPekerjaan && isStatusGenderActive && `Grafik Tren Status Pekerjaan Utama Menurut Gender (${statusGenderFilter})`}
                {isStatusPekerjaan && isStatusGenerasiActive && `Grafik Tren Status Pekerjaan Utama Menurut Generasi (${statusGenerasiFilter})`}
                {isStatusPekerjaan && isStatusWilayahActive && `Grafik Tren Status Pekerjaan Utama Menurut Wilayah (${statusWilayahFilter})`}
                {isStatusPekerjaan && !isStatusGenderActive && !isStatusGenerasiActive && !isStatusWilayahActive && `Grafik Tren Status Pekerjaan Utama - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {/* Judul Upah Rendah (02_1) */}
                {isUpahRendah && `Grafik Tren Proporsi Pekerja Upah Rendah - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {/* Judul Rerata Pendapatan Bersih (02_2) */}
                {isRerataPendapatan && `Grafik Tren Rata-Rata Upah/Pendapatan Bersih - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {/* Judul Rerata Upah Buruh (02_3) */}
                {isRerataBuruh && activeDimension === 'wilayah' && `Grafik Tren Rata-Rata Upah Buruh Menurut Wilayah (${rerataBuruhWilayahFilter})`}
                {isRerataBuruh && activeDimension === 'gender' && `Grafik Tren Rata-Rata Upah Buruh Menurut Gender (${rerataBuruhGenderFilter})`}
                {isRerataBuruh && activeDimension === 'pekerjaan' && 'Grafik Tren Rata-Rata Upah Buruh Menurut Jenis Pekerjaan'}
                {/* Judul Pilar 03 */}
                {isJamLebih && `Grafik Tren Pekerja Jam Kerja Lebih (>48 Jam) - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {isRataJamMinggu && (activeDimension === 'distribusi' ? `Grafik Tren Distribusi Jam Kerja Menurut Kelompok Jam (${distribusiJamKerjaGenderFilter})` : `Grafik Tren Rata-Rata Jam Kerja Seminggu - ${activeTabMeta?.label || 'Antarwaktu'}`)}
                {isRataJamTahun && `Grafik Tren Rata-Rata Jam Kerja Tahunan - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {isSetengahPengangguran && `Grafik Tren Tingkat Setengah Pengangguran - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {/* Judul Pilar 05, 06, 07, 08 */}
                {isPrecarious && `Grafik Tren Pekerja Precarious Workers - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {isFemaleShare && activeDimension === 'wilayah' && `Grafik Tren Proporsi Pekerja Perempuan Menurut Jabatan (${femaleShareWilayahFilter})`}
                {isFemaleShare && activeDimension !== 'wilayah' && `Grafik Tren Proporsi Pekerja Perempuan Menurut Jabatan - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {isJamsos && `Grafik Tren Proporsi Pekerja Penerima Jaminan Sosial - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {isSerikat && `Grafik Tren Proporsi Pekerja yang Berserikat - ${activeTabMeta?.label || 'Antarwaktu'}`}
                {/* Default lainnya */}
                {!isEpr && !isTpt && !isTpak && !isInformal && !isStatusPekerjaan && !isUpahRendah && !isRerataPendapatan && !isRerataBuruh && !isJamLebih && !isRataJamMinggu && !isRataJamTahun && !isSetengahPengangguran && !isPrecarious && !isFemaleShare && !isJamsos && !isSerikat && `Grafik Tren ${subIndicator.name} - ${activeTabMeta?.label || 'Antarwaktu'}`}
              </span>
            </h4>
            <p className="text-xs text-slate-500">
              {(isEpr || isTpak) && activeDimension === 'umur'
                ? `Sumbu X: Kelompok Umur (15-19 s.d. 65+) • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isStackedBarActive
                ? `Grafik Batang Bertumpuk (Stacked Bar Chart 100%) Antarwaktu 2020 – 2025 • Filter Jenis Kelamin: ${tpakEduGender}`
                : isPieChartActive
                ? `Diagram Lingkaran (Pie Chart) Distribusi Pangsa Pekerja Informal (%) • Tahun ${pieSelectedYear}`
                : isStatusGenderActive
                ? `Sumbu X: Runtun Waktu Tahun (2020 – 2025) • Filter Gender: ${statusGenderFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isStatusGenerasiActive
                ? `Sumbu X: Runtun Waktu Tahun (2020 – 2025) • Filter Generasi: ${statusGenerasiFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isStatusWilayahActive
                ? `Sumbu X: Runtun Waktu Tahun (2020 – 2025) • Filter Wilayah: ${statusWilayahFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isRerataBuruh && activeDimension === 'wilayah'
                ? `Sumbu X: Runtun Waktu Tahun • Filter Wilayah: ${rerataBuruhWilayahFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isRerataBuruh && activeDimension === 'gender'
                ? `Sumbu X: Runtun Waktu Tahun • Filter Gender: ${rerataBuruhGenderFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : isRataJamMinggu && activeDimension === 'distribusi'
                ? `Sumbu X: Runtun Waktu Tahun (2020 – 2025) • Filter Gender: ${distribusiJamKerjaGenderFilter} • Sumbu Y: Proporsi (%)`
                : isFemaleShare && activeDimension === 'wilayah'
                ? `Sumbu X: Runtun Waktu Tahun • Filter Wilayah: ${femaleShareWilayahFilter} • Sumbu Y: ${metricCol} (${subIndicator.unit})`
                : `Sumbu X: Runtun Waktu Tahun • Sumbu Y: ${metricCol} (${subIndicator.unit})`}
            </p>
          </div>

          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 self-start sm:self-auto font-mono">
            {(isEpr || isTpak) && activeDimension === 'umur'
              ? `Tahun Analisis: ${ageSelectedYear}`
              : isTpt && activeDimension === 'kabupaten'
              ? 'Runtun Waktu: 2013 – 2025'
              : isStackedBarActive
              ? 'Stacked Bar Chart 100%'
              : isPieChartActive
              ? `Pie Chart Tahun ${pieSelectedYear}`
              : isStatusGenderActive
              ? `Tren Gender: ${statusGenderFilter}`
              : isStatusGenerasiActive
              ? `Tren Generasi: ${statusGenerasiFilter}`
              : isStatusWilayahActive
              ? `Tren Wilayah: ${statusWilayahFilter}`
              : isRerataBuruh && activeDimension === 'wilayah'
              ? `Wilayah: ${rerataBuruhWilayahFilter}`
              : isRerataBuruh && activeDimension === 'gender'
              ? `Gender: ${rerataBuruhGenderFilter}`
              : isRataJamMinggu && activeDimension === 'distribusi'
              ? `Gender: ${distribusiJamKerjaGenderFilter}`
              : isFemaleShare && activeDimension === 'wilayah'
              ? `Wilayah: ${femaleShareWilayahFilter}`
              : 'Line Chart Antarwaktu'}
          </span>
        </div>

        {/* 1. GRAFIK KHUSUS EPR & TPAK TAB KELOMPOK UMUR */}
        {(isEpr || isTpak) && activeDimension === 'umur' ? (
          <div className="h-88 w-full">
            {ageMultiLineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ageMultiLineData} margin={{ top: 15, right: 25, left: 0, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="age"
                    tick={{ fontSize: 11, fill: '#64748b' }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                  />
                  <YAxis unit={subIndicator.unit === '%' ? '%' : ''} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px'
                    }}
                    formatter={(val, name) => [`${val} ${subIndicator.unit}`, name]}
                    labelFormatter={(label) => `Kelompok Umur: ${label} Tahun`}
                  />
                  <Legend />
                  {availableAgeLines.map((lineKey, i) => {
                    if (activeAgeLines[lineKey] === false) return null;
                    const lineStyle = getLineProps(lineKey, i);

                    return (
                      <Line
                        key={lineKey}
                        type="monotone"
                        dataKey={lineKey}
                        name={lineKey}
                        stroke={lineStyle.stroke}
                        strokeWidth={lineStyle.strokeWidth || 3}
                        strokeDasharray={lineStyle.strokeDasharray}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6 }}
                        connectNulls
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Data perbandingan kelompok umur untuk tahun {ageSelectedYear} tidak tersedia.
              </div>
            )}
          </div>
        ) : isTpt && activeDimension === 'kabupaten' ? (
          /* 2. GRAFIK KHUSUS TPT TAB KABUPATEN/KOTA (11 KAB/KOTA SE-JAMBI) */
          <div className="h-96 w-full">
            {trendLineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendLineData} margin={{ top: 15, right: 25, left: 0, bottom: 15 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="tahun" tick={{ fontSize: 12, fill: '#64748b' }} />
                  <YAxis unit={subIndicator.unit === '%' ? '%' : ''} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      color: '#fff',
                      border: 'none',
                      fontSize: '12px'
                    }}
                    formatter={(val, name) => [`${val} ${subIndicator.unit}`, name]}
                  />
                  <Legend wrapperStyle={{ paddingTop: '15px' }} />
                  {trendCategories.map((catKey, i) => {
                    if (activeKabupaten[catKey] === false) return null;
                    const lineStyle = getLineProps(catKey, i);
                    const isTanjab = catKey.toLowerCase().includes('tanjung jabung barat');

                    return (
                      <Line
                        key={catKey}
                        type="monotone"
                        dataKey={catKey}
                        name={isTanjab ? `★ ${catKey} (Fokus)` : catKey}
                        stroke={lineStyle.stroke}
                        strokeWidth={lineStyle.strokeWidth || 2}
                        dot={
                          isTanjab
                            ? { r: 5, strokeWidth: 2, fill: '#2563eb' }
                            : { r: 3, strokeWidth: 1 }
                        }
                        activeDot={{ r: isTanjab ? 8 : 5 }}
                        connectNulls
                      />
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Data runtun waktu kabupaten/kota tidak tersedia.
              </div>
            )}
          </div>
        ) : isStackedBarActive ? (
          /* 3. GRAFIK STACKED BAR CHART 100% (TPAK MENURUT TINGKAT PENDIDIKAN) */
          <div className="space-y-4">
            {/* Filter Jenis Kelamin Terpusat */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Filter Jenis Kelamin Distribusi Pendidikan:
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-xs">
                <Users className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs text-slate-500 font-medium">Jenis Kelamin:</span>
                <select
                  value={tpakEduGender}
                  onChange={(e) => setTpakEduGender(e.target.value)}
                  className="bg-transparent text-xs font-extrabold text-blue-700 outline-none cursor-pointer"
                >
                  <option value="Laki-Laki + Perempuan">Laki-Laki + Perempuan (Total)</option>
                  <option value="Laki-Laki">Laki-Laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
              </div>
            </div>

            {/* Stacked Bar Chart Recharts */}
            <div className="h-96 w-full pt-1">
              {tpakEducationStackedData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={tpakEducationStackedData}
                    margin={{ top: 20, right: 30, left: 0, bottom: 15 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis
                      dataKey="tahun"
                      tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                    />
                    <YAxis
                      unit="%"
                      domain={[0, 100]}
                      ticks={[0, 25, 50, 75, 100]}
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          const totalCount = payload[0]?.payload?.totalCount;
                          return (
                            <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[260px]">
                              <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-2 font-bold">
                                <span className="text-blue-400 font-mono text-sm">{label}</span>
                                {totalCount && (
                                  <span className="text-slate-300 font-mono text-[11px]">
                                    Total: {totalCount.toLocaleString('id-ID')} Penduduk
                                  </span>
                                )}
                              </div>
                              <div className="space-y-1.5">
                                {[...payload].reverse().map((entry) => {
                                  const count = entry.payload[`${entry.name}_count`];
                                  const se = entry.payload[`${entry.name}_se`];
                                  return (
                                    <div
                                      key={entry.name}
                                      className="flex items-center justify-between gap-4 py-0.5"
                                    >
                                      <div className="flex items-center gap-2">
                                        <span
                                          className="w-2.5 h-2.5 rounded-full shrink-0"
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-slate-200">{entry.name}:</span>
                                      </div>
                                      <div className="text-right font-mono">
                                        <span className="font-bold text-white">{entry.value}%</span>
                                        {count !== undefined && (
                                          <span className="text-[10px] text-slate-400 block">
                                            ({count.toLocaleString('id-ID')} org{se ? ` • SE ±${se}%` : ''})
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Legend
                      wrapperStyle={{ paddingTop: '15px' }}
                      formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                    />
                    <Bar dataKey="SD ke bawah" name="SD ke bawah" stackId="tpakEdu" fill="#10b981" />
                    <Bar dataKey="SMP sederajat" name="SMP sederajat" stackId="tpakEdu" fill="#0284c7" />
                    <Bar dataKey="SMA/SMK sederajat" name="SMA/SMK sederajat" stackId="tpakEdu" fill="#8b5cf6" />
                    <Bar dataKey="Perguruan Tinggi" name="Perguruan Tinggi" stackId="tpakEdu" fill="#f59e0b" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Data komposisi pendidikan tidak tersedia.
                </div>
              )}
            </div>

            {/* Rincian Kartu Ringkasan Tiap Kategori Pendidikan */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {[
                {
                  name: 'SD ke bawah',
                  color: '#10b981',
                  key: 'SD ke bawah',
                  desc: 'Pendidikan Dasar ke Bawah'
                },
                {
                  name: 'SMP sederajat',
                  color: '#0284c7',
                  key: 'SMP sederajat',
                  desc: 'Pendidikan Menengah Pertama'
                },
                {
                  name: 'SMA/SMK sederajat',
                  color: '#8b5cf6',
                  key: 'SMA/SMK sederajat',
                  desc: 'Pendidikan Menengah Atas'
                },
                {
                  name: 'Perguruan Tinggi',
                  color: '#f59e0b',
                  key: 'Perguruan Tinggi',
                  desc: 'Diploma / S1 / S2 / S3'
                }
              ].map((cat) => {
                const latest = tpakEducationStackedData[tpakEducationStackedData.length - 1];
                const earliest = tpakEducationStackedData[0];
                const latestVal = latest ? latest[cat.key] : 0;
                const earliestVal = earliest ? earliest[cat.key] : 0;
                const diff = (latestVal - earliestVal).toFixed(2);
                const isUp = Number(diff) > 0;

                return (
                  <div
                    key={cat.key}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 shadow-xs"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className="w-3 h-3 rounded-md shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-xs font-bold text-slate-800 truncate">{cat.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mb-2">{cat.desc}</div>
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-mono">Tahun 2025</span>
                        <span className="text-sm font-black font-mono text-slate-900">
                          {latestVal}%
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block font-mono">Tren 2020-2025</span>
                        <span
                          className={`text-xs font-bold font-mono ${
                            isUp ? 'text-emerald-600' : 'text-slate-600'
                          }`}
                        >
                          {isUp ? `+${diff}%` : `${diff}%`}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : isPieChartActive ? (
          /* 4. GRAFIK PIE CHART (Sektor & Generasi di Sektor Informal) */
          <div className="space-y-4">
            {/* Filter Tahun Analisis Sektor Informal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold text-slate-800">
                  Filter Tahun Analisis {activeDimension === 'sektor' ? 'Sektor' : 'Generasi'}:
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-blue-200 shadow-xs">
                <span className="text-xs text-slate-500 font-medium">Tahun:</span>
                <select
                  value={pieSelectedYear}
                  onChange={(e) => setPieSelectedYear(Number(e.target.value))}
                  className="bg-transparent text-xs font-extrabold text-blue-700 outline-none cursor-pointer"
                >
                  {sheetYears.map((yr) => (
                    <option key={yr} value={yr}>
                      Tahun {yr}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Layout Pie Chart & Breakdown Cards untuk Sektor Informal (Tampil Seperti Semula) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-7 h-88 w-full flex flex-col items-center justify-center">
                <div className="text-[11px] font-bold text-slate-600 mb-1 flex items-center gap-1.5">
                  <span>
                    Komposisi Pekerja Informal per {activeDimension === 'sektor' ? 'Sektor' : 'Generasi'}:
                  </span>
                  <span className="text-blue-700 font-mono">
                    Total: {informalPieData[0]?.totalInformalCount?.toLocaleString('id-ID')} Penduduk
                  </span>
                </div>
                {informalPieData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={informalPieData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        innerRadius={50}
                        paddingAngle={3}
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {informalPieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="#ffffff"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          borderRadius: '8px',
                          color: '#fff',
                          border: 'none',
                          fontSize: '12px'
                        }}
                        formatter={(val, name, item) => [
                          `${val}% (${item?.payload?.count?.toLocaleString('id-ID')} dari ${item?.payload?.totalInformalCount?.toLocaleString('id-ID')} pekerja informal)`,
                          `Proporsi ${item?.payload?.fullName || name}`
                        ]}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-xs text-slate-400">
                    Data pie chart pekerja informal untuk tahun {pieSelectedYear} tidak tersedia.
                  </div>
                )}
              </div>

              {/* Rincian Persentase & Prevalensi Tiap Kategori */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/80">
                  <div>
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Rincian Pekerja per {activeDimension === 'sektor' ? 'Sektor' : 'Generasi'} ({pieSelectedYear})
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Pangsa di pie chart & prevalensi terhadap total pekerja kategori
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">Tabel BPS</span>
                </div>

                {informalPieData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2 hover:bg-slate-100/60 transition-colors"
                  >
                    {/* Header Item: Kategori & Persentase Pangsa di Pie Chart */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-md shrink-0 shadow-xs"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-xs font-bold text-slate-800">{item.fullName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-blue-50/80 border border-blue-200/60 px-2 py-0.5 rounded-md">
                        <span className="text-[10px] text-blue-700 font-medium">Pangsa Pie:</span>
                        <span className="text-xs font-mono font-black text-blue-700">
                          {item.komposisiPct}%
                        </span>
                      </div>
                    </div>

                    {/* Ringkasan Total Pekerja & Prevalensi */}
                    <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                      <span>Total Pekerja:</span>
                      <div className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{item.totalCategoryWorkers ? item.totalCategoryWorkers.toLocaleString('id-ID') : '-'} org</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 font-semibold">
                          {item.proporsiIndikator}% Informal
                        </span>
                      </div>
                    </div>

                    {/* Segmented Dual Bar: Informal vs Formal */}
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                      <div
                        className="h-full transition-all"
                        style={{
                          width: `${Math.min(item.proporsiIndikator, 100)}%`,
                          backgroundColor: item.color
                        }}
                        title={`Pekerja Informal: ${item.proporsiIndikator}%`}
                      />
                      <div
                        className="h-full bg-slate-300 transition-all"
                        style={{
                          width: `${Math.max(0, 100 - item.proporsiIndikator)}%`
                        }}
                        title={`Pekerja Formal: ${item.formalProporsi}%`}
                      />
                    </div>

                    {/* Komparasi 2 Kolom: Informal vs Formal */}
                    <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono pt-0.5">
                      <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                          <span className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                            Informal
                          </span>
                          <span className="font-bold text-blue-700">{item.proporsiIndikator}%</span>
                        </div>
                        <div className="text-slate-900 font-bold text-[11px]">
                          {item.count ? item.count.toLocaleString('id-ID') : 0} org
                        </div>
                        <span className="text-[9px] text-slate-500 mt-0.5 block">
                          Pangsa: {item.komposisiPct}% total informal
                        </span>
                        {item.se !== null && (
                          <span className="text-[9px] text-slate-400 mt-0.2 block">SE: ±{item.se}%</span>
                        )}
                      </div>

                      <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                        <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                          <span className="flex items-center gap-1 font-semibold text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                            Formal
                          </span>
                          <span className="font-bold text-slate-600">{item.formalProporsi}%</span>
                        </div>
                        <div className="text-slate-800 font-bold text-[11px]">
                          {item.formalCount ? item.formalCount.toLocaleString('id-ID') : 0} org
                        </div>
                        <span className="text-[9px] text-slate-400 mt-0.5 block">Status Formal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* 4. GRAFIK LINE CHART ANTARWAKTU UMUM (Gender, Wilayah, Pendidikan, dsb) */
          <div className="space-y-4">
            {/* FILTER PILIHAN GENDER KHUSUS STATUS DALAM PEKERJAAN (01_6) */}
            {isStatusGenderActive && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Garis Tren Status Pekerjaan Menurut Gender:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-blue-200 shadow-xs">
                  {[
                    { id: 'Laki-Laki dan Perempuan', label: 'Laki-Laki dan Perempuan (Total)' },
                    { id: 'Laki-Laki', label: 'Laki-Laki' },
                    { id: 'Perempuan', label: 'Perempuan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStatusGenderFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        statusGenderFilter === opt.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {/* FILTER PILIHAN GENERASI KHUSUS STATUS DALAM PEKERJAAN (01_6) */}
            {isStatusGenerasiActive && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-purple-50/80 border border-purple-200">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Garis Tren Status Pekerjaan Menurut Generasi:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-purple-200 shadow-xs flex-wrap">
                  {[
                    { id: '01 Gen Z', label: '01 Gen Z' },
                    { id: '02 Milenial', label: '02 Milenial' },
                    { id: '03 Gen X', label: '03 Gen X' },
                    { id: '04 Boomer + Pre Boomer', label: '04 Boomer + Pre Boomer' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStatusGenerasiFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        statusGenerasiFilter === opt.id
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FILTER PILIHAN WILAYAH KHUSUS STATUS DALAM PEKERJAAN (01_6) */}
            {isStatusWilayahActive && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Garis Tren Status Pekerjaan Menurut Wilayah:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-emerald-200 shadow-xs">
                  {[
                    { id: 'Perkotaan', label: 'Perkotaan' },
                    { id: 'Pedesaan', label: 'Pedesaan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setStatusWilayahFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        statusWilayahFilter === opt.id
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FILTER WILAYAH KHUSUS RERATA UPAH BURUH (02_3) TAB WILAYAH */}
            {isRerataBuruh && activeDimension === 'wilayah' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Wilayah Tempat Tinggal:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-blue-200 shadow-xs">
                  {[
                    { id: 'Perkotaan', label: 'Perkotaan' },
                    { id: 'Pedesaan', label: 'Perdesaan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRerataBuruhWilayahFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        (rerataBuruhWilayahFilter === opt.id || (opt.id === 'Pedesaan' && /des/i.test(rerataBuruhWilayahFilter)))
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FILTER GENDER KHUSUS RERATA UPAH BURUH (02_3) TAB GENDER */}
            {isRerataBuruh && activeDimension === 'gender' && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-pink-50/80 border border-pink-200">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Jenis Kelamin:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-pink-200 shadow-xs">
                  {[
                    { id: 'Laki-laki', label: 'Laki-laki' },
                    { id: 'Perempuan', label: 'Perempuan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setRerataBuruhGenderFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        rerataBuruhGenderFilter.toLowerCase() === opt.id.toLowerCase()
                          ? 'bg-pink-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FILTER PILIHAN GENDER KHUSUS DISTRIBUSI JAM KERJA (03_2) */}
            {isRataJamMinggu && (activeDimension === 'distribusi' || activeDimension === 'Sheet4') && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Garis Distribusi Jam Kerja Menurut Gender:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-blue-200 shadow-xs flex-wrap">
                  {[
                    { id: 'Laki-Laki + Perempuan', label: 'Laki-Laki + Perempuan (Total)' },
                    { id: 'Laki-laki', label: 'Laki-laki' },
                    { id: 'Perempuan', label: 'Perempuan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setDistribusiJamKerjaGenderFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        distribusiJamKerjaGenderFilter === opt.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FILTER WILAYAH KHUSUS PROPORSI PEKERJA PEREMPUAN (06_1) TAB WILAYAH */}
            {isFemaleShare && (activeDimension === 'wilayah' || activeDimension === 'Sheet2') && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-purple-50/80 border border-purple-200">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold text-slate-800">
                    Filter Wilayah Tempat Tinggal:
                  </span>
                </div>
                <div className="flex items-center gap-1.5 bg-white p-1 rounded-lg border border-purple-200 shadow-xs">
                  {[
                    { id: 'Perkotaan', label: 'Perkotaan' },
                    { id: 'Pedesaan', label: 'Perdesaan' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFemaleShareWilayahFilter(opt.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                        (femaleShareWilayahFilter === opt.id || (opt.id === 'Pedesaan' && /des/i.test(femaleShareWilayahFilter)))
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="h-84 w-full">
              {trendLineData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendLineData} margin={{ top: 15, right: 25, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="tahun" tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis
                      unit={subIndicator.unit === '%' ? '%' : ''}
                      tickFormatter={
                        subIndicator.unit?.toLowerCase().includes('rp')
                          ? (val) => (val >= 1000000 ? `${(val / 1000000).toFixed(1)} jt` : val.toLocaleString('id-ID'))
                          : undefined
                      }
                      tick={{ fontSize: 11, fill: '#64748b' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        borderRadius: '8px',
                        color: '#fff',
                        border: 'none',
                        fontSize: '12px'
                      }}
                      formatter={(val, name) => [
                        subIndicator.unit?.toLowerCase().includes('rp')
                          ? `Rp ${Number(val).toLocaleString('id-ID')}`
                          : `${val} ${subIndicator.unit}`,
                        name
                      ]}
                    />
                    <Legend />
                    {trendCategories.map((catKey, i) => {
                      if (categoryLineToggles[catKey] === false) return null;
                      const lineStyle = getLineProps(catKey, i);

                      return (
                        <Line
                          key={catKey}
                          type="monotone"
                          dataKey={catKey}
                          name={catKey}
                          stroke={lineStyle.stroke}
                          strokeWidth={lineStyle.strokeWidth || 2.5}
                          strokeDasharray={lineStyle.strokeDasharray}
                          dot={{ r: 4, strokeWidth: 2 }}
                          activeDot={{ r: 6 }}
                          connectNulls
                        />
                      );
                    })}
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400">
                  Data tren waktu untuk dimensi ini tidak tersedia dalam file.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* GRAFIK KEDUA KHUSUS STATUS DALAM PEKERJAAN:                  */}
      {/* STACKED BAR CHART KOMPOSISI GENDER PER STATUS PEKERJAAN      */}
      {/* ------------------------------------------------------------- */}
      {isStatusGenderActive && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          {/* HEADER GRAFIK KEDUA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <span>
                  Komposisi Gender Pekerja Menurut Status Pekerjaan Utama Tahun {statusStackedYear}
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagram Batang Bertumpuk (Stacked Bar Chart 100%) • Menunjukkan proporsi pekerja laki-laki dan perempuan di tiap status pekerjaan
              </p>
            </div>

            {/* Filter Tahun Analisis Stacked Bar */}
            <div className="flex items-center gap-2 bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-200 shadow-xs self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs text-slate-500 font-medium">Tahun Analisis:</span>
              <select
                value={statusStackedYear}
                onChange={(e) => setStatusStackedYear(Number(e.target.value))}
                className="bg-transparent text-xs font-extrabold text-blue-700 outline-none cursor-pointer"
              >
                {sheetYears.map((yr) => (
                  <option key={yr} value={yr}>
                    Tahun {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-2">
            {statusGenderStackedData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusGenderStackedData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    unit="%"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const dataItem = payload[0]?.payload;
                        return (
                          <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                            <div className="border-b border-slate-700 pb-2 mb-2">
                              <span className="text-blue-400 font-bold block text-sm">
                                {dataItem?.rawStatus}
                              </span>
                              <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                                Total: {dataItem?.totalCount?.toLocaleString('id-ID')} Pekerja (100%)
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shrink-0" />
                                  <span className="text-slate-200">Laki-Laki:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-sky-400">{dataItem?.malePct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.maleCount?.toLocaleString('id-ID')} orang)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-pink-500 shrink-0" />
                                  <span className="text-slate-200">Perempuan:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-pink-400">{dataItem?.femalePct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.femaleCount?.toLocaleString('id-ID')} orang)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                  />
                  <Bar dataKey="Laki-Laki" name="Laki-Laki" stackId="statusGenderStack" fill="#0284c7" />
                  <Bar dataKey="Perempuan" name="Perempuan" stackId="statusGenderStack" fill="#ec4899" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Data komposisi gender untuk tahun {statusStackedYear} tidak tersedia.
              </div>
            )}
          </div>

          {/* Rincian Kartu Ringkasan Tiap Status Pekerjaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {statusGenderStackedData.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate" title={item.rawStatus}>
                    {item.rawStatus}
                  </span>
                </div>

                {/* Total Pekerja */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                  <span>Total Pekerja:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {item.totalCount ? item.totalCount.toLocaleString('id-ID') : '-'} Pekerja (100%)
                  </span>
                </div>

                {/* Segmented Dual Bar: Laki-laki vs Perempuan */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="h-full bg-sky-600 transition-all"
                    style={{ width: `${Math.min(item.malePct, 100)}%` }}
                    title={`Laki-Laki: ${item.malePct}%`}
                  />
                  <div
                    className="h-full bg-pink-500 transition-all"
                    style={{ width: `${Math.max(0, 100 - item.malePct)}%` }}
                    title={`Perempuan: ${item.femalePct}%`}
                  />
                </div>

                {/* Grid 2 Kolom: Laki-Laki vs Perempuan */}
                <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono pt-0.5">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-sky-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-600 shrink-0" />
                        Laki-Laki
                      </span>
                      <span className="font-bold text-sky-700">{item.malePct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.maleCount ? item.maleCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-pink-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />
                        Perempuan
                      </span>
                      <span className="font-bold text-pink-600">{item.femalePct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.femaleCount ? item.femaleCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* GRAFIK KEDUA KHUSUS STATUS DALAM PEKERJAAN:                  */}
      {/* STACKED BAR CHART KOMPOSISI GENERASI PER STATUS PEKERJAAN    */}
      {/* ------------------------------------------------------------- */}
      {isStatusGenerasiActive && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          {/* HEADER GRAFIK KEDUA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                <span>
                  Komposisi Generasi Pekerja Menurut Status Pekerjaan Utama Tahun {statusStackedYear}
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagram Batang Bertumpuk (Stacked Bar Chart 100%) • Menunjukkan proporsi Gen Z, Milenial, Gen X, dan Boomer / Pre-Boomer di tiap status pekerjaan
              </p>
            </div>

            {/* Filter Tahun Analisis Stacked Bar */}
            <div className="flex items-center gap-2 bg-purple-50/80 px-3 py-1.5 rounded-lg border border-purple-200 shadow-xs self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              <span className="text-xs text-slate-500 font-medium">Tahun Analisis:</span>
              <select
                value={statusStackedYear}
                onChange={(e) => setStatusStackedYear(Number(e.target.value))}
                className="bg-transparent text-xs font-extrabold text-purple-700 outline-none cursor-pointer"
              >
                {sheetYears.map((yr) => (
                  <option key={yr} value={yr}>
                    Tahun {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-2">
            {statusGenerasiStackedData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusGenerasiStackedData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    unit="%"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const dataItem = payload[0]?.payload;
                        return (
                          <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[290px]">
                            <div className="border-b border-slate-700 pb-2 mb-2">
                              <span className="text-purple-400 font-bold block text-sm">
                                {dataItem?.rawStatus}
                              </span>
                              <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                                Total: {dataItem?.totalCount ? dataItem?.totalCount?.toLocaleString('id-ID') : 0} Pekerja (100%)
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shrink-0" />
                                  <span className="text-slate-200">01 Gen Z:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-cyan-400">{dataItem?.genZPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.genZCount ? dataItem?.genZCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                                  <span className="text-slate-200">02 Milenial:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-blue-400">{dataItem?.milenialPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.milenialCount ? dataItem?.milenialCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                                  <span className="text-slate-200">03 Gen X:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-purple-400">{dataItem?.genXPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.genXCount ? dataItem?.genXCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                                  <span className="text-slate-200">04 Boomer + Pre Boomer:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-amber-400">{dataItem?.boomerPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.boomerCount ? dataItem?.boomerCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                  />
                  <Bar dataKey="01 Gen Z" name="01 Gen Z" stackId="statusGenStack" fill="#06b6d4" />
                  <Bar dataKey="02 Milenial" name="02 Milenial" stackId="statusGenStack" fill="#3b82f6" />
                  <Bar dataKey="03 Gen X" name="03 Gen X" stackId="statusGenStack" fill="#8b5cf6" />
                  <Bar dataKey="04 Boomer + Pre Boomer" name="04 Boomer + Pre Boomer" stackId="statusGenStack" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Data komposisi generasi untuk tahun {statusStackedYear} tidak tersedia.
              </div>
            )}
          </div>

          {/* Rincian Kartu Ringkasan Tiap Status Pekerjaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {statusGenerasiStackedData.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate" title={item.rawStatus}>
                    {item.rawStatus}
                  </span>
                </div>

                {/* Total Pekerja */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                  <span>Total Pekerja:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {item.totalCount ? item.totalCount.toLocaleString('id-ID') : '-'} Pekerja (100%)
                  </span>
                </div>

                {/* Segmented 4-Part Bar */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="h-full bg-cyan-500 transition-all"
                    style={{ width: `${Math.min(item.genZPct, 100)}%` }}
                    title={`Gen Z: ${item.genZPct}%`}
                  />
                  <div
                    className="h-full bg-blue-500 transition-all"
                    style={{ width: `${Math.min(item.milenialPct, 100)}%` }}
                    title={`Milenial: ${item.milenialPct}%`}
                  />
                  <div
                    className="h-full bg-purple-500 transition-all"
                    style={{ width: `${Math.min(item.genXPct, 100)}%` }}
                    title={`Gen X: ${item.genXPct}%`}
                  />
                  <div
                    className="h-full bg-amber-500 transition-all"
                    style={{ width: `${Math.max(0, 100 - item.genZPct - item.milenialPct - item.genXPct)}%` }}
                    title={`Boomer: ${item.boomerPct}%`}
                  />
                </div>

                {/* Grid 4 Kolom (2x2): Gen Z, Milenial, Gen X, Boomer */}
                <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono pt-0.5">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-cyan-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0" />
                        Gen Z
                      </span>
                      <span className="font-bold text-cyan-700">{item.genZPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.genZCount ? item.genZCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-blue-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                        Milenial
                      </span>
                      <span className="font-bold text-blue-700">{item.milenialPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.milenialCount ? item.milenialCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-purple-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                        Gen X
                      </span>
                      <span className="font-bold text-purple-700">{item.genXPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.genXCount ? item.genXCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-amber-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        Boomer
                      </span>
                      <span className="font-bold text-amber-700">{item.boomerPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.boomerCount ? item.boomerCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* GRAFIK KEDUA KHUSUS STATUS DALAM PEKERJAAN:                  */}
      {/* STACKED BAR CHART KOMPOSISI WILAYAH PER STATUS PEKERJAAN     */}
      {/* ------------------------------------------------------------- */}
      {isStatusWilayahActive && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          {/* HEADER GRAFIK KEDUA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>
                  Komposisi Wilayah Pekerja Menurut Status Pekerjaan Utama Tahun {statusStackedYear}
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Diagram Batang Bertumpuk (Stacked Bar Chart 100%) • Menunjukkan proporsi pekerja Perkotaan dan Pedesaan di tiap status pekerjaan
              </p>
            </div>

            {/* Filter Tahun Analisis Stacked Bar */}
            <div className="flex items-center gap-2 bg-emerald-50/80 px-3 py-1.5 rounded-lg border border-emerald-200 shadow-xs self-start sm:self-auto">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-xs text-slate-500 font-medium">Tahun Analisis:</span>
              <select
                value={statusStackedYear}
                onChange={(e) => setStatusStackedYear(Number(e.target.value))}
                className="bg-transparent text-xs font-extrabold text-emerald-700 outline-none cursor-pointer"
              >
                {sheetYears.map((yr) => (
                  <option key={yr} value={yr}>
                    Tahun {yr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-2">
            {statusWilayahStackedData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusWilayahStackedData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 35 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis
                    dataKey="shortName"
                    tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
                    interval={0}
                    angle={-15}
                    textAnchor="end"
                  />
                  <YAxis
                    unit="%"
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tick={{ fontSize: 11, fill: '#64748b' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const dataItem = payload[0]?.payload;
                        return (
                          <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                            <div className="border-b border-slate-700 pb-2 mb-2">
                              <span className="text-emerald-400 font-bold block text-sm">
                                {dataItem?.rawStatus}
                              </span>
                              <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                                Total: {dataItem?.totalCount ? dataItem?.totalCount?.toLocaleString('id-ID') : 0} Pekerja (100%)
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                                  <span className="text-slate-200">Perkotaan:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-indigo-400">{dataItem?.perkotaanPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.perkotaanCount ? dataItem?.perkotaanCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between py-0.5">
                                <div className="flex items-center gap-2">
                                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                                  <span className="text-slate-200">Pedesaan:</span>
                                </div>
                                <div className="text-right font-mono">
                                  <span className="font-bold text-emerald-400">{dataItem?.pedesaanPct}%</span>
                                  <span className="text-[10px] text-slate-400 block">
                                    ({dataItem?.pedesaanCount ? dataItem?.pedesaanCount?.toLocaleString('id-ID') : 0} orang)
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: '20px' }}
                    formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                  />
                  <Bar dataKey="Perkotaan" name="Perkotaan" stackId="statusWilStack" fill="#4f46e5" />
                  <Bar dataKey="Pedesaan" name="Pedesaan" stackId="statusWilStack" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-slate-400">
                Data komposisi wilayah untuk tahun {statusStackedYear} tidak tersedia.
              </div>
            )}
          </div>

          {/* Rincian Kartu Ringkasan Tiap Status Pekerjaan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            {statusWilayahStackedData.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/90 shadow-xs space-y-2 hover:bg-slate-100/60 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 truncate" title={item.rawStatus}>
                    {item.rawStatus}
                  </span>
                </div>

                {/* Total Pekerja */}
                <div className="flex items-center justify-between text-[11px] text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/50">
                  <span>Total Pekerja:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {item.totalCount ? item.totalCount.toLocaleString('id-ID') : '-'} Pekerja (100%)
                  </span>
                </div>

                {/* Segmented Dual Bar: Perkotaan vs Pedesaan */}
                <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex shadow-inner">
                  <div
                    className="h-full bg-indigo-600 transition-all"
                    style={{ width: `${Math.min(item.perkotaanPct, 100)}%` }}
                    title={`Perkotaan: ${item.perkotaanPct}%`}
                  />
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${Math.max(0, 100 - item.perkotaanPct)}%` }}
                    title={`Pedesaan: ${item.pedesaanPct}%`}
                  />
                </div>

                {/* Grid 2 Kolom: Perkotaan vs Pedesaan */}
                <div className="grid grid-cols-2 gap-2 text-[10.5px] font-mono pt-0.5">
                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-indigo-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0" />
                        Perkotaan
                      </span>
                      <span className="font-bold text-indigo-700">{item.perkotaanPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.perkotaanCount ? item.perkotaanCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-white border border-slate-200/70 shadow-xs flex flex-col justify-between">
                    <div className="flex items-center justify-between text-slate-500 text-[10px] mb-0.5">
                      <span className="flex items-center gap-1 font-semibold text-emerald-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                        Pedesaan
                      </span>
                      <span className="font-bold text-emerald-600">{item.pedesaanPct}%</span>
                    </div>
                    <div className="text-slate-900 font-bold text-[11px]">
                      {item.pedesaanCount ? item.pedesaanCount.toLocaleString('id-ID') : 0} org
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS PEKERJA BERUSAHA SENDIRI & KELUARGA (01_7) */}
      {/* Menampilkan komposisi pekerja 1, 2, atau 7 antarwaktu (semua tahun) */}
      {/* ----------------------------------------------------------------- */}
      {isPekerjaKeluarga && pekerjaKeluargaStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-50 border border-teal-100/80 text-teal-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja Berusaha Sendiri & Pekerja Keluarga (Status 1, 2, 7) Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender'
                      : activeDimension === 'wilayah'
                      ? 'Menurut Wilayah'
                      : activeDimension === 'generasi'
                      ? 'Menurut Generasi'
                      : activeDimension === 'pendidikan'
                      ? 'Menurut Pendidikan'
                      : 'Komposisi'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja kode 1, 2, atau 7 di Kabupaten Tanjung Jabung Barat antarwaktu (2020–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setPekerjaKeluargaStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  pekerjaKeluargaStackMode === 'percent'
                    ? 'bg-white text-teal-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setPekerjaKeluargaStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  pekerjaKeluargaStackMode === 'count'
                    ? 'bg-white text-teal-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={pekerjaKeluargaStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={pekerjaKeluargaStackMode === 'percent' ? '%' : ''}
                  domain={pekerjaKeluargaStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={pekerjaKeluargaStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    pekerjaKeluargaStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-teal-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Pekerja (Status 1, 2, 7):{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {pekerjaKeluargaStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Prev: ${prev}%` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {pekerjaKeluargaStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === pekerjaKeluargaStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="pekerjaKeluargaStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS SHARE PEKERJA PENERIMA UPAH NON-PERTANIAN (01_8) */}
      {/* Menampilkan komposisi pekerja penerima upah non-pertanian antarwaktu (semua tahun) */}
      {/* ----------------------------------------------------------------- */}
      {isWageNonAgri && wageNonAgriStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-50 border border-blue-100/80 text-blue-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja Penerima Upah di Sektor Non-Pertanian Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender'
                      : activeDimension === 'wilayah'
                      ? 'Menurut Wilayah'
                      : activeDimension === 'generasi'
                      ? 'Menurut Generasi'
                      : activeDimension === 'pendidikan'
                      ? 'Menurut Pendidikan'
                      : 'Komposisi'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja penerima upah di sektor non-pertanian di Kabupaten Tanjung Jabung Barat antarwaktu (2020–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setWageNonAgriStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  wageNonAgriStackMode === 'percent'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setWageNonAgriStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  wageNonAgriStackMode === 'count'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={wageNonAgriStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={wageNonAgriStackMode === 'percent' ? '%' : ''}
                  domain={wageNonAgriStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={wageNonAgriStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    wageNonAgriStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-blue-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Pekerja Penerima Upah Non-Pertanian:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {wageNonAgriStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._populasi?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Share: ${prev}%` : ''}
                                      {pop ? ` • Pop: ${pop.toLocaleString('id-ID')}` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {wageNonAgriStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === wageNonAgriStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="wageNonAgriStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS PROPORSI PEKERJA UPAH RENDAH (02_1)      */}
      {/* Menampilkan komposisi pekerja upah rendah antarwaktu (semua tahun) */}
      {/* ----------------------------------------------------------------- */}
      {isUpahRendah && upahRendahStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja Upah Rendah Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender'
                      : activeDimension === 'wilayah'
                      ? 'Menurut Wilayah'
                      : 'Menurut Pendidikan'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500">
                  {upahRendahStackMode === 'percent'
                    ? 'Distribusi pangsa pekerja upah rendah (100% per tahun) berdasarkan ' +
                      (activeDimension === 'gender'
                        ? 'jenis kelamin'
                        : activeDimension === 'wilayah'
                        ? 'wilayah tempat tinggal'
                        : 'jenjang pendidikan')
                    : 'Estimasi jumlah pekerja upah rendah (jiwa) di Tanjung Jabung Barat'}
                </p>
              </div>
            </div>

            {/* Switch Mode: Pangsa Komposisi (%) vs Jumlah Jiwa (Orang) */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start sm:self-auto">
              <button
                onClick={() => setUpahRendahStackMode('percent')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  upahRendahStackMode === 'percent'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>% (Pangsa Komposisi)</span>
              </button>
              <button
                onClick={() => setUpahRendahStackMode('count')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  upahRendahStackMode === 'count'
                    ? 'bg-white text-indigo-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Orang (Jumlah Pekerja)</span>
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div className="h-88 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={upahRendahStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={upahRendahStackMode === 'percent' ? '%' : ''}
                  domain={upahRendahStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={upahRendahStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    upahRendahStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-indigo-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Pekerja Upah Rendah:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {upahRendahStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._populasiBuruh?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • LPR: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} buruh` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {upahRendahStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === upahRendahStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="upahRendahStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {upahRendahStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = upahRendahStackedData.rows[upahRendahStackedData.rows.length - 1];
              const earliest = upahRendahStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {upahRendahStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS PEKERJA DENGAN JAM KERJA LEBIH (03_1)    */}
      {/* Menampilkan komposisi pekerja jam lebih antarwaktu (2020–2025)     */}
      {/* ----------------------------------------------------------------- */}
      {isJamLebih && jamLebihStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-100/80 text-amber-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja dengan Jam Kerja Lebih (&gt;48 Jam/Minggu) Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender'
                      : activeDimension === 'wilayah'
                      ? 'Menurut Wilayah'
                      : 'Menurut Generasi'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja jam kerja lebih di Kabupaten Tanjung Jabung Barat antarwaktu (2020–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setJamLebihStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  jamLebihStackMode === 'percent'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setJamLebihStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  jamLebihStackMode === 'count'
                    ? 'bg-white text-amber-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jamLebihStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={jamLebihStackMode === 'percent' ? '%' : ''}
                  domain={jamLebihStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={jamLebihStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    jamLebihStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-amber-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Pekerja Jam Lebih (&gt;48 Jam):{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {jamLebihStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._totalPekerja?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Prev: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} pekerja` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {jamLebihStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === jamLebihStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="jamLebihStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
            {jamLebihStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = jamLebihStackedData.rows[jamLebihStackedData.rows.length - 1];
              const earliest = jamLebihStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {jamLebihStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-amber-600' : 'text-emerald-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS TINGKAT SETENGAH PENGANGGURAN (03_4)     */}
      {/* Menampilkan komposisi jumlah setengah pengangguran menurut gender */}
      {/* ----------------------------------------------------------------- */}
      {isSetengahPengangguran && setengahPengangguranStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-rose-50 border border-rose-100/80 text-rose-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Setengah Pengangguran Menurut Gender Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70">
                    Menurut Gender (Laki-laki vs Perempuan)
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja setengah penganggur di Kabupaten Tanjung Jabung Barat antarwaktu (2020–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setSetengahPengangguranStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  setSetengahPengangguranStackMode === 'percent'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setSetengahPengangguranStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  setSetengahPengangguranStackMode === 'count'
                    ? 'bg-white text-rose-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={setengahPengangguranStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={setSetengahPengangguranStackMode === 'percent' ? '%' : ''}
                  domain={setSetengahPengangguranStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={setSetengahPengangguranStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    setSetengahPengangguranStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-rose-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Setengah Pengangguran:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {setengahPengangguranStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._totalPekerja?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Tingkat: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} pekerja` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {setengahPengangguranStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === setengahPengangguranStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="setengahPengangguranStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {setengahPengangguranStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = setengahPengangguranStackedData.rows[setengahPengangguranStackedData.rows.length - 1];
              const earliest = setengahPengangguranStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {setengahPengangguranStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-rose-600' : 'text-emerald-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS PRECARIOUS WORKERS (05_1)                */}
      {/* Menampilkan komposisi precarious workers menurut gender & wilayah */}
      {/* ----------------------------------------------------------------- */}
      {isPrecarious && precariousStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100/80 text-cyan-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja Precarious Workers Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender (Laki-laki vs Perempuan)'
                      : 'Menurut Wilayah (Perkotaan vs Perdesaan)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja precarious di Kabupaten Tanjung Jabung Barat antarwaktu (2021–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setPrecariousStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  precariousStackMode === 'percent'
                    ? 'bg-white text-cyan-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setPrecariousStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  precariousStackMode === 'count'
                    ? 'bg-white text-cyan-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={precariousStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={precariousStackMode === 'percent' ? '%' : ''}
                  domain={precariousStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={precariousStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    precariousStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-cyan-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Precarious Workers:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {precariousStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._totalPekerja?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Proporsi: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} pekerja` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {precariousStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === precariousStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="precariousStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {precariousStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = precariousStackedData.rows[precariousStackedData.rows.length - 1];
              const earliest = precariousStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {precariousStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-amber-600' : 'text-emerald-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS JAMINAN SOSIAL KETENAGAKERJAAN (07_1)    */}
      {/* Menampilkan komposisi penerima jamsos menurut gender & wilayah     */}
      {/* ----------------------------------------------------------------- */}
      {isJamsos && jamsosStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja Penerima Jaminan Sosial (Jamsos) Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender (Laki-laki vs Perempuan)'
                      : 'Menurut Wilayah (Perkotaan vs Perdesaan)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja penerima jaminan sosial di Kabupaten Tanjung Jabung Barat antarwaktu (2021–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setJamsosStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  jamsosStackMode === 'percent'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setJamsosStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  jamsosStackMode === 'count'
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jamsosStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={jamsosStackMode === 'percent' ? '%' : ''}
                  domain={jamsosStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={jamsosStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    jamsosStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-emerald-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Penerima Jamsos:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {jamsosStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._totalPekerja?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Cakupan: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} buruh` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {jamsosStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === jamsosStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="jamsosStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {jamsosStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = jamsosStackedData.rows[jamsosStackedData.rows.length - 1];
              const earliest = jamsosStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {jamsosStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-emerald-600' : 'text-amber-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* STACKED BAR CHART KHUSUS DIALOG SOSIAL & SERIKAT PEKERJA (08_2)  */}
      {/* Menampilkan komposisi pekerja berserikat menurut gender & wilayah */}
      {/* ----------------------------------------------------------------- */}
      {isSerikat && serikatStackedData.rows.length > 0 && (
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100/80 text-indigo-600">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Komposisi Pekerja yang Ikut Berserikat Antarwaktu
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
                    {activeDimension === 'gender'
                      ? 'Menurut Gender (Laki-laki vs Perempuan)'
                      : 'Menurut Wilayah (Perkotaan vs Perdesaan)'}
                  </span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Diagram Batang Bertumpuk (Stacked Bar Chart) komposisi pekerja yang ikut berserikat di Kabupaten Tanjung Jabung Barat antarwaktu (2021–2025)
                </p>
              </div>
            </div>

            {/* Toggle Mode Persentase Komposisi vs Jumlah Riil */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200/80 self-start sm:self-auto shadow-2xs">
              <button
                type="button"
                onClick={() => setSerikatStackMode('percent')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  serikatStackMode === 'percent'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                % Komposisi (100%)
              </button>
              <button
                type="button"
                onClick={() => setSerikatStackMode('count')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  serikatStackMode === 'count'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Jumlah Pekerja (Orang)
              </button>
            </div>
          </div>

          {/* Stacked Bar Chart */}
          <div className="h-96 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={serikatStackedData.rows}
                margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="tahun"
                  tick={{ fontSize: 12, fill: '#475569', fontWeight: 600 }}
                />
                <YAxis
                  unit={serikatStackMode === 'percent' ? '%' : ''}
                  domain={serikatStackMode === 'percent' ? [0, 100] : ['auto', 'auto']}
                  ticks={serikatStackMode === 'percent' ? [0, 25, 50, 75, 100] : undefined}
                  tickFormatter={
                    serikatStackMode === 'count'
                      ? (val) => `${(val / 1000).toLocaleString('id-ID')}k`
                      : undefined
                  }
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const dataItem = payload[0]?.payload;
                      return (
                        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 text-xs min-w-[280px]">
                          <div className="border-b border-slate-700 pb-2 mb-2">
                            <span className="text-indigo-400 font-bold block text-sm">
                              Tahun {dataItem?.tahun}
                            </span>
                            <span className="text-slate-300 font-mono text-[11px] block mt-0.5">
                              Total Pekerja Berserikat:{' '}
                              <strong className="text-white">
                                {dataItem?.totalCount ? dataItem.totalCount.toLocaleString('id-ID') : 0}
                              </strong>{' '}
                              orang (100%)
                            </span>
                          </div>
                          <div className="space-y-2">
                            {serikatStackedData.categories.map((cat, idx) => {
                              const lineProps = getLineProps(cat, idx);
                              const pct = dataItem?._pcts?.[cat] ?? 0;
                              const count = dataItem?._counts?.[cat] ?? 0;
                              const prev = dataItem?._prevalensi?.[cat];
                              const pop = dataItem?._totalPekerja?.[cat];
                              const cleanName = cat.replace(/^\d+\s*/, '');

                              return (
                                <div key={cat} className="flex items-center justify-between py-0.5">
                                  <div className="flex items-center gap-2">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{ backgroundColor: lineProps.stroke }}
                                    />
                                    <span className="text-slate-200">{cleanName}:</span>
                                  </div>
                                  <div className="text-right font-mono">
                                    <span className="font-bold text-white">{pct}%</span>
                                    <span className="text-[10px] text-slate-400 block">
                                      ({count.toLocaleString('id-ID')} org
                                      {prev !== undefined && prev !== null ? ` • Partisipasi: ${prev}%` : ''}
                                      {pop ? ` dr ${pop.toLocaleString('id-ID')} pekerja` : ''})
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: '15px' }}
                  formatter={(val) => <span className="text-xs font-semibold text-slate-700">{val}</span>}
                />
                {serikatStackedData.categories.map((cat, idx) => {
                  const lineProps = getLineProps(cat, idx);
                  const isTop = idx === serikatStackedData.categories.length - 1;
                  const cleanName = cat.replace(/^\d+\s*/, '');
                  return (
                    <Bar
                      key={cat}
                      dataKey={cat}
                      name={cleanName}
                      stackId="serikatStack"
                      fill={lineProps.stroke}
                      radius={isTop ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    />
                  );
                })}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ringkasan Per Kategori */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
            {serikatStackedData.categories.map((cat, idx) => {
              const lineProps = getLineProps(cat, idx);
              const latest = serikatStackedData.rows[serikatStackedData.rows.length - 1];
              const earliest = serikatStackedData.rows[0];
              const latestPct = latest?._pcts?.[cat] ?? 0;
              const earliestPct = earliest?._pcts?.[cat] ?? 0;
              const latestCount = latest?._counts?.[cat] ?? 0;
              const diff = (latestPct - earliestPct).toFixed(2);
              const isUp = Number(diff) > 0;
              const cleanName = cat.replace(/^\d+\s*/, '');

              return (
                <div
                  key={cat}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 shadow-2xs"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: lineProps.stroke }}
                    />
                    <span className="text-xs font-bold text-slate-700 truncate" title={cleanName}>
                      {cleanName}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-extrabold text-slate-800">
                      {latestPct}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {latestCount.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  {serikatStackedData.rows.length > 1 && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 mt-0.5">
                      <span>vs {earliest?.tahun} ({earliestPct}%)</span>
                      <span
                        className={`font-semibold font-mono ${
                          isUp ? 'text-indigo-600' : 'text-slate-600'
                        }`}
                      >
                        {isUp ? `+${diff}%` : `${diff}%`}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari baris data (kategori, angka, SE)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-blue-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!((isEpr || isTpak) && activeDimension === 'umur') &&
            !isPieChartActive &&
            !isStackedBarActive && (
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <select
                  value={selectedYear}
                  onChange={(e) =>
                    setSelectedYear(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))
                  }
                  className="bg-transparent font-bold text-blue-700 outline-none cursor-pointer"
                >
                  <option value="ALL">Semua Tahun</option>
                  {currentSheet?.years?.map((y) => (
                    <option key={y} value={y}>
                      Tahun {y}
                    </option>
                  ))}
                </select>
              </div>
            )}

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV</span>
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* TABEL DATA LENGKAP                                                */}
      {/* ----------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-slate-600" />
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Tabel Data Lengkap {isInformal && '(Hanya Pekerja Informal)'} (
              {filteredTableRows.length} Baris Terfilter)
            </h4>
          </div>
          <span className="text-[11px] text-slate-500">
            {isTpak && activeDimension === 'pendidikan'
              ? `Filter Aktif: ${tpakEduGender} (Seluruh Periode 2020 – 2025)`
              : (isEpr || isTpak) && activeDimension === 'umur'
              ? `Filter Aktif: Tahun ${ageSelectedYear}`
              : isPieChartActive
              ? `Filter Aktif: Tahun ${pieSelectedYear}`
              : isRataJamMinggu && (activeDimension === 'distribusi' || activeDimension === 'Sheet4')
              ? `Filter Aktif: Gender ${distribusiJamKerjaGenderFilter}${selectedYear !== 'ALL' ? ` • Tahun ${selectedYear}` : ''}`
              : selectedYear !== 'ALL'
              ? `Filter Aktif: Tahun ${selectedYear}`
              : 'Menampilkan seluruh baris tahun'}
          </span>
        </div>

        <div className="overflow-x-auto max-h-[500px]">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 bg-slate-100/95 backdrop-blur-xs z-10 shadow-xs">
              <tr className="border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <th className="py-3 px-3.5 text-center w-12">No</th>
                {currentSheet?.headers?.map((h, i) => (
                  <th
                    key={i}
                    className={`py-3 px-3.5 whitespace-nowrap ${
                      i > 1 ? 'text-right' : 'text-left'
                    } ${
                      h === metricCol || h.toLowerCase().includes('proporsi')
                        ? 'text-blue-700 bg-blue-50/80 font-extrabold'
                        : ''
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredTableRows.length > 0 ? (
                filteredTableRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3.5 text-center text-slate-400 font-mono text-[11px]">
                      {idx + 1}
                    </td>
                    {currentSheet?.headers?.map((h, colIdx) => {
                      let val = row[h];
                      if (
                        isTpak &&
                        (h === 'TPAK' || h === metricCol) &&
                        typeof val === 'number' &&
                        val <= 1 &&
                        val > 0
                      ) {
                        val = Number((val * 100).toFixed(2));
                      }
                      const isNumeric = typeof val === 'number';
                      const isMainMetric = h === metricCol || h.toLowerCase().includes('proporsi');

                      return (
                        <td
                          key={colIdx}
                          className={`py-2.5 px-3.5 whitespace-nowrap ${
                            colIdx > 1 ? 'text-right font-mono' : 'text-slate-800 font-medium'
                          } ${
                            isMainMetric
                              ? 'text-blue-700 font-bold font-mono'
                              : 'text-slate-600'
                          }`}
                        >
                          {val !== null && val !== undefined
                            ? isNumeric
                              ? val.toLocaleString('id-ID')
                              : String(val)
                            : '-'}
                          {isMainMetric &&
                          val !== null &&
                          val !== undefined &&
                          (subIndicator.unit === '%' || h.toLowerCase().includes('proporsi')) &&
                          !h.toLowerCase().includes('jumlah')
                            ? '%'
                            : ''}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={(currentSheet?.headers?.length || 5) + 1}
                    className="p-8 text-center text-xs text-slate-400"
                  >
                    Tidak ada baris data yang cocok dengan kriteria filter atau pencarian.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-blue-500" />
            <span>
              Sumber: Sakernas BPS Kabupaten Tanjung Jabung Barat
              {isTpt ? ' & BPS Provinsi Jambi' : ''}.
            </span>
          </div>
          <div>SE: Standard Error • RSE: Relative Standard Error (%)</div>
        </div>
      </div>
    </div>
  );
}
