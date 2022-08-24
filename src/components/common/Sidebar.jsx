import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import assets from "../../assets/index";
import { Box } from "@mui/system";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import FavoriteList from "./FavoriteList";

const Sidebar = () => {
  const [activeItem, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);
  // console.log(memo);
  const sidebarWidth = 250;

  //読み込み時に自分の📝を全て取得
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        // console.log(res); //配列として返ってきてない。
        // console.log(res.length); //ここがとれてない
        //状態をグローバルに保存
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  //ここが毎回発火してしまってる。
  useEffect(() => {
    const activeItem = memos.findIndex((e) => e.id === memoId);
    //📝が１つ以上あり、かつmemoIdがundefinedじゃない時
    if (memos.length > 0 && memoId === undefined) {
      // navigate(`/memo/${memos[0].id}`);
    }
    setActiveIndex(activeItem);
  }, [memos, memoId, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDragEnd = () => {
    //後で並び変える
  };

  const addMemo = async () => {
    try {
      console.log("addmemo");
      const res = await memoApi.create();
      console.log(res); //object
      console.log(...memos); //配列の中身からobjectを取り出す
      const newList = [res, ...memos];
      dispatch(setMemo(newList));
      navigate(`/memo/${res.id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      open={true}
      sx={{
        width: sidebarWidth,
        height: "100vh",
        "& > div": {
          borderRight: "none",
        },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <FavoriteList />
        {/* <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton> */}
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            key={`list-memo-droppable`}
            droppableId={`list-memo-droppable`}
          >
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {memos.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <ListItemButton
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        selected={index === activeItem}
                        component={Link}
                        to={`/memo/${item.id}`}
                        sx={{
                          pl: "20px",
                          cursor: snapshot.isDragging
                            ? "grab"
                            : "pointer!important",
                        }}
                        // onClick={() => console.log(item.id)}
                      >
                        <Typography
                          variant="body2"
                          fontWeight="700"
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.icon} {item.title}
                        </Typography>
                      </ListItemButton>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
