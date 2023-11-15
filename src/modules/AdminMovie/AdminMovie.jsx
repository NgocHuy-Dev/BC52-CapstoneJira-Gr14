import { React, useState } from "react";
import AddMovie from "./AddMovie/AddMovie";
import {
  Box,
  Button,
  Container,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  Query,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams, useNavigate } from "react-router-dom";
import { deleteMovie, getMovie } from "../../apis/movieAPI";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditMovie from "./EditMovie";
import {
  StyledTableCell,
  StyledTableRow,
} from "./User/UserManagement/styledTable";
import SearchMovie from "./SearchMovie/SearchMovie";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
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
};

export default function AdminMovie() {
  // cài đặt useNavigate đẻ điều hướng

  const navigate = useNavigate();

  //handleCreateSchedule create Schedule

  function handleCreateSchedule(selectedMovieId) {
    return navigate(`/admin/schedule/${selectedMovieId}`);
  }

  //
  const queryClient = useQueryClient();

  // Add Movie
  const [openNewMovie, setOpenNewMovie] = useState(false);
  const handleOpenNewMovie = () => setOpenNewMovie(true);
  const handleCloseNewMovie = () => setOpenNewMovie(false);

  // Edit movie
  const [openEditMovie, setOpenEditMovie] = useState(false);
  const [editMovieId, setEditMovieId] = useState(0);
  const handleOpenEditMovie = (movieId) => {
    setOpenEditMovie(true);
    setEditMovieId(movieId);
  };
  const handleCloseEditMovie = () => setOpenEditMovie(false);

  const { data = [], isLoading } = useQuery({
    queryKey: ["listMovie", openNewMovie, openEditMovie],
    queryFn: () => getMovie(),
  });

  const { mutate: handleDeleteMovie } = useMutation({
    mutationFn: (values) => deleteMovie(values),

    onSuccess: () => {
      queryClient.invalidateQueries("listMovie");
    },
    onError: () => {},
  });
  // search button
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFiltered, setSearchFiltered] = useState("");
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    const filtered = data.filter((entry) =>
      Object.values(entry).some(
        (val) => typeof val === "string" && val.includes(searchTerm)
      )
    );

    setSearchFiltered(filtered);
  };

  // console.log(searchFiltered);
  return (
    <div>
      {searchFiltered ? (
        <SearchMovie searchFiltered={searchFiltered} />
      ) : (
        <div>
          <Container maxWidth="xl">
            <Box height={100} />
            <Typography
              sx={{ color: "grey", fontSize: "35px", textAlign: "center" }}
            >
              Quản lý Phim
            </Typography>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* //-----------------------------------------------------Tìm sản phẩm ----------------------------------------------------- */}

              <div style={{ marginBottom: "10px", marginTop: "10px" }}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <button onClick={handleSearchSubmit}>Search</button>
              </div>

              {/* /////////////////////////////////////////// */}
              <Button
                variant="contained"
                color="warning"
                onClick={handleOpenNewMovie}
                style={{
                  marginLeft: "650px",
                }}
              >
                Thêm Phim
              </Button>
            </div>
            <TableContainer
              sx={{ paddingBottom: "20px", width: "100%" }}
              component={Paper}
            >
              <Table sx={{ minWidth: 500 }}>
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Mã Phim</StyledTableCell>
                    <StyledTableCell align="center">Hình Ảnh</StyledTableCell>
                    <StyledTableCell align="center">Tên Phim</StyledTableCell>
                    <StyledTableCell align="center">Mô Tả</StyledTableCell>
                    <StyledTableCell align="center">Hành Động</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {data.map((movie) => {
                    return (
                      <StyledTableRow
                        key={movie.maPhim}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {movie.maPhim}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <img src={movie.hinhAnh} height={50} />
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {movie.tenPhim}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {movie.moTa}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ display: "flex" }}
                        >
                          <EditIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                            color="success"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleOpenEditMovie(movie.maPhim)}
                          />
                          <DeleteIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                            color="error"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDeleteMovie(movie.maPhim)}
                          />
                          <NoteAltIcon
                            sx={{ display: { xs: "flex", md: "flex" }, mr: 1 }}
                            color="primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleCreateSchedule(movie.maPhim);
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>

          {/* Add Movie */}
          <Modal
            keepMounted
            open={openNewMovie}
            onClose={handleCloseNewMovie}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style} style={{ backgroundColor: "lavender" }}>
              <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                Thêm Phim
              </h2>
              <AddMovie handleClose={handleCloseNewMovie} />
            </Box>
          </Modal>

          {/* Edit Movie */}
          <Modal
            keepMounted
            open={openEditMovie}
            onClose={handleCloseEditMovie}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style} style={{ backgroundColor: "lavender" }}>
              <h2 style={{ textAlign: "center", fontWeight: "bold" }}>
                Edit Movie
              </h2>
              <EditMovie handleClose={handleCloseEditMovie} id={editMovieId} />
            </Box>
          </Modal>
        </div>
      )}
    </div>
  );
}
