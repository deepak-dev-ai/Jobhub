"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "../ui/button";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
const words = [
  {
    text: "Get",
  },
  {
    text: "awesome",
  },
  {
    text: "jobs",
  },
  {
    text: "with",
  },
  {
    text: "JobHub",
    className: "text-blue-500 dark:text-blue-500",
  },
];

export default function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="flex flex-col items-center justify-center h-[40rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
            The road to freedom starts from here
          </p>
          <TypewriterEffectSmooth words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <Link href="/signup">
              <Button
                className="w-40 h-10 rounded-xl cursor-pointer "
                variant={"default"}
              >
                Register
              </Button>
            </Link>
            <Link href="/login">
              <Button
                className="w-40 h-10 rounded-xl cursor-pointer"
                variant={"outline"}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
