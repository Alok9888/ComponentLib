import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Accordion, Button, DataTable, DatePicker, Dropdown, Form, FormField, Input, Modal, Tabs, Toast } from './components';

describe('ComponentLib components (Jest)', () => {
  it('renders a disabled button', () => {
    render(<Button disabled>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
  });

  it('connects an input label and validation message', () => {
    render(<Input label="Email" error="Required" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('closes a dialog with Escape', () => {
    const onClose = jest.fn();
    render(<Modal open onClose={onClose} title="Confirm">Proceed?</Modal>);
    fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('emits a changed dropdown value', () => {
    const onChange = jest.fn();
    render(<Dropdown label="Plan" options={[{ label: 'Studio', value: 'studio' }]} onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Plan'), { target: { value: 'studio' } });
    expect(onChange).toHaveBeenCalledWith('studio');
  });

  it('changes the active tab panel', () => {
    render(<Tabs items={[{ label: 'First', value: 'one', content: 'First panel' }, { label: 'Second', value: 'two', content: 'Second panel' }]} />);
    fireEvent.click(screen.getByRole('tab', { name: 'Second' }));
    expect(screen.getByText('Second panel')).toBeInTheDocument();
  });

  it('exposes toast messages to assistive technology', () => {
    render(<Toast message="Saved" />);
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
  });

  it('sorts rows and advances the table page', () => {
    render(<DataTable columns={[{ key: 'name', label: 'Name' }]} rows={[{ id: 'a', name: 'Zoe' }, { id: 'b', name: 'Amy' }]} pageSize={1} />);
    fireEvent.click(screen.getByRole('button', { name: 'Name' }));
    expect(screen.getByText('Amy')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Zoe')).toBeInTheDocument();
  });

  it('expands an accordion region', () => {
    render(<Accordion items={[{ title: 'Details', content: 'More information' }]} />);
    fireEvent.click(screen.getByRole('button', { name: 'Details' }));
    expect(screen.getByRole('region')).toHaveTextContent('More information');
  });

  it('validates and submits form data', () => {
    const onSubmit = jest.fn();
    render(<Form onSubmit={onSubmit} validate={(values): Record<string, string> => values.name ? {} : { name: 'Name is required' }}><FormField name="name" label="Name" /><Button type="submit">Send</Button></Form>);
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(screen.getByText('Name is required')).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Rae' } });
    fireEvent.click(screen.getByRole('button', { name: 'Send' }));
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Rae' });
  });

  it('emits the selected date', () => {
    const onChange = jest.fn();
    render(<DatePicker label="Start date" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Start date'), { target: { value: '2026-10-26' } });
    expect(onChange).toHaveBeenCalledWith('2026-10-26');
  });
});
