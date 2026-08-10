import React from 'react';

export default function Loading() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="space-y-4">
                <div className="h-10 w-48 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="h-4 w-64 bg-white/[0.05] rounded-md animate-pulse"></div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2 p-4 border border-white/[0.05] rounded-lg bg-white/[0.02]">
                        <div className="h-4 w-20 bg-white/[0.05] rounded animate-pulse"></div>
                        <div className="h-8 w-24 bg-white/[0.08] rounded animate-pulse"></div>
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="space-y-4">
                <div className="h-40 w-full bg-white/[0.03] border border-white/[0.05] rounded-lg animate-pulse"></div>
            </div>
        </div>
    );
}
