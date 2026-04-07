import type { PropsWithChildren } from 'react';

import { cn } from '../../lib/utils';

interface AlertProps extends PropsWithChildren {
	variant?: 'default' | 'warning';
}

export function Alert({
	children,
	variant = 'default',
}: AlertProps): JSX.Element {
	return (
		<div
			className={cn(
				'rounded-lg border px-4 py-3 text-sm',
				variant === 'warning'
					? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
					: 'border-slate-700 bg-slate-800/80 text-slate-200',
			)}
		>
			{children}
		</div>
	);
}
