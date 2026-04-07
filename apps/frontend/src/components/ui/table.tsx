import type { PropsWithChildren } from 'react';

import { cn } from '../../lib/utils';

export function Table({ children }: PropsWithChildren): JSX.Element {
	return (
		<table className='w-full text-left text-sm text-slate-200'>
			{children}
		</table>
	);
}

export function TableHead({ children }: PropsWithChildren): JSX.Element {
	return <thead className='text-slate-400'>{children}</thead>;
}

export function TableBody({ children }: PropsWithChildren): JSX.Element {
	return <tbody>{children}</tbody>;
}

interface RowProps extends PropsWithChildren {
	className?: string;
}

export function TableRow({ children, className }: RowProps): JSX.Element {
	return (
		<tr className={cn('border-t border-slate-800', className)}>{children}</tr>
	);
}

export function TableHeaderCell({ children }: PropsWithChildren): JSX.Element {
	return <th className='px-3 py-2 font-medium'>{children}</th>;
}

export function TableCell({ children }: PropsWithChildren): JSX.Element {
	return <td className='px-3 py-2'>{children}</td>;
}
