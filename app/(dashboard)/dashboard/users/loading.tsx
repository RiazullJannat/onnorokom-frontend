import React from 'react';

export default function Loading() {
    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <div className="h-10 w-48 bg-white/[0.08] rounded-md animate-pulse"></div>
                    <div className="h-4 w-64 bg-white/[0.05] rounded-md animate-pulse"></div>
                </div>
                <div className="h-10 w-32 bg-white/[0.08] rounded-md animate-pulse"></div>
            </div>

            {/* Filters/Search */}
            <div className="flex gap-4">
                <div className="h-10 w-64 bg-white/[0.03] border border-white/[0.05] rounded-md animate-pulse"></div>
                <div className="h-10 w-32 bg-white/[0.03] border border-white/[0.05] rounded-md animate-pulse"></div>
            </div>

            {/* Table Header */}
            <div className="border border-white/[0.05] rounded-lg overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 border-b border-white/[0.05] bg-white/[0.02]">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-4 w-full bg-white/[0.05] rounded animate-pulse"></div>
                    ))}
                </div>

                {/* Table Rows */}
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-4 p-4 border-b border-white/[0.05] last:border-b-0">
                        {Array.from({ length: 5 }).map((_, j) => (
                            <div key={j} className="h-4 w-full bg-white/[0.05] rounded animate-pulse"></div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex gap-2 justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-8 w-8 bg-white/[0.05] rounded animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}
