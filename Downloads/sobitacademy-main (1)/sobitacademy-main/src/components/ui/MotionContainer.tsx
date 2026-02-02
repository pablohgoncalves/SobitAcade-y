import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MotionContainerProps {
    children: ReactNode;
    delay?: number;
    className?: string;
    id?: string;
}

export const MotionContainer = ({ children, delay = 0, className = "", id }: MotionContainerProps) => {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const MotionItem = ({ children, delay = 0, className = "", id }: MotionContainerProps) => {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
