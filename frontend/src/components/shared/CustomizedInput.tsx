import { TextField } from '@mui/material'

type Props = {
    name: string,
    type: string,
    label: string,
}

function CustomizedInput(props: Props) {
    return (
        <TextField
            margin='normal'
            fullWidth
            name={props.name}
            label={props.label}
            type={props.type}
            slotProps={{
                inputLabel: { sx: { color: "var(--text-muted)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontSize: 14 } },
                input: { sx: { borderRadius: 1, fontSize: 16, color: "var(--text)", fontFamily: "'Rajdhani',sans-serif", fontWeight: 500 } }
            }}
        />
    )
}

export default CustomizedInput
