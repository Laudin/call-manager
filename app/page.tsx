'use client';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import { ChangeEvent, useEffect, useState } from 'react';
import { Form } from './components/Form';
import Link from 'next/link';

interface Row {
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
  newState?: string;
}

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  // saved row data for later history push
  const [selectedRow, setSelectedRow] = useState<Row & { newState: string }>({
    id: 0,
    Agendacion: '',
    Email: '',
    'UTM Source': '',
    'UTM Campaign': '',
    'UTM Medium': '',
    'UTM Term': '',
    'UTM Content': '',
    Closer: '',
    State: '',
    newState: '',
  });

  const handleGetData = async () => {
    setLoading(true);
    await fetch(`api/get`)
      .then(
        (res) =>
          res.json() as Promise<{
            data: string[][];
          }>
      )
      .then((data) => {
        setRows(
          data.data.map((row, i) => ({
            id: i + 1,
            Agendacion: row[0],
            Email: row[1],
            'UTM Source': row[2],
            'UTM Campaign': row[3],
            'UTM Medium': row[4],
            'UTM Term': row[5],
            'UTM Content': row[6],
            Closer: row[7],
            State: row[8],
          }))
        );
        setCount(data.data.length);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  const onCellClick = (cell: GridCellParams) => {
    if (cell.field == 'State') {
      setOpen(true);
      // save row data for later history push
      setSelectedRow(cell.row);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleStateChange = async (
    event: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setSelectedRow((state) => ({ ...state, newState: value }));
  };

  const handleUpdate = async () => {
    await fetch(`api/update`, {
      method: 'POST',
      body: JSON.stringify({
        id: selectedRow?.id,
        state: selectedRow.newState,
      }),
    })
      .then(() => {
        // TODO: REPLACE STATE HANDLER WITH MUI DataGrid STATE HANDLER
        const newRows = [...rows];
        const cell = newRows.find((row) => row.id == selectedRow?.id);
        if (cell) cell.State = selectedRow.newState;
        setRows(newRows);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // SAVE HISTORY IN LOCALHOST
        const history = JSON.parse(
          (localStorage.getItem('changeHistory') as string) || '[]'
        );

        localStorage.setItem(
          'changeHistory',
          JSON.stringify([...history, selectedRow])
        );
        handleClose();
      });
  };

  return (
    <main className="">
      <div className="h-screen flex flex-col">
        <div className="p-4 ">
          <Link
            href={'/historial'}
            className="bg-black rounded-md py-2 px-4 text-white"
          >
            Historial &rarr;
          </Link>
        </div>
        <DataGrid
          className="flex-1"
          rows={rows}
          columns={cols}
          pageSizeOptions={[50]}
          onCellClick={onCellClick}
          initialState={{
            pagination: {
              rowCount: count,
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
          loading={loading}
          slotProps={{
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
            },
          }}
        />
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <DialogContent dividers>
            <RadioGroup
              // ref={radioGroupRef}
              // value={value}
              onChange={handleStateChange}
            >
              <FormControlLabel
                value="Contactado"
                control={<Radio />}
                label="Contactado"
              />
              <FormControlLabel
                value="Esperando respuesta"
                control={<Radio />}
                label="Esperando respuesta"
              />
              <FormControlLabel
                value="En llamada"
                control={<Radio />}
                label="En llamada"
              />
              <FormControlLabel value="Win" control={<Radio />} label="Win" />
              <FormControlLabel value="Lose" control={<Radio />} label="Lose" />
            </RadioGroup>
          </DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Ok</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}

// DataGrid col header format
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
  { field: 'State', headerName: 'State', width: 250, renderCell: Form }, // add button to cell
];
