import { useState } from 'react';

interface FormProps {
    onSubmit: (data: any) => void;
    loading: boolean;
}

const InitialForm = ({ onSubmit, loading }: FormProps) => {
    const [formData, setFormData] = useState({
        goal: '',
        targetUsers: '',
        constraints: '',
        platform: 'Web',
        risksUnknowns: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.goal || !formData.targetUsers || !formData.constraints) return;
        onSubmit(formData);
    };

    const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all";
    const labelClasses = "block text-sm font-semibold text-white/60 mb-2 ml-1 uppercase tracking-wider";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className={labelClasses}>Primary Goal *</label>
                    <input
                        type="text"
                        name="goal"
                        required
                        className={inputClasses}
                        placeholder="e.g. Build a secure crypto wallet for beginners"
                        value={formData.goal}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Target Users *</label>
                    <input
                        type="text"
                        name="targetUsers"
                        required
                        className={inputClasses}
                        placeholder="e.g. Non-technical elders"
                        value={formData.targetUsers}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className={labelClasses}>Platform *</label>
                    <select
                        name="platform"
                        className={inputClasses}
                        value={formData.platform}
                        onChange={handleChange}
                    >
                        <option value="Web" className="bg-[#1a1c23] text-white">Web</option>
                        <option value="Mobile" className="bg-[#1a1c23] text-white">Mobile</option>
                        <option value="Internal Tool" className="bg-[#1a1c23] text-white">Internal Tool</option>
                    </select>
                </div>

                <div className="md:col-span-2">
                    <label className={labelClasses}>Constraints *</label>
                    <textarea
                        name="constraints"
                        required
                        rows={3}
                        className={inputClasses}
                        placeholder="e.g. Must run in browser, 2-week deadline, limited budget"
                        value={formData.constraints}
                        onChange={handleChange}
                    />
                </div>

                <div className="md:col-span-2">
                    <label className={labelClasses}>Risks / Unknowns (Optional)</label>
                    <textarea
                        name="risksUnknowns"
                        rows={2}
                        className={inputClasses}
                        placeholder="e.g. Integration with legacy API, regulatory hurdles"
                        value={formData.risksUnknowns}
                        onChange={handleChange}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className={`w-full  cursor-pointer py-4 rounded-xl font-bold text-white transition-all shadow-lg ${loading
                    ? 'bg-white/10 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary to-secondary hover:shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]'
                    }`}
            >
                {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Architecting your plan...</span>
                    </div>
                ) : (
                    "Generate Full Specification"
                )}
            </button>
        </form>
    );
};

export default InitialForm;
