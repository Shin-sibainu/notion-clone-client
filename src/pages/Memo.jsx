import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import StarOutlinedIcon from "@mui/icons-material/StartOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const Memo = () => {
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIsFavorite(res.favorite);
        setIcon(res.icon);
        console.log(res);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  return (
    <>
      <Box
        sx={{
          diplay: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          // backgroundColor: "red",
        }}
      >
        <IconButton>
          {isFavorite ? (
            <StarOutlinedIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>{/* emoji picker */}</Box>
        <TextField
          value={title}
          placeholder="無題"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "unset" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          value={description}
          placeholder="追加"
          variant="outlined"
          fullWidth
          sx={{
            ".MuiOutlinedInput-input": { padding: 0 },
            ".MuiOutlinedInput-notchedOutline": { border: "unset" },
            ".MuiOutlinedInput-root": { fontSize: "0,8rem" },
          }}
        />
      </Box>
    </>
  );
};

export default Memo;
