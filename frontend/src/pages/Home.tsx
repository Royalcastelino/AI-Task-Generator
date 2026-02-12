import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import InitialForm from '../components/InitialForm';
import SpecDisplay from '../components/SpecDisplay';
import { generateSpec } from '../api';

const Home = () => {
    const [spec, setSpec] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state?.initialData) {
            setSpec(location.state.initialData);
        }
    }, [location.state]);

    const handleGenerate = async (formData: any) => {
        setLoading(true);
        setError(null);
        try {
            const result = await generateSpec(formData);
            setSpec(result);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to generate specification. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSpec(null);
        setError(null);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {!spec ? (
                <div className="max-w-3xl mx-auto">
                    <header className="text-center mb-12">
                        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                            AI-Powered <span className="gradient-text">Project Planner</span>
                        </h1>
                        <p className="text-white/60 text-lg">
                            Transform your goals into structured user stories and engineering tasks in seconds.
                        </p>
                    </header>

                    <div className="glass-card p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm">
                                {error}
                            </div>
                        )}
                        <InitialForm onSubmit={handleGenerate} loading={loading} />
                    </div>
                </div>
            ) : (
                <SpecDisplay spec={spec} onReset={handleReset} onUpdate={setSpec} />
            )}
        </div>
    );
};

export default Home;
