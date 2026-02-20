"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User, Phone, Users } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type AuthMode = "login" | "signup" | "forgot_password";

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [mode, setMode] = useState<AuthMode>("login");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");

    const resetMessages = () => {
        setErrorMsg("");
        setSuccessMsg("");
    };

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        resetMessages();

        try {
            if (mode === "login") {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                onClose();

            } else if (mode === "signup") {
                if (!name || !phone || !gender) {
                    throw new Error("Please fill in all fields (Name, Phone, and Gender).");
                }
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            name,
                            phone_number: phone,
                            gender,
                        },
                    },
                });
                if (error) throw error;
                setSuccessMsg("Check your email for the confirmation link!");
                setMode("login");

            } else if (mode === "forgot_password") {
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/reset-password`,
                });
                if (error) throw error;
                setSuccessMsg("Password reset link sent to your email.");
            }
        } catch (error: any) {
            setErrorMsg(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-md overflow-hidden rounded-2xl"
                        style={{
                            background: "rgba(8,8,12,0.95)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            backdropFilter: "blur(24px)",
                        }}
                    >
                        {/* Header */}
                        <div
                            className="flex items-center justify-between p-6 pb-4"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                        >
                            <h2
                                className="text-xl font-black text-white"
                                style={{ fontFamily: "var(--font-orbitron)", textShadow: "0 0 10px rgba(0,243,255,0.3)" }}
                            >
                                {mode === "login"
                                    ? "AUTHORIZATION"
                                    : mode === "signup"
                                        ? "INITIATE PROTOCOL"
                                        : "SYSTEM OVERRIDE"}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6">
                            <form onSubmit={handleAuth} className="space-y-4">
                                {errorMsg && (
                                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-xs">
                                        {errorMsg}
                                    </div>
                                )}
                                {successMsg && (
                                    <div className="p-3 rounded-lg bg-[#00f3ff]/10 border border-[#00f3ff]/30 text-[#00f3ff] text-xs">
                                        {successMsg}
                                    </div>
                                )}

                                {/* Always need Email Context */}
                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors"
                                            placeholder="hacker@system.com"
                                        />
                                    </div>
                                </div>

                                {mode === "signup" && (
                                    <>
                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold ml-1">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                                <input
                                                    type="text"
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold ml-1">
                                                Phone Number
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                                <input
                                                    type="tel"
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors"
                                                    placeholder="+91 9876543210"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold ml-1">
                                                Gender
                                            </label>
                                            <div className="relative">
                                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                                <select
                                                    required
                                                    value={gender}
                                                    onChange={(e) => setGender(e.target.value)}
                                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors appearance-none"
                                                >
                                                    <option value="" disabled className="bg-black text-white/40">Select Gender</option>
                                                    <option value="male" className="bg-black">Male</option>
                                                    <option value="female" className="bg-black">Female</option>
                                                    <option value="other" className="bg-black">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {(mode === "login" || mode === "signup") && (
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-widest text-white/40 font-semibold ml-1">
                                            Security Key
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                                            <input
                                                type="password"
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50 transition-colors"
                                                placeholder="••••••••"
                                            />
                                        </div>
                                    </div>
                                )}

                                {mode === "login" && (
                                    <div className="flex justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setMode("forgot_password");
                                                resetMessages();
                                            }}
                                            className="text-[11px] text-[#00f3ff]/80 hover:text-[#00f3ff] transition-colors tracking-wider"
                                        >
                                            Forgot Password?
                                        </button>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-4 mt-2 text-sm font-black tracking-[0.2em] uppercase rounded-xl transition-all duration-300 disabled:opacity-50"
                                    style={{
                                        background: "linear-gradient(135deg, rgba(0,243,255,0.2), rgba(0,243,255,0.1))",
                                        border: "1px solid rgba(0,243,255,0.4)",
                                        color: "#00f3ff",
                                        boxShadow: "0 0 20px rgba(0,243,255,0.2)",
                                    }}
                                >
                                    {loading
                                        ? "PROCESSING..."
                                        : mode === "login"
                                            ? "ACCESS SYSTEM"
                                            : mode === "signup"
                                                ? "CREATE ACCOUNT"
                                                : "SEND RESET LINK"}
                                </motion.button>
                            </form>

                            {/* Toggle Modes */}
                            <div className="mt-6 text-center text-xs text-white/40 tracking-wider">
                                {mode === "login" ? (
                                    <>
                                        NO CLEARANCE?{" "}
                                        <button
                                            onClick={() => {
                                                setMode("signup");
                                                resetMessages();
                                            }}
                                            className="text-[#ff00ff] hover:text-[#ff00ff]/80 uppercase font-black"
                                        >
                                            Request Access
                                        </button>
                                    </>
                                ) : mode === "signup" ? (
                                    <>
                                        HAVE CLEARANCE?{" "}
                                        <button
                                            onClick={() => {
                                                setMode("login");
                                                resetMessages();
                                            }}
                                            className="text-[#00f3ff] hover:text-[#00f3ff]/80 uppercase font-black"
                                        >
                                            Access System
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setMode("login");
                                            resetMessages();
                                        }}
                                        className="text-white/60 hover:text-white transition-colors"
                                    >
                                        ← Back to Login
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
