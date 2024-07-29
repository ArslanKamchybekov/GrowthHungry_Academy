import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AuthGuard } from "@nestjs/passport";
import { PassportStrategy } from '@nestjs/passport';
import mongoose from "mongoose";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Schema({versionKey : false, timestamps: true})
export class resetToken extends Document{
    @Prop({ required : true })
    token: string;
    @Prop({required: true, type: mongoose.Types.ObjectId })
    userId: mongoose.Types.ObjectId;
    @Prop({required: true})
    expiryDate: Date;

}
export const ResetTokenSchema = SchemaFactory.createForClass(resetToken)
