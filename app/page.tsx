"use client";

import { Download, MoveRight } from "lucide-react";
import Link from "next/link";
import { useScrollNavigation } from "@/hooks/useScrollNavigation";
import { Button } from "@/components/Button";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { useTheme } from "next-themes";
import { useCursor } from "@/context/CursorContext";
import { useEffect, useState } from "react";

export default function Home() {
  useScrollNavigation({ nextPath: "/projects" });
  const { theme, setTheme } = useTheme();
  const { setVariant, setNextTheme } = useCursor();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setNextTheme(newTheme === "dark" ? "light" : "dark"); // Update cursor text immediately next state
  };

  const handleMouseEnter = () => {
    setVariant("theme-switch");
    setNextTheme(theme === "dark" ? "light" : "dark");
  };

  const handleMouseLeave = () => {
    setVariant("default");
    setNextTheme(null);
  };

  if (!mounted) return null;

  return (
    <section className="flex flex-col justify-center min-h-[calc(100vh-80px)] w-full max-w-4xl mx-auto text-center space-y-12 animate-in fade-in zoom-in duration-500">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full text-center md:text-left">
        {/* Profile Picture */}
        <div
          className="relative w-32 h-32 lg:w-48 lg:h-48 shrink-0 flex items-center justify-center bg-white dark:bg-black rounded-3xl shadow-lg border border-neutral-200 dark:border-neutral-800 p-2 overflow-hidden cursor-none hover:scale-105 transition-transform duration-300 rotate-3 hover:rotate-0"
          onClick={toggleTheme}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          role="button"
          tabIndex={0}
        >
          <img
            src="/assets/profile.jpg"
            alt="Profile"
            className="w-full h-full object-cover rounded-2xl pointer-events-none"
          />
        </div>

        {/* Profile Info */}
        <div className="space-y-4 max-w-lg">
          <h1 className="text-3xl lg:text-5xl font-bold tracking-tighter">
            samuel onasis
          </h1>
          <p className="text-lg text-neutral-500 leading-relaxed">
            fullstack developer. passionate about building beautiful,
            functional, and user-centric digital experiences.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-20 items-center justify-end animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
        <Button
          href="/projects"
          className="px-6 py-2 h-12 text-lg" // Adjusted to match size="lg" roughly or just let size handles it
          size="lg"
        >
          <span className="flex items-center gap-2">
            projects
            <MoveRight className="w-4 h-4" />
          </span>
        </Button>

        <Button
          href="/documents/cv_dec2025.pdf"
          className="px-6 py-2 h-12 text-lg"
          size="lg"
        >
          <span className="flex items-center gap-2">
            resume
            <Download className="w-4 h-4" />
          </span>
        </Button>
      </div>

      {/* Recent Projects Preview */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-20 text-left animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">recent projects</h2>
          <Link
            href="/projects"
            className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            view all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.slice(0, 3).map((project) => (
            <Link
              href="/projects"
              key={project.id}
              className="group block bg-neutral-50 dark:bg-neutral-900 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
            >
              <div className="aspect-video w-full bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
                {project.src ? (
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-neutral-300 dark:text-neutral-700 uppercase">
                    {project.title.charAt(0)}
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 capitalize group-hover:underline decoration-1 underline-offset-4">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-500 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Experience Preview */}
      <div className="w-full max-w-5xl mx-auto px-6 mb-20 text-left animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">experience</h2>
          <Link
            href="/experience"
            className="text-sm text-neutral-500 hover:text-black dark:hover:text-white transition-colors"
          >
            view all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.slice(0, 3).map((exp, idx) => {
            const Content = () => (
              <div className="h-full p-6 rounded-2xl bg-white dark:bg-black border border-neutral-100 dark:border-neutral-800 hover:border-transparent transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-black dark:bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-0" />
                <div className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  <span className="text-xs font-mono text-neutral-400 group-hover:text-neutral-300 dark:group-hover:text-neutral-700 block mb-2 transition-colors">
                    {exp.start_date} - {exp.end_date}
                  </span>
                  <h3 className="font-bold text-lg mb-1">{exp.title}</h3>
                  <p className="text-sm font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-200 dark:group-hover:text-neutral-800 mb-2 transition-colors">
                    {exp.company}
                  </p>
                  <p className="text-xs text-neutral-500 group-hover:text-neutral-400 dark:group-hover:text-neutral-600 transition-colors">
                    {exp.location.city || exp.location.setting}
                  </p>
                </div>
              </div>
            );

            return exp.url && exp.url !== "#" ? (
              <Link key={idx} href={exp.url} target="_blank" className="block">
                <Content />
              </Link>
            ) : (
              <div key={idx}>
                <Content />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
