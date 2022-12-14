import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import memoApi from "../api/memoApi";
import { setMemo } from "../redux/features/memoSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  //ðã®ä½æ
  const createMemo = async () => {
    setLoading(true);
    try {
      console.log("clicked");
      const res = await memoApi.create();
      console.log(res);
      dispatch(setMemo(res));
      navigate(`/memo/${res.id}`); //memoã«å²ãæ¯ãããidããã¹ã«è¨­å®
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LoadingButton
        variant="outlined"
        color="success"
        onClick={() => createMemo()}
        loading={loading}
      >
        æåã®ã¡ã¢ãä½æ
      </LoadingButton>
    </Box>
  );
};

export default Home;
