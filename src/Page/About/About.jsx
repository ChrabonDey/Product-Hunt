import { motion } from "framer-motion";
import img from "../../assets/Adobe Express - file.png";

export default function AIToolsDirectory() {
  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-16">
      {/* Header */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-5xl font-bold text-center text-yellow-400 mb-4"
      >
        <span className="text-white">Discover the Best AI Tools</span> – All in One Place
      </motion.h1>
      <p className="text-center text-white/70 max-w-3xl mx-auto mb-10 text-lg">
        A curated directory of cutting-edge AI tools for developers, designers,
        marketers, and tech enthusiasts. Stay ahead in the AI revolution.
      </p>

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
          className="bg-white/10 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-md border border-white/20 hover:scale-[1.015] transition-all duration-300"
        >
          <h3 className="text-left font-bold text-white mb-3">
            Your AI Discovery Hub
          </h3>
          <p className="text-white/80 text-left ">
            <span className="font-semibold text-white">AIxploria</span> is your launchpad to explore the latest and greatest AI tools.
            From text generation to design automation, find tools by category, use
            case, or popularity. Updated daily for the freshest finds.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-xl p-6 md:p-8 shadow-md border border-white/20 hover:scale-[1.015] transition-all duration-300"
        >
          <h3 className="text-left font-bold text-white mb-3">
            Submit or Search Tools
          </h3>
          <p className="text-white/80  text-left">
            Just discovered an awesome AI tool? Submit it to our directory!
            Or search by keyword to find AI tools that boost productivity, generate
            images, analyze text, and more. It's like Product Hunt – but for AI.
          </p>
        </motion.div>
      </div>

    </div>
  );
}
