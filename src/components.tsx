import React, { createContext, useContext, useEffect, useId, useRef, useState } from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; size?: 'sm' | 'md' | 'lg' };
export function Button({ variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) { return <button className={`ui-button ui-button--${variant} ui-button--${size} ${className}`} {...props} />; }

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string; error?: string };
export function Input({ label, hint, error, id, className = '', ...props }: InputProps) {
  const generated = useId(); const inputId = id ?? generated;
  return <div className={`ui-field ${className}`}><label htmlFor={inputId}>{label}{props.required && <span aria-hidden="true"> *</span>}</label><input id={inputId} aria-invalid={!!error || undefined} aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined} {...props} />{error ? <small className="ui-error" id={`${inputId}-error`}>{error}</small> : hint && <small className="ui-hint" id={`${inputId}-hint`}>{hint}</small>}</div>;
}

export function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const id = useId(); const dialog = useRef<HTMLElement>(null); const previousFocus = useRef<HTMLElement | null>(null);
  useEffect(() => { if (!open) return; previousFocus.current = document.activeElement as HTMLElement; const target = dialog.current?.querySelector<HTMLElement>('button, input, select, textarea, [href], [tabindex]:not([tabindex="-1"])'); (target ?? dialog.current)?.focus(); return () => previousFocus.current?.focus(); }, [open]);
  if (!open) return null;
  return <div className="ui-modal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}><section ref={dialog} tabIndex={-1} className="ui-modal" role="dialog" aria-modal="true" aria-labelledby={id} onKeyDown={e => { if (e.key === 'Escape') onClose(); if (e.key === 'Tab') { const nodes = [...(dialog.current?.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])') ?? [])]; const first = nodes[0], last = nodes[nodes.length - 1]; if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); } } }}><header><h2 id={id}>{title}</h2><button className="ui-icon-button" aria-label="Close dialog" onClick={onClose}>×</button></header><div>{children}</div></section></div>;
}

export type DropdownOption = { label: string; value: string };
export function Dropdown({ label, options, value, onChange, placeholder = 'Select an option' }: { label: string; options: DropdownOption[]; value?: string; onChange: (value: string) => void; placeholder?: string }) {
  const id = useId(); return <div className="ui-field"><label htmlFor={id}>{label}</label><select id={id} value={value ?? ''} onChange={e => onChange(e.target.value)}><option value="" disabled>{placeholder}</option>{options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}</select></div>;
}

export function Tabs({ items, defaultValue }: { items: { label: string; value: string; content: React.ReactNode }[]; defaultValue?: string }) {
  const [active, setActive] = useState(defaultValue ?? items[0]?.value); const id = useId();
  const move = (e: React.KeyboardEvent<HTMLDivElement>) => { if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return; e.preventDefault(); const i = items.findIndex(x => x.value === active); const n = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : items.length - 1)) % items.length; setActive(items[n]?.value); document.getElementById(`${id}-${items[n]?.value}`)?.focus(); };
  const selected = items.find(x => x.value === active);
  return <div className="ui-tabs"><div className="ui-tab-list" role="tablist" onKeyDown={move}>{items.map(t => <button key={t.value} id={`${id}-${t.value}`} role="tab" aria-selected={t.value === active} aria-controls={`${id}-panel`} tabIndex={t.value === active ? 0 : -1} onClick={() => setActive(t.value)}>{t.label}</button>)}</div><div id={`${id}-panel`} className="ui-tab-panel" role="tabpanel" aria-labelledby={`${id}-${active}`}>{selected?.content}</div></div>;
}

export function Toast({ message, tone = 'success', onDismiss }: { message: string; tone?: 'success' | 'error' | 'info'; onDismiss?: () => void }) { return <div className={`ui-toast ui-toast--${tone}`} role={tone === 'error' ? 'alert' : 'status'}><span className="ui-toast-dot" />{message}{onDismiss && <button aria-label="Dismiss notification" onClick={onDismiss}>×</button>}</div>; }

export function DataTable<T extends Record<string, unknown>>({ columns, rows, pageSize = 5 }: { columns: { key: keyof T; label: string; render?: (row: T) => React.ReactNode }[]; rows: T[]; pageSize?: number }) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null); const [direction, setDirection] = useState<'asc' | 'desc'>('asc'); const [page, setPage] = useState(0);
  const sorted = [...rows].sort((a, b) => { if (!sortKey) return 0; const x = a[sortKey], y = b[sortKey]; const cmp = String(x ?? '').localeCompare(String(y ?? ''), undefined, { numeric: true }); return direction === 'asc' ? cmp : -cmp; });
  const pages = Math.max(1, Math.ceil(sorted.length / pageSize));
  return <div className="ui-table-wrap"><table className="ui-table"><thead><tr>{columns.map(c => <th key={String(c.key)} scope="col" aria-sort={sortKey === c.key ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'}><button onClick={() => { setSortKey(c.key); setDirection(sortKey === c.key && direction === 'asc' ? 'desc' : 'asc'); setPage(0); }}>{c.label}{sortKey === c.key ? (direction === 'asc' ? ' ↑' : ' ↓') : ''}</button></th>)}</tr></thead><tbody>{sorted.slice(page * pageSize, (page + 1) * pageSize).map((row, i) => <tr key={String(row.id ?? page * pageSize + i)}>{columns.map(c => <td key={String(c.key)}>{c.render ? c.render(row) : String(row[c.key] ?? '')}</td>)}</tr>)}</tbody></table><footer className="ui-table-footer"><span>{rows.length ? `${page * pageSize + 1}–${Math.min((page + 1) * pageSize, rows.length)} of ${rows.length}` : 'No results'}</span><div><Button variant="ghost" size="sm" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button><Button variant="ghost" size="sm" disabled={page >= pages - 1} onClick={() => setPage(page + 1)}>Next</Button></div></footer></div>;
}

export function Accordion({ items, multiple = false }: { items: { title: string; content: React.ReactNode }[]; multiple?: boolean }) {
  const [opened, setOpened] = useState<string[]>([]); const id = useId();
  return <div className="ui-accordion">{items.map((item, i) => { const open = opened.includes(String(i)); return <section key={item.title}><h3><button id={`${id}-trigger-${i}`} aria-expanded={open} aria-controls={`${id}-panel-${i}`} onClick={() => setOpened(open ? opened.filter(x => x !== String(i)) : multiple ? [...opened, String(i)] : [String(i)])}>{item.title}<span aria-hidden="true">{open ? '−' : '+'}</span></button></h3>{open && <div id={`${id}-panel-${i}`} role="region" aria-labelledby={`${id}-trigger-${i}`}>{item.content}</div>}</section>; })}</div>;
}

type FormContextValue = { values: Record<string, string>; errors: Record<string, string>; setValue: (name: string, value: string) => void };
const FormContext = createContext<FormContextValue | null>(null);
export function Form({ onSubmit, validate, children, className = '' }: { onSubmit: (values: Record<string, string>) => void; validate?: (values: Record<string, string>) => Record<string, string>; children: React.ReactNode; className?: string }) {
  const [values, setValues] = useState<Record<string, string>>({}); const [errors, setErrors] = useState<Record<string, string>>({});
  const setValue = (name: string, value: string) => setValues(v => ({ ...v, [name]: value }));
  return <FormContext.Provider value={{ values, errors, setValue }}><form className={className} noValidate onSubmit={e => { e.preventDefault(); const next = validate?.(values) ?? {}; setErrors(next); if (!Object.keys(next).length) onSubmit(values); }}>{children}</form></FormContext.Provider>;
}
export function FormField({ name, label, type = 'text', required }: { name: string; label: string; type?: string; required?: boolean }) {
  const ctx = useContext(FormContext); if (!ctx) throw new Error('FormField must be used inside Form'); const id = useId();
  return <Input id={id} name={name} label={label} type={type} required={required} value={ctx.values[name] ?? ''} onChange={e => ctx.setValue(name, e.target.value)} error={ctx.errors[name]} />;
}

export function DatePicker({ label, value, onChange, min, max }: { label: string; value?: string; onChange: (value: string) => void; min?: string; max?: string }) { return <Input label={label} type="date" value={value ?? ''} onChange={e => onChange(e.target.value)} min={min} max={max} />; }

