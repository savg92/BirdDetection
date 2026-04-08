import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

export function formatSpeciesName(name: string): string {
	return name.replace(/^\d+\./, '').trim();
}
