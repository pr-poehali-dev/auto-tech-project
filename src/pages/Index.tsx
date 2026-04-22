import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_MANIPULATOR = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/6bbd12e4-13c1-4dbd-b44d-cd99db5a6f8d.jpg";
const IMG_EVACUATOR = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/3f5f5a09-e224-46ca-9e69-0f87780bb474.jpg";
const IMG_LOADER = "https://cdn.poehali.dev/projects/8aeef14c-6c80-4e87-a3f2-fdbf827bf2c6/files/073539e7-1263-4648-b293-1a6e297abe2c.jpg";

const catalogItems = [
  { id: 1, name: "Манипулятор 5 т", category: "Манипуляторы", price: "от 4 500 ₽/час", badge: "Хит", img: IMG_MANIPULATOR, desc: "Грузоподъёмность 5 тонн, стрела 12 м" },
  { id: 2, name: "Эвакуатор частичная погрузка", category: "Эвакуаторы", price: "от 2 000 ₽", badge: "Популярно", img: IMG_EVACUATOR, desc: "Для легковых авто и малых грузов" },
  { id: 3, name: "Погрузчик складской", category: "Погрузчики", price: "от 1 800 ₽/час", badge: "Быстро", img: IMG_LOADER, desc: "Грузоподъёмность до 3 тонн" },
  { id: 4, name: "Манипулятор 10 т", category: "Манипуляторы", price: "от 7 000 ₽/час", badge: "Мощный", img: IMG_MANIPULATOR, desc: "Грузоподъёмность 10 тонн, стрела 18 м" },
  { id: 5, name: "Эвакуатор полная погрузка", category: "Эвакуаторы", price: "от 3 500 ₽", badge: null, img: IMG_EVACUATOR, desc: "Для кроссоверов, минивэнов и внедорожников" },
  { id: 6, name: "Погрузчик телескопический", category: "Погрузчики", price: "от 5 500 ₽/час", badge: "Универсальный", img: IMG_LOADER, desc: "Высота подъёма до 7 м, вылет стрелы 4 м" },
];

const categories = ["Все", "Манипуляторы", "Эвакуаторы", "Погрузчики"];

const services = [
  { icon: "Clock", title: "Выезд за 30 минут", desc: "Моментально реагируем на заявку и выезжаем в течение 30 минут в любую точку города", color: "#a855f7" },
  { icon: "Phone", title: "Диспетчер 24/7", desc: "Принимаем заявки круглосуточно, без выходных и праздников", color: "#00f5ff" },
  { icon: "Shield", title: "Страхование груза", desc: "Все перевозки застрахованы. Несём полную ответственность за сохранность груза", color: "#f72585" },
  { icon: "Truck", title: "Весь парк в наличии", desc: "Манипуляторы, эвакуаторы, погрузчики — всегда свободны и готовы к выезду", color: "#f59e0b" },
  { icon: "MapPin", title: "Работаем по региону", desc: "Покрываем весь регион и межгород — везём куда нужно без ограничений", color: "#a855f7" },
  { icon: "FileText", title: "Договор и чеки", desc: "Официально работаем с ИП и юрлицами, предоставляем все закрывающие документы", color: "#00f5ff" },
];

const galleryItems = [
  { id: 1, type: "photo", img: IMG_MANIPULATOR, title: "Манипулятор 10 тонн на объекте" },
  { id: 2, type: "photo", img: IMG_EVACUATOR, title: "Эвакуатор — ночной выезд" },
  { id: 3, type: "video", img: IMG_LOADER, title: "Работа погрузчика на складе", duration: "2:14" },
  { id: 4, type: "photo", img: IMG_MANIPULATOR, title: "Монтаж конструкций манипулятором" },
  { id: 5, type: "video", img: IMG_EVACUATOR, title: "Эвакуация внедорожника", duration: "1:47" },
  { id: 6, type: "photo", img: IMG_LOADER, title: "Телескопический погрузчик" },
];

const badgeColors: Record<string, string> = {
  "Хит": "bg-purple-500 text-white",
  "Популярно": "bg-cyan-400 text-black",
  "Быстро": "bg-green-400 text-black",
  "Мощный": "bg-pink-500 text-white",
  "Универсальный": "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
};

export default function Index() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [activeSection, setActiveSection] = useState("catalog");
  const [galleryFilter, setGalleryFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  const [form, setForm] = useState({ tech: "", date: "", name: "", phone: "", comment: "" });
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const techOptions = [
    "Манипулятор 5 т",
    "Манипулятор 10 т",
    "Эвакуатор (частичная погрузка)",
    "Эвакуатор (полная погрузка)",
    "Погрузчик складской",
    "Погрузчик телескопический",
    "Другая техника",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setTimeout(() => {
      setFormLoading(false);
      setFormSent(true);
    }, 1200);
  };

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
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-400/6 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-cyan-500/6 rounded-full blur-3xl" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <Icon name="Truck" size={16} className="text-black" />
            </div>
            <span className="font-display font-black text-base tracking-tight">
              <span className="text-amber-400">СПЕЦ</span>
              <span className="text-white">ТЕХНИКА</span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            {[
              { id: "catalog", label: "Каталог" },
              { id: "services", label: "Услуги" },
              { id: "gallery", label: "Галерея" },
              { id: "order", label: "Заявка" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-amber-500/20 text-amber-400"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <a
            href="tel:+79000000000"
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-body font-bold hover:opacity-90 transition-opacity"
          >
            <Icon name="Phone" size={14} className="text-black" />
            Заказать
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 pt-36 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/25 mb-6">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-body text-green-400 font-medium">Свободна техника — выезд сегодня</span>
              </div>
              <h1 className="font-display font-black text-5xl lg:text-7xl leading-[1.0] tracking-tight mb-6">
                <span className="text-white">Вся</span>{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">спецтехника</span>
                <br />
                <span className="text-white">в одном</span>
                <br />
                <span className="text-white/40">месте</span>
              </h1>
              <p className="font-body text-white/50 text-lg leading-relaxed mb-8 max-w-md">
                Манипуляторы, эвакуаторы, погрузчики — аренда с водителем. Выезд за 30 минут, страховка груза, работа круглосуточно.
              </p>

              {/* Stats */}
              <div className="flex gap-6 mb-10">
                {[
                  { val: "150+", label: "единиц техники" },
                  { val: "30 мин", label: "время выезда" },
                  { val: "24/7", label: "диспетчер" },
                ].map((s) => (
                  <div key={s.val}>
                    <p className="font-display font-black text-2xl text-amber-400">{s.val}</p>
                    <p className="font-body text-white/40 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => scrollTo("catalog")}
                  className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-body font-bold rounded-xl hover:opacity-90 transition-all duration-200 hover:scale-105"
                >
                  Выбрать технику
                </button>
                <button
                  onClick={() => scrollTo("services")}
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white font-body font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 hover:scale-105"
                >
                  Наши услуги
                </button>
              </div>
            </div>

            <div className="relative animate-float">
              <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: "0 0 50px rgba(251,191,36,0.2)" }}>
                <img src={IMG_MANIPULATOR} alt="Манипулятор" className="w-full h-[480px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-md bg-white/10 border border-white/15 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-body text-white/50 text-xs mb-1">Флагман парка</p>
                        <p className="font-display font-bold text-white text-base">Манипулятор 10 тонн</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body text-white/50 text-xs mb-1">от</p>
                        <p className="font-display font-bold text-amber-400 text-xl">7 000 ₽/час</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-28 h-28 bg-amber-400 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500 rounded-full blur-2xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-body text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Каталог техники</p>
              <h2 className="font-display font-black text-4xl lg:text-5xl text-white leading-tight">
                Выберите технику
              </h2>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-amber-500 text-black font-bold scale-105"
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
                className="group relative bg-card rounded-2xl overflow-hidden border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{ animationDelay: `${idx * 0.08}s` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  {item.badge && (
                    <span className={`absolute top-4 left-4 text-xs font-body font-bold px-3 py-1 rounded-full ${badgeColors[item.badge] || "bg-amber-400 text-black"}`}>
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="font-body text-white/40 text-xs uppercase tracking-widest mb-1">{item.category}</p>
                  <h3 className="font-display font-bold text-white text-lg mb-1">{item.name}</h3>
                  <p className="font-body text-white/40 text-sm mb-4">{item.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-amber-400 text-lg">{item.price}</span>
                    <button
                      onClick={() => {
                        setForm((f) => ({ ...f, tech: item.name }));
                        scrollTo("order");
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-black text-sm font-body font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Заказать
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-body text-cyan-400 text-sm font-semibold uppercase tracking-widest mb-3">Почему выбирают нас</p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white mb-4">
              Надёжно.
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Быстро. Выгодно.
              </span>
            </h2>
            <p className="font-body text-white/40 max-w-md mx-auto">
              10 лет на рынке спецтехники. Тысячи выполненных заявок. Доверяйте профессионалам.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="group relative bg-card rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
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
            <img src={IMG_EVACUATOR} alt="Эвакуатор" className="w-full h-64 object-cover object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-10">
              <div>
                <h3 className="font-display font-black text-3xl text-white mb-2">Нужна техника прямо сейчас?</h3>
                <p className="font-body text-white/60 mb-6 max-w-sm">Звоните — диспетчер ответит немедленно и оформит заявку за 2 минуты</p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="tel:+79000000000"
                    className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-body font-bold rounded-xl hover:opacity-90 transition-opacity"
                  >
                    <Icon name="Phone" size={16} className="text-black" />
                    Позвонить
                  </a>
                  <button className="flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 text-white font-body font-semibold rounded-xl hover:bg-white/15 transition-colors backdrop-blur-sm">
                    <Icon name="MessageCircle" size={16} className="text-white" />
                    Написать
                  </button>
                </div>
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
              <p className="font-body text-pink-400 text-sm font-semibold uppercase tracking-widest mb-3">Наши работы</p>
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

      {/* ORDER FORM */}
      <section id="order" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Онлайн-заявка</p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white mb-4">
              Оставьте заявку
            </h2>
            <p className="font-body text-white/40 max-w-sm mx-auto">
              Укажите нужную технику и дату — перезвоним за 10 минут и уточним детали
            </p>
          </div>

          <div className="relative bg-card rounded-3xl border border-white/8 overflow-hidden">
            {/* Glow corner */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            {formSent ? (
              <div className="relative z-10 flex flex-col items-center justify-center py-20 px-8 text-center">
                <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-6">
                  <Icon name="CheckCircle" size={36} className="text-green-400" />
                </div>
                <h3 className="font-display font-black text-2xl text-white mb-3">Заявка принята!</h3>
                <p className="font-body text-white/50 mb-8 max-w-xs">
                  Наш диспетчер свяжется с вами в течение 10 минут для подтверждения
                </p>
                <button
                  onClick={() => { setFormSent(false); setForm({ tech: "", date: "", name: "", phone: "", comment: "" }); }}
                  className="px-6 py-3 bg-white/8 border border-white/12 text-white/70 font-body rounded-xl hover:bg-white/12 transition-colors text-sm"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10 p-8 lg:p-10 grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* Техника */}
                <div className="sm:col-span-2">
                  <label className="block font-body text-white/60 text-sm mb-2">Какая техника нужна *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                    {techOptions.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, tech: t }))}
                        className={`px-3 py-2.5 rounded-xl text-sm font-body font-medium text-left transition-all duration-150 border ${
                          form.tech === t
                            ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                            : "bg-white/4 border-white/8 text-white/50 hover:border-white/20 hover:text-white/80"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Дата */}
                <div>
                  <label className="block font-body text-white/60 text-sm mb-2">Дата выезда *</label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all [color-scheme:dark]"
                  />
                </div>

                {/* Имя */}
                <div>
                  <label className="block font-body text-white/60 text-sm mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    placeholder="Иван"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Телефон */}
                <div className="sm:col-span-2">
                  <label className="block font-body text-white/60 text-sm mb-2">Номер телефона *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (___) ___-__-__"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all"
                  />
                </div>

                {/* Комментарий */}
                <div className="sm:col-span-2">
                  <label className="block font-body text-white/60 text-sm mb-2">Комментарий <span className="text-white/30">(необязательно)</span></label>
                  <textarea
                    rows={3}
                    placeholder="Адрес, особенности объекта, количество часов..."
                    value={form.comment}
                    onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-amber-500/60 focus:bg-white/8 transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="sm:col-span-2 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between pt-2">
                  <p className="font-body text-white/30 text-xs max-w-xs">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                  <button
                    type="submit"
                    disabled={!form.tech || !form.date || !form.name || !form.phone || formLoading}
                    className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-body font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {formLoading ? (
                      <>
                        <Icon name="Loader" size={16} className="text-black animate-spin" />
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Icon name="Send" size={16} className="text-black" />
                        Отправить заявку
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/92 backdrop-blur-xl flex items-center justify-center p-6"
          onClick={() => setSelectedItem(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setSelectedItem(null)}
          >
            <Icon name="X" size={18} className="text-white" />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
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
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <Icon name="Truck" size={14} className="text-black" />
              </div>
              <span className="font-display font-black text-base">
                <span className="text-amber-400">СПЕЦ</span>
                <span className="text-white">ТЕХНИКА</span>
              </span>
            </div>
            <p className="font-body text-white/30 text-sm">Аренда спецтехники с водителем</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <a href="tel:+79000000000" className="font-display font-bold text-white text-xl hover:text-amber-400 transition-colors">
              +7 (900) 000-00-00
            </a>
            <p className="font-body text-white/30 text-xs">Звонки принимаются 24/7</p>
          </div>
          <div className="flex gap-3">
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Instagram" size={16} className="text-white/60" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="Send" size={16} className="text-white/60" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="MessageCircle" size={16} className="text-white/60" />
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5">
          <p className="font-body text-white/20 text-sm text-center">© 2025 СПЕЦТЕХНИКА. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}