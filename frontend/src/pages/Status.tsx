import { useEffect, useState } from 'react';
import { getStatus } from '../api';

const Status = () => {
    const [status, setStatus] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const data = await getStatus();
                setStatus(data);
            } catch (error) {
                console.error('Failed to fetch status');
            } finally {
                setLoading(false);
            }
        };
        fetchStatus();
    }, []);

    const StatusIndicator = ({ label, value }: { label: string, value: string }) => (
        <div className="glass-card p-6 flex items-center justify-between">
            <span className="text-lg font-medium text-white/80">{label}</span>
            <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${value === 'ok' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                <span className={`uppercase font-bold text-sm ${value === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
                    {value || 'error'}
                </span>
            </div>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold mb-4">System <span className="gradient-text">Status</span></h1>
                <p className="text-white/60">Real-time health check for backend services and integrations.</p>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="grid gap-4">
                    <StatusIndicator label="Backend Server" value={status?.backend} />
                    <StatusIndicator label="Database Connection" value={status?.database} />
                    <StatusIndicator label="OpenAI (LLM) Service" value={status?.llm} />
                </div>
            )}
        </div>
    );
};

export default Status;
