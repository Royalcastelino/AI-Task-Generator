const ExportPanel = ({ spec }: { spec: any }) => {
    const generateMarkdown = () => {
        let md = `# Technical Specification: ${spec.goal}\n\n`;
        md += `**Platform:** ${spec.platform}\n`;
        md += `**Target Users:** ${spec.targetUsers}\n`;
        md += `**Constraints:** ${spec.constraints}\n\n`;

        md += `## User Stories\n`;
        spec.userStories.forEach((s: string) => md += `- ${s}\n`);

        md += `\n## Engineering Tasks\n`;
        md += `### Frontend\n`;
        spec.engineeringTasks.frontend.forEach((t: string) => md += `- ${t}\n`);
        md += `### Backend\n`;
        spec.engineeringTasks.backend.forEach((t: string) => md += `- ${t}\n`);
        md += `### DevOps\n`;
        spec.engineeringTasks.devops.forEach((t: string) => md += `- ${t}\n`);

        md += `\n## Risks\n`;
        spec.risks.forEach((r: string) => md += `- ${r}\n`);

        return md;
    };

    const copyToClipboard = () => {
        const md = generateMarkdown();
        navigator.clipboard.writeText(md);
        alert('Copied to clipboard as Markdown!');
    };

    const downloadFile = (extension: string) => {
        const content = generateMarkdown();
        const fileName = `spec-${spec.goal.toLowerCase().replace(/\s+/g, '-')}.${extension}`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex gap-2">
            <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl font-semibold transition-all"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
                <span>Copy MD</span>
            </button>

            <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white/80 rounded-xl font-semibold transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download</span>
                </button>

                <div className="absolute right-0 top-full mt-2 w-32 glass-card overflow-hidden shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    <button
                        onClick={() => downloadFile('md')}
                        className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                    >
                        .md file
                    </button>
                    <button
                        onClick={() => downloadFile('txt')}
                        className="w-full px-4 py-2 text-left text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors border-t border-white/5"
                    >
                        .txt file
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExportPanel;
