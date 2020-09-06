import MovieStore from "./MovieStore";
import { createContext } from "react";

export default createContext(new MovieStore());
