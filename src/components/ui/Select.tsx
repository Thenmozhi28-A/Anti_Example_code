import { useState, useRef, useEffect } from 'react'
import { MdSearch, MdKeyboardArrowDown, MdCheck } from 'react-icons/md'

interface SelectProps {
    options: string[]
    value: string
    onChange: (value: string) => void
    placeholder?: string
    label?: string
}

export default function Select({ options, value, onChange, placeholder = 'Select option', label }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const containerRef = useRef<HTMLDivElement>(null)

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={containerRef}>
            {label && (
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 bg-white border ${isOpen ? 'border-blue-500 ring-4 ring-blue-50' : 'border-slate-200'} rounded-xl transition-all duration-200 hover:border-slate-300 group`}
            >
                <span className={`text-sm font-bold ${value ? 'text-slate-900' : 'text-slate-400'}`}>
                    {value || placeholder}
                </span>
                <MdKeyboardArrowDown
                    size={20}
                    className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : 'group-hover:text-slate-600'}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top">
                    <div className="p-2 border-b border-slate-50">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search specialties..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-lg py-2 pl-10 pr-4 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="max-h-64 overflow-y-auto py-1 scrollbar-hide">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        onChange(option)
                                        setIsOpen(false)
                                        setSearchTerm('')
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-colors ${value === option
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    {option}
                                    {value === option && <MdCheck size={16} />}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">No results found</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
