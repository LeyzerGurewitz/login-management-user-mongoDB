import { match } from "assert";
import mongoose, { Schema, Document } from "mongoose";

// הגדרת הממשקים (interfaces)
export interface IGrade {
    subject: string;
    grade: number;
}

export enum ERole {
    teacher = "teacher",
    student = "student"
}

export interface IUser extends Document {
    fullName: string;
    passportId: number;
    password: string;
    grades: IGrade[];
    role: ERole;
}

// פונקציה לבדוק אם הסיסמה חזקה
const isPasswordStrong = (password: string): boolean => {
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordStrengthRegex.test(password);
}

// יצירת הסכמה (schema) ל-User
const UserSchema: Schema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, "Please upload your name"]
        },
        passportId: {
            type: Number,
            match: [/^\d{9}$/, "Passport ID must contain exactly 9 digits"]
        },
        password: {
            type: String,
            required: [true, "Please provide a password"],
            validate: {
                validator: isPasswordStrong,
                message: "Password must be at least 8 characters long, contain uppercase letters, lowercase letters, numbers, and special characters."
            }
        },
        grades: [
            {
                subject: {
                    type: String,
                    // required: [true, "Please provide the subject name"]
                },
                grade: {
                    type: Number,
                    min: 0,
                    max: 100
                }
            }
        ],
        role: {
            type: String,
            enum: ERole,
            required: true
        }
    },
    { timestamps: true } // מוסיף זמן יצירה ועדכון אוטומטי
);

// ייצוא מודל המשתמש
export default mongoose.model<IUser>("User", UserSchema);
