import React from "react";
import Link from "next/link";
import { Wrench, Home, Search, Compass } from "lucide-react";

export const metadata = {
  title: "404 - Page Not Found | AIToolBox.io",
  description: "The page or tool you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 shadow-sm">
        <Compass className="w-8 h-8 animate-pulse" />
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
        404 - Tool or Page Not Found
      </h1>

      <p className="text-base sm:text-lg text-slate-600 max-w-md mx-auto mb-8">
        The tool, utility, or page you requested doesn&apos;t exist or may have been moved.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/how-to-use"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Wrench className="w-4 h-4" />
          Explore Tool Guide
        </Link>
      </div>
    </div>
  );
}
