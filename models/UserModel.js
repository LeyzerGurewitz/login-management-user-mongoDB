import mongoose from "mongoose";
export var ERole;
(function (ERole) {
    ERole["teacher"] = "teacher";
    ERole["student"] = "student";
})(ERole || (ERole = {}));
// פונקציה לבדוק אם הסיסמה חזקה
const isPasswordStrong = (password) => {
    const passwordStrengthRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordStrengthRegex.test(password);
};
// יצירת הסכמה (schema) ל-User
const UserSchema = new mongoose.Schema({
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
}, { timestamps: true } // מוסיף זמן יצירה ועדכון אוטומטי
);
// ייצוא מודל המשתמש
export default mongoose.model("User", UserSchema);
