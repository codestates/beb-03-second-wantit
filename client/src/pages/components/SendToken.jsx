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
	Modal,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import Loading from "../Loading";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
};

function SendToken() {
	const [userId, setUserId] = useState("admin");
	const [balance, setBalance] = useState("");
	const [sender, setSender] = useState("user");
	const [senderAddress, setSenderAddress] = useState("");
	const [recipient, setRecipient] = useState("");
	const [recipientAddress, setRecipientAddress] = useState("");
	const [amount, setAmount] = useState("");
	const contractAddress = "0x144c9Cffe99C7D5FD3f314E8dA5fd267DAA356fF";
	const [blockHash, setBlockHash] = useState("");
	const [transactionHash, setTransactionHash] = useState("");
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	// 보유 토큰 조회 (이더 단위로 변경)
	const getBalance = () => {
		axios
			.post(`http://localhost:4000/contract/balanceOf`, {
				user_id: "admin",
				contractAddress: contractAddress,
			})
			.then((payload) => {
				handleOpen();
				setBalance(Number(payload.data.balance) / 10 ** 18);
			});
	};

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
				// window.alert(payload.data.message);
				handleOpen();
				setBlockHash(payload.data.contractaddress.blockHash);
				setTransactionHash(payload.data.contractaddress.transactionHash);
				setSenderAddress(payload.data.contractaddress.from);
				setRecipientAddress(payload.data.contractaddress.to);
			});
	};

	return (
		<Container sx={{ height: "80vh" }}>
			<Stack spacing={3} sx={{ mt: 2, width: "20%", height: 100 }}>
				<Typography sx={{ color: "primary", fontSize: 25, fontWeight: "bold" }}>
					WT Wallet
				</Typography>
				<Typography variant="h6">{balance} WT</Typography>
				<Button
					sx={{ height: 55, borderRadius: 2 }}
					variant="contained"
					onClick={() => {
						getBalance();
					}}
				>
					잔액 조회
				</Button>
				<Modal
					open={open}
					onClose={handleClose}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<Box sx={style}>
						<img
							src="/ganache.png"
							alt="logo"
							style={{ height: "30%", width: "30%" }}
						/>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Confirmed transaction
						</Typography>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Transaction confirmed!
						</Typography>
					</Box>
				</Modal>
			</Stack>

			<Stack
				spacing={5}
				sx={{
					mt: 3,
					width: "90%",

					height: 280,
				}}
			>
				<Box
					sx={{ color: "primary", fontSize: 25, fontWeight: "bold", mt: 15 }}
				>
					Transfer
				</Box>
				<Stack spacing={3} sx={{ mt: 2, width: "50%", height: 280 }}>
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
						sx={{ height: 40, borderRadius: 2 }}
						variant="contained"
						onClick={() => {
							transfer();
						}}
					>
						보내기
					</Button>
				</Stack>
				<Box
					sx={{ color: "primary", fontSize: 25, fontWeight: "bold", mt: 15 }}
				>
					Transfer
				</Box>
				<Typography component="div">
					<Box sx={{ textTransform: "uppercase", m: 1 }}>
						transaction Hash: {transactionHash}
					</Box>
					<Box sx={{ textTransform: "uppercase", m: 1 }}>
						blockHash: {blockHash}
					</Box>
					<Stack></Stack>
					<Box sx={{ textTransform: "uppercase", m: 1 }}>
						from: {senderAddress}
					</Box>
					<Box sx={{ textTransform: "uppercase", m: 1 }}>
						to: {recipientAddress}
					</Box>
					<Box sx={{ textTransform: "uppercase", m: 1 }}>Value: {amount}</Box>
				</Typography>
			</Stack>
		</Container>
	);
}

export default SendToken;
