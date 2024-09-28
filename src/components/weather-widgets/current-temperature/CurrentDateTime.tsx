"use client";
import getDayName from "@/utils/getDayName";
import useLiveClock from "@/hooks/useLiveClock";
import { Skeleton } from "../../ui/loading-indicators/skeleton";
import { Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

const CurrentDateTime = ({ timeZone }: { timeZone: string | undefined }) => {
  const { time } = useLiveClock(timeZone);

  return (
    <div className="mb-4 flex items-center justify-between text-xs font-semibold text-muted-foreground md:mb-6">
      {!time && (
        <>
          <Skeleton className="h-[16.5px] w-1/3 shadow" />
          <Skeleton className="h-[16.5px] w-1/2 shadow" />
        </>
      )}

      {time && (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Calendar size={16} className="mr-1 inline-block" />
            {getDayName()}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Clock size={16} className="mr-1 inline-block" />
            {time}
          </motion.p>
        </>
      )}
    </div>
  );
};

export default CurrentDateTime;