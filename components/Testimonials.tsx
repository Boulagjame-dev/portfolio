import React from 'react';
import { Database, CreditCard, Cpu, Server } from 'lucide-react';

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

                <div className="mt-24">
                    <p className="font-mono text-xs text-gray-500 uppercase tracking-[0.2em] mb-12">
                        Powered by Best-in-Class Infrastructure
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Supabase */}
                        <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-lumina-accent/20 transition-all group">
                            <Database className="w-8 h-8 text-lumina-accent" />
                            <span className="font-bold text-white group-hover:text-lumina-accent">Supabase</span>
                        </div>
                        {/* Stripe */}
                        <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-lumina-accent/20 transition-all group">
                            <CreditCard className="w-8 h-8 text-blue-400" />
                            <span className="font-bold text-white group-hover:text-blue-400">Stripe</span>
                        </div>
                        {/* Pinecone / Vector DB */}
                        <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-lumina-accent/20 transition-all group">
                            <Cpu className="w-8 h-8 text-purple-400" />
                            <span className="font-bold text-white group-hover:text-purple-400">Pinecone</span>
                        </div>
                        {/* Python/FastAPI */}
                        <div className="bg-white/5 border border-white/5 p-6 rounded-xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-lumina-accent/20 transition-all group">
                            <Server className="w-8 h-8 text-yellow-400" />
                            <span className="font-bold text-white group-hover:text-yellow-400">FastAPI</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
