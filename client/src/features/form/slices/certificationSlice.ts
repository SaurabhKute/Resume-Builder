import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Certificate {
  certificate: string;
}

interface FormState {
  certificate: Certificate[];
}

const initialState: FormState = {
  certificate: [],
};

const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {
    setCertificateField(state, action: PayloadAction<Certificate[]>) {
      state.certificate = action.payload;
    },
    updateCertificateField(
      state,
      action: PayloadAction<{ index: number; field: Certificate }>
    ) {
      state.certificate[action.payload.index] = action.payload.field;
    },
    addCertificateField(state) {
      state.certificate.push({ certificate: "" });
    },
    removeCertificateField(state, action: PayloadAction<number>) {
      state.certificate.splice(action.payload, 1);
    },
  },
});

export const {
  addCertificateField,
  updateCertificateField,
  removeCertificateField,
  setCertificateField,
} = certificateSlice.actions;

export default certificateSlice.reducer;
