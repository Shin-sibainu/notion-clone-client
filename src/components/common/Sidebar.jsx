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

const Sidebar = () => {
  const [activeItem, setActiveIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memo = useSelector((state) => state.memo.value);
  // console.log(memo);
  const sidebarWidth = 250;

  //読み込み時に自分の📝を全て取得
  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        console.log(res); //配列として返ってきてない。
        console.log(res.length); //ここがとれてない
        //状態をグローバルに保存
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    const activeItem = memo.findIndex((e) => e.id === memoId);
    //📝が１つ以上あり、かつmemoIdがundefinedじゃない時
    if (memo.length > 0 && memoId === undefined) {
      navigate(`/memo/${memo[0].id}`);
    }
    console.log(activeItem);
    setActiveIndex(activeItem);
  }, [memo, memoId, navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onDragEnd = () => {};

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
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
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
            <IconButton>
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
                {memo.map((item, index) => (
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </List>
    </Drawer>
  );
};

export default Sidebar;
