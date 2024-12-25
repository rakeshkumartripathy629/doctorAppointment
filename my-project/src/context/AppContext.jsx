import React, { createContext, useContext, useReducer } from "react";
import { doctorsData } from "../data/doctors";

const initialState = {
  doctors: doctorsData,
  appointments: [],
  isAdmin: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_DOCTOR":
      return { ...state, doctors: [...state.doctors, action.payload] };
    case "UPDATE_DOCTOR":
      return {
        ...state,
        doctors: state.doctors.map((doctor) =>
          doctor.id === action.payload.id ? action.payload : doctor
        ),
      };
    case "TOGGLE_DOCTOR_STATUS":
      return {
        ...state,
        doctors: state.doctors.map((doctor) =>
          doctor.id === action.payload
            ? {
                ...doctor,
                status: doctor.status === "active" ? "inactive" : "active",
              }
            : doctor
        ),
      };
    case "ADD_APPOINTMENT":
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    case "SET_ADMIN_MODE":
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);



