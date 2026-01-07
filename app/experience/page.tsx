"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import Link from "next/link";

export default function ExperiencePage() {
  useScrollNavigation({ prevPath: "/projects", nextPath: "/contact" });

  return (
    <section className="min-h-full w-full max-w-4xl mx-auto pb-32 lg:pb-32">
      <div className="mb-12 lg:pl-6">
        <h1 className="text-2xl font-bold tracking-tighter mb-4">experience</h1>
        <p className="text-neutral-500">
          my professional journey and milestones.
        </p>
      </div>

      <div className="relative lg:border-l border-neutral-200 dark:border-neutral-800 lg:ml-6 space-y-8 lg:space-y-12">
        {experiences.map((exp, index) => {
          const Content = () => (
            <div className="relative lg:pl-12 group rounded-3xl lg:rounded-xl lg:bg-transparent lg:border-none transition-colors duration-300">
              {/* Animated Background */}
              <div className="hidden lg:block absolute inset-0 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-xl z-0" />

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute -left-[5px] top-6 w-2.5 h-2.5 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black z-10 transition-colors group-hover:bg-white dark:group-hover:bg-black group-hover:ring-black dark:group-hover:ring-white" />

              <div className="flex flex-col gap-2 relative z-10 lg:group-hover:text-white lg:dark:group-hover:text-black transition-colors duration-300 lg:p-8">
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1">
                    <h3 className="text-xl font-bold tracking-tighter">
                      {exp.company}
                    </h3>
                    {/* Desktop Date */}
                    <div className="hidden lg:flex items-center gap-2 text-sm text-neutral-500 lg:group-hover:text-neutral-300 lg:dark:group-hover:text-neutral-700 font-mono transition-colors">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {exp.start_date} - {exp.end_date}
                      </span>
                    </div>
                  </div>

                  {/* Mobile Date with Divider */}
                  <div className="flex lg:hidden items-center gap-4 my-1">
                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1" />
                    <span className="text-xs font-mono text-neutral-400">
                      {exp.start_date} - {exp.end_date}
                    </span>
                  </div>

                  <div className="text-base lg:text-lg font-medium text-neutral-600 dark:text-neutral-400 lg:text-neutral-800 lg:dark:text-neutral-200 lg:group-hover:text-neutral-100 lg:dark:group-hover:text-neutral-900 transition-colors">
                    {exp.title}
                  </div>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500 lg:group-hover:text-neutral-300 lg:dark:group-hover:text-neutral-700 mt-1 transition-colors">
                    {exp.location.city && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {exp.location.city}, {exp.location.country}
                      </div>
                    )}
                  </div>

                  {/* Skills (Mobile Chips Position) */}
                  {exp.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2 lg:hidden">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                {exp.description.length > 0 && (
                  <ul className="list-disc list-inside mt-3 lg:mt-3 pl-0 space-y-1 text-neutral-600 dark:text-neutral-400 lg:group-hover:text-neutral-300 lg:dark:group-hover:text-neutral-700 transition-colors">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-sm leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Desktop Skills (Hidden on Mobile if moved up, or duplicates? User listed chips in order 'title, date, position, location, chips'. So chips come after location.
                But desktop layout might want them at bottom.
                Let's keep them at bottom for Desktop, and verify Mobile order.
                Mobile: Title -> Date -> Position -> Location -> Chips -> Description?
                If chips are item 5, I should put them there.
                I added them above description for mobile.
                For Desktop, I can keep the original `div` below?
                Let's use `lg:flex` for bottom skills and `lg:hidden` for top skills?
                Actually, simpler is to just render them once. Check where they fit for desktop.
                Previous layout: Skills under description.
                Mobile request order implies chips before description (or replacing description?).
                I will render skills twice or use flex-order, but duplications is safer for distinct layouts.
                Let's do duplicate for cleaner code.
                */}

                {/* Desktop Skills */}
                {exp.skills.length > 0 && (
                  <div className="hidden lg:flex flex-wrap gap-2 mt-4 pl-0">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 lg:group-hover:bg-neutral-800 lg:dark:group-hover:bg-neutral-200 lg:group-hover:text-neutral-300 lg:dark:group-hover:text-neutral-700 lg:group-hover:border-transparent transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {exp.url && exp.url !== "#" ? (
                <Link href={exp.url} target="_blank">
                  <Content />
                </Link>
              ) : (
                <Content />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
