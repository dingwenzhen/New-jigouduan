import http from "@utils/http";
import axios from "@utils/axios";
import Cookies from "js-cookie";
export const booksListApi = () => http.get(`${window.apiUrl}review/rules/SearchRules`)