import React from 'react';

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>

                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-8 space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.05] animate-pulse border border-white/[0.08]"></div>
                    <div className="h-6 w-32 bg-white/[0.08] rounded animate-pulse"></div>
                    <div className="h-4 w-48 bg-white/[0.03] rounded animate-pulse mt-2"></div>
                </div>

                {/* Error Message */}
                <div className="space-y-4">
                    <div className="h-6 w-full bg-white/[0.05] rounded animate-pulse"></div>
                    <div className="h-4 w-full bg-white/[0.03] rounded animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-white/[0.03] rounded animate-pulse"></div>
                </div>

                {/* Button */}
                <div className="h-12 w-full bg-white/[0.08] rounded-xl animate-pulse mt-8"></div>
            </div>
        </div>
    );
}
