import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

export function CustomRadioWithTooltip({
  value,
  id,
  register,
  tooltipContent,
  labelClassName,
}: {
  value: string;
  id: string;
  register: UseFormRegisterReturn;
  tooltipContent: string;
  labelClassName: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className='relative inline-block'>
      <input
        className='hidden peer'
        type='radio'
        value={value}
        id={id}
        {...register}
      />
      <label
        className={labelClassName}
        htmlFor={id}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span>{value}</span>
      </label>
      {showTooltip && (
        <div className='absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg w-[18ch] -translate-y-full -top-2 left-1/2 -translate-x-1/2'>
          {tooltipContent}
          <div className='absolute w-2 h-2 bg-gray-800 rotate-45 -bottom-1 left-1/2 -translate-x-1/2' />
        </div>
      )}
    </div>
  );
}
