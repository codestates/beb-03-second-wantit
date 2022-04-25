import { Stack } from "@mui/material";

function App() {
  return (
    <Stack sx={{ border: 1, height: "200vh" }}>
      <Stack sx={{ border: 1, height: "10%" }}></Stack>
      <Stack sx={{ border: 1, height: "70%" }}>
        <Routes></Routes>
      </Stack>
      <Stack sx={{ border: 1, height: "20%" }}></Stack>
    </Stack>
  );
}

export default App;
