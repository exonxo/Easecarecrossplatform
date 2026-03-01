import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

// ─── Types ───
export interface CardQuestionnaireData {
  careFor: string;
  careType: string;
  urgency: string;
  hoursPerDay: string;
  days: string[];
  specialRequirements: string[];
  budget: string;
  additionalNotes: string;
}

// ─── Character config per card ───
interface CharConfig {
  bg: string;
  bgDark: string; // shadow color
  name: string;
}

const CHAR_CONFIGS: CharConfig[] = [
  { bg: "#FF6B6B", bgDark: "#E55A5A", name: "lovebird" },
  { bg: "#FFAB40", bgDark: "#E89A30", name: "owl" },
  { bg: "#9C6FDE", bgDark: "#8558C5", name: "parrot" },
  { bg: "#00BFA5", bgDark: "#00A68E", name: "penguin" },
  { bg: "#29B6F6", bgDark: "#1A9FDD", name: "bluebird" },
  { bg: "#8BC34A", bgDark: "#7AAF3A", name: "robin" },
  { bg: "#FDD835", bgDark: "#E5C22E", name: "canary" },
  { bg: "#F48FB1", bgDark: "#DD7A9C", name: "flamingo" },
];

// Gradient backgrounds for each card – harmonised with blue (#1975D2) and violet (#7C3AED)
const CARD_GRADIENTS: string[] = [
  "linear-gradient(135deg, #E8567E 0%, #9C3AED 45%, #1975D2 100%)", // lovebird: rose → violet → blue
  "linear-gradient(135deg, #F09030 0%, #A855F7 50%, #2563EB 100%)", // owl: amber → purple → blue
  "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 45%, #1975D2 100%)", // parrot: violet → deep purple → blue
  "linear-gradient(135deg, #0EA5A0 0%, #7C3AED 50%, #1975D2 100%)", // penguin: teal → violet → blue
  "linear-gradient(135deg, #38BDF8 0%, #818CF8 50%, #6D28D9 100%)", // bluebird: sky → indigo → deep purple
  "linear-gradient(135deg, #6DBE45 0%, #7C3AED 55%, #1975D2 100%)", // robin: green → violet → blue
  "linear-gradient(135deg, #FACC15 0%, #A78BFA 50%, #1975D2 100%)", // canary: gold → lavender → blue
  "linear-gradient(135deg, #EC4899 0%, #8B5CF6 50%, #1975D2 100%)", // flamingo: pink → violet → blue
];

// ─── SVG Bird Character Components ───
// Inspired by a cute round bird with heart chest, big eyes, small beak, tiny wings

// Bird 0 — Lovebird (coral): heart-shaped chest patch
function LovebirdCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="210" rx="50" ry="14" fill="#E55A5A" opacity="0.25" />
      <ellipse cx="130" cy="130" rx="58" ry="64" fill="#FF6B6B" />
      <ellipse cx="130" cy="148" rx="38" ry="40" fill="#FFA8A8" opacity="0.5" />
      <path d="M130 132 C124 124 112 124 112 132 C112 142 130 154 130 154 C130 154 148 142 148 132 C148 124 136 124 130 132Z" fill="#E54545" opacity="0.7" />
      <ellipse cx="82" cy="130" rx="18" ry="28" fill="#E55A5A" transform="rotate(-15 82 130)" />
      <ellipse cx="178" cy="130" rx="18" ry="28" fill="#E55A5A" transform="rotate(15 178 130)" />
      <ellipse cx="130" cy="68" rx="6" ry="12" fill="#FF6B6B" transform="rotate(-10 130 68)" />
      <ellipse cx="136" cy="70" rx="5" ry="10" fill="#E55A5A" transform="rotate(10 136 70)" />
      {reacted ? (
        <>
          <path d="M110 105 Q117 97 124 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M136 105 Q143 97 150 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="117" cy="105" rx="11" ry="12" fill="white" />
          <circle cx="119" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="122" cy="103" r="2" fill="white" />
          <ellipse cx="143" cy="105" rx="11" ry="12" fill="white" />
          <circle cx="145" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="148" cy="103" r="2" fill="white" />
        </>
      )}
      <path d="M126 115 L130 122 L134 115" fill="#FF9800" />
      <path d="M126 115 L130 118 L134 115" fill="#FFB74D" />
      <circle cx="104" cy="114" r="7" fill="#FF8A8A" opacity="0.45" />
      <circle cx="156" cy="114" r="7" fill="#FF8A8A" opacity="0.45" />
      <path d="M118 192 L112 202 M118 192 L118 203 M118 192 L124 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M142 192 L136 202 M142 192 L142 203 M142 192 L148 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      {reacted && (
        <>
          <path d="M165 80 C163 77 159 77 159 80 C159 84 165 88 165 88 C165 88 171 84 171 80 C171 77 167 77 165 80Z" fill="#FF6B6B" opacity="0.6" style={{ animation: "characterBob 2s ease-in-out infinite" }} />
          <path d="M95 85 C93.5 82.5 90.5 82.5 90.5 85 C90.5 88 95 91 95 91 C95 91 99.5 88 99.5 85 C99.5 82.5 96.5 82.5 95 85Z" fill="#FF6B6B" opacity="0.4" style={{ animation: "characterBob 2.5s ease-in-out infinite 0.3s" }} />
        </>
      )}
    </svg>
  );
}

// Bird 1 — Owl (amber): wider body, big round eyes, ear tufts
function OwlCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="48" ry="13" fill="#E89A30" opacity="0.25" />
      <ellipse cx="130" cy="135" rx="62" ry="60" fill="#FFAB40" />
      <ellipse cx="130" cy="150" rx="36" ry="35" fill="#FFD180" opacity="0.5" />
      <path d="M118 140 L122 146 L126 140" stroke="#E89A30" strokeWidth="1.5" opacity="0.3" fill="none" />
      <path d="M130 145 L134 151 L138 145" stroke="#E89A30" strokeWidth="1.5" opacity="0.3" fill="none" />
      <path d="M124 152 L128 158 L132 152" stroke="#E89A30" strokeWidth="1.5" opacity="0.3" fill="none" />
      <ellipse cx="78" cy="138" rx="20" ry="32" fill="#E89A30" transform="rotate(-10 78 138)" />
      <ellipse cx="182" cy="138" rx="20" ry="32" fill="#E89A30" transform="rotate(10 182 138)" />
      <path d="M100 78 L95 55 L112 75" fill="#FFAB40" />
      <path d="M160 78 L165 55 L148 75" fill="#FFAB40" />
      <path d="M100 78 L97 60 L110 76" fill="#E89A30" opacity="0.3" />
      <path d="M160 78 L163 60 L150 76" fill="#E89A30" opacity="0.3" />
      {reacted ? (
        <>
          <circle cx="112" cy="108" r="16" fill="white" />
          <circle cx="148" cy="108" r="16" fill="white" />
          <circle cx="114" cy="109" r="9" fill="#1A1A2E" />
          <circle cx="150" cy="109" r="9" fill="#1A1A2E" />
          <circle cx="117" cy="106" r="3" fill="white" />
          <circle cx="153" cy="106" r="3" fill="white" />
          <path d="M98 90 Q112 82 128 92" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M132 92 Q148 82 162 90" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <circle cx="112" cy="108" r="16" fill="white" />
          <circle cx="148" cy="108" r="16" fill="white" />
          <circle cx="113" cy="109" r="8" fill="#1A1A2E" />
          <circle cx="149" cy="109" r="8" fill="#1A1A2E" />
          <circle cx="116" cy="106" r="2.5" fill="white" />
          <circle cx="152" cy="106" r="2.5" fill="white" />
        </>
      )}
      <path d="M124 120 L130 130 L136 120" fill="#FF9800" />
      <path d="M124 120 L130 125 L136 120" fill="#FFB74D" />
      <path d="M115 193 L109 203 M115 193 L115 204 M115 193 L121 203" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M145 193 L139 203 M145 193 L145 204 M145 193 L151 203" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bird 2 — Parrot (purple): crest plume on head
function ParrotCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="46" ry="13" fill="#8558C5" opacity="0.25" />
      <ellipse cx="130" cy="132" rx="55" ry="62" fill="#9C6FDE" />
      <ellipse cx="130" cy="148" rx="35" ry="38" fill="#C4A6EF" opacity="0.45" />
      <ellipse cx="84" cy="135" rx="18" ry="30" fill="#8558C5" transform="rotate(-12 84 135)" />
      <ellipse cx="176" cy="135" rx="18" ry="30" fill="#8558C5" transform="rotate(12 176 135)" />
      <ellipse cx="120" cy="60" rx="5" ry="18" fill="#B896E8" transform="rotate(-20 120 60)" />
      <ellipse cx="130" cy="55" rx="5" ry="20" fill="#9C6FDE" />
      <ellipse cx="140" cy="60" rx="5" ry="18" fill="#B896E8" transform="rotate(20 140 60)" />
      {reacted ? (
        <>
          <ellipse cx="115" cy="108" rx="11" ry="12" fill="white" />
          <circle cx="117" cy="109" r="6" fill="#1A1A2E" />
          <circle cx="114" cy="106" r="2" fill="white" />
          <ellipse cx="145" cy="108" rx="11" ry="12" fill="white" />
          <circle cx="147" cy="109" r="6" fill="#1A1A2E" />
          <circle cx="144" cy="106" r="2" fill="white" />
          <ellipse cx="162" cy="92" rx="3" ry="5" fill="#B8E4FF" />
        </>
      ) : (
        <>
          <ellipse cx="115" cy="108" rx="11" ry="12" fill="white" />
          <circle cx="117" cy="109" r="6" fill="#1A1A2E" />
          <circle cx="120" cy="106" r="2" fill="white" />
          <ellipse cx="145" cy="108" rx="11" ry="12" fill="white" />
          <circle cx="147" cy="109" r="6" fill="#1A1A2E" />
          <circle cx="150" cy="106" r="2" fill="white" />
        </>
      )}
      <path d="M125 117 Q130 126 135 117 Q132 122 130 126 Q128 122 125 117Z" fill="#FF9800" />
      <path d="M125 117 L130 120 L135 117" fill="#FFB74D" />
      <circle cx="103" cy="116" r="6" fill="#B896E8" opacity="0.45" />
      <circle cx="157" cy="116" r="6" fill="#B896E8" opacity="0.45" />
      <path d="M118 192 L112 202 M118 192 L118 203 M118 192 L124 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M142 192 L136 202 M142 192 L142 203 M142 192 L148 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="130" cy="192" rx="10" ry="18" fill="#8558C5" opacity="0.6" />
    </svg>
  );
}

// Bird 3 — Penguin (teal): white belly, sleepy expression
function PenguinCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="46" ry="13" fill="#00A68E" opacity="0.25" />
      <ellipse cx="130" cy="130" rx="55" ry="65" fill="#00BFA5" />
      <ellipse cx="130" cy="148" rx="40" ry="45" fill="white" opacity="0.85" />
      <ellipse cx="80" cy="140" rx="16" ry="34" fill="#00A68E" transform="rotate(-8 80 140)" />
      <ellipse cx="180" cy="140" rx="16" ry="34" fill="#00A68E" transform="rotate(8 180 140)" />
      <path d="M80 105 Q80 60 130 55 Q180 60 180 105 Q180 95 130 90 Q80 95 80 105Z" fill="#00A68E" />
      {reacted ? (
        <>
          <path d="M108 105 Q117 99 126 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M134 105 Q143 99 152 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="117" cy="104" rx="10" ry="6" fill="white" />
          <circle cx="117" cy="105" r="4.5" fill="#1A1A2E" />
          <circle cx="119" cy="103" r="1.5" fill="white" />
          <ellipse cx="143" cy="104" rx="10" ry="6" fill="white" />
          <circle cx="143" cy="105" r="4.5" fill="#1A1A2E" />
          <circle cx="145" cy="103" r="1.5" fill="white" />
          <path d="M107 99 Q117 97 127 99" stroke="#00A68E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M133 99 Q143 97 153 99" stroke="#00A68E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </>
      )}
      <path d="M124 114 L130 120 L136 114" fill="#FF9800" />
      <path d="M124 114 L130 117 L136 114" fill="#FFB74D" />
      <circle cx="106" cy="112" r="6" fill="#80D8CC" opacity="0.5" />
      <circle cx="154" cy="112" r="6" fill="#80D8CC" opacity="0.5" />
      <path d="M116 193 L110 203 M116 193 L116 204 M116 193 L122 203" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M144 193 L138 203 M144 193 L144 204 M144 193 L150 203" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bird 4 — Bluebird (blue): closest to reference, heart chest
function BluebirdCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="210" rx="48" ry="14" fill="#1A9FDD" opacity="0.2" />
      <ellipse cx="130" cy="130" rx="56" ry="63" fill="#29B6F6" />
      <ellipse cx="130" cy="148" rx="38" ry="40" fill="white" opacity="0.55" />
      <path d="M130 130 C124 122 112 122 112 130 C112 140 130 152 130 152 C130 152 148 140 148 130 C148 122 136 122 130 130Z" fill="#FF7043" opacity="0.75" />
      <ellipse cx="82" cy="132" rx="18" ry="28" fill="#1A9FDD" transform="rotate(-12 82 132)" />
      <ellipse cx="178" cy="132" rx="18" ry="28" fill="#1A9FDD" transform="rotate(12 178 132)" />
      <ellipse cx="130" cy="63" rx="5" ry="14" fill="#29B6F6" />
      <ellipse cx="130" cy="60" rx="4" ry="8" fill="#1A9FDD" />
      {reacted ? (
        <>
          <path d="M109 103 Q117 95 125 103" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M135 103 Q143 95 151 103" stroke="#1A1A2E" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="117" cy="103" rx="12" ry="13" fill="white" />
          <circle cx="119" cy="104" r="7" fill="#1A1A2E" />
          <circle cx="122" cy="101" r="2.5" fill="white" />
          <ellipse cx="143" cy="103" rx="12" ry="13" fill="white" />
          <circle cx="145" cy="104" r="7" fill="#1A1A2E" />
          <circle cx="148" cy="101" r="2.5" fill="white" />
        </>
      )}
      <path d="M125 115 L130 122 L135 115" fill="#FF9800" />
      <path d="M125 115 L130 118 L135 115" fill="#FFB74D" />
      <circle cx="104" cy="112" r="7" fill="#5CC8F7" opacity="0.45" />
      <circle cx="156" cy="112" r="7" fill="#5CC8F7" opacity="0.45" />
      <path d="M118 191 L112 201 M118 191 L118 202 M118 191 L124 201" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M142 191 L136 201 M142 191 L142 202 M142 191 L148 201" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bird 5 — Robin (green): curious look
function RobinCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="46" ry="13" fill="#7AAF3A" opacity="0.25" />
      <ellipse cx="130" cy="132" rx="55" ry="62" fill="#8BC34A" />
      <ellipse cx="130" cy="150" rx="36" ry="38" fill="#C5E1A5" opacity="0.55" />
      <ellipse cx="130" cy="140" rx="22" ry="18" fill="#EF5350" opacity="0.5" />
      <ellipse cx="84" cy="135" rx="16" ry="26" fill="#7AAF3A" transform="rotate(-10 84 135)" />
      <ellipse cx="176" cy="135" rx="16" ry="26" fill="#7AAF3A" transform="rotate(10 176 135)" />
      <ellipse cx="128" cy="66" rx="4" ry="12" fill="#8BC34A" transform="rotate(-5 128 66)" />
      {reacted ? (
        <>
          <ellipse cx="115" cy="106" rx="10" ry="11" fill="white" />
          <circle cx="112" cy="103" r="5.5" fill="#1A1A2E" />
          <circle cx="110" cy="101" r="1.8" fill="white" />
          <ellipse cx="145" cy="106" rx="10" ry="11" fill="white" />
          <circle cx="142" cy="103" r="5.5" fill="#1A1A2E" />
          <circle cx="140" cy="101" r="1.8" fill="white" />
        </>
      ) : (
        <>
          <ellipse cx="115" cy="106" rx="10" ry="11" fill="white" />
          <circle cx="114" cy="104" r="5.5" fill="#1A1A2E" />
          <circle cx="112" cy="102" r="1.8" fill="white" />
          <ellipse cx="145" cy="106" rx="10" ry="11" fill="white" />
          <circle cx="144" cy="104" r="5.5" fill="#1A1A2E" />
          <circle cx="142" cy="102" r="1.8" fill="white" />
        </>
      )}
      <path d="M125 116 L130 123 L135 116" fill="#FF9800" />
      <path d="M125 116 L130 119 L135 116" fill="#FFB74D" />
      <circle cx="103" cy="114" r="6" fill="#A5D6A7" opacity="0.5" />
      <circle cx="157" cy="114" r="6" fill="#A5D6A7" opacity="0.5" />
      <path d="M118 192 L112 202 M118 192 L118 203 M118 192 L124 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M142 192 L136 202 M142 192 L142 203 M142 192 L148 202" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bird 6 — Canary (yellow): bright, musical
function CanaryCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="48" ry="14" fill="#E5C22E" opacity="0.25" />
      <ellipse cx="130" cy="130" rx="56" ry="62" fill="#FDD835" />
      <ellipse cx="130" cy="148" rx="38" ry="40" fill="#FFF9C4" opacity="0.55" />
      <ellipse cx="82" cy="132" rx="18" ry="28" fill="#E5C22E" transform="rotate(-12 82 132)" />
      <ellipse cx="178" cy="132" rx="18" ry="28" fill="#E5C22E" transform="rotate(12 178 132)" />
      <circle cx="124" cy="66" r="6" fill="#FDD835" />
      <circle cx="130" cy="62" r="7" fill="#FDD835" />
      <circle cx="136" cy="66" r="6" fill="#FDD835" />
      {reacted ? (
        <>
          <ellipse cx="115" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="117" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="119" cy="103" r="2" fill="white" />
          <ellipse cx="145" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="147" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="149" cy="103" r="2" fill="white" />
          <text x="168" y="85" fill="#E5C22E" fontSize="14" fontFamily="serif" style={{ animation: "characterBob 1.8s ease-in-out infinite" }}>&#9834;</text>
          <text x="90" y="80" fill="#E5C22E" fontSize="11" fontFamily="serif" opacity="0.6" style={{ animation: "characterBob 2.2s ease-in-out infinite 0.4s" }}>&#9835;</text>
        </>
      ) : (
        <>
          <ellipse cx="115" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="116" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="118" cy="103" r="2" fill="white" />
          <ellipse cx="145" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="146" cy="106" r="6" fill="#1A1A2E" />
          <circle cx="148" cy="103" r="2" fill="white" />
        </>
      )}
      <path d="M124 115 L130 122 L136 115" fill="#FF9800" />
      <path d="M124 115 L130 118 L136 115" fill="#FFB74D" />
      <circle cx="103" cy="114" r="6.5" fill="#FFE082" opacity="0.5" />
      <circle cx="157" cy="114" r="6.5" fill="#FFE082" opacity="0.5" />
      <path d="M118 190 L112 200 M118 190 L118 201 M118 190 L124 200" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M142 190 L136 200 M142 190 L142 201 M142 190 L148 200" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Bird 7 — Flamingo (pink): elegant, longer legs
function FlamingoCharacter({ reacted }: { reacted: boolean }) {
  return (
    <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
      <ellipse cx="130" cy="212" rx="44" ry="12" fill="#DD7A9C" opacity="0.25" />
      <ellipse cx="130" cy="128" rx="52" ry="65" fill="#F48FB1" />
      <ellipse cx="130" cy="148" rx="35" ry="40" fill="#F8BBD0" opacity="0.5" />
      <ellipse cx="86" cy="130" rx="16" ry="30" fill="#DD7A9C" transform="rotate(-10 86 130)" />
      <ellipse cx="174" cy="130" rx="16" ry="30" fill="#DD7A9C" transform="rotate(10 174 130)" />
      <ellipse cx="132" cy="58" rx="4" ry="16" fill="#F48FB1" transform="rotate(8 132 58)" />
      <circle cx="132" cy="46" r="5" fill="#DD7A9C" opacity="0.5" />
      {reacted ? (
        <>
          <path d="M108 105 Q116 97 124 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M136 105 Q144 97 152 105" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          <ellipse cx="116" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="118" cy="106" r="5.5" fill="#1A1A2E" />
          <circle cx="120" cy="103" r="1.8" fill="white" />
          <ellipse cx="144" cy="105" rx="10" ry="11" fill="white" />
          <circle cx="146" cy="106" r="5.5" fill="#1A1A2E" />
          <circle cx="148" cy="103" r="1.8" fill="white" />
        </>
      )}
      <path d="M124 115 L130 123 L136 115" fill="#FF9800" />
      <path d="M124 115 L130 118 L136 115" fill="#FFB74D" />
      <circle cx="104" cy="114" r="6.5" fill="#F48FB1" opacity="0.45" />
      <circle cx="156" cy="114" r="6.5" fill="#F48FB1" opacity="0.45" />
      <path d="M120 192 L120 208 L114 212 M120 208 L126 212" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M140 192 L140 208 L134 212 M140 208 L146 212" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// Character renderer by index
function CharacterSVG({ index, reacted }: { index: number; reacted: boolean }) {
  switch (index) {
    case 0: return <LovebirdCharacter reacted={reacted} />;
    case 1: return <OwlCharacter reacted={reacted} />;
    case 2: return <ParrotCharacter reacted={reacted} />;
    case 3: return <PenguinCharacter reacted={reacted} />;
    case 4: return <BluebirdCharacter reacted={reacted} />;
    case 5: return <RobinCharacter reacted={reacted} />;
    case 6: return <CanaryCharacter reacted={reacted} />;
    case 7: return <FlamingoCharacter reacted={reacted} />;
    default: return <BluebirdCharacter reacted={reacted} />;
  }
}

// ─── Question definitions ───
interface QuestionDef {
  id: string;
  question: string;
  type: "single" | "multi" | "multi-with-toggle" | "text";
  options?: string[];
  toggleOption?: string;
  placeholder?: string;
  skippable?: boolean;
}

const QUESTIONS: QuestionDef[] = [
  {
    id: "careFor",
    question: "Who needs care?",
    type: "single",
    options: ["Elderly Parent", "Spouse / Partner", "Child", "Myself", "Other"],
  },
  {
    id: "careType",
    question: "What type of care is needed?",
    type: "single",
    options: ["Elder Care", "Patient Care", "Post-Op Recovery", "Baby Sitting", "House Help", "Cooking", "Physiotherapy"],
  },
  {
    id: "urgency",
    question: "How urgent is this?",
    type: "single",
    options: ["Today", "Within 3 Days", "This Week", "This Month", "Just Exploring"],
  },
  {
    id: "hoursPerDay",
    question: "How many hours per day?",
    type: "single",
    options: ["2\u20134 hrs", "4\u20136 hrs", "6\u20138 hrs", "Full Day (8+ hrs)", "Live-in Care"],
  },
  {
    id: "days",
    question: "What days do you need care?",
    type: "multi-with-toggle",
    options: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    toggleOption: "Everyday",
  },
  {
    id: "specialRequirements",
    question: "Any special requirements?",
    type: "multi",
    options: ["Speaks Bengali", "Medical Training", "Cooking Included", "Female Only", "Can Drive", "Pet-friendly"],
    skippable: true,
  },
  {
    id: "budget",
    question: "Your approximate budget per day?",
    type: "single",
    options: ["Under \u20B9500", "\u20B9500\u2013\u20B91000", "\u20B91000\u2013\u20B91500", "\u20B91500+", "Open to Packages"],
  },
  {
    id: "additionalNotes",
    question: "Describe any specific needs",
    type: "text",
    placeholder: "E.g. My mother has diabetes and needs help with medications and morning walks...",
    skippable: true,
  },
];

const TOTAL = QUESTIONS.length;

// ─── Pill component ───
function Pill({
  label,
  selected,
  accentColor,
  onClick,
}: {
  label: string;
  selected: boolean;
  accentColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer outline-none transition-all duration-200"
      style={{
        padding: "9px 18px",
        borderRadius: "100px",
        border: `2px solid ${selected ? accentColor : "#ddd"}`,
        background: selected ? accentColor : "#ffffff",
        color: selected ? "#ffffff" : "#1A1A2E",
        fontFamily: "'Lexend', sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "20px",
        transform: selected ? "scale(1.05)" : "scale(1)",
        boxShadow: selected
          ? `0 4px 16px -3px ${accentColor}55`
          : "0 2px 6px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.04)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 6px rgba(0,0,0,0.06)";
        }
      }}
    >
      {label}
    </button>
  );
}

// ─── Card Face Renderer ───
function CardFace({
  stepIndex,
  isSummaryView,
  data,
  accentColor,
  charConfig,
  hasSelection,
  onSingleSelect,
  onMultiSelect,
  onToggleAll,
  onTextChange,
  onNext,
  onSkip,
  onBack,
}: {
  stepIndex: number;
  isSummaryView?: boolean;
  data: CardQuestionnaireData;
  accentColor: string;
  charConfig: CharConfig;
  hasSelection: boolean;
  onSingleSelect: (field: string, value: string) => void;
  onMultiSelect: (field: string, value: string) => void;
  onToggleAll: (field: string, options: string[]) => void;
  onTextChange: (value: string) => void;
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}) {
  const progressPct = ((stepIndex + 1) / TOTAL) * 100;

  // ─── Question View ───
  const q = QUESTIONS[stepIndex];
  if (!q) return null;

  return (
    <div className="w-full h-full flex flex-col overflow-hidden" style={{ borderRadius: "32px" }}>
      {/* Character section - top 55% */}
      <div
        className="relative flex items-center justify-center shrink-0 overflow-hidden"
        style={{
          height: "45%",
          background: CARD_GRADIENTS[stepIndex] || CARD_GRADIENTS[0],
        }}
      >
        {/* Character with bob animation */}
        <div
          className="w-[200px] h-[200px]"
          style={{
            animation: "characterBob 3s ease-in-out infinite",
          }}
        >
          <CharacterSVG index={stepIndex} reacted={hasSelection} />
        </div>
      </div>

      {/* White bottom section - 55% */}
      <div
        className="flex-1 bg-white relative flex flex-col overflow-hidden"
        style={{ borderRadius: "32px 32px 0 0", marginTop: "-24px" }}
      >
        {/* Progress bar */}
        <div className="h-[3px] w-full bg-[#eee] shrink-0">
          <div
            className="h-full rounded-r-full"
            style={{ width: `${progressPct}%`, backgroundColor: accentColor, transition: "width 500ms ease-out" }}
          />
        </div>

        <div className="px-5 pt-3 pb-4 flex flex-col flex-1 overflow-y-auto">
          {/* Top row */}
          <div className="flex items-center justify-between mb-3 shrink-0">
            <button
              onClick={onBack}
              disabled={stepIndex === 0}
              className={`size-[32px] rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                stepIndex === 0 ? "opacity-0 pointer-events-none" : "bg-[#f5f5f5] hover:bg-[#eee]"
              }`}
            >
              <ArrowLeft size={16} className="text-[#666]" />
            </button>
            <span
              className="font-['Lexend',sans-serif] text-[11px] px-3 py-1 rounded-full"
              style={{ background: `${accentColor}15`, color: accentColor }}
            >
              {String(stepIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </span>
            <div className="size-[32px]" />
          </div>

          {/* Question text */}
          <h2 className="font-['Lexend',sans-serif] font-bold text-[20px] text-[#1A1A2E] text-center leading-[28px] mb-4 shrink-0 px-1">
            {q.question}
          </h2>

          {/* Answer area */}
          <div className="flex-1 overflow-y-auto">
            {/* Single / Multi pills */}
            {(q.type === "single" || q.type === "multi") && q.options && (
              <div className="flex flex-wrap gap-2 justify-center">
                {q.options.map((opt) => {
                  const field = q.id as keyof CardQuestionnaireData;
                  const isMulti = q.type === "multi";
                  const selected = isMulti
                    ? (data[field] as string[]).includes(opt)
                    : data[field] === opt;
                  return (
                    <Pill
                      key={opt}
                      label={opt}
                      selected={selected}
                      accentColor={accentColor}
                      onClick={() => isMulti ? onMultiSelect(q.id, opt) : onSingleSelect(q.id, opt)}
                    />
                  );
                })}
              </div>
            )}

            {/* Multi with toggle */}
            {q.type === "multi-with-toggle" && q.options && (
              <div className="flex flex-col items-center gap-3">
                {q.toggleOption && (
                  <Pill
                    label={q.toggleOption}
                    selected={(data[q.id as keyof CardQuestionnaireData] as string[]).length === q.options.length}
                    accentColor={accentColor}
                    onClick={() => onToggleAll(q.id, q.options!)}
                  />
                )}
                <div className="flex flex-wrap gap-2 justify-center">
                  {q.options.map((opt) => {
                    const selected = (data[q.id as keyof CardQuestionnaireData] as string[]).includes(opt);
                    return (
                      <Pill
                        key={opt}
                        label={opt}
                        selected={selected}
                        accentColor={accentColor}
                        onClick={() => onMultiSelect(q.id, opt)}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Text */}
            {q.type === "text" && (
              <div className="w-full">
                <textarea
                  value={data.additionalNotes}
                  onChange={(e) => onTextChange(e.target.value)}
                  placeholder={q.placeholder}
                  rows={3}
                  className="w-full rounded-[14px] border-2 border-[#eee] bg-[#fafafa] px-4 py-3 font-['Lexend',sans-serif] text-[14px] text-[#1A1A2E] placeholder-[#bbb] resize-none outline-none transition-colors leading-[22px]"
                  style={{ borderColor: data.additionalNotes ? accentColor : "#eee" }}
                />
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="shrink-0 mt-3 flex flex-col items-center gap-2">
            {/* Next button for multi/text */}
            {(q.type === "multi" || q.type === "multi-with-toggle" || q.type === "text") && (
              <button
                onClick={onNext}
                disabled={(q.type !== "text" && (data[q.id as keyof CardQuestionnaireData] as string[]).length === 0 && !q.skippable)}
                className="w-full h-[44px] rounded-[14px] font-['Lexend',sans-serif] font-bold text-[14px] cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                style={{
                  background: accentColor,
                  color: "#fff",
                  opacity: (q.type !== "text" && (data[q.id as keyof CardQuestionnaireData] as string[]).length === 0 && !q.skippable) ? 0.4 : 1,
                  boxShadow: `0 4px 14px -3px ${accentColor}55`,
                }}
              >
                Next <ArrowRight size={16} />
              </button>
            )}

            {/* Skip */}
            {q.skippable && (
              <button
                onClick={onSkip}
                className="font-['Lexend',sans-serif] text-[12px] text-[#aaa] hover:text-[#777] cursor-pointer transition-colors bg-transparent border-none"
              >
                Skip this question
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main exported component ───
export function CardQuestionnaire({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (data: CardQuestionnaireData) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipAngle, setFlipAngle] = useState(0);
  const [frontStep, setFrontStep] = useState(0);
  const [backStep, setBackStep] = useState(0);
  const [showingFront, setShowingFront] = useState(true);
  const [bgColor, setBgColor] = useState(CHAR_CONFIGS[0].bg + "22");
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Derived: whether a given step is "past the last question" (summary view)
  const isSummary = currentStep >= TOTAL;
  const frontIsSummary = frontStep >= TOTAL;
  const backIsSummary = backStep >= TOTAL;

  const [data, setData] = useState<CardQuestionnaireData>({
    careFor: "",
    careType: "",
    urgency: "",
    hoursPerDay: "",
    days: [],
    specialRequirements: [],
    budget: "",
    additionalNotes: "",
  });

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) clearTimeout(flipTimeoutRef.current);
    };
  }, []);

  // Determine if current step has a selection
  const hasSelection = useMemo(() => {
    const q = QUESTIONS[currentStep];
    if (!q) return false;
    const field = q.id as keyof CardQuestionnaireData;
    if (q.type === "single") return !!data[field];
    if (q.type === "multi" || q.type === "multi-with-toggle") return (data[field] as string[]).length > 0;
    if (q.type === "text") return !!data.additionalNotes;
    return false;
  }, [currentStep, data]);

  const triggerFlip = useCallback(
    (targetStep: number, direction: "forward" | "backward") => {
      if (isFlipping) return;
      setIsFlipping(true);

      if (showingFront) {
        setBackStep(targetStep);
      } else {
        setFrontStep(targetStep);
      }

      const newAngle = direction === "forward" ? flipAngle + 180 : flipAngle - 180;
      requestAnimationFrame(() => setFlipAngle(newAngle));

      setBgColor(CHAR_CONFIGS[targetStep].bg + "22");

      flipTimeoutRef.current = setTimeout(() => {
        setCurrentStep(targetStep);
        setShowingFront((prev) => !prev);
        setIsFlipping(false);
      }, 400);
    },
    [isFlipping, showingFront, flipAngle]
  );

  const handleSingleSelect = useCallback(
    (field: string, value: string) => {
      const updatedData = { ...data, [field]: value };
      setData(updatedData);
      setTimeout(() => {
        if (currentStep < TOTAL - 1) {
          triggerFlip(currentStep + 1, "forward");
        } else {
          // Last step — submit directly, skip summary
          onSubmit(updatedData);
        }
      }, 200);
    },
    [currentStep, triggerFlip, onSubmit, data]
  );

  const handleMultiSelect = useCallback((field: string, value: string) => {
    setData((prev) => {
      const arr = (prev as any)[field] as string[];
      if (arr.includes(value)) return { ...prev, [field]: arr.filter((v: string) => v !== value) };
      return { ...prev, [field]: [...arr, value] };
    });
  }, []);

  const handleToggleAll = useCallback((field: string, allOptions: string[]) => {
    setData((prev) => {
      const arr = (prev as any)[field] as string[];
      return { ...prev, [field]: arr.length === allOptions.length ? [] : [...allOptions] };
    });
  }, []);

  const handleTextChange = useCallback((value: string) => {
    setData((prev) => ({ ...prev, additionalNotes: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (isFlipping) return;
    if (currentStep < TOTAL - 1) triggerFlip(currentStep + 1, "forward");
    else onSubmit(data);
  }, [currentStep, isFlipping, triggerFlip, onSubmit, data]);

  const handleBack = useCallback(() => {
    if (isFlipping) return;
    if (currentStep > 0) triggerFlip(currentStep - 1, "backward");
  }, [currentStep, isFlipping, triggerFlip]);

  const handleSkip = useCallback(() => {
    if (isFlipping) return;
    if (currentStep < TOTAL - 1) triggerFlip(currentStep + 1, "forward");
    else onSubmit(data);
  }, [currentStep, isFlipping, triggerFlip, onSubmit, data]);

  const handleEditFromSummary = useCallback(() => {
    triggerFlip(0, "backward");
  }, [triggerFlip]);

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isFlipping) return;
      const q = QUESTIONS[currentStep];
      if (e.key === "Backspace" && q?.type !== "text" && !isSummary) {
        e.preventDefault();
        handleBack();
      }
      if (e.key === "Enter" && (q?.type === "multi" || q?.type === "multi-with-toggle" || q?.type === "text")) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentStep, handleBack, handleNext, isSummary, isFlipping]);

  const currentConfig = isSummary ? CHAR_CONFIGS[0] : CHAR_CONFIGS[currentStep];
  const currentAccent = currentConfig.bg;

  const faceProps = {
    data,
    onSingleSelect: handleSingleSelect,
    onMultiSelect: handleMultiSelect,
    onToggleAll: handleToggleAll,
    onTextChange: handleTextChange,
    onNext: handleNext,
    onSkip: handleSkip,
    onBack: handleBack,
    onEditFromSummary: handleEditFromSummary,
    onSubmitFinal: () => onSubmit(data),
    hasSelection,
  };

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes characterBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes radarPulse {
          0% { transform: scale(0.5); opacity: 0.6; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        @keyframes orbitSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes dotBlink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>

      <div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-auto"
        style={{
          backgroundColor: bgColor,
          transition: "background-color 400ms ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 size-[38px] rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:bg-white transition-colors shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <X size={18} className="text-[#555]" />
        </button>

        {/* Card with perspective */}
        <div
          className="relative z-10 w-[390px] max-sm:w-full max-sm:h-full max-sm:max-w-none"
          style={{ perspective: "1200px", height: "780px" }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${flipAngle}deg)`,
              transition: isFlipping ? "transform 350ms cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                borderRadius: "32px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              <CardFace
                stepIndex={frontStep}
                isSummaryView={frontIsSummary}
                accentColor={frontIsSummary ? "#1975D2" : CHAR_CONFIGS[frontStep].bg}
                charConfig={CHAR_CONFIGS[frontStep] || CHAR_CONFIGS[0]}
                {...faceProps}
              />
            </div>

            {/* Back face */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "32px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              }}
            >
              <CardFace
                stepIndex={backStep}
                isSummaryView={backIsSummary}
                accentColor={backIsSummary ? "#1975D2" : CHAR_CONFIGS[backStep].bg}
                charConfig={CHAR_CONFIGS[backStep] || CHAR_CONFIGS[0]}
                {...faceProps}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}