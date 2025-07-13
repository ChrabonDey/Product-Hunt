import { motion } from "framer-motion";
import img from "../assets/Adobe Express - file.png";

export default function Aseets() {
  return (
    <>
      <div className="min-h-screen bg-black text-white p-6 md:p-16 my-10">
        {/* Animated Icon */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex justify-center mb-12"
        >
          <img
            src={img}
            alt="AI Globe"
            className="w-28 h-28 object-contain rounded-full border-4 border-yellow-400 shadow-yellow-300 shadow-xl"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-md border border-white/20 hover:scale-[1.02] transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-2xl hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <h3 className="text-left font-bold text-white mb-3 group-hover:text-yellow-400 transition-all duration-300">
              Tools Discovery Hub
            </h3>
            <p className="text-white/80 text-left">
              <span className="font-semibold text-white">AIxploria</span> is your launchpad to explore the latest and greatest AI tools.
              Discover a wide variety of tools for content creation, image generation,
              AI voiceovers, automation workflows, and much more. Whether you're a
              developer, designer, or just curious—this hub is made for every AI explorer.
              Categorized browsing, powerful search, and daily updates keep you always ahead.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="group bg-white/10 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-md border border-white/20 hover:scale-[1.02] transition-all duration-300 hover:bg-white/20 hover:backdrop-blur-2xl hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <h3 className="text-left font-bold text-white mb-3 group-hover:text-yellow-400 transition-all duration-300">
              Product Hunt Tools
            </h3>
            <p className="text-white/80 text-left">
              Just discovered an awesome AI tool? Submit it to our directory and help it get visibility.
              Or search by keyword to find the exact tool you need for design, productivity,
              marketing, education, and more. Think of it as a dedicated AI Product Hunt —
              tailored for innovators and creators in the AI space.
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}
