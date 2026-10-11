/**
 * About page content, English and Arabic. Facts only (docs/CONTENT_FACTS.md).
 * TODO for Malik: add one honest sentence about 2020-2026 (between graduation and the Digital Hub)
 * under `timeline` if you want the gap addressed. Nothing is invented here on purpose.
 */

export type Bilingual = { en: string; ar: string };

export const about = {
  intro: {
    en: "I am a full-stack developer who likes systems with rules: who may see what, what may change, and what must never be lost. I work in TypeScript and Python, and I care about the boundaries between services as much as the screens.",
    ar: "أنا مطوّر ويب متكامل أحب الأنظمة ذات القواعد: من يرى ماذا، وما الذي يجوز تغييره، وما الذي لا يجوز فقدانه أبدًا. أعمل بـ TypeScript وPython، وأهتم بالحدود بين الخدمات بقدر اهتمامي بالشاشات.",
  },
  timeline: [
    {
      when: "Now",
      whenAr: "الآن",
      title: { en: "Full-Stack Web Development & AI Intern, The Digital Hub (UNRWA)", ar: "متدرب تطوير ويب متكامل وذكاء اصطناعي، The Digital Hub (الأونروا)" },
      period: "May 2026 - Oct 2026",
      body: {
        en: "An intensive programme across React, Next.js, Vue and Nuxt, Node and Express, FastAPI and Django REST Framework, with relational and document databases, authentication, RBAC, testing, CI/CD and AI integrations. I led the OptiCart (3 people) and InsightFlow (5 people) team projects, was the primary developer on ChargeHub, and built Interview Lab for the cohort. Certificate expected October 2026.",
        ar: "برنامج مكثف يغطي React وNext.js وVue وNuxt وNode وExpress وFastAPI وDjango REST Framework، مع قواعد بيانات علائقية ووثائقية، ومصادقة، وصلاحيات، واختبارات، وCI/CD، وتكاملات ذكاء اصطناعي. قدت مشروعي OptiCart (ثلاثة أشخاص) وInsightFlow (خمسة أشخاص)، وكنت المطوّر الرئيسي في ChargeHub، وبنيت Interview Lab للدفعة. الشهادة متوقعة في تشرين الأول ٢٠٢٦.",
      },
    },
    {
      when: "Alongside",
      whenAr: "بالتوازي",
      title: { en: "Tawzeevo, sole developer and product owner", ar: "Tawzeevo، مطوّر وحيد ومالك المنتج" },
      period: "2026, ongoing",
      body: {
        en: "A multi-tenant operations platform for cash-van distributors in Lebanon, built phase by phase with written contracts, decision logs and a verification gate on every milestone. Eight of ten phases are delivered. It is the project that taught me the most about money, offline systems and saying no to features.",
        ar: "منصة عمليات متعددة المستأجرين لموزعي البيع من الشاحنات في لبنان، بُنيت مرحلةً بمرحلة بعقود مكتوبة وسجلات قرارات وبوابة تحقق عند كل معلم. ثماني مراحل من عشر مُنجزة. إنه المشروع الذي علّمني أكثر عن المال والأنظمة دون اتصال وقول لا للميزات.",
      },
    },
    {
      when: "Before",
      whenAr: "قبل ذلك",
      title: { en: "B.S. in Computer Science, Lebanese International University, Saida", ar: "بكالوريوس في علوم الحاسوب، الجامعة اللبنانية الدولية، صيدا" },
      period: "2016 - 2020",
      body: {
        en: "The degree gave me the fundamentals: data structures, databases, networks, software engineering. The habit of writing things down before building them came later, from shipping with other people.",
        ar: "منحتني الشهادة الأساسيات: هياكل البيانات وقواعد البيانات والشبكات وهندسة البرمجيات. أما عادة كتابة الأشياء قبل بنائها فجاءت لاحقًا، من العمل مع آخرين.",
      },
    },
  ],
  howIWork: {
    title: { en: "How I work", ar: "كيف أعمل" },
    items: [
      {
        title: { en: "Write the contract first", ar: "اكتب العقد أولًا" },
        body: {
          en: "Every project starts with a project contract, a locked tech stack and a phase index. Decisions get numbered entries with the alternative that was rejected. Tawzeevo has 90 of them.",
          ar: "كل مشروع يبدأ بعقد مشروع، وتقنيات مثبتة، وفهرس مراحل. القرارات تحصل على مدخلات مرقمة مع البديل المرفوض. في Tawzeevo تسعون منها.",
        },
      },
      {
        title: { en: "Make the invariant impossible to break", ar: "اجعل كسر القاعدة مستحيلًا" },
        body: {
          en: "If a rule matters, it lives in the database or the type system, not in a code review comment. Unique indexes, row-level security, append-only tables, exhaustive transition maps.",
          ar: "إذا كانت القاعدة مهمة فهي تعيش في قاعدة البيانات أو نظام الأنواع، لا في تعليق مراجعة. فهارس فريدة، أمان مستوى الصف، جداول لا تُمحى، خرائط انتقال شاملة.",
        },
      },
      {
        title: { en: "Verify, then claim", ar: "تحقق ثم ادّعِ" },
        body: {
          en: "Tests run against a real database. ChargeHub has a harness that checks every documented behaviour; a number on this site is either measured or absent.",
          ar: "الاختبارات تعمل على قاعدة بيانات حقيقية. في ChargeHub أداة تفحص كل سلوك موثق؛ أي رقم في هذا الموقع إما مقاس أو غير موجود.",
        },
      },
      {
        title: { en: "Lead by removing ambiguity", ar: "قُد بإزالة الغموض" },
        body: {
          en: "In team projects I assign one owner per folder, document every page and its replacement, and review every pull request. Five people shipped InsightFlow without a merge war.",
          ar: "في المشاريع الجماعية أعيّن مالكًا واحدًا لكل مجلد، وأوثق كل صفحة وبديلها، وأراجع كل طلب دمج. خمسة أشخاص شحنوا InsightFlow دون حرب دمج.",
        },
      },
    ],
  },
  ai: {
    title: { en: "How I use AI tools", ar: "كيف أستخدم أدوات الذكاء الاصطناعي" },
    body: {
      en: [
        "Every repository I work on has an AGENTS.md and a CLAUDE.md: what the project is, which document to read for which task, and the rules that must not be broken. Coding agents (Codex, Aider, Claude) implement against those documents, and I review the diff the way I would review a colleague's.",
        "The gate is verification, not trust. Agents do not merge; tests, type checks, lint and real-browser flows do. When an agent's output is wrong, the fix goes into the document that let it be wrong, so the next run cannot repeat it.",
        "When AI is part of the product, it gets the smallest possible job. In ChargeHub the model turns one message into an editable draft and never sees account or booking data; the scheduler stays deterministic. In Tawzeevo the assistant can read masked figures and explain them, and cannot write anything.",
      ],
      ar: [
        "كل مستودع أعمل عليه يحتوي AGENTS.md وCLAUDE.md: ما المشروع، وأي وثيقة تُقرأ لأي مهمة، والقواعد التي لا يجوز كسرها. وكلاء البرمجة (Codex وAider وClaude) ينفذون وفق تلك الوثائق، وأراجع الفرق كما أراجع عمل زميل.",
        "البوابة هي التحقق لا الثقة. الوكلاء لا يدمجون؛ الاختبارات وفحص الأنواع والتدقيق وتدفقات المتصفح الحقيقي هي التي تدمج. وعندما يخطئ الوكيل، يذهب الإصلاح إلى الوثيقة التي سمحت بالخطأ، كي لا يتكرر في المرة التالية.",
        "عندما يكون الذكاء الاصطناعي جزءًا من المنتج، يحصل على أصغر مهمة ممكنة. في ChargeHub يحوّل النموذج رسالة واحدة إلى مسودة قابلة للتعديل ولا يرى بيانات الحساب أو الحجز؛ والجدولة تبقى حتمية. في Tawzeevo يستطيع المساعد قراءة أرقام مقنّعة وشرحها، ولا يستطيع كتابة أي شيء.",
      ],
    },
  },
  personal: {
    en: "Arabic is my first language and English my working one. I live in Saida, on the coast south of Beirut, and I am open to remote roles anywhere and to on-site work in Lebanon.",
    ar: "العربية لغتي الأولى والإنجليزية لغة عملي. أعيش في صيدا، على الساحل جنوب بيروت، ومنفتح على العمل عن بُعد في أي مكان وعلى العمل الحضوري في لبنان.",
  },
};

export const now = {
  updated: "2026-10-11",
  items: {
    en: [
      "Finishing the Digital Hub programme; the certificate is expected this month.",
      "Closing Tawzeevo's phase 9 launch gate: customer accounts, production OTP provider, and the first live encrypted backup run.",
      "Building iStudy, a multi-tenant school-management SaaS for Lebanese tutoring institutions (private, Laravel).",
      "Looking for a full-stack role, remote or in Lebanon, where correctness matters.",
      "Rebuilding this site from scratch; the colophon has the details.",
    ],
    ar: [
      "إنهاء برنامج The Digital Hub؛ الشهادة متوقعة هذا الشهر.",
      "إغلاق بوابة إطلاق المرحلة التاسعة من Tawzeevo: حسابات العملاء، ومزود رموز التحقق للإنتاج، وأول تشغيل حي للنسخ الاحتياطي المشفر.",
      "بناء iStudy، نظام SaaS متعدد المستأجرين لإدارة مراكز الدروس الخصوصية في لبنان (خاص، Laravel).",
      "البحث عن دور تطوير ويب متكامل، عن بُعد أو في لبنان، حيث تهم الصحة والدقة.",
      "إعادة بناء هذا الموقع من الصفر؛ التفاصيل في صفحة عن الموقع.",
    ],
  },
};
