import io from "socket.io-client";
import { apiBaseUrl } from "../constants/staticData";

export const socket = io(apiBaseUrl);
