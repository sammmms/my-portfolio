"use client";

import { experiences } from "@/data/experience";
import { motion } from "framer-motion";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";

export default function ExperiencePage() {
  useScrollNavigation({ prevPath: "/projects" });

  return (
    <section className="min-h-full w-full max-w-4xl mx-auto py-12 px-6 pb-32">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter mb-4">experience</h1>
        <p className="text-neutral-500">
          my professional journey and milestones.
        </p>
      </div>

      <div className="relative border-l border-neutral-200 dark:border-neutral-800 ml-3 lg:ml-6 space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="relative pl-8 lg:pl-12"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black" />

            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500 font-mono">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {exp.start_date} - {exp.end_date}
                  </span>
                </div>
              </div>

              <div className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                {exp.company}
              </div>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500 mt-1">
                {exp.location.city && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location.city}, {exp.location.country}
                  </div>
                )}
                {exp.employment_type && (
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    {exp.employment_type}
                  </div>
                )}
              </div>

              {/* Description */}
              {exp.description.length > 0 && (
                <ul className="list-disc list-inside mt-3 space-y-1 text-neutral-600 dark:text-neutral-400">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="text-sm leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              )}

              {/* Skills */}
              {exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
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
          </motion.div>
        ))}
      </div>
    </section>
  );
}
