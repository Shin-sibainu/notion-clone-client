import { Box, IconButton, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import memoApi from "../api/memoApi";
import StarIcon from "@mui/icons-material/Star";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { setMemo } from "../redux/features/memoSlice";
import { setFavoriteList } from "../redux/features/favoriteSlice";
import EmojiPicker from "../components/common/EmojiPicker";

const Memo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { memoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [icon, setIcon] = useState("");

  const memos = useSelector((state) => state.memo.value);
  const favoriteMemos = useSelector((state) => state.favorites.value);

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIsFavorite(res.favorite);
        setIcon(res.icon);
        // console.log(res);
      } catch (err) {
        alert(err);
      }
    };
    getMemo();
  }, [memoId]);

  let timer;
  const timeout = 500;

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTiele = e.target.value;
    setTitle(newTiele);
    let temp = [...memos];
    const index = temp.findIndex((e) => e.id === memoId);
    temp[index] = { ...temp[index], title: newTiele };

    //お気に入り機能追加後に設定する
    if (isFavorite) {
      let tempFavorite = [...favoriteMemos];
      const favoriteIndex = tempFavorite.findIndex((e) => e.id === memoId);
      tempFavorite[favoriteIndex] = {
        ...tempFavorite[favoriteIndex],
        title: newTiele,
      };
      dispatch(setFavoriteList(tempFavorite));
    }

    dispatch(setMemo(temp));

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTiele });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const updateDescription = (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription });
      } catch (err) {
        alert(err);
      }
    }, timeout);
  };

  const addFavorite = async () => {
    try {
      const memo = await memoApi.update(memoId, { favorite: !isFavorite });

      let newFavoriteMemos = [...favoriteMemos];
      if (isFavorite) {
        newFavoriteMemos = newFavoriteMemos.filter((e) => e.id !== memoId);
      } else {
        //これが消えない。お気に入りに移動してほしい。
        newFavoriteMemos.unshift(memo);
      }
      dispatch(setFavoriteList(newFavoriteMemos));
      setIsFavorite(!isFavorite);
    } catch (err) {
      alert(err);
    }
  };

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId);
      console.log(deletedMemo);

      if (isFavorite) {
        const newFavoriteMemos = favoriteMemos.filter((e) => e.id !== memoId);
        dispatch(setFavoriteList(newFavoriteMemos));
      }

      const newMemos = memos.filter((e) => e.id !== memoId);
      if (newMemos.length === 0) {
        navigate("/memo");
      } else {
        navigate(`/memo/${newMemos[0].id}`);
      }
      dispatch(setMemo(newMemos));
    } catch (err) {
      alert(err);
    }
  };

  const onIconChange = (newIcon) => {
    setIcon(newIcon);
  };

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
        <IconButton onClick={addFavorite} variant="outlined">
          {isFavorite ? (
            <StarIcon color="warning" />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant="outlined" color="error" onClick={deleteMemo}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          {/* emoji picker */}
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
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
            onChange={updateDescription}
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
      </Box>
    </>
  );
};

export default Memo;
