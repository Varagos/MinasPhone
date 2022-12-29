import express from 'express';
// import { JWTClaims } from "../../../domain/jwt";
type JWTClaims = {
  user: {
    id: string;
  };
};

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims;
}
