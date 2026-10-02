#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/36597b3d9cb6380d0d71a889c9f366d7046d09d37be37a076162ed1ed4586816/contract';
import endContract from '../../snapshots/36597b3d9cb6380d0d71a889c9f366d7046d09d37be37a076162ed1ed4586816/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/e139e3ef66972b1ed7d48d11cd0bd00ce2ed19ebde4b4ab7676b599a7c27f768/contract';
import startContract from '../../snapshots/e139e3ef66972b1ed7d48d11cd0bd00ce2ed19ebde4b4ab7676b599a7c27f768/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  checkExpression,
  col,
  primaryKey,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Vessel',
        columns: [
          col('heading', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('imo', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('lastUpdated', 'timestamptz', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-string@1' },
          }),
          col('latitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('longitude', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('speed', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('status', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [
          primaryKey(['id']),
          checkExpression(
            'Vessel_status_check_ccac42f6',
            "\"status\" IN ('active', 'offline', 'inactive')",
          ),
        ],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Vessel',
        constraint: 'Vessel_imo_key',
        columns: ['imo'],
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
