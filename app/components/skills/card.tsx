"use client"

import { forwardRef, CSSProperties } from "react"

export interface CardData {
  title: string
  sub: string
  num: string
  bg: string
  accent: string
  textColor: string
  backTitle: string
  items: string[]
  art: string
}

interface CardProps {
  data: CardData
  zIndex: number
  style?: CSSProperties
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ data, zIndex, style }, ref) => {
    return (
      <div className="sc-card" ref={ref} style={{ ...style, zIndex }}>
        
        <div className="sc-card-inner">
        
          <div
            className="sc-face sc-front"
            style={{ background: data.bg, color: data.textColor }}
          >
            <div className="blob1"></div>
            <div
              className="sc-art"
              dangerouslySetInnerHTML={{ __html: data.art }}
            />
            <span className="sc-num">{data.num}</span>
            <div className="sc-label">
              <h2>{data.title}</h2>
              <p>{data.sub}</p>
            </div>
          </div>

          <div
            className="sc-face sc-back"
            style={{
              background: data.bg,
              color: data.textColor,
              border: `1px solid ${data.accent}28`,
            }}
          >
            
            <p className="sc-back-num">{data.num}</p>
            <h3 className="sc-back-title">{data.backTitle}</h3>
            <div className="sc-back-rule" style={{ background: data.accent }} />
            <ul className="sc-back-list">
              {data.items.map((item) => (
                <li key={item}>{item}</li>
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