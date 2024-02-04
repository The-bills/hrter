export const TextInput = (p: { label: string, value: string, onChange?: (v: string) => void, className?: string, disabled?: boolean }) => {
    return (
        <div className={`flex flex-col ${p.className ?? ''}`}>
            <label htmlFor="name" className="font-semibold text-sm text-gray-900">{p.label}</label>
            <input disabled={p.disabled} type='text' className='border rounded-md pt-2 pb-2 pl-3 pr-3 mt-2 text-sm' placeholder='Name' value={p.value} onChange={e => p.onChange?.(e.target.value)} />
        </div>
    )
}