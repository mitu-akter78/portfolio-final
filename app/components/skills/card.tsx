"use client"

import { forwardRef, CSSProperties } from "react"

export interface SkillItem {
  label: string
  icon: string
}

export interface CardData {
  title: string
  sub: string
  num: string
  bg: string
  accent: string
  textColor: string
  backTitle: string
  backSubtitle: string
  icon: string
  items: SkillItem[]
  art: string
}

interface CardProps {
  data: CardData
  zIndex: number
  style?: CSSProperties
  className?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ data, zIndex, style, className }, ref) => {
    return (
      <div className={`sc-card ${className ?? ""}`} ref={ref} style={{ ...style, zIndex }}>
        
        <div className="sc-card-inner">
        
          {/* ── Front face ── */}
          <div
            className="sc-face sc-front"
            style={{ background: data.bg, color: data.textColor }}
          >
            <div className="blob1"></div>
            <div className="sc-art" style={{ background: data.art }} />
            <div className="sc-label">
              <h2>{data.title}</h2>
              <p>{data.sub}</p>
            </div>
          </div>

          {/* ── Back face ── */}
          <div
            className="sc-face sc-back"
            style={{
              background: data.bg,
              color: data.textColor,
              border: `1px solid ${data.accent}28`,
            }}
          >
            <div className="sc-back-header">
              <span
                className="sc-back-icon"
                style={{ color: data.accent }}
                dangerouslySetInnerHTML={{ __html: data.icon }}
              />
              <div>
                <h3 className="sc-back-title">{data.backTitle}</h3>
              </div>
            </div>

            <div className="sc-back-rule" style={{ background: data.accent }} />

            <p className="sc-back-subtitle">{data.backSubtitle}</p>

            <ul className="sc-back-list">
              {data.items.map((item) => (
                <li key={item.label}>
                  <span
                    className="sc-item-icon"
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                  {item.label}
                </li>
              ))}
            </ul>

            <p className="sc-back-foot" style={{ color: `${data.accent}88` }}>
              {data.sub} — {data.num}
            </p>
          </div>

        </div>
      </div>
    )
  })

Card.displayName = "Card"
export default Card