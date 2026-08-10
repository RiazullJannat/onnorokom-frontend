import React from 'react';

export default function Loading() {
    return (
        <div className="space-y-6 p-6">
            {/* Breadcrumb */}
            <div className="flex gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="h-4 w-20 bg-white/[0.05] rounded animate-pulse"></div>
                        {i < 2 && <div className="h-4 w-2 bg-white/[0.05] rounded animate-pulse"></div>}
                    </div>
                ))}
            </div>

            {/* Header */}
            <div className="space-y-4">
                <div className="h-12 w-2/3 bg-white/[0.08] rounded-md animate-pulse"></div>
                <div className="flex gap-4">
                    <div className="h-6 w-32 bg-white/[0.05] rounded animate-pulse"></div>
                    <div className="h-6 w-32 bg-white/[0.05] rounded animate-pulse"></div>
                </div>
            </div>

            {/* Hero Image */}
            <div className="h-64 w-full bg-white/[0.03] border border-white/[0.05] rounded-lg animate-pulse"></div>

            {/* Content Sections */}
            <div className="grid grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="col-span-2 space-y-6">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <div className="h-6 w-40 bg-white/[0.08] rounded animate-pulse"></div>
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="h-4 w-full bg-white/[0.05] rounded animate-pulse"></div>
                        ))}
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <div className="h-6 w-40 bg-white/[0.08] rounded animate-pulse"></div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 w-full bg-white/[0.05] rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <div className="border border-white/[0.05] rounded-lg p-4 space-y-4 bg-white/[0.02]">
                        <div className="h-6 w-full bg-white/[0.08] rounded animate-pulse"></div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-4 w-full bg-white/[0.05] rounded animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
