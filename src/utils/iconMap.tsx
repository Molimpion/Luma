import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import BeachAccessOutlinedIcon from "@mui/icons-material/BeachAccessOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";

export const iconMap: Record<string, React.ReactNode> = {
  Início: <HomeOutlinedIcon />,
  Pagamento: <WalletOutlinedIcon />,
  Ponto: <CalendarMonthOutlinedIcon />,
  Férias: <BeachAccessOutlinedIcon />,
  "All mail": <MailOutlineIcon />,
  Trash: <DeleteOutlineIcon />,
  Spam: <ReportGmailerrorredOutlinedIcon />,
};
