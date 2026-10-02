"use client";

import { useEffect } from "react";

export type ToastType =
    | "success"
    | "error"
    | "warning"
    | "info";

type ToastProps = {
    type: ToastType;
    message: string;
    onClose: () => void;
    duration?: number;
};

const toastStyles: Record<
    ToastType,
    {
        container: string;
        icon: string;
    }
> = {
    success: {
        container:
            "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
        icon: "✓",
    },
    error: {
        container:
            "border-red-500/30 bg-red-500/10 text-red-400",
        icon: "!",
    },
    warning: {
        container:
            "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
        icon: "!",
    },
    info: {
        container:
            "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
        icon: "i",
    },
};

export default function Toast({
    type,
    message,
    onClose,
    duration = 4000,
}: ToastProps) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            onClose();
        }, duration);

        return () => {
            clearTimeout(timeout);
        };
    }, [duration, onClose]);

    const styles = toastStyles[type];

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div
                className={`flex min-w-75 max-w-100 items-center gap-3 rounded-lg border px-4 py-3 shadow-xl backdrop-blur-md ${styles.container} `}
            >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                    {styles.icon}
                </div>

                <p className="flex-1 text-sm text-zinc-200">
                    {message}
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="text-zinc-500 transition-colors hover:text-zinc-200"
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
        </div>
    );
}