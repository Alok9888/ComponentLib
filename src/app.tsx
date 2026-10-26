import { useState } from 'react';
import { Accordion, Button, DataTable, DatePicker, Dropdown, Form, FormField, Input, Modal, Tabs, Toast } from './components';

const entries = [
  { name: 'Button', group: 'Actions', description: 'Trigger an action with clear visual priority.', usage: '<Button variant="primary" size="md">Save changes</Button>', props: ['variant: primary | secondary | ghost | danger', 'size: sm | md | lg', 'All native button props'] },
  { name: 'Input', group: 'Forms', description: 'A labeled field with hint and validation states.', usage: '<Input label="Email" type="email" required />', props: ['label, hint, error', 'All native input props', 'Automatic label and error associations'] },
  { name: 'Modal', group: 'Overlays', description: 'A dialog that supports Escape, backdrop dismissal, and focus management.', usage: '<Modal open={open} onClose={close} title="Confirm">...</Modal>', props: ['open: boolean', 'onClose: () => void', 'title and children'] },
  { name: 'Dropdown', group: 'Forms', description: 'A typed, labeled select built on the native control.', usage: '<Dropdown label="Plan" options={plans} onChange={setPlan} />', props: ['label: string', 'options: { label, value }[]', 'value and onChange'] },
  { name: 'Tabs', group: 'Navigation', description: 'Switch between panels with arrow key and Home/End navigation.', usage: '<Tabs items={tabs} defaultValue="overview" />', props: ['items: { label, value, content }[]', 'defaultValue: string', 'Arrow keys, Home, End'] },
  { name: 'Toast', group: 'Feedback', description: 'Announce a status, error, or informational message.', usage: '<Toast message="Saved" tone="success" />', props: ['message: string', 'tone: success | error | info', 'onDismiss: () => void'] },
  { name: 'DataTable', group: 'Data display', description: 'A typed table with sortable columns and pagination.', usage: '<DataTable columns={columns} rows={rows} pageSize={5} />', props: ['columns: key, label, optional render', 'rows: typed row data', 'pageSize: number'] },
  { name: 'Accordion', group: 'Disclosure', description: 'Expandable content with semantic buttons and regions.', usage: '<Accordion items={sections} multiple />', props: ['items: { title, content }[]', 'multiple: boolean'] },
  { name: 'Form', group: 'Forms', description: 'Controlled form state with pluggable validation.', usage: '<Form onSubmit={save} validate={validate}>...</Form>', props: ['onSubmit(values)', 'validate(values) => errors', 'FormField name, label, type'] },
  { name: 'DatePicker', group: 'Forms', description: 'A labeled date field with optional range limits.', usage: '<DatePicker label="Start date" onChange={setDate} />', props: ['label: string', 'value and onChange', 'min and max'] },
];
type DemoRow = { id: string; name: string; role: string; status: string };

export default function App() {
  const [selected, setSelected] = useState('Button');
  const [dark, setDark] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [variant, setVariant] = useState<'primary' | 'secondary' | 'ghost' | 'danger'>('primary');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [disabled, setDisabled] = useState(false);
  const [showInputError, setShowInputError] = useState(false);
  const [dropdown, setDropdown] = useState('');
  const [date, setDate] = useState('');
  const [submitted, setSubmitted] = useState('');
  const [accordionMultiple, setAccordionMultiple] = useState(false);
  const tabs = [
    { label: 'Preview', value: 'preview', content: 'The selected tab panel is rendered here.' },
    { label: 'Usage notes', value: 'notes', content: 'Use tabs to organize related content into compact, keyboard-accessible panels.' },
    { label: 'API', value: 'api', content: 'Each tab needs a stable value, a visible label, and panel content.' },
  ];
  const rows: DemoRow[] = [
    { id: 'usr_01', name: 'Avery Johnson', role: 'Designer', status: 'Active' },
    { id: 'usr_02', name: 'Morgan Lee', role: 'Engineer', status: 'Invited' },
    { id: 'usr_03', name: 'Jamie Rivera', role: 'Product manager', status: 'Active' },
    { id: 'usr_04', name: 'Taylor Kim', role: 'Researcher', status: 'Active' },
    { id: 'usr_05', name: 'Riley Patel', role: 'Engineer', status: 'Invited' },
    { id: 'usr_06', name: 'Casey Smith', role: 'Designer', status: 'Active' },
  ];
  const item = entries.find(entry => entry.name === selected)!;
  const renderPreview = () => {
    switch (selected) {
      case 'Button':
        return <div className="play-controls"><label>Variant<select value={variant} onChange={e => setVariant(e.target.value as typeof variant)}><option>primary</option><option>secondary</option><option>ghost</option><option>danger</option></select></label><label>Size<select value={size} onChange={e => setSize(e.target.value as typeof size)}><option>sm</option><option>md</option><option>lg</option></select></label><label className="check-control"><input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />Disabled</label><Button variant={variant} size={size} disabled={disabled} onClick={() => setToast('Button action handled')}>Save changes</Button></div>;
      case 'Input':
        return <div className="play-stack"><Input label="Email address" type="email" placeholder="you@example.com" hint="We'll only use this for account updates." error={showInputError ? 'Enter a valid email address.' : undefined} /><label className="check-control"><input type="checkbox" checked={showInputError} onChange={e => setShowInputError(e.target.checked)} />Show validation state</label></div>;
      case 'Modal':
        return <><Button onClick={() => setModalOpen(true)}>Open dialog</Button><Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Discard changes?"><p className="play-copy">Your unsaved edits will be lost. You can keep editing or discard them.</p><div className="play-actions"><Button variant="secondary" onClick={() => setModalOpen(false)}>Keep editing</Button><Button variant="danger" onClick={() => { setModalOpen(false); setToast('Changes discarded'); }}>Discard changes</Button></div></Modal></>;
      case 'Dropdown':
        return <div className="play-stack play-narrow"><Dropdown label="Workspace plan" value={dropdown} onChange={setDropdown} placeholder="Choose a plan" options={[{ label: 'Starter', value: 'starter' }, { label: 'Studio', value: 'studio' }, { label: 'Enterprise', value: 'enterprise' }]} /><p className="play-copy">Selected value: <strong>{dropdown || 'none'}</strong></p></div>;
      case 'Tabs':
        return <Tabs items={tabs} defaultValue="preview" />;
      case 'Toast':
        return <div className="play-stack"><div className="play-actions"><Button onClick={() => setToast('Your changes were saved.')}>Success</Button><Button variant="secondary" onClick={() => setToast('A new version is available.')}>Info</Button><Button variant="danger" onClick={() => setToast('Unable to save changes.')}>Error</Button></div><p className="play-copy">Choose a tone to trigger an announcement.</p></div>;
      case 'DataTable':
        return <DataTable<DemoRow> columns={[{ key: 'name', label: 'Name' }, { key: 'role', label: 'Role' }, { key: 'status', label: 'Status' }]} rows={rows} pageSize={4} />;
      case 'Accordion':
        return <div className="play-stack"><label className="check-control"><input type="checkbox" checked={accordionMultiple} onChange={e => setAccordionMultiple(e.target.checked)} />Allow multiple sections open</label><Accordion multiple={accordionMultiple} items={[{ title: 'When should I use this?', content: 'Use an accordion to progressively disclose details that are secondary to the main task.' }, { title: 'Is it keyboard accessible?', content: 'Each section is a native button and can be opened with Enter or Space.' }, { title: 'Can multiple items stay open?', content: 'Enable the control above to allow more than one expanded section.' }]} /></div>;
      case 'Form':
        return <Form onSubmit={values => setSubmitted('Submitted for ' + values.name + ' (' + values.email + ')')} validate={(values): Record<string, string> => !values.name?.trim() ? { name: 'Your name is required.' } : !values.email?.includes('@') ? { email: 'Enter a valid email address.' } : {}}><div className="play-form"><FormField name="name" label="Full name" required /><FormField name="email" label="Email address" type="email" required /><Button type="submit">Submit form</Button></div>{submitted && <p className="play-success" role="status">{submitted}</p>}</Form>;
      case 'DatePicker':
        return <div className="play-stack play-narrow"><DatePicker label="Project start date" value={date} onChange={setDate} min="2026-01-01" max="2027-12-31" /><p className="play-copy">Selected date: <strong>{date || 'none'}</strong></p></div>;
      default:
        return null;
    }
  };
  const code = selected === 'Button' ? '<Button variant="primary" size="md">Save changes</Button>' : item.usage;
  return <div className="playground" data-theme={dark ? 'dark' : 'light'}>
    <aside className="play-sidebar">
      <button className="play-brand" onClick={() => setSelected('Button')}><span className="play-mark">a</span><span>atelier<span className="play-brand-dot">.</span><small>COMPONENT LIBRARY</small></span></button>
      <div className="play-nav-heading">COMPONENTS <span>10</span></div>
      {entries.map(entry => <button key={entry.name} aria-label={'Open ' + entry.name + ' component playground'} className={'play-nav-item' + (selected === entry.name ? ' selected' : '')} aria-current={selected === entry.name ? 'page' : undefined} onClick={() => { setSelected(entry.name); setSubmitted(''); }}><span className="play-nav-glyph">{entry.name === 'Button' ? '◉' : entry.name === 'DataTable' ? '▤' : entry.name === 'Modal' ? '▢' : '◇'}</span>{entry.name}<span className="play-nav-group">{entry.group}</span></button>)}
      <div className="play-sidebar-bottom"><span className="play-status-dot" />10 components · React + TypeScript</div>
    </aside>
    <main className="play-main">
      <header className="play-topbar"><div><span>ATELIER UI</span><span className="play-slash">/</span><span>Components</span><span className="play-slash">/</span><strong>{selected}</strong></div><button className="play-theme" aria-pressed={dark} onClick={() => setDark(!dark)}>{dark ? '☼' : '◐'}<span>{dark ? 'Light mode' : 'Dark mode'}</span></button></header>
      <div className="play-content">
        <div className="play-intro"><div><div className="play-kicker">{item.group.toUpperCase()} · COMPONENT</div><h1>{item.name}</h1><p>{item.description}</p></div><span className="play-version">v0.1.0</span></div>
        <section className="play-preview-card"><div className="play-card-head"><div><strong>Interactive preview</strong><span>Change the controls and try the component.</span></div><span className="play-live"><i />LIVE</span></div><div className="play-preview">{renderPreview()}</div></section>
        <section className="play-code-card"><div className="play-card-head"><div><strong>Usage</strong><span>Import the component and compose it in your app.</span></div><span className="play-code-label">TSX</span></div><pre><code>{'import { ' + selected + ' } from "@your-scope/atelier-ui";\n\n' + code}</code></pre></section>
        <section className="play-details"><article className="play-detail-card"><div className="play-detail-title">API highlights</div><ul>{item.props.map(prop => <li key={prop}><code>{prop.split(':')[0]}</code><span>{prop.includes(':') ? prop.slice(prop.indexOf(':') + 2) : 'Supported'}</span></li>)}</ul></article><article className="play-detail-card"><div className="play-detail-title">Built for reuse</div><p>Typed props, composable React APIs, theme tokens, and focused interaction tests make this component easy to adopt and extend.</p><div className="play-tags"><span>TypeScript</span><span>Accessible</span><span>Tested</span></div></article></section>
        <footer className="play-footer">Atelier UI <span>·</span> A small, reusable component system</footer>
      </div>
    </main>
    {toast && <div className="play-toast"><Toast message={toast} onDismiss={() => setToast('')} /></div>}
  </div>;
}
