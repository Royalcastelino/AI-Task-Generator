import TaskBoard from './TaskBoard';
import ExportPanel from './ExportPanel';

const SpecDisplay = ({ spec, onReset, onUpdate }: { spec: any, onReset: () => void, onUpdate: (updatedSpec: any) => void }) => {
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold text-white">{spec.goal}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full text-xs font-bold uppercase tracking-wider">{spec.platform}</span>
                        <span className="px-3 py-1 bg-white/5 text-white/60 border border-white/10 rounded-full text-xs">{spec.targetUsers}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <ExportPanel spec={spec} />
                    <button
                        onClick={onReset}
                        className="px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-semibold transition-all"
                    >
                        New Project
                    </button>
                </div>
            </div>

            <section className="glass-card p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <span className="w-1.5 h-6 bg-primary rounded-full mr-3" />
                    User Stories
                </h3>
                <ul className="space-y-4">
                    {spec.userStories.map((story: string, index: number) => (
                        <li key={index} className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-white/40">{index + 1}</span>
                            <p className="text-white/80 leading-relaxed">{story}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section>
                <h3 className="text-xl font-bold mb-6 flex items-center">
                    <span className="w-1.5 h-6 bg-secondary rounded-full mr-3" />
                    Engineering Task Board
                </h3>
                <TaskBoard
                    tasks={spec.engineeringTasks}
                    onTasksChange={(updatedTasks: any) => onUpdate({ ...spec, engineeringTasks: updatedTasks })}
                />
            </section>

            {spec.risks && spec.risks.length > 0 && (
                <section className="glass-card p-8 border-l-4 border-l-red-500/50">
                    <h3 className="text-xl font-bold mb-6 flex items-center">
                        <span className="w-1.5 h-6 bg-red-500 rounded-full mr-3" />
                        Project Risks
                    </h3>
                    <ul className="space-y-3">
                        {spec.risks.map((risk: string, index: number) => (
                            <li key={index} className="flex items-center space-x-3 text-white/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                <span>{risk}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default SpecDisplay;
