import { motion } from 'framer-motion';
import { TimeResult } from './components/TimeResult';
import { RecordComparison } from './components/RecordComparison';
import { LeaderboardPosition } from './components/LeaderboardPosition';
import { ResultButtons } from './components/ResultButtons';
import { resultVariants } from './animations/resultAnimations';

export const ResultScreen = () => {
  return (
    <div
      data-testid="result-screen"
      className="fixed inset-0 bg-black/80 flex justify-center items-center"
    >
      <motion.div
        variants={resultVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="bg-gray-900 p-8 rounded-lg"
      >
        <TimeResult />
        <RecordComparison />
        <LeaderboardPosition />
        <ResultButtons />
      </motion.div>
    </div>
  );
};
