import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Layers, Sparkles, CheckCircle2 } from "lucide-react"
import Icon from "@/components/ui/AppIcon"
import { useExperience } from "../context/ExperienceContext"

const getInitials = (text = "") =>
    text
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("")

export const Experience = () => {
  const { expCards, abilities } = useExperience()
  const abilityList = Array.isArray(abilities) ? abilities : []
  const [activeIndex, setActiveIndex] = useState(0)
  const card = expCards[activeIndex]

  return (
    <section
      id="experience"
      className="relative w-full bg-transparent text-foreground px-6 md:px-12 overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 blob-primary" aria-hidden="true" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 blob-secondary" aria-hidden="true" />
      </div>

      <div className="relative z-10 section-pad px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/50 bg-primary/1 backdrop-blur-sm text-primary text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          Career Journey
        </div>

        <h1 className="font-display text-section-heading font-bold text-foreground mb-4">
          Experience &amp; <span className="text-shimmer">Impact</span>
        </h1>
        <p className="text-lg text-foreground max-w-xl leading-relaxed mb-12">
          Applying technical expertise to deliver reliable and efficient applications.
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveIndex((p) => Math.max(0, p - 1))}
            disabled={activeIndex === 0}
            className="project-nav-btn flex-shrink-0"
          >
            <Icon name="ChevronLeftIcon" size={24} variant="outline" />
          </button>

          <AnimatePresence mode="wait">
            {card && (
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="rounded-2xl border border-border/40 backdrop-blur-sm p-6 flex flex-col flex-1 min-w-0"
              >
                <div className="flex items-center gap-3 mb-4">
                  {card.logoPath ? (
                    <img
                      src={card.logoPath}
                      alt={card.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 bg-primary/10 border border-primary/20">
                      <span className="text-primary text-sm font-bold">
                        {getInitials(card.title)}
                      </span>
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-foreground">{card.title}</h3>
                    <p className="text-xs text-muted-foreground">{card.date}</p>
                  </div>
                </div>

                {card.responsibilities?.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {card.responsibilities.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setActiveIndex((p) => Math.min(expCards.length - 1, p + 1))}
            disabled={activeIndex >= expCards.length - 1}
            className="project-nav-btn flex-shrink-0"
          >
            <Icon name="ChevronRightIcon" size={24} variant="outline" />
          </button>
        </div>

        {expCards.length > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {expCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`project-dot ${i === activeIndex ? "active" : ""}`}
              />
            ))}
          </div>
        )}

        {abilityList.length > 0 && (
          <div className="mt-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {abilityList.map((item, i) => {
                const LucideIcon = [Layers, Sparkles, CheckCircle2][i % 3]
                return (
                  <div
                    key={i}
                    className="group perspective-[1000px] h-[130px]"
                  >
                    <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
                      <div className="absolute inset-0 rounded-2xl border border-border/40 backdrop-blur-sm p-4 [backface-visibility:hidden] flex flex-col items-center justify-center text-center">
                        <LucideIcon className="text-primary mb-2" size={18} />
                        <h4 className="text-foreground font-semibold text-xs">{item.title}</h4>
                      </div>
                      <div className="absolute inset-0 rounded-2xl border border-border/40 backdrop-blur-sm p-4 [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center text-center">
                        <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
