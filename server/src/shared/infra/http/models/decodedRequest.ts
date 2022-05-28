import express from 'express';
// import { JWTClaims } from "../../../domain/jwt";
type JWTClaims = {
  user: 'hi';
};

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims;
}
