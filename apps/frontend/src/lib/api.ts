export interface PredictionItem {
	species: string;
	probability: number;
}

export interface PredictResponse {
	top_5: PredictionItem[];
	top_species: string;
	probability: number;
	is_uncertain: boolean;
	filepath: string;
}

export interface HistoryItem {
	id: number;
	filepath: string;
	top_species: string;
	probability: number;
	timestamp: string;
	is_uncertain: boolean;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export async function predictBird(file: File): Promise<PredictResponse> {
	const form = new FormData();
	form.append('file', file);

	const response = await fetch(`${API_BASE}/predict`, {
		method: 'POST',
		body: form,
	});

	if (!response.ok) {
		const message = await response.text();
		throw new Error(message || 'Prediction failed');
	}

	return (await response.json()) as PredictResponse;
}

export async function fetchHistory(): Promise<HistoryItem[]> {
	const response = await fetch(`${API_BASE}/history`);
	if (!response.ok) {
		throw new Error('Failed to fetch history');
	}

	return (await response.json()) as HistoryItem[];
}

export function toImageUrl(filepath: string): string {
	if (filepath.startsWith('http')) {
		return filepath;
	}

	return `${API_BASE}${filepath}`;
}
