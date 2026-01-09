import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Sparkles,
  UserPlus,
  FileText,
  Moon,
  X,
  ArrowRight
} from 'lucide-react';

/**
 * CommandPalette Component (Spotlight Search)
 * 
 * Features:
 * - Opens with Ctrl+K / Cmd+K
 * - Navigate to pages
 * - Quick actions
 */

// Navigation items
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/', section: 'Navigation' },
  { id: 'visitors', label: 'Kunjungan', icon: Users, path: '/visitors', section: 'Navigation' },
  { id: 'loans', label: 'Peminjaman', icon: BookOpen, path: '/loans', section: 'Navigation' },
  { id: 'recommendations', label: 'Rekomendasi', icon: Sparkles, path: '/recommendations', section: 'Navigation' },
];

// Quick actions
const quickActions = [
  { id: 'add-visitor', label: 'Tambah Pengunjung Baru', icon: UserPlus, action: 'add-visitor', section: 'Actions' },
  { id: 'register-loan', label: 'Register Peminjaman', icon: FileText, action: 'register-loan', section: 'Actions' },
  { id: 'toggle-dark', label: 'Toggle Dark Mode', icon: Moon, action: 'toggle-dark', section: 'Actions' },
];

const allItems = [...navItems, ...quickActions];

// Backdrop animation
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

// Modal animation
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    y: -10,
    transition: { duration: 0.15 }
  },
};

function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Filter items based on search
  const filteredItems = allItems.filter(item => 
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // Group by section
  const groupedItems = filteredItems.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {});

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (!isOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      handleSelect(filteredItems[selectedIndex]);
    }
  }, [filteredItems, selectedIndex]);

  // Handle item selection
  const handleSelect = (item) => {
    if (item.path) {
      // Use window.location for navigation (no react-router-dom needed)
      window.location.hash = item.path;
    } else if (item.action) {
      console.log(`Action triggered: ${item.action}`);
      alert(`Action: ${item.label}`);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
      >
        <Search className="w-4 h-4" />
        <span className="hidden md:inline">Search...</span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-gray-400 bg-white rounded border border-gray-200">
          <span>Ctrl</span>
          <span>K</span>
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Cari halaman atau aksi..."
                  className="flex-1 text-base outline-none placeholder:text-gray-400"
                />
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-80 overflow-y-auto py-2">
                {Object.entries(groupedItems).map(([section, items]) => (
                  <div key={section}>
                    <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {section}
                    </div>
                    {items.map((item) => {
                      const globalIndex = filteredItems.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                            isSelected ? 'bg-gray-100' : 'hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className={`w-5 h-5 ${isSelected ? 'text-gray-900' : 'text-gray-400'}`} />
                          <span className={`flex-1 ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>
                            {item.label}
                          </span>
                          {isSelected && <ArrowRight className="w-4 h-4 text-gray-400" />}
                        </button>
                      );
                    })}
                  </div>
                ))}

                {filteredItems.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-400">
                    <p>Tidak ada hasil untuk "{search}"</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex items-center gap-4 px-4 py-2 bg-gray-50 border-t border-gray-100 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">↑↓</kbd>
                  <span>Navigate</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">Enter</kbd>
                  <span>Select</span>
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border">Esc</kbd>
                  <span>Close</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default CommandPalette;
