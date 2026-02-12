import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/history', label: 'History' },
        { path: '/status', label: 'Status' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white">T</div>
                            <span className="text-xl font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">TasksGen</span>
                        </Link>
                    </div>
                    <div className="flex space-x-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${location.pathname === item.path
                                    ? 'bg-white/10 text-white'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen pt-16">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <footer className="py-8 border-t border-white/5 text-center text-white/40 text-sm">
                <p>&copy; {new Date().getFullYear()} Tasks Generator. Built for efficiency.</p>
            </footer>
        </div>
    );
};

export default Layout;
