import { Button } from '@mui/material';
import { GridRenderCellParams } from '@mui/x-data-grid';

export function Form(props: GridRenderCellParams<any, string>) {
  return (
    <strong>
      <Button
        variant="contained"
        size="small"
        style={{
          backgroundColor:
            props.value === 'Contactado'
              ? '#8e7cc3'
              : props.value === 'Esperando respuesta'
              ? '#a2c4c9'
              : props.value === 'En llamada'
              ? '#ffe599'
              : props.value === 'Win'
              ? '#93c47d'
              : props.value === 'Lose'
              ? '#e06666'
              : '#cccccc',
        }}
        tabIndex={props.hasFocus ? 0 : -1}
      >
        {props.value}
      </Button>
    </strong>
  );
}
