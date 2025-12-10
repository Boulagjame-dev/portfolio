import React from 'react';

const LOGOS = [
    { name: "n8n Partner", url: "https://upload.wikimedia.org/wikipedia/commons/f/f6/N8n-logo.png" }, // Placeholder, in real world use SVGs
    { name: "Make", url: "https://images.g2crowd.com/uploads/product/image/large_detail/large_detail_686241d65d07018318023f8510d54032/make-com-make.png" },
    { name: "OpenAI", url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" }
];

export const Testimonials: React.FC = () => {
    return (
        <section className="py-24 border-t border-white/5 bg-black/40">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <p className="font-mono text-xs text-gray-500 uppercase tracking-[0.2em] mb-12">
                    Trusted to Engineer Scalability With
                </p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Replace with actual SVGs for better quality */}
                    <div className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <span className="text-lumina-accent">n8n</span> Expert
                    </div>
                    <div className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <span className="text-blue-500">Make</span> Partner
                    </div>
                    <div className="text-2xl font-display font-bold text-white flex items-center gap-2">
                        <span className="text-green-500">OpenAI</span> Build
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24 text-left">
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
                        <div className="text-lumina-accent text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
                        <p className="text-gray-300 italic mb-6 relative z-10">
                            "Zakaria didn't just automate our lead flow; he completely re-engineered our sales process. We're getting 3x the qualified leads with zero manual data entry."
                        </p>
                        <div>
                            <div className="font-bold text-white">Sarah Jenkins</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">COO, TechFlow Logistics</div>
                        </div>
                    </div>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/5 relative">
                        <div className="text-lumina-accent text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
                        <p className="text-gray-300 italic mb-6 relative z-10">
                            "The custom ERP dashboard he built gave us visibility we didn't know was possible. It's like having a dedicated analyst working 24/7."
                        </p>
                        <div>
                            <div className="font-bold text-white">Michael Ross</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">Founder, EcomScale</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
