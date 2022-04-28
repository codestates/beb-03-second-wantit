import * as React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  Container,
  Box,
  Button,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function SendToken() {
  const [userId, setUserId] = useState("admin");
  const [balance, setBalance] = useState("");
  const [sender, setSender] = useState("user");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const contractAddress = "0x56c47fE105d708D9235810F8DbC1728455c5A3Cb";
  const [blockHash, setBlockHash] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  // 보유 토큰 조회 (이더 단위로 변경)
  useEffect(() => {
    axios
      .post(`http://localhost:4000/contract/balanceOf`, {
        user_id: "admin",
        contractAddress: contractAddress,
      })
      .then((payload) => {
        setBalance(Number(payload.data.balance) / 10 ** 18);
      });
  }, []);

  // 토큰 전송 // 보유잔액 새로 렌더되기
  const transfer = () => {
    axios
      .post(`http://localhost:4000/contract/transfer`, {
        sender: "admin",
        recipient: recipient,
        amount: amount,
        contractAddress: contractAddress,
      })
      .then((payload) => {
        // if (payload.recipient === undefined || payl) {
        // }
        window.alert(payload.data.message);
        setBlockHash(payload.data.contractaddress.blockHash);
        setTransactionHash(payload.data.contractaddress.transactionHash);
      });
  };

  return (
    <Container>
      <Box sx={{ width: "30%" }}>
        <Stack spacing={2}>
          <Item fontFamily="-apple-system">My Wallet</Item>
        </Stack>
      </Box>

      <Typography fontFamily="-apple-system">Token</Typography>

      <Typography fontFamily="-apple-system">{balance} WT</Typography>
      <Stack
        spacing={5}
        sx={{
          mt: 3,
          width: "90%",
          borderBottom: 1,
          height: 280,
          // borderUpper: 1,
        }}
      >
        <Typography variant="h5" fontFamily="-apple-system">
          Transfer
        </Typography>
        <TextField
          sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
          id="filled-password-input"
          label="받는 사람"
          variant="outlined"
          onChange={(e) => setRecipient(e.target.value)}
        />
        <TextField
          sx={{ backgroundColor: "#ffffff", borderRadius: 3 }}
          id="filled-password-input"
          label="보낼 금액"
          variant="outlined"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          sx={{ height: 55, borderRadius: 2 }}
          variant="contained"
          onClick={() => {
            transfer();
          }}
        >
          보내기
        </Button>
        <Typography fontFamily="-apple-system">
          blockHash: {blockHash}
        </Typography>

        <Typography fontFamily="-apple-system">
          transactionHash: {transactionHash}
        </Typography>
      </Stack>
    </Container>
  );
}

export default SendToken;
