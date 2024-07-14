'use client';

import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface HistoryRow {
  id: number;
  Agendacion: string;
  Email: string;
  'UTM Source': string;
  'UTM Campaign': string;
  'UTM Medium': string;
  'UTM Term': string;
  'UTM Content': string;
  Closer: string;
  State: string;
  oldState?: string;
}

export default function Historial() {
  const [history, setHistory] = useState<HistoryRow[]>([]);
  useEffect(() => {
    setHistory(
      JSON.parse((localStorage.getItem('changeHistory') as string) || '[]')
    );
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 ">
        <Link href={'/'} className="bg-black rounded-md py-2 px-4 text-white">
          &larr; Volver
        </Link>
      </div>

      <DataGrid
        className="flex-1"
        rows={history}
        columns={cols}
        pageSizeOptions={[50]}
        initialState={{
          pagination: {
            rowCount: history.length,
            paginationModel: {
              pageSize: 50,
            },
          },
        }}
        disableRowSelectionOnClick
        getRowClassName={(params) =>
          (params.indexRelativeToCurrentPage % 2 === 0
            ? 'bg-gray-100'
            : 'odd') + ' cursor-pointer'
        }
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
        }}
      />
    </div>
  );
}

const cols: GridColDef[] = [
  {
    field: 'id',
    headerName: 'id',
    width: 75,
    align: 'center',
  },
  {
    field: 'Agendacion',
    headerName: 'Agendacion',
    width: 100,
  },
  { field: 'Email', headerName: 'Email', width: 200 },
  {
    field: 'UTM Source',
    headerName: 'UTM Source',
    width: 150,
  },
  {
    field: 'UTM Campaign',
    headerName: 'UTM Campaign',
    width: 150,
  },
  {
    field: 'UTM Medium',
    headerName: 'UTM Medium',
    width: 20,
  },
  {
    field: 'UTM Term',
    headerName: 'UTM Term',
    width: 120,
  },
  {
    field: 'UTM Content',
    headerName: 'UTM Content',
    width: 120,
  },
  { field: 'Closer', headerName: 'Closer', width: 80 },
  {
    field: 'newState',
    headerName: 'State',
    width: 200,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <strong>{params.value}</strong>
    ),
  },
  {
    field: 'State',
    headerName: 'Old State',
    width: 200,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <p className="text-gray-500">{params.value}</p>
    ),
  },
];
