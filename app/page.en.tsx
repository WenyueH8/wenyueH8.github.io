"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type DemoType = "arcproof" | "room" | "essay" | "spelling";

const heroCapabilities = [
  {
    index: "01",
    title: "Product Judgment",
    detail: "User Research · PRD · 0→1",
    proof: "From a real problem to a working product",
  },
  {
    index: "02",
    title: "AI & Experimentation",
    detail: "Prompting · Data Analysis · Agents",
    proof: "AI Tutor positive ratings +7%",
  },
  {
    index: "03",
    title: "Content & Narrative",
    detail: "Filmmaking · Cross-platform Growth",
    proof: "9M+ views on overseas content",
  },
];

type HeroSlide = {
  id: string;
  src: string;
  alt: string;
  objectPosition: string;
};

const heroSlides: HeroSlide[] = [
  {
    id: "camera",
    src: "/wenyue-photo.jpg",
    alt: "Wenyue Hu filming outdoors with a camera",
    objectPosition: "center 44%",
  },
  {
    id: "field",
    src: "/wenyue-cheetah.webp",
    alt: "Wenyue Hu with a cheetah during fieldwork in Zambia",
    objectPosition: "52% center",
  },
  {
    id: "horn",
    src: "/wenyue-horn-stage.webp",
    alt: "Wenyue Hu in concert attire holding a French horn",
    objectPosition: "67% center",
  },
  {
    id: "literature",
    src: "/wenyue-literature.webp",
    alt: "Wenyue Hu presenting academic work in Tsinghua's Department of Chinese Language and Literature",
    objectPosition: "center 43%",
  },
];

const internships = [
  {
    company: "ByteDance · Gauth",
    role: "AI Product Manager Intern",
    time: "2025.11 — 2026.06",
    focus: "AI Tutor Optimization · 0→1 Language Learning · Cross-market Data",
    summary:
      "Improved the AI Tutor experience and designed a language-learning module from 0 to 1, turning model capabilities into product choices that work for learners.",
    evidence: ["Positive ratings +7%", "10+ prompt versions", "10+ cross-market analyses"],
    details: [
      {
        label: "AI TUTOR",
        title: "Turn model answers into a clearer learning experience",
        body: "Led three experiment tracks—Southeast Asia localization, modular whiteboards, and negative-feedback handling—and iterated 10+ versions of the core prompt to reduce irrelevant explanations and robotic responses.",
      },
      {
        label: "0→1 MODULE",
        title: "Design a European K–12 language-learning journey",
        body: "Researched competing products and French and UK textbooks, built the core framework for vocabulary, grammar, and speaking, and helped take the new module from user needs to product design.",
      },
      {
        label: "DATA",
        title: "Refine product judgment with cross-market data",
        body: "Completed 10+ rounds of cross-market analysis across frequent queries, subject-level accuracy, multilingual needs, and churn points, then built a metrics dashboard to guide iteration.",
      },
    ],
  },
  {
    company: "Beijing Dianzhong Technology · DramaBox",
    role: "Overseas Social Media Creative Editing Intern",
    time: "2025.08 — 2025.11",
    focus: "Short-form Video · Platform Strategy · Content Growth",
    summary:
      "Created content independently for TikTok, YouTube, Instagram, and Facebook, using performance data to refine cross-platform strategy.",
    evidence: ["9M+ views", "300K+ likes", "4 global platforms"],
    details: [
      {
        label: "CONTENT",
        title: "Owned short-form production from topic selection to post",
        body: "Produced behind-the-scenes, POV, and rhythm-led content for DramaBox series, independently handling footage selection, narrative restructuring, editing, subtitles, and sound.",
      },
      {
        label: "PLATFORM",
        title: "Adapt content for four different platforms",
        body: "Adapted hooks, pacing, duration, and packaging to the audience and distribution logic of TikTok, YouTube, Instagram, and Facebook.",
      },
      {
        label: "RESULT",
        title: "Bring data into the next creative cycle",
        body: "Reviewed views, engagement, and trend performance, generating 9M+ views and 300K+ likes while turning the results into cross-platform content recommendations.",
      },
    ],
  },
  {
    company: "Academy of Arts & Design, Tsinghua University · Media and Interaction Lab",
    role: "Research Intern",
    time: "2025.06 — 2025.09",
    focus: "Digital Heritage · VR Narrative · Experience Design",
    summary:
      "Contributed to the digital restoration and VR experience for the Kucha cave murals in Xinjiang, focusing on narrative scripting, emotional storytelling, and interaction paths.",
    evidence: ["Digital cultural heritage", "Interactive VR experience", "Cross-functional collaboration"],
    details: [
      {
        label: "RESEARCH",
        title: "Turn research materials into an experienceable story",
        body: "Managed research materials for the Kucha cave-mural restoration project and translated historical, character, and spatial information into a VR narrative script.",
      },
      {
        label: "EXPERIENCE",
        title: "Design the viewing path around emotion and action",
        body: "Designed the story arc and emotional treatment for the VR demo, making cultural information understandable through space, framing, and interaction.",
      },
      {
        label: "COLLABORATION",
        title: "Use feedback to drive cross-functional iteration",
        body: "Analyzed user feedback and worked with interaction and visual designers to improve key paths; the project was showcased as a major national cultural-heritage outcome.",
      },
    ],
  },
];

type FilmWork = {
  id: string;
  index: string;
  title: string;
  duration: string;
  kicker: string;
  role: string;
  description: string;
  facts: string[];
  genre: "documentary" | "fiction";
  youtubeId?: string;
  link?: string;
  poster?: string;
  previewSrc?: string;
};

const filmWorks: FilmWork[] = [
  {
    id: "salamalacong",
    index: "FILM 01",
    title: "Salama Lakong",
    duration: "22:06",
    kicker: "OBSERVATIONAL DOCUMENTARY",
    role: "Director · Cinematographer · Editor",
    description: "A long-form observational documentary that preserves cultural context through everyday detail, location sound, and unforced expression.",
    facts: ["Character observation", "Long-form documentary", "Complete narrative"],
    genre: "documentary",
    youtubeId: "48ayQpfuByo",
    link: "https://www.youtube.com/watch?v=48ayQpfuByo",
  },
  {
    id: "teaching-day",
    index: "FILM 02",
    title: "A Day of Teaching",
    duration: "09:45",
    kicker: "FIELD DOCUMENTARY",
    role: "Director · Cinematographer · Editor",
    description: "A day in a volunteer classroom, using lessons, conversations, and environmental detail to capture the real relationships inside a cross-cultural experience.",
    facts: ["Cross-cultural teaching", "Field observation", "Human relationships"],
    genre: "documentary",
    youtubeId: "fkU8We9T_yw",
    link: "https://www.youtube.com/watch?v=fkU8We9T_yw",
  },
  {
    id: "tazara-railway",
    index: "FILM 03",
    title: "The TAZARA Railway",
    duration: "05:22",
    kicker: "RESEARCH FILM",
    role: "Director · Cinematographer · Editor",
    description: "A short documentary about the TAZARA Railway and the memories along its route, connecting history, place, and everyday life through field filming.",
    facts: ["Field research", "History and place", "Short documentary"],
    genre: "documentary",
    youtubeId: "AZR1_FlxtdI",
    link: "https://www.youtube.com/watch?v=AZR1_FlxtdI",
  },
  {
    id: "demonstrative-word",
    index: "FILM 04",
    title: "The Demonstrative",
    duration: "10:16",
    kicker: "FICTION SHORT",
    role: "Fiction Short · Filmmaking",
    description: "A campus fiction short shaped by language and human relationships. The complete film is embedded on the site and is also available on YouTube.",
    facts: ["Fiction narrative", "Campus film", "Complete film"],
    genre: "fiction",
    youtubeId: "RUAFgwhESAA",
    link: "https://www.youtube.com/watch?v=RUAFgwhESAA",
    poster: "/demonstrative-word-poster.jpg",
  },
];

const projects: Array<{
  id: DemoType;
  index: string;
  title: string;
  subtitle: string;
  tags: string[];
  description: string;
  highlights: string[];
  link?: string;
}> = [
  {
    id: "arcproof",
    index: "01",
    title: "ArcProof",
    subtitle: "AI Documentary Narrative & Footage Orchestration Agent",
    tags: ["AI Agent", "Video Intelligence", "Local-first"],
    description:
      "A local-first footage analysis and narrative orchestration agent for documentary creators. It organizes raw footage, transcripts, and visual evidence into a traceable canonical story, compiles six target cuts, and converts narrative gaps into pickup tasks.",
    highlights: [
      "8-node Canonical Story Spine + 6 target cuts",
      "Removed Context Ledger records the contextual risk of every cut",
      "Gap Radar generates pickup plans; exports EDL, SRT, CSV, JSON, and rough cuts",
    ],
    link: "https://github.com/WenyueH8/arcproof",
  },
  {
    id: "room",
    index: "02",
    title: "RoomMood",
    subtitle: "Rental-room Styling Recommendation Demo",
    tags: ["Image Input", "Recommendation", "Commerce Concept"],
    description:
      "After a user uploads a photo of a rental room, the demo analyzes lighting, color temperature, and fixed furniture, then offers switchable styling directions, budgets, and shopping keywords. Image input and recommendations are functional; the planned Taobao purchase flow is not yet connected.",
    highlights: [
      "Room diagnosis + 3 switchable styling and color directions",
      "Budget tiers, rental constraints, and a selectable shopping list",
      "Copyable Taobao search terms; live product links remain to be connected",
    ],
  },
  {
    id: "essay",
    index: "03",
    title: "Draftline",
    subtitle: "IELTS Writing Paragraph Practice Tool",
    tags: ["Writing Coach", "Sentence Drill", "HTML"],
    description:
      "Turns an IELTS Task 1 model answer into a practice path: understand each paragraph's function, translate the full paragraph, work sentence by sentence, and complete key-expression cloze tasks. Reference answers stay on the same page so learners can see how the essay is built.",
    highlights: [
      "Breaks down paragraph purpose and data logic instead of memorizing a model essay",
      "Three layers: full-paragraph translation → sentence drills → expression cloze",
      "Expandable reference translations, grammar notes, and progress",
    ],
  },
  {
    id: "spelling",
    index: "04",
    title: "LexiLoop",
    subtitle: "Listening-context & Spelling Practice",
    tags: ["Flashcards", "Error Loop", "HTML"],
    description:
      "Converts a word list into two practice modes: spelling in IELTS listening answer sentences and flashcard recall from Chinese prompts. Hint strength increases progressively, while mistakes automatically return to the review loop.",
    highlights: [
      "Three hint levels: hidden, partial letters, and full answer",
      "Uses source sentences when available and generates context when they are not",
      "Prioritizes mistakes and removes a word after two consecutive correct answers",
    ],
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectVisual({ type }: { type: DemoType }) {
  if (type === "arcproof") {
    return (
      <div className="product-window arc-window" role="img" aria-label="ArcProof interactive product preview">
        <div className="window-top">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-title">arcproof / editorial intelligence</span>
        </div>
        <div className="arc-ui">
          <aside className="arc-sidebar">
            <div className="arc-mini-brand"><b>AP</b><span>ArcProof</span></div>
            <span className="arc-mini-nav active"><i>01</i>Footage & Transcripts</span>
            <span className="arc-mini-nav"><i>02</i>Story Compiler</span>
            <span className="arc-mini-nav"><i>03</i>Gap Radar</span>
            <span className="arc-mini-nav"><i>04</i>Agent Trace</span>
            <small>3 assets · 19:32</small>
          </aside>
          <div className="arc-main">
            <div className="mock-toolbar">
              <span>CANONICAL STORY SYSTEM</span>
              <b>LOCAL 0.6</b>
            </div>
            <h4>One canonical story. Six traceable cuts.</h4>
            <div className="arc-mini-metrics">
              <span><b>8/8</b>canonical nodes</span>
              <span><b>6</b>target cuts</span>
              <span><b>4</b>story gaps</span>
            </div>
            <div className="arc-mini-spine">
              <span><i>01</i><b>Character & Desire</b><em>Grounded</em></span>
              <span><i>02</i><b>Real-world Friction</b><em>Partially grounded</em></span>
              <span><i>03</i><b>Action & Choice</b><em>Grounded</em></span>
            </div>
            <div className="arc-mini-versions"><span>20 MIN</span><span>5 MIN</span><span>90 SEC</span><span>30 SEC</span><span>9:16</span><span>EN SRT</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "room") {
    return (
      <div className="product-window room-window" role="img" aria-label="Rental-room styling tool preview">
        <div className="window-top">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-title">roommood / rental styling</span>
        </div>
        <div className="room-ui">
          <div className="room-source-mini">
            <span className="mini-label">Original room</span>
            <div className="room-scene-mini">
              <i className="mini-window" />
              <i className="mini-bed" />
              <i className="mini-table" />
              <span>Low natural light</span>
            </div>
          </div>
          <div className="room-result-mini">
            <div className="room-recommend-head">
              <span className="mini-label">Recommended style</span>
              <b>89% match</b>
            </div>
            <div className="mini-room-tabs"><span>Diagnosis</span><span className="active">Style</span><span>List</span></div>
            <h4>Mist Blue & Natural Wood</h4>
            <div className="palette-row" aria-label="Recommended palette">
              <i className="palette-blue" />
              <i className="palette-wood" />
              <i className="palette-white" />
            </div>
            <div className="mini-product-list">
              <span><i className="product-lamp" />Floor lamp <b>￥159</b></span>
              <span><i className="product-curtain" />Pale blue curtains <b>￥129</b></span>
              <span><i className="product-rug" />Low-pile rug <b>￥199</b></span>
            </div>
            <div className="commerce-note">Taobao purchase flow · Not connected</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "essay") {
    return (
      <div className="product-window essay-window" role="img" aria-label="IELTS writing practice tool preview">
        <div className="window-top">
          <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
          <span className="window-title">Draftline / paragraph practice</span>
        </div>
        <div className="essay-ui">
          <div className="essay-ui-head"><span className="mini-label">TASK 1 · PARAGRAPH 02</span><b>1 / 10 answered</b></div>
          <div className="essay-progress"><span /></div>
          <h4>Overview: the largest contrast between forest and timber shares</h4>
          <p>总体来看，非洲占全球森林的比例最大，但其木材占比却最低。</p>
          <div className="essay-input">Africa accounted for the largest <i>________</i> of the world&apos;s forests.</div>
          <div className="essay-ui-actions"><span>Show reference answer</span><span>View grammar notes</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-window spelling-window" role="img" aria-label="IELTS listening vocabulary tool preview">
      <div className="window-top">
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-title">spelling / flashcard mode</span>
      </div>
      <div className="spelling-ui">
        <div className="spelling-progress"><span /></div>
        <div className="word-card">
          <span className="mini-label">Chinese prompt</span>
          <h4>令人信服的</h4>
          <div className="letter-hint">
            <span>c</span><i /><i /><span>v</span><i /><i /><i /><i /><i /><span>g</span>
          </div>
          <div className="fake-input">convincing<span className="cursor" /></div>
        </div>
        <div className="spelling-actions">
          <button type="button" tabIndex={-1}>Reveal letters</button>
          <button type="button" tabIndex={-1}>Check spelling</button>
        </div>
        <p className="pool-note">Review pool 6 · Correct streak 1/2</p>
      </div>
    </div>
  );
}

function HeroGallery({
  activeIndex,
  onSelect,
  onPrevious,
  onNext,
  onPauseChange,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onPauseChange: (paused: boolean) => void;
}) {
  return (
    <div
      className="hero-gallery"
      onMouseEnter={() => onPauseChange(true)}
      onMouseLeave={() => onPauseChange(false)}
      onFocus={() => onPauseChange(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) onPauseChange(false);
      }}
      aria-roledescription="carousel"
      aria-label="Wenyue Hu photo carousel"
    >
      <div className="hero-gallery-stage" aria-live="polite">
        {heroSlides.map((slide, index) => (
          <figure
            className={`hero-slide ${
              index === activeIndex
                ? "is-active"
                : index === (activeIndex + 1) % heroSlides.length
                  ? "is-next"
                  : index === (activeIndex - 1 + heroSlides.length) % heroSlides.length
                    ? "is-previous"
                    : "is-hidden"
            }`}
            aria-hidden={index !== activeIndex}
            key={slide.id}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={index === activeIndex ? slide.alt : ""}
              loading={index === 0 ? "eager" : "lazy"}
              style={{ objectPosition: slide.objectPosition }}
            />
          </figure>
        ))}
        <span className="gallery-counter" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(heroSlides.length).padStart(2, "0")}
        </span>
        <div className="gallery-controls">
          <button type="button" onClick={onPrevious} aria-label="Previous photo">←</button>
          <button type="button" onClick={onNext} aria-label="Next photo">→</button>
        </div>
      </div>

      <div className="gallery-pagination" role="tablist" aria-label="Select a photo">
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`View photo ${index + 1}`}
            className={index === activeIndex ? "is-active" : ""}
            onClick={() => onSelect(index)}
            key={slide.id}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}

function FilmPoster({ work, size = "large" }: { work: FilmWork; size?: "large" | "small" }) {
  const src = work.poster ?? (work.youtubeId ? `https://i.ytimg.com/vi/${work.youtubeId}/${size === "large" ? "maxresdefault" : "hqdefault"}.jpg` : "");

  if (!src) return null;

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt={`${work.title} video poster`} loading="lazy" onError={(event) => { event.currentTarget.style.opacity = "0"; }} />
  );
}

function FilmFeature({ work, onPlay }: { work: FilmWork; onPlay: () => void }) {
  return (
    <article className={`film-feature film-${work.genre}`} key={work.id}>
      <button className="film-feature-cover" type="button" onClick={onPlay} aria-label={`Play ${work.title}`}>
        <span className="film-feature-fallback"><b>{work.title}</b><small>{work.kicker}</small></span>
        <FilmPoster work={work} />
        <span className="film-feature-shade" />
        <span className="film-feature-number">{work.index}</span>
        <span className="film-feature-duration">{work.duration}</span>
        <span className="film-feature-play"><i /> {work.previewSrc ? "Play 36-second excerpt" : "Play full film"}</span>
      </button>
      <div className="film-feature-copy">
        <div className="film-feature-meta"><span>{work.kicker}</span><b>{work.genre === "fiction" ? "FICTION" : "DOCUMENTARY"}</b></div>
        <h3>{work.title}</h3>
        <p className="film-feature-role">{work.role}</p>
        <p>{work.description}</p>
        <div className="film-feature-footer">
          <div>{work.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <button type="button" onClick={onPlay}>Watch <Arrow /></button>
        </div>
      </div>
    </article>
  );
}

function FilmIndex({
  works,
  activeId,
  onSelect,
}: {
  works: FilmWork[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="film-index" aria-label="Film index">
      {works.map((work) => (
        <button
          className={work.id === activeId ? "is-active" : ""}
          type="button"
          onClick={() => onSelect(work.id)}
          aria-pressed={work.id === activeId}
          key={work.id}
        >
          <span className="film-index-thumb"><FilmPoster work={work} size="small" /><i /></span>
          <span className="film-index-copy">
            <small>{work.index} · {work.duration}</small>
            <b>{work.title}</b>
            <em>{work.kicker}</em>
          </span>
          <span className="film-index-arrow">↗</span>
        </button>
      ))}
    </div>
  );
}

function VideoModal({ work, onClose }: { work: FilmWork; onClose: () => void }) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop film-modal-backdrop" onMouseDown={onClose}>
      <section className="film-modal" role="dialog" aria-modal="true" aria-labelledby="film-modal-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="film-modal-head">
          <div>
            <span>{work.index} · {work.duration}</span>
            <h3 id="film-modal-title">{work.title}</h3>
            <p>{work.role}</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close video">×</button>
        </div>
        <div className="film-player">
          {work.previewSrc ? (
            <video src={work.previewSrc} poster={work.poster} controls autoPlay playsInline preload="metadata">
              This browser cannot play the video.
            </video>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
              title={`Play ${work.title}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div className="film-modal-foot">
          <p>{work.description}</p>
          {work.link ? (
            <a href={work.link} target="_blank" rel="noreferrer">Open on YouTube <Arrow diagonal /></a>
          ) : (
            <span>On-site excerpt · Full film archived locally</span>
          )}
        </div>
      </section>
    </div>
  );
}

type ArcWorkspace = "source" | "compiler" | "radar" | "agent";
type ArcVariantId = "doc20" | "short5" | "social90" | "trailer30" | "vertical90" | "multilingual";
type ArcGapSeverity = "critical" | "high" | "medium";

const arcDemoAssets = [
  { id: "interview", name: "interview_03.mp4", time: "12:48", meta: "1920×1080 · 1.2 GB", state: "Model transcript", cue: "03:12", quote: "I realized for the first time that a familiar place could be seen anew.", kind: "Interview" },
  { id: "market", name: "market_broll_02.mp4", time: "04:26", meta: "3840×2160 · 860 MB", state: "Visuals indexed", cue: "01:08", quote: "The protagonist walks through the morning market, greeting vendors with a stack of old photographs in hand.", kind: "Environmental B-roll" },
  { id: "photos", name: "old_photos_closeup.mov", time: "02:18", meta: "1920×1080 · 420 MB", state: "Evidence linked", cue: "00:44", quote: "The street in the old photograph is contrasted with a present-day establishing shot.", kind: "Action footage" },
];

const arcStoryNodes = [
  { id: "hook", act: "ACT I", title: "A familiar place is seen anew", status: "grounded", confidence: 94, evidence: "interview_03.mp4 · 03:12–03:38", context: "Keep the time context of leaving and returning home" },
  { id: "character", act: "ACT I", title: "The protagonist's history with home", status: "grounded", confidence: 91, evidence: "old_photos_closeup.mov · 00:44–01:06", context: "Do not silently remove the photograph's source or date" },
  { id: "want", act: "ACT I", title: "A desire to preserve private memory", status: "grounded", confidence: 89, evidence: "interview_03.mp4 · 05:02–05:31", context: "Preserve the link between personal desire and public record" },
  { id: "friction", act: "ACT II", title: "Filming meets real-world resistance", status: "partial", confidence: 68, evidence: "interview_03.mp4 · 07:16–07:49", context: "Currently supported only by testimony; do not edit it as visually verified" },
  { id: "choice", act: "ACT II", title: "A decision to begin at the morning market", status: "grounded", confidence: 86, evidence: "market_broll_02.mp4 · 00:28–01:34", context: "The action occurs the day after the interview" },
  { id: "turn", act: "ACT II", title: "Old photographs enter the present-day space", status: "partial", confidence: 73, evidence: "old_photos_closeup.mov · 01:10–01:45", context: "Needs evidence of how the protagonist located the filming position" },
  { id: "peak", act: "ACT III", title: "Memory receives a response from others", status: "missing", confidence: 34, evidence: "No second character perspective yet", context: "Narration cannot replace the subject's real response" },
  { id: "resolution", act: "ACT III", title: "Leaving an image—and rethinking home", status: "grounded", confidence: 88, evidence: "interview_03.mp4 · 11:26–12:06", context: "The ending must answer the opening question" },
];

const arcVariantOptions: Array<{
  id: ArcVariantId;
  label: string;
  target: string;
  actual: string;
  aspect: string;
  retained: number;
  risk: "Low" | "Medium" | "High";
  description: string;
  removed: string;
  mitigation: string;
}> = [
  { id: "doc20", label: "Long Documentary", target: "20:00", actual: "18:42", aspect: "16:9", retained: 8, risk: "Low", description: "Retains all eight canonical nodes and the full causal chain, ready for a human editor to refine as the main documentary cut.", removed: "Only repeated statements and pauses without narrative function are compressed.", mitigation: "Verify facts, permissions, and timecodes item by item before fine editing." },
  { id: "short5", label: "Short Documentary", target: "05:00", actual: "04:51", aspect: "16:9", retained: 6, risk: "Medium", description: "Compresses character background while retaining the core chain of desire, friction, choice, and outcome.", removed: "Removes part of the childhood history and morning-market context.", mitigation: "Use a 12-second title card to restore location and time context." },
  { id: "social90", label: "Social Cut", target: "01:30", actual: "01:27", aspect: "16:9", retained: 4, risk: "High", description: "Prioritizes the character hook, conflict, and action peak for horizontal social distribution.", removed: "Compresses nearly all of the motivation-building and second perspective.", mitigation: "Keep a link to the full film at the end and avoid a conclusive headline." },
  { id: "trailer30", label: "Trailer", target: "00:30", actual: "00:29", aspect: "16:9", retained: 3, risk: "Medium", description: "Establishes a question and an emotional promise without pretending the core conflict is already resolved.", removed: "Withholds the full outcome and leaves an action-driven question.", mitigation: "Label the copy clearly as a trailer and link the full version." },
  { id: "vertical90", label: "Vertical Cut", target: "01:30", actual: "01:26", aspect: "9:16", retained: 4, risk: "High", description: "Uses the 90-second structure and flags horizontal-to-vertical crops that may remove key relationships.", removed: "Some environmental information is weakened by the aspect-ratio change.", mitigation: "Use letterboxing on problem shots rather than silently cropping evidence." },
  { id: "multilingual", label: "Multilingual Subtitle Cut", target: "05:00", actual: "04:51", aspect: "16:9 · EN", retained: 6, risk: "Medium", description: "Uses the same short-documentary structure and generates a timecoded English subtitle review track.", removed: "Uses the same background-compression strategy as the five-minute cut.", mitigation: "Retain a proper-noun glossary and line-by-line back-translation checks." },
];

const arcTimeline = [
  { role: "OPENING HOOK", file: "interview_03.mp4", source: "03:12–03:38", record: "00:00–00:26", width: "24%" },
  { role: "CHARACTER / CONTEXT", file: "old_photos_closeup.mov", source: "00:44–01:45", record: "00:26–01:27", width: "39%" },
  { role: "FRICTION", file: "interview_03.mp4", source: "07:16–07:49", record: "01:27–02:00", width: "29%" },
  { role: "ACTION", file: "market_broll_02.mp4", source: "00:28–01:34", record: "02:00–03:06", width: "47%" },
  { role: "RESOLUTION", file: "interview_03.mp4", source: "11:26–12:06", record: "03:06–03:46", width: "34%" },
];

const arcGaps: Array<{
  id: string;
  severity: ArcGapSeverity;
  category: string;
  title: string;
  evidence: string;
  why: string;
  action: string;
}> = [
  { id: "visual-conflict", severity: "critical", category: "Visualizing conflict", title: "Real-world friction is described but never shown", evidence: "The 07:16 interview mentions a refusal to be filmed, but the library contains no matching scene.", why: "If handled only with narration, viewers are told about the conflict but cannot see how it actually unfolded.", action: "Film a medium shot and reactions as the protagonist asks for permission again." },
  { id: "second-view", severity: "high", category: "Character perspective", title: "No response from the people being documented", evidence: "All 19:32 of current footage comes from the protagonist and their observational perspective.", why: "A single perspective leaves the ending's public significance without external evidence.", action: "Interview a market vendor about whether the old photograph changed their memory." },
  { id: "bridge", severity: "high", category: "Causal bridge", title: "No bridge showing how the photographs reach the market", evidence: "The cut jumps to market_broll_02 after 01:45 without showing the search for the location.", why: "The key action feels forced together in the edit, weakening the character's choice.", action: "Film the continuous action of comparing photographs, locating the position, and walking into the site." },
  { id: "ending", severity: "medium", category: "Opening–ending return", title: "The ending resolves the character but not the place", evidence: "The final line works, but there is no matching street view from the opening position.", why: "Place is the story's second protagonist; omitting it weakens structural closure.", action: "Capture an evening establishing shot from the same position to create a visual return." },
];

const arcAgentTrace = [
  { tool: "media.index", label: "Read media evidence", detail: "FFmpeg indexes duration, aspect ratio, audio, and representative frames." },
  { tool: "audio.transcribe", label: "Build dialogue evidence", detail: "FunASR generates timecoded transcripts linked to the source footage." },
  { tool: "vision.observe", label: "Describe visible action", detail: "Qwen3-VL records only directly observable people, actions, and settings in keyframes." },
  { tool: "evidence.search", label: "Retrieve narrative evidence", detail: "The agent retrieves dialogue, visuals, and timecodes against the story hypothesis." },
  { tool: "story.compile", label: "Compile six cuts", detail: "A deterministic Story Compiler generates timelines and the contextual-cut ledger." },
  { tool: "gap.audit", label: "Audit story gaps", detail: "Gap Radar converts gaps into actionable pickup and interview tasks." },
];

function ArcDemo() {
  const [workspace, setWorkspace] = useState<ArcWorkspace>("compiler");
  const [selectedAssetId, setSelectedAssetId] = useState("interview");
  const [variantId, setVariantId] = useState<ArcVariantId>("doc20");
  const [gapFilter, setGapFilter] = useState<"all" | ArcGapSeverity>("all");
  const [lockedNodes, setLockedNodes] = useState<string[]>(["hook", "resolution"]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [runState, setRunState] = useState<"idle" | "running" | "done">("done");
  const [traceStep, setTraceStep] = useState(arcAgentTrace.length);
  const [hypothesis, setHypothesis] = useState("A young person re-films their hometown and comes to understand why they chose to stay. ");
  const [customAsset, setCustomAsset] = useState<{ id: string; name: string; time: string; meta: string; state: string; cue: string; quote: string; kind: string } | null>(null);
  const [exported, setExported] = useState("");

  const assets = customAsset ? [customAsset, ...arcDemoAssets] : arcDemoAssets;
  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? assets[0];
  const selectedVariant = arcVariantOptions.find((variant) => variant.id === variantId)!;
  const visibleGaps = arcGaps.filter((gap) => gapFilter === "all" || gap.severity === gapFilter);

  useEffect(() => {
    if (runState !== "running") return;
    const timer = window.setTimeout(() => {
      if (traceStep >= arcAgentTrace.length) {
        setRunState("done");
        setWorkspace("compiler");
      } else {
        setTraceStep((step) => step + 1);
      }
    }, traceStep >= arcAgentTrace.length ? 120 : 420);
    return () => window.clearTimeout(timer);
  }, [runState, traceStep]);

  const runAgent = () => {
    setRunState("running");
    setTraceStep(0);
    setWorkspace("agent");
    setExported("");
  };

  const downloadArtifact = (kind: "EDL" | "JSON" | "SRT" | "CSV") => {
    const body = kind === "JSON"
      ? JSON.stringify({ schema: "arcproof.story-package.v1", variant: selectedVariant, canonicalNodes: arcStoryNodes.map((node) => node.id), gaps: arcGaps }, null, 2)
      : kind === "CSV"
        ? ["Priority,Task,Status", ...arcGaps.map((gap) => `${gap.severity},${gap.title},planned`)].join("\n")
        : kind === "SRT"
          ? "1\n00:00:00,000 --> 00:00:04,000\nI began to see my hometown differently.\n"
          : "TITLE: ARCPROOF SAMPLE\nFCM: NON-DROP FRAME\n\n001  AX  V  C  00:03:12:00 00:03:38:00 00:00:00:00 00:00:26:00";
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `arcproof-${variantId}.${kind.toLowerCase()}`;
    anchor.click();
    URL.revokeObjectURL(url);
    setExported(kind);
  };

  const workspaceLabels: Array<[ArcWorkspace, string, string]> = [
    ["source", "01", "Footage & Transcripts"],
    ["compiler", "02", "Story Compiler"],
    ["radar", "03", "Gap Radar"],
    ["agent", "04", "Agent Run Log"],
  ];

  return (
    <div className="arc-product-demo">
      <header className="arc-demo-header">
        <div className="arc-demo-brand"><span>AP</span><div><b>ArcProof</b><small>EDITORIAL INTELLIGENCE</small></div></div>
        <div className="arc-demo-project"><i /> Untitled Documentary <b>Local 0.6</b></div>
        <div className="arc-demo-engine"><span>{runState === "running" ? "AGENT RUNNING" : "LOCAL ENGINE READY"}</span><i>WY</i></div>
      </header>

      <div className="arc-demo-body">
        <aside className="arc-demo-sidebar">
          <span className="arc-sidebar-label">Workspace</span>
          <nav aria-label="ArcProof demo workspace">
            {workspaceLabels.map(([id, index, label]) => (
              <button type="button" className={workspace === id ? "active" : ""} onClick={() => setWorkspace(id)} key={id}>
                <span>{index}</span><b>{label}</b><em>{id === "source" ? assets.length : id === "compiler" ? 6 : id === "radar" ? arcGaps.length : traceStep}</em>
              </button>
            ))}
          </nav>
          <div className="arc-sidebar-stats">
            <span>Current Project</span>
            <p><b>{assets.length}  assets</b><small>19:32 raw duration</small></p>
            <p><b>8 / 8</b><small>canonical nodes built</small></p>
            <p><b>4</b><small>story gaps to resolve</small></p>
          </div>
          <div className="arc-sidebar-principle"><b>Canonical first.</b><p>Every cut is compiled from the same canonical story, with removed context recorded.</p></div>
        </aside>

        <section className="arc-demo-workspace" aria-live="polite">
          {runState === "running" && (
            <div className="arc-run-strip">
              <span><i style={{ width: `${Math.max(8, (traceStep / arcAgentTrace.length) * 100)}%` }} /></span>
              <p><b>Agent is calling tools</b>{arcAgentTrace[Math.min(traceStep, arcAgentTrace.length - 1)]?.label}</p>
              <em>{traceStep}/{arcAgentTrace.length}</em>
            </div>
          )}

          {workspace === "source" && (
            <div className="arc-source-workspace">
              <div className="arc-workspace-hero">
                <div><span>CANONICAL STORY SYSTEM</span><h4>Understand the evidence before deciding what to cut.</h4><p>Footage, transcripts, and visual observations retain timecodes so every story claim can be checked against the source.</p></div>
                <button type="button" onClick={runAgent} disabled={runState === "running"}>{runState === "running" ? "Analyzing…" : "Run ArcProof Agent"} <Arrow /></button>
              </div>
              <label className="arc-hypothesis">Story hypothesis to test<textarea value={hypothesis} onChange={(event) => setHypothesis(event.target.value)} /></label>
              <div className="arc-metric-strip"><span><b>19:32</b>Source footage</span><span><b>100%</b>Transcript coverage</span><span><b>36</b>Visual observations</span><span><b>LOCAL</b>Footage stays local</span></div>
              <div className="arc-source-grid">
                <section className="arc-asset-panel">
                  <div className="arc-panel-heading"><div><span>SOURCE INDEX</span><h5>Footage & evidence intake</h5></div><label htmlFor="arc-demo-upload">+ Add proxy file</label></div>
                  <input
                    className="visually-hidden"
                    id="arc-demo-upload"
                    type="file"
                    accept="video/*,.srt,.vtt,.txt"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const next = { id: "custom", name: file.name, time: "Awaiting analysis", meta: `${(file.size / 1024 / 1024).toFixed(1)} MB · Local preview`, state: "Awaiting index", cue: "—", quote: "The file is displayed only in this browser; the portfolio neither uploads nor analyzes source footage.", kind: "User-selected asset" };
                      setCustomAsset(next);
                      setSelectedAssetId(next.id);
                    }}
                  />
                  <div className="arc-asset-list">
                    {assets.map((asset) => (
                      <button type="button" className={selectedAsset.id === asset.id ? "active" : ""} onClick={() => setSelectedAssetId(asset.id)} key={asset.id}>
                        <i><span>▶</span><small>{asset.time}</small></i>
                        <span><b>{asset.name}</b><small>{asset.meta}</small></span>
                        <em>{asset.state}</em>
                      </button>
                    ))}
                  </div>
                </section>
                <section className="arc-transcript-panel">
                  <div className="arc-panel-heading"><div><span>TRANSCRIPT EVIDENCE</span><h5>{selectedAsset.name}</h5></div><em>{selectedAsset.kind}</em></div>
                  <div className="arc-evidence-quote"><time>{selectedAsset.cue}</time><p>{selectedAsset.quote}</p></div>
                  <div className="arc-frame-row"><i /><i /><i /></div>
                  <p className="arc-data-boundary"><b>Data boundary</b>Video, audio, keyframes, and vectors remain local; the agent reads only retrieved structured text evidence.</p>
                </section>
              </div>
            </div>
          )}

          {workspace === "compiler" && (
            <div className="arc-compiler-workspace">
              <div className="arc-workspace-hero compact">
                <div><span>CANONICAL STORY SPINE</span><h4>One canonical story. Six traceable cuts.</h4><p>Canonical nodes are evidence contracts. Removing any key context creates an entry in the Removed Context Ledger.</p></div>
                <span className="arc-result-mode">✓ AGENT AUDIT COMPLETE</span>
              </div>
              <div className="arc-spine-board" aria-label="Eight canonical story nodes">
                {arcStoryNodes.map((node, index) => (
                  <article className={node.status} key={node.id}>
                    <div><span>{String(index + 1).padStart(2, "0")} · {node.act}</span><em>{node.status === "grounded" ? "Grounded" : node.status === "partial" ? "Partially grounded" : "Missing evidence"}</em></div>
                    <h5>{node.title}</h5>
                    <p>{node.evidence}</p>
                    <small>{node.confidence}% confidence</small>
                    <button type="button" className={lockedNodes.includes(node.id) ? "locked" : ""} onClick={() => setLockedNodes((current) => current.includes(node.id) ? current.filter((id) => id !== node.id) : [...current, node.id])}>
                      {lockedNodes.includes(node.id) ? "Context locked" : "Lock context"}
                    </button>
                  </article>
                ))}
              </div>
              <section className="arc-variant-section">
                <div className="arc-panel-heading"><div><span>STORY COMPILER OUTPUT</span><h5>Six target cuts</h5></div><em>Compiled from one canonical story</em></div>
                <div className="arc-variant-tabs" role="tablist" aria-label="Output cuts">
                  {arcVariantOptions.map((variant) => (
                    <button type="button" role="tab" aria-selected={variantId === variant.id} className={variantId === variant.id ? "active" : ""} onClick={() => { setVariantId(variant.id); setExported(""); }} key={variant.id}>
                      <b>{variant.label}</b><span>{variant.actual} / {variant.target}</span><em className={`risk-${variant.risk.toLowerCase()}`}>{variant.aspect} · {variant.risk} risk</em>
                    </button>
                  ))}
                </div>
                <div className="arc-variant-detail">
                  <div className="arc-variant-summary">
                    <span>{selectedVariant.id.toUpperCase()} · {selectedVariant.aspect}</span>
                    <h5>{selectedVariant.label}</h5>
                    <p>{selectedVariant.description}</p>
                    <dl><div><dt>Generated duration</dt><dd>{selectedVariant.actual}</dd></div><div><dt>Nodes retained</dt><dd>{selectedVariant.retained} / 8</dd></div><div><dt>Context risk</dt><dd>{selectedVariant.risk}</dd></div></dl>
                    <div className={`arc-risk-callout risk-${selectedVariant.risk.toLowerCase()}`}><b>Removed Context Ledger</b><p>{selectedVariant.removed}</p><small>{selectedVariant.mitigation}</small></div>
                    <div className="arc-export-row">
                      {(["EDL", "JSON", "SRT"] as const).map((kind) => <button type="button" onClick={() => downloadArtifact(kind)} key={kind}>Export {kind}</button>)}
                      <span>{exported ? `${exported} generated` : "Ready for the editing workflow"}</span>
                    </div>
                  </div>
                  <div className="arc-timeline-panel">
                    <div className="arc-panel-heading"><div><span>EDIT DECISION LIST</span><h5>Compiled timeline</h5></div><em>{Math.min(selectedVariant.retained, arcTimeline.length)} clips</em></div>
                    <div className="arc-timeline-list">
                      {arcTimeline.slice(0, Math.min(selectedVariant.retained, arcTimeline.length)).map((item, index) => (
                        <article key={item.role}><span>{String(index + 1).padStart(2, "0")}</span><div><i style={{ width: item.width }} /><b>{item.role}</b><small>{item.file} · Source {item.source} · Cut {item.record}</small></div></article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {workspace === "radar" && (
            <div className="arc-radar-workspace">
              <div className="arc-workspace-hero compact">
                <div><span>STORY GAP RADAR</span><h4>Turn what the story still needs into actionable tasks.</h4><p>Each gap is linked to footage evidence, affected nodes, a pickup action, and completion criteria.</p></div>
                <div className="arc-radar-score"><b>3</b><span> high-priority gaps</span><small>{completedTasks.length}/{arcGaps.length} complete</small></div>
              </div>
              <div className="arc-gap-controls">
                <div>{(["all", "critical", "high", "medium"] as const).map((filter) => <button type="button" className={gapFilter === filter ? "active" : ""} onClick={() => setGapFilter(filter)} key={filter}>{filter === "all" ? `All ${arcGaps.length}` : filter === "critical" ? "Critical" : filter === "high" ? "High" : "Medium"}</button>)}</div>
                <button type="button" onClick={() => downloadArtifact("CSV")}>Export Pickup Plan CSV</button>
              </div>
              <div className="arc-gap-list">
                {visibleGaps.map((gap, index) => (
                  <article className={gap.severity} key={gap.id}>
                    <div className="arc-gap-rank"><span>{String(index + 1).padStart(2, "0")}</span><em>{gap.severity === "critical" ? "Critical" : gap.severity === "high" ? "High" : "Medium"} priority</em></div>
                    <div className="arc-gap-copy"><span>{gap.category}</span><h5>{gap.title}</h5><div><p><b>Footage evidence</b>{gap.evidence}</p><p><b>Why it matters</b>{gap.why}</p><p><b>Recommended action</b>{gap.action}</p></div></div>
                    <button type="button" className={completedTasks.includes(gap.id) ? "done" : ""} onClick={() => setCompletedTasks((current) => current.includes(gap.id) ? current.filter((id) => id !== gap.id) : [...current, gap.id])}>{completedTasks.includes(gap.id) ? "✓ Picked up" : "Mark as picked up"}</button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {workspace === "agent" && (
            <div className="arc-agent-workspace">
              <div className="arc-workspace-hero compact">
                <div><span>AGENT EXECUTION</span><h4>Every step is auditable—no fake progress bars.</h4><p>DeepSeek calls evidence tools, while a deterministic compiler owns cut structure, the context ledger, and deliverable files.</p></div>
                <button type="button" onClick={runAgent} disabled={runState === "running"}>{runState === "running" ? "Running…" : "Run Agent Again"}</button>
              </div>
              <div className="arc-agent-grid">
                <section className="arc-trace-panel">
                  <div className="arc-panel-heading"><div><span>RUN TRACE</span><h5>This run</h5></div><em>{traceStep} events</em></div>
                  {arcAgentTrace.map((step, index) => {
                    const status = index < traceStep ? "done" : index === traceStep && runState === "running" ? "running" : "pending";
                    return <article className={status} key={step.tool}><span>{status === "done" ? "✓" : status === "running" ? "…" : "—"}</span><div><b>{step.label}</b><code>{step.tool}</code><p>{step.detail}</p></div></article>;
                  })}
                </section>
                <section className="arc-interface-panel">
                  <div className="arc-panel-heading"><div><span>IMPLEMENTED INTERFACES</span><h5>Implemented technology & delivery boundaries</h5></div><em>LOCAL-FIRST</em></div>
                  <article><span>LOCAL</span><div><b>FFmpeg + FunASR</b><p>Media indexing, audio extraction, and timecoded transcription.</p></div></article>
                  <article><span>LOCAL</span><div><b>Qwen3-VL + Embedding</b><p>Visible-action descriptions and local vector retrieval.</p></div></article>
                  <article><span>AGENT</span><div><b>DeepSeek Tool Calls</b><p>Evidence retrieval, canonical-story audit, and context/story-gap detection.</p></div></article>
                  <article><span>OUTPUT</span><div><b>EDL · SRT · CSV · JSON · MP4</b><p>Return analysis to real editing and pickup workflows.</p></div></article>
                  <div className="arc-interface-note"><b>Footage stays local</b><p>The agent receives structured text evidence—not complete video, audio, or keyframes.</p></div>
                </section>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

type RoomStyleId = "mist" | "cream" | "retro";
type RoomTab = "analysis" | "style" | "shopping";
type RoomConstraint = "noDrill" | "movable" | "compact";

const roomStyleOptions: Array<{
  id: RoomStyleId;
  name: string;
  caption: string;
  match: number;
  palette: string[];
  reasoning: string;
  products: Array<{
    id: string;
    name: string;
    keyword: string;
    price: number;
    icon: string;
  }>;
}> = [
  {
    id: "mist",
    name: "Mist Blue & Natural Wood",
    caption: "Airy and bright, balancing dark furniture",
    match: 89,
    palette: ["#90b7ce", "#c8aa89", "#f5f2eb"],
    reasoning:
      "Light textiles brighten the room, muted mist blue softens the weight of dark furniture, and natural wood brings the cool–warm balance back into place.",
    products: [
      { id: "mist-lamp", name: "Warm floor lamp", keyword: "原木落地灯 租房 暖光", price: 159, icon: "shop-lamp" },
      { id: "mist-curtain", name: "Mist-blue blackout curtains", keyword: "免打孔 雾蓝 遮光窗帘", price: 129, icon: "shop-curtain" },
      { id: "mist-rug", name: "Light-grey low-pile rug", keyword: "可机洗 浅灰 短绒地毯", price: 199, icon: "shop-rug" },
      { id: "mist-cushion", name: "Blue-grey cushion set", keyword: "蓝灰 靠垫套 45x45", price: 88, icon: "shop-cushion" },
    ],
  },
  {
    id: "cream",
    name: "Cream Wabi-sabi",
    caption: "Soft and relaxed for a compact, low-light room",
    match: 84,
    palette: ["#e8dcc8", "#c8b59d", "#f7f1e8"],
    reasoning:
      "Tonal cream reduces visual fragmentation, while rattan and linen add depth. Every piece stays light enough to preserve natural light near the window.",
    products: [
      { id: "cream-lamp", name: "Paper floor lamp", keyword: "纸艺落地灯 奶油风 暖光", price: 189, icon: "shop-lamp" },
      { id: "cream-curtain", name: "Ivory linen curtains", keyword: "免打孔 米白 亚麻窗帘", price: 149, icon: "shop-curtain cream" },
      { id: "cream-rug", name: "Oatmeal loop-pile rug", keyword: "燕麦色 圈绒地毯 可水洗", price: 229, icon: "shop-rug cream" },
      { id: "cream-basket", name: "Rattan storage basket", keyword: "藤编收纳篮 带盖 小户型", price: 79, icon: "shop-basket" },
    ],
  },
  {
    id: "retro",
    name: "Warm Retro Brown",
    caption: "Keeps the character of old furniture and adds a cinematic mood",
    match: 78,
    palette: ["#a66f58", "#c9a66b", "#465a68"],
    reasoning:
      "Instead of hiding the dark furniture, caramel brown, brass, and deep blue unite it into a deliberate retro foundation.",
    products: [
      { id: "retro-lamp", name: "Brass reading lamp", keyword: "黄铜阅读灯 复古 租房", price: 219, icon: "shop-lamp retro" },
      { id: "retro-curtain", name: "Caramel-brown curtains", keyword: "免打孔 焦糖棕 窗帘", price: 169, icon: "shop-curtain retro" },
      { id: "retro-rug", name: "Geometric retro rug", keyword: "复古 几何地毯 小户型", price: 269, icon: "shop-rug retro" },
      { id: "retro-frame", name: "Walnut-finish frame", keyword: "胡桃木色 画框 免钉", price: 96, icon: "shop-frame" },
    ],
  },
];

const roomSignals = [
  { icon: "☀", label: "Natural light", value: "Moderate to low", confidence: "72%" },
  { icon: "◫", label: "Usable area", value: "About 11 m²", confidence: "78%" },
  { icon: "◒", label: "Dominant temperature", value: "Neutral cool grey", confidence: "86%" },
  { icon: "▥", label: "Fixed furniture", value: "Dark wood grain", confidence: "84%" },
];

const constraintLabels: Record<RoomConstraint, string> = {
  noDrill: "No drilling",
  movable: "Move-friendly",
  compact: "Small-space first",
};

function RoomDemo() {
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const [analysisState, setAnalysisState] = useState<"idle" | "scanning" | "ready">("idle");
  const [activeTab, setActiveTab] = useState<RoomTab>("analysis");
  const [activeStyleId, setActiveStyleId] = useState<RoomStyleId>("mist");
  const [previewMode, setPreviewMode] = useState<"original" | "palette">("original");
  const [budget, setBudget] = useState(800);
  const [constraints, setConstraints] = useState<Record<RoomConstraint, boolean>>({
    noDrill: true,
    movable: true,
    compact: true,
  });
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
    roomStyleOptions[0].products.slice(0, 3).map((product) => product.id)
  );
  const [copied, setCopied] = useState(false);

  const activeStyle = roomStyleOptions.find((style) => style.id === activeStyleId)!;
  const selectedProducts = activeStyle.products.filter((product) =>
    selectedProductIds.includes(product.id)
  );
  const selectedTotal = selectedProducts.reduce((total, product) => total + product.price, 0);
  const analyzed = analysisState === "ready";

  useEffect(() => {
    return () => {
      if (roomImage) URL.revokeObjectURL(roomImage);
    };
  }, [roomImage]);

  useEffect(() => {
    if (analysisState !== "scanning") return;
    const timer = window.setTimeout(() => {
      setAnalysisState("ready");
      setActiveTab("analysis");
    }, 850);
    return () => window.clearTimeout(timer);
  }, [analysisState]);

  const chooseStyle = (styleId: RoomStyleId) => {
    const nextStyle = roomStyleOptions.find((style) => style.id === styleId)!;
    setActiveStyleId(styleId);
    setSelectedProductIds(nextStyle.products.slice(0, 3).map((product) => product.id));
    setCopied(false);
  };

  const toggleProduct = (productId: string) => {
    setSelectedProductIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
    setCopied(false);
  };

  const copyShoppingList = async () => {
    const text = [
      `RoomMood｜${activeStyle.name} styling search terms`,
      ...selectedProducts.map(
        (product, index) => `${index + 1}. ${product.name}｜${product.keyword}｜Reference price ¥${product.price}`
      ),
      `Total reference price: ¥${selectedTotal}`,
      "Note: Products and prices are demo examples and are not connected to live Taobao data.",
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      const didCopy = document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(didCopy);
    }
  };

  return (
    <div className="demo-layout room-demo">
      <div className="demo-panel room-upload-panel">
        <div className="room-panel-topline">
          <span className="demo-kicker">01 / ROOM INPUT</span>
          <span className="local-only-badge">LOCAL PREVIEW</span>
        </div>
        <div className={`room-photo-stage ${roomImage ? "has-photo" : ""} ${analysisState === "scanning" ? "is-scanning" : ""}`}>
          {roomImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={roomImage} alt="Preview of the user's selected rental-room photo" />
            </>
          ) : (
            <div className="room-scene-large" aria-label="Sample rental-room illustration" role="img">
              <i className="large-window" />
              <i className="large-bed" />
              <i className="large-desk" />
              <i className="large-floor" />
              <span>Sample original room</span>
            </div>
          )}
          {analyzed && previewMode === "palette" && (
            <div
              className="palette-preview-overlay"
              style={{
                background: `linear-gradient(135deg, ${activeStyle.palette[0]}70, transparent 52%), linear-gradient(320deg, ${activeStyle.palette[1]}52, transparent 58%)`,
              }}
              aria-label={`${activeStyle.name}Palette mood preview`}
            >
              <span>Palette mood preview · Not a rendered makeover</span>
            </div>
          )}
          {analysisState === "scanning" && (
            <div className="scan-overlay" aria-live="polite">
              <i />
              <span>Identifying light, color temperature, and fixed furniture…</span>
            </div>
          )}
          <span className="local-photo-tag">Photo stays local</span>
        </div>

        <div className="room-stepper" aria-label="Experience progress">
          <span className="is-done"><b>01</b>Upload photo</span>
          <span className={analysisState !== "idle" ? "is-done" : ""}><b>02</b>Room diagnosis</span>
          <span className={analyzed ? "is-done" : ""}><b>03</b>Generate list</span>
        </div>

        {analyzed && (
          <div className="preview-switcher" aria-label="Photo preview mode">
            <button
              type="button"
              className={previewMode === "original" ? "active" : ""}
              onClick={() => setPreviewMode("original")}
            >
              Original
            </button>
            <button
              type="button"
              className={previewMode === "palette" ? "active" : ""}
              onClick={() => setPreviewMode("palette")}
            >
              Palette mood
            </button>
          </div>
        )}

        <div className="room-upload-actions">
          <label className="demo-secondary upload-label" htmlFor="room-photo-upload">
            {roomImage ? "Change photo" : "Select a photo"}
          </label>
          <input
            id="room-photo-upload"
            className="visually-hidden"
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (!file) return;
              setRoomImage(URL.createObjectURL(file));
              setAnalysisState("idle");
              setPreviewMode("original");
            }}
          />
          <button
            className="demo-primary"
            type="button"
            disabled={analysisState === "scanning"}
            onClick={() => {
              setAnalysisState("scanning");
              setPreviewMode("original");
            }}
          >
            {analysisState === "scanning"
              ? "Analyzing…"
              : analyzed
                ? "Analyze again"
                : roomImage
                  ? "Analyze my room"
                  : "Analyze sample room"} {analysisState !== "scanning" && <Arrow />}
          </button>
        </div>
      </div>

      <div className={`demo-panel room-result-panel ${analyzed ? "is-ready" : ""}`} aria-live="polite">
        {analysisState === "idle" ? (
          <div className="empty-result">
            <span>⌂</span>
            <p>Choose an original rental-room photo—or analyze the sample—to experience the full journey from diagnosis to shopping list.</p>
          </div>
        ) : analysisState === "scanning" ? (
          <div className="room-loading-state" aria-live="polite">
            <div className="loading-orbit"><i /><i /><i /></div>
            <span className="demo-kicker">READING THE ROOM</span>
            <h4>Understanding the space</h4>
            <p>Analyzing light, area, color temperature, and immovable furniture before matching a renter-friendly styling plan.</p>
            <div className="loading-track"><span /></div>
          </div>
        ) : (
          <>
            <div className="room-result-heading">
              <div>
                <span className="demo-kicker">02 / RECOMMENDATIONS</span>
                <h4>{activeStyle.name}</h4>
              </div>
              <div>
                <span className="match-score">{activeStyle.match}% MATCH</span>
                <div className="room-palette-large" aria-label={`${activeStyle.name}Recommended palette`}>
                  {activeStyle.palette.map((color) => <i key={color} style={{ background: color }} />)}
                </div>
              </div>
            </div>

            <div className="room-tabs" role="tablist" aria-label="Styling-plan details">
              {([
                ["analysis", "Room diagnosis"],
                ["style", "Style directions"],
                ["shopping", `Shopping list ${selectedProducts.length}`],
              ] as Array<[RoomTab, string]>).map(([tab, label]) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={activeTab === tab ? "active" : ""}
                  onClick={() => setActiveTab(tab)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="room-tab-content" role="tabpanel">
              {activeTab === "analysis" && (
                <div className="analysis-tab">
                  <div className="signal-grid">
                    {roomSignals.map((signal) => (
                      <article key={signal.label}>
                        <i>{signal.icon}</i>
                        <div><span>{signal.label}</span><b>{signal.value}</b></div>
                        <em>{signal.confidence}</em>
                      </article>
                    ))}
                  </div>
                  <div className="constraint-section">
                    <div className="tab-section-heading">
                      <div><span>Rental constraints</span><small>Click to adjust recommendation preferences</small></div>
                      <b>{Object.values(constraints).filter(Boolean).length} active</b>
                    </div>
                    <div className="constraint-row">
                      {(Object.keys(constraintLabels) as RoomConstraint[]).map((constraint) => (
                        <button
                          key={constraint}
                          type="button"
                          aria-pressed={constraints[constraint]}
                          className={constraints[constraint] ? "active" : ""}
                          onClick={() => setConstraints((current) => ({
                            ...current,
                            [constraint]: !current[constraint],
                          }))}
                        >
                          <span>{constraints[constraint] ? "✓" : "+"}</span>
                          {constraintLabels[constraint]}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button className="tab-next-button" type="button" onClick={() => setActiveTab("style")}>
                    View 3 style directions <Arrow />
                  </button>
                </div>
              )}

              {activeTab === "style" && (
                <div className="style-tab">
                  <div className="style-options">
                    {roomStyleOptions.map((style) => (
                      <button
                        type="button"
                        key={style.id}
                        className={activeStyleId === style.id ? "active" : ""}
                        aria-pressed={activeStyleId === style.id}
                        onClick={() => chooseStyle(style.id)}
                      >
                        <span className="style-swatch">
                          {style.palette.map((color) => <i key={color} style={{ background: color }} />)}
                        </span>
                        <span><b>{style.name}</b><small>{style.caption}</small></span>
                        <em>{style.match}%</em>
                      </button>
                    ))}
                  </div>
                  <div className="room-logic">
                    <span>Why it works</span>
                    <p>{activeStyle.reasoning}</p>
                  </div>
                  <button className="tab-next-button" type="button" onClick={() => setActiveTab("shopping")}>
                    Shop this style <Arrow />
                  </button>
                </div>
              )}

              {activeTab === "shopping" && (
                <div className="shopping-tab">
                  <div className="budget-control">
                    <div className="tab-section-heading">
                      <div><span>Styling budget</span><small>Applies only to this demo list</small></div>
                      <b>¥{budget}</b>
                    </div>
                    <div className="budget-options" aria-label="Budget selection">
                      {[500, 800, 1200].map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          className={budget === amount ? "active" : ""}
                          onClick={() => setBudget(amount)}
                        >
                          ¥{amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="shopping-list" aria-label="Selectable styling products">
                    {activeStyle.products.map((product) => {
                      const selected = selectedProductIds.includes(product.id);
                      return (
                        <button
                          type="button"
                          key={product.id}
                          className={`shopping-item ${selected ? "selected" : ""}`}
                          aria-pressed={selected}
                          onClick={() => toggleProduct(product.id)}
                        >
                          <i className={product.icon} />
                          <span><b>{product.name}</b><small>{product.keyword}</small></span>
                          <em>¥{product.price}</em>
                          <strong>{selected ? "✓" : "+"}</strong>
                        </button>
                      );
                    })}
                  </div>

                  <div className={`budget-summary ${selectedTotal > budget ? "is-over" : ""}`}>
                    <div className="budget-summary-topline">
                      <span>Selected {selectedProducts.length} items · Total <b>¥{selectedTotal}</b></span>
                      <em>{selectedTotal > budget ? `Over by ¥${selectedTotal - budget}` : `¥${budget - selectedTotal}`}</em>
                    </div>
                    <div className="budget-meter"><span style={{ width: `${Math.min((selectedTotal / budget) * 100, 100)}%` }} /></div>
                  </div>

                  <div className="shopping-actions">
                    <button type="button" className="copy-list-button" onClick={copyShoppingList} disabled={!selectedProducts.length}>
                      {copied ? "Search terms copied ✓" : "Copy Taobao search terms"}
                    </button>
                    <div className="taobao-status">
                      <span>Taobao product links</span>
                      <b>Not connected · CONCEPT ONLY</b>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const spellingWords = [
  { word: "convincing", meaning: "令人信服的", sentence: "The speaker gave a highly convincing explanation." },
  { word: "fundamental", meaning: "基本的；不可或缺的", sentence: "Trust is fundamental to effective cooperation." },
  { word: "isolated", meaning: "孤立的；遥远的", sentence: "The research station is in an isolated area." },
];

const essayParagraphs = [
  { label: "01 / 引言", title: "说明比较对象", zh: "这两张饼图比较了全球森林和木材在五个不同地区之间的分布比例。", ref: "The pie charts compare the proportions of the world's forests and timber distributed across five different regions.", blank: "The pie charts compare the ________ of the world's forests and timber distributed across five different regions.", focus: "compare the proportions of...；be distributed across..." },
  { label: "02 / 概述", title: "抓住最大反差", zh: "总体来看，非洲占全球森林的比例最大，但其木材占比却最低。", ref: "Overall, Africa accounted for the largest share of the world's forests but the smallest proportion of timber.", blank: "Africa accounted for the largest ________ of the world's forests.", focus: "account for the largest share；the smallest proportion" },
  { label: "03 / 细节", title: "组织数据比较", zh: "就全球森林而言，非洲所占比例最大，为27%，北美洲紧随其后，为25%。", ref: "Regarding world forests, Africa made up the largest share at 27%, followed closely by North America at 25%.", blank: "Africa made ________ the largest share at 27%.", focus: "Regarding...；make up；followed closely by..." },
];

function EssayDemo() {
  const [index, setIndex] = useState(1);
  const [answer, setAnswer] = useState("");
  const [paragraphAnswer, setParagraphAnswer] = useState("");
  const [showRef, setShowRef] = useState(false);
  const [showFocus, setShowFocus] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const current = essayParagraphs[index];
  const completed = Number(Boolean(answer.trim())) + Number(Boolean(paragraphAnswer.trim()));
  const next = () => {
    setIndex((value) => (value + 1) % essayParagraphs.length);
    setAnswer("");
    setParagraphAnswer("");
    setShowRef(false);
    setShowFocus(false);
    setShowSource(false);
  };

  return (
    <div className="essay-demo">
      <header className="essay-demo-hero">
        <div><span>IELTS ACADEMIC WRITING · TASK 1</span><h4>Global Distribution of Forests and Timber</h4><p>Paragraph-based Chinese-to-English practice: introduction → overview → data details</p></div>
        <b>{completed} / 2 answered</b>
        <div className="essay-demo-track"><span style={{ width: `${completed * 50}%` }} /></div>
      </header>

      <div className="essay-toolbar">
        <button type="button" onClick={() => setShowSource((value) => !value)}>{showSource ? "Hide source paragraph" : "Show source paragraph"}</button>
        <button type="button" onClick={() => setShowRef(true)}>Show reference answer</button>
        <button type="button" onClick={() => { setShowRef(false); setShowFocus(false); }}>Hide all answers</button>
      </div>

      <section className="essay-paragraph-card">
        <div className="essay-demo-top">
          <div><span className="demo-kicker">PARAGRAPH {index + 1}</span><h4>{current.label}｜{current.title}</h4><p className="essay-purpose"><b>Paragraph purpose:</b>First understand the paragraph's role, then check its data, comparisons, and transitions.</p></div>
          <button type="button" onClick={next}>Next paragraph <Arrow /></button>
        </div>

        {showSource && <div className="essay-source"><b>English source paragraph</b><p>{current.ref}</p></div>}

        <div className="essay-whole">
          <div><b>Full-paragraph translation (optional)</b><p>Try organizing the full paragraph before moving into sentence practice.</p></div>
          <textarea value={paragraphAnswer} onChange={(event) => setParagraphAnswer(event.target.value)} placeholder="Try translating the full paragraph into English…" />
        </div>

        <article className="essay-sentence-card">
          <div className="essay-sentence-meta"><span>1</span><p>Paragraph {index + 1} · Sentence 1 / 1</p></div>
          <p className="essay-zh">{current.zh}</p>
          <label htmlFor="essay-answer">Your English translation</label>
          <textarea id="essay-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="Translate this sentence on your own…" />
          <div className="essay-answer-buttons">
            <button type="button" onClick={() => setShowRef((value) => !value)}>{showRef ? "Hide reference answer" : "Show reference answer"}</button>
            <button type="button" onClick={() => setShowFocus((value) => !value)}>{showFocus ? "Hide grammar notes" : "Show grammar notes"}</button>
          </div>
          {showRef && <div className="essay-reference is-ref"><b>Reference answer</b><p>{current.ref}</p></div>}
          {showFocus && <div className="essay-reference is-focus"><b>Key expressions</b><p>{current.focus}</p></div>}
        </article>

        <div className="essay-drill"><span>Key vocabulary & grammar cloze</span><p>{current.blank}</p><button type="button" onClick={() => setShowRef((value) => !value)}>View source sentence</button></div>
      </section>
    </div>
  );
}

function SpellingDemo() {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState(0);
  const [status, setStatus] = useState<"idle" | "right" | "wrong">("idle");
  const current = spellingWords[index];

  const hintWord = useMemo(() => {
    if (hint === 2) return current.word;
    if (hint === 1) {
      return current.word
        .split("")
        .map((letter, letterIndex) =>
          letterIndex === 0 || letterIndex === current.word.length - 1 || letterIndex === 3
            ? letter
            : "_"
        )
        .join(" ");
    }
    return current.word.split("").map(() => "_").join(" ");
  }, [current, hint]);

  const check = (event: FormEvent) => {
    event.preventDefault();
    setStatus(answer.trim().toLowerCase() === current.word ? "right" : "wrong");
  };

  const next = () => {
    setIndex((value) => (value + 1) % spellingWords.length);
    setAnswer("");
    setHint(0);
    setStatus("idle");
  };

  return (
    <div className="demo-layout spelling-demo">
      <div className="demo-panel flashcard-panel">
        <span className="demo-kicker">Flashcard {index + 1} / {spellingWords.length}</span>
        <h4>{current.meaning}</h4>
        <p className="demo-hint-word" aria-label="Spelling prompt">{hintWord}</p>
        <div className="hint-buttons" aria-label="Hint strength">
          <button type="button" className={hint === 0 ? "active" : ""} onClick={() => setHint(0)}>Hidden</button>
          <button type="button" className={hint === 1 ? "active" : ""} onClick={() => setHint(1)}>Letters</button>
          <button type="button" className={hint === 2 ? "active" : ""} onClick={() => setHint(2)}>Answer</button>
        </div>
      </div>
      <form className="demo-panel spelling-answer-panel" onSubmit={check}>
        <label htmlFor="spelling-answer">Spell from the Chinese prompt</label>
        <input
          id="spelling-answer"
          value={answer}
          onChange={(event) => {
            setAnswer(event.target.value);
            setStatus("idle");
          }}
          autoComplete="off"
          placeholder="Type the word"
        />
        {status === "right" && <p className="answer-status right" aria-live="polite">Correct. One more correct answer removes it from the review pool.</p>}
        {status === "wrong" && <p className="answer-status wrong" aria-live="polite">Not quite. Reveal a few letters and try again.</p>}
        {status === "idle" && <p className="sample-sentence">{current.sentence.replace(new RegExp(current.word, "i"), "________")}</p>}
        <div className="answer-actions">
          <button className="demo-primary" type="submit">Check spelling</button>
          <button className="demo-secondary" type="button" onClick={next}>Next word <Arrow /></button>
        </div>
      </form>
    </div>
  );
}

function DemoModal({ type, onClose }: { type: DemoType; onClose: () => void }) {
  const project = projects.find((item) => item.id === type)!;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className={`demo-modal ${type === "room" ? "room-demo-modal" : ""} ${type === "arcproof" ? "arc-demo-modal" : ""} ${type === "essay" ? "essay-demo-modal" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <span className="eyebrow">INTERACTIVE DEMO</span>
            <h3 id="demo-title">{project.title}</h3>
            <p>{project.subtitle}</p>
          </div>
          <button className="modal-close" type="button" onClick={onClose} aria-label="Close demo">×</button>
        </div>
        {type === "arcproof" && <ArcDemo />}
        {type === "room" && <RoomDemo />}
        {type === "essay" && <EssayDemo />}
        {type === "spelling" && <SpellingDemo />}
        <p className="demo-disclaimer">
          {type === "arcproof"
            ? "This interactive sample follows the real ArcProof 0.6 product structure and uses preset assets to demonstrate the full workflow. The local product calls FFmpeg, FunASR, Qwen3-VL, and a DeepSeek agent."
            : type === "room"
              ? "Photos are previewed only in the current browser. Recommendations are demo examples, and Taobao purchase links are not connected."
              : type === "essay"
                ? "This is Draftline's core practice loop: a model essay is broken into paragraph purpose, translation exercises, and expression cloze tasks—all interactive on this page."
                : "This is a lightweight trial of the core learning loop."}
        </p>
      </section>
    </div>
  );
}

export default function HomeEnglish() {
  const [activeDemo, setActiveDemo] = useState<DemoType | null>(null);
  const [activeFilm, setActiveFilm] = useState<string | null>(null);
  const [selectedFilm, setSelectedFilm] = useState(filmWorks[0].id);
  const [filmFilter, setFilmFilter] = useState<"all" | FilmWork["genre"]>("all");
  const [heroSlide, setHeroSlide] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeInternship, setActiveInternship] = useState(0);
  const [contactCopied, setContactCopied] = useState(false);
  const currentInternship = internships[activeInternship];
  const currentFilm = filmWorks.find((work) => work.id === activeFilm) ?? null;
  const visibleFilms = filmFilter === "all" ? filmWorks : filmWorks.filter((work) => work.genre === filmFilter);
  const selectedShowcaseFilm = visibleFilms.find((work) => work.id === selectedFilm) ?? visibleFilms[0] ?? filmWorks[0];

  useEffect(() => {
    if (heroPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setHeroSlide((current) => (current + 1) % heroSlides.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [heroPaused]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeMenuOnEscape);
    return () => window.removeEventListener("keydown", closeMenuOnEscape);
  }, [menuOpen]);

  const chooseFilmFilter = (filter: "all" | FilmWork["genre"]) => {
    setFilmFilter(filter);
    const firstMatch = filter === "all" ? filmWorks[0] : filmWorks.find((work) => work.genre === filter);
    if (firstMatch) setSelectedFilm(firstMatch.id);
  };

  const copyContact = async () => {
    try {
      await navigator.clipboard.writeText("15210890818");
      setContactCopied(true);
      window.setTimeout(() => setContactCopied(false), 1800);
    } catch {
      setContactCopied(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Back to home">
          <span>WY</span>
          <b>Wenyue Hu</b>
        </a>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Page navigation">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#content" onClick={() => setMenuOpen(false)}>Films</a>
          <a className="nav-language" href="/" aria-label="Switch to Chinese">中文</a>
          <a className="nav-resume" href="/wenyue-hu-resume-en.pdf" target="_blank" rel="noreferrer">
            Résumé <Arrow diagonal />
          </a>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <p className="hero-role">AI PRODUCT · CONTENT · FILM</p>
          <h1>Hi, I'm<br />Wenyue Hu.</h1>
          <div className="hero-actions">
            <a className="primary-button" href="/wenyue-hu-resume-en.pdf" target="_blank" rel="noreferrer">
              View résumé <Arrow />
            </a>
            <a className="text-button" href="#works">Explore my products <Arrow /></a>
          </div>
          <div className="hero-capabilities" aria-label="Core capabilities">
            {heroCapabilities.map((capability) => (
              <article key={capability.index}>
                <span>{capability.index}</span>
                <h2>{capability.title}</h2>
                <p>{capability.detail}</p>
                <small>{capability.proof}</small>
              </article>
            ))}
          </div>
        </div>

        <div className="hero-portrait">
          <HeroGallery
            activeIndex={heroSlide}
            onSelect={setHeroSlide}
            onPrevious={() => setHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length)}
            onNext={() => setHeroSlide((current) => (current + 1) % heroSlides.length)}
            onPauseChange={setHeroPaused}
          />
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="section-index"><span>02</span> / EXPERIENCE</p>
              <h2>I study people—and products.</h2>
            </div>
            <p>My work spans language, film, and AI learning products, but it is all driven by the same question: how people express themselves, learn, and make decisions.</p>
          </div>

          <div className="experience-grid">
            <aside className="education-card glass-card">
              <p className="card-label">Education</p>
              <article>
                <span className="edu-time">2026.10 — 2027.07</span>
                <h3>University of Cambridge</h3>
                <p>MPhil in Film and Screen Studies</p>
                <small>Incoming MPhil · Film and Screen Studies</small>
              </article>
              <article>
                <span className="edu-time">2022.09 — 2026.07</span>
                <h3>Tsinghua University</h3>
                <p>BA · Chinese Language and Literature</p>
                <small>GPA 3.9 / 4.0 · Top 10% · 2025 National Scholarship</small>
              </article>
              <div className="education-footer">
                <span>IELTS 8.0</span>
                <span>Python & Digital Humanities</span>
                <span>President, Tsinghua Student Press Corps</span>
              </div>
            </aside>

            <div className="career-experience">
              <div className="career-label-row">
                <p className="card-label">Internship Timeline</p>
                <span>Select a point for details</span>
              </div>
              <div className="career-timeline" role="tablist" aria-label="Internship experience timeline">
                {internships.map((item, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`internship-tab-${index}`}
                    aria-controls="internship-panel"
                    className={activeInternship === index ? "active" : ""}
                    aria-selected={activeInternship === index}
                    tabIndex={activeInternship === index ? 0 : -1}
                    onClick={() => setActiveInternship(index)}
                    onKeyDown={(event) => {
                      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                      event.preventDefault();
                      const nextIndex = event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? internships.length - 1
                          : event.key === "ArrowRight"
                            ? (index + 1) % internships.length
                            : (index - 1 + internships.length) % internships.length;
                      setActiveInternship(nextIndex);
                      const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('button[role="tab"]');
                      tabs?.[nextIndex]?.focus();
                    }}
                    key={item.company}
                  >
                    <span className="career-dot"><i /></span>
                    <time>{item.time}</time>
                    <b>{item.company}</b>
                    <small>{item.role}</small>
                  </button>
                ))}
              </div>

              <article
                className="career-detail glass-card"
                id="internship-panel"
                key={currentInternship.company}
                role="tabpanel"
                aria-labelledby={`internship-tab-${activeInternship}`}
                aria-live="polite"
              >
                <div className="career-detail-head">
                  <div>
                    <span>{currentInternship.focus}</span>
                    <h3>{currentInternship.company}</h3>
                    <p>{currentInternship.role}</p>
                  </div>
                  <time>{currentInternship.time}</time>
                </div>
                <p className="career-summary">{currentInternship.summary}</p>
                <div className="career-detail-grid">
                  {currentInternship.details.map((detail, index) => (
                    <section key={detail.label}>
                      <span>0{index + 1} / {detail.label}</span>
                      <h4>{detail.title}</h4>
                      <p>{detail.body}</p>
                    </section>
                  ))}
                </div>
                <div className="evidence-row">
                  {currentInternship.evidence.map((evidence) => <span key={evidence}>{evidence}</span>)}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="works-section section-shell" id="works">
        <div className="section-heading works-heading">
          <div>
            <p className="section-index"><span>03</span> / VIBE CODING WORKS</p>
            <h2>Start with: I need a tool for this.</h2>
          </div>
          <p>Each project began with a problem that I or someone around me kept encountering. I broke down the use case, then used Codex and Claude Code to turn the idea into a product that runs, can be tested, and has room to evolve.</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card project-${project.id}`} key={project.id}>
              <div className="project-preview">
                <ProjectVisual type={project.id} />
                <button className="preview-trigger" type="button" onClick={() => setActiveDemo(project.id)}>
                  Try the interaction <Arrow />
                </button>
              </div>
              <div className="project-copy">
                <div className="project-meta">
                  <span>CASE {project.index}</span>
                  <div>{project.tags.map((tag) => <i key={tag}>{tag}</i>)}</div>
                </div>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <ul>
                  {project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="project-actions">
                  <button className="primary-button" type="button" onClick={() => setActiveDemo(project.id)}>
                    Try the project <Arrow />
                  </button>
                  {project.link && (
                    <a className="text-button" href={project.link} target="_blank" rel="noreferrer">
                      GitHub source <Arrow diagonal />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="content">
        <div className="section-shell">
          <div className="section-heading content-heading">
            <div>
              <p className="section-index"><span>04</span> / CONTENT & VIDEO</p>
              <h2>I also understand people through a camera.</h2>
            </div>
            <p>Beyond product work, I have long worked with content and film. Thinking about platforms, pacing, and narrative gives me another way to understand users and creative tools.</p>
          </div>

          <aside className="content-practice" aria-label="DramaBox content experience">
            <div className="content-practice-copy">
              <span>CONTENT PRACTICE · DRAMABOX</span>
              <h3>Feed platform data back into the next creative decision.</h3>
              <p>Selected topics, edited videos, and adapted social content for an overseas short-drama platform. Unreleased commercial footage is not shown here; only verifiable results and methods are included.</p>
            </div>
            <div className="content-practice-metrics">
              <article><strong>9M+</strong><span>Total views</span></article>
              <article><strong>300K+</strong><span>Total likes</span></article>
              <article><strong>04</strong><span>Global platforms</span></article>
            </div>
          </aside>

          <div className="film-showcase">
            <div className="film-showcase-head">
              <div>
                <span>SELECTED FILMS · 04 WORKS</span>
                <h3>Three documentaries and one fiction short.</h3>
              </div>
              <p>Select a film on the right to bring it to the main stage. All four complete works are embedded from YouTube and can be watched here.</p>
            </div>

            <div className="film-filter" aria-label="Filter films">
              {([
                ["all", "All films"],
                ["documentary", "Documentary"],
                ["fiction", "Fiction short"],
              ] as const).map(([value, label]) => (
                <button
                  type="button"
                  className={filmFilter === value ? "is-active" : ""}
                  onClick={() => chooseFilmFilter(value)}
                  aria-pressed={filmFilter === value}
                  key={value}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="film-browser">
              <FilmFeature work={selectedShowcaseFilm} onPlay={() => setActiveFilm(selectedShowcaseFilm.id)} key={selectedShowcaseFilm.id} />
              <FilmIndex works={visibleFilms} activeId={selectedShowcaseFilm.id} onSelect={setSelectedFilm} />
            </div>
          </div>

        </div>
      </section>

      <footer className="site-footer">
        <div className="section-shell footer-inner">
          <div>
            <span className="eyebrow">LET&apos;S BUILD SOMETHING USEFUL</span>
            <h2>Want to talk about AI products, film, or a problem worth building for?</h2>
          </div>
          <div className="footer-contact">
            <a href="mailto:nicolehwy@163.com">nicolehwy@163.com <Arrow diagonal /></a>
            <button type="button" onClick={copyContact} aria-label="Copy phone and WeChat number 15210890818">
              Phone / WeChat · 15210890818
              <span aria-live="polite">{contactCopied ? "Copied" : "Copy"}</span>
            </button>
            <a href="https://github.com/WenyueH8" target="_blank" rel="noreferrer">GitHub / WenyueH8 <Arrow diagonal /></a>
            <p>© 2026 Hu Wenyue · Designed & coded with curiosity.</p>
          </div>
        </div>
      </footer>

      {activeDemo && <DemoModal type={activeDemo} onClose={() => setActiveDemo(null)} />}
      {currentFilm && <VideoModal work={currentFilm} onClose={() => setActiveFilm(null)} />}
    </main>
  );
}
