import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Alert } from "@mui/material";

type Props = {
  requestError: string | null;
  requestValid: string | null;
};

function AnimateAlert(props: Props) {
  const { requestError, requestValid } = props;

  return (
    <>
      {requestError && (
        <div>
          <AnimatePresence initial exitBeforeEnter>
            <motion.div
              variants={{
                hidden: {
                  scale: 0.5,
                  y: "+30vh",
                  opacity: 0,
                },
                visible: {
                  y: "0",
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                  },
                },
                exit: {
                  x: "-30vh",
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Alert severity="error">{requestError}</Alert>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
      {requestValid && (
        <div>
          <AnimatePresence initial exitBeforeEnter>
            <motion.div
              variants={{
                hidden: {
                  scale: 0.5,
                  y: "+30vh",
                  opacity: 0,
                },
                visible: {
                  y: "0",
                  opacity: 1,
                  scale: 1,
                  transition: {
                    duration: 0.5,
                    type: "spring",
                    damping: 25,
                    stiffness: 400,
                  },
                },
                exit: {
                  x: "-30vh",
                  opacity: 0,
                  scale: 0.5,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Alert severity="success">{requestValid}</Alert>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default AnimateAlert;
