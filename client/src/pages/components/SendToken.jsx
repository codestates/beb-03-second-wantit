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
import RefreshIcon from "@mui/icons-material/Refresh";
import CreditCardIcon from "@mui/icons-material/CreditCard";
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
	const [success, setSuccess] = useState(false);
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
				handleOpen();
				setBlockHash(payload.data.contractaddress.blockHash);
				setTransactionHash(payload.data.contractaddress.transactionHash);
				setSenderAddress(payload.data.contractaddress.from);
				setRecipientAddress(payload.data.contractaddress.to);
				setSuccess(true);
			});
	};

	return (
		<Container>
			<Stack
				direction="row"
				sx={{ height: "60vh" }}
				alignItems="center"
				justifyContent="space-around"
			>
				{/* Section1 */}
				<Stack
					alignItems="center"
					justifyContent="center"
					sx={{
						mt: 2,
						height: "50%",
						width: "30%",

						borderRadius: 15,
						backgroundColor: "#e1dfdfd1",
						boxShadow: "5px 5px 10px 5px gray",
					}}
				>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-around"
					>
						<CreditCardIcon sx={{ fontSize: 80, color: "#3b5998" }} />
						<Stack sx={{ ml: 3 }}>
							<Typography
								sx={{
									color: "primary",
									fontSize: 25,
									fontWeight: "bold",
									textAlign: "end",
									mr: 1,
								}}
							>
								WT Wallet
							</Typography>
							{balance === "" ? (
								<></>
							) : (
								<Typography
									sx={{ textAlign: "end", mr: 1, mt: 3 }}
									variant="h6"
								>
									{balance} WT
								</Typography>
							)}
						</Stack>
					</Stack>
					<Button
						alignItems="center"
						sx={{ height: 40, width: "90%", borderRadius: 2, mt: 7 }}
						variant="contained"
						onClick={() => {
							getBalance();
						}}
					>
						잔액 조회
					</Button>
				</Stack>
				{!success ? (
					<Stack
						alignItems="center"
						justifyContent="center"
						sx={{
							width: "50%",
							borderRadius: 10,
							height: "80%",
							backgroundColor: "#F4FFFF",
							boxShadow: "5px 5px 10px 5px gray",
						}}
					>
						<Box sx={{ color: "primary", fontSize: 40, fontWeight: "bold" }}>
							Transfer
						</Box>
						<Stack spacing={3} sx={{ mt: 10, width: "80%" }}>
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
					</Stack>
				) : (
					<Stack
						alignItems=""
						justifyContent="space-between"
						sx={{
							width: "50%",
							borderRadius: 10,
							height: "80%",
							backgroundColor: "#F4FFFF",
							boxShadow: "5px 5px 10px 5px gray",
						}}
					>
						<Stack alignItems="end">
							<Button sx={{ width: "20%" }} onClick={() => setSuccess(false)}>
								<RefreshIcon color="primary" sx={{ fontSize: 30 }} />
							</Button>
						</Stack>
						<Stack alignItems="center">
							<Box
								sx={{
									color: "primary",
									fontSize: 35,
									fontWeight: "bold",
								}}
							>
								Transaction Details
							</Box>
						</Stack>

						<Stack sx={{ mb: 5 }}>
							<Box
								sx={{ textTransform: "uppercase", m: 1, overflow: "hidden" }}
							>
								transaction Hash: {transactionHash}
							</Box>
							<Box
								sx={{ textTransform: "uppercase", m: 1, overflow: "hidden" }}
							>
								blockHash: {blockHash}
							</Box>
							<Box sx={{ textTransform: "uppercase", m: 1 }}>
								from: {senderAddress}
							</Box>
							<Box sx={{ textTransform: "uppercase", m: 1 }}>
								to: {recipientAddress}
							</Box>
							<Box sx={{ textTransform: "uppercase", m: 1 }}>
								Value: {amount}
							</Box>
						</Stack>
					</Stack>
				)}
			</Stack>
		</Container>
	);
}

export default SendToken;
