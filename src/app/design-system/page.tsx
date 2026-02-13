import { FC } from "react";

export default function DesignSystemPage() {
    return (
        <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-12 font-sans text-[#111827]">
            <header className="mb-12">
                <h1 className="text-4xl font-bold font-display tracking-tight text-[#111827] mb-2">
                    Design System - Catering MVP
                </h1>
                <p className="text-lg text-[#6B7280]">
                    Visual tokens and components for the premium diet catering platform.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Typography Section */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold font-display border-b border-[#E5E7EB] pb-2">
                        Typography
                    </h2>
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-[#6B7280] mb-2">Font Families</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl shadow-sm border border-[#E5E7EB]">
                                    <p className="font-display text-2xl font-bold">Aa</p>
                                    <p className="font-bold">Plus Jakarta Sans</p>
                                    <p className="text-sm text-[#6B7280]">Headings</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl shadow-sm border border-[#E5E7EB]">
                                    <p className="font-sans text-2xl">Aa</p>
                                    <p>Inter</p>
                                    <p className="text-sm text-[#6B7280]">Body / UI</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">H1</span>
                                <h1 className="text-5xl font-bold font-display">Heading 1</h1>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">H2</span>
                                <h2 className="text-4xl font-bold font-display">Heading 2</h2>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">H3</span>
                                <h3 className="text-3xl font-bold font-display">Heading 3</h3>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">H4</span>
                                <h4 className="text-2xl font-bold font-display">Heading 4</h4>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">Body</span>
                                <p className="text-base text-[#111827] max-w-md">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                            <div className="flex items-baseline gap-4">
                                <span className="w-16 text-sm text-[#6B7280]">Small</span>
                                <p className="text-sm text-[#6B7280]">
                                    Auxiliary text for captions or labels.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Colors Section */}
                <section className="space-y-8">
                    <h2 className="text-2xl font-bold font-display border-b border-[#E5E7EB] pb-2">
                        Color Palette
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <ColorSwatch name="Primary" hex="#10B981" className="bg-[#10B981] text-white" />
                        <ColorSwatch name="Hover" hex="#059669" className="bg-[#059669] text-white" />
                        <ColorSwatch name="Soft" hex="#D1FAE5" className="bg-[#D1FAE5] text-[#065F46]" />

                        <ColorSwatch name="Accent" hex="#F59E0B" className="bg-[#F59E0B] text-white" />
                        <ColorSwatch name="Surface" hex="#FFFFFF" className="bg-white text-[#111827] border border-[#E5E7EB]" />
                        <ColorSwatch name="Background" hex="#F8F9FA" className="bg-[#F8F9FA] text-[#111827] border border-[#E5E7EB]" />

                        <ColorSwatch name="Text Main" hex="#111827" className="bg-[#111827] text-white" />
                        <ColorSwatch name="Text Muted" hex="#6B7280" className="bg-[#6B7280] text-white" />
                        <ColorSwatch name="Border" hex="#E5E7EB" className="bg-[#E5E7EB] text-[#111827]" />

                        <ColorSwatch name="Success" hex="#10B981" className="bg-[#10B981] text-white" />
                        <ColorSwatch name="Warning" hex="#F59E0B" className="bg-[#F59E0B] text-white" />
                        <ColorSwatch name="Error" hex="#EF4444" className="bg-[#EF4444] text-white" />
                    </div>
                </section>

                {/* UI Components Section */}
                <section className="space-y-8 lg:col-span-2">
                    <h2 className="text-2xl font-bold font-display border-b border-[#E5E7EB] pb-2">
                        UI Components
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {/* Cards */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-[#111827]">Card Pattern</h3>
                            <div className="bg-white rounded-[20px] shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-[#D1FAE5] text-[#059669] text-xs font-bold px-3 py-1 rounded-full">
                                        -20% OFF
                                    </span>
                                    <span className="text-[#6B7280] text-sm font-medium">Standard</span>
                                </div>
                                <h4 className="text-xl font-bold font-display text-[#111827] mb-2">
                                    Dieta Slim
                                </h4>
                                <p className="text-[#6B7280] text-sm mb-6 leading-relaxed">
                                    Zbilansowana dieta redukcyjna dla osób chcących zrzucić zbędne kilogramy bez efektu jojo.
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-xs text-[#6B7280] block">od</span>
                                        <span className="text-lg font-bold text-[#10B981]">54 zł</span>
                                        <span className="text-xs text-[#6B7280]"> / dzień</span>
                                    </div>
                                    <button className="bg-[#10B981] hover:bg-[#059669] text-white px-5 py-2.5 rounded-2xl font-semibold text-sm transition-colors duration-200">
                                        Wybieram
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Buttons & States */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-[#111827]">Buttons</h3>
                            <div className="flex flex-col gap-4 items-start">
                                <button className="bg-[#10B981] hover:bg-[#059669] text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-sm hover:shadow active:scale-95 duration-200">
                                    Primary Button
                                </button>
                                <button className="bg-white hover:bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB] px-6 py-3 rounded-2xl font-semibold transition-colors duration-200">
                                    Secondary Button
                                </button>
                                <button className="text-[#10B981] hover:bg-[#D1FAE5] px-6 py-3 rounded-2xl font-semibold transition-colors duration-200">
                                    Ghost Button
                                </button>
                                <button disabled className="bg-[#E5E7EB] text-[#9CA3AF] px-6 py-3 rounded-2xl font-semibold cursor-not-allowed">
                                    Disabled
                                </button>
                            </div>

                            <h3 className="text-lg font-semibold text-[#111827] mt-8">Badges</h3>
                            <div className="flex gap-3 flex-wrap">
                                <span className="bg-[#D1FAE5] text-[#059669] px-3 py-1 rounded-full text-xs font-bold">Standard</span>
                                <span className="bg-[#FEF3C7] text-[#D97706] px-3 py-1 rounded-full text-xs font-bold">Premium</span>
                                <span className="bg-[#fee2e2] text-[#DC2626] px-3 py-1 rounded-full text-xs font-bold">Ostatnie sztuki</span>
                                <span className="border border-[#E5E7EB] text-[#6B7280] px-3 py-1 rounded-full text-xs font-medium">Wege</span>
                            </div>
                        </div>

                        {/* Inputs & Forms */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-[#111827]">Inputs</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all placeholder:text-[#9CA3AF] text-[#111827] bg-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#374151] mb-1">
                                        Select Option
                                    </label>
                                    <select className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:border-transparent transition-all text-[#111827] bg-white">
                                        <option>Option 1</option>
                                        <option>Option 2</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#EF4444] mb-1">
                                        Error State
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="Invalid input"
                                        className="w-full px-4 py-3 rounded-xl border border-[#EF4444] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 text-[#EF4444] bg-[#FEF2F2]"
                                    />
                                    <p className="mt-1 text-xs text-[#EF4444]">This field is required.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Motion Spec */}
                <section className="col-span-1 lg:col-span-2 space-y-4 pt-8 border-t border-[#E5E7EB]">
                    <h2 className="text-2xl font-bold font-display">Motion Spec</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white rounded-[20px] border border-[#E5E7EB]">
                            <h3 className="font-bold text-[#111827] mb-2">Hover Interaction</h3>
                            <p className="text-sm text-[#6B7280]">Elements lift slightly (translate Y -2px) and shadow increases opacity. Duration: 200ms ease-out.</p>
                        </div>
                        <div className="p-6 bg-white rounded-[20px] border border-[#E5E7EB]">
                            <h3 className="font-bold text-[#111827] mb-2">Section Entry</h3>
                            <p className="text-sm text-[#6B7280]">Fate-in Up. Elements fade from opacity 0 to 1 and translate Y from 20px to 0. Staggered by 100ms.</p>
                        </div>
                        <div className="p-6 bg-white rounded-[20px] border border-[#E5E7EB]">
                            <h3 className="font-bold text-[#111827] mb-2">Modal / Popover</h3>
                            <p className="text-sm text-[#6B7280]">Zoom In. Scale from 0.95 to 1.0. Opacity from 0 to 1. Spring physics (damping: 20, stiffness: 300).</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

const ColorSwatch: FC<{ name: string; hex: string; className: string }> = ({ name, hex, className }) => (
    <div className="flex flex-col gap-2">
        <div className={`h-24 w-full rounded-2xl shadow-sm flex items-end p-3 ${className}`}>
            <span className="text-sm font-mono opacity-80">{hex}</span>
        </div>
        <span className="text-sm font-medium text-[#374151]">{name}</span>
    </div>
);
