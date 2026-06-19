"use client"

export default function ActionIcon({ isActive, entityId, onToggle }: { isActive: boolean, entityId: number | string, onToggle: (id: number | string) => void }) {
    return (
        <div
            onClick={() => onToggle(entityId)}
            className={`cursor-pointer w-12 h-6 rounded-full transition-colors duration-200 flex items-center px-1 m-auto
        ${isActive ? 'bg-green-500' : 'bg-red-500'}`}
        >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200
        ${isActive ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </div>
    );
}