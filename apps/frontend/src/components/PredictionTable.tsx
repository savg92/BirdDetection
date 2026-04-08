import type { PredictionItem } from '../lib/api';
import { formatSpeciesName } from '../lib/utils';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeaderCell,
	TableRow,
} from './ui/table';

interface PredictionTableProps {
	predictions: PredictionItem[];
}

export function PredictionTable({
	predictions,
}: PredictionTableProps): JSX.Element {
	return (
		<div className='overflow-hidden rounded-lg border border-slate-800'>
			<Table>
				<TableHead>
					<TableRow>
						<TableHeaderCell>Species</TableHeaderCell>
						<TableHeaderCell>Confidence</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{predictions.map((item) => (
						<TableRow key={item.species}>
							<TableCell>{formatSpeciesName(item.species)}</TableCell>
							<TableCell>{(item.probability * 100).toFixed(2)}%</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
