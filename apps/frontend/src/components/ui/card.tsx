import type { PropsWithChildren } from 'react';

import { cn } from '../../lib/utils';

interface CardProps extends PropsWithChildren {
	className?: string;
}

export function Card({ className, children }: CardProps): JSX.Element {
	return (
		<section
			className={cn(
				'rounded-xl border border-slate-800 bg-slate-900 p-4',
				className,
			)}
		>
			{children}
		</section>
	);
}
