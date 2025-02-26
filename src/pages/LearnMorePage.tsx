import {
  ArrowDown,
  LineChart,
  Building2,
  Users,
  Globe2,
  AlertCircle,
  FileSpreadsheet,
  Scale,
  Target,
  History,
  ArrowRight
} from "lucide-react";
import ParticleAnimation from "../components/learnMore/ParticleAnimation";

export function LearnMorePage() {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <ParticleAnimation />

      {/* Content overlay */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Global Emissions
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
            Why tracking, reporting and transparency of emissions is critical to
            enacting tangible change.
          </p>

          <div className="animate-bounce mt-12">
            <ArrowDown size={32} className="text-white opacity-75" />
          </div>
        </div>

        {/* Info Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-lg">
              Understanding the Impact
            </h2>
            <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow">
              Each particle represents millions of tons of CO₂ emissions. Watch
              as they accumulate over time, demonstrating the exponential growth
              of global emissions since the industrial revolution.
            </p>
            <p className="text-lg md:text-xl text-gray-200 drop-shadow">
              The visualization above shows how emissions have increased
              dramatically since 1950, with particularly rapid growth in recent
              decades.
            </p>
          </div>
        </div>

        {/* Tracking Section */}
        <div className="min-h-screen flex items-center justify-center px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-3 to-blue-4 drop-shadow-lg">
                Measuring to Manage
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow">
                We cannot effectively reduce what we is not measured. Accurate
                emissions tracking is the foundation of meaningful climate
                action.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Companies Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-3/50 transition-colors shadow-xl">
                <Building2 className="w-12 h-12 text-blue-3 mb-4 drop-shadow" />
                <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">
                  Companies
                </h3>
                <p className="text-gray-200 drop-shadow">
                  Corporate emissions make up a significant portion of global
                  carbon output. Accurate tracking enables businesses to
                  identify reduction opportunities.
                </p>
              </div>

              {/* Communities Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-3/50 transition-colors shadow-xl">
                <Users className="w-12 h-12 text-blue-3 mb-4 drop-shadow" />
                <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">
                  Communities
                </h3>
                <p className="text-gray-200 drop-shadow">
                  Local communities need to understand their carbon footprint to
                  implement effective reduction strategies and sustainable
                  practices.
                </p>
              </div>

              {/* Countries Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-3/50 transition-colors shadow-xl">
                <Globe2 className="w-12 h-12 text-blue-3 mb-4 drop-shadow" />
                <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">
                  Countries
                </h3>
                <p className="text-gray-200 drop-shadow">
                  National emissions data is crucial for setting and achieving
                  climate goals, and holding countries accountable to their
                  commitments.
                </p>
              </div>

              {/* Data Gaps Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-blue-3/50 transition-colors shadow-xl">
                <AlertCircle className="w-12 h-12 text-blue-3 mb-4 drop-shadow" />
                <h3 className="text-xl font-semibold mb-3 text-white drop-shadow-lg">
                  Data Gaps
                </h3>
                <p className="text-gray-200 drop-shadow">
                  Missing or inaccurate emissions data hinders our ability to
                  make informed decisions and take effective climate action.
                </p>
              </div>
            </div>

            <div className="mt-16 bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-xl">
              <div className="flex items-start gap-6">
                <LineChart className="w-12 h-12 text-blue-3 flex-shrink-0 mt-1 drop-shadow" />
                <div>
                  <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                    Why Tracking Matters
                  </h3>
                  <p className="text-gray-200 mb-4 drop-shadow">
                    Comprehensive emissions tracking is essential for:
                  </p>
                  <ul className="list-disc list-inside text-gray-200 space-y-2 drop-shadow">
                    <li>Setting science-based reduction targets</li>
                    <li>
                      Identifying the most impactful reduction opportunities
                    </li>
                    <li>Monitoring progress and ensuring accountability</li>
                    <li>Enabling carbon pricing and trading mechanisms</li>
                    <li>Informing policy decisions and regulations</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSRD Section */}
        <div className="min-h-screen flex items-center justify-center px-4 py-16 border-t border-white/10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 bg-black/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/10">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-3 to-blue-4 drop-shadow-lg">
                The Future of Emissions Reporting
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto drop-shadow">
                New EU Corporate Sustainability Reporting Directive (CSRD) marks
                a significant shift towards standardized and comprehensive
                emissions reporting.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* Current Challenges Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-xl">
                <History className="w-12 h-12 text-blue-3 mb-6 drop-shadow" />
                <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                  Historical Reporting Challenges
                </h3>
                <ul className="space-y-3 text-gray-200 drop-shadow">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>
                      Inconsistent methodologies across companies and regions
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Limited scope of emissions coverage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Lack of standardized verification processes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>
                      Difficulty tracking progress towards Paris Agreement goals
                    </span>
                  </li>
                </ul>
              </div>

              {/* CSRD Benefits Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-xl">
                <FileSpreadsheet className="w-12 h-12 text-blue-3 mb-6 drop-shadow" />
                <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                  CSRD Improvements
                </h3>
                <ul className="space-y-3 text-gray-200 drop-shadow">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>
                      Standardized reporting requirements across the EU
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Comprehensive coverage of environmental impacts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Mandatory third-party assurance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Digital tagging for improved data accessibility</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Paris Alignment Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-xl">
                <Target className="w-12 h-12 text-blue-3 mb-6 drop-shadow" />
                <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                  Paris Agreement Alignment
                </h3>
                <p className="text-gray-200 drop-shadow mb-4">
                  CSRD helps track progress towards Paris Agreement goals by:
                </p>
                <ul className="space-y-2 text-gray-200 drop-shadow">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Requiring detailed transition plans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Mandating science-based targets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Ensuring consistent progress tracking</span>
                  </li>
                </ul>
              </div>

              {/* Implementation Timeline Card */}
              <div className="bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-white/10 shadow-xl">
                <Scale className="w-12 h-12 text-blue-3 mb-6 drop-shadow" />
                <h3 className="text-2xl font-semibold mb-4 text-white drop-shadow-lg">
                  Implementation Timeline
                </h3>
                <ul className="space-y-3 text-gray-200 drop-shadow">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>2024: Large public companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>2025: Large companies not yet reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>2026: Listed SMEs and other companies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-3 mt-1">•</span>
                    <span>Gradual expansion to cover more businesses</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <div className="animate-bounce mt-12">
            <p>Continue</p><ArrowRight size={32} className="text-white opacity-75" />
          </div>
        </div>
      </div>
    </div>
  );
}
