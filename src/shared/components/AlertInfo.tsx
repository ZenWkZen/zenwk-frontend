'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AlertProps = {
    children: React.ReactNode;
    duration?: number; // en segundos
};

const AlertInfo = ({ children, duration = 2 }: AlertProps) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (duration < 0.1) duration = 0.1; // evitar valores menores
        const timer = setTimeout(() => setVisible(false), duration * 1000);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className=""
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AlertInfo;
