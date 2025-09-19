// BookingModal.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
    Divider,
    Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import BookingSummaryModal from "./BookingSummaryModal";

/* ---------- seating generator ---------- */
function generateRows(startChar, endChar, seatsPerRow) {
    const rows = {};
    for (
        let charCode = startChar.charCodeAt(0);
        charCode <= endChar.charCodeAt(0);
        charCode++
    ) {
        const rowLetter = String.fromCharCode(charCode);
        rows[rowLetter] = Array.from({ length: seatsPerRow }, (_, i) => ({
            id: `${rowLetter}-${i + 1}`,
            status: "available", // available | booked | selected
        }));
    }
    return rows;
}

const initialLayout = {
    silver: { price: 180, rows: generateRows("A", "F", 8) },
    gold: { price: 250, rows: generateRows("G", "N", 10) },
    platinum: { price: 350, rows: generateRows("O", "P", 8) },
};

/* ---------- helpers ---------- */
const cloneLayout = (layout) => JSON.parse(JSON.stringify(layout));

function markRandomBooked(layout, chance = 0.12) {
    const copy = cloneLayout(layout);
    Object.values(copy).forEach((section) => {
        Object.keys(section.rows).forEach((rowKey) => {
            section.rows[rowKey].forEach((seat) => {
                if (Math.random() < chance) seat.status = "booked";
            });
        });
    });
    return copy;
}

/* ---------- Seat ---------- */
const Seat = ({ seat, onClick }) => {
    const color =
        seat.status === "booked"
            ? "#444"
            : seat.status === "selected"
                ? "#0ea5a4"
                : "#111";

    const border =
        seat.status === "booked" ? "1px solid #666" : "1px solid rgba(255,255,255,0.12)";

    return (
        <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={seat.status === "booked" ? undefined : () => onClick(seat.id)}
            style={{
                width: 36,
                height: 36,
                borderRadius: 6,
                background: color,
                border,
                color: seat.status === "booked" ? "#aaa" : "#fff",
                cursor: seat.status === "booked" ? "not-allowed" : "pointer",
                fontSize: 11,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                userSelect: "none",
            }}
        >
            {seat.id.split("-")[1]}
        </motion.button>
    );
};

/* ---------- Main Booking Modal ---------- */
function Booking({ open, title, banner, onClose }) {
    const [layout, setLayout] = useState(() => markRandomBooked(initialLayout, 0.12));
    const [selectedSeats, setSelectedSeats] = useState([]); // always [{ section,row,id }]
    const [viewerCount, setViewerCount] = useState(1);
    const [showSummary, setShowSummary] = useState(false);


    useEffect(() => {
        if (!open) setSelectedSeats([]);
    }, [open]);

    const confirmBooking = () => {
        // Instead of closing directly, show summary
        setShowSummary(true);
    };

    const updateSeatStatus = (prevLayout, seats, status) => {
        const newLayout = cloneLayout(prevLayout);
        seats.forEach(({ section, row, id }) => {
            const seat = newLayout[section]?.rows?.[row]?.find((s) => s.id === id);
            if (seat) seat.status = status;
        });
        return newLayout;
    };

    const handleSeatClick = (seatId) => {
        const [row] = seatId.split("-");
        let sectionKey = null;
        let seatIndex = null;

        for (const sec of Object.keys(layout)) {
            if (layout[sec].rows[row]) {
                seatIndex = layout[sec].rows[row].findIndex((s) => s.id === seatId);
                if (seatIndex !== -1) {
                    sectionKey = sec;
                    break;
                }
            }
        }
        if (!sectionKey) return;

        const chosenRow = layout[sectionKey].rows[row];
        if (chosenRow[seatIndex].status === "booked") return;

        // build new block
        const newSelection = [];
        for (let i = 0; i < viewerCount; i++) {
            const seat = chosenRow[seatIndex + i];
            if (!seat || seat.status === "booked") break;
            newSelection.push({ section: sectionKey, row, id: seat.id });
        }

        if (newSelection.length === viewerCount) {
            setLayout((prev) => updateSeatStatus(prev, selectedSeats, "available")); // reset old
            setSelectedSeats(newSelection);
            setLayout((prev) => updateSeatStatus(prev, newSelection, "selected"));   // set new
        }
    };

    const clearSelections = () => {
        setLayout((prev) => updateSeatStatus(prev, selectedSeats, "available"));
        setSelectedSeats([]);
    };

    const autoFillSeats = () => {
        let found = false;
        for (const sectionKey of ["platinum", "gold", "silver"]) {
            if (found) break;
            const sec = layout[sectionKey];
            for (const rowKey of Object.keys(sec.rows)) {
                if (found) break;
                const row = sec.rows[rowKey];
                for (let i = 0; i <= row.length - viewerCount; i++) {
                    const slice = row.slice(i, i + viewerCount);
                    if (slice.every((seat) => seat.status === "available")) {
                        const newSelection = slice.map((seat) => ({
                            section: sectionKey,
                            row: rowKey,
                            id: seat.id,
                        }));
                        setLayout((prev) => updateSeatStatus(prev, selectedSeats, "available"));
                        setSelectedSeats(newSelection);
                        setLayout((prev) => updateSeatStatus(prev, newSelection, "selected"));
                        found = true;
                        break;
                    }
                }
            }
        }
        if (!found) alert("No consecutive seats available for this viewer count.");
    };

    const totalAmount = useMemo(() => {
        return selectedSeats.reduce((acc, seatObj) => {
            return acc + layout[seatObj.section].price;
        }, 0);
    }, [selectedSeats, layout]);

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Box
                    sx={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "rgba(0,0,0,0.6)",
                        p: 2,
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.96, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.18 }}
                        style={{
                            width: "100%",
                            maxWidth: 1100,
                            background: "#000",
                            color: "#fff",
                            borderRadius: 12,
                            border: "1px solid rgba(255,255,255,0.06)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ display: "flex", alignItems: "center", px: 3, py: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="h6">{title || "Movie Title"}</Typography>
                                <Typography variant="body2" color="gray">
                                    Select your seats
                                </Typography>
                            </Box>
                            <IconButton onClick={onClose} sx={{ color: "white" }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                        {/* Controls */}
                        <Box sx={{ px: 3, py: 2 }}>
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <InputLabel sx={{ color: "white" }}>Viewers</InputLabel>
                                    <Select
                                        value={viewerCount}
                                        onChange={(e) => setViewerCount(Number(e.target.value))}
                                        sx={{ color: "white" }}
                                    >
                                        {Array.from({ length: 10 }).map((_, i) => (
                                            <MenuItem key={i + 1} value={i + 1}>
                                                {i + 1}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <Button variant="contained" onClick={autoFillSeats}>
                                    Auto Fill
                                </Button>

                                <Button variant="outlined" color="inherit" onClick={clearSelections}>
                                    Clear
                                </Button>

                                <Box sx={{ flex: 1 }} />

                                <Stack direction="row" spacing={1}>
                                    <Chip label="Available" size="small" sx={{ bgcolor: "#111", color: "#fff" }} />
                                    <Chip label="Selected" size="small" sx={{ bgcolor: "#0ea5a4", color: "#000" }} />
                                    <Chip label="Booked" size="small" sx={{ bgcolor: "#444", color: "#fff" }} />
                                </Stack>
                            </Stack>
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                        {/* Seating layout */}
                        <Box sx={{ px: 3, py: 3, maxHeight: "55vh", overflow: "auto" }}>
                            <Stack spacing={4} alignItems="center">
                                {["platinum", "gold", "silver"].map((sectionKey) => {
                                    const sec = layout[sectionKey];
                                    return (
                                        <Box key={sectionKey} sx={{ width: "100%" }}>
                                            <Typography variant="subtitle1" sx={{ mb: 1, textTransform: "uppercase" }}>
                                                {sectionKey} — ₹{sec.price}
                                            </Typography>

                                            <Box
                                                sx={{
                                                    background: "linear-gradient(180deg, rgba(255,255,255,0.02), transparent)",
                                                    p: 2,
                                                    borderRadius: 2,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                }}
                                            >
                                                {Object.keys(sec.rows).map((rowKey) => (
                                                    <Box
                                                        key={rowKey}
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 1,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="body2"
                                                            sx={{ width: 20, textAlign: "right", mr: 1, color: "gray" }}
                                                        >
                                                            {rowKey}
                                                        </Typography>
                                                        <Box sx={{ display: "flex", gap: 1 }}>
                                                            <AnimatePresence>
                                                                {sec.rows[rowKey].map((seat) => (
                                                                    <Seat key={seat.id} seat={seat} onClick={handleSeatClick} />
                                                                ))}
                                                            </AnimatePresence>
                                                        </Box>
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Stack>
                        </Box>

                        {/* Screen */}
                        <Box
                            sx={{
                                textAlign: "center",
                                bgcolor: "#222",
                                py: 1,
                                mb: 2,
                                fontWeight: "bold",
                                borderRadius: 1,
                                mx: 3,
                            }}
                        >
                            📽️ All eyes here (Screen)
                        </Box>

                        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)" }} />

                        {/* Footer */}
                        <Box sx={{ px: 3, py: 2, display: "flex", alignItems: "center", gap: 2 }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography variant="body2" color="gray">
                                    Selected seats:
                                </Typography>
                                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                                    {selectedSeats.length === 0 ? (
                                        <Typography variant="body2" color="gray">
                                            none
                                        </Typography>
                                    ) : (
                                        selectedSeats.map((s) => (
                                            <Chip key={s.id} label={s.id} size="small" sx={{ bgcolor: "#111", color: "#fff" }} />
                                        ))
                                    )}
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    ₹{totalAmount}
                                </Typography>
                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                    {selectedSeats.length} seats
                                </Typography>
                            </Box>

                            <Button variant="contained" disabled={selectedSeats.length === 0} onClick={confirmBooking}>
                                Confirm
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </Modal>
            <BookingSummaryModal
                open={showSummary}
                onClose={() => setShowSummary(false)}
                done={() => {
                    setShowSummary(false)
                    onClose()
                }}
                title={title}
                banner={banner}
                seats={selectedSeats}
                total={totalAmount}
            />

        </>
    );
}

Booking.propTypes = {
    open: PropTypes.bool,
    title: PropTypes.string,
    onClose: PropTypes.func,
};

export default Booking;
