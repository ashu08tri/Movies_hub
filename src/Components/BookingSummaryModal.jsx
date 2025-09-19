import React from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function BookingSummaryModal({ open, onClose, done, title, banner, seats, total }) {

    console.log(seats);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "fixed",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(0,0,0,0.6)",
                    zIndex: 1400,
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        bgcolor: "black",
                        color: "white",
                        borderRadius: 3,
                        border: 1,
                        borderColor: "yellow",
                        width: { xs: "95%", md: "35%" },
                        p: 3,
                        textAlign: "center",
                        position: "relative",
                    }}
                >
                    {/* Close button */}
                    <IconButton
                        onClick={onClose}
                        sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Banner */}
                    <Box
                        component="img"
                        src={banner}
                        alt={title}
                        sx={{
                            width: "100%",
                            maxHeight: 250,
                            borderRadius: 2,
                            objectFit: "contain",
                            mb: 2,
                        }}
                    />

                    {/* Title */}
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                        {title}
                    </Typography>
                    <Typography>
                        Section: {seats.map(s => s.section.toUpperCase())}
                    </Typography>
                    {/* Seats */}
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Seats: {seats.map(s => `${s.id}`).join(", ")}
                    </Typography>

                    {/* Amount */}
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Total: ₹{total}
                    </Typography>

                    <Button
                        variant="contained"
                        color="success"
                        onClick={done}
                    >
                        Done
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default BookingSummaryModal;
