import { useRouteError } from "react-router-dom";
import { Alert,Stack } from "@mui/material";


function Error() {
    const error = useRouteError();
    
  return (
    <Stack sx={{ width: '100%', height: '100vh',}} justifyContent={'center'} alignItems={'center'} spacing={2}>
      <Alert severity="error">{error ? error.data:'Something went wrong!'}<br/>{error.status}</Alert>
    </Stack>
  )
}

export default Error;