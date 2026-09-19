import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  error?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  defaultValue,
  options,
  onChange,
  error,
  hint,
  placeholder,
  disabled = false,
  className,
  id,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value ?? defaultValue ?? (options[0]?.value || ''));
  const [coords, setCoords] = useState<{ top: number; left: number; width: number; openUpwards: boolean; maxHeight: number } | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const currentValue = value !== undefined ? value : internalValue;
  const currentOption = options.find((opt) => opt.value === currentValue) || options[0];

  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    }
  }, [value]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Like native dropdown: preferred downwards. Only open upwards if screen bottom is too tight.
    const shouldOpenUpwards = spaceBelow < 180 && spaceAbove > spaceBelow;
    const estimatedHeight = Math.min(220, options.length * 38 + 12);

    let top = rect.bottom + 4;
    let maxHeight = Math.max(120, spaceBelow - 12);

    if (shouldOpenUpwards) {
      top = rect.top - Math.min(estimatedHeight, spaceAbove - 12) - 4;
      maxHeight = Math.max(120, spaceAbove - 16);
    }

    setCoords({
      top,
      left: rect.left,
      width: rect.width,
      openUpwards: shouldOpenUpwards,
      maxHeight: Math.min(240, maxHeight),
    });
  }, [options.length]);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  // Reposition on window resize or scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      updatePosition();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, updatePosition]);

  const handleSelect = (val: string) => {
    setInternalValue(val);
    setIsOpen(false);
    if (onChange) {
      onChange({ target: { value: val, name } });
    }
  };

  const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-medium text-text-main mb-1.5">
          {label}
        </label>
      )}

      {/* Styled Trigger Button (looks exactly like default form input but styled) */}
      <button
        ref={triggerRef}
        type="button"
        id={selectId}
        disabled={disabled}
        onClick={handleToggle}
        className={twMerge(
          clsx(
            'w-full flex items-center justify-between text-left rounded-input border bg-surface text-sm text-text-main py-2 pl-3 pr-3 transition-all duration-150 cursor-pointer shadow-subtle select-none',
            isOpen
              ? 'border-[#2D5A50] ring-2 ring-[#8FB9AC]/30'
              : 'border-border-ui hover:border-[#8FB9AC]',
            disabled && 'opacity-60 cursor-not-allowed bg-page',
            error && 'border-red-400 focus:ring-red-400',
            className
          )
        )}
      >
        <span className="truncate pr-2 font-normal">
          {currentOption ? currentOption.label : placeholder || 'Tanlang...'}
        </span>
        <ChevronDown
          className={clsx(
            'w-4 h-4 text-text-muted shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180 text-deep-teal'
          )}
        />
      </button>

      {/* Portal-based Floating Dropdown: Works EXACTLY like native default dropdown by breaking out of all modal containers! */}
      {isOpen && coords && createPortal(
        <>
          {/* Invisible click-catcher overlay */}
          <div
            className="fixed inset-0 z-[9998] cursor-default"
            onClick={() => setIsOpen(false)}
          />

          {/* Styled Floating Dropdown Menu at Body Level */}
          <div
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              maxHeight: `${coords.maxHeight}px`,
            }}
            className="z-[9999] bg-white border border-border-ui rounded-xl shadow-2xl py-1 overflow-y-auto animate-fade-in"
          >
            {options.length === 0 ? (
              <div className="px-3 py-2 text-xs text-text-muted text-center">
                Tanlovlar mavjud emas
              </div>
            ) : (
              options.map((opt) => {
                const isSelected = opt.value === currentValue;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 text-xs sm:text-sm cursor-pointer transition-colors select-none',
                      isSelected
                        ? 'bg-[#EEF5F2] text-[#142A25] font-semibold'
                        : 'hover:bg-[#F7FAF9] text-text-main'
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-[#2D5A50] shrink-0 ml-2" />
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>,
        document.body
      )}

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      {hint && !error && <p className="mt-1 text-xs text-text-muted">{hint}</p>}
    </div>
  );
};
