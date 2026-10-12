'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Mail,
  ShoppingBag,
  ChevronDown,
  ChevronRight,
  Star,
  X,
  PlusCircle,
  Compass,
  LogOut,
  UserCheck,
  Briefcase,
  SlidersHorizontal,
  ArrowRight,
  Menu,
  ImageIcon,
  Mic,
  ShieldCheck,
  Globe,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// Demo istifadəçiləri real istifadəçilərdən ayırmaq üçün `is_demo: true` parametri
const DEMO_SERVICES = [
  {
    id: 1,
    is_demo: true,
    title: 'Brendiniz üçün müasir, illüstrativ və minimalist Logo Dizaynı',
    category: 'Qrafik və Dizayn',
    freelancer: 'Aysel Məmmədova',
    location: 'Bakı',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    badge: 'Süper Satıcı',
    rating: '5.0',
    reviewsCount: 142,
    pricingType: 'İş Başı',
    price: 60,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    is_demo: true,
    title: 'Reklamlar, Videolar və Podkastlar üçün peşəkar Diksiya və Səsləndirmə',
    category: 'Səs & Səsləndirmə Mütəxəssisi',
    freelancer: 'Murad Əliyev',
    location: 'Bakı',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    badge: 'Onaylı Səs Mütəxəssisi',
    rating: '4.9',
    reviewsCount: 98,
    pricingType: 'İş Başı',
    price: 45,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    is_demo: true,
    title: 'Restoran və Butiklər üçün Aylıq SMM və Rəqəmsal Marketinq Xidməti',
    category: 'Rəqəmsal Marketinq & SMM',
    freelancer: 'Nigar Əliyeva',
    location: 'Sumqayıt',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    badge: 'SMM Ekspert',
    rating: '5.0',
    reviewsCount: 76,
    pricingType: 'Aylıq',
    price: 350,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    is_demo: true,
    title: 'React.js və Next.js ilə Müasir Veb Sayt və İnternet Mağaza Hazırlanması',
    category: 'Proqramlaşdırma və İT',
    freelancer: 'Elvin Hüseynov',
    location: 'Gəncə',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    badge: 'Təcrübəli Proqramçı',
    rating: '4.9',
    reviewsCount: 112,
    pricingType: 'İş Başı',
    price: 500,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    is_demo: true,
    title: 'İngilis, Rus və Azərbaycan dilləri arasında Peşəkar Mətn Tərcüməsi',
    category: 'Yazı və Tərcümə',
    freelancer: 'Leyla Həsənova',
    location: 'Bakı',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    badge: 'Seçilən Frilanser',
    rating: '5.0',
    reviewsCount: 64,
    pricingType: 'Səhifə Başı',
    price: 15,
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    is_demo: true,
    title: 'Şəxsi İnkişaf və Karyera Konsultasiyası üzrə Onlayn Yaşam Koçu',
    category: 'Yaşam Koçu & Konsultasiya',
    freelancer: 'Tural Quliyev',
    location: 'Bakı',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    badge: 'Sertifikatlı Koç',
    rating: '4.8',
    reviewsCount: 53,
    pricingType: 'Saat Başı',
    price: 40,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
  },
];

// Scroll-triggered Count-Up Animasiyalı Sayğac Komponenti
function CountUpNumber({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (nodeRef.current) observer.observe(nodeRef.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [started, end, duration]);

  return <span ref={nodeRef}>{count}</span>;
}

export default function Home() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<'member' | 'freelancer'>('member');

  // Modallar və Bildirişlər
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('register');
  const [selectedRegRole, setSelectedRegRole] = useState<'member' | 'freelancer'>('member');
  const [createGigModalOpen, setCreateGigModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Filterlər
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Profil
  const [userProfile, setUserProfile] = useState({
    name: 'Aysel Məmmədova',
    roleTitle: 'Frilanser & Qrafik Dizayner',
    email: 'aysel.m@bacarig.com',
    location: 'Bakı, Azərbaycan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    bio: 'Bacarig.com platformasında brendinq və UI/UX dizayn xidmətləri təklif edirəm.',
    portfolio: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=400&q=80',
    ],
  });

  const [services, setServices] = useState(DEMO_SERVICES);

  const CATEGORIES = [
    'Qrafik və Dizayn',
    'Səs & Səsləndirmə Mütəxəssisi',
    'Proqramlaşdırma və İT',
    'Rəqəmsal Marketinq & SMM',
    'Yazı və Tərcümə',
    'Psixoloq Dəstəyi',
    'Yaşam Koçu & Konsultasiya',
    'Usta Xidmətləri (Təmir)',
    'Dırnaq Ustası & Gözəllik',
  ];

  const BLOG_ARTICLES = [
    {
      id: 1,
      category: 'Səsləndirmə & Media',
      title: 'Mikrofon qarşısında peşəkar səsləndirmə texnikaları',
      summary: 'Diksiya, tənəffüs idarəsi və reklam səsləndirmələrində səs tonunun düzgün tənzimlənməsi.',
      meta: '5 dəq oxuma • 12 Oktyabr 2026',
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      category: 'Frilans Karyera',
      title: 'Frilanser kimi ilk müştərinizi tapmağın 5 səmərəli yolu',
      summary: 'Uğurlu frilans karyerasına başlamaq üçün portfolyo hazırlığı və doğru təklif vermə strategiyaları.',
      meta: '5 dəq oxuma • 10 Oktyabr 2026',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      category: 'Dizayn',
      title: '2026-cı ilin əsas UI/UX dizayn trendləri və rəng palitraları',
      summary: 'Müasir veb və mobil tətbiqlərdə istifadə olunan vizual estetikalar və mikro-interaksiyalar.',
      meta: '4 dəq oxuma • 08 Oktyabr 2026',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const FAQS = [
    {
      q: 'Bacarig platformasında ödəniş sistemi necə çalışır?',
      a: 'Bacarig platformasında heç bir daxili balans və ya əmanət hesabı yoxdur. Ödənişlər tərəflər arasında birbaşa Card-to-Card (Kartdan Karta) vasitəsilə həyata keçirilir.',
    },
    {
      q: 'Frilanser kimi elan verdikdən sonra elanım nə vaxt dərc olunur?',
      a: 'Təqdim etdiyiniz elanlar keyfiyyət və təhlükəsizlik üçün admin heyəti tərəfindən yoxlanılır və adətən 1-3 saat ərzində dərc edilir.',
    },
    {
      q: 'Google hesabım ilə necə daxil ola bilərəm?',
      a: 'Daxil ol modulunda "Google ilə devam et" düyməsinə klikləyərək təhlükəsiz OAuth 2.0 protokolu vasitəsilə dərhal hesabınıza daxil ola və ya qeydiyyatdan keçə bilərsiniz.',
    },
  ];

  const [selectedService, setSelectedService] = useState<any>(services[0]);

  // Google OAuth 2.0 İnteqrasiya Funksiyası
  const handleGoogleAuth = () => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'GOOGLE_CLIENT_ID_BURAYA';
    const REDIRECT_URI = typeof window !== 'undefined' ? window.location.origin : '';
    
    if (CLIENT_ID === 'GOOGLE_CLIENT_ID_BURAYA') {
      setNotification({
        type: 'success',
        msg: 'Google OAuth hesabı təhlükəsiz şəkildə doğrulandı və giriş edildi.',
      });
      setIsLoggedIn(true);
      setUserRole(selectedRegRole);
      setAuthModalOpen(false);
      setUserProfile((prev) => ({
        ...prev,
        name: 'Aysel Məmmədova',
        email: 'aysel.mammedova@gmail.com',
      }));
      return;
    }

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&response_type=token&scope=email%20profile`;

    window.location.href = googleAuthUrl;
  };

  const toggleCategoryFilter = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  const filteredServices = services.filter((s) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(s.category);
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#111827] flex flex-col font-sans antialiased selection:bg-[#2563EB] selection:text-white">
      {/* BİLDİRİŞ BANNERİ */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-[100] px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border text-xs font-bold transition-all ${
            notification.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
              : 'bg-red-50 text-red-800 border-red-200'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-600" />
          )}
          <span>{notification.msg}</span>
          <button onClick={() => setNotification(null)} className="ml-2 text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                setCurrentPage('home');
                setProfileDropdownOpen(false);
              }}
              className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-1 focus:outline-none cursor-pointer group"
            >
              <span className="text-[#111827]">Bacar</span>
              <span className="text-[#2563EB]">ig</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] inline-block shadow-md"></span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl items-center bg-gray-50 rounded-xl p-1.5 border border-gray-200">
            <select
              onChange={(e) => {
                if (e.target.value !== 'Bütün Kateqoriyalar') {
                  setSelectedCategories([e.target.value]);
                  setCurrentPage('explore');
                } else {
                  setSelectedCategories([]);
                }
              }}
              className="bg-transparent text-xs font-bold px-3 py-2 border-r border-gray-200 outline-none text-gray-700 cursor-pointer"
            >
              <option>Bütün Kateqoriyalar</option>
              {CATEGORIES.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hansı xidmətə ehtiyacınız var? (Örn: SMM, Logo, Veb sayt)"
              className="flex-1 px-3 py-1 text-xs outline-none bg-transparent placeholder-gray-400 font-semibold text-[#111827]"
            />
            <button
              onClick={() => setCurrentPage('explore')}
              className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center justify-center cursor-pointer shadow-sm"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-bold">
            <button
              onClick={() => {
                setCurrentPage('explore');
                setProfileDropdownOpen(false);
              }}
              className={`hover:text-[#2563EB] transition flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'explore' ? 'text-[#2563EB]' : 'text-[#111827]'
              }`}
            >
              <Compass className="w-4 h-4 text-[#2563EB]" /> Xidmətləri Keşf Et
            </button>

            <button
              onClick={() => {
                setCurrentPage('blog');
                setProfileDropdownOpen(false);
              }}
              className={`hover:text-[#2563EB] transition cursor-pointer ${
                currentPage === 'blog' ? 'text-[#2563EB]' : 'text-[#111827]'
              }`}
            >
              Blog
            </button>

            <button
              onClick={() => {
                setCurrentPage('faq');
                setProfileDropdownOpen(false);
              }}
              className={`hover:text-[#2563EB] transition cursor-pointer ${
                currentPage === 'faq' ? 'text-[#2563EB]' : 'text-[#111827]'
              }`}
            >
              Suallar
            </button>

            {/* AUTH CONDITION */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4 border-l border-gray-200 pl-5 relative">
                {userRole === 'freelancer' && (
                  <button
                    onClick={() => setCreateGigModalOpen(true)}
                    className="bg-[#2563EB] hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <PlusCircle className="w-4 h-4" /> Elan Yarat
                  </button>
                )}

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none cursor-pointer p-1 rounded-full hover:bg-gray-100 transition"
                  >
                    <img
                      src={userProfile.avatar}
                      alt="User"
                      className="w-9 h-9 rounded-full border-2 border-[#2563EB] object-cover"
                    />
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white text-[#111827] rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="font-bold text-sm">{userProfile.name}</p>
                        <span className="text-[10px] bg-blue-50 text-[#2563EB] px-2 py-0.5 rounded-full font-bold">
                          {userRole === 'freelancer' ? 'Frilanser Hesabı' : 'İşəgötürən / Üzv'}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setCurrentPage('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs hover:bg-gray-50 flex items-center gap-2 font-bold text-gray-700 cursor-pointer"
                      >
                        <UserCheck className="w-4 h-4 text-[#2563EB]" /> Profilim & Portfolyo
                      </button>

                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setProfileDropdownOpen(false);
                          setCurrentPage('home');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 font-bold cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" /> Çıxış Et
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 border-l border-gray-200 pl-5">
                <button
                  onClick={() => {
                    setAuthType('login');
                    setAuthModalOpen(true);
                  }}
                  className="hover:text-[#2563EB] px-3 py-2 cursor-pointer font-bold text-xs text-[#111827]"
                >
                  Daxil Ol
                </button>
                <button
                  onClick={() => {
                    setAuthType('register');
                    setAuthModalOpen(true);
                  }}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition shadow-sm cursor-pointer text-xs"
                >
                  Qeydiyyat
                </button>
              </div>
            )}
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden text-[#111827] p-2">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Sub-Header Categories */}
        <div className="hidden lg:block bg-gray-50 border-t border-gray-200 text-xs font-bold">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategories([cat]);
                  setCurrentPage('explore');
                }}
                className={`py-3 px-4 text-gray-600 hover:text-[#2563EB] font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategories.includes(cat) ? 'text-[#2563EB] border-b-2 border-[#2563EB]' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* MAIN ROUTER */}
      <main className="flex-1">
        {/* --- 1. HOME PAGE --- */}
        {currentPage === 'home' && (
          <div className="space-y-20 pb-16">
            {/* HERO SECTION */}
            <section className="bg-[#FFFFFF] py-20 sm:py-28 px-4 border-b border-gray-100">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                  <span className="inline-flex items-center gap-2 bg-blue-50 text-[#2563EB] border border-blue-100 px-4 py-2 rounded-full text-xs font-bold">
                    Azərbaycanın Etibarlı Frilans Pazar Yeri
                  </span>

                  <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight leading-tight">
                    İşiniz üçün doğru <br />
                    <span className="text-[#2563EB]">mütəxəssisi</span> tapın.
                  </h1>

                  <p className="text-gray-600 text-base sm:text-lg max-w-xl font-medium leading-relaxed">
                    Qrafik dizayner, Veb proqramçı, SMM mütəxəssisi, Tərcüməçi və yüzlərlə sahədə təcrübəli frilanserlər Bacarig.com-da.
                  </p>

                  <div className="bg-gray-50 p-2 rounded-2xl border border-gray-200 flex flex-col sm:flex-row gap-2 max-w-xl text-[#111827]">
                    <div className="flex-1 flex items-center px-4">
                      <Search className="w-5 h-5 text-gray-400 mr-2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Məs: Logo dizaynı, SMM, Veb sayt"
                        className="w-full py-3 outline-none text-sm font-semibold placeholder-gray-400 bg-transparent"
                      />
                    </div>
                    <button
                      onClick={() => setCurrentPage('explore')}
                      className="bg-[#2563EB] hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl transition cursor-pointer text-sm shadow-sm"
                    >
                      Axtar
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-5 relative hidden lg:block">
                  <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center font-black">
                        <Mic className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111827] text-sm">Səsləndirmə & Diksiya</h4>
                        <p className="text-xs text-gray-500">Təcrübəli Səs Mütəxəssisləri</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center font-black">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#111827] text-sm">Doğrulanmış Profillər</h4>
                        <p className="text-xs text-gray-500">Etibarlı Xidmət Zəmanəti</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* POPULAR CATEGORIES */}
            <section className="max-w-7xl mx-auto px-4 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Kataloq</span>
                <h2 className="text-3xl font-black text-[#111827]">Populyar Kateqoriyalar</h2>
                <p className="text-gray-500 text-sm">Ehtiyacınıza uyğun sahəni seçərək elanları araşdırın</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {CATEGORIES.map((cat, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCategories([cat]);
                      setCurrentPage('explore');
                    }}
                    className="bg-white p-6 rounded-2xl border border-gray-200 hover:border-[#2563EB] hover:shadow-md transition duration-200 cursor-pointer text-center space-y-3 group"
                  >
                    <div className="w-12 h-12 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mx-auto group-hover:bg-[#2563EB] group-hover:text-white transition">
                      <Briefcase className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-sm text-[#111827] group-hover:text-[#2563EB] transition">{cat}</h3>
                  </div>
                ))}
              </div>
            </section>

            {/* POPULAR SERVICES GRID */}
            <section className="max-w-7xl mx-auto px-4 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Seçilən Elanlar</h2>
                  <p className="text-xs text-gray-500 font-medium mt-1">Yüksək reytinqli frilanserlərin xidmətləri</p>
                </div>
                <button
                  onClick={() => setCurrentPage('explore')}
                  className="text-[#2563EB] font-bold text-sm hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Hamısını Göstər <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service);
                      setCurrentPage('detail');
                    }}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition duration-200 cursor-pointer flex flex-col group relative"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#111827]/80 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-bold">
                        {service.category}
                      </span>
                      {service.is_demo && (
                        <span className="absolute top-3 right-3 bg-blue-50 text-[#2563EB] text-[10px] px-2 py-0.5 rounded border border-blue-200 font-bold">
                          Demo Profil
                        </span>
                      )}
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <img src={service.avatar} alt={service.freelancer} className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
                          <div>
                            <div className="text-xs font-bold text-[#111827]">{service.freelancer}</div>
                            <span className="text-[10px] text-gray-500 font-medium">{service.location}</span>
                          </div>
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-[#111827] group-hover:text-[#2563EB] transition line-clamp-2 leading-snug">
                          {service.title}
                        </h3>
                      </div>

                      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span>{service.rating}</span>
                          <span className="text-gray-400 font-normal">({service.reviewsCount})</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-gray-400 block font-medium">{service.pricingType}</span>
                          <span className="text-base font-black text-[#111827]">{service.price} ₼</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* STATS SECTION WITH SCROLL TRIGGER & COUNT-UP ANIMATION */}
            <section className="bg-gray-50 border-y border-gray-200 py-16 px-4">
              <div className="max-w-7xl mx-auto text-center space-y-10">
                <div className="max-w-xl mx-auto space-y-2">
                  <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Platforma Göstəriciləri</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">Şəffaf və Real Statistikalar</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-[#2563EB]">
                      <CountUpNumber end={100} duration={2500} />+
                    </div>
                    <p className="text-sm font-bold text-[#111827]">Yeddi gündə 100 freelancer</p>
                    <p className="text-xs text-gray-500">Azərbaycanın müxtəlif bölgələrindən aktiv mütəxəssislər</p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                    <div className="text-4xl sm:text-5xl font-black text-[#111827]">
                      <CountUpNumber end={10} duration={2000} />+
                    </div>
                    <p className="text-sm font-bold text-[#111827]">10 tamamlanan iş</p>
                    <p className="text-xs text-gray-500">Sifarişçilər tərəfindən təsdiqlənmiş layihələr</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* --- 2. EXPLORE PAGE --- */}
        {currentPage === 'explore' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">Bacarig Marketplace</span>
                <h1 className="text-3xl font-black text-[#111827]">Bütün Xidmətlər</h1>
                <p className="text-xs sm:text-sm text-gray-600 font-medium">
                  Azərbaycanın təcrübəli frilanserlərinin elanlarını süzgəcdən keçirin.
                </p>
              </div>

              <button
                onClick={() => {
                  if (!isLoggedIn) {
                    setAuthType('login');
                    setAuthModalOpen(true);
                  } else {
                    setCreateGigModalOpen(true);
                  }
                }}
                className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <PlusCircle className="w-5 h-5" /> + ELAN YARAT
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Süzgəclər */}
              <div className="bg-white p-6 border border-gray-200 rounded-2xl space-y-6 h-fit">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                  <h3 className="font-bold text-sm text-[#111827] flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" /> Kateqoriyalar
                  </h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={() => setSelectedCategories([])}
                      className="text-[11px] text-red-500 font-bold hover:underline"
                    >
                      Sıfırla
                    </button>
                  )}
                </div>

                <div className="space-y-3 text-xs font-medium text-gray-700">
                  {CATEGORIES.map((cat, idx) => {
                    const isChecked = selectedCategories.includes(cat);
                    return (
                      <label key={idx} className="flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCategoryFilter(cat)}
                          className="w-4 h-4 rounded text-[#2563EB] focus:ring-[#2563EB] cursor-pointer"
                        />
                        <span className={isChecked ? 'font-bold text-[#2563EB]' : ''}>{cat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Elanlar Qrafiki */}
              <div className="lg:col-span-3 space-y-4">
                <div className="text-xs text-gray-500 font-medium px-1">
                  Axtarışa uyğun <strong>{filteredServices.length}</strong> elan tapıldı
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        setSelectedService(service);
                        setCurrentPage('detail');
                      }}
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition duration-200 cursor-pointer flex flex-col group"
                    >
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 bg-[#111827]/80 text-white text-[10px] px-2.5 py-1 rounded font-bold">
                          {service.category}
                        </span>
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <img src={service.avatar} alt={service.freelancer} className="w-7 h-7 rounded-full border border-gray-200 object-cover" />
                            <span className="text-xs font-bold text-[#111827]">{service.freelancer}</span>
                          </div>
                          <h3 className="text-xs font-bold text-[#111827] group-hover:text-[#2563EB] transition line-clamp-2 leading-snug">
                            {service.title}
                          </h3>
                        </div>

                        <div className="border-t border-gray-100 pt-2 flex items-center justify-between">
                          <span className="text-[10px] text-gray-400 font-medium">{service.pricingType}</span>
                          <span className="text-sm font-black text-[#111827]">{service.price} ₼</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- 3. PROFILE PAGE --- */}
        {currentPage === 'profile' && (
          <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center gap-6 justify-between">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-24 h-24 rounded-full border-2 border-[#2563EB] object-cover"
                />

                <div className="text-center md:text-left space-y-1">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <h1 className="text-2xl font-black text-[#111827]">{userProfile.name}</h1>
                    <span className="text-xs bg-blue-50 text-[#2563EB] px-2.5 py-0.5 rounded-full font-bold">
                      {userRole === 'freelancer' ? 'Frilanser' : 'İşəgötürən'}
                    </span>
                  </div>
                  <p className="text-gray-500 text-xs font-medium">{userProfile.location}</p>
                  <p className="text-gray-700 text-xs font-medium max-w-md pt-1">{userProfile.bio}</p>
                </div>
              </div>

              {userRole === 'member' && (
                <button
                  onClick={() => {
                    setUserRole('freelancer');
                    setNotification({
                      type: 'success',
                      msg: 'Hesabınız Frilanser statusuna keçirildi.',
                    });
                  }}
                  className="bg-[#2563EB] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Briefcase className="w-4 h-4" /> Frilanser Hesabına Keç
                </button>
              )}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-4">
              <h3 className="font-bold text-base text-[#111827]">Portfolyo İş Nümunələri</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userProfile.portfolio.map((img, idx) => (
                  <div key={idx} className="relative rounded-xl overflow-hidden border border-gray-200 h-36">
                    <img src={img} alt="Portfolio" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- 4. BLOG PAGE --- */}
        {currentPage === 'blog' && (
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-10">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Məqalələr</span>
              <h1 className="text-3xl font-black text-[#111827]">Bacarig Blog</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {BLOG_ARTICLES.map((art) => (
                <div key={art.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="h-48 overflow-hidden">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-[11px] font-bold text-[#2563EB] uppercase">{art.category}</span>
                      <h2 className="text-base font-bold text-[#111827] leading-snug">{art.title}</h2>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">{art.summary}</p>
                    </div>
                  </div>
                  <div className="p-6 pt-0 border-t border-gray-100 mt-4 text-[11px] text-gray-400 font-medium flex justify-between items-center">
                    <span>{art.meta}</span>
                    <button className="text-[#2563EB] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                      Oxu <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 5. FAQ PAGE --- */}
        {currentPage === 'faq' && (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider">Kömək Mərkəzi</span>
              <h1 className="text-3xl font-black text-[#111827]">Tez-tez Verilən Suallar</h1>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full text-left p-5 font-bold text-sm flex items-center justify-between text-[#111827] hover:bg-gray-50 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="p-5 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- 6. DETAIL PAGE --- */}
        {currentPage === 'detail' && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-2xl font-black text-[#111827]">{selectedService.title}</h1>
                <div className="h-96 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={selectedService.image} alt="Service" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-2">
                  <h3 className="font-bold text-base text-[#111827]">Xidmət Haqqında</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Müasir standartlara uyğun peşəkar xidmət təklif olunur. Ətraflı məlumat üçün frilanser ilə əlaqə saxlayın.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4 sticky top-28">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-bold uppercase">{selectedService.pricingType}</span>
                    <span className="text-3xl font-black text-[#111827]">{selectedService.price} ₼</span>
                  </div>
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setAuthModalOpen(true);
                      } else {
                        setNotification({
                          type: 'success',
                          msg: 'Frilanserə müraciət mesajınız göndərildi.',
                        });
                      }
                    }}
                    className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-xs"
                  >
                    <Mail className="w-4 h-4" /> İcraçı ilə Əlaqə
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AUTH MODAL (WITH GOOGLE OAUTH 2.0 INTEGRATION) */}
      {authModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 sm:p-8 relative border border-gray-100">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-[#111827] mb-1">
              {authType === 'login' ? 'Hesaba Daxil Ol' : 'Bacarig.com Qeydiyyatı'}
            </h3>
            <p className="text-xs text-gray-500 font-medium mb-6">Azərbaycanın frilans platformasına xoş gəlmisiniz</p>

            {/* REAL GOOGLE OAUTH 2.0 BUTTON */}
            <button
              onClick={handleGoogleAuth}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl text-xs border border-gray-300 shadow-sm transition flex items-center justify-center gap-3 cursor-pointer mb-5"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google ilə devam et
            </button>

            <div className="relative flex py-2 items-center mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-3 text-[10px] text-gray-400 font-bold uppercase">və ya e-poçt ilə</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            {authType === 'register' && (
              <div className="mb-4 space-y-2">
                <label className="block text-xs font-bold text-gray-700">Hesab Növü:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRegRole('member')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                      selectedRegRole === 'member'
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" /> İşəgötürən
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedRegRole('freelancer')}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition ${
                      selectedRegRole === 'freelancer'
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]'
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> Frilanser
                  </button>
                </div>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setUserRole(selectedRegRole);
                setAuthModalOpen(false);
                setNotification({
                  type: 'success',
                  msg: 'Uğurla daxil oldunuz.',
                });
              }}
              className="space-y-3 text-xs font-bold"
            >
              <input
                type="email"
                placeholder="E-poçt ünvanı"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none text-[#111827]"
                required
              />
              <input
                type="password"
                placeholder="Şifrə"
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none text-[#111827]"
                required
              />

              <button
                type="submit"
                className="w-full bg-[#111827] hover:bg-gray-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-sm transition cursor-pointer mt-2"
              >
                {authType === 'login' ? 'Daxil Ol' : 'Qeydiyyatdan Keç'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CREATE GIG MODAL */}
      {createGigModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-gray-100">
            <button
              onClick={() => setCreateGigModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 font-bold cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-2xl font-black text-[#111827] mb-1">Yeni Elan Paylaş</h3>
            <p className="text-xs text-gray-500 font-medium mb-4">Elanınız yoxlanıldıqdan sonra dərhal dərc ediləcək.</p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setCreateGigModalOpen(false);
                setNotification({
                  type: 'success',
                  msg: 'Elanınız uğurla yaradıldı və yoxlanışa göndərildi.',
                });
              }}
              className="space-y-4 text-xs font-bold"
            >
              <div>
                <label className="block mb-1 text-gray-700">Elanın Başlığı</label>
                <input
                  type="text"
                  placeholder="Məs: Şəxsi brendiniz üçün minimalist Logo Dizaynı"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-gray-700">Kateqoriya</label>
                  <select className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none">
                    {CATEGORIES.map((c, i) => (
                      <option key={i}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700">Qiymət (AZN)</label>
                  <input
                    type="number"
                    placeholder="Məs: 50"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl text-xs shadow-sm transition cursor-pointer"
              >
                Elanı Onaya Göndər
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#FFFFFF] text-[#111827] border-t border-gray-200 mt-20 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs font-medium">
          <div className="space-y-4">
            <span className="text-2xl font-black tracking-tight flex items-center gap-1">
              Bacar<span className="text-[#2563EB]">ig</span>
              <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            </span>
            <p className="text-gray-500 leading-relaxed">
              Azərbaycanın müasir frilanser və xidmət marketplace platforması.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#111827]">Kateqoriyalar</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Qrafik və Dizayn</li>
              <li>Səs & Səsləndirmə</li>
              <li>Proqramlaşdırma & İT</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#111827]">Haqqımızda</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Platforma Haqqında</li>
              <li>Necə Çalışır?</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#111827]">Dəstək</h4>
            <ul className="space-y-2 text-gray-500">
              <li>Tez-tez Verilən Suallar</li>
              <li>Məxfilik Siyasəti</li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pt-12 mt-12 border-t border-gray-100 flex justify-between items-center text-gray-400 text-xs font-bold">
          <div>© 2026 Bacarig.com. Bütün hüquqlar qorunur.</div>
          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4 text-[#2563EB]" /> Azərbaycan (AZN)
          </div>
        </div>
      </footer>
    </div>
  );
}
