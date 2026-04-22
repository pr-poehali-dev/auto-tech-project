import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_PRODUCT = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/95fc9598-4bae-4074-bd3b-1fff0c3ec9b1.jpg";
const IMG_COLLECTION = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/11cdbca6-33e5-441b-b866-8ad881cdfdbd.jpg";
const IMG_TEAM = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/623a0a22-3cea-43fe-a8bf-25a8fc73a04b.jpg";

const catalogItems = [
  { id: 1, name: "Модель PRO X1", category: "Электроника", price: "89 900 ₽", badge: "Хит", img: IMG_PRODUCT },
  { id: 2, name: "Коллекция LUXE", category: "Аксессуары", price: "24 500 ₽", badge: "Новинка", img: IMG_COLLECTION },
  { id: 3, name: "Набор ELITE", category: "Премиум", price: "149 000 ₽", badge: "Топ", img: IMG_PRODUCT },
  { id: 4, name: "Серия ULTRA", category: "Электроника", price: "67 000 ₽", badge: null, img: IMG_COLLECTION },
  { id: 5, name: "Комплект STUDIO", category: "Аксессуары", price: "39 900 ₽", badge: "Акция", img: IMG_TEAM },
  { id: 6, name: "Флагман MAX", category: "Премиум", price: "210 000 ₽", badge: "Эксклюзив", img: IMG_PRODUCT },
];

const categories = ["Все", "Электроника", "Аксессуары", "Премиум"];

const services = [
  { icon: "Zap", title: "Экспресс-доставка", desc: "Доставка до двери в течение 24 часов по всей России", color: "#a855f7" },
  { icon: "Shield", title: "Гарантия качества", desc: "Официальная гарантия на все товары от 1 до 3 лет", color: "#00f5ff" },
  { icon: "Headphones", title: "Поддержка 24/7", desc: "Персональный менеджер и круглосуточная техподдержка", color: "#f72585" },
  { icon: "RefreshCw", title: "Возврат за 30 дней", desc: "Простой возврат без вопросов в течение 30 дней", color: "#39ff14" },
  { icon: "Star", title: "VIP-программа", desc: "Эксклюзивные предложения и ранний доступ к новинкам", color: "#a855f7" },
  { icon: "Package", title: "Персональный подбор", desc: "Подберём идеальный вариант под ваш запрос и бюджет", color: "#00f5ff" },
];

const galleryItems = [
  { id: 1, type: "photo", img: IMG_PRODUCT, title: "Флагманская линейка 2025" },
  { id: 2, type: "photo", img: IMG_COLLECTION, title: "Коллекция LUXE Edition" },
  { id: 3, type: "video", img: IMG_TEAM, title: "Обзор PRO X1 — видео", duration: "3:24" },
  { id: 4, type: "photo", img: IMG_PRODUCT, title: "Детали и качество" },
  { id: 5, type: "video", img: IMG_COLLECTION, title: "Распаковка ELITE Set", duration: "7:12" },
  { id: 6, type: "photo", img: IMG_TEAM, title: "Наша команда" },
];

const badgeColors: Record<string, string> = {
  "Хит": "bg-purple-500 text-white",
  "Новинка": "bg-cyan-400 text-black",
  "Топ": "bg-pink-500 text-white",
  "Акция": "bg-green-400 text-black",
  "Эксклюзив": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeSection, setActiveSection] = useState("catalog");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const filtered = catalogItems.filter(
    (item) => activeCategory === "Все" || item.category === activeCategory
  );

  const filteredGallery = galleryItems.filter(
    (item) => galleryFilter === "all" || item.type === galleryFilter
  );

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-cyan-400/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-pink-500/8 rounded-full blur-3xl" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-black text-lg tracking-tight">
            <span className="text-purple-400">NEO</span>
            <span className="text-white">STORE</span>
          </span>
          <div className="flex items-center gap-1">
            {[
              { id: "catalog", label: "Каталог" },
              { id: "services", label: "Услуги" },
              { id: "gallery", label: "Галерея" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-purple-600/20 text-purple-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-body font-semibold hover:opacity-90 transition-opacity">
            Связаться
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/15 border border-purple-500/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-body text-white/70">Новая коллекция 2025</span>
              </div>
              <h1 className="font-display font-black text-5xl lg:text-7xl leading-[1.05] tracking-tight mb-6">
                <span className="text-white">Будущее</span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  уже здесь
                </span>
              </h1>
              <p className="font-body text-white/50 text-lg leading-relaxed mb-10 max-w-md">
                Эксклюзивные товары премиум-класса. Передовые технологии. Непревзойдённое качество для тех, кто не идёт на компромисс.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => scrollTo("catalog")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-body font-semibold rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105"
                >
                  Смотреть каталог
                </button>
                <button
                  onClick={() => scrollTo("gallery")}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-body font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  Галерея
                </button>
              </div>
            </div>
            <div className="relative animate-float">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 40px rgba(168,85,247,0.3)" }}>
                <img src={IMG_PRODUCT} alt="Hero" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-body text-white/60 text-xs mb-1">Флагман сезона</p>
                        <p className="font-display font-bold text-white text-lg">PRO X1 Ultra</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-white/60 text-xs mb-1">от</p>
                        <p className="font-display font-bold text-cyan-400 text-xl">89 900 ₽</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-2xl opacity-40" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-cyan-400 rounded-full blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-body text-purple-400 text-sm font-semibold uppercase tracking-widest mb-3">Каталог</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-tight">
                Наши товары
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-purple-500 text-white scale-105"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {item.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-body font-bold px-3 py-1 rounded-full ${badgeColors[item.badge] || "bg-white text-black"}`}>
                      {item.badge}
                    </span>
                  )}
                  <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Icon name="Heart" size={14} className="text-white" />
                  </button>
                </div>
                <div className="p-5">
                  <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="font-display font-bold text-white text-lg mb-3">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-cyan-400 text-xl">{item.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-body font-semibold rounded-lg hover:opacity-90 transition-opacity">
                      Купить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 py-24 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Услуги</p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white mb-4">
              Всё для вашего
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                удобства
              </span>
            </h2>
            <p className="font-body text-white/40 max-w-md mx-auto">
              Мы позаботились о каждой детали, чтобы покупка была максимально комфортной
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: service.color }}
                />
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}40` }}
                >
                  <Icon name={service.icon} fallback="Star" size={22} style={{ color: service.color }} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2 relative z-10">{service.title}</h3>
                <p className="font-body text-white/50 text-sm leading-relaxed relative z-10">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div className="mt-12 relative rounded-3xl overflow-hidden">
            <img src={IMG_TEAM} alt="Team" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10">
              <div>
                <h3 className="font-display font-black text-3xl text-white mb-3">Нужна консультация?</h3>
                <p className="font-body text-white/60 mb-6 max-w-sm">Наши эксперты помогут подобрать идеальное решение под ваши задачи</p>
                <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-body font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-body text-pink-400 text-sm font-semibold uppercase tracking-widest mb-3">Галерея</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-tight">
                Фото & Видео
              </h2>
            </div>
            <div className="flex gap-2">
              {[
                { key: "all", label: "Всё" },
                { key: "photo", label: "Фото" },
                { key: "video", label: "Видео" },
              ].map((f) => (
                <button
                  key={f.key}
                  onClick={() => setGalleryFilter(f.key)}
                  className={`px-5 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                    galleryFilter === f.key
                      ? "bg-pink-500 text-white scale-105"
                      : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-[220px]">
            {filteredGallery.map((item, idx) => (
              <div
                key={item.id}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer ${
                  idx === 0 ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
                onClick={() => setSelectedItem(item.id)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon name="Play" size={20} className="text-white ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <p className="font-body font-semibold text-white text-sm">{item.title}</p>
                    {item.type === "video" && item.duration && (
                      <span className="text-xs font-body text-white/60 bg-black/40 px-2 py-1 rounded-md">
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="max-w-4xl w-full animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const item = galleryItems.find((g) => g.id === selectedItem);
              if (!item) return null;
              return (
                <div className="rounded-2xl overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full max-h-[75vh] object-cover" />
                  <div className="bg-card p-4 flex items-center justify-between">
                    <p className="font-body font-semibold text-white">{item.title}</p>
                    <span className="text-xs font-body text-white/40 uppercase">{item.type === "video" ? "Видео" : "Фото"}</span>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-black text-lg">
            <span className="text-purple-400">NEO</span>
            <span className="text-white">STORE</span>
          </span>
          <p className="font-body text-white/30 text-sm">© 2025 NEOSTORE. Все права защищены.</p>
          <div className="flex gap-4">
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Instagram" size={16} className="text-white/60" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Send" size={16} className="text-white/60" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Phone" size={16} className="text-white/60" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}