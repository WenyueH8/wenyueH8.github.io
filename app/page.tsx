"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type DemoType = "arcproof" | "room" | "essay" | "spelling";

const heroCapabilities = [
  {
    index: "01",
    title: "产品判断",
    detail: "用户研究 · PRD · 0→1",
    proof: "从真实问题到可运行产品",
  },
  {
    index: "02",
    title: "AI 与实验",
    detail: "Prompt · 数据分析 · Agent",
    proof: "AI Tutor 好评率 +7%",
  },
  {
    index: "03",
    title: "内容叙事",
    detail: "影像创作 · 跨平台增长",
    proof: "海外内容播放 900万+",
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
    alt: "胡文悦手持相机，在户外拍摄",
    objectPosition: "center 44%",
  },
  {
    id: "field",
    src: "/wenyue-cheetah.webp",
    alt: "胡文悦在赞比亚调研期间与猎豹合影",
    objectPosition: "52% center",
  },
  {
    id: "horn",
    src: "/wenyue-horn-stage.webp",
    alt: "胡文悦身着演出服，手持圆号",
    objectPosition: "67% center",
  },
  {
    id: "literature",
    src: "/wenyue-literature.webp",
    alt: "胡文悦在清华大学中文系展示论文训练材料",
    objectPosition: "center 43%",
  },
];

const internships = [
  {
    company: "字节跳动 · Gauth",
    role: "AI 产品经理实习生",
    time: "2025.11 — 2026.06",
    focus: "AI Tutor 优化 · 语言学习 0→1 · 跨市场数据",
    summary:
      "负责 AI Tutor 体验优化与语言学习模块 0→1 设计，在模型能力、学习效果和用户感受之间找到可落地的产品方案。",
    evidence: ["好评率 +7%", "10+ 版 Prompt", "10+ 轮跨市场分析"],
    details: [
      {
        label: "AI TUTOR",
        title: "把模型答案变成更清楚的学习体验",
        body: "主导东南亚针对优化、组件化板书与负反馈优化三条实验线，累计迭代 10+ 版核心 Prompt，降低无效解释和过强的 AI 感。",
      },
      {
        label: "0→1 MODULE",
        title: "设计欧洲 K12 语言学习链路",
        body: "完成竞品与法国、英国教材研究，搭建词汇、语法、口语等核心课程框架，并参与新模块从需求到方案的完整设计。",
      },
      {
        label: "DATA",
        title: "用跨市场数据修正产品判断",
        body: "完成 10+ 轮用户数据分析，覆盖高频题、学科正确率、多语种需求与流失节点，建立核心指标看板支持迭代决策。",
      },
    ],
  },
  {
    company: "北京点众科技 · DramaBox",
    role: "海外社媒创意剪辑实习生",
    time: "2025.08 — 2025.11",
    focus: "短视频创作 · 平台策略 · 内容增长",
    summary:
      "面向 TikTok、YouTube、Instagram 与 Facebook 独立完成内容创作，并用运营数据持续调整跨平台内容策略。",
    evidence: ["900 万+ 播放", "30 万+ 点赞", "4 个海外平台"],
    details: [
      {
        label: "CONTENT",
        title: "独立完成从选题到后期的短视频生产",
        body: "围绕 DramaBox 剧集制作幕后花絮、POV 与节奏型内容，独立完成素材判断、叙事重组、剪辑、字幕和声音处理。",
      },
      {
        label: "PLATFORM",
        title: "针对四个平台调整内容表达",
        body: "根据 TikTok、YouTube、Instagram 与 Facebook 的用户和分发差异，调整开场钩子、节奏、时长与包装方式。",
      },
      {
        label: "RESULT",
        title: "让数据参与下一轮创作",
        body: "持续复盘播放、互动与趋势表现，累计获得 900 万+ 播放和 30 万+ 点赞，并据此提出跨平台内容优化建议。",
      },
    ],
  },
  {
    company: "清华大学美术学院 · 媒体与交互实验室",
    role: "研究实习生",
    time: "2025.06 — 2025.09",
    focus: "文化遗产数字化 · VR 叙事 · 体验优化",
    summary:
      "参与新疆库车石窟壁画数字修复与 VR 体验项目，负责叙事脚本、情感渲染与交互路径优化。",
    evidence: ["文化遗产数字化", "VR 互动体验", "跨职能协作"],
    details: [
      {
        label: "RESEARCH",
        title: "把研究材料整理成可体验的故事",
        body: "参与库车石窟壁画数字修复项目的资料管理与内容研究，将历史背景、人物与空间信息转化为 VR 叙事脚本。",
      },
      {
        label: "EXPERIENCE",
        title: "围绕情绪和行动设计观看路径",
        body: "负责故事线与情感渲染，完善 VR 互动体验 Demo，使文化信息能通过空间、镜头和交互被用户理解。",
      },
      {
        label: "COLLABORATION",
        title: "用用户反馈推动跨职能迭代",
        body: "分析体验反馈，与交互和设计成员协作优化关键路径，项目作为国家级文化遗产重点成果展示。",
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
    title: "撒拉玛拉空",
    duration: "22:06",
    kicker: "OBSERVATIONAL DOCUMENTARY",
    role: "导演 · 摄影 · 剪辑",
    description: "以人物与日常观察展开的长纪录片，在生活细节、现场声音与真实表达中保留文化语境。",
    facts: ["人物观察", "长纪录片", "完整叙事"],
    genre: "documentary",
    youtubeId: "48ayQpfuByo",
    link: "https://www.youtube.com/watch?v=48ayQpfuByo",
  },
  {
    id: "teaching-day",
    index: "FILM 02",
    title: "支教日",
    duration: "09:45",
    kicker: "FIELD DOCUMENTARY",
    role: "导演 · 摄影 · 剪辑",
    description: "记录支教现场的一天，以课堂、交流与环境细节呈现跨文化志愿经历中的真实关系。",
    facts: ["跨文化支教", "现场记录", "人物关系"],
    genre: "documentary",
    youtubeId: "fkU8We9T_yw",
    link: "https://www.youtube.com/watch?v=fkU8We9T_yw",
  },
  {
    id: "tazara-railway",
    index: "FILM 03",
    title: "坦赞铁路",
    duration: "05:22",
    kicker: "RESEARCH FILM",
    role: "导演 · 摄影 · 剪辑",
    description: "围绕坦赞铁路及其沿线记忆展开的短纪录影像，以实地拍摄连接历史、空间与当下生活。",
    facts: ["实地调研", "历史空间", "短纪录片"],
    genre: "documentary",
    youtubeId: "AZR1_FlxtdI",
    link: "https://www.youtube.com/watch?v=AZR1_FlxtdI",
  },
  {
    id: "demonstrative-word",
    index: "FILM 04",
    title: "指示词",
    duration: "10:16",
    kicker: "FICTION SHORT",
    role: "虚构短片 · 影像创作",
    description: "一部以语言与人物关系为线索的校园虚构短片。完整成片已接入站内播放器，也可跳转 YouTube 观看。",
    facts: ["虚构叙事", "校园影像", "完整成片"],
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
    subtitle: "AI 纪录片叙事与素材编排 Agent",
    tags: ["AI Agent", "Video Intelligence", "Local-first"],
    description:
      "面向纪录片创作者的本地素材分析与叙事编排 Agent。它把原片、转写和画面证据整理成可追溯的母版叙事，再编译六种成片版本，并把叙事缺口直接转成补拍任务。",
    highlights: [
      "8 节点 Canonical Story Spine + 6 个目标版本",
      "Removed Context Ledger 记录每次删减带来的语境风险",
      "Gap Radar 生成补拍计划；可导出 EDL、SRT、CSV、JSON 与粗剪",
    ],
    link: "https://github.com/WenyueH8/arcproof",
  },
  {
    id: "room",
    index: "02",
    title: "RoomMood",
    subtitle: "租房软装风格推荐 Demo",
    tags: ["Image Input", "Recommendation", "Commerce Concept"],
    description:
      "上传租房的原始照片后，Demo 会分析采光、色温与固定家具，再给出可切换的软装风格、预算方案和采购搜索词。项目已跑通图片输入与推荐展示，原计划继续连接淘宝完成购买转化，但真实商品跳转链路尚未接入。",
    highlights: [
      "空间诊断 + 3 套风格与配色方案切换",
      "预算档、租房约束与可勾选采购清单",
      "支持复制淘宝搜索词；真实商品跳转仍待接入",
    ],
  },
  {
    id: "essay",
    index: "03",
    title: "译构",
    subtitle: "雅思写作段落训练工具",
    tags: ["Writing Coach", "Sentence Drill", "HTML"],
    description:
      "把一篇 Task 1 范文拆成可练习的写作路径：先理解段落功能，再完成整段翻译、逐句中译英和核心表达挖空。每个答案都能在同一页面即时对照，帮助学习者看见文章是如何组织出来的。",
    highlights: [
      "段落功能与数据逻辑拆解，不只背整篇范文",
      "整段翻译 → 逐句练习 → 表达挖空的三层训练",
      "参考译文、语法重点与作答进度可逐项展开",
    ],
  },
  {
    id: "spelling",
    index: "04",
    title: "LexiLoop",
    subtitle: "听力定位句与单词拼写练习",
    tags: ["Flashcards", "Error Loop", "HTML"],
    description:
      "把单词表自动变成两种练习：先在雅思听力答案句中完成挖空拼写，再用中文提示进行闪卡回忆。提示强度可以逐步增加，错词会自动进入循环。",
    highlights: [
      "完全遮住、露出字母、显示答案三档提示",
      "原句优先，没有原句时自动生成语境",
      "错词优先复习，连续答对两次后移出错词池",
    ],
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function ProjectVisual({ type }: { type: DemoType }) {
  if (type === "arcproof") {
    return (
      <div className="product-window arc-window" role="img" aria-label="ArcProof 交互设计预览">
        <div className="window-top">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-title">arcproof / editorial intelligence</span>
        </div>
        <div className="arc-ui">
          <aside className="arc-sidebar">
            <div className="arc-mini-brand"><b>AP</b><span>ArcProof</span></div>
            <span className="arc-mini-nav active"><i>01</i>素材与转写</span>
            <span className="arc-mini-nav"><i>02</i>Story Compiler</span>
            <span className="arc-mini-nav"><i>03</i>Gap Radar</span>
            <span className="arc-mini-nav"><i>04</i>Agent Trace</span>
            <small>3 个素材 · 19:32</small>
          </aside>
          <div className="arc-main">
            <div className="mock-toolbar">
              <span>CANONICAL STORY SYSTEM</span>
              <b>LOCAL 0.6</b>
            </div>
            <h4>一个母版故事，六个可追溯版本。</h4>
            <div className="arc-mini-metrics">
              <span><b>8/8</b>母版节点</span>
              <span><b>6</b>目标版本</span>
              <span><b>4</b>叙事缺口</span>
            </div>
            <div className="arc-mini-spine">
              <span><i>01</i><b>人物与愿望</b><em>证据充分</em></span>
              <span><i>02</i><b>现实阻力</b><em>部分成立</em></span>
              <span><i>03</i><b>行动与选择</b><em>证据充分</em></span>
            </div>
            <div className="arc-mini-versions"><span>20 MIN</span><span>5 MIN</span><span>90 SEC</span><span>30 SEC</span><span>9:16</span><span>EN SRT</span></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "room") {
    return (
      <div className="product-window room-window" role="img" aria-label="租房软装推荐工具交互设计预览">
        <div className="window-top">
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-dot" />
          <span className="window-title">roommood / rental styling</span>
        </div>
        <div className="room-ui">
          <div className="room-source-mini">
            <span className="mini-label">原始房间</span>
            <div className="room-scene-mini">
              <i className="mini-window" />
              <i className="mini-bed" />
              <i className="mini-table" />
              <span>采光偏弱</span>
            </div>
          </div>
          <div className="room-result-mini">
            <div className="room-recommend-head">
              <span className="mini-label">推荐风格</span>
              <b>匹配度 89%</b>
            </div>
            <div className="mini-room-tabs"><span>诊断</span><span className="active">风格</span><span>清单</span></div>
            <h4>雾蓝原木</h4>
            <div className="palette-row" aria-label="推荐配色">
              <i className="palette-blue" />
              <i className="palette-wood" />
              <i className="palette-white" />
            </div>
            <div className="mini-product-list">
              <span><i className="product-lamp" />落地灯 <b>￥159</b></span>
              <span><i className="product-curtain" />浅蓝窗帘 <b>￥129</b></span>
              <span><i className="product-rug" />短绒地毯 <b>￥199</b></span>
            </div>
            <div className="commerce-note">淘宝购买链路 · 未接入</div>
          </div>
        </div>
      </div>
    );
  }

  if (type === "essay") {
    return (
      <div className="product-window essay-window" role="img" aria-label="雅思写作段落训练工具交互设计预览">
        <div className="window-top">
          <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
          <span className="window-title">译构 / paragraph practice</span>
        </div>
        <div className="essay-ui">
          <div className="essay-ui-head"><span className="mini-label">TASK 1 · PARAGRAPH 02</span><b>1 / 10 已作答</b></div>
          <div className="essay-progress"><span /></div>
          <h4>概述：森林与木材占比的最大反差</h4>
          <p>总体来看，非洲占全球森林的比例最大，但其木材占比却最低。</p>
          <div className="essay-input">Africa accounted for the largest <i>________</i> of the world&apos;s forests.</div>
          <div className="essay-ui-actions"><span>显示参考译文</span><span>查看语法重点</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-window spelling-window" role="img" aria-label="雅思听力单词工具交互设计预览">
      <div className="window-top">
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-dot" />
        <span className="window-title">spelling / flashcard mode</span>
      </div>
      <div className="spelling-ui">
        <div className="spelling-progress"><span /></div>
        <div className="word-card">
          <span className="mini-label">中文提示</span>
          <h4>令人信服的</h4>
          <div className="letter-hint">
            <span>c</span><i /><i /><span>v</span><i /><i /><i /><i /><i /><span>g</span>
          </div>
          <div className="fake-input">convincing<span className="cursor" /></div>
        </div>
        <div className="spelling-actions">
          <button type="button" tabIndex={-1}>露出字母</button>
          <button type="button" tabIndex={-1}>检查拼写</button>
        </div>
        <p className="pool-note">错词池 6 · 连续答对 1/2</p>
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
      aria-label="胡文悦的个人照片轮播"
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
          <button type="button" onClick={onPrevious} aria-label="上一张照片">←</button>
          <button type="button" onClick={onNext} aria-label="下一张照片">→</button>
        </div>
      </div>

      <div className="gallery-pagination" role="tablist" aria-label="选择照片">
        {heroSlides.map((slide, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={index === activeIndex}
            aria-label={`查看第 ${index + 1} 张照片`}
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
    <img src={src} alt={`${work.title}视频封面`} loading="lazy" onError={(event) => { event.currentTarget.style.opacity = "0"; }} />
  );
}

function FilmFeature({ work, onPlay }: { work: FilmWork; onPlay: () => void }) {
  return (
    <article className={`film-feature film-${work.genre}`} key={work.id}>
      <button className="film-feature-cover" type="button" onClick={onPlay} aria-label={`播放《${work.title}》`}>
        <span className="film-feature-fallback"><b>{work.title}</b><small>{work.kicker}</small></span>
        <FilmPoster work={work} />
        <span className="film-feature-shade" />
        <span className="film-feature-number">{work.index}</span>
        <span className="film-feature-duration">{work.duration}</span>
        <span className="film-feature-play"><i /> {work.previewSrc ? "播放 36 秒节选" : "播放完整作品"}</span>
      </button>
      <div className="film-feature-copy">
        <div className="film-feature-meta"><span>{work.kicker}</span><b>{work.genre === "fiction" ? "FICTION" : "DOCUMENTARY"}</b></div>
        <h3>{work.title}</h3>
        <p className="film-feature-role">{work.role}</p>
        <p>{work.description}</p>
        <div className="film-feature-footer">
          <div>{work.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <button type="button" onClick={onPlay}>观看 <Arrow /></button>
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
    <div className="film-index" aria-label="作品索引">
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
          <button type="button" onClick={onClose} aria-label="关闭视频">×</button>
        </div>
        <div className="film-player">
          {work.previewSrc ? (
            <video src={work.previewSrc} poster={work.poster} controls autoPlay playsInline preload="metadata">
              当前浏览器无法播放此视频。
            </video>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${work.youtubeId}?rel=0&modestbranding=1&autoplay=1`}
              title={`播放《${work.title}》`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>
        <div className="film-modal-foot">
          <p>{work.description}</p>
          {work.link ? (
            <a href={work.link} target="_blank" rel="noreferrer">在 YouTube 打开 <Arrow diagonal /></a>
          ) : (
            <span>站内节选 · 完整成片本地保存</span>
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
  { id: "interview", name: "interview_03.mp4", time: "12:48", meta: "1920×1080 · 1.2 GB", state: "模型转写", cue: "03:12", quote: "我第一次意识到，熟悉的地方也可以被重新看见。", kind: "采访" },
  { id: "market", name: "market_broll_02.mp4", time: "04:26", meta: "3840×2160 · 860 MB", state: "画面已索引", cue: "01:08", quote: "主人公穿过早市，与摊主打招呼，手中拿着一叠旧照片。", kind: "环境 B-roll" },
  { id: "photos", name: "old_photos_closeup.mov", time: "02:18", meta: "1920×1080 · 420 MB", state: "证据已绑定", cue: "00:44", quote: "旧照片中的街道与当下空镜形成前后对照。", kind: "行动画面" },
];

const arcStoryNodes = [
  { id: "hook", act: "ACT I", title: "熟悉的地方被重新看见", status: "grounded", confidence: 94, evidence: "interview_03.mp4 · 03:12–03:38", context: "保留离开家乡与回来的时间背景" },
  { id: "character", act: "ACT I", title: "主人公与故乡的旧关系", status: "grounded", confidence: 91, evidence: "old_photos_closeup.mov · 00:44–01:06", context: "照片来源与拍摄年代不可静默删除" },
  { id: "want", act: "ACT I", title: "想把私人记忆留下来", status: "grounded", confidence: 89, evidence: "interview_03.mp4 · 05:02–05:31", context: "保留个人愿望与公共记录之间的联系" },
  { id: "friction", act: "ACT II", title: "拍摄遭遇现实阻力", status: "partial", confidence: 68, evidence: "interview_03.mp4 · 07:16–07:49", context: "当前只有口述，不能剪成已经被画面证实" },
  { id: "choice", act: "ACT II", title: "决定从早市开始记录", status: "grounded", confidence: 86, evidence: "market_broll_02.mp4 · 00:28–01:34", context: "行动发生在受访后第二天" },
  { id: "turn", act: "ACT II", title: "旧照片进入现实空间", status: "partial", confidence: 73, evidence: "old_photos_closeup.mov · 01:10–01:45", context: "需要补足主人公如何找到拍摄位置" },
  { id: "peak", act: "ACT III", title: "记忆得到他人的回应", status: "missing", confidence: 34, evidence: "尚无另一人物视角", context: "不可用旁白代替被记录者的真实回应" },
  { id: "resolution", act: "ACT III", title: "留下影像，也重新理解故乡", status: "grounded", confidence: 88, evidence: "interview_03.mp4 · 11:26–12:06", context: "结尾必须回应开场问题" },
];

const arcVariantOptions: Array<{
  id: ArcVariantId;
  label: string;
  target: string;
  actual: string;
  aspect: string;
  retained: number;
  risk: "低" | "中" | "高";
  description: string;
  removed: string;
  mitigation: string;
}> = [
  { id: "doc20", label: "纪录长版", target: "20:00", actual: "18:42", aspect: "16:9", retained: 8, risk: "低", description: "保留八个母版节点与完整因果关系，适合作为纪录片主版本继续人工精剪。", removed: "仅压缩重复表达与无叙事功能的停顿。", mitigation: "逐条核对事实、授权与时间码后进入精剪。" },
  { id: "short5", label: "短纪录版", target: "05:00", actual: "04:51", aspect: "16:9", retained: 6, risk: "中", description: "压缩人物背景，保留愿望、阻力、选择和结果四段核心因果。", removed: "删去部分童年经历与早市空间背景。", mitigation: "用 12 秒字幕卡补足地点与时间信息。" },
  { id: "social90", label: "社媒版", target: "01:30", actual: "01:27", aspect: "16:9", retained: 4, risk: "高", description: "以人物钩子、冲突和行动高点为主，适合社交平台横屏分发。", removed: "动机形成过程与另一视角几乎全部被压缩。", mitigation: "结尾保留原片入口，并避免使用结论式标题。" },
  { id: "trailer30", label: "预告片", target: "00:30", actual: "00:29", aspect: "16:9", retained: 3, risk: "中", description: "建立问题和情绪承诺，不提前假装解决故事中的核心冲突。", removed: "不呈现完整结果，仅留下行动悬念。", mitigation: "文案明确标注为预告，并链接完整版本。" },
  { id: "vertical90", label: "竖屏版", target: "01:30", actual: "01:26", aspect: "9:16", retained: 4, risk: "高", description: "沿用 90 秒结构，并标记可能裁掉关键人物关系的横转竖镜头。", removed: "部分环境信息因画幅变化被弱化。", mitigation: "问题镜头采用留黑而非静默裁切证据。" },
  { id: "multilingual", label: "多语字幕版", target: "05:00", actual: "04:51", aspect: "16:9 · EN", retained: 6, risk: "中", description: "使用同一短纪录结构，并生成带时间码的英文字幕审校轨。", removed: "沿用 5 分钟版的背景压缩策略。", mitigation: "保留专名表与逐条回译检查。" },
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
  { id: "visual-conflict", severity: "critical", category: "冲突可视化", title: "现实阻力只有口述，没有行动画面", evidence: "07:16 的采访提到被拒绝拍摄，但素材库没有对应现场。", why: "若直接使用旁白，观众只能被告知冲突，无法判断它真实如何发生。", action: "补拍主人公再次沟通拍摄许可的中景与反应镜头。" },
  { id: "second-view", severity: "high", category: "人物视角", title: "缺少被记录者对项目的回应", evidence: "当前 19:32 素材全部来自主人公及其观察视角。", why: "单一视角会让结尾的公共意义缺少外部证据。", action: "补访谈一位早市摊主，询问旧照片是否改变其记忆。" },
  { id: "bridge", severity: "high", category: "因果桥接", title: "旧照片如何进入早市现场没有交代", evidence: "01:45 后直接切到 market_broll_02，缺少寻找位置的过程。", why: "关键行动像是被剪辑强行连接，削弱人物选择。", action: "补拍对照照片、确认方位和步行进入现场的连续动作。" },
  { id: "ending", severity: "medium", category: "首尾回应", title: "结尾回应了人物，却没有回到空间", evidence: "最后一句成立，但缺少与开场同机位的街道变化。", why: "空间是故事的第二主角，缺失会让结构闭环偏弱。", action: "在同一机位补拍傍晚空镜，形成视觉回环。" },
];

const arcAgentTrace = [
  { tool: "media.index", label: "读取媒体证据", detail: "FFmpeg 建立时长、画幅、音频和代表帧索引。" },
  { tool: "audio.transcribe", label: "建立对白证据", detail: "FunASR 生成带时间码转写并关联原始素材。" },
  { tool: "vision.observe", label: "描述可见行动", detail: "Qwen3-VL 只记录关键帧中可直接观察到的人物、动作和场景。" },
  { tool: "evidence.search", label: "检索叙事证据", detail: "Agent 按故事假设检索对白、画面与时间码。" },
  { tool: "story.compile", label: "编译六个版本", detail: "确定性 Story Compiler 生成时间线与语境删减账本。" },
  { tool: "gap.audit", label: "审校故事缺口", detail: "Gap Radar 把缺口转换为可执行的补拍和补访谈任务。" },
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
  const [hypothesis, setHypothesis] = useState("一个年轻人通过重拍故乡，重新理解自己为何选择留下。 ");
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
    ["source", "01", "素材与转写"],
    ["compiler", "02", "Story Compiler"],
    ["radar", "03", "Gap Radar"],
    ["agent", "04", "Agent 运行记录"],
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
          <span className="arc-sidebar-label">工作台</span>
          <nav aria-label="ArcProof 演示工作台">
            {workspaceLabels.map(([id, index, label]) => (
              <button type="button" className={workspace === id ? "active" : ""} onClick={() => setWorkspace(id)} key={id}>
                <span>{index}</span><b>{label}</b><em>{id === "source" ? assets.length : id === "compiler" ? 6 : id === "radar" ? arcGaps.length : traceStep}</em>
              </button>
            ))}
          </nav>
          <div className="arc-sidebar-stats">
            <span>当前项目</span>
            <p><b>{assets.length} 个素材</b><small>19:32 原始时长</small></p>
            <p><b>8 / 8</b><small>母版节点已建立</small></p>
            <p><b>4</b><small>待处理叙事缺口</small></p>
          </div>
          <div className="arc-sidebar-principle"><b>Canonical first.</b><p>所有版本都从同一母版故事编译，并记录被删掉的语境。</p></div>
        </aside>

        <section className="arc-demo-workspace" aria-live="polite">
          {runState === "running" && (
            <div className="arc-run-strip">
              <span><i style={{ width: `${Math.max(8, (traceStep / arcAgentTrace.length) * 100)}%` }} /></span>
              <p><b>Agent 正在调用工具</b>{arcAgentTrace[Math.min(traceStep, arcAgentTrace.length - 1)]?.label}</p>
              <em>{traceStep}/{arcAgentTrace.length}</em>
            </div>
          )}

          {workspace === "source" && (
            <div className="arc-source-workspace">
              <div className="arc-workspace-hero">
                <div><span>CANONICAL STORY SYSTEM</span><h4>先读懂证据，再决定剪成什么。</h4><p>原片、转写和画面观察都保留时间码，故事结论可以回到源素材核查。</p></div>
                <button type="button" onClick={runAgent} disabled={runState === "running"}>{runState === "running" ? "分析中…" : "运行 ArcProof Agent"} <Arrow /></button>
              </div>
              <label className="arc-hypothesis">要验证的故事假设<textarea value={hypothesis} onChange={(event) => setHypothesis(event.target.value)} /></label>
              <div className="arc-metric-strip"><span><b>19:32</b>源素材</span><span><b>100%</b>转写覆盖</span><span><b>36</b>画面观察</span><span><b>LOCAL</b>原片不出本机</span></div>
              <div className="arc-source-grid">
                <section className="arc-asset-panel">
                  <div className="arc-panel-heading"><div><span>SOURCE INDEX</span><h5>素材与证据入口</h5></div><label htmlFor="arc-demo-upload">＋ 添加代理文件</label></div>
                  <input
                    className="visually-hidden"
                    id="arc-demo-upload"
                    type="file"
                    accept="video/*,.srt,.vtt,.txt"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const next = { id: "custom", name: file.name, time: "待分析", meta: `${(file.size / 1024 / 1024).toFixed(1)} MB · 本地预览`, state: "待建立索引", cue: "—", quote: "文件只在当前浏览器中显示；此作品集不会上传或分析原片。", kind: "自选素材" };
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
                  <p className="arc-data-boundary"><b>数据边界</b>视频、音频、关键帧与向量保留在本机；Agent 只读取检索后的结构化文本证据。</p>
                </section>
              </div>
            </div>
          )}

          {workspace === "compiler" && (
            <div className="arc-compiler-workspace">
              <div className="arc-workspace-hero compact">
                <div><span>CANONICAL STORY SPINE</span><h4>一个母版故事，六个可追溯版本。</h4><p>母版节点是证据合同。删去任何关键语境，都会进入 Removed Context Ledger。</p></div>
                <span className="arc-result-mode">✓ AGENT 审校完成</span>
              </div>
              <div className="arc-spine-board" aria-label="八个母版叙事节点">
                {arcStoryNodes.map((node, index) => (
                  <article className={node.status} key={node.id}>
                    <div><span>{String(index + 1).padStart(2, "0")} · {node.act}</span><em>{node.status === "grounded" ? "证据充分" : node.status === "partial" ? "部分成立" : "存在缺口"}</em></div>
                    <h5>{node.title}</h5>
                    <p>{node.evidence}</p>
                    <small>{node.confidence}% confidence</small>
                    <button type="button" className={lockedNodes.includes(node.id) ? "locked" : ""} onClick={() => setLockedNodes((current) => current.includes(node.id) ? current.filter((id) => id !== node.id) : [...current, node.id])}>
                      {lockedNodes.includes(node.id) ? "语境已锁定" : "锁定语境"}
                    </button>
                  </article>
                ))}
              </div>
              <section className="arc-variant-section">
                <div className="arc-panel-heading"><div><span>STORY COMPILER OUTPUT</span><h5>六个目标版本</h5></div><em>从同一母版编译</em></div>
                <div className="arc-variant-tabs" role="tablist" aria-label="成片版本">
                  {arcVariantOptions.map((variant) => (
                    <button type="button" role="tab" aria-selected={variantId === variant.id} className={variantId === variant.id ? "active" : ""} onClick={() => { setVariantId(variant.id); setExported(""); }} key={variant.id}>
                      <b>{variant.label}</b><span>{variant.actual} / {variant.target}</span><em className={`risk-${variant.risk}`}>{variant.aspect} · {variant.risk}风险</em>
                    </button>
                  ))}
                </div>
                <div className="arc-variant-detail">
                  <div className="arc-variant-summary">
                    <span>{selectedVariant.id.toUpperCase()} · {selectedVariant.aspect}</span>
                    <h5>{selectedVariant.label}</h5>
                    <p>{selectedVariant.description}</p>
                    <dl><div><dt>可生成时长</dt><dd>{selectedVariant.actual}</dd></div><div><dt>保留节点</dt><dd>{selectedVariant.retained} / 8</dd></div><div><dt>语境风险</dt><dd>{selectedVariant.risk}</dd></div></dl>
                    <div className={`arc-risk-callout risk-${selectedVariant.risk}`}><b>Removed Context Ledger</b><p>{selectedVariant.removed}</p><small>{selectedVariant.mitigation}</small></div>
                    <div className="arc-export-row">
                      {(["EDL", "JSON", "SRT"] as const).map((kind) => <button type="button" onClick={() => downloadArtifact(kind)} key={kind}>导出 {kind}</button>)}
                      <span>{exported ? `${exported} 已生成` : "可交付到剪辑工作流"}</span>
                    </div>
                  </div>
                  <div className="arc-timeline-panel">
                    <div className="arc-panel-heading"><div><span>EDIT DECISION LIST</span><h5>编译时间线</h5></div><em>{Math.min(selectedVariant.retained, arcTimeline.length)} clips</em></div>
                    <div className="arc-timeline-list">
                      {arcTimeline.slice(0, Math.min(selectedVariant.retained, arcTimeline.length)).map((item, index) => (
                        <article key={item.role}><span>{String(index + 1).padStart(2, "0")}</span><div><i style={{ width: item.width }} /><b>{item.role}</b><small>{item.file} · 源 {item.source} · 成片 {item.record}</small></div></article>
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
                <div><span>STORY GAP RADAR</span><h4>把“故事还缺什么”变成可执行任务。</h4><p>每个缺口都绑定素材证据、影响节点、补拍动作与完成标准。</p></div>
                <div className="arc-radar-score"><b>3</b><span>项高优先级</span><small>{completedTasks.length}/{arcGaps.length} 已完成</small></div>
              </div>
              <div className="arc-gap-controls">
                <div>{(["all", "critical", "high", "medium"] as const).map((filter) => <button type="button" className={gapFilter === filter ? "active" : ""} onClick={() => setGapFilter(filter)} key={filter}>{filter === "all" ? `全部 ${arcGaps.length}` : filter === "critical" ? "关键" : filter === "high" ? "高" : "中"}</button>)}</div>
                <button type="button" onClick={() => downloadArtifact("CSV")}>导出补拍计划 CSV</button>
              </div>
              <div className="arc-gap-list">
                {visibleGaps.map((gap, index) => (
                  <article className={gap.severity} key={gap.id}>
                    <div className="arc-gap-rank"><span>{String(index + 1).padStart(2, "0")}</span><em>{gap.severity === "critical" ? "关键" : gap.severity === "high" ? "高" : "中"}优先级</em></div>
                    <div className="arc-gap-copy"><span>{gap.category}</span><h5>{gap.title}</h5><div><p><b>素材证据</b>{gap.evidence}</p><p><b>为什么重要</b>{gap.why}</p><p><b>建议动作</b>{gap.action}</p></div></div>
                    <button type="button" className={completedTasks.includes(gap.id) ? "done" : ""} onClick={() => setCompletedTasks((current) => current.includes(gap.id) ? current.filter((id) => id !== gap.id) : [...current, gap.id])}>{completedTasks.includes(gap.id) ? "✓ 已补拍" : "标记已补拍"}</button>
                  </article>
                ))}
              </div>
            </div>
          )}

          {workspace === "agent" && (
            <div className="arc-agent-workspace">
              <div className="arc-workspace-hero compact">
                <div><span>AGENT EXECUTION</span><h4>每一步都能核查，不用假进度条包装。</h4><p>DeepSeek 负责调用证据工具，确定性编译器负责版本结构、语境账本和可交付文件。</p></div>
                <button type="button" onClick={runAgent} disabled={runState === "running"}>{runState === "running" ? "运行中…" : "重新运行 Agent"}</button>
              </div>
              <div className="arc-agent-grid">
                <section className="arc-trace-panel">
                  <div className="arc-panel-heading"><div><span>RUN TRACE</span><h5>本次运行</h5></div><em>{traceStep} events</em></div>
                  {arcAgentTrace.map((step, index) => {
                    const status = index < traceStep ? "done" : index === traceStep && runState === "running" ? "running" : "pending";
                    return <article className={status} key={step.tool}><span>{status === "done" ? "✓" : status === "running" ? "…" : "—"}</span><div><b>{step.label}</b><code>{step.tool}</code><p>{step.detail}</p></div></article>;
                  })}
                </section>
                <section className="arc-interface-panel">
                  <div className="arc-panel-heading"><div><span>IMPLEMENTED INTERFACES</span><h5>真实技术与交付边界</h5></div><em>LOCAL-FIRST</em></div>
                  <article><span>LOCAL</span><div><b>FFmpeg + FunASR</b><p>媒体索引、音频抽取、带时间码转写。</p></div></article>
                  <article><span>LOCAL</span><div><b>Qwen3-VL + Embedding</b><p>可见画面描述与本地证据向量检索。</p></div></article>
                  <article><span>AGENT</span><div><b>DeepSeek Tool Calls</b><p>检索证据、审校母版、发现语境与故事缺口。</p></div></article>
                  <article><span>OUTPUT</span><div><b>EDL · SRT · CSV · JSON · MP4</b><p>把分析结果带回真实剪辑与补拍流程。</p></div></article>
                  <div className="arc-interface-note"><b>原片不出本机</b><p>发送给 Agent 的是结构化文本证据，不是完整视频、音频或关键帧。</p></div>
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
    name: "雾蓝原木",
    caption: "清爽、显亮，也能中和深色家具",
    match: 89,
    palette: ["#90b7ce", "#c8aa89", "#f5f2eb"],
    reasoning:
      "用浅色织物提亮采光，以低饱和雾蓝降低深色家具的压迫感，再用少量原木色把冷暖关系拉回平衡。",
    products: [
      { id: "mist-lamp", name: "暖光落地灯", keyword: "原木落地灯 租房 暖光", price: 159, icon: "shop-lamp" },
      { id: "mist-curtain", name: "雾蓝遮光窗帘", keyword: "免打孔 雾蓝 遮光窗帘", price: 129, icon: "shop-curtain" },
      { id: "mist-rug", name: "浅灰短绒地毯", keyword: "可机洗 浅灰 短绒地毯", price: 199, icon: "shop-rug" },
      { id: "mist-cushion", name: "蓝灰靠垫组合", keyword: "蓝灰 靠垫套 45x45", price: 88, icon: "shop-cushion" },
    ],
  },
  {
    id: "cream",
    name: "奶油侘寂",
    caption: "柔和、松弛，适合弱采光小空间",
    match: 84,
    palette: ["#e8dcc8", "#c8b59d", "#f7f1e8"],
    reasoning:
      "用同色系奶油白减少视觉切割，藤编与亚麻材质增加层次；整体保持轻量，不遮挡窗边的自然光。",
    products: [
      { id: "cream-lamp", name: "纸艺落地灯", keyword: "纸艺落地灯 奶油风 暖光", price: 189, icon: "shop-lamp" },
      { id: "cream-curtain", name: "米白亚麻窗帘", keyword: "免打孔 米白 亚麻窗帘", price: 149, icon: "shop-curtain cream" },
      { id: "cream-rug", name: "燕麦色圈绒地毯", keyword: "燕麦色 圈绒地毯 可水洗", price: 229, icon: "shop-rug cream" },
      { id: "cream-basket", name: "藤编收纳篮", keyword: "藤编收纳篮 带盖 小户型", price: 79, icon: "shop-basket" },
    ],
  },
  {
    id: "retro",
    name: "复古暖棕",
    caption: "保留旧家具质感，增加电影感氛围",
    match: 78,
    palette: ["#a66f58", "#c9a66b", "#465a68"],
    reasoning:
      "不回避原有深色家具，而是用焦糖棕、黄铜与深蓝做统一，让旧家具从“沉重”变成有意选择的复古基调。",
    products: [
      { id: "retro-lamp", name: "黄铜阅读灯", keyword: "黄铜阅读灯 复古 租房", price: 219, icon: "shop-lamp retro" },
      { id: "retro-curtain", name: "焦糖棕窗帘", keyword: "免打孔 焦糖棕 窗帘", price: 169, icon: "shop-curtain retro" },
      { id: "retro-rug", name: "几何复古地毯", keyword: "复古 几何地毯 小户型", price: 269, icon: "shop-rug retro" },
      { id: "retro-frame", name: "胡桃木色画框", keyword: "胡桃木色 画框 免钉", price: 96, icon: "shop-frame" },
    ],
  },
];

const roomSignals = [
  { icon: "☀", label: "自然采光", value: "中等偏弱", confidence: "72%" },
  { icon: "◫", label: "可用面积", value: "约 11㎡", confidence: "78%" },
  { icon: "◒", label: "主体色温", value: "冷灰中性", confidence: "86%" },
  { icon: "▥", label: "固定家具", value: "深色木纹", confidence: "84%" },
];

const constraintLabels: Record<RoomConstraint, string> = {
  noDrill: "免打孔",
  movable: "搬家可带走",
  compact: "小户型优先",
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
      `RoomMood｜${activeStyle.name}软装采购搜索词`,
      ...selectedProducts.map(
        (product, index) => `${index + 1}. ${product.name}｜${product.keyword}｜参考价 ¥${product.price}`
      ),
      `合计参考价：¥${selectedTotal}`,
      "说明：商品与价格为 Demo 示例，未连接淘宝实时数据。",
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
          <span className="demo-kicker">01 / 空间输入</span>
          <span className="local-only-badge">LOCAL PREVIEW</span>
        </div>
        <div className={`room-photo-stage ${roomImage ? "has-photo" : ""} ${analysisState === "scanning" ? "is-scanning" : ""}`}>
          {roomImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={roomImage} alt="用户选择的租房原始照片预览" />
            </>
          ) : (
            <div className="room-scene-large" aria-label="样例出租房示意图" role="img">
              <i className="large-window" />
              <i className="large-bed" />
              <i className="large-desk" />
              <i className="large-floor" />
              <span>样例原始房间</span>
            </div>
          )}
          {analyzed && previewMode === "palette" && (
            <div
              className="palette-preview-overlay"
              style={{
                background: `linear-gradient(135deg, ${activeStyle.palette[0]}70, transparent 52%), linear-gradient(320deg, ${activeStyle.palette[1]}52, transparent 58%)`,
              }}
              aria-label={`${activeStyle.name}配色氛围预览`}
            >
              <span>配色氛围预览 · 非效果图</span>
            </div>
          )}
          {analysisState === "scanning" && (
            <div className="scan-overlay" aria-live="polite">
              <i />
              <span>正在识别采光、色温与固定家具…</span>
            </div>
          )}
          <span className="local-photo-tag">照片不上传</span>
        </div>

        <div className="room-stepper" aria-label="体验进度">
          <span className="is-done"><b>01</b>上传照片</span>
          <span className={analysisState !== "idle" ? "is-done" : ""}><b>02</b>空间诊断</span>
          <span className={analyzed ? "is-done" : ""}><b>03</b>生成清单</span>
        </div>

        {analyzed && (
          <div className="preview-switcher" aria-label="照片预览模式">
            <button
              type="button"
              className={previewMode === "original" ? "active" : ""}
              onClick={() => setPreviewMode("original")}
            >
              原图
            </button>
            <button
              type="button"
              className={previewMode === "palette" ? "active" : ""}
              onClick={() => setPreviewMode("palette")}
            >
              配色氛围
            </button>
          </div>
        )}

        <div className="room-upload-actions">
          <label className="demo-secondary upload-label" htmlFor="room-photo-upload">
            {roomImage ? "更换照片" : "选择照片"}
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
              ? "正在分析…"
              : analyzed
                ? "重新分析"
                : roomImage
                  ? "分析我的房间"
                  : "分析示例空间"} {analysisState !== "scanning" && <Arrow />}
          </button>
        </div>
      </div>

      <div className={`demo-panel room-result-panel ${analyzed ? "is-ready" : ""}`} aria-live="polite">
        {analysisState === "idle" ? (
          <div className="empty-result">
            <span>⌂</span>
            <p>选择租房原始照片，或直接分析示例空间，体验从诊断到采购清单的完整流程。</p>
          </div>
        ) : analysisState === "scanning" ? (
          <div className="room-loading-state" aria-live="polite">
            <div className="loading-orbit"><i /><i /><i /></div>
            <span className="demo-kicker">READING THE ROOM</span>
            <h4>正在理解这个空间</h4>
            <p>分析采光、面积、色温和不可移动家具，随后匹配更适合租住场景的软装方案。</p>
            <div className="loading-track"><span /></div>
          </div>
        ) : (
          <>
            <div className="room-result-heading">
              <div>
                <span className="demo-kicker">02 / 推荐结果</span>
                <h4>{activeStyle.name}</h4>
              </div>
              <div>
                <span className="match-score">{activeStyle.match}% MATCH</span>
                <div className="room-palette-large" aria-label={`${activeStyle.name}推荐配色`}>
                  {activeStyle.palette.map((color) => <i key={color} style={{ background: color }} />)}
                </div>
              </div>
            </div>

            <div className="room-tabs" role="tablist" aria-label="软装方案详情">
              {([
                ["analysis", "空间诊断"],
                ["style", "风格方案"],
                ["shopping", `采购清单 ${selectedProducts.length}`],
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
                      <div><span>租房约束</span><small>点击可调整推荐偏好</small></div>
                      <b>{Object.values(constraints).filter(Boolean).length} 项已启用</b>
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
                    查看 3 个风格方案 <Arrow />
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
                    <span>为什么适合</span>
                    <p>{activeStyle.reasoning}</p>
                  </div>
                  <button className="tab-next-button" type="button" onClick={() => setActiveTab("shopping")}>
                    按这个风格选商品 <Arrow />
                  </button>
                </div>
              )}

              {activeTab === "shopping" && (
                <div className="shopping-tab">
                  <div className="budget-control">
                    <div className="tab-section-heading">
                      <div><span>软装预算</span><small>只影响本次 Demo 清单</small></div>
                      <b>¥{budget}</b>
                    </div>
                    <div className="budget-options" aria-label="预算选择">
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

                  <div className="shopping-list" aria-label="可选择的软装商品">
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
                      <span>已选 {selectedProducts.length} 件 · 合计 <b>¥{selectedTotal}</b></span>
                      <em>{selectedTotal > budget ? `超出 ¥${selectedTotal - budget}` : `还剩 ¥${budget - selectedTotal}`}</em>
                    </div>
                    <div className="budget-meter"><span style={{ width: `${Math.min((selectedTotal / budget) * 100, 100)}%` }} /></div>
                  </div>

                  <div className="shopping-actions">
                    <button type="button" className="copy-list-button" onClick={copyShoppingList} disabled={!selectedProducts.length}>
                      {copied ? "搜索词已复制 ✓" : "复制淘宝搜索词"}
                    </button>
                    <div className="taobao-status">
                      <span>淘宝商品跳转</span>
                      <b>未接入 · CONCEPT ONLY</b>
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
        <div><span>IELTS ACADEMIC WRITING · TASK 1</span><h4>全球森林与木材分布</h4><p>段落式中译英训练：引言 → 概述 → 数据细节</p></div>
        <b>{completed} / 2 已作答</b>
        <div className="essay-demo-track"><span style={{ width: `${completed * 50}%` }} /></div>
      </header>

      <div className="essay-toolbar">
        <button type="button" onClick={() => setShowSource((value) => !value)}>{showSource ? "隐藏段落原文" : "显示段落原文"}</button>
        <button type="button" onClick={() => setShowRef(true)}>显示参考译文</button>
        <button type="button" onClick={() => { setShowRef(false); setShowFocus(false); }}>隐藏全部答案</button>
      </div>

      <section className="essay-paragraph-card">
        <div className="essay-demo-top">
          <div><span className="demo-kicker">PARAGRAPH {index + 1}</span><h4>{current.label}｜{current.title}</h4><p className="essay-purpose"><b>本段功能：</b>先理解段落在全文中的作用，再检查数据、比较关系和衔接方式。</p></div>
          <button type="button" onClick={next}>切换段落 <Arrow /></button>
        </div>

        {showSource && <div className="essay-source"><b>本段英文原文</b><p>{current.ref}</p></div>}

        <div className="essay-whole">
          <div><b>整段翻译（选做）</b><p>先尝试完整组织段落，再进入逐句训练。</p></div>
          <textarea value={paragraphAnswer} onChange={(event) => setParagraphAnswer(event.target.value)} placeholder="请尝试将这一整段翻译成英文……" />
        </div>

        <article className="essay-sentence-card">
          <div className="essay-sentence-meta"><span>1</span><p>第 {index + 1} 段 · 句子 1 / 1</p></div>
          <p className="essay-zh">{current.zh}</p>
          <label htmlFor="essay-answer">你的英文翻译</label>
          <textarea id="essay-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} placeholder="请独立翻译这句话……" />
          <div className="essay-answer-buttons">
            <button type="button" onClick={() => setShowRef((value) => !value)}>{showRef ? "隐藏参考译文" : "显示参考译文"}</button>
            <button type="button" onClick={() => setShowFocus((value) => !value)}>{showFocus ? "隐藏语法重点" : "显示语法重点"}</button>
          </div>
          {showRef && <div className="essay-reference is-ref"><b>参考译文</b><p>{current.ref}</p></div>}
          {showFocus && <div className="essay-reference is-focus"><b>本句核心表达</b><p>{current.focus}</p></div>}
        </article>

        <div className="essay-drill"><span>核心词汇与语法挖空</span><p>{current.blank}</p><button type="button" onClick={() => setShowRef((value) => !value)}>查看对应原句</button></div>
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
        <span className="demo-kicker">闪卡 {index + 1} / {spellingWords.length}</span>
        <h4>{current.meaning}</h4>
        <p className="demo-hint-word" aria-label="拼写提示">{hintWord}</p>
        <div className="hint-buttons" aria-label="提示强度">
          <button type="button" className={hint === 0 ? "active" : ""} onClick={() => setHint(0)}>全遮</button>
          <button type="button" className={hint === 1 ? "active" : ""} onClick={() => setHint(1)}>露字母</button>
          <button type="button" className={hint === 2 ? "active" : ""} onClick={() => setHint(2)}>看答案</button>
        </div>
      </div>
      <form className="demo-panel spelling-answer-panel" onSubmit={check}>
        <label htmlFor="spelling-answer">根据中文提示拼写</label>
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
        {status === "right" && <p className="answer-status right" aria-live="polite">拼写正确。再答对一次即可移出错词池。</p>}
        {status === "wrong" && <p className="answer-status wrong" aria-live="polite">还差一点。可以先露出几个字母再试。</p>}
        {status === "idle" && <p className="sample-sentence">{current.sentence.replace(new RegExp(current.word, "i"), "________")}</p>}
        <div className="answer-actions">
          <button className="demo-primary" type="submit">检查拼写</button>
          <button className="demo-secondary" type="button" onClick={next}>下一词 <Arrow /></button>
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
          <button className="modal-close" type="button" onClick={onClose} aria-label="关闭演示">×</button>
        </div>
        {type === "arcproof" && <ArcDemo />}
        {type === "room" && <RoomDemo />}
        {type === "essay" && <EssayDemo />}
        {type === "spelling" && <SpellingDemo />}
        <p className="demo-disclaimer">
          {type === "arcproof"
            ? "这是基于 ArcProof 0.6 真实产品结构制作的交互样例，使用预置素材演示完整工作流；本地正式版会调用 FFmpeg、FunASR、Qwen3-VL 与 DeepSeek Agent。"
            : type === "room"
              ? "照片只在当前浏览器中预览；推荐结果为 Demo 示例，淘宝购买跳转尚未接入。"
              : type === "essay"
                ? "这是译构的核心训练链路：把范文拆成段落功能、翻译练习和表达挖空，所有内容均可在当前页面交互。"
                : "这是核心学习链路的轻量试用版。"}
        </p>
      </section>
    </div>
  );
}

export default function Home() {
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
        <a className="wordmark" href="#home" aria-label="返回首页">
          <span>WY</span>
          <b>胡文悦</b>
        </a>
        <button
          type="button"
          className="menu-button"
          aria-label={menuOpen ? "关闭导航" : "打开导航"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
        <nav className={menuOpen ? "is-open" : ""} aria-label="页面导航">
          <a href="#home" onClick={() => setMenuOpen(false)}>首页</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>经历</a>
          <a href="#works" onClick={() => setMenuOpen(false)}>作品</a>
          <a href="#content" onClick={() => setMenuOpen(false)}>创作</a>
          <a className="nav-resume" href="/hu-wenyue-resume.pdf" target="_blank" rel="noreferrer">
            查看简历 <Arrow diagonal />
          </a>
        </nav>
      </header>

      <section className="hero section-shell" id="home">
        <div className="hero-copy">
          <p className="hero-role">AI PRODUCT · CONTENT · FILM</p>
          <h1>你好，我是<br />胡文悦。</h1>
          <div className="hero-actions">
            <a className="primary-button" href="/hu-wenyue-resume.pdf" target="_blank" rel="noreferrer">
              一键查看简历 <Arrow />
            </a>
            <a className="text-button" href="#works">看看我做的产品 <Arrow /></a>
          </div>
          <div className="hero-capabilities" aria-label="核心能力">
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
              <h2>研究人，也研究产品。</h2>
            </div>
            <p>从语言、影像到 AI 学习产品，我的经历看似跨界，但始终围绕同一件事：理解人如何表达、学习和做决定。</p>
          </div>

          <div className="experience-grid">
            <aside className="education-card glass-card">
              <p className="card-label">教育背景</p>
              <article>
                <span className="edu-time">2026.10 — 2027.07</span>
                <h3>剑桥大学</h3>
                <p>MPhil in Film and Screen Studies</p>
                <small>即将入读 · 电影与屏幕研究硕士</small>
              </article>
              <article>
                <span className="edu-time">2022.09 — 2026.07</span>
                <h3>清华大学</h3>
                <p>汉语言文学 · 本科</p>
                <small>GPA 3.9 / 4.0 · 前 10% · 2025 国家奖学金</small>
              </article>
              <div className="education-footer">
                <span>IELTS 8.0</span>
                <span>Python & Digital Humanities</span>
                <span>学生记者团团长</span>
              </div>
            </aside>

            <div className="career-experience">
              <div className="career-label-row">
                <p className="card-label">实习时间轴</p>
                <span>点击节点查看详情</span>
              </div>
              <div className="career-timeline" role="tablist" aria-label="实习经历时间轴">
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
            <h2>从“我需要一个工具”开始。</h2>
          </div>
          <p>这些作品都来自我或身边的人反复遇到的问题。我先拆解使用场景，再借助 Codex 与 Claude Code 把想法变成能跑、能试、能继续迭代的产品。</p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card project-${project.id}`} key={project.id}>
              <div className="project-preview">
                <ProjectVisual type={project.id} />
                <button className="preview-trigger" type="button" onClick={() => setActiveDemo(project.id)}>
                  点击体验交互 <Arrow />
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
                    试用作品 <Arrow />
                  </button>
                  {project.link && (
                    <a className="text-button" href={project.link} target="_blank" rel="noreferrer">
                      GitHub 源码 <Arrow diagonal />
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
              <h2>也用镜头，理解人。</h2>
            </div>
            <p>产品之外，我长期做内容和影像。对平台、节奏与叙事的判断，也构成了我理解用户和创作工具的另一条路径。</p>
          </div>

          <aside className="content-practice" aria-label="DramaBox 内容创作经历">
            <div className="content-practice-copy">
              <span>CONTENT PRACTICE · DRAMABOX</span>
              <h3>把平台数据，带回下一次创作判断。</h3>
              <p>负责海外短剧社媒内容的选题、剪辑和平台适配。这里不展示未公开的商业素材，只保留可验证的结果与方法。</p>
            </div>
            <div className="content-practice-metrics">
              <article><strong>9M+</strong><span>累计播放</span></article>
              <article><strong>300K+</strong><span>累计点赞</span></article>
              <article><strong>04</strong><span>海外平台</span></article>
            </div>
          </aside>

          <div className="film-showcase">
            <div className="film-showcase-head">
              <div>
                <span>SELECTED FILMS · 04 WORKS</span>
                <h3>三部纪录片，一部虚构短片。</h3>
              </div>
              <p>选择右侧作品即可切换主舞台。四部作品都已接入 YouTube 完整成片，可直接在站内观看。</p>
            </div>

            <div className="film-filter" aria-label="筛选影像作品">
              {([
                ["all", "全部作品"],
                ["documentary", "纪录片"],
                ["fiction", "虚构短片"],
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
            <h2>想聊聊 AI 产品、影像，或者一个值得做出来的问题？</h2>
          </div>
          <div className="footer-contact">
            <a href="mailto:nicolehwy@163.com">nicolehwy@163.com <Arrow diagonal /></a>
            <button type="button" onClick={copyContact} aria-label="复制电话和微信号 15210890818">
              电话 / 微信 · 15210890818
              <span aria-live="polite">{contactCopied ? "已复制" : "复制"}</span>
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
