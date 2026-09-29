"use client"

import {
  BrainCircuit,
  Car,
  ChartLine,
  Cloud,
  CodeXml,
  Cpu,
  Factory,
  FlaskConical,
  Gamepad2,
  Handshake,
  Landmark,
  Megaphone,
  Palette,
  Scale,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { IntroMarquee } from "@/app/intro/components/intro-marquee"
import { IntroReveal } from "@/app/intro/components/intro-reveal"
import { cn } from "@/lib/utils"
import { AllianceSection, AllianceSectionHeading } from "../alliance-section"

type Headhunter = {
  name: string
  photo: string
  domain: string
  icon: LucideIcon
  background: string
  tags: readonly string[]
  accent: "blue" | "gold"
}

const TOP_ROW: readonly Headhunter[] = [
  {
    name: "김○○",
    photo: "/alliance/headhunters/hh-01-kim.jpg",
    domain: "반도체 공정·장비",
    icon: Cpu,
    background: "대기업 반도체 HR 출신 · 12년",
    tags: ["공정 엔지니어", "설비 리드"],
    accent: "blue",
  },
  {
    name: "이○○",
    photo: "/alliance/headhunters/hh-02-lee.jpg",
    domain: "백엔드·플랫폼 개발",
    icon: CodeXml,
    background: "IT 서비스 테크 리크루터 출신 · 9년",
    tags: ["백엔드 리드", "플랫폼 엔지니어"],
    accent: "gold",
  },
  {
    name: "박○○",
    photo: "/alliance/headhunters/hh-03-park.jpg",
    domain: "금융·투자",
    icon: Landmark,
    background: "증권사 IB 출신 · 11년",
    tags: ["IB", "리스크 관리", "CFO"],
    accent: "blue",
  },
  {
    name: "최○○",
    photo: "/alliance/headhunters/hh-04-choi.jpg",
    domain: "바이오·제약 R&D",
    icon: FlaskConical,
    background: "제약사 연구기획 출신 · 10년",
    tags: ["임상 개발", "RA"],
    accent: "gold",
  },
  {
    name: "정○○",
    photo: "/alliance/headhunters/hh-05-jung.jpg",
    domain: "브랜드·퍼포먼스 마케팅",
    icon: Megaphone,
    background: "글로벌 에이전시 출신 · 8년",
    tags: ["브랜드 매니저", "그로스 리드"],
    accent: "blue",
  },
  {
    name: "강○○",
    photo: "/alliance/headhunters/hh-06-kang.jpg",
    domain: "AI·데이터",
    icon: BrainCircuit,
    background: "AI 스타트업 채용 총괄 출신 · 7년",
    tags: ["ML 엔지니어", "데이터 사이언티스트"],
    accent: "gold",
  },
  {
    name: "조○○",
    photo: "/alliance/headhunters/hh-07-cho.jpg",
    domain: "생산·품질 관리",
    icon: Factory,
    background: "자동차 부품사 생산기술 출신 · 14년",
    tags: ["품질 관리", "공장장"],
    accent: "blue",
  },
  {
    name: "윤○○",
    photo: "/alliance/headhunters/hh-08-yoon.jpg",
    domain: "법무·컴플라이언스",
    icon: Scale,
    background: "로펌 인사 담당 출신 · 10년",
    tags: ["사내 변호사", "준법감시"],
    accent: "gold",
  },
]

const BOTTOM_ROW: readonly Headhunter[] = [
  {
    name: "장○○",
    photo: "/alliance/headhunters/hh-09-jang.jpg",
    domain: "프로덕트·UX 디자인",
    icon: Palette,
    background: "커머스 디자인 리드 출신 · 9년",
    tags: ["프로덕트 디자이너", "디자인 리드"],
    accent: "gold",
  },
  {
    name: "임○○",
    photo: "/alliance/headhunters/hh-10-lim.jpg",
    domain: "B2B 영업·BD",
    icon: Handshake,
    background: "SaaS 기업 세일즈 총괄 출신 · 12년",
    tags: ["엔터프라이즈 세일즈", "BD 리드"],
    accent: "blue",
  },
  {
    name: "한○○",
    photo: "/alliance/headhunters/hh-11-han.jpg",
    domain: "게임 개발·기획",
    icon: Gamepad2,
    background: "대형 게임사 채용 담당 출신 · 8년",
    tags: ["클라이언트 개발", "시스템 기획"],
    accent: "gold",
  },
  {
    name: "오○○",
    photo: "/alliance/headhunters/hh-12-oh.jpg",
    domain: "인사·경영지원",
    icon: Users,
    background: "HR 컨설팅 펌 출신 · 13년",
    tags: ["HRBP", "경영기획"],
    accent: "blue",
  },
  {
    name: "서○○",
    photo: "/alliance/headhunters/hh-13-seo.jpg",
    domain: "모빌리티·자동차",
    icon: Car,
    background: "완성차 R&D 인사 출신 · 11년",
    tags: ["자율주행", "전장 설계"],
    accent: "gold",
  },
  {
    name: "신○○",
    photo: "/alliance/headhunters/hh-14-shin.jpg",
    domain: "클라우드·인프라",
    icon: Cloud,
    background: "클라우드 MSP 기술 영업 출신 · 9년",
    tags: ["DevOps", "SRE", "보안"],
    accent: "blue",
  },
  {
    name: "권○○",
    photo: "/alliance/headhunters/hh-15-kwon.jpg",
    domain: "커머스·리테일 MD",
    icon: ShoppingBag,
    background: "이커머스 MD 팀장 출신 · 10년",
    tags: ["카테고리 MD", "영업기획"],
    accent: "gold",
  },
  {
    name: "황○○",
    photo: "/alliance/headhunters/hh-16-hwang.jpg",
    domain: "재무·회계",
    icon: ChartLine,
    background: "Big4 회계법인 출신 · 12년",
    tags: ["재무팀장", "IR", "FP&A"],
    accent: "blue",
  },
]

const DOMAINS = [
  "IT·개발",
  "AI·데이터",
  "반도체·하드웨어",
  "금융·투자",
  "바이오·헬스케어",
  "브랜드·마케팅",
  "디자인",
  "영업·BD",
  "생산·품질",
  "인사·경영지원",
  "법무·컴플라이언스",
  "게임",
  "모빌리티",
  "커머스·리테일",
] as const

const MARQUEE_REPEAT = 2

function repeatCards(cards: readonly Headhunter[], times = MARQUEE_REPEAT) {
  return Array.from({ length: times }, () => cards).flat()
}

function HeadhunterCard({ headhunter }: { headhunter: Headhunter }) {
  const Icon = headhunter.icon

  return (
    <article className="flex w-[260px] shrink-0 flex-col rounded-2xl border border-white/[0.08] bg-[#0f131c] p-5 text-left md:w-[300px]">
      <div className="flex items-center gap-3.5">
        <div className="relative shrink-0">
          <Image
            src={headhunter.photo}
            alt={`${headhunter.domain} 전문 헤드헌터 프로필 사진`}
            width={56}
            height={56}
            className={cn(
              "size-14 rounded-full object-cover ring-2 ring-offset-2 ring-offset-[#0f131c]",
              headhunter.accent === "blue" ? "ring-[#1A7CFF]/50" : "ring-[#d9b877]/55",
            )}
          />
          <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border border-white/[0.12] bg-[#151a26]">
            <Icon
              className={cn("size-3.5", headhunter.accent === "blue" ? "text-[#6aa8ff]" : "text-[#d9b877]")}
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-white/45">
            {headhunter.name} <span className="text-white/35">헤드헌터</span>
          </p>
          <h3 className="mt-0.5 truncate text-[15px] font-semibold text-white">{headhunter.domain}</h3>
        </div>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-white/50">{headhunter.background}</p>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {headhunter.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/65"
          >
            {tag}
          </li>
        ))}
      </ul>
    </article>
  )
}

export function AllianceHeadhuntersSection() {
  return (
    <AllianceSection id="headhunters" variant="alt" innerClassName="max-w-none px-0">
      <div className="px-4 md:px-8">
        <AllianceSectionHeading
          title={
            <>
              분야마다, 그 분야를
              <br className="md:hidden" /> <span className="alliance-text-gold">가장 잘 아는</span> 헤드헌터
            </>
          }
          subtitle="개발부터 반도체, 금융, 브랜드까지. 업계 출신 전문 헤드헌터가 포지션을 직접 맡아요."
        />
      </div>

      <IntroReveal yOffset="16">
        <div className="flex w-full flex-col gap-3 overflow-x-hidden md:gap-4">
          <IntroMarquee
            direction="ltr"
            durationSec={60}
            fadeClassName="intro-marquee-fade-wide"
            itemsClassName="gap-3 pr-3 md:gap-4 md:pr-4"
          >
            {repeatCards(TOP_ROW).map((headhunter, index) => (
              <HeadhunterCard key={`${headhunter.domain}-${index}`} headhunter={headhunter} />
            ))}
          </IntroMarquee>
          <IntroMarquee
            direction="rtl"
            durationSec={70}
            fadeClassName="intro-marquee-fade-wide"
            itemsClassName="gap-3 pr-3 md:gap-4 md:pr-4"
          >
            {repeatCards(BOTTOM_ROW).map((headhunter, index) => (
              <HeadhunterCard key={`${headhunter.domain}-${index}`} headhunter={headhunter} />
            ))}
          </IntroMarquee>
        </div>
      </IntroReveal>

      <IntroReveal delayMs={120} yOffset="16">
        <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 px-4 md:mt-12 md:px-8">
          {DOMAINS.map((domain) => (
            <li
              key={domain}
              className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-white/55 md:text-[13px]"
            >
              {domain}
            </li>
          ))}
        </ul>
      </IntroReveal>
    </AllianceSection>
  )
}
